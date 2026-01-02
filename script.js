let currentPage = 1;

const img = document.getElementById("comic-page");
const pageIndicator = document.createElement("div");
const fullscreenBtn = document.createElement("button");

// ---------- STYLES ----------
pageIndicator.style.position = "fixed";
pageIndicator.style.bottom = "10px";
pageIndicator.style.right = "20px";
pageIndicator.style.color = "white";
pageIndicator.style.fontFamily = "Arial, sans-serif";
pageIndicator.style.background = "rgba(0,0,0,0.6)";
pageIndicator.style.padding = "5px 10px";
pageIndicator.style.borderRadius = "5px";
pageIndicator.style.zIndex = "1000";

fullscreenBtn.textContent = "⛶ Vollbild";
fullscreenBtn.style.position = "fixed";
fullscreenBtn.style.top = "10px";
fullscreenBtn.style.right = "20px";
fullscreenBtn.style.zIndex = "1000";
fullscreenBtn.style.padding = "6px 10px";
fullscreenBtn.style.cursor = "pointer";

document.body.appendChild(pageIndicator);
document.body.appendChild(fullscreenBtn);

// ---------- FUNCTIONS ----------

function updatePageIndicator() {
  pageIndicator.textContent = `Seite ${currentPage}`;
}

function pageExists(pageNumber) {
  return fetch(`pages/page${pageNumber}.png`, { method: "HEAD" })
    .then(response => response.ok)
    .catch(() => false);
}

function loadPage(pageNumber) {
  pageExists(pageNumber).then(exists => {
    if (exists) {
      currentPage = pageNumber;
      img.src = `pages/page${currentPage}.png`;
      updatePageIndicator();
    }
  });
}

// ---------- CLICK NAVIGATION ----------
document.addEventListener("click", function (event) {
  const screenWidth = window.innerWidth;
  const clickX = event.clientX;

  // Klick auf UI-Elemente ignorieren
  if (event.target === fullscreenBtn) return;

  if (clickX < screenWidth / 2) {
    // NÄCHSTE SEITE
    loadPage(currentPage + 1);
  } else {
    // VORHERIGE SEITE (Minimum = 1)
    if (currentPage > 1) {
      currentPage--;
      img.src = `pages/page${currentPage}.png`;
      updatePageIndicator();
    }
  }
});

// ---------- FULLSCREEN ----------
fullscreenBtn.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenBtn.textContent = "⤫ Vollbild verlassen";
  } else {
    document.exitFullscreen();
    fullscreenBtn.textContent = "⛶ Vollbild";
  }
});

// ---------- INIT ----------
updatePageIndicator();
