const conteinerEl = document.querySelector('.photoConteiner')
const key = "photoKey"
let id = 0
let counter = 1
let isfetch = false
const getData = async (pages) => {
    try {
        isfetch = true
        const response = await fetch(`https://api.unsplash.com/photos/random/?page=${pages}`, {
            headers: {
                Authorization: 'Client-ID 67YCHSfI102HPpkC-pNNncYEP8tkg2exWUHW72eGVvQ'
            }
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
    const data = await getData(counter)
    let strPrhoto = createCard(data);

    conteinerEl.innerHTML = strPrhoto;


};

const createCard = (photoAbout) => {
    return `<img class='photo' src="${photoAbout.urls.regular}" alt="">
    <div class="wrp">
        <div class="author">Хороший человек</div>
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
const picDataSave = (link, like, author) => {
    const p = {
        id: id,
        picLink: link,
        likes: like,
        author: author
    }
    localStorage.setItem(key, JSON.stringify(p))
}

document.addEventListener("DOMContentLoaded", newPhotoPage())


conteinerEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('liked')) {
        let p = Number(e.target.closest(".wrp").querySelector(".likeNum").textContent)
        p -= 1
        e.target.closest(".wrp").querySelector('.likeNum').textContent = p;
        e.target.classList.remove('liked')
    }
    else {
        if (e.target.classList.contains('heart__checkbox')) {
            let p = Number(e.target.closest(".wrp").querySelector(".likeNum").textContent)
            p += 1
            e.target.closest(".wrp").querySelector('.likeNum').textContent = p;
            e.target.classList.add('liked')
        };
    }

});
