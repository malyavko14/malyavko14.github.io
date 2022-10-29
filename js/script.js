window.addEventListener('DOMContentLoaded', function () {


    //buttons

    const buttons = document.querySelectorAll(".slider_element"),
        activeIcon = document.querySelector(".theory_active"),
        allArticles = document.querySelectorAll(".own_theory_data"),
        width = window.getComputedStyle(buttons[0]).width;

    allArticles.forEach(button => button.style.display = 'none');
    allArticles[0].style.display = '';

    activeIcon.style.width = width;
    let activeArticle = allArticles[0];
    let activeButton = buttons[0];
    activeButton.style['pointer-events'] = 'none';
    activeButton.style['font-weight'] = '700';
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            activeArticle.style.display = 'none';
            allArticles[index].style.display = '';

            activeButton.style['font-weight'] = '500';
            button.style['font-weight'] = '700';
            activeButton.style['pointer-events'] = 'auto';
            button.style['pointer-events'] = 'none';


            activeButton = button;
            activeArticle = allArticles[index];
        })
    });


    //slider

    function slider(leftArrowSelector, rigthArrowSelector, slidesSelector, slidesWrapperSelector, slidesFieldSelector, startSliderCount) {
        let offset = 0;
        const leftArrow = document.querySelector(leftArrowSelector),
            rigthArrow = document.querySelector(rigthArrowSelector),
            slides = document.querySelectorAll(slidesSelector),
            slidesWrapper = document.querySelector(slidesWrapperSelector),
            slidesField = document.querySelector(slidesFieldSelector),
            width = window.getComputedStyle(slidesWrapper).width;

        slidesField.style.width = Math.round(100 / startSliderCount * slides.length) + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
        slidesWrapper.style.overflow = 'hidden';

        let slide_width = Math.round(+width.slice(0, width.length - 2) / startSliderCount);
        slides.forEach(slide => {
            slide.style.width = slide_width + 'px';
        });

        function leftSlide() {
            if (offset <= 0) null
            else offset -= slide_width
            slidesField.style.transform = `translateX(-${offset}px)`;
        }

        function rightSlide() {
            if (offset >= slide_width * (slides.length - startSliderCount)) null
            else offset += slide_width
            slidesField.style.transform = `translateX(-${offset}px)`;
        }

        leftArrow.addEventListener('click', () => leftSlide());

        rigthArrow.addEventListener('click', () => rightSlide());


        slidesWrapper.addEventListener("touchstart", startTouch, false);
        slidesWrapper.addEventListener("touchmove", moveTouch, false);

        let initialX = null;

        function startTouch(e) { initialX = e.touches[0].clientX };

        function moveTouch(e) {
            if (initialX === null) return;

            let currentX = e.touches[0].clientX;
            let diffX = initialX - currentX;

            if (diffX > 0) rightSlide()
            else leftSlide()

            initialX = null;
        }
    }

    slider("#speakers_left_arrow_slider", "#speakers_rigth_arrow_slider", ".own_speaker", "#speakers_slider_wrapper", '#speakers_slider_inner', 4);
    slider("#partners_left_arrow_slider", "#partners_rigth_arrow_slider", ".own_partner", "#partners_slider_wrapper", '#partners_slider_inner', 3);


    //send request

    const button = document.querySelector(".credential_button")

    button.addEventListener('click', () => {
        const firstName = document.querySelector("#request_first_name"),
            lastName = document.querySelector("#request_last_name"),
            email = document.querySelector("#request_email");

        firstName.addEventListener("click", () => firstName.style.border = '');
        lastName.addEventListener("click", () => lastName.style.border = '');
        email.addEventListener("click", () => email.style.border = '');

        if (button.textContent === "Отправлено") null
        else {
            let correctFirstName = firstName.value.length >= 2,
                correctEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(email.value),
                correctLastName = lastName.value.length >= 2;
            if (correctEmail && correctFirstName && correctLastName) {
                window.open('https://bezkassira.by/i-belorusskij-forum-osoznannoe-roditelstvo-19832/buy/', "_blank");
                button.classList.add('active_credential_button');
                button.innerHTML = "Отправлено";
            } else {
                if (!correctFirstName) firstName.style.border = "4px solid #d84646";
                if (!correctEmail) email.style.border = "4px solid #d84646";
                if (!correctLastName) lastName.style.border = "4px solid #d84646";
            }
        }
    })


    // photo

    const modal = document.querySelector(".modal"),
        photoList = document.querySelectorAll("[data-modal]");

    photoList.forEach(photo => {
        photo.style.cursor = 'pointer';
        photo.addEventListener('click', () => {
            modal.innerHTML = `<img src="img/forum2020/${photo.classList[0]}.png" alt="forum_photo">`;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';

        })
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            modal.innerHTML = '';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            modal.classList.remove('show');
            modal.innerHTML = '';
            document.body.style.overflow = '';
        }
    });

    // video

    function toggleButton(playButtonSelector, pauseButtonSelector, videoSelector) {
        const modal = document.querySelector(".modal"),
            playButton = document.querySelector(playButtonSelector),
            pauseButton = document.querySelector(pauseButtonSelector),
            video = document.querySelector(videoSelector);
        let clientClick = false;
        pauseButton.style.display = 'none';

        pauseButton.addEventListener("click", () => {
            playButton.style.display = 'block';
            pauseButton.style.display = 'none';
            video.pause();
            clientClick = true;
        })

        playButton.addEventListener("click", () => {
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
            video.play();
            clientClick = false;
        })

        const nextSection = document.querySelector('#questions'),
            nextSectionDistance = window.pageYOffset + nextSection.getBoundingClientRect().top,
            videoBlockHeigth = 410;

        window.addEventListener("scroll", () => {
            if (window.pageYOffset + document.documentElement.clientHeight - nextSectionDistance + videoBlockHeigth / 2 > 0 && !clientClick) {
                video.play();
                playButton.style.display = 'none';
                pauseButton.style.display = 'block';
            }
            else {
                video.pause();
                playButton.style.display = 'block';
                pauseButton.style.display = 'none';
            }
        })

        video.addEventListener('click', (e) => {
            if (e.target === video) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                modal.innerHTML = `
                    <video  class="open_video" controls autoplay>
                        <source src=${video.currentSrc} type="video/mp4">
                    </video>`;
            }
        })

    }

    toggleButton("#left_play", "#left_pause", "#left_video");
    toggleButton("#rigth_play", "#rigth_pause", "#rigth_video");


    // header scroll

    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };


    //become partner

    function sendRequest(buttonSelector, type) {
        const partnerButton = document.querySelector(buttonSelector),
            mail = 'malyavko14@bk.ru',
            subject = {
                partner: "Хочу стать партнёром",
                officialPartner: "Хочу стать официальным партнёром",
                generalPartner: "Хочу стать генеральным партнёром"
            };
        partnerButton.addEventListener('click', () => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            modal.innerHTML = `
                <div class="modal_dialog">
                    <div class="credentials_title">Заполните контактные данные</div>
                            <input id="request_company_name" class="input_field" type="name" placeholder="Название компании">
                            <input id="request_contact_name" class="input_field" type="phone" placeholder="Контактное лицо">
                            <input id="request_phone" class="input_field" type="email" placeholder="Телефон">
                            <button id="request_button" class="credential_button">Отправить</button>
                    </div>`;
        })

        // const button = document.querySelector("#request_button")
        // button.addEventListener('click', () => {
        //     const companyName = document.querySelector("#request_company_name"),
        //         contactName = document.querySelector("#request_contact_name"),
        //         phone = document.querySelector("#request_phone");

        //     companyName.addEventListener("click", () => companyName.style.border = '');
        //     contactName.addEventListener("click", () => contactName.style.border = '');
        //     phone.addEventListener("click", () => phone.style.border = '');


        //     let correctCompanyName = companyName.value.length >= 3 ,
        //         correctPhone = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g.test(phone.value),
        //         correctContactName = contactName.value.length >= 2;
        //     if (correctPhone && correctCompanyName && correctContactName) {
        //         modal.classList.remove('show');
        //         modal.innerHTML = '';
        //         document.body.style.overflow = '';
        //         let text = `
        //             Добрый день. Наша компания хочет поддержать ваш проект осозданное родительство.
        //             Наш УПН:${companyName.value}.
        //             Для связи с нами просим набрать на номер ${phone.value}, контактное лицо - ${contactName.value}.
        //             Спасибо.                    
        //         `
        //         window.open(`mailto:${mail}?subject=${subject[type]}&body=${text}`, "_blank");
        //     } else {
        //         if (!correctCompanyName) companyName.style.border = "4px solid #d84646";
        //         if (!correctPhone) phone.style.border = "4px solid #d84646";
        //         if (!correctContactName) contactName.style.border = "4px solid #d84646";
        //     }
        // })
    }

    sendRequest("#partner_button", 'partner');
    sendRequest("#official_partner_button", 'officialPartner');
    sendRequest("#general_partner_button", 'generalPartner');
});
