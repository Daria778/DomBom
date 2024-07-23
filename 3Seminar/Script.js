const conteinerEl = document.querySelector('.photoConteiner')

const key = "photoKey"
const info = [{ photoID: 0 }]
if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(info))
};

let isfetch = false
const getData = async () => {
    try {
        isfetch = true
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=67YCHSfI102HPpkC-pNNncYEP8tkg2exWUHW72eGVvQ`, {
        });
        return await response.json()

    } catch (error) {
        if (!response.ok) throw new Error("Something is wrong...")
    }
    finally {
        isfetch = false
    }



};
const newPhotoPage = async () => {
    const data = await getData()
    let id = JSON.parse(localStorage.getItem(key)).length - 1
    console.log(id);
    let strPrhoto = createCard(data, id);
    conteinerEl.innerHTML = strPrhoto;
    picDataSave(data, id);


};

const createCard = (photoAbout, id) => {
    return `<img class='photo' src="${photoAbout.urls.regular}" alt="">
    <div class="wrp" id=${id}>
        <div class="author">${photoAbout.user.name}</div>
          <div class="heart">
        <input type="checkbox" class="heart__checkbox">
        <div class="heart__icon"></div>
    </div>
    <span class = "likeNum">${photoAbout.likes}</span>
        </div>`
}


// document.addEventListener("scroll", async function () {
//     const page = document.documentElement
//     if (page.scrollTop + page.clientHeight >= page.scrollHeight - 100) {
//         counter++
//         const data = await getData(counter)
//         let strPrhoto = ``
//         data.forEach(el => {
//             strPrhoto += createCard(el);
//         });
//         conteinerEl.insertAdjacentHTML("beforeend", strPrhoto);
//     }
// })
const picDataSave = (data, phtoID) => {
    let b = JSON.parse(localStorage.getItem(key));
    const p = {
        id: phtoID,
        picLink: data.urls.regular,
        likes: data.likes,
        author: data.user.name
    }
    b.push(p);
    console.log(b);
    localStorage.setItem(key, JSON.stringify(b))

}

document.addEventListener("DOMContentLoaded", newPhotoPage())


conteinerEl.addEventListener('click', (e) => {
    const dataJs = JSON.parse(localStorage.getItem(key));

    if (e.target.classList.contains('liked')) {
        const getId = +e.target.closest(".wrp").getAttribute("id");
        dataJs.forEach(el => {
            if (getId == el.id) {
                el.likes -= 1;
                localStorage.setItem(key, JSON.stringify(dataJs));
                let p = Number(e.target.closest(".wrp").querySelector(".likeNum").textContent)
                p -= 1;
                e.target.closest(".wrp").querySelector('.likeNum').textContent = p;
                e.target.classList.remove('liked')
            };
        })
    }
    else {
        if (e.target.classList.contains('heart__checkbox')) {
            const getId = +e.target.closest(".wrp").getAttribute("id");

            dataJs.forEach(el => {
                if (getId == el.id) {
                    console.log("object");
                    el.likes += 1;
                    localStorage.setItem(key, JSON.stringify(dataJs));
                    let p = Number(e.target.closest(".wrp").querySelector(".likeNum").textContent)
                    p += 1;
                    e.target.closest(".wrp").querySelector('.likeNum').textContent = p;
                    e.target.classList.add('liked')
                };
            })
        };
    }

});
