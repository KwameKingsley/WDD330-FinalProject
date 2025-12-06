// --- Local Quotes Data ---
const LOCAL_QUOTES = [
    { quote: "Joy is powerful, and focusing on joy brings God’s power into our lives.", author: "Russell M. Nelson" },
    { quote: "Don’t you quit. You keep walking. You keep trying. There is help and happiness ahead.", author: "Jeffrey R. Holland" },
    { quote: "Doubt your doubts before you doubt your faith.", author: "Dieter F. Uchtdorf" },
    { quote: "The Book of Mormon is the keystone of our religion.", author: "Ezra Taft Benson" },
    { quote: "It is impossible to fail when you are doing your best.", author: "M. Russell Ballard" }
];

export function getApostleQuoteData() {
    try {
        const randomIndex = Math.floor(Math.random() * LOCAL_QUOTES.length);
        const randomQuote = LOCAL_QUOTES[randomIndex];

        return {
            quote: randomQuote.quote,
            author: randomQuote.author
        };
    } catch (error) {
        console.error("QUOTE ERROR in API file:", error);
        return { quote: "Could not load quote.", author: "Unknown" };
    }
}