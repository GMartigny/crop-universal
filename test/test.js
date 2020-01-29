import test from "ava";
import Canvas from "canvas";
import cropBuilder from "..";

const { createCanvas, loadImage } = Canvas;

const crop = cropBuilder(Canvas);

const run = async name => crop(`./test/fixtures/${name}.png`);
const snap = (t, canvas) => t.snapshot(canvas.toDataURL());

test("drawing", async (t) => {
    const res = await run("drawing");
    snap(t, res);
});

test("full", async (t) => {
    const res = await run("full");
    snap(t, res);
});

test("input canvas", async (t) => {
    const canvas = createCanvas(100, 200);
    const context = canvas.getContext("2d");
    context.fillRect(10, 20, 10, 20);

    const res = await crop(canvas);
    snap(t, res);
});

test("input image", async (t) => {
    const image = await loadImage("./test/fixtures/drawing.png");

    const res = await crop(image);
    snap(t, res);
});

test("transparent", async (t) => {
    await t.throwsAsync(() => run("transparent", {
        message: "Can't detect edges.",
    }));
});

test("no file", async (t) => {
    await t.throwsAsync(() => crop(), {
        message: "No input given.",
    });
    await t.throwsAsync(() => crop(""), {
        message: "No input given.",
    });
    await t.throwsAsync(() => crop("whoot.png"), {
        message: /no such file/i,
    });
});
