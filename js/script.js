// var w = 0;
$(function () {
    "use strict";

    $(function () {
        $(document).scroll(function () {
            var $nav = $("#header");
            $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        });
    });

    $('#cv').change(function () {
        if ($('#cv')[0].files[0] != null)
            $('#selected_filename').text($('#cv')[0].files[0].name);
        else
            $('#selected_filename').text("Datoteka nije odabrana");
    });

    $(function () {
        $(document).scroll(function () {
            $('.top-scrolling, .widgetPhone').toggleClass("sticky", $(this).scrollTop() > 90);
        });
    });

    function responsive_dropdown() {
        /*---- Scrolling js -----*/
        $(".scrollTo").on('click', function (e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $('html, body').animate({
                scrollTop: ($(target).offset().top)
            }, 1000);
        });
        /* Responsive menu */
        $(".navbar-toggle").on("click", function () {
            $(".navbar-toggle, .header-menu").toggleClass("active");
            $("#header").toggleClass("background-black");
        });

        $(".remove-background").on("click", function () {
            $("#header").removeClass("background-black");
        });

        $(".level-1").on("click", function () {
            $(".level-1, .megamenu-1").toggleClass("active");
        });

        $(".sideMenuCollapse").on("click", function () {
            $(".navbar-toggle").toggleClass("active");
            $(".navbar-collapse").toggleClass("show");
        });

        $(".set").on("click", function () {
            if ($(".opener").hasClass("active")) {
                $(".opener").removeClass("active");
                $(".opener")
                    .siblings(".megamenu")
                    .slideUp(200);
                $(".set > a i")
                    .removeClass("fa-minus")
                    .addClass("fa-plus");
            } else {
                $(".set > a i")
                    .removeClass("fa-minus")
                    .addClass("fa-plus");
                $(".opener")
                    .find("i")
                    .removeClass("fa-plus")
                    .addClass("fa-minus");
                $(".set > .opener").removeClass("active");
                $(".opener").addClass("active");
                $(".megamenu").slideUp(200);
                $(".opener")
                    .siblings(".megamenu")
                    .slideDown(200);
            }
        });

        $(".set").on("click", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(".set")
                    .removeClass("")
                    .addClass("");
            } else {
                $(".set")
                    .removeClass("")
                    .addClass("");
                $(this)
                    .find("i")
                    .removeClass("s")
                    .addClass("");
                $(".set").removeClass("active");
                $(this).addClass("active");
            }
        });
        /* Responsive menu End */
    };

    function printPancakeMenu(json) {
        let output = ``;
        json.forEach(el => {
            output += `
                <div class="col-xl-4 col-lg-4 col-md-4">
					<div class="menu-list-box">
						<div class="list-img-3"><img src="${el.img.src}" alt="${el.img.alt}"></div>
						<div class="menu-detail">
                            <a href="#" class="iteam-name"> ${el.name} </a>
                            <p class="iteam-order">${el.price}</p>
						</div>
					</div>
				</div>
                `;
        });
        document.getElementById('sweetPancakeMenu').innerHTML = output;
    }

    function printSandwichMenu(json) {
        let output = ``;
        json.forEach(el => {
            output += `
                <div class="col-xl-4 col-lg-4 col-md-4">
					<div class="menu-list-box">
						<div class="list-img"><img src="${el.img.src}" alt="${el.img.alt}"></div>
						<div class="menu-detail">
							<a href="#" class="iteam-name">${el.name} </a>
                            <p class="iteam-order">${el.price}</p>
						</div>
					</div>
				</div>
                `;
        });
        document.getElementById('sandwichMenu').innerHTML = output;

        fetchData("pancake", printPancakeMenu);
    }

    function printPizzaMenu(json) {
        let output = ``;
        json.forEach(el => {
            output += `
                <div class="col-xl-4 col-lg-4 col-md-4">
					<div class="menu-list-box">
						<div class="list-img"><img src="${el.img.src}" alt="${el.img.alt}"></div>
						<div class="menu-detail">
							<a href="#" class="iteam-name">${el.name} </a>
							<ul>`;
            el.ingredients.forEach(ing => {
                output += `
                    <li>${ing}</li>
                    `
            });
            output += `
							</ul>`;
            el.pricing.forEach(element => {
                output += `
                <p class="iteam-order">${element.size}cm&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;${element.price}</p>
                `
            });
            output += `
						</div>
					</div>
				</div>
                `;
        });
        document.getElementById('pizzaMenu').innerHTML = output;

        fetchData("sandwich", printSandwichMenu);
    }

    function fetchData(file, callback) {
        $.ajax({
            url: "data/" + file + ".json",
            method: "get",
            dataType: "json",
            success: function (response) {
                callback(response);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    $(document).ready(function () {
        var copyrightText = document.getElementById("copyright");
        var year = new Date().getFullYear();
        copyrightText.innerHTML = `© Picerija Popaj Pančevo 2004-${year}. Sva prava zadržana.`;

        var pizzaMenu = document.getElementById("pizzaMenu");
        if (pizzaMenu != null) {
            fetchData("pizza", printPizzaMenu);
        }
        responsive_dropdown();
    });
});