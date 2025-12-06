const SCRIPTURE_API = "https://raw.githubusercontent.com/bcbooks/scriptures-json/master/book-of-mormon.json";
let scriptureData = null;

async function fetchScriptureData() {
    if (scriptureData) return scriptureData;

    try {
        const response = await fetch(SCRIPTURE_API);
        if (!response.ok) {
            throw new Error("Scripture API fetch failed");
        }
        scriptureData = await response.json();
        return scriptureData;
    } catch (error) {
        console.error("Failed to load scripture data:", error);
        return null;
    }
}

// --- Functions for Reading Page ---

export async function getChapterList() {
    const data = await fetchScriptureData();
    if (!data) return [];

    const chapters = [];
    data.books.forEach(book => {
        book.chapters.forEach(chapter => {
            const reference = `${book.book} ${chapter.chapter}`;
            chapters.push({
                reference: reference,
                // This will combine all verses, separated by double line breaks for readability
                text: chapter.verses.map(v => `${v.verse}. ${v.text}`).join('\n\n')
            });
        });
    });
    return chapters;
}

//This gets the text for a specific chapter reference.

export async function getChapterText(reference) {
    const allChapters = await getChapterList();
    const chapter = allChapters.find(c => c.reference === reference);
    return chapter ? { reference: chapter.reference, text: chapter.text } :
        { reference: "Chapter Not Found", text: "Please select a valid chapter." };
}

// This will get the total number of chapters in the Book of Mormon for progress tracking.
export async function getTotalChapterCount() {
    const chapters = await getChapterList();
    return chapters.length;
}


// Gets a single random verse for the index page.
export async function getRandomScripture() {
    const data = await fetchScriptureData();
    if (!data) {
        return { reference: "Unavailable", text: "Unable to load scripture right now." };
    }

    // Flattens all verses into one array to pick a random one
    const allVerses = data.books.flatMap(book =>
        book.chapters.flatMap(chapter =>
            chapter.verses.map(verse => ({
                reference: `${book.book} ${chapter.chapter}:${verse.verse}`,
                text: verse.text
            }))
        )
    );

    if (allVerses.length === 0) {
        return { reference: "Unavailable", text: "No verses found." };
    }

    const randomIndex = Math.floor(Math.random() * allVerses.length);
    return allVerses[randomIndex];
}