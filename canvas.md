# Basic usage of canvas

This is how you introduce a `<canvas>` element to your document:

```html
<canvas id="canvas" width="150" height="150"></canvas>
```

When no `width` and `height` attributes are specified, the canvas will initially be `300` pixels wide and `150` pixels high. The element can be sized arbitrarily by CSS, but during rendering the image is scaled to fit its layout size: if the CSS sizing doesn't respect the ratio of the initial canvas, it will appear distorted.

It is always a good idea to supply an `id` because this makes it much easier to identify it in a script.

## The rendering context

The <canvas> element creates a fixed-size drawing surface that exposes one or more rendering contexts, which are used to create and manipulate the content shown. In this tutorial, we focus on the 2D rendering context.

The canvas is initially blank. To display something, a script first needs to access the rendering context and draw on it.

The `<canvas>` element has a method called `getContext()`, used to obtain the rendering context and its drawing functions. `getContext()` takes one parameter, the type of context. For 2D graphics, such as those covered by this tutorial, you specify "`2d`" to get a `CanvasRenderingContext2D`:

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```

## Checking for support

The fallback content is displayed in browsers which do not support `<canvas>`. Scripts can also check for support programmatically by testing for the presence of the `getContext()` method:

```js
const canvas = document.getElementById("canvas");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

## A simple example

To begin, let's take a look at an example that draws two intersecting rectangles, one of which has alpha transparency. We'll explore how this works in more detail in later examples:

```js
function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgb(200 0 0)";
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = "rgb(0 0 200 / 50%)";
  ctx.fillRect(30, 30, 50, 50);
}
draw();
```

# Drawing shapes with canvas

## The canvas grid

Normally 1 unit in the grid corresponds to 1 pixel on the canvas. The origin of this grid is positioned in the top left corner at coordinate (0,0). All elements are placed relative to this origin. Later in this tutorial we'll see how we can translate the origin to a different position, rotate the grid and even scale it, but for now we'll stick to the default.

## Drawing rectangles

Unlike SVG, `<canvas>` only supports two primitive shapes: rectangles and paths (lists of points connected by lines). All other shapes must be created by combining one or more paths. Luckily, we have an assortment of path drawing functions which make it possible to compose very complex shapes.

- `fillRect(x, y, width, height)`: Draws a filled rectangle.
- `strokeRect(x, y, width, height)`: Draws a rectangular outline.
- `clearRect(x, y, width, height)`: Clears the specified rectangular area, making it fully transparent.
- ``

## Drawing paths

A path is a list of points, connected by segments of lines that can be of different shapes, curved or not, of different width and of different color. A path, or even a subpath, can be closed. To make shapes using paths, we take some extra steps:

1. First, you create the path.
2. Then you use drawing commands to draw into the path.
3. Once the path has been created, you can stroke or fill the path to render it.

Here are the functions used to perform these steps:

- `beginPath()`: Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.
- Path methods: Methods to set different paths for objects.
- `closePath()`: Adds a straight line to the path, going to the start of the current sub-path.
- `stroke()`: Draws the shape by stroking its outline.
- `fill()`: Draws a solid shape by filling the path's content area.

The first step to create a path is to call the `beginPath()`. Internally, paths are stored as a list of sub-paths (lines, arcs, etc.) which together form a shape. Every time this method is called, the list is reset and we can start drawing new shapes.

> Note: When the current path is empty, such as immediately after calling `beginPath()`, or on a newly created canvas, the first path construction command is always treated as a `moveTo()`, regardless of what it actually is. For that reason, you will almost always want to specifically set your starting position after resetting a path.

The second step is calling the methods that actually specify the paths to be drawn. We'll see these shortly.

The third, and an optional step, is to call `closePath()`. This method tries to close the shape by drawing a straight line from the current point to the start. If the shape has already been closed or there's only one point in the list, this function does nothing.

> Note: When you call `fill()`, any open shapes are closed automatically, so you don't have to call `closePath()`. This is not the case when you call `stroke()`.

### Moving the pen

One very useful function, which doesn't actually draw anything but becomes part of the path list described above, is the `moveTo()` function. You can probably best think of this as lifting a pen or pencil from one spot on a piece of paper and placing it on the next.

`moveTo(x, y)`: Moves the pen to the coordinates specified by `x` and `y`.

When the canvas is initialized or `beginPath()` is called, you typically will want to use the `moveTo()` function to place the starting point somewhere else. We could also use `moveTo()` to draw unconnected paths.

### Lines

For drawing straight lines, use the `lineTo()` method.

