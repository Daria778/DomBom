// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.

// Пользователь может записаться на один курс только один раз.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.

// Начальные данные (JSON):
const data = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]`;
const key = "shedule";
if (!localStorage.getItem(key)) {
    localStorage.setItem(key, data);
};
const dataJs = JSON.parse(localStorage.getItem(key));
const conteinerEl = document.querySelector('.conteiner');

dataJs.forEach(element => {
    conteinerEl.insertAdjacentHTML('beforeend',
        `<div class="lesson" les-id=${element.id}>
            <p class="title">${element.name}</p>
            <p class="time">${element.time}</p>
            <span>всего участников: </span><p class="maxmen"> ${element.maxParticipants}</p>
            <span>участников на данный момент: </span><p class="curmen"> ${element.currentParticipants}</p>
            <button class="into">записаться</button>
            <button class="out">отменить запись</button>
        </div>`);
});

conteinerEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('into')) {
        console.log(e.target);
        const getId = +e.target.closest(".lesson").getAttribute("les-id");
        dataJs.forEach(el => {
            if (getId == el.id & el.currentParticipants < el.maxParticipants) {
                el.currentParticipants += 1;
                localStorage.setItem(key, JSON.stringify(dataJs));
                let p = Number(e.target.closest(".lesson").querySelector('.curmen').textContent);
                p += 1;
                e.target.closest(".lesson").querySelector('.curmen').textContent = p;
            };
        })
    };
});

conteinerEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('out')) {
        console.log(e.target);
        const getId = +e.target.closest(".lesson").getAttribute("les-id");
        dataJs.forEach(el => {
            if (getId == el.id) {
                el.currentParticipants -= 1;
                localStorage.setItem(key, JSON.stringify(dataJs));
                let p = +e.target.closest(".lesson").querySelector('.curmen').textContent;
                p -= 1;
                e.target.closest(".lesson").querySelector('.curmen').textContent = p;
            };
        })
    };
});