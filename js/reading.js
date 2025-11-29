import { getBookOfMormon } from "./api/bomApi.js";
const chapterSelect = document.getElementById("chapterSelect");
const chapterContent = document.getElementById("chapterContent");
async function init() {
    const bom = await getBookOfMormon();
    bom.verses.forEach((verse) => {
        const option = document.createElement("option");
        option.value = verse.reference;
        option.textContent = verse.reference;
        chapterSelect.appendChild(option);
    });
    chapterSelect.addEventListener("change", () => {
        chapterContent.textContent = bom.verses
            .filter(v => v.reference === chapterSelect.value)
            .map(v => v.text)
            .join(" ");
    });
}
init();
