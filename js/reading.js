import { getBookOfMormonChapter } from "./api/scripture.js";
document.addEventListener("DOMContentLoaded", async () => {
    const scripture = await getBookOfMormonChapter();
    document.querySelector("#reference").textContent = scripture.reference;
    document.querySelector("#full-text").textContent = scripture.text;
});

