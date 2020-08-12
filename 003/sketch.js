const CANVAS_SIDE = 600;
const COLOR_PALETTE = [
    ["#2A9C8F", "#E9C46A", "#E76F51"], // vivid
    ["#d4fffa", "#FFCAD4", "#fffc9e"], // pastel
],
    PALETTE_NUM = 1;

const CUBE_SIDE = CANVAS_SIDE / 24
let colorIndex = [1, 1, 1, 1]  // initial sphere color 
const DELAY = 12

chooseColor = (index) => {
    return COLOR_PALETTE[PALETTE_NUM][index]
}

updateColorIndex = (_frameCount, index) => {
    if ((_frameCount + 30) % 60 === 0) {
        colorIndex[index] = (_frameCount + 30) / 60 % 3
    }
}

updateSphereY = _frameCount => {
    if (_frameCount > 120) {  // map to 0-120
        const n = parseInt(_frameCount / 120);
        _frameCount = (_frameCount - (120 * n))
    }
    const toHide = CUBE_SIDE / 2
    const amplitude = CUBE_SIDE * 6;

    if (_frameCount < 60) {
        return map(easeInOutCubic(_frameCount / 60), 0, 1, -amplitude + toHide, amplitude + toHide);  // down
    } else {
        return map(easeInOutCubic(_frameCount / 60 - 1), 0, 1, amplitude + toHide, -amplitude + toHide);  // up
    }
}

// acceleration until halfway, then deceleration
easeInOutCubic = t => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

drawCube = (x, y, _frameCount, i) => {
    push();
    translate(x, y);
    stroke(127);
    // top of cube
    fill(255)
    quad(
        0, 0,
        Math.cos(-PI / 6) * CUBE_SIDE, Math.sin(-PI / 6) * CUBE_SIDE,
        0, -CUBE_SIDE,
        Math.cos(PI - PI / 6) * CUBE_SIDE, (Math.sin(PI - PI / 6) * CUBE_SIDE - CUBE_SIDE),
    );
    push();
    stroke(191);
    line(0, 0, 0, -CUBE_SIDE);
    pop();

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
drawLineUpCubes = () => {
    const py = CANVAS_SIDE * 0.25; // padding Y
    const contentArea = CANVAS_SIDE - (py * 2);

    const ROW_NUM = 7;
    // horrible hard coding...
    drawCube((CANVAS_SIDE / 8) * 4, (contentArea / (ROW_NUM + 1)) + py, animationDelay(3), 3);

    drawCube((CANVAS_SIDE / 8) * 3, (contentArea / (ROW_NUM + 1)) * 2 + py, animationDelay(3), 3);
    drawCube((CANVAS_SIDE / 8) * 4, (contentArea / (ROW_NUM + 1)) * 2 + py, animationDelay(2), 2);
    drawCube((CANVAS_SIDE / 8) * 5, (contentArea / (ROW_NUM + 1)) * 2 + py, animationDelay(3), 3);

    drawCube((CANVAS_SIDE / 8) * 2, (contentArea / (ROW_NUM + 1)) * 3 + py, animationDelay(3), 3);
    drawCube((CANVAS_SIDE / 8) * 3, (contentArea / (ROW_NUM + 1)) * 3 + py, animationDelay(2), 2);
    drawCube((CANVAS_SIDE / 8) * 4, (contentArea / (ROW_NUM + 1)) * 3 + py, animationDelay(1), 1);
    drawCube((CANVAS_SIDE / 8) * 5, (contentArea / (ROW_NUM + 1)) * 3 + py, animationDelay(2), 2);
    drawCube((CANVAS_SIDE / 8) * 6, (contentArea / (ROW_NUM + 1)) * 3 + py, animationDelay(3), 3);

    drawCube((CANVAS_SIDE / 8) * 1, (contentArea / (ROW_NUM + 1)) * 4 + py, animationDelay(3), 3);
    drawCube((CANVAS_SIDE / 8) * 2, (contentArea / (ROW_NUM + 1)) * 4 + py, animationDelay(2), 2);
    drawCube((CANVAS_SIDE / 8) * 3, (contentArea / (ROW_NUM + 1)) * 4 + py, animationDelay(1), 1);
    drawCube((CANVAS_SIDE / 8) * 4, (contentArea / (ROW_NUM + 1)) * 4 + py, animationDelay(0), 0);
    drawCube((CANVAS_SIDE / 8) * 5, (contentArea / (ROW_NUM + 1)) * 4 + py, animationDelay(1), 1);
    drawCube((CANVAS_SIDE / 8) * 6, (contentArea / (ROW_NUM + 1)) * 4 + py, animationDelay(2), 2);
    drawCube((CANVAS_SIDE / 8) * 7, (contentArea / (ROW_NUM + 1)) * 4 + py, animationDelay(3), 3);

    drawCube((CANVAS_SIDE / 8) * 2, (contentArea / (ROW_NUM + 1)) * 5 + py, animationDelay(3), 3);
    drawCube((CANVAS_SIDE / 8) * 3, (contentArea / (ROW_NUM + 1)) * 5 + py, animationDelay(2), 2);
    drawCube((CANVAS_SIDE / 8) * 4, (contentArea / (ROW_NUM + 1)) * 5 + py, animationDelay(1), 1);
    drawCube((CANVAS_SIDE / 8) * 5, (contentArea / (ROW_NUM + 1)) * 5 + py, animationDelay(2), 2);
    drawCube((CANVAS_SIDE / 8) * 6, (contentArea / (ROW_NUM + 1)) * 5 + py, animationDelay(3), 3);

    drawCube((CANVAS_SIDE / 8) * 3, (contentArea / (ROW_NUM + 1)) * 6 + py, animationDelay(3), 3);
    drawCube((CANVAS_SIDE / 8) * 4, (contentArea / (ROW_NUM + 1)) * 6 + py, animationDelay(2), 2);
    drawCube((CANVAS_SIDE / 8) * 5, (contentArea / (ROW_NUM + 1)) * 6 + py, animationDelay(3), 3);

    drawCube((CANVAS_SIDE / 8) * 4, (contentArea / (ROW_NUM + 1)) * 7 + py, animationDelay(3), 3);
}

animationDelay = (order) => {
    return frameCount + (order * DELAY)
}

setup = () => {
    createCanvas(CANVAS_SIDE, CANVAS_SIDE);
}

draw = () => {
    background(255);
    drawLineUpCubes(3)
}