const list = document.querySelector(".list");

const KEY = "fe54e78640174c269f1b558d40009301";
const BASE_URL = "https://newsapi.org/v2";
let currentPage = 1;
const URL = `${BASE_URL}/top-headlines?apiKey=${KEY}&category=sports&country=ua&pageSize=10`;

fetch(URL)
  .then(response => response.json())
  .then(data => {
    insertContent(data.articles);
    // console.log(data);
  })
  .catch(erorr => {
    console.log(erorr);
  });


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