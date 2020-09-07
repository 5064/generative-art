const CANVAS_X = 600,
    CANVAS_Y = 600;
const r = 30;
const velocity = (Math.PI / 6) * 5;

const starConfig = [
    { x: 400, y: 300, size: 25 },
    { x: 200, y: 100, size: 10 },
    { x: 75, y: 150, size: 20 },
    { x: 50, y: 450, size: 20 },
    { x: 550, y: 350, size: 15 },
    { x: 500, y: 50, size: 25 },
];
const cometConfig = [
    { x: 400, y: 300, size: 25 },
    { x: 200, y: 100, size: 10 },
    { x: 75, y: 150, size: 20 },
    { x: 50, y: 450, size: 20 },
    { x: 550, y: 350, size: 15 },
    { x: 500, y: 50, size: 25 },
]

drawComet = (x, y) => {
    // drawTail(x, y);
    // drawCore(x, y);
};

drawCore = (x, y) => {
    push()
    translate(x, y);
    fill(255);
    circle(x, y, r)
    pop();
}

drawTail = () => {
    push()
    translate(x, 0);
    fill(255);
    circle(x, 0, r)
    pop();
}

drawStar = (x, y, size) => {
    push();
    translate(x, y);
    fill(color(255, random(0.5, 1) * 255))
    textAlign(CENTER, CENTER);
    textSize(size)
    text("×", 0, 0);
    pop();
}

drawStars = () => {
    for (let c of starConfig) {
        drawStar(c.x, c.y, c.size);
    }
}

drawHorizon = () => {
    push()
    fill('#2b2d42');
    noStroke();
    circle(CANVAS_X / 2, CANVAS_Y * 3.1, CANVAS_Y * 5);
    pop()
}

setup = () => {
    createCanvas(CANVAS_X, CANVAS_Y)
}

draw = () => {
    background('#457b9d');
    drawHorizon();
    drawComet();
    drawStars();
}