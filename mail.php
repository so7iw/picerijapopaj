<?php 

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require './phpmailer/src/Exception.php';
	require './phpmailer/src/PHPMailer.php';
	require './phpmailer/src/SMTP.php';
	require 'credential.php';

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	$mail = new PHPMailer;

	//$mail->SMTPDebug = 4;                               // Enable verbose debug output
	//$mail->SMTPDebug = 2; 

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = gethostbyname('mailcluster.loopia.se');  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = EMAIL;                 // SMTP username
	$mail->Password = PASS;                           // SMTP password
	$mail->SMTPSecure = 'PHPMailer::ENCRYPTION_STARTTLS';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;                                    // TCP port to connect to

	$mail->setFrom(EMAIL, 'Picerija Popaj');
	$mail->addAddress('stojanovski.milos2@gmail.com');     // Add a recipient
	$mail->addBcc("picerija.popaj.no.reply@gmail.com");

	$mail->addAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
			
	$mail->isHTML(true);       // Set email format to HTML
			
	$mail->SMTPOptions = array(
		'ssl' => array(
				 'verify_peer' => false,
				 'verify_peer_name' => false,
				 'allow_self_signed' => true
		)
	);

	$mail->Subject ="Prijava za zaposlenje {$_POST['firstname']} {$_POST['lastname']}";

	$mail->Body = "<div style='text-align: left;'>
			<h1>Nova prijava za posao</h1>
			<table style='text-align: justify;'>
				<tr>
					<th>
						<h2>Lični podaci:</h2>
					</th>
				</tr>
				<tr>
					<td>
						<h3>Ime i prezime:</h3>
					</td>
					<td>
						<h3>{$_POST['firstname']} {$_POST['lastname']}</h3>
					</td>
				</tr>
				<tr>
					<td>
						<h3>Email:</h3>
					</td>
					<td>
						<h3>{$_POST['email']}</h3>
					</td>
				</tr>
				<tr>
					<td>
						<h3>Broj telefona:</h3>
					</td>
					<td>
						<h3>{$_POST['phone']}</h3>
					</td>
				</tr>
				<tr>
					<td>
						<h3>Željena pozicija:</h3>
					</td>
					<td>
						<h3>{$_POST['jobs']}</h3>
					</td>
				</tr>
			</table>
		</div>";
		
	if(!$mail->send()) {
		echo 'Message could not be sent.';
		echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
		echo 'Message has been sent.';
	}
?>