import {topHeadlinesUrl} from './newsApi.js';
import './newsArticle.js';


async function fetchNews() {
    const res = await fetch(topHeadlinesUrl);
    const json = await res.json();
    const main = document.querySelector('main');
    json.articles.forEach(article => {
        const el = document.createElement('news-article');
        el.article = article;
        main.appendChild(el);
    });
}

window.addEventListener('load',()=> {
    fetchNews();
    registerSw();
});

async function registerSw() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
        }   catch(e) {
            console.log('SW registration failed');
        }
    }
}