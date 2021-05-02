document.addEventListener("DOMContentLoaded", function () {
    //=====SCROLL=====
    let anchors = document.querySelectorAll('a[href*="#"]');
    let headerHeight = document.querySelector('.header').clientHeight;

    let scrollTo = function (elem) {
        window.scroll({
            left: 0,
            top: elem.offsetTop - headerHeight,
            behavior: 'smooth'
        })
    }

    for (let anchor of anchors) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();

            let blockID = e.target.getAttribute('href').substr(1);
            let navSetion = document.getElementById(blockID);

            scrollTo(navSetion);

            document.querySelector('.burger').classList.remove('burger-active');
        });

    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.navigation__link').forEach((link) => {
                    link.classList.toggle('navigation__link-active', 
                        link.getAttribute('href').substr(1) === entry.target.id);
                });
            }
        });
    }, {
        threshold: 0.7
    });

    document.querySelectorAll('.navigation-section').forEach((section) => {
        observer.observe(section)
    });
  
    //====BURGER-MENU====
    (function () {
        const burgerMenu = document.querySelector('.burger');

        document.querySelector('.burger__button').addEventListener('click', () => {
            burgerMenu.classList.toggle('burger-active');
        });

        document.querySelector('.burger-menu__overley').addEventListener('click', () => {
            burgerMenu.classList.remove('burger-active');
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
        let doc = document;
        let index = 1;
        let Slider = function () {
            this.box = doc.querySelector('.swiper-container');
            this.slidesBox = doc.querySelector('.swiper-elements');
            this.slides = doc.querySelectorAll('.slide');
            this.btns = doc.querySelectorAll('.btn');
            this.size = this.box.clientWidth;

            this.position();
            this.carousel();

        };

        Slider.prototype.position = function () {
            let size = this.size;
            this.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
        };

        Slider.prototype.carousel = function () {
            let i, max = this.btns.length,
                that = this;

            for (i = 0; i < max; i += 1) {
                that.btns[i].addEventListener('click', Slider[that.btns[i].id].bind(null, that));
            }
        }

        Slider.prev = function (box) {
            box.slidesBox.style.transition = "transform .3s ease-in-out";
            let size = box.size;
            index <= 0 ? false : index--;
            box.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
            box.jump();
        };

        Slider.next = function (box) {
            box.slidesBox.style.transition = "transform .3s ease-in-out";
            let max = box.slides.length;
            let size = box.size;
            index >= max - 1 ? false : index++;
            box.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
            box.jump();
        };

        Slider.prototype.jump = function () {
            let that = this;
            let size = this.size;
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
