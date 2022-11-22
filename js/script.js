var w = 0;
$(function() {
    "use strict";
/*
        $(window).scroll(function() {
            if ($(this).scrollTop() > 90){  
                $('.top-scrolling').addClass("sticky");
            }
            else{
                $('.top-scrolling').removeClass("sticky");
            }
        });*/

        $(function () {
            $(document).scroll(function () {
              var $nav = $("#header");
              $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
            });
          });

        $(function () {
            $(document).scroll(function () {
              /*var $nav = $("#header");
              $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());*/
              $('.top-scrolling, .widgetPhone').toggleClass("sticky", $(this).scrollTop() > 90);
            });
          });

        function responsive_dropdown (){
            /*---- Scrolling js -----*/
            $(".scrollTo").on('click', function(e) {
                e.preventDefault();
                var target = $(this).attr('href');
                $('html, body').animate({
                   scrollTop: ($(target).offset().top)
                }, 1000);
            });
            /* Responsive menu */
            $(".navbar-toggle").on("click", function(){
                $(".navbar-toggle, .header-menu").toggleClass("active");
                $("#header").toggleClass("background-black");
            });

            $(".remove-background").on("click", function(){
                $("#header").removeClass("background-black");
            });

            $(".level-1").on("click", function(){
              $(".level-1, .megamenu-1").toggleClass("active");
            });

            $(".sideMenuCollapse").on("click", function(){
                $(".navbar-toggle").toggleClass("active");
                $(".navbar-collapse").toggleClass("show");
              });

              $(".set").on("click", function() {
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

            $(".set").on("click", function() {
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

            /* Responsive cart Drop Down */

            $(".cart-icon").on("click", function(){
                $(".cart-dropdown, .cart-icon").toggleClass("active");
            });

            /* Responsive cart Drop Down End */

            /* Product Detail choose size */

            $('ul.Choose li').on("click", function(){
                $('ul.Choose li').removeClass('current');
                $(this).addClass('current');
            })

            $('ul.Size li').on("click", function(){
                $('ul.Size li').removeClass('current');
                $(this).addClass('current');
            })

            /* Product Detail choose size  End */

            /* Product Detail description tab */

            $('ul.panel-tab li').on("click", function(){
                var tab_id = $(this).attr('data-tab');

                $('ul.panel-tab li').removeClass('current');
                $('.product-desc-tab').removeClass('current');

                $(this).addClass('current');
                $("#"+tab_id).addClass('current');
            })

            /* Product Detail description tab End onmouseover="this.src='${el.img.src2}';" onmouseout="this.src='${el.img.src}';" */
        };

        function printPancakeMenu(json){
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

            console.log("sweetPancake print done.");
        }

        function printSandwichMenu (json){
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

            console.log("Sandwich print done.");

            fetchData("pancake", printPancakeMenu);
        }

        function printPizzaMenu (json){
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

            console.log("Pizza print done.");

            fetchData("sandwich", printSandwichMenu);
        }

        function fetchData(file, callback){
            $.ajax({
                url: "data/" + file + ".json",
                method: "get",
                dataType: "json",
                success: function(response){
                    callback(response);
                },
                error: function(err){
                    console.log(err);
                }
            });
        }

        /*$(window).on("load", function() {
            let today = new Date();
            console.log("Loader started."+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());

            $('#preloader').delay(1000).fadeOut(500);

            console.log("Loader ended.");
            var pizzaMenu = document.getElementById("pizzaMenu");
            console.log("Pizza element loaded.");
            if(pizzaMenu != null){
                fetchData("pizza", printPizzaMenu);
            }
            console.log("responsive dropdown triggered."+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
            responsive_dropdown ();
        });

         Custom select drop dwon 

        $(".custom-select").each(function() {
            var classes = $(this).attr("class"),
                id      = $(this).attr("id"),
                name    = $(this).attr("name");
            var template =  '<div class="' + classes + '">';
                template += '<span class="custom-select-trigger">' + $(this).data("placeholder") + '</span>';
                template += '<div class="custom-options">';
                $(this).find("option").each(function() {
                    template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
                });
            template += '</div></div>';
        
            $(this).wrap('<div class="custom-select-wrapper"></div>');
            $(this).hide();
            $(this).after(template);
        });
        $(".custom-option:first-of-type").hover(function() {
            $(this).parents(".custom-options").addClass("option-hover");
        }, function() {
            $(this).parents(".custom-options").removeClass("option-hover");
        });
        $(".custom-select-trigger").on("click", function() {
            $('html').one('click',function() {
                $(".custom-select").removeClass("opened");
            });
            $(this).parents(".custom-select").toggleClass("opened");
            event.stopPropagation();
        });
        $(".custom-option").on("click", function() {
            $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
            $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
            $(this).addClass("selection");
            $(this).parents(".custom-select").removeClass("opened");
            $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
        });*/

        /* Custom select drop dwon End */

        /* Home page banner */

        if ($(".banner-carousel").length > 0) {
            $('.banner-carousel').owlCarousel({
                loop:true,
                nav: true,
                dots: false,
                items: 1,
                responsiveClass: true,
                autoplay:true,
                autoplayTimeout:5000,
                autoplayHoverPause: true,
                autoHeight:true,
                responsive: {
                    0: {
                        arrow: false,
                        nav: false,
                        dots: true,
                    },
                    768: {
                        arrow: false,
                        nav: true,
                        dots: false,
                    },
                }
            });
        }


        /* Home page chef banner */

        if ($(".chef-banner").length > 0) {
            $('.chef-banner').owlCarousel({
                loop:true,
                nav: false,
                items: 4,
                responsiveClass: true,
                autoplay:true,
                autoplayTimeout:5000,
                responsive: {
                    0: {
                        dots: true,
                        nav: false,
                        items: 1,
                    },
                    768: {
                        items: 3,
                        nav: true,
                    },
                    992: {
                        items: 4,
                        nav: true,
                    },
                }
            });
        }

        /* Customer Reviews 

        if ($(".customer-slide").length > 0) {
            $('.customer-slide').owlCarousel({
                loop:true,
                nav: false,
                items: 1,
                responsiveClass: true,
                autoplay:true,
                autoplayTimeout:5000,
                animateOut: 'slideOutUp',
                animateIn: 'slideInUp',
                responsive: {
                    767: {
                        nav: false,
                    },
                }
            });
        }

        $(document).ready(function() {
            let today = new Date();
            console.log("document ready triggered."+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
            responsive_dropdown ();
        });*/
        $(document).ready(function(){
            /* -------- preloader ------- */
            $('#preloader').delay(1000).fadeOut(500);
            /*------End----------*/
            var pizzaMenu = document.getElementById("pizzaMenu");
            if(pizzaMenu != null){
                fetchData("pizza", printPizzaMenu);
            }
            responsive_dropdown ();
        });
});