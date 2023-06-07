const form = document.querySelector(".form");
const select = document.querySelector(".category");
const pageSizeInput = document.querySelector(".pageSize");
const list = document.querySelector(".list");
const title = document.querySelector(".counter");
const subTitle = document.querySelector(".totalPages");
const loadMoreBtn = document.querySelector(".load");

const KEY = "fe54e78640174c269f1b558d40009301";
const BASE_URL = "https://newsapi.org/v2";


let currentPage = 1;
// const URL = `${BASE_URL}/top-headlines?apiKey=${KEY}&category=sports&country=ua&pageSize=10`;


const updateUi = (data, pageSize) => {
title.textContent = `Всього знайдено ${data?.totalResults} новин`;
      list.innerHTML = '';
      subTitle.textContent = `Знайдено новин на ${Math.ceil(data?.totalResults / pageSize)} сторінках`;
   
}

const handleSubmit = (e) => {
  e.preventDefault();
  const category = select.value;
  const pageSize = pageSizeInput.value;
  const url = `${BASE_URL}/top-headlines?apiKey=${KEY}&category=${category}&country=ua&pageSize=${pageSize}&page=${currentPage}`;
  currentPage += 1;
  fetch(url)
  .then(response => response.json())
    .then(data => {
      if (e.type === "submit") {
        updateUi(data,pageSize);
      }
      
      insertContent(data.articles);
      currentPage += 1;
      if (currentPage >  Math.ceil(data?.totalResults / pageSize)) {
    loadMoreBtn.classList.add('hide');
      }
    // console.log(data);
  })
  .catch(erorr => {
    console.log(erorr);
  })
   

}
form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleSubmit)




  const createListItem = (item) => `<li>
${item.urlToImage ? `<img src="${item.urlToImage}" alt="${item.description}">` : ""}
  <h2>${item.title}</h2>
  <p>${item.description ? item.description : ""}</p>
  <p>${item.author ?? ""}</p>
  <a href="${item.url}" target="_blank">Перейти до статті</a>
</li>`;


// const generateContent = (array) => array?.reduce((acc, item) => acc + createListItem(item), "");
const generateContent = (array) => (array ? array.reduce((acc, item) => acc + createListItem(item), "") : "");

const insertContent = (array) => {
  const result = generateContent(array);
  list.insertAdjacentHTML("beforeend", result);
};