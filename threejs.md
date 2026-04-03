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

# Transform objects

In order to be able to **animate** objects, you first need to know how to **transform** objects. There are 4 properties used to transform objects:

1. Position
2. Scale
3. Rotaion
4. Quaternion

First of all it is useful to know that all objects that are extended from the `Object3D` class inherit and have access to all the transformation properties listed above. These include `PerspectiveCamera` class which is extended from the `Camera` class, and further, from the `Object3D` class. `Mesh` class is also extended from the `Object3D` class.

## Move objects

To move objects you should use the `position` property along with `x`, `y` and `z`. Also remember that the direction of the three axes are relative to the camera's position.

```js
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;
```

> Note that it is not necessary to apply position transforms before adding the object to the scene. So the three transforms above could either be placed before `scene.add(mesh)` or after it. However, all transforms should be applied before the scene is **rendered**; so before `renderer.render(scene, camera)`. It is a good convention to place transforms after creating the object and before adding it to the scene.

It is important to know that when using transforms, the unit of the values used are arbitrary. You should think of your values based on what you are building; it could be 1 kilometer, 1 centimeter, etc.

> If you are building a house, you can take 1 as 1 **meter**. If you are building a landscape, it could be 1 **kilometer**.

### Methods of `position`

The `position` object is an instance of the `Vector3` class. So it has access to `Vector3` methods.

#### `.length()`

`.length()` method returns the length from the center of the scene to the center of the object that calls the method.

```js
mesh.position.length();
```

#### `.distanceTo(target: Vector3)`

`.distanceTo()` method returns the length from the center of the object that calls the method to the `position` object given to the method as parameter.

```js
mesh.position.distanceTo(camera.position);
```

Note that the `.distanceTo()` method receives an argument of type `Vector3`. So you can also use the method like this:

```js
mesh.position.distanceTo(new THREE.Vector3(1, 4, -1));
```

#### `.normalize()`:

`.normalize()` method receives no argument. It takes the vector length and adjust it to exactly `1`.

```js
mesh.position.normalize();
```

> This method will be discusses later. #yetToCome-normalize

#### `.set(x: number, y: number, z: number)`:

You can use the `.set()` method to set `x`, `y` and `z` position properties at once:

```js
mesh.position.set(0.7, -0.6, 1);
```

### `AxesHelper` class

Since positioning objects in the 3D space can be challenging, you can use the `AxesHelper` class to display 3D colored axes.

```js
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
```

By default, the length of each axis will be set to 1 unit. You can change the length of the axes by giving the `AxesHelper()` class initializer a numeric value.

```js
const axesHelper = new THREE.AxesHelper(10);
```

## Scale objects

The `scale` property of an `Object3D` object is a `Vector3` object. You can scale objects along `x`, `y` and `z` axes.

```js
mesh.scale.x = 2;
```

### Methods of `scale`:

The `scale` property of an object is of type `Vector3` and therefore has access to its methods:

#### `.set(x: number, y: number, z: number)`

The `.set()` method is used to scale an object in all axes at once:

```js
mesh.scale.set(2, 0.5, 0.5);
```

## Rotate objects

You can rotate objects using either `rotation` or `quaternion`. The good thing about it is that rotating an object with one of them, will update the other.

### Using `rotation`

The `rotation` object has `x`, `y` and `z` properties but it is not of type `Vector3`. It is actually of type `Euler`. Values given to each of these axes are expressed in **radians**.

```js
mesh.rotation.y = 3.14159;
```

> Setting the rotation value to PI (3.14159) will result in a half rotation (180 degree). If you want full rotation you should use `2 * Math.PI`.

**IMPORTANT**

You must be careful of the rotation axes order that you are applying. When you rotate an object around the `x` axis, the object's `y` and `z` axes are also rotated with the object. So rotation around `y` after rotaion around `x` will result in a different rotation compared to before rotation around `x`, because after rotation around `x`, the `y` axis is now pointing to a different direction. If you are not carefull with this matter, you might end up in a **gimball lock**.

To go around this, you can use the `.reorder()` method of the `rotation` object. This reordering is used based on the type of movements you are going to implement for your project. For instance, if you are going to create an FPS game you need to reorder your rotations.

```js
mesh.rotation.reorder("YXZ");
// This should be implemented before any actual rotation code
```

This makes the rotations be applied in the declared order even if the rotation order in the code lines does not comply with it.

Since the axis order in rotation in Euler can be problematic, most 3D engines and softwares use **quaternion**. Quaternion also expresses object rotation, but in a more mathematical way.

#### `.lookAt(target: Vector3)`

Every `Object3D` instances have a `.lookAt()` method that rotates the object so that its `-z` direction faces the provided `target` of type `Vector3`. This is probably most useful for cameras to point them toward a target object position.

```js
camera.lookAt(mesh.position);
```

## Groups

It is often really useful to have several related objects in a group so they can be scaled, positioned and rotated in as a whole entity. For instance, if you are building a hous, you would probably want to have the objects of the kitchen in one group, probably called `kitchen`. To do this you can use the `Group` class. A `Group` class inhertis from the `Object3D` class, so all transform proerties and methods are available to it.

To do this, first create the group and add it to the scene:

```js
const cubesGroup = new THREE.Group();
scene.add(cubesGroup);
```

Then create any object, but instead of adding it to the scene, you should add it to the group:

```js
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);

cubesGroup.add(cube1);
```

You can now apply all transforms that you learned to the group instead of the individual objects.