`lineTo(x, y)`: Draws a line from the current drawing position to the position specified by `x` and `y`.

This method takes two arguments, `x` and `y`, which are the coordinates of the line's end point. The starting point is dependent on previously drawn paths, where the end point of the previous path is the starting point for the following, etc. The starting point can also be changed by using the `moveTo()` method.

### Arcs

To draw arcs or circles, we use the `arc()` or `arcTo()` methods.

`arc(x, y, radius, startAngle, endAngle, counterclockwise)`: Draws an arc with the given control points and radius, connected to the previous point by a straight line.

Let's have a more detailed look at the arc method, which takes six parameters: `x` and `y` are the coordinates of the center of the circle on which the arc should be drawn. `radius` is self-explanatory. The `startAngle` and `endAngle` parameters define the start and end points of the arc in radians, along the curve of the circle. These are measured from the x axis. The `counterclockwise` parameter is a Boolean value which, when `true`, draws the arc counterclockwise; otherwise, the arc is drawn clockwise.

> Note: Angles in the arc function are measured in radians, not degrees. To convert degrees to radians you can use the following JavaScript expression: `radians = (Math.PI/180)*degrees`.

### Rectangles

- `rect(x, y, width, height)`: Draws a rectangle whose top-left corner is specified by (`x`, `y`) with the specified `width` and `height`.

## `Path2D` objects

there can be a series of paths and drawing commands to draw objects onto your canvas. To simplify the code and to improve performance, the `Path2D` object, available in recent versions of browsers, lets you cache or record these drawing commands. You are able to play back your paths quickly. Let's see how we can construct a `Path2D` object:

`Path2D()`: The `Path2D()` constructor returns a newly instantiated `Path2D` object, optionally with another path as an argument (creates a copy), or optionally with a string consisting of SVG path data.

```js
new Path2D(); // empty path object
new Path2D(path); // copy from another Path2D object
new Path2D(d); // path from SVG path data
```

All path methods like `moveTo`, `rect`, `arc` or `quadraticCurveTo`, etc., which we got to know above, are available on `Path2D` objects.

The `Path2D` API also adds a way to combine paths using the addPath method. This can be useful when you want to build objects from several components, for example.

`Path2D.addPath(path [, transform])`: Adds a path to the current path with an optional transformation matrix.

### Example for `Path2D`

In this example, we are creating a rectangle and a circle. Both are stored as a `Path2D` object, so that they are available for later usage. With the new `Path2D` API, several methods got updated to optionally accept a `Path2D` object to use instead of the current path. Here, `stroke` and `fill` are used with a path argument to draw both objects onto the canvas, for example.

```js
function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const rectangle = new Path2D();
  rectangle.rect(10, 10, 50, 50);

  const circle = new Path2D();
  circle.arc(100, 35, 25, 0, 2 * Math.PI);

  ctx.stroke(rectangle);
  ctx.fill(circle);
}
```

## Using SVG paths

Another powerful feature of the new canvas `Path2D` API is using SVG path data to initialize paths on your canvas. This might allow you to pass around path data and re-use them in both, SVG and canvas.

The path will move to point (`M10 10`) and then move horizontally 80 points to the right (`h 80`), then 80 points down (`v 80`), then 80 points to the left (`h -80`), and then back to the start (`z`):

```js
const p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```

# Applying styles and colors

Here we will explore the canvas options we have at our disposal to make our drawings a little more attractive. You will learn how to add different colors, line styles, gradients, patterns and shadows to your drawings.

> Note: Canvas content is not accessible to screen readers. If the canvas is purely decorative, include role="presentation" on the `<canvas>` opening tag. Otherwise, include descriptive text as the value of the `aria-label` attribute directly on the canvas element itself or include fallback content placed within the opening and closing canvas tag. Canvas content is not part of the DOM, but nested fallback content is.

## Colors

Up until now we have only seen methods of the drawing context. If we want to apply colors to a shape, there are two important properties we can use: `fillStyle` and `strokeStyle`.

`fillStyle = color`: Sets the style used when filling shapes.
`strokeStyle = color`: Sets the style for shapes' outlines.

color is a string representing a CSS `<color>`, a gradient object, or a pattern object. We'll look at gradient and pattern objects later. By default, the `stroke` and `fill` color are set to black (CSS color value `#000000`).

> Note: When you set the `strokeStyle` and/or `fillStyle` property, the new value becomes the default for all shapes being drawn from then on. For every shape you want in a different color, you will need to reassign the `fillStyle` or `strokeStyle` property.

Take a look at examples in this page: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors

## Transparency

