import detect from "detect-edges";

/**
 * @typedef {Function} Cropper - Crop transparent pixels from an image
 * @param {String|any} input - Path to the image to process or any type supported by your `Canvas.prototype.drawImage` environment
 * @returns {Promise<HTMLCanvasElement>}
 */
/**
 * Prepare a cropper function
 * @param {Object} environment - Object holding a `createCanvas` and a `loadImage` implementation
 * @returns {Cropper}
 */
export default ({createCanvas, loadImage}) => async (input, options) => {
    // Check input
    if (!input) {
        throw new Error("No input given.");
    }

    // If input is a string, load it as an image
    let image = typeof input === "string" ? await loadImage(input) : input;

    // Create a canvas and draw the image onto it
    const { width, height } = image;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    // Detect edges
    const { top, right, bottom, left } = detect(canvas, options);

    // Resize canvas and draw image at right position
    canvas.width = width - (left + right);
    canvas.height = height - (top + bottom);
    context.drawImage(image, -left, -top);

    return canvas;
};
