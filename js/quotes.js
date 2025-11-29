import { getApostleQuote } from "./api/quotes.js";
document.addEventListener("DOMContentLoaded", async () => {
    const q = await getApostleQuote();
    document.querySelector("#quote-text").textContent = q.content;
    document.querySelector("#quote-author").textContent = q.author;
});