In addition to drawing opaque shapes to the canvas, we can also draw semi-transparent (or translucent) shapes. This is done by either setting the `globalAlpha` property or by assigning a semi-transparent color to the stroke and/or fill style.

`globalAlpha = transparencyValue`: Applies the specified transparency value to all future shapes drawn on the canvas. The value must be between 0.0 (fully transparent) to 1.0 (fully opaque). This value is 1.0 (fully opaque) by default.

> The `globalAlpha` property can be useful if you want to draw a lot of shapes on the canvas with similar transparency, but otherwise it's generally more useful to set the transparency on individual shapes when setting their colors.

Because the `strokeStyle` and `fillStyle` properties accept CSS rgb color values, we can use the following notation to assign a transparent color to them:

```js
// Assigning transparent colors to stroke and fill style

ctx.strokeStyle = "rgb(255 0 0 / 50%)";
ctx.fillStyle = "rgb(255 0 0 / 50%)";
```

## Line styles

There are several properties which allow us to style lines.

- `lineWidth = value`: Sets the width of lines drawn in the future.
- `lineCap = type`: Sets the appearance of the ends of lines.
- `lineJoin = type`: Sets the appearance of the "corners" where lines meet.
- `miterLimit = value`: Establishes a limit on the miter when two lines join at a sharp angle, to let you control how thick the junction becomes.
- `getLineDash()`: Returns the current line dash pattern array containing an even number of non-negative numbers.
- `setLineDash(segments)`: Sets the current line dash pattern.
- `lineDashOffset = value`: Specifies where to start a dash array on a line.

# Transformations

Earlier in this tutorial we've learned about the canvas grid and the coordinate space. Until now, we only used the default grid and changed the size of the overall canvas for our needs. With transformations there are more powerful ways to translate the origin to a different position, rotate the grid and even scale it.

## Saving and restoring state

Before we look at the transformation methods, let's look at two other methods which are indispensable once you start generating ever more complex drawings.

- `save()`: Saves the entire state of the canvas.
- `restore()`: Restores the most recently saved canvas state.

Canvas states are stored on a stack. Every time the `save()` method is called, the current drawing state is pushed onto the stack. A drawing state consists of:

- The transformations that have been applied (i.e., `translate`, `rotate` and `scale` – see below).
- The current values of the following attributes:

  - `strokeStyle`
  - `fillStyle`
  - `globalAlpha`
  - `lineWidth`
  - `lineCap`
  - `lineJoin`
  - `miterLimit`
  - `lineDashOffset`
  - `shadowOffsetX`
  - `shadowOffsetY`
  - `shadowBlur`
  - `shadowColor`
  - `globalCompositeOperation`
  - `font`
  - `textAlign`
  - `textBaseline`
  - `direction`
  - `imageSmoothingEnabled`.

- The current clipping path, which we'll see in the next section.

You can call the `save()` method as many times as you like. Each time the `restore()` method is called, the last saved state is popped off the stack and all saved settings are restored.

## Translating

The first of the transformation methods we'll look at is `translate()`. This method is used to move the canvas and its origin to a different point in the grid.

`translate(x, y)`: Moves the canvas and its origin on the grid. `x` indicates the horizontal distance to move, and `y` indicates how far to move the grid vertically.

## Scaling

The next transformation method is scaling. We use it to increase or decrease the units in our canvas grid. This can be used to draw scaled down or enlarged shapes and bitmaps.

`scale(x, y)`: Scales the canvas units by `x` horizontally and by `y` vertically. Both parameters are real numbers. Values that are smaller than `1.0` reduce the unit size and values above `1.0` increase the unit size. Values of `1.0` leave the units the same size.

Using negative numbers you can do axis mirroring (for example using `translate(0,canvas.height)`; `scale(1,-1)`; you will have the well-known Cartesian coordinate system, with the origin in the bottom left corner).

By default, one unit on the canvas is exactly one pixel. If we apply, for instance, a scaling factor of `0.5`, the resulting unit would become `0.5` pixels and so shapes would be drawn at half size. In a similar way setting the scaling factor to `2.0` would increase the unit size and one unit now becomes two pixels. This results in shapes being drawn twice as large.

# Using images

Importing images into a canvas is basically a two step process:

1. Get a reference to an `HTMLImageElement` object or to another canvas element as a source. It is also possible to use images by providing a URL.
2. Draw the image on the canvas using the `drawImage()` function.

The canvas API is able to use any of the following data types as an image source:

