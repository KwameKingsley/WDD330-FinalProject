export async function getBookOfMormon() {
    const url = "https://bible-api.com/book_of_mormon.json";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load Book of Mormon");
    return response.json();
}
