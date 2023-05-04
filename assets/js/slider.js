const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const slideWidth = images[0].clientWidth;

let counter = 1;

setInterval(() => {
    slides.style.transition = 'transform 0.8s ease-in-out';
    slides.style.transform = `translateX(${-slideWidth * counter}px)`;
    counter++;

    if (counter === images.length) {
        counter = 0;
        setTimeout(() => {
            slides.style.transition = 'none';
            slides.style.transform = `translateX(0)`;
        }, 1600);
    }
}, 4000);


