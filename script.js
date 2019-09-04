function makeRequest(url) {
  return fetch(url).then(res => 
    res.json()
  )
}

makeRequest('https://dog.ceo/api/breeds/list/all')
  .then(response => createList(response.message));

function createList(dogs) {
  const fragment = document.createDocumentFragment();
  const fragmentChild = document.createDocumentFragment();
  const p = document.createElement('p');
  const ul = document.createElement('ul');
  const li = document.createElement('li');

  for(dog in dogs) {
    const clone = p.cloneNode();
    clone.innerText = dog;
    fragment.appendChild(clone);

    if (dogs[dog].length > 0){
      const cloneUl = ul.cloneNode();
      dogs[dog].forEach((item, i) => {
        const cloneLi = li.cloneNode();
        cloneLi.innerText = dog + "-" + dogs[dog][i];
        fragmentChild.appendChild(cloneLi);
        clickHandler2(cloneLi, dog);
      });
      cloneUl.appendChild(fragmentChild);
      clone.appendChild(cloneUl);
    }
    
    clickHandler(clone, dog);
  }
  const list = document.getElementById('list');
  list.appendChild(fragment);
 }


function createImagesSlider(src){
  let ul = document.getElementById("imagesSlider"); 
      for(let i = 0; i < ul.children.length; i++){     
        let li = ul.children[i];
        let img = li.children[0];
        img.src = src[i];
      }  

  slider();     
}

function createImagesSlider2(src, list){
  let arrImg = [];
  for (let j = 0; j < src.length; j++){
    if(src[j].indexOf(list.value) > 0){
          arrImg.push(src[j]);
    }
  }
    createImagesSlider(arrImg)
}


function makeRequestSlider(name) {
  makeRequest(`https://dog.ceo/api/breed/${name}/images/random/10`)
      .then(response => createImagesSlider(response.message))
}

function makeRequestSlider2(name, list) {
  makeRequest(`https://dog.ceo/api/breed/${name}/images/random/10`)
      .then(response => createImagesSlider(response.message, list))
}

 function clickHandler(list, name) {
  list.onclick = ($event) => {
   $event.stopPropagation();  
   makeRequestSlider(name); 
  };
 }

 function clickHandler2(list, name) {
  list.onclick = ($event) => {  
    $event.stopPropagation();
    makeRequestSlider2(name, list);
  };
 }

//Слайдер
function slider(){
let i = 1;
    for(let li of carousel.querySelectorAll('li')) {
      li.style.position = 'relative';
      li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
      i++;
    }
    let width = 300;
    let count = 1;

    let list = carousel.querySelector('ul');
    let listElems = carousel.querySelectorAll('li');

    let position = 0;

    carousel.querySelector('.prev').onclick = function() {
      position += width * count;
      position = Math.min(position, 0)
      list.style.marginLeft = position + 'px';
    };

    carousel.querySelector('.next').onclick = function() {
      position -= width * count;
      position = Math.max(position, -width * (listElems.length - count));
      list.style.marginLeft = position + 'px';
    };
}


//Search
function listOption(msg){
    let arrDogs = [];
    for (let [key, value] of Object.entries(msg)) {
      arrDogs.push(key);
    }
    const fragment = document.createDocumentFragment();
    const option = document.createElement('option');
    for (let i=0; i<arrDogs.length; i++){
        const cloneOption = option.cloneNode();
        cloneOption.value = arrDogs[i];
        fragment.appendChild(cloneOption);
    }
    const listDogs = document.getElementById('dogs');
    listDogs.appendChild(fragment);
}

function listForSearch(){
  makeRequest('https://dog.ceo/api/breeds/list/all')
  .then(response => listOption(response.message));
}


listForSearch();

function clickBtnSearch(){
  let btn = document.getElementById("btn");
  let inputDogs = document.getElementById("inputDogs");
  btn.onclick = function($event) {
  event.preventDefault();
  let name = inputDogs.value;
  makeRequestSlider(name);
}
}

clickBtnSearch();