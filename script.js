// settings
let fps = 18;

const height = 20;

const width = 60;

let current_element = "sand";

grid = [];

let isMouseDown = false;

for (let i = 0; i < height * width; i++) {
    grid[i] = "empty";
}

function finalise(arr) {
    const transformedArray = [];

    for (let i = 0; i < arr.length; i++) {
        let transformedValue;

        switch (arr[i]) {
            case "empty":
                transformedValue = "&nbsp;";
                break;
            case "wall":
                transformedValue = "█";
                break;
            case "sand":
                transformedValue = "░";
                break;
            case "water":
                transformedValue = "▓";
                break
            default:
                transformedValue = arr[i];
        }

        transformedArray.push(transformedValue);
    }

    return transformedArray.join('');
}

function get_border(arr, width) {
    const result = [];
    let lastInsertionIndex = arr.length - (arr.length % width);

    result.push("┏");
    for (let i = 0; i < width; i++) {
        result.push("━");
    }
    result.push("┓<br>┃");

    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i]);
        if ((i + 1) % width === 0 && i !== arr.length - 1) {
            result.push("┃<br>┃");
        }
    }

    if (lastInsertionIndex === arr.length) {
        result.push("┃<br>┗");
        for (let i = 0; i < width; i++) {
            result.push("━");
        }
        result.push("┛");
    }

    return result;
}

function update_grid() {
    for (let i = width * height; i >= 0; i--) {
        if (grid[i] === "sand") {
            if (i + width < width * height && grid[i + width] === "empty") {
                grid[i] = "empty";
                grid[i + width] = "sand";
            } else if (i + width - 1 < width * height && grid[i + width - 1] === "empty" && (i + width - 1) % width !== 0 && Math.random() < 0.5) {
                grid[i] = "empty";
                grid[i + width - 1] = "sand";
            } else if (i + width + 1 < width * height && grid[i + width + 1] === "empty" && (i + width + 1) % width !== 0) {
                grid[i] = "empty";
                grid[i + width + 1] = "sand";
            }
        }
        if (grid[i] === "water") {
            if (i + width < width * height && grid[i + width] === "empty") {
                grid[i] = "empty";
                grid[i + width] = "water";
            } else if (i + width - 1 < width * height && grid[i + width - 1] === "empty" && (i + width - 1) % width !== 0 && Math.random() < 0.5) {
                grid[i] = "empty";
                grid[i + width - 1] = "water";
            } else if (i + width + 1 < width * height && grid[i + width + 1] === "empty" && (i + width + 1) % width !== 0) {
                grid[i] = "empty";
                grid[i + width + 1] = "water";
            } else if (i - 1 < width * height && grid[i - 1] === "empty" && (i - 1) % width !== 0 && Math.random() < 0.9) {
                grid[i] = "empty";
                grid[i - 1] = "water";
            } else if (i + 1 < width * height && grid[i + 1] === "empty" && (i + 1) % width !== 0) {
                grid[i] = "empty";
                grid[i + 1] = "water";
            }
        }
    }
}

const gameElement = document.getElementById("game");
gameElement.innerHTML = finalise(get_border(grid, width));
gameElement.style.userSelect = "none";

setInterval(function () {
    gameElement.innerHTML = finalise(get_border(grid, width));
    update_grid();
    document.getElementById("stats").innerHTML = "&nbsp;tps:"+fps+" w:"+width+" h:"+height+" element:"+current_element;
}, 1000 / fps);

document.addEventListener('click', function (event) {
    const rect = gameElement.getBoundingClientRect();
    const x = event.clientX - rect.left - 20
    const y = event.clientY - rect.top - 35;
    const index = Math.floor(y / 16) * width + Math.floor(x / 8);

    if (index >= 0 && index < grid.length) {
        grid[index] = current_element;
    }
});

document.addEventListener('mousedown', function (event) {
    isMouseDown = true;
    handleMouseMove(event);
});

document.addEventListener('mousemove', function (event) {
    if (isMouseDown) {
        handleMouseMove(event);
    }
});

document.addEventListener('mouseup', function () {
    isMouseDown = false;
});

function handleMouseMove(event) {
    const rect = gameElement.getBoundingClientRect();
    const x = event.clientX - rect.left - 20
    const y = event.clientY - rect.top - 35;
    const index = Math.floor(y / 16) * width + Math.floor(x / 8);

    if (index >= 0 && index < grid.length) {
        grid[index] = current_element;
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "x") {
        current_element = "wall";
    }
});
document.addEventListener("keydown", function(event) {
    if (event.key === "s") {
        current_element = "sand";
    }
});
document.addEventListener("keydown", function(event) {
    if (event.key === "w") {
        current_element = "water";
    }
});
document.addEventListener("keydown", function(event) {
    if (event.key === "e") {
        current_element = "empty";
    }
});
document.addEventListener("keydown", function(event) {
    if (event.key === "r") {
        for (let i = 0; i < grid.length; i++) {
            grid[i] = "empty";
        }
    }
});

document.getElementById("stats").innerHTML = "&nbsp;tps:"+fps+" w:"+width+" h:"+height+" element:"+current_element;