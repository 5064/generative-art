const CANVAS_SIDE = 600;
const COLOR_PALETTE = [
    ["#264653", "#2A9C8F", "#E9C46A", "#F4A261", "#E76F51"], // vivid
    ["#d4fffa", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#9D8189"], // pastel
],
    PALETTE_NUM = 1;

const CUBE_SIDE = CANVAS_SIDE / 30
let colorIndex = [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // initial sphere color 
const DELAY = 10

chooseColor = (index) => {
    return COLOR_PALETTE[PALETTE_NUM][index]
}

updateColorIndex = (_frameCount, index) => {
    if ((_frameCount + 30) % 60 === 0) {
        colorIndex[index] = (_frameCount + 30) / 60 % 5
    }
}

updateSphereY = _frameCount => {
    const toHide = CUBE_SIDE / 2
    if (_frameCount > 120) {  // map to 0-120
        const n = parseInt(_frameCount / 120);
        _frameCount = (_frameCount - (120 * n))
    }
    const amplitude = CUBE_SIDE * 1.5 + toHide;

    if (_frameCount < 60) {
        return map(easeInOutCubic(_frameCount / 60), 0, 1, -amplitude, amplitude);  // down
    } else {
        return map(easeInOutCubic(_frameCount / 60 - 1), 0, 1, amplitude, -amplitude);  // up
    }
}

// acceleration until halfway, then deceleration
easeInOutCubic = t => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

drawCube = (x, y, _frameCount, i) => {
    push();
    translate(x, y);
    // top of cube
    fill(255)
    quad(
        0, 0,
        Math.cos(-PI / 6) * CUBE_SIDE, Math.sin(-PI / 6) * CUBE_SIDE,
        0, -CUBE_SIDE,
        Math.cos(PI - PI / 6) * CUBE_SIDE, (Math.sin(PI - PI / 6) * CUBE_SIDE - CUBE_SIDE),
    );

    drawSphere(_frameCount, i)
    // side surface
    quad(
        0, 0,
        Math.cos(-PI / 6) * CUBE_SIDE, Math.sin(-PI / 6) * CUBE_SIDE,
        Math.cos(-PI / 6) * CUBE_SIDE, (Math.sin(-PI / 6) * CUBE_SIDE) + CUBE_SIDE,
        0, CUBE_SIDE,
    );
    quad(
        0, 0,
        Math.cos(PI + PI / 6) * CUBE_SIDE, Math.sin(PI + PI / 6) * CUBE_SIDE,
        Math.cos(PI + PI / 6) * CUBE_SIDE, (Math.sin(PI + (PI / 6)) * CUBE_SIDE) + CUBE_SIDE,
        0, CUBE_SIDE,
    );
    pop()
}

drawSphere = (_frameCount, i) => {
    push()
    stroke(127)
    updateColorIndex(_frameCount, i)
    fill(color(chooseColor(colorIndex[i])))
    circle(0, updateSphereY(_frameCount), CUBE_SIDE * 0.8);
    pop()
}
// line up dire shape
drawLineUpCubes = (layerNum) => {
    const py = CANVAS_SIDE * 0.2; // padding Y
    const contentArea = CANVAS_SIDE - (py * 2);

    const rowNum = layerNum * 2 - 1;
    for (i = 0; i < rowNum; i++) {
        const rowCubes = i * 2 + 1;
        for (j = 0; j < rowCubes; j++) {
            const _frameCount = frameCount + i * DELAY
            drawCube((CANVAS_SIDE / rowNum) * (j + 1), (contentArea / (rowNum - 1)) * i + py, _frameCount, i);
        }
    }
}

setup = () => {
    createCanvas(CANVAS_SIDE, CANVAS_SIDE);
}

draw = () => {
    background(64);
    drawLineUpCubes(3)
}