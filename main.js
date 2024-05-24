(() => {
    const header = document.querySelector(".header");
    const squares = document.querySelectorAll(".square");
    const attempts = document.querySelector(".attempts");
    const guessColor = document.querySelector("#picked-color");
    const scoreSel = document.querySelector("#score");
    const highscoreSel = document.querySelector("#highscore");

    const easy = document.querySelector(".easy");
    const medium = document.querySelector(".medium");
    const hard = document.querySelector(".hard");
    const reset = document.querySelector(".reset");

    let score = 0;
    var num = 3;
    var counter = num - 1;
    var colors, picked;
    let highscore = 0;

    setup(3);

    easy.addEventListener("click", (event) => {
        easy.classList.add("active");
        medium.classList.remove("active");
        hard.classList.remove("active");

        setup(3);
    });

    medium.addEventListener("click", (event) => {
        medium.classList.add("active");
        easy.classList.remove("active");
        hard.classList.remove("active");

        setup(6);
    });

    hard.addEventListener("click", (event) => {
        hard.classList.add("active");
        easy.classList.remove("active");
        medium.classList.remove("active");

        setup(9);
    });

    reset.addEventListener("click", (event) => {
        document.querySelector("#mode .active").click();
        header.style.backgroundColor = "#1f2937";
    });

    for (let x = 0; x < squares.length; x++) {
        squares[x].stylebackgroundColor = colors[x];
        squares[x].addEventListener("click", function () {
            var selectedColor = this.style.backgroundColor;

            if (counter > 0) {
                if (selectedColor == picked) {
                    counter = num - 1;
                    updateScore(10);
                    updateHighscore();
                    initalizeSquares(selectedColor);
                    header.style.backgroundColor = selectedColor;
                    attempts.textContent =
                        "Congratulations! 🥳 You guessed it right!";
                } else {
                    counter--;
                    this.style.backgroundColor = "#1f2937";
                    this.style.pointerEvents = "none";
                    attempts.textContent = `Attempts Left: ${counter}`;
                }
            }

            if (counter == 0) {
                updateScore(0);
                this.style.pointerEvents = "none";
                attempts.innerHTML = "Aw &#128577; Try Again?";
                document
                    .querySelectorAll('.square[style*="pointer-events: auto;"]')
                    .forEach((s) => {
                        s.style.pointerEvents = "none";
                    });
            }
        });
    }

    function generateColor() {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);

        return `rgb(${red}, ${green}, ${blue})`;
    }

    function generateRandomColors(num) {
        let colors = [];

        for (let x = 0; x < num; x++) {
            colors.push(generateColor());
        }

        return colors;
    }

    function pickedColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function initalizeSquares(colors) {
        for (let x = 0; x < squares.length; x++) {
            if (typeof colors !== "string") {
                if (colors[x] != null) {
                    squares[x].style.background = colors[x];
                    squares[x].style.display = "block";
                    squares[x].style.pointerEvents = "auto";
                } else {
                    squares[x].style.display = "none";
                    squares[x].style.pointerEvents = "none";
                }
            } else {
                squares[x].style.backgroundColor = colors;
                squares[x].style.pointerEvents = "none";
            }
        }
    }

    function setup(x) {
        num = x;

        if (num == 3) {
            counter = num - 1;
        } else if (num == 6) {
            counter = num - 3;
        } else if (num == 9) {
            counter = num - 5;
        }

        // updateScore(0);
        colors = generateRandomColors(num);
        picked = pickedColor(colors);
        guessColor.innerHTML = picked.toUpperCase();
        attempts.textContent = `Attempts Left: ${counter}`;

        initalizeSquares(colors);
        header.style.backgroundColor = "#1f2937";
    }

    function updateScore(currentScore) {
        if (currentScore == 0) {
            score = 0;
        } else {
            score = score + currentScore;
        }

        scoreSel.textContent = `Score: ${score}`;
    }

    function updateHighscore() {
        if (score > highscore) {
            highscore = score;
            highscoreSel.textContent = `Highscore: ${highscore}`;
        }
    }
})();
