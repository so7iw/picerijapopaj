function validateAndSendForm() {
  const form = document.getElementById('contactForm');

  var validationResult = validateForm(form);

  if (validationResult) {

    const formData = new FormData(form);

    // Make an AJAX request
    $.ajax({
      url: 'mail.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        document.getElementById("mailSuccessMsg").style.display = "block";
        form.reset();
        $('#selected_filename').text("Datoteka nije odabrana");
      },
      error: function (xhr, status, error) {
        document.getElementById("mailFailureMsg").style.display = "block";
        form.reset();
        $('#selected_filename').text("Datoteka nije odabrana");
      }
    });
  };
}



// Function to validate form fields
function validateForm(form) {
  const nameInput = form.elements['firstname'];
  const lastNameInput = form.elements['lastname'];
  const emailInput = form.elements['email'];
  const phoneInput = form.elements['phone'];
  const jobsInput = form.elements['jobs'];
  const fileInput = form.elements['file'];

  var errors = 0;

  // Clear previous error messages
  const errorElements = form.getElementsByClassName('error');
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = '';
  }

  // Validate Name

  const nameRegex = /^[^\d\s]+$/;

  if (nameInput.value.trim() === '' || nameInput.value.trim().length < 3 || nameInput.value.trim().length > 20) {
    displayError('firstNameError', 'Ime može biti dužine između 3 i 20 karaktera.');
    nameInput.focus();
    errors++;
  }
  else {
    if (!nameRegex.test(nameInput.value.trim())) {
      displayError('firstNameError', 'Ime ne može sadržati brojeve.');
      nameInput.focus();
      errors++;
    }
  }

  if (lastNameInput.value.trim() === '' || lastNameInput.value.trim().length < 3 || lastNameInput.value.trim().length > 30) {
    displayError('lastNameError', 'Prezime može biti dužine između 3 i 30 karaktera.');
    lastNameInput.focus();
    errors++;
  }
  else {
    if (!nameRegex.test(lastNameInput.value.trim())) {
      displayError('lastNameError', 'Prezime ne može sadržati brojeve.');
      nameInput.focus();
      errors++;
    }
  }

  // Validate Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    displayError('emailError', 'Unesite validnu email adresu.');
    emailInput.focus();
    errors++;
  }

  // // Validate Phone Number
  const phonePattern = /^\+3816[0-6][0-9]{6,8}$/;
  if (!phonePattern.test(phoneInput.value)) {
    displayError('phoneError', 'Unesite broj telefona u formatu +3816XXXXXXXX.');
    phoneInput.focus();
    errors++;
  }

  // // Validate Jobs
  if (jobsInput.value === "") {
    displayError('jobsError', 'Odaberite željenu poziciju.');
    jobsInput.focus();
    errors++;
  }

  // Validate File
  var filePath = fileInput.value;

  var allowedExtensions = /(\.doc|\.docx|\.pdf)$/i;

  if ($('#cv')[0].files[0] == null) {
    displayError('fileError', 'Odaberite datoteku.');
    jobsInput.focus();
    errors++;
  }
  else {
    if (!allowedExtensions.exec(filePath)) {
      displayError('fileError', 'Odaberite fajl koji je u nekom od sledećih formata: .pdf, .doc, .docx.');
      jobsInput.focus();
      errors++;
    }
    else {
      var fileSize = Math.round($('#cv')[0].files[0].size / 1024);
      if (fileSize > 512) {
        displayError('fileError', 'Datoteka je prevelika.');
        jobsInput.focus();
        errors++;
      }
    }
  }

  if (errors > 0)
    return false;

  return true;
}

function displayError(elementId, errorMessage) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = errorMessage;
}