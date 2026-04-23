
// start countdown
function startCountDown(mins, timerContainer) {
    let seconds = mins * 60;

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    const interval = setInterval(() => {
        if (seconds <= 0) {
            timerContainer.textContent = "00:00";
            clearInterval(interval);
            if (countPieces !== totalPieces) {
                displayInfoPage(false);
            }
            // end game
        } else {
            timerContainer.textContent = formatTime(seconds);
            seconds--;
        }
    }, 1000);
}


// set width and height window
// let windowWidth = $(window).width();
// let windowHeight = $(window).height();
// let width = 1366;
// let height = 768;
// $(window).on('resize', function () {
//     windowWidth = $(window).width();
//     windowHeight = $(window).height();
//     if (windowHeight > windowWidth) {
//         width = 768;
//         height = 1366;
//     }
// })


// start sounds

// let gameSound = new Audio('assets/sounds/gameSound.mp3');;
// function startGameSound() {
//     // gameSound.play();
//     // // start countDown
//     // gameSound.addEventListener('ended', function () {
//     //     this.play();
//     // }, false);
// }

const cardSound = new Audio('assets/sounds/cardSound.mp3');
function startCardSound() {
    cardSound.play();
}



function toggleFullScreen() {
    let gamePage = document.getElementById('game-page');
    let puzzleCanvas = document.getElementById('myCanvas');
    gamePage.appendChild(puzzleCanvas);

    // if (!document.fullscreenElement) {
    //     gamePage.requestFullscreen();
    // } else {
    //     if (document.exitFullscreen) {
    //         gamePage.exitFullscreen();
    //     }
    // }


    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }


}

// Full screen

function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

iOS() ? $('#full-screen').hide() : $('#full-screen').show();

function displayInfoPage(isWinner) {
    gamePage.style.display = "none";
    infoPage.style.display = "flex";
    currentPage++;
    resultMessageElement.innerHTML = isWinner ? resultText.win : resultText.lose;
    infoPage.classList.add("fade-in");
}

function startGame() {
    startCountDown(mins, timer);
    // ---- Get size of canvas holder (beside the sidebar) ----
    const holder = document.getElementById('canvas-holder');
    const width = holder.clientWidth;
    const height = holder.clientHeight;
    // ---- Render Frame INTO the canvas-holder div (not fullscreen) ----
    const frame = new Frame({
        scaling: "canvas-holder",   // the HTML element ID
        width: width,
        height: height,
        color: "rgba(0,0,0,0.5)",
        outerColor: "#000"
    });

    frame.on("ready", function () {
        zog("ready from ZIM Frame");
        const stage = frame.stage;
        let puzzleX;
        let puzzleY;

        let con = new Container;
        let imageObj;
        let piecesArrayObj = [];
        frame.loadAssets(["main-with.png"], "assets/images/");

        frame.on("complete", function () {
            imageObj = frame.asset("main-with.png").clone();

            let horizontalPieces = 5;
            let verticalPieces = 3;
            let obj = getQueryString();
            if (obj) {
                horizontalPieces = obj.row;
                verticalPieces = obj.column;
            }

            let originalWidth = imageObj.width;
            let originalHeight = imageObj.height;

            // ---- left area inside canvas for scattered tiles ----
            let leftScatterArea = frame.width * 0.25;
            let availableWidth = frame.width - leftScatterArea - 40;
            let availableHeight = frame.height - 60;

            let scaleFactor = Math.min(
                availableWidth / originalWidth,
                availableHeight / originalHeight,
                1
            );

            let imageWidth = Math.round(originalWidth * scaleFactor);
            let imageHeight = Math.round(originalHeight * scaleFactor);

            imageObj.siz(imageWidth, imageHeight);

            let pieceWidth = Math.round(imageWidth / horizontalPieces);
            let pieceHeight = Math.round(imageHeight / verticalPieces);
            let gap = 40;
            totalPieces = horizontalPieces * verticalPieces;

            puzzleX = leftScatterArea + (availableWidth - imageWidth) / 2;
            puzzleY = (frame.height - imageHeight) / 2;

            // ---- Build tab/blank data ----
            for (j = 0; j < verticalPieces; j++) {
                piecesArrayObj[j] = [];
                for (i = 0; i < horizontalPieces; i++) {
                    piecesArrayObj[j][i] = {};
                    piecesArrayObj[j][i].right = (i === horizontalPieces - 1) ? -1 : Math.floor(Math.random() * 2);
                    piecesArrayObj[j][i].down = (j === verticalPieces - 1) ? -1 : Math.floor(Math.random() * 2);
                    piecesArrayObj[j][i].up = (j === 0) ? -1 : 1 - piecesArrayObj[j - 1][i].down;
                    piecesArrayObj[j][i].left = (i === 0) ? -1 : 1 - piecesArrayObj[j][i - 1].right;
                }
            }

            function drawPiecePath(context, i, j, offsetX, offsetY) {
                let tileObj = piecesArrayObj[j][i];
                let x8 = pieceWidth / 8;
                let y8 = pieceHeight / 8;

                context.moveTo(offsetX, offsetY);

                // TOP
                if (tileObj.up === -1) {
                    context.lineTo(offsetX + 8 * x8, offsetY);
                } else {
                    context.lineTo(offsetX + 3 * x8, offsetY);
                    if (tileObj.up === 1) {
                        context.curveTo(offsetX + 2 * x8, offsetY - 2 * y8, offsetX + 4 * x8, offsetY - 2 * y8);
                        context.curveTo(offsetX + 6 * x8, offsetY - 2 * y8, offsetX + 5 * x8, offsetY);
                    } else {
                        context.curveTo(offsetX + 2 * x8, offsetY + 2 * y8, offsetX + 4 * x8, offsetY + 2 * y8);
                        context.curveTo(offsetX + 6 * x8, offsetY + 2 * y8, offsetX + 5 * x8, offsetY);
                    }
                    context.lineTo(offsetX + 8 * x8, offsetY);
                }

                // RIGHT
                if (tileObj.right === -1) {
                    context.lineTo(offsetX + 8 * x8, offsetY + 8 * y8);
                } else {
                    context.lineTo(offsetX + 8 * x8, offsetY + 3 * y8);
                    if (tileObj.right === 1) {
                        context.curveTo(offsetX + 10 * x8, offsetY + 2 * y8, offsetX + 10 * x8, offsetY + 4 * y8);
                        context.curveTo(offsetX + 10 * x8, offsetY + 6 * y8, offsetX + 8 * x8, offsetY + 5 * y8);
                    } else {
                        context.curveTo(offsetX + 6 * x8, offsetY + 2 * y8, offsetX + 6 * x8, offsetY + 4 * y8);
                        context.curveTo(offsetX + 6 * x8, offsetY + 6 * y8, offsetX + 8 * x8, offsetY + 5 * y8);
                    }
                    context.lineTo(offsetX + 8 * x8, offsetY + 8 * y8);
                }

                // BOTTOM
                if (tileObj.down === -1) {
                    context.lineTo(offsetX, offsetY + 8 * y8);
                } else {
                    context.lineTo(offsetX + 5 * x8, offsetY + 8 * y8);
                    if (tileObj.down === 1) {
                        context.curveTo(offsetX + 6 * x8, offsetY + 10 * y8, offsetX + 4 * x8, offsetY + 10 * y8);
                        context.curveTo(offsetX + 2 * x8, offsetY + 10 * y8, offsetX + 3 * x8, offsetY + 8 * y8);
                    } else {
                        context.curveTo(offsetX + 6 * x8, offsetY + 6 * y8, offsetX + 4 * x8, offsetY + 6 * y8);
                        context.curveTo(offsetX + 2 * x8, offsetY + 6 * y8, offsetX + 3 * x8, offsetY + 8 * y8);
                    }
                    context.lineTo(offsetX, offsetY + 8 * y8);
                }

                // LEFT
                if (tileObj.left === -1) {
                    context.lineTo(offsetX, offsetY);
                } else {
                    context.lineTo(offsetX, offsetY + 5 * y8);
                    if (tileObj.left === 1) {
                        context.curveTo(offsetX - 2 * x8, offsetY + 6 * y8, offsetX - 2 * x8, offsetY + 4 * y8);
                        context.curveTo(offsetX - 2 * x8, offsetY + 2 * y8, offsetX, offsetY + 3 * y8);
                    } else {
                        context.curveTo(offsetX + 2 * x8, offsetY + 6 * y8, offsetX + 2 * x8, offsetY + 4 * y8);
                        context.curveTo(offsetX + 2 * x8, offsetY + 2 * y8, offsetX, offsetY + 3 * y8);
                    }
                    context.lineTo(offsetX, offsetY);
                }
                context.closePath();
            }

            // ---- Background puzzle-shaped hint ----
            let bgContainer = new Container();
            for (let jj = 0; jj < verticalPieces; jj++) {
                for (let ii = 0; ii < horizontalPieces; ii++) {
                    let bgPiece = new Shape();
                    let bgCtx = bgPiece.graphics;
                    bgCtx.setStrokeStyle(1.5, "round");
                    bgCtx.beginStroke("rgba(255,255,255,0.6)");
                    let bgFill = bgCtx.beginBitmapFill(imageObj.image).command;
                    bgFill.matrix = new createjs.Matrix2D().scale(scaleFactor, scaleFactor);
                    drawPiecePath(bgCtx, ii, jj, pieceWidth * ii, pieceHeight * jj);
                    bgCtx.endStroke();
                    bgPiece.addTo(bgContainer);
                }
            }
            bgContainer.pos(puzzleX, puzzleY);
            bgContainer.alpha = 0.25;
            bgContainer.addTo(con);

            // ---- Draggable pieces ----
            for (j = 0; j < verticalPieces; j++) {
                for (i = 0; i < horizontalPieces; i++) {
                    let offsetX = pieceWidth * i;
                    let offsetY = pieceHeight * j;

                    let s = new Shape;
                    let context = s.graphics;
                    s.drag();
                    s.mouseChildren = false;

                    s.addEventListener("pressup", function (e) {
                        let mc = e.currentTarget;
                        let xx = Math.round(mc.x);
                        let yy = Math.round(mc.y);

                        if (xx < puzzleX + gap / 2 && xx > puzzleX - gap / 2 &&
                            yy < puzzleY + gap / 2 && yy > puzzleY - gap / 2) {
                            mc.x = puzzleX;
                            mc.y = puzzleY;
                            mc.noDrag();
                            mc.mouseChildren = false;
                            mc.mouseEnabled = false;
                            countPieces++;
                            startCardSound();
                            if (countPieces == totalPieces) {
                                displayInfoPage(true);
                            }
                            stage.update();
                        }
                    });

                    context.setStrokeStyle(2, "round");
                    context.beginStroke("#000");
                    let bmpFill = context.beginBitmapFill(imageObj.image).command;
                    bmpFill.matrix = new createjs.Matrix2D().scale(scaleFactor, scaleFactor);
                    drawPiecePath(context, i, j, offsetX, offsetY);
                    context.endStroke();

                    s.addTo(con);

                    let scatterPadding = 20;
                    let scatterMinX = scatterPadding - offsetX;
                    let scatterMaxX = leftScatterArea - pieceWidth - scatterPadding - offsetX;
                    let scatterMinY = scatterPadding - offsetY;
                    let scatterMaxY = frame.height - pieceHeight - scatterPadding - offsetY;

                    s.animate({
                        obj: {
                            x: rand(scatterMinX, scatterMaxX),
                            y: rand(scatterMinY, scatterMaxY)
                        },
                        time: 700
                    });
                }
            }

            con.addTo(stage);
            stage.update();

        }); // complete

        stage.update();

    }); // ready

    // ---- Resize canvas when window resizes ----
    window.addEventListener('resize', function () {
        let h = document.getElementById('canvas-holder');
        let canvas = h.querySelector('canvas');
        if (canvas) {
            canvas.width = h.clientWidth;
            canvas.height = h.clientHeight;
            if (frame && frame.stage) frame.stage.update();
        }
    });
}

// SCALING OPTIONS
// scaling can have values as follows with full being the default
// "fit"	sets canvas and stage to dimensions and scales to fit inside window size
// "outside"	sets canvas and stage to dimensions and scales to fit outside window size
// "full"	sets stage to window size with no scaling
// "tagID"	add canvas to HTML tag of ID - set to dimensions if provided - no scaling
