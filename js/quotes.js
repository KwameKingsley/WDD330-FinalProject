// Import the data function
import { getApostleQuoteData } from "./api/quotes.js";


async function loadQuotesPage() {
    // Display multiple quotes on the dedicated quotes page
    const NUMBER_OF_QUOTES = 5;
    const container = document.querySelector("#quotesList");

    if (container) {
        container.innerHTML = '';

        for (let i = 0; i < NUMBER_OF_QUOTES; i++) {
            const quoteData = getApostleQuoteData();
            const quoteCard = document.createElement('section');
            quoteCard.classList.add('card', 'fade');
            const quoteTextElement = document.createElement('blockquote');
            quoteTextElement.textContent = `"${quoteData.quote}"`;
            quoteCard.appendChild(quoteTextElement);

            const authorElement = document.createElement('p');
            authorElement.innerHTML = `<strong>— ${quoteData.author}</strong>`;
            quoteCard.appendChild(authorElement);

            container.appendChild(quoteCard);
        }
    } else {
        console.error("Could not find container #quotesList on quotes.html");
    }
}

document.addEventListener("DOMContentLoaded", loadQuotesPage);