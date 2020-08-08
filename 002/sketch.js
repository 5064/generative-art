const CANVAS_SIDE = 600;
const COLOR_PALETTE = [
    ["#264653", "#2A9C8F", "#E9C46A", "#F4A261", "#E76F51"], // vivid
    ["#D8E2DC", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#9D8189"], // pastel
    ["#494848", "#636363", "#909090", "#B4B4B4", "#FFFFFF"], // gray gradient
],
    PALETTE_NUM = 0;

const CUBE_SIDE = CANVAS_SIDE / 20,
    MAX_CUBE = 8
let colorIndex = Array(MAX_CUBE).fill(0);  // sphere color

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

    if (_frameCount < 60) {
        return map(easeInOutCubic(_frameCount / 60), 0, 1, -CUBE_SIDE * 2 + toHide, CUBE_SIDE * 2 + toHide);  // down
    } else {
        return map(easeInOutCubic(_frameCount / 60 - 1), 0, 1, CUBE_SIDE * 2 + toHide, -CUBE_SIDE * 2 + toHide);  // up
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
    line(0, -CUBE_SIDE, Math.sin(-TWO_PI / 3) * CUBE_SIDE, Math.cos(-TWO_PI / 3) * CUBE_SIDE,);
    line(0, -CUBE_SIDE, Math.sin(PI - (PI / 3)) * CUBE_SIDE, Math.cos(PI - (PI / 3)) * CUBE_SIDE,);

    drawSphere(_frameCount, i)
    // side surface
    fill(255)
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
    noStroke()
    updateColorIndex(_frameCount, i)
    fill(color(chooseColor(colorIndex[i])))
    circle(0, updateSphereY(_frameCount), CUBE_SIDE * 0.8);
    pop()
}

setup = () => {
    createCanvas(CANVAS_SIDE, CANVAS_SIDE);
}

draw = () => {
    background(255);
    for (i = 0; i < MAX_CUBE; i++) {
        const _frameCount = frameCount + i * 10
        drawCube(CANVAS_SIDE / (MAX_CUBE + 1) * (i + 1), CANVAS_SIDE / 2, _frameCount, i);
    }
}