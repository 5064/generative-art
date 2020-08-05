const CANVAS_SIDE = 600;
const COLOR_PALETTE = [
    ["#264653", "#2A9C8F", "#E9C46A", "#F4A261", "#E76F51"], // vivid
    ["#D8E2DC", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#9D8189"], // pastel
    ["#494848", "#636363", "#909090", "#B4B4B4", "#FFFFFF"], // gray gradient
],
    PALETTE_NUM = 1;

chooseColor = (index) => {
    switch (index) {
        case 0:
            return COLOR_PALETTE[PALETTE_NUM][0]
        case 1:
            return COLOR_PALETTE[PALETTE_NUM][1]
        case 2:
            return COLOR_PALETTE[PALETTE_NUM][2]
        case 3:
            return COLOR_PALETTE[PALETTE_NUM][3]
        default:  // grain >= 4
            return COLOR_PALETTE[PALETTE_NUM][4]
    }
}

drawCircle = (x, y, r, seed) => {
    push()
    fill(color(chooseColor(seed)));
    translate(x, y)
    circle(0, 0, r)
    fill(0);
    rotate((PI * 2 / 3) * seed)
    arc(0, 0, r, r, 0, PI / 3);
    pop()
}

drawCircles = () => {
    const r = CANVAS_SIDE / 10
    for (let y = 0; y < 9; y++) {
        const shift = y % 2;
        for (let x = 0; x < 9; x++) {
            const seed = (x + y) % 3;
            drawCircle(x * (CANVAS_SIDE / 10) + r + (shift * (CANVAS_SIDE / 10) / 2), y * (CANVAS_SIDE / 10) + r, r, seed)
        }
    }
}

setup = () => {
    createCanvas(CANVAS_SIDE, CANVAS_SIDE)
}

draw = () => {
    background(200)
    drawCircles();
}