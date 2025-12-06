import { getChapterList, getChapterText } from "./api/scripture.js";

const selectElement = document.getElementById('chapterSelect');
const contentArticle = document.getElementById('chapterContent');

// --- Progress Tracking Keys for localStorage ---
const LAST_READ_KEY = 'bomLastReadDate';
const CHAPTER_COUNT_KEY = 'bomCompletedChapterCount';
const STREAK_KEY = 'bomReadingStreak';

// --- Core Chapter Display Logic ---

async function loadChapterSelect() {
    const chapters = await getChapterList();

    selectElement.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "--- Select a Chapter to Read ---";
    selectElement.appendChild(defaultOption);

    // Add options for every chapter
    chapters.forEach((chapter) => {
        const option = document.createElement('option');
        option.value = chapter.reference;
        option.textContent = chapter.reference;
        selectElement.appendChild(option);
    });

    selectElement.addEventListener('change', handleChapterChange);

    // Load the first chapter by default
    if (chapters.length > 0) {
        selectElement.value = chapters[0].reference;
        await displayChapter(chapters[0].reference);
    }
}

async function handleChapterChange(event) {
    const selectedReference = event.target.value;
    if (selectedReference) {
        await displayChapter(selectedReference);
    } else {
        contentArticle.innerHTML = '';
    }
}

async function displayChapter(reference) {
    const chapter = await getChapterText(reference);

    contentArticle.innerHTML = '';

    const refTitle = document.createElement('h2');
    refTitle.id = 'reference';
    refTitle.textContent = chapter.reference;
    contentArticle.appendChild(refTitle);

    const fullText = document.createElement('p');
    fullText.id = 'full-text';
    fullText.style.whiteSpace = 'pre-wrap';
    fullText.textContent = chapter.text;
    contentArticle.appendChild(fullText);

    addMarkReadButton(reference);
}

//This creates or updates the "Mark as Read" button.

function addMarkReadButton(reference) {
    let readButton = document.getElementById('markReadButton');

    if (!readButton) {
        readButton = document.createElement('button');
        readButton.id = 'markReadButton';
        contentArticle.appendChild(readButton);
    }

    readButton.textContent = `Mark ${reference} as Read`;

    readButton.removeEventListener('click', handleMarkRead);
    readButton.addEventListener('click', () => handleMarkRead(reference));
}


//This handles the logic when a chapter is marked as read.

function handleMarkRead(reference) {
    let completedCount = parseInt(localStorage.getItem(CHAPTER_COUNT_KEY) || 0);
    localStorage.setItem(CHAPTER_COUNT_KEY, completedCount + 1);

    calculateAndStoreStreak();

    alert(`Chapter ${reference} marked as read! Your progress has been updated.`);
    const readButton = document.getElementById('markReadButton');
    if (readButton) readButton.disabled = true;
}

function calculateAndStoreStreak() {
    const lastReadDateStr = localStorage.getItem(LAST_READ_KEY);
    const today = new Date();
    const streak = parseInt(localStorage.getItem(STREAK_KEY) || 0);

    const todayStr = today.toISOString().split('T')[0];

    // If already read today, do nothing to the streak count
    if (lastReadDateStr === todayStr) {
        return;
    }

    // Calculate yesterday's date string
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // If the last read was yesterday, extend the streak
    if (lastReadDateStr === yesterdayStr) {
        localStorage.setItem(STREAK_KEY, streak + 1);
    }
    // Otherwise, the streak is broken
    else {
        localStorage.setItem(STREAK_KEY, 1);
    }

    // Always set the last read date to today
    localStorage.setItem(LAST_READ_KEY, todayStr);
}

// To initialize the reading page
document.addEventListener("DOMContentLoaded", async () => {
    calculateAndStoreStreak();
    loadChapterSelect();
});