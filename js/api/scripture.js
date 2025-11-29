const SCRIPTURE_API = "";
export async function getScripture() {
    try {
        const response = await fetch(SCRIPTURE_API);
        if (!response.ok) {
            throw new Error("Scripture API returned an error");
        }
        const data = await response.json();

        const verse = data[0];
        return {
            reference: `${verse.bookname} ${verse.chapter}:${verse.verse}`,
            text: verse.text
        };
    } catch (error) {
        console.error("Failed to load scripture:", error);
        return {
            reference: "Unavailable",
            text: "Unable to load scripture right now."
        };
    }
}


