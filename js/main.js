import { getApostleQuote } from "./api/quotesApi.js";
const quoteBox = document.getElementById("quoteBox");
const newQuoteBtn = document.getElementById("newQuoteBtn");
async function loadQuote() {
    const quote = await getApostleQuote();
    quoteBox.innerHTML = `"${quote.content}" – ${quote.author}`;
}
newQuoteBtn.addEventListener("click", loadQuote);
loadQuote();
