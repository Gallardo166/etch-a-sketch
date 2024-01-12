const container = document.querySelector("div.container")

let rows = [];
createGrid(16);

let isMouseDown;
container.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isMouseDown = true;
});
container.addEventListener("mouseup", () => {
    isMouseDown = false;
});


const colorPicker = document.querySelector("input#color-picker");

function createGrid(size) {
    for (i=0; i<size; i++) {
        rows[i] = document.createElement("div");
        rows[i].classList.add("row");
        container.appendChild(rows[i]);
        for (j=0; j<size; j++) {
            let div = document.createElement("div");
            div.classList.add("grid");
            div.addEventListener("mouseover", (e) => {
                if (isMouseDown) {
                    e.target.style.backgroundColor = colorPicker.value;
                };
            });
            div.addEventListener("mousedown", (e) => e.target.style.backgroundColor = colorPicker.value);
            rows[i].appendChild(div);
        };
    };
};

function removeGrid() {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild)
    };
};

input = document.querySelector("input")
input.addEventListener("input", changeGrid);

const p = document.querySelector("p");

function changeGrid(e) {
    let size = e.target.value;
    removeGrid();
    createGrid(size);
    p.textContent = `${size} x ${size}`;
};