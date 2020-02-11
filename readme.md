# crop-universal

[![Package version](https://flat.badgen.net/npm/v/crop-universal)](https://www.npmjs.com/package/crop-universal)
[![Package size](https://badgen.net/bundlephobia/minzip/crop-universal)](https://bundlephobia.com/result?p=crop-universal)

Crop all transparent pixel around an image's edges.

⚠️ This package is environment agnostic. It requires you to provide a `Canvas` implementation. It'll be more simple for you to use:
 - For browsers 👉 [`crop-browser`](https://github.com/GMartigny/crop-browser)
 - For Node.js 👉 [`crop-node`](https://github.com/GMartigny/crop-node)
 - As a CLI 👉 [`crop-node-cli`](https://github.com/GMartigny/crop-node-cli)


## Installation

    npm install crop-universal


## Usage

```js
import crop from "crop-universal";

// You're in charge of providing a couple of function corresponding to your environment
const cropper = crop({createCanvas, loadImage});

const url = "path/to/file.png";
const options = {
    outputFormat: "png",
};
const canvas = cropper(url, options);
```


## Documentation

### `crop(environment)`

| Name | Type | Default | Comment |
| --- | --- | --- | --- |
|environment |`Object` |required |Object holding a `createCanvas` and a `loadImage` implementation |

This will return a `Function` that you can use to crop.

### `crop(environment)(input, [options])`

| Name | Type | Default | Comment |
| --- | --- | --- | --- |
|input |`String\|any` |required |Path to the image to process or any type supported by your `Canvas.prototype.drawImage` environment |
|options |`Options` |`undefined` |Allow to forward [options to `detect-edges`](https://github.com/GMartigny/detect-edges#options) |

This will return a canvas with the result drawn onto.


## License

[MIT](license)
