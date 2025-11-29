import { getApostleQuote } from "./api/quotesApi.js";
const list = document.getElementById("quotesList");
async function loadQuotes() {
    for (let i = 0; i < 5; i++) {
        const q = await getApostleQuote();
        const block = document.createElement("blockquote");
        block.textContent = `"${q.content}" – ${q.author}`;
        list.appendChild(block);
    }
}
loadQuotes();