- `HTMLImageElement`: These are images created using the `Image()` constructor, as well as any `<img>` element.
- `SVGImageElement`: These are images embedded using the `<image>` element.
- `HTMLVideoElement`: Using an HTML `<video>` element as your image source grabs the current frame from the video and uses it as an image.
- `HTMLCanvasElement`: You can use another `<canvas>` element as your image source.
- `ImageBitmap`: A bitmap image, eventually cropped. Such type are used to extract part of an image, a sprite, from a larger image
- `OffscreenCanvas`: A special kind of `<canvas>` that is not displayed and is prepared without being displayed. Using such an image source allows to switch to it without the composition of the content to be visible to the user.
- `VideoFrame`: An image representing one single frame of a video.

There are several ways to get images for use on a canvas.

## Using images from the same page

We can obtain a reference to images on the same page as the canvas by using one of:

- The `document.images` collection
- The `document.getElementsByTagName()` method
- If you know the ID of the specific image you wish to use, you can use `document.getElementById()` to retrieve that specific image

## Creating images from scratch

Another option is to create new `HTMLImageElement` objects in our script. To do this, we have the convenience of an `Image()` constructor:

```js
const img = new Image(); // Create new img element
img.src = "myImage.png"; // Set source path
```

When this script gets executed, the image starts loading, but if you try to call `drawImage()` before the image has finished loading, it won't do anything. Older browsers may even throw an exception, so you need to be sure to use the **load event** so you don't draw the image to the canvas before it's ready:

```js
const ctx = document.getElementById("canvas").getContext("2d");
const img = new Image();

img.addEventListener("load", () => {
  ctx.drawImage(img, 0, 0);
});

img.src = "myImage.png";
```

Whether you have `<img>` elements in your markup or you create them programmatically in JavaScript, external images may have CORS restrictions. By default, externally fetched images taint the canvas, preventing your site from reading data cross-origin. Using the `crossorigin` attribute of an `<img>` element (reflected by the `HTMLImageElement.crossOrigin` property), you can request permission to load an image from another domain using CORS. If the hosting domain permits cross-domain access to the image, the image can be used in your canvas without tainting it.

## Embedding an image via data: URL

Another possible way to include images is via the data: URL. Data URLs allow you to completely define an image as a Base64 encoded string of characters directly in your code.

```js
const img = new Image(); // Create new img element
img.src =
  "data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==";
```

One advantage of data URLs is that the resulting image is available immediately without another round trip to the server. Another potential advantage is that it is also possible to encapsulate in one file all of your CSS, JavaScript, HTML, and images, making it more portable to other locations.

Some disadvantages of this method are that your image is not cached, and for larger images the encoded URL can become quite long.

## Drawing images

Once we have a reference to our source image object we can use the `drawImage()` method to render it to the canvas. As we will see later the `drawImage()` method is overloaded and has several variants. In its most basic form it looks like this:

`drawImage(image, x, y)`: Draws the image specified by the `image` parameter at the coordinates (`x`, `y`).

# Basic animation

Since we're using JavaScript to control `<canvas>` elements, it's also very easy to make (interactive) animations. In this chapter we will take a look at how to do some basic animations.

Probably the biggest limitation is, that once a shape gets drawn, it stays that way. If we need to move it we have to redraw it and everything that was drawn before it. It takes a lot of time to redraw complex frames and the performance depends highly on the speed of the computer it's running on.

## Basic animation steps

These are the steps you need to take to draw a frame:

1. **Clear the canvas** Unless the shapes you'll be drawing fill the complete canvas (for instance a backdrop image), you need to clear any shapes that have been drawn previously. The easiest way to do this is using the `clearRect()` method.
2. **Save the canvas state** If you're changing any setting (such as styles, transformations, etc.) which affect the canvas state and you want to make sure the original state is used each time a frame is drawn, you need to save that original state.
3. **Draw animated shapes** The step where you do the actual frame rendering.
4. **Restore the canvas state** If you've saved the state, restore it before drawing a new frame.

## Controlling an animation

Shapes are drawn to the canvas by using the canvas methods directly or by calling custom functions. In normal circumstances, we only see these results appear on the canvas when the script finishes executing. For instance, it isn't possible to do an animation from within a `for` loop.

That means we need a way to execute our drawing functions over a period of time. There are two ways to control an animation like this.

### Scheduled updates

First there's the `setInterval()`, `setTimeout()`, and `requestAnimationFrame()` functions, which can be used to call a specific function over a set period of time.

- `setInterval()`: Starts repeatedly executing the function specified by `function` every `delay` milliseconds.
- `setTimeout()`: Executes the function specified by `function` in `delay` milliseconds.
- `requestAnimationFrame()`: Tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.

