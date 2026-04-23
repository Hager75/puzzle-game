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
const mins = 2;
const resultText = {
    win: "You Win! 🎉",
    lose: "You Lose! ❌"
}

let currentPage = 1;
let countPieces = 0;
let totalPieces = 0;

