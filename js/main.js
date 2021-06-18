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

    }
    ;

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
            }
            ;
            let wrapper = document.querySelector('.portfolio-gallery');

            let selectors = wrapper.children;
            selectors = Array.from(selectors);
            shuffle(selectors);

            for (let i = 0; i < selectors.length; i++) {
                wrapper.appendChild(selectors[i]);
            }
            ;
        });
    });

    document.querySelector('.portfolio-tablist__tab').click();

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    };

    //=====Slider======
    const images = document.querySelectorAll('.slide');
    const swipeBts = document.querySelectorAll('.btn');
    let imagesArr = [];

    for (let i = 0; i < images.length; i++) {
        imagesArr[i] = images[i].src;
        images[i].remove()
    }

    let step = 0;
    let offset = 0;
    let width;
    let img;
    function draw(pos) {
        img = document.createElement('img');
        width = document.querySelector('.swiper-container').offsetWidth
        img.src = imagesArr[step];
        img.classList.add('slide');
        img.style.left = offset * width + 'px';
        img.style.width = width +'px';
        img.style.height = 'auto';

        if (pos == 'left') {
            document.querySelector('.swiper-elements').appendChild(img)
        } else {
            document.querySelector('.swiper-elements').prepend(img)
        }

        let images2 = document.querySelectorAll('.slide');
        let offset2 = 0;
        images2.forEach(img => {
            img.style.left = offset2 * width - width + 'px';
            offset2++;
        })

        if (step + 1 == images.length) {
            step = 0;
        } else {
            step++;
        }
        offset = 1;
    }

    function imgResize() {
        let images2 = document.querySelectorAll('.slide');
        width = document.querySelector('.swiper-container').offsetWidth
        images2.forEach(img => {
            img.style.width = width +'px';
            img.style.height = 'auto';
        })
    }

    window.addEventListener('resize', imgResize)

    function slider(imgId, pos) {
        let images2 = document.querySelectorAll('.slide');
        let offset2 = 0;
        images2.forEach(img => {

            if (pos === 'left') {
                img.style.left = offset2 * width - width + 'px';
                offset2++;
            } else {
                img.style.left = offset2 * width + width + 'px';
                offset2--;
            }
        })
        images2[imgId].remove();
        draw(pos)
    }

    draw('left'); draw('left'); draw('left');

    swipeBts.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.id === 'next') {
                console.log('next');
                slider(0, 'left')
            } else {
                console.log('prev');
                slider(2, 'right')
            }
        })
    })
});
