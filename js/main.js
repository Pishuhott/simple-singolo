document.addEventListener("DOMContentLoaded", function(event) {
    //=====SCROLL=====
    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY;

        document.querySelectorAll('.header, .services, .portfolio').forEach((el, i) => {
            if (el.offsetTop - document.querySelector('.header').clientHeight <= scrollPos) {
                document.querySelectorAll('.navigation a').forEach((el) => {
                    if (el.classList.contains('navigation__link-active')) {
                        el.classList.remove('navigation__link-active');
                    }
                });
                document.querySelectorAll('.navigation li')[i].querySelector('a').classList.add('navigation__link-active');
            }
        });
    });

    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const blockID = anchor.getAttribute('href').substr(1);

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };


    //====BURGER-MENU====

    (function () {
        const burgerMenu = document.querySelector('.burger');
        const burgerBtn = document.querySelector('.burger__button');
        const overley = burgerMenu.querySelector('.burger-menu__overley');
        burgerBtn.addEventListener('click', () => {
            burgerMenu.classList.toggle('burger-active');
        });

        overley.addEventListener('click', () => {
            burgerMenu.classList.toggle('burger-active');
        });

    }());




    //=====TABS=====

    const portfolioTabs = document.querySelectorAll('.portfolio-tablist__tab');

    portfolioTabs.forEach(function (item) {
        item.addEventListener('click', function () {
            let currentBtn = item;

            if (!currentBtn.classList.contains('active-tab')) {
                portfolioTabs.forEach(function (item) {
                    item.classList.remove('active-tab')
                });
                currentBtn.classList.add('active-tab');
            };
            let wrapper = document.querySelector('.portfolio-gallery');

            let selectors = wrapper.children;
            selectors = Array.from(selectors);
            shuffle(selectors);

            for (let i = 0; i < selectors.length; i++) {
                wrapper.appendChild(selectors[i]);
            };
        });
    });

    document.querySelector('.portfolio-tablist__tab').click();

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    };


    //=====Slider======

    (function () {

        var doc = document,
            index = 1;

        var Slider = function () {
            this.box = doc.querySelector('.swiper-container');
            this.slidesBox = doc.querySelector('.swiper-elements');
            this.slides = doc.querySelectorAll('.slide');
            this.btns = doc.querySelectorAll('.btn');
            this.size = this.box.clientWidth;

            this.position();
            this.carousel();

        };

        Slider.prototype.position = function () {
            var size = this.size;
            this.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
        };

        Slider.prototype.carousel = function () {
            var i, max = this.btns.length,
                that = this;

            for (i = 0; i < max; i += 1) {
                that.btns[i].addEventListener('click', Slider[that.btns[i].id].bind(null, that));
            }
        }

        Slider.prev = function (box) {
            box.slidesBox.style.transition = "transform .3s ease-in-out";
            var size = box.size;
            index <= 0 ? false : index--;
            box.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
            box.jump();
        };

        Slider.next = function (box) {
            box.slidesBox.style.transition = "transform .3s ease-in-out";
            var max = box.slides.length;
            var size = box.size;
            index >= max - 1 ? false : index++;
            box.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
            box.jump();
        };

        Slider.prototype.jump = function () {
            var that = this;
            var size = this.size;
            this.slidesBox.addEventListener('transitionend', function () {
                that.slides[index].id === "firstClone" ? index = 1 : index;
                that.slides[index].id === "lastClone" ? index = that.slides.length - 2 : index;
                that.slidesBox.style.transition = "none";
                that.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
            });
        }

        new Slider();

    })();

});
