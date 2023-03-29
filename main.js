const header = document.querySelector(".header");
const squares = document.querySelectorAll(".square");
const attempts = document.querySelector(".attempts");
const guessColor = document.querySelector("#picked-color");

const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
const reset = document.querySelector(".reset");

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
        squares[x].style.backgroundColor =
            typeof colors !== "string" ? colors[x] : colors;
    }
}

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

    for (var i = 0; i < squares.length; i++) {
        if (colors[i] != null) {
            squares[i].style.background = colors[i];
            squares[i].style.display = "block";
            squares[i].style.pointerEvents = "auto";
        } else {
            squares[i].style.display = "none";
            squares[i].style.pointerEvents = "none";
        }
    }
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

    for (var i = 0; i < squares.length; i++) {
        if (colors[i] != null) {
            squares[i].style.background = colors[i];
            squares[i].style.display = "block";
            squares[i].style.pointerEvents = "auto";
        } else {
            squares[i].style.display = "none";
            squares[i].style.pointerEvents = "none";
        }
    }
});

hard.addEventListener("click", (event) => {
    hard.classList.add("active");
    easy.classList.remove("active");
    medium.classList.remove("active");
    header.style.backgroundColor = "#FFF";

    num = 9;
    counter = num - 6;
    colors = generateRandomColors(num);
    picked = pickedColor(colors);
    guessColor.innerHTML = picked;
    attempts.textContent = `Attempts Left: ${counter}`;

    for (var i = 0; i < squares.length; i++) {
        if (colors[i] != null) {
            squares[i].style.background = colors[i];
            squares[i].style.display = "block";
            squares[i].style.pointerEvents = "auto";
        } else {
            squares[i].style.display = "none";
            squares[i].style.pointerEvents = "none";
        }
    }
});

reset.addEventListener("click", (event) => {
    document.querySelector("#mode .active").click();
    header.style.backgroundColor = "#FFF";
});

for (let x = 0; x < squares.length; x++) {
    squares[x].stylebackgroundColor = colors[x];
    squares[x].addEventListener("click", function () {
        var clickedColor = this.style.backgroundColor;

        // if (counter > 0) {
        // } else {
        //     document.querySelector("#mode .active").click();
        //     header.style.backgroundColor = "#FFF";
        //     alert("Try Again?");
        // }
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
            attempts.textContent = "Aw :( Try Again?";
            counter = num - 1;
        }
    });
}
