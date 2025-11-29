const APOSTLES = [
    "Joseph Smith",
    "Russell M. Nelson",
    "Jeffrey R. Holland",
    "Dallin H. Oaks",
    "David A. Bednar",
    "Dieter F. Uchtdorf"
];
export async function getApostleQuote() {
    const response = await fetch("https://api.quotable.io/random?tags=religion");
    const data = await response.json();

    // This will ensure quote is by an apostle + mentions of Book of Mormon
    if (
        APOSTLES.includes(data.author) &&
        data.content.includes("Book of Mormon")
    ) {
        return data;
    }
    // recursive retry until valid
    return getApostleQuote();
}