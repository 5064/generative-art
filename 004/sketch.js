const CANVAS_SIDE = 600;
const COLOR_PALETTE = [
    ["#264653", "#2A9C8F", "#E9C46A", "#F4A261", "#E76F51"], // vivid
    ["#D8E2DC", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#9D8189"], // pastel
    ["#494848", "#636363", "#909090", "#B4B4B4", "#FFFFFF"], // gray gradient
],
    PALETTE_NUM = 1;
const GRID = CANVAS_SIDE / 10;
const r = GRID;
let seed9t;

chooseColor = (index) => {
    return COLOR_PALETTE[PALETTE_NUM][index]
}

seed9ByTime = () => {
    if (frameCount % 160 === 0) {  // every 2 seconds
        seed9t =
            frameCount / 160 % 9  // return seed (0-8)
    }
}

drawParticle = (x, y, r) => {
    push()
    const yBit = y % 2;
    const ySign = yBit ? 1 : -1;
    const seed3x = x % 3;
    fill(color(chooseColor(3)));
    translate(x * GRID - yBit * (GRID / 2), y * GRID * Math.sin(PI / 3));
    circle(0, 0, r)
    fill(color(chooseColor(0)));
    // rotate(-(PI / 3));
    if (yBit) {
        rotate(PI);
    }
    rotate(ySign * (PI / 3) * seed3x);
    rotate(ySign * (TWO_PI / 3) * seed9t);  // 時間で回転
    arc(0, 0, r, r, 0, (PI / 3));
    pop()
}

drawParticles = () => {
    for (let y = 0; y < 12; y++) {

        for (let x = 0; x < 11; x++) {
            // drawCircle(x * (CANVAS_SIDE / 10) + (shift * (CANVAS_SIDE / 10) / 2), y * (CANVAS_SIDE / 10) * Math.sin(PI / 3), r)
            drawParticle(x, y, r)
        }
    }
}

setup = () => {
    createCanvas(CANVAS_SIDE, CANVAS_SIDE)
}

draw = () => {
    seed9ByTime();
    background(123);
    drawParticles();
}