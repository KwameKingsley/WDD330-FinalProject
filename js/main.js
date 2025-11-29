import { getScripture } from "./api/scripture.js";
import { getApostleQuote } from "./api/quotes.js";
document.addEventListener("DOMContentLoaded", async () => {
    loadScripture();
    loadQuote();
});
async function loadScripture() {
    const scripture = await getScripture();
    document.querySelector("#scriptureRef").textContent = scripture.reference;
    document.querySelector("#scriptureText").textContent =
        scripture.text.substring(0, 500) + "...";
}
async function loadQuote() {
    const quote = await getApostleQuote();
    document.querySelector("#quoteText").textContent = quote.quote;
    document.querySelector("#quoteAuthor").textContent = quote.author;
}