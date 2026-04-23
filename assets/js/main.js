nextBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (currentPage === 3) {
      infoPage.style.display = "none";
      qrPage.style.display = "flex";
      qrPage.classList.add("fade-in");
      currentPage++;
    } else if (currentPage === 4){
      qrPage.style.display = "none";
      scorePage.style.display = "flex";
      scorePage.classList.add("fade-in");
      currentPage++;

    }
  });
});

prevBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (currentPage === 4) { // 
      infoPage.style.display = "flex";
      qrPage.style.display = "none";
      infoPage.classList.add("fade-in");
      currentPage--;
    } else if (currentPage === 5){
      infoPage.style.display = "none";
      qrPage.style.display = "flex";
      scorePage.style.display = "none";
      qrPage.classList.add("fade-in");
      currentPage--;
    }
  });
});

homeBtn.addEventListener("click", function (e) {
  location.reload();
});

restartBtn.addEventListener("click", function (e) {
  location.reload();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();

  if (username.length < 2) {
    errorMsg.textContent = "Username must be at least 2 characters";
    return;
  }

  errorMsg.textContent = "";

  loginPage.classList.add("fade-out");

  setTimeout(() => {
    loginPage.style.display = "none";
    gamePage.style.display = "flex";
    gamePage.classList.add("fade-in");
    currentPage++;
    startGame();
  }, 400);

});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(function () {
    bodyElement.classList.add("loaded");
  }, 1000);
});












