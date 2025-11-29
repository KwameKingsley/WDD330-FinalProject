export async function getApostleQuote() {
    try {
        const url = "https://lds-quote-api.vercel.app/api/quote";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Quote fetch failed");
        const data = await response.json();
        return {
            quote: data.quote,
            author: data.author
        };
    } catch (error) {
        console.error("QUOTE ERROR:", error);
        return {
            quote: "Could not load quote.",
            author: "Unknown"
        };
    }
}
