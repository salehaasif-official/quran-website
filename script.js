console.log("script loaded");

// ===============================
// Search
// ===============================

const searchInput = document.getElementById("searchInput");
const surahCards = document.querySelectorAll(".surah-card");

if (searchInput) {

  searchInput.addEventListener("keyup", () => {

    const searchValue = searchInput.value.toLowerCase();

    surahCards.forEach((card) => {

      const surahName = card.dataset.name.toLowerCase();

      if (surahName.includes(searchValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });

}

// ===============================
// Surah Loader
// ===============================

const surahContent = document.getElementById("surah-content");

if (surahContent) {

const surahNumber = surahContent.dataset.surah;

fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.asad,ur.jalandhry`)

.then(response => response.json())

.then(data => {

const arabicAyahs = data.data[0].ayahs;
const englishAyahs = data.data[1].ayahs;
const urduAyahs = data.data[2].ayahs;

let startIndex = 0;

// Surah 1 (Fatiha) aur Surah 9 (At-Tawbah) ko skip mat karo
if (surahNumber != 1 && surahNumber != 9) {
  if (arabicAyahs[0].text.includes("بِسْمِ")) {
    startIndex = 1;
  }
}

for (let i = startIndex; i < arabicAyahs.length; i++) {

surahContent.innerHTML += `

<div class="ayah-block">

<p class="arabic">
${arabicAyahs[i].text} ۝${i - startIndex + 1}
</p>

<p class="translation">
${englishAyahs[i].text}
</p>

<p class="translation">
${urduAyahs[i].text}
</p>

</div>

`;

}

// ===============================
// Bookmark Buttons
// ===============================

const ayahs = document.querySelectorAll(".ayah-block");

ayahs.forEach((ayah, index) => {

  const actions = document.createElement("div");
  actions.className = "ayah-actions";

  actions.innerHTML = `
    <button class="bookmark-btn">
      ⭐ Bookmark
    </button>
  `;

  ayah.appendChild(actions);

  const button = actions.querySelector(".bookmark-btn");

  button.addEventListener("click", () => {

    localStorage.setItem("bookmarkedAyah", index);

    button.innerHTML = "📌 Saved";

  });

});

});

}

// ===============================
// Restore Bookmark
// ===============================

window.addEventListener("load", () => {

  const savedTheme = localStorage.getItem("theme");

  if(savedTheme === "light"){
    document.body.classList.add("light-mode");
  }

  const themeButton = document.getElementById("themeToggle");

  if(themeButton){
    themeButton.innerHTML =
      document.body.classList.contains("light-mode")
      ? "🌙 Dark Mode"
      : "☀️ Light Mode";
  }

});

// ===============================
// Theme Toggle
// ===============================

document.addEventListener("click", (e) => {

  if(e.target && e.target.id === "themeToggle"){

    document.body.classList.toggle("light-mode");

    const button = document.getElementById("themeToggle");

    if(button){

      if(document.body.classList.contains("light-mode")){
        button.innerHTML = "🌙 Dark Mode";
      }else{
        button.innerHTML = "☀️ Light Mode";
      }

    }

    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-mode")
      ? "light"
      : "dark"
    );

  }

});
