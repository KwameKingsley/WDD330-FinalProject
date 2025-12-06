import { getRandomScripture, getTotalChapterCount } from "./api/scripture.js";
import { getApostleQuoteData } from "./api/quotes.js";

// --- External API 2 ---
const MOTIVATIONAL_API = "https://api.adviceslip.com/advice";

// --- Progress Tracking Keys
const CHAPTER_COUNT_KEY = 'bomCompletedChapterCount';
const STREAK_KEY = 'bomReadingStreak';

// This initializes the main page content once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Load data and content
    loadScripture();
    loadQuote();

    // 2. Load external motivational message (API 2)
    await loadMotivationalMessage();

    // 3. Load progress summary
    await displayProgressSummary();

    console.log("Main page initialized and fetching daily content.");
});

// Fetches a random scripture (External API 1) and updates the HTML elements.

async function loadScripture() {
    try {
        const scripture = await getRandomScripture();
        const refElement = document.querySelector("#scriptureRef");
        const textElement = document.querySelector("#scriptureText");

        if (refElement && textElement) {
            refElement.textContent = scripture.reference;
            textElement.textContent = scripture.text.substring(0, 500) + "...";
        }
    } catch (error) {
        console.error("Failed to load scripture:", error);
        document.querySelector("#scriptureRef").textContent = "Error loading scripture.";
        document.querySelector("#scriptureText").textContent = "Please check your network connection.";
    }
}

// Fetches the daily LDS Apostle quote (Local Data) and updates the HTML.
function loadQuote() {
    // Synchronous call to the local quote data
    try {
        const quote = getApostleQuoteData();
        const textElement = document.querySelector("#quoteText");
        const authorElement = document.querySelector("#quoteAuthor");

        if (textElement && authorElement) {
            textElement.textContent = quote.quote;
            authorElement.textContent = `— ${quote.author}`;
        }
    } catch (error) {
        console.error("Failed to load quote:", error);
    }
}

// This fetches a general motivational quote (External API 2: Advice Slip)

async function loadMotivationalMessage() {
    try {
        const response = await fetch(MOTIVATIONAL_API);

        if (!response.ok) {
            throw new Error(`Advice Slip API failed: ${response.status}`);
        }

        const data = await response.json();
        const advice = data.slip.advice;

        const messageElement = document.querySelector("#motivationalMessage");

        if (messageElement) {
            messageElement.innerHTML = `
                <p>"${advice}"</p>
                <cite>— Daily Advice</cite>
            `;
        }
    } catch (error) {
        console.error("Motivational API Error:", error);
        const messageElement = document.querySelector("#motivationalMessage");
        if (messageElement) {
            messageElement.textContent = "Motivation is temporary, discipline is permanent. — System Developer";
        }
    }
}


// This reads data from localStorage and displays the user's progress summary

async function displayProgressSummary() {
    const totalChapters = await getTotalChapterCount();

    const completed = parseInt(localStorage.getItem(CHAPTER_COUNT_KEY) || 0);
    const streak = parseInt(localStorage.getItem(STREAK_KEY) || 0);

    const progressPercent = totalChapters > 0 ? ((completed / totalChapters) * 100).toFixed(1) : 0;

    const completedElement = document.getElementById('chaptersCompleted');
    const streakElement = document.getElementById('currentStreak');
    const progressElement = document.getElementById('overallProgress');

    if (completedElement && streakElement && progressElement) {
        completedElement.textContent = completed;
        streakElement.textContent = `${streak} days`;
        progressElement.textContent = `${progressPercent}%`;
    } else {
        console.warn("Progress summary elements not found. Did you add the #progress-summary section to index.html?");
    }
}