const bodyElement = document.getElementById("main-body");
const form = document.getElementById("startForm");
const usernameInput = document.getElementById("username");
const errorMsg = document.getElementById("errorMsg");
const loginPage = document.getElementById("login-page");
const gamePage = document.getElementById("game-page");
const timer = document.getElementById("realtime");
const infoPage = document.querySelector(".info-page");
const scorePage = document.querySelector(".score-page");
const qrPage = document.querySelector(".qr-container");
const resultMessageElement = document.querySelector(".info-label");
const nextBtn = document.querySelectorAll(".next");
const prevBtn = document.querySelectorAll(".prev");
const homeBtn = document.querySelector(".home");
const restartBtn = document.querySelector(".restart-btn");
const userNameElement = document.querySelector(".user-name");
const mins = 2;
const resultText = {
    win: "You Win! 🎉",
    lose: "You Lose! ❌"
}

let currentPage = 1;
let countPieces = 0;
let totalPieces = 0;


const ASSETS = [
  // GAME
  "assets/images/main-with.png",

  // LOGIN
  "assets/images/game final-05.png",
  "assets/images/checked.svg",
  "assets/images/start-btn.svg",

  // FOOTER
  "assets/images/logo-3.svg",
  "assets/images/logo-1.svg",
  "assets/images/new-logo.png",
  "assets/images/missing-logo.svg",
  "assets/images/msd-logo.svg",

  // INFO PAGE
  "assets/images/Asset 15.png",
  "assets/images/Asset 18.svg",
  "assets/images/Asset 11.png",
  "assets/images/img-3-07.png",
  "assets/images/img-2-06.png",
  "assets/images/img-1-05.png",
  "assets/images/Asset 14.svg",
  "assets/images/Asset 17.svg",
  "assets/images/Asset 16.svg",

  // QR
  "assets/images/Asset 2-last-2-01.svg",
  "assets/images/Asset 3-last-2-01.svg",
  "assets/images/Asset 1-last-2-01.svg",
  "assets/images/Asset 5-last--2-01.svg",

  // NAV
  "assets/images/next-btn.svg",
  "assets/images/prev-btn.svg",
  "assets/images/home-btn.svg",
  "assets/images/restart-btn.svg",
  "assets/images/preview.svg"
];