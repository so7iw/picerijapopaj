document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    function setHeaderHeight() {
        var h = document.getElementById('header');
        if (h) document.documentElement.style.setProperty('--header-height', (h.offsetHeight + 1) + 'px');
    }
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
    window.addEventListener('load', setHeaderHeight);

    document.querySelectorAll('.top-scrolling a, .widgetPhone a').forEach(function (el) {
        el.addEventListener('touchstart', function () {
            this.classList.add('tapped');
        });
        el.addEventListener('touchend', function () {
            var link = this;
            setTimeout(function () {
                link.classList.remove('tapped');
                link.blur();
            }, 150);
        });
    });

    var headerEl = document.getElementById('header');
    var stickyEls = document.querySelectorAll('.top-scrolling, .widgetPhone');
    var scrollTicking = false;
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(function () {
                var st = window.pageYOffset;
                if (headerEl) headerEl.classList.toggle('scrolled', st > headerEl.offsetHeight);
                stickyEls.forEach(function (el) { el.classList.toggle('sticky', st > 90); });
                scrollTicking = false;
            });
        }
    }, { passive: true });

    $('#cv').change(function () {
        if ($('#cv')[0].files[0] != null)
            $('#selected_filename').text($('#cv')[0].files[0].name);
        else
            $('#selected_filename').text("Datoteka nije odabrana");
    });

    function responsive_dropdown() {
        $(".scrollTo").on('click', function (e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $('html, body').animate({
                scrollTop: ($(target).offset().top)
            }, 1000);
        });

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
            } else {
                $(".set > .opener").removeClass("active");
                $(".opener").addClass("active");
                $(".megamenu").slideUp(200);
                $(".opener")
                    .siblings(".megamenu")
                    .slideDown(200);
            }
        });
    }

    function toWebp(src) {
        return src.replace(/\.(jpe?g|png)$/i, '.webp');
    }

    function printPancakeMenu(json) {
        var output = '';
        json.forEach(function (el) {
            output += '<div class="col-xl-4 col-lg-4 col-md-4">' +
                '<div class="menu-list-box">' +
                '<div class="list-img-3"><picture><source srcset="' + toWebp(el.img.src) + '" type="image/webp"><img src="' + el.img.src + '" alt="' + el.img.alt + '" width="350" height="233" loading="lazy"></picture></div>' +
                '<div class="menu-detail">' +
                '<span class="iteam-name"> ' + el.name + ' </span>' +
                '<p class="iteam-order">' + el.price + '</p>' +
                '</div></div></div>';
        });
        document.getElementById('sweetPancakeMenu').innerHTML = output;
    }

    function printSandwichMenu(json) {
        var output = '';
        json.forEach(function (el) {
            output += '<div class="col-xl-4 col-lg-4 col-md-4">' +
                '<div class="menu-list-box">' +
                '<div class="list-img"><picture><source srcset="' + toWebp(el.img.src) + '" type="image/webp"><img src="' + el.img.src + '" alt="' + el.img.alt + '" width="350" height="233" loading="lazy"></picture></div>' +
                '<div class="menu-detail">' +
                '<span class="iteam-name">' + el.name + ' </span>' +
                '<p class="iteam-order">' + el.price + '</p>' +
                '</div></div></div>';
        });
        document.getElementById('sandwichMenu').innerHTML = output;
    }

    function printPizzaMenu(json) {
        var output = '';
        json.forEach(function (el) {
            output += '<div class="col-xl-4 col-lg-4 col-md-4">' +
                '<div class="menu-list-box">' +
                '<div class="list-img"><picture><source srcset="' + toWebp(el.img.src) + '" type="image/webp"><img src="' + el.img.src + '" alt="' + el.img.alt + '" width="350" height="233" loading="lazy"></picture></div>' +
                '<div class="menu-detail">' +
                '<span class="iteam-name">' + el.name + ' </span>' +
                '<ul>';
            el.ingredients.forEach(function (ing) {
                output += '<li>' + ing + '</li>';
            });
            output += '</ul>';
            el.pricing.forEach(function (element) {
                output += '<p class="iteam-order">' + element.size + 'cm&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;' + element.price + '</p>';
            });
            output += '</div></div></div>';
        });
        document.getElementById('pizzaMenu').innerHTML = output;
    }

    function fetchJson(file) {
        return $.ajax({
            url: "data/" + file + ".json?v=" + Date.now(),
            method: "get",
            dataType: "json"
        });
    }

    var copyrightText = document.getElementById("copyright");
    if (copyrightText) {
        var year = new Date().getFullYear();
        copyrightText.innerHTML = '&copy; Picerija Popaj Pan\u010devo 2004-' + year + '. Sva prava zadržana.';
    }

    var pizzaMenu = document.getElementById("pizzaMenu");
    if (pizzaMenu != null) {
        Promise.all([
            fetchJson("pizza"),
            fetchJson("sandwich"),
            fetchJson("pancake")
        ]).then(function (results) {
            printPizzaMenu(results[0]);
            printSandwichMenu(results[1]);
            printPancakeMenu(results[2]);
        }).catch(function () {
            if (pizzaMenu) {
                pizzaMenu.innerHTML = '<div class="col-12 text-center"><p style="color:#e63636;padding:20px;">Greška pri učitavanju menija. Molimo osvežite stranicu.</p></div>';
            }
        });
    }

    responsive_dropdown();
});
