import detect from "detect-edges";

/**
 * @typedef {Function} Cropper - Crop transparent pixels from an image
 * @param {String|Image|HTMLImageElement} input - Path to the image to process or any type supported by your `Canvas.prototype.drawImage` environment
 * @param {Options} [options] - Options for the detect-edges library
 * @returns {Promise<HTMLCanvasElement>}
 */
/**
 * Prepare a cropper function
 * @param {Object} environment - Object holding a `createCanvas` and a `loadImage` implementation
 * @returns {Cropper}
 */
export default ({ createCanvas, loadImage }) => async (input, options) => {
    if (!input) {
        throw new Error("No input given.");
    }

    const image = typeof input === "string" ? await loadImage(input) : input;

    const { width, height } = image;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    const { top, right, bottom, left } = detect(canvas, options);

    canvas.width = width - (left + right);
    canvas.height = height - (top + bottom);
    context.drawImage(image, -left, -top);

    return canvas;
};