If you don't want any user interaction you can use the `setInterval()` function, which repeatedly executes the supplied code. If we wanted to make a game, we could use keyboard or mouse events to control the animation and use `setTimeout()`. By setting listeners using `addEventListener()`, we catch any user interaction and execute our animation functions.

# Advanced animation

# Pixel manipulation with canvas

Until now we haven't looked at the actual pixels of our canvas. With the `ImageData` object you can directly read and write a data array to manipulate pixel data. We will also look into how image smoothing (anti-aliasing) can be controlled and how to save images from your canvas.

## The `ImageData` object

The `ImageData` object represents the underlying pixel data of an area of a canvas object. Its `data` property returns a `Uint8ClampedArray` (or `Float16Array` if requested) which can be accessed to look at the raw pixel data; each pixel is represented by four one-byte values (red, green, blue, and alpha, in that order; that is, "RGBA" format). Each color component is represented by an integer between 0 and 255. Each component is assigned a consecutive index within the array, with the top left pixel's red component being at index 0 within the array. Pixels then proceed from left to right, then downward, throughout the array.

The `Uint8ClampedArray` contains `height` × `width` × 4 bytes of data, with index values ranging from 0 to (`height` × `width` × 4) - 1.

For example, to read the blue component's value from the pixel at column 200, row 50 in the image, you would do the following:

```js
const blueComponent = imageData.data[50 * (imageData.width * 4) + 200 * 4 + 2];
```

If given a set of coordinates (X and Y), you may end up doing something like this:

```js
const xCoord = 50;
const yCoord = 100;
const canvasWidth = 1024;

const getColorIndicesForCoord = (x, y, width) => {
  const red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
};

const colorIndices = getColorIndicesForCoord(xCoord, yCoord, canvasWidth);

const [redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices;
```

You may also access the size of the pixel array in bytes by reading the `Uint8ClampedArray.length` attribute:

```js
const numBytes = imageData.data.length;
```

## Creating an ImageData object

To create a new, blank `ImageData` object, you should use the `createImageData()` method. There are two versions of the `createImageData()` method:

```js
const myImageData = ctx.createImageData(width, height);
```

This creates a new `ImageData` object with the specified dimensions. All pixels are preset to transparent.

You can also create a new `ImageData` object with the same dimensions as the object specified by `anotherImageData`. The new object's pixels are all preset to transparent black. This does not copy the image data!

```js
const myImageData = ctx.createImageData(anotherImageData);
```

## Getting the pixel data for a context

To obtain an `ImageData` object containing a copy of the pixel data for a canvas context, you can use the `getImageData()` method:

```js
const myImageData = ctx.getImageData(left, top, width, height);
```

This method returns an `ImageData` object representing the pixel data for the area of the canvas whose corners are represented by the points (`left`, `top`), (`left+width`, `top`), (`left`, `top+height`), and (`left+width`, `top+height`). The coordinates are specified in canvas coordinate space units.

This method is also demonstrated in the article Manipulating video using canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas

## Painting pixel data into a context

You can use the `putImageData()` method to paint pixel data into a context:

```js
ctx.putImageData(myImageData, dx, dy);
```

The `dx` and `dy` parameters indicate the **device coordinates** within the context at which to paint the top left corner of the pixel data you wish to draw.

For example, to paint the entire image represented by myImageData to the top left corner of the context, you can do the following:

```js
ctx.putImageData(myImageData, 0, 0);
```

> It is strongly recommended to visit the example about **Zooming and anti-aliasing** section on https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

## Saving images

The `HTMLCanvasElement` provides a `toDataURL()` method, which is useful when saving images. It returns a data URL containing a representation of the image in the format specified by the type parameter (defaults to PNG). The returned image is in a resolution of 96 dpi.

> Note: Be aware that if the canvas contains any pixels that were obtained from another origin without using CORS, the canvas is tainted and its contents can no longer be read and saved. See **Security and tainted canvases** at https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/CORS_enabled_image#security_and_tainted_canvases

- `canvas.toDataURL('image/png')`: Default setting. Creates a PNG image.
- `canvas.toDataURL('image/jpeg', quality)`: Creates a JPG image. Optionally, you can provide a quality in the range from 0 to 1, with one being the best quality and with 0 almost not recognizable but small in file size.

Once you have generated a data URL from your canvas, you are able to use it as the source of any `<img>` or put it into a hyperlink with a download attribute to save it to disc, for example.

You can also create a `Blob` from the canvas.

`canvas.toBlob(callback, type, encoderOptions)`: Creates a `Blob` object representing the image contained in the canvas.
