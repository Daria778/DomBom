const storageData = JSON.parse(localStorage.getItem("photoKey"));
console.log(storageData);
const conteinerOfSaved = document.querySelector('.savedPhotoConteiner')

storageData.forEach(element => {
    conteinerOfSaved.insertAdjacentHTML('beforeend',
        `<img class='photo' src="${element.picLink}" alt="">
    <div class="wrp" id=${element.id}>
        <div class="author">${element.author}</div>
        </div>`);
});