const photo = document.querySelector('.photo');
const data = ["../1Seminar/1663936404_g-45.jpg", "../1Seminar/1690931730_furman-top-p-krasivii-fon-sport-vkontakte-10.jpg"];
let i = 0;
const po = document.createElement('img');
po.src = data[i];
const l = data.length;
photo.appendChild(po);
const nextEl = document.querySelector('.next');
const previousEl = document.querySelector('.previous');

setInterval(autoAnim, 5000, po, data, l);

function autoAnim(po, data, l) {
    if (i >= l) i = 0;
    po.src = data[i];
    i += 1
}


nextEl.addEventListener('click', () => {

    if (i == (data.length - 1)) {
        i = 0;
        po.src = data[i];
    }
    else {
        po.src = data[i + 1];
        i += 1;
    }

})
previousEl.addEventListener('click', () => {
    if (i === 0) {
        i = data.length - 1;
        po.src = data[i];
    }
    else {
        po.src = data[i - 1];
        i -= 1;
    }

})
