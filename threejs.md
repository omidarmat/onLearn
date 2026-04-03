# Getting started

## Initialize a project

In order to quick-start a ThreeJS project, you need to follow these steps:

1. Create a project folder and give it a name.
2. Initialize a Node project using `npm init -y`.
3. Install required dependencies:

```bash
npm install vite
# Vite is used to establish a local server for project development
npm install three
```

3. Configure Vite by placing a `vite.config.js` file at the project root and put the configuration code below inside it:

```js
export default {
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
};
```

4. Create an entry HTML file called `index.html` and a script file called `sciprt.js` in the `/src` folder of the project. Implement a basic HTML document using the `!` Emmet abbreviation and finally, address the script file using `<script type='module'></script>` in the `<body>` tag of the HTML. You can also place CSS files in the `src` folder and address it in the HTML.`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>First Three.js Project</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <canvas class="webgl"></canvas>
    <script type="module" src="./script.js"></script>
  </body>
</html>
```

> Note that there is a `<canvas></canvas>` tag in the HTML. This element will be selected using Javascript `querySelector`.

5. For developer convenice, add these scripts to the `package.json` file:

```json
"scripts": {
    "dev": "vite",
    "build": "vite build"
  },
```

6. Start working on the project by importing everything from the `three` library:

```js
// /src/script.js
import * as THREE from "three";
```

## Establishing a scene

For a basic scene to be created you need 4 elements:

1. Scene
2. Object (things to be seen in a scene)
3. Camera
4. Renderer

### Creating a scene

In order to create a scene, you can create an instance from the `Scene` class.

```js
const scene = new THREE.Scene();
```

### Creating objects

Objects can be things like primitve geometric shapes, imported models, particles, lights, etc.

To create an object in ThreeJS you need to create a **mesh**. A mesh in ThreeJS is a combination of geometry and material. Therefore, before being able to create an object, you need to create a geometry and a material, and with these, you will be able to create a mesh. So the `Mesh` class, upon instantiation, receives the **geometry** and **material** as parameters. Let's create a simple red cube:

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
```

Don't forget to add the created mesh (object) to the `scene`:

```js
scene.add(mesh);
```

### Creating a camera

Here we will use the `PerspectiveCamera` class to create a camera object. This class needss 2 essential parameters to be instantiated:

1. Field of view: Detemines how large your view angle is. It is expresses in **degrees** and corresponds to the vertical vision angle.
2. Aspect ratio: The width of the canvas divided by its height.

```js
/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
```

> Note that the camera's position along the `z` axis is set to 3. If left at its default position, the camera would be positioned at the center of the 3D space `(0, 0, 0)` same as the red cube object. Therfore, the camera will be placed inside the cube and nothing will be visible in the rendered scene.

> Field of view set to `75` creates a really huge field of view. Normally you would probably use something around `35`.

Again, don't forget to add the camera to the `scene`:

```js
scene.add(camera);
```

### Creating a renderer

In order to create a renderer, you need a canvas element on the page. You can select it in Javascript:

```js
// Canvas
// This line of code is conventionally positioned at the beginning of the script file
const canvas = document.querySelector("canvas.webgl");
// Remember there was a <canvas> element with class "webgl" in the index.html file
```

Then do this to create a renderer use `WebGLRenderer` class which receives the canvas as named paramter:

```js
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
```

### Render the scene

Finally, to render the scene with an object, camera and renderer, you can use the `render` method on the `renderer`. The `renderer` object receives the `scene` and the `camera` as its first and second parameters:

```js
renderer.render(scene, camera);
```
