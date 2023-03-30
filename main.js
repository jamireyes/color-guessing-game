const header = document.querySelector(".header");
const squares = document.querySelectorAll(".square");
const attempts = document.querySelector(".attempts");
const guessColor = document.querySelector("#picked-color");

const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
const reset = document.querySelector(".reset");

var num = 3;
var counter = num - 1;
var colors = generateRandomColors(num);
var picked = pickedColor(colors);
initalizeSquares(colors);
guessColor.innerHTML = picked;
attempts.textContent = `Attempts Left: ${counter}`;

easy.addEventListener("click", (event) => {
    easy.classList.add("active");
    medium.classList.remove("active");
    hard.classList.remove("active");
    header.style.backgroundColor = "#FFF";

    num = 3;
    counter = num - 1;
    colors = generateRandomColors(num);
    picked = pickedColor(colors);
    guessColor.innerHTML = picked;
    attempts.textContent = `Attempts Left: ${counter}`;

    initalizeSquares(colors);
});

medium.addEventListener("click", (event) => {
    medium.classList.add("active");
    easy.classList.remove("active");
    hard.classList.remove("active");
    header.style.backgroundColor = "#FFF";

    num = 6;
    counter = num - 3;
    colors = generateRandomColors(num);
    picked = pickedColor(colors);
    guessColor.innerHTML = picked;
    attempts.textContent = `Attempts Left: ${counter}`;

    initalizeSquares(colors);
});

hard.addEventListener("click", (event) => {
    hard.classList.add("active");
    easy.classList.remove("active");
    medium.classList.remove("active");
    header.style.backgroundColor = "#FFF";

    num = 9;
    counter = num - 5;
    colors = generateRandomColors(num);
    picked = pickedColor(colors);
    guessColor.innerHTML = picked;
    attempts.textContent = `Attempts Left: ${counter}`;

    initalizeSquares(colors);
});

reset.addEventListener("click", (event) => {
    document.querySelector("#mode .active").click();
    header.style.backgroundColor = "#FFF";
});

for (let x = 0; x < squares.length; x++) {
    squares[x].stylebackgroundColor = colors[x];
    squares[x].addEventListener("click", function () {
        var clickedColor = this.style.backgroundColor;

        if (counter > 0) {
            if (clickedColor === picked) {
                initalizeSquares(clickedColor);
                header.style.backgroundColor = clickedColor;
                counter = num - 1;
                attempts.textContent = "Congratulations! You guessed it right!";
            } else {
                this.style.backgroundColor = "#FFF";
                this.style.pointerEvents = "none";
                counter--;
                attempts.textContent = `Attempts Left: ${counter}`;
            }
        } else {
            this.style.pointerEvents = "none";
            attempts.innerHTML = "Aw &#128577; Try Again?";
            counter = num - 1;

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
        }
    }
}
