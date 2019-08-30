
function makeRequst2(url) {
  return fetch(url).then(res => 
    res.json()
  )
}

makeRequst2('https://dog.ceo/api/breeds/list/all')
  .then(response => createList(response.message));

function createList(dogs) {
  const fragment = document.createDocumentFragment();
  const fragmentChild = document.createDocumentFragment();
  const p = document.createElement('p');
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  let arrDogs = [];

  for(dog in dogs) {
    arrDogs.push(dog);
    const clone = p.cloneNode();
    clone.innerText = dog;
    fragment.appendChild(clone);

    if (dogs[dog].length > 0){
      const cloneUl = ul.cloneNode();
      for(let i=0; i<dogs[dog].length; i++){
        const cloneLi = li.cloneNode();
        cloneLi.innerText = dog + "-" + dogs[dog][i];
        fragmentChild.appendChild(cloneLi);
        clickHandler2(cloneLi, dog);
      }
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
  let ul = document.getElementById("imagesSlider"); 
      for(let i = 0; i < ul.children.length; i++){     
        let li = ul.children[i];
        let img = li.children[0];
        img.src = arrImg[i];
      }  

  slider();     
}


 function clickHandler(list, name) {
  list.onclick = ($event) => {
   $event.stopPropagation();  
    makeRequst2(`https://dog.ceo/api/breed/${name}/images/random/10`)
      .then(response => createImagesSlider(response.message))
  };
 }

 function clickHandler2(list, name) {
  list.onclick = ($event) => {  
    $event.stopPropagation();
    makeRequst2(`https://dog.ceo/api/breed/${name}/images`)
      .then(response => createImagesSlider2(response.message, list))
  };
 }

 function generateImage(src, name) {
  const imgExist = document.querySelector('#images img');
  const imgName = document.querySelector('#nameDog');
  imgName.innerText = name.replace(/\b\w/g, l => l.toUpperCase());

  if (!!imgExist) {
    imgExist.src = src;

    return;
  }
  const img = document.createElement('img');
  img.src = src;
  const container = document.getElementById('images');
  container.appendChild(img);
}


function slider(){
  let slides = document.querySelectorAll('#imagesSlider .slide');
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide,2000);

  function nextSlide(){
  slides[currentSlide].className = 'slide';
  currentSlide = (currentSlide+1)%slides.length;
  slides[currentSlide].className = 'slide showing';
  }
}

function listForSearch(){
  let arrDogs = [];
  makeRequst2('https://dog.ceo/api/breeds/list/all')
  .then(response => {
    for (let [key, value] of Object.entries(response.message)) {
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
  });
}
listForSearch();




let btn = document.getElementById("btn");
let inputDogs = document.getElementById("inputDogs");
btn.onclick = function($event) {
  event.preventDefault();
  let name = inputDogs.value;
  makeRequst2(`https://dog.ceo/api/breed/${name}/images/random/10`)
    .then((response) => {
      createImagesSlider(response.message);
      slider();
    });
}





