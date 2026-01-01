let currentPage = 1;
const totalPages = 10; // ANPASSEN, wenn du mehr Seiten hast

const comicPage = document.getElementById("comic-page");

document.addEventListener("click", function(event) {
  const screenWidth = window.innerWidth;
  const clickX = event.clientX;

  if (clickX > screenWidth / 2) {
    // rechte Bildschirmhälfte → Seite zurück
    if (currentPage > 1) currentPage--;
  } else {
    // linke Bildschirmhälfte → nächste Seite
    if (currentPage < totalPages) currentPage++;
  }

  comicPage.src = `pages/page${currentPage}.png`;
});
