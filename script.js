const container = document.querySelector("div.container");
const input = document.querySelector("input");
const p = document.querySelector("p");
const colorPicker = document.querySelector("input#color-picker");
const greyscale = document.querySelector("#greyscale");
const eraser = document.querySelector("#eraser");

let rows = [];
let isMouseDown;
let color = colorPicker.value;
let greyscaleOn = false;
let eraserOn = false;
let colorPickerOn = true;

input.addEventListener("input", changeGrid);
colorPicker.style.backgroundColor = "#858282";

eraser.addEventListener("click", () => {
    eraserOn = !eraserOn;
    if (eraserOn) {
        eraser.style.backgroundColor = "#858282";
        colorPicker.style.backgroundColor = "#efefef"
        greyscale.style.backgroundColor = "#efefef";
    } else if (!eraserOn) {
        colorPicker.style.backgroundColor = "#858282";
        eraser.style.backgroundColor = "#efefef"
        greyscale.style.backgroundColor = "#efefef";
    }
    if (greyscaleOn) {
        greyscaleOn = !greyscaleOn;
    };
    if (colorPickerOn) {
        colorPickerOn = !colorPickerOn;
    };
});

colorPicker.addEventListener("click", () => {
    if (eraserOn) {
        eraserOn = !eraserOn;
    };
    if (greyscaleOn) {
        greyscaleOn = !greyscaleOn;
    };
    colorPicker.style.backgroundColor = "#858282";
    eraser.style.backgroundColor = "#efefef"
    greyscale.style.backgroundColor = "#efefef";
});

greyscale.addEventListener("click", () => {
    greyscaleOn = !greyscaleOn;
    if (greyscaleOn) {
        greyscale.style.backgroundColor = "#858282";
        colorPicker.style.backgroundColor = "#efefef"
        eraser.style.backgroundColor = "#efefef";
    } else if (!eraserOn) {
        colorPicker.style.backgroundColor = "#858282";
        eraser.style.backgroundColor = "#efefef"
        greyscale.style.backgroundColor = "#efefef";
    }
    if (eraserOn) {
        eraserOn = !eraserOn;
    };
    if (colorPickerOn) {
        colorPickerOn = !colorPickerOn;
    };
});

container.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isMouseDown = true;
});
container.addEventListener("mouseup", () => {
    isMouseDown = false;
});

function createGrid(size) {
    for (i=0; i<size; i++) {
        rows[i] = document.createElement("div");
        rows[i].classList.add("row");
        container.appendChild(rows[i]);
        for (j=0; j<size; j++) {
            let div = document.createElement("div");
            let onDiv = document.createElement("div");
            onDiv.style.cssText = "background-color: rgba(0, 0, 0, 0)"
            div.classList.add("grid");
            onDiv.classList.add("onDiv");
            onDiv.addEventListener("mouseover", (e) => {
                if (isMouseDown && eraserOn === false && greyscaleOn === true && onDiv.style.cssText == "background-color: rgba(0, 0, 0, 0);") {
                    onDiv.style.cssText = "background-color: rgba(0, 0, 0, 0.1)";
                } else if (isMouseDown && eraserOn === false && greyscaleOn === true && e.target.style.cssText != "background-color: rgb(0, 0, 0);") {
                    currentOpacity = Number(onDiv.style.cssText.slice(32, 35));
                    currentOpacity += 0.1;
                    onDiv.style.cssText = `background-color: rgba(0, 0, 0, ${currentOpacity})`;
                } else if (isMouseDown && eraserOn === true) {
                    onDiv.style.cssText = "background-color: rgba(0, 0, 0, 0);";
                };
            });
            onDiv.addEventListener("mousedown", (e) => {
                if (eraserOn === false && greyscaleOn === true && onDiv.style.cssText == "background-color: rgba(0, 0, 0, 0);") {
                    onDiv.style.cssText = "background-color: rgba(0, 0, 0, 0.1)";
                } else if (eraserOn === false && greyscaleOn === true && e.target.style.cssText != "background-color: rgb(0, 0, 0);") {
                    currentOpacity = Number(onDiv.style.cssText.slice(32, 35));
                    currentOpacity += 0.1;
                    onDiv.style.cssText = `background-color: rgba(0, 0, 0, ${currentOpacity})`;
                } else if (eraserOn === true) {
                    onDiv.style.cssText = "background-color: rgba(0, 0, 0, 0);";
                };
            });
            div.appendChild(onDiv);
            div.addEventListener("mouseover", (e) => {
                if (isMouseDown && eraserOn === false && greyscaleOn === false) {
                    div.style.backgroundColor = colorPicker.value;
                } else if (isMouseDown && eraserOn === true) {
                    div.style.backgroundColor = "white";
                };
            });
            div.addEventListener("mousedown", (e) => {
                if (eraserOn === false && greyscaleOn === false) {
                    div.style.backgroundColor = colorPicker.value;
                };
                if (eraserOn === true) {
                    div.style.backgroundColor = "white";
                };
            });
            rows[i].appendChild(div);
        };
    };
};

function removeGrid() {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild)
    };
};

function changeGrid(e) {
    let size = e.target.value;
    removeGrid();
    createGrid(size);
    p.textContent = `${size} x ${size}`;
};

createGrid(16);