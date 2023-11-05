const APIKEY = "7d4a55e0a2e041f4a9d915a9ee3383da";

//https://newsapi.org/v2/everything?q=tesla&from=2023-10-05&sortBy=publishedAt&apiKey=7d4a55e0a2e041f4a9d915a9ee3383da
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));


function reload(){
    window.location.reload();
}


async function fetchNews(query){
    const resp = await fetch (`${url}${query}&apikey=${APIKEY}`);
    const data = await resp.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContaner = document.getElementById("card-contaner");
    const newsCardTemplate = document.getElementById("template-newsCard");


    cardsContaner.innerHTML = "";

    articles.forEach(article =>{
        if(!article.urlToImage) return;


        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article);

        cardsContaner.appendChild(cardClone);
    }) 
}

function fillDataInCard(cardClone, article){
    const newsImage = cardClone.querySelector("#news-Image");
    const newsTitle = cardClone.querySelector("#newsTitle");
    const newsSorce = cardClone.querySelector("#newsSorc");
    const newsDesc = cardClone.querySelector("#newsDesc");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSorce.innerHTML = `${article.source.name} . ${date}`;

    
    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "blank");
    });

}

let currSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = navItem;
    currSelectedNav.classList.add("active");
}

const searchBtn = document.getElementById("searchBtn");
const newsSearch = document.getElementById("newsInput");

searchBtn.addEventListener("click", () =>{
    const query = newsSearch.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = null;
})