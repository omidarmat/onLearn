- [Getting started](#getting-started)
  - [Initialize a project](#initialize-a-project)
  - [Establishing a scene](#establishing-a-scene)
    - [Creating a scene](#creating-a-scene)
    - [Creating objects](#creating-objects)
    - [Creating a camera](#creating-a-camera)
    - [Creating a renderer](#creating-a-renderer)
    - [Render the scene](#render-the-scene)
- [Transform objects](#transform-objects)
  - [Move objects](#move-objects)
    - [Methods of `position`](#methods-of-position)
      - [`.length()`](#length)
      - [`.distanceTo(target: Vector3)`](#distancetotarget-vector3)
      - [`.normalize()`:](#normalize)
      - [`.set(x: number, y: number, z: number)`:](#setx-number-y-number-z-number)
    - [`AxesHelper` class](#axeshelper-class)
  - [Scale objects](#scale-objects)
    - [Methods of `scale`:](#methods-of-scale)
      - [`.set(x: number, y: number, z: number)`](#setx-number-y-number-z-number-1)
  - [Rotate objects](#rotate-objects)
    - [Using `rotation`](#using-rotation)
      - [`.lookAt(target: Vector3)`](#lookattarget-vector3)
  - [Groups](#groups)
- [Animation](#animation)
  - [The `.requestAnimationFrame()` method of `window`](#the-requestanimationframe-method-of-window)
  - [The animation speed problem](#the-animation-speed-problem)
    - [Time difference between ticks](#time-difference-between-ticks)
    - [Three `Clock` class](#three-clock-class)
  - [The `gsap` library](#the-gsap-library)
    - [GSAP tools](#gsap-tools)
      - [`gsap.to()`](#gsapto)
- [Cameras](#cameras)
  - [`ArrayCamera`](#arraycamera)
  - [`StereoCamera`](#stereocamera)
  - [`CubeCamera`](#cubecamera)
  - [`OrthographicCamera`](#orthographiccamera)
  - [`PerspectiveCamera`](#perspectivecamera)
- [Controlling cameras](#controlling-cameras)
  - [ThreeJS controls](#threejs-controls)
    - [`OrbitControls`](#orbitcontrols)
      - [Damping](#damping)
- [Going full-screen](#going-full-screen)
  - [Handling resize](#handling-resize)
  - [Handling pixel ratio](#handling-pixel-ratio)
  - [Handle full-screen](#handle-full-screen)
- [Geometries](#geometries)
  - [`BoxGeometry`](#boxgeometry)
  - [Creating a geometry](#creating-a-geometry)
  - [Indices (:plural \<- index)](#indices-plural---index)
- [Debug UI](#debug-ui)
  - [Setting up `lil-gui`](#setting-up-lil-gui)
  - [Different types of tweaks](#different-types-of-tweaks)
    - [Range](#range)
      - [Tweaking the geometry](#tweaking-the-geometry)
    - [Checkbox](#checkbox)
    - [Colors](#colors)
      - [Colors issue](#colors-issue)
        - [Retreiving the modified color](#retreiving-the-modified-color)
        - [Deal only with non-modified color](#deal-only-with-non-modified-color)
    - [Functions/Buttons](#functionsbuttons)
    - [Folders](#folders)
  - [`lil-gui` setup](#lil-gui-setup)
    - [Width](#width)
    - [Title](#title)
    - [Folders default state](#folders-default-state)
    - [Close the UI](#close-the-ui)
    - [Hide the UI](#hide-the-ui)
- [Textures](#textures)

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

Here we will use the `PerspectiveCamera` class to create a camera object. This class needs 2 essential parameters to be instantiated:

1. **Field of view:** Detemines how large your view angle is. It is expressed in **degrees** and corresponds to the vertical vision angle.
2. **Aspect ratio:** The width of the canvas divided by its height.

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

Then to create a renderer, use `WebGLRenderer` class which receives the canvas as named paramter:

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

1. **Position**
2. **Scale**
3. **Rotaion**
4. **Quaternion**

First of all it is useful to know that all objects that are extended from the `Object3D` class inherit and have access to all the transformation properties listed above. These include `PerspectiveCamera` class which is extended from the `Camera` class, and further, from the `Object3D` class. `Mesh` class is also extended from the `Object3D` class.

## Move objects

To move objects you should use the `position` property along with `x`, `y` and `z`. Also remember that the direction of the three axes are relative to the camera's position.

```js
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;
```

> Note that it is not necessary to apply position transforms before adding the object to the scene. So three transforms above could either be placed before `scene.add(mesh)` or after it. However, all transforms should be applied before the scene is **rendered**; so before `renderer.render(scene, camera)`. It is a good convention to place transforms after creating the object and before adding it to the scene.

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

`.distanceTo()` method returns the length from the center of the object that calls the method to the `position` of the object given to the method as parameter.

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

> This method will be discussed later. #yetToCome-normalize

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

You must be careful with the rotation axes order that you are applying. When you rotate an object around the `x` axis, the object's `y` and `z` axes are also rotated with the object. So rotation around `y` after rotation around `x` will result in a different rotation compared to before rotation around `x`, because after rotation around `x`, the `y` axis is now pointing to a different direction. If you are not carefull with this matter, you might end up in a **gimball lock**.

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

It is often really useful to have several related objects in a group so they can be scaled, positioned and rotated as a whole entity. For instance, if you are building a house, you would probably want to have the objects of the kitchen in one group, probably called `kitchen`. To do this you can use the `Group` class. A `Group` class inherits from the `Object3D` class, so all transform proerties and methods are available to it.

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

# Animation

Animating in ThreeJS is essentially done this way:

1. Move the object
2. Take a picture
3. Move the object a bit more
4. Take another picture
5. And so on...

Most screens run at 60 Frames per second (FPS), but some runs on higher and some other runs on lower FPS. However, your animation must look the same regardless of the framrate.

## The `.requestAnimationFrame()` method of `window`

The purpose of the method is to call the function that is provided on the next frame. So the method is not intended to do animations. Here is how you should do it:

```js
const tick = () => {
  //   Update objects
  mesh.rotation.y += 0.01;
  //   Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

// Don't forget to call the function once
tick();
```

So you need to move the render method into the `tick` function so that it is called somewhat recursively.

## The animation speed problem

Notice that the `window.requestAnimationFrame(tick)` function calling rate is based on framerate. So the higher the framerate (on more professional systems), the faster the animation is performed. So you need to adapt your animation to the framerate. There are 2 solutions to this matter.

### Time difference between ticks

To do this, you need to know how much time is passed from the last tick. We use `Date.now()` to get the current timestamp. This is the fix:

```js
let time = Date.now();

// Animations
const tick = () => {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  //   Update objects
  mesh.rotation.y += 0.002 * deltaTime;
  //   Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

### Three `Clock` class

You can also instantiate the `Clock` class and use its `getElapsedTime()` method.

```js
const clock = new THREE.Clock();

// Animations
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //   Update objects
  mesh.position.y = Math.sin(elapsedTime);
  mesh.position.x = Math.cos(elapsedTime);

  // also try this for fun!
  camera.position.y = Math.sin(elapsedTime);
  camera.position.x = Math.cos(elapsedTime);
  camera.lookAt(mesh.position);

  //   Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

The elapsed time is measured since the `Clock` is instantiated and is expressed in seconds.

However, there are better and more advanced solutions for implementing and controlling animations.

## The `gsap` library

Install the gsap library:

```
npm install gsap@3.5.1
```

Then import it in to the script file of your project:

```js
import gsap from "gsap";
```

### GSAP tools

GSAP has several tools for controlling object animation.

#### `gsap.to()`

Since GSAP uses its own tick and elapsed time calculation, you can remove animation codes from the `tick` function and only leave the render function in it.

```js
gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });

// Animations
const tick = () => {
  //   Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

# Cameras

There are various types of camera in ThreeJS. Here is a list:

1. `ArrayCamera`
2. `Camera`
3. `CubeCamera`
4. `OrthographicCamera`
5. `PerspectiveCamera`
6. `StereoCamera`

Notice that you are not supposed to use the `Camera` class directly. It is designed to be an abstract class. Other camera classes inherit from the `Camera` class.

## `ArrayCamera`

The `ArrayCamera` is used to render the scene from multiple cameras on specific areas of the render. For instance, if you are implementing something like a 3D software UI you can use this class.

## `StereoCamera`

The `StereoCamera` is used to render a scene through two cameras that mimic human eyes to create a parallax effect. The output of this render is specifically used with VR, red-blue glasses or cardboard.

## `CubeCamera`

The `CubeCamera` is used to do 6 renders, each facing a different direction. This class can be used to render the surrounding like environment map, reflection or shadow map.

## `OrthographicCamera`

The `OrthographicCamera` is used to render a scene without perspective. No perspective means that two object with the same size will appear the same size regardless of their distance to the camera. If perspective is applied, further objects should appear smaller than closer ones.

Here is the signature of the `OrthographicCamera` instantiation:

```ts
const orthographicCamera = new THREE.OrthographicCamera(
  left as number,
  right as number,
  top as number,
  bottom as number,
  near as number,
  far as number,
);
```

So instead of defining the field of view with a single numeric value as in `PerspectiveCamera`, here you define the field of view with four numeric values. Notice the shape of the field of view in this camera is not like a cone, but like a rectangle.

Afterwards, there are 2 other parameters defining the `near` and `far` values. Refer to `PerspectiveCamera` description on these two parameters.

**IMPORTANT**

If values (`-1`, `1`, `1`, `-1`) are used as (`left`, `right`, `top`, `bottom`), and the render scene dimensions are not square, your objects would appear distorted. Also, changing the render dimensions will change the type of distortion on your objects. To fix this, you need to account for the scene aspect ratio. For instance, if your scene is going to be `width x height`, multiply values of one direction of the field of view, for instance, left and right:

```js
const aspectRatio = width / height;

const orthographicCamera = new THREE.OrthographicCamera(
  left * aspectRatio as number,
  right * aspectRatio as number,
  top as number,
  bottom as number,
  near as number,
  far as number,
);
```

## `PerspectiveCamera`

It is now obvious what this class is used for. Here is the signature of the `PerspectiveCamera` instantiation:

```ts
const perspectiveCamera = new THREE.PerspectiveCamera(
  fieldOfView as number,
  aspectRatio as number,
  near as number,
  far as number,
);
```

1. **Field of view:** also called "fov", is expressed in **angles**. It defines the vertical vision angle. Be careful with really high values, since objects at the edge of the render frame will appear distorted.
2. **Aspect ratio:** The width of the render divided by the height.
3. **Near:** Defines how close the camera can see. Any object (or part of the object) closer than this value will not show up in the scene.
4. **Far:** Defines how far the camera can see. Any object (or part of the object) further than this value will not show up in the scene.

**IMPORTANT**

Do not use extreme values (`0.00001` or `9999999`) for `near` and `far` parameters. This could lead to a glitch problem called **z-fighting**. The values you should use for these two parameters depend on your project and scene.

# Controlling cameras

One of the most used controlls for the camera, is the mouse. Therefore, you should be able to get the position of your mouse cursor. You can simply use `addEventListener` on the `window` object and listen to `mousemove` events and get `clientX` or `clientY` values. However, the problem with this is that these values would be different on different devices and screens. We want these values to always stay between `-0.5` and `0.5`. To do this, you can divide `clientX` by your canvas `width`, and `clientY` by canvas `height` and then subtract `0.5` from each.

```ts
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});
```

You might think why not dividing them by viewport width and height. That is actually correct, but think of the canvas as a **full-screen** area. Now you can use the cursor positions to animate the camera movement in the `tick` function:

```js
const tick = () => {
  // Update objects
  camera.position.x = -cursor.x * 2; // arbitrary amplitude;
  camera.position.y = -cursor.y * 2; // arbitrary amplitude;
  camera.lookAt(mesh.position);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

> Notice that the above method used to position the camera will always prevent you from seeing the other side of the object. That is because the camera is moving along the `x` axis. To be able to see the other side of the object, the camera needs to move on a circle around the object. To do this, you need to implement some math:

```js
const tick = () => {
  // Update objects
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position); // Always place "lookAt" after object positioning, otherwise your looking direction will be off.

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

## ThreeJS controls

ThreeJS has provided users with various controller classes. Here is a list:

1. `DeviceOrientationControls`
2. `DragControls`
3. `FristPersonControls`
4. `FlyControls`
5. `OrbitControls`
6. `PointerLockControls`
7. `TrackballControls`
8. `TransformControls`

Among the list, `TransformControls` and `DragControls` are not actually about controlling cameras, but objects. Let's test `OrbitControls`.

### `OrbitControls`

Notice that when using a camera controller class like `OrbitControls`, all camera transforms will be done with this class, so there should be no manual camera controlling code in the `tick` function.

The instantiation of `OrbitControls` is not as simple as it seems. You cannot access `THREE.OrbitControls`. As of 2026, the class is located at this path:

```
/node_modules/three/examples/jsm/Addons.js
```

So you can import it by doing:

```js
import { OrbitControls } from "three/examples/jsm/Addons.js";
```

Then instantiate the class by giving it, as first parameter, the **camera** object, and as second parameter, a DOM element that would act as a **refernce** to which the mouse movements are measured by the controlling class.

```js
const controls = new OrbitControls(camera, canvas);
```

Now as simple as this `tick` function is, the camera movement is controlled by the class so nicely:

```js
const tick = () => {
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

You can also change the camera target by:

```js
const controls = new OrbitControls(camera, canvas);
controls.target.y = 1;
controls.update();
```

> Notice the `.update()` call which is necessary after changing the camera's target.

#### Damping

Up until now, the camera controller is working fine, but the animation is not smooth. To implement smooth animations with damping, you can set `enableDamping` property of the `controls` object to true.

```js
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
```

But there is one more piece left. You should call the `.update()` method on each `tick` to make it work fine, since you need the damping to work also when the mouse is not dragging.

```js
const tick = () => {
  // Update objects
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

# Going full-screen

In order to provide an immersive experience for the user, try and make your WebGL canvas full-screen. You can simply change the `sizes` object from past, and make it like this:

```js
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
```

Then you would have to add a CSS styling to the project in order to fit the canvas in the screen and disable scroliing:

```css
* {
  padding: 0;
  margin: 0;
}

html,
body {
  overflow: hidden;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
```

## Handling resize

Until now, the canvas is initiated with the viewport size, but the size will not be updated if the screen size is changed. To do this you should listen to the `resize` event on the `window` object. In the callback provided to the event listener, there are basically 3 things to do:

1. Update canvas sizes
2. Update camera's aspect ratio and call `.updateProjectionMatrix()` on the camera
3. Update the renderer size using `.setSize()`
4. Update the renderer pixel ratio using `.setPixelRatio`

```js
window.addEventListener("resize", () => {
  // Update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // refer to handling pixel ratio section
});
```

## Handling pixel ratio

If you are experiencing blurry renders or stairs effect on the edges, that is because you are working on a screen with pixel ratio that is not `1`. The pixel ratio corresponds to how many physical pixels you have on the screen for 1 pixel unit on the software part.

To get your current pixel ratio you can use:

```js
window.devicePixelRatio;
```

To update the renderer accordingly, you can use `.setPixelRatio()` on the renderer. Remember that if the device pixel ratio is too high, such as 3, 4 or 5, there will be so many re-renders. To prevent this, you should apply a maximum of 2 using `Math.min()`.

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

Notice that this handling should be applied in both renderer initialization and the `resize` event handler.

```js
window.addEventListener("resize", () => {
  // Update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

## Handle full-screen

It is a convention to listen for the `dbclick` event on the `window` object and enable full-screen mode. You can then check the current full-screen state and toggle it respectively. Notice that you can use `.requestFullscreen()` on the `canvas` element, and also use `.exitFullscreen()` on the `window` object.

```js
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
```

As of 2026 this way of handling full-screen does not work on Safari. To fix this, you need to use prefixed versions:

```js
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
```

# Geometries

A geometry in ThreeJS is composed of **vertices** and **faces**. Vertices are point coordinates in 3D space. Vertices can be used to create **meshes**, but it can also be used for **particles**. A vertex can store more data than just position data. It can store UV coordinates, normals, colors, or any random data.

All the following geometries inherit from the `BufferGeometry` class. The methods included in the class will not affect the mesh, but the vertices of the mesh. Here is a list of available geometry classes available in ThreeJS:

1. `BoxGeometry`
2. `PlaneGeometry`
3. `CircleGeometry`
4. `ConeGeometry`
5. `CylinderGeometry`
6. `RingGeometry`
7. `TorusGeometry`
8. `TorusKnotGeometry`
9. `DodecahedronGeometry`
10. `OctahedronGeometry`
11. `TetrahedronGeometry`
12. `IcosahedronGeometry`
13. `SphereGeometry`
14. `ShapeGeometry`
15. `TubeGeometry`
16. `TubeGeometry`
17. `ExtrudeGeometry`
18. `LatheGeometry`
19. `TextGeometry`

By combining these geometries you can build really complex objects. For extremely detailed objects you would want to use a 3D software.

## `BoxGeometry`

The `BoxGeometry` has these properties:

1. `width`
2. `height`
3. `depth`
4. `widthSegments`: determines number of subdivisions in the `x` axis
5. `heightSegments`
6. `depthSegments`
7. `color`
8. `wireframe`: receives boolean; if `true` displays the composing triangles

The number of subdivisions on each axis determines how many triangles will compose each face. For `1` segment, you get `2` triangles per face. For `2` segments, you get `8` triangles per face. More triangles mean more details. So if your geometry does not need details, don't increase your segments. For instance, if you are going to create a terain, you will need a lot of details, hence more segments.

## Creating a geometry

Before creating a geometry, you need to understand how to store **buffer geomtery data**. You first need to create the data that would then be used as vertices data. To do this, you should use `Float32Array`, which is **typed array** which can only store `float`s. It has a fixed length and therefore, it is easier for the computer to handle.

There are 2 ways of creating and filling a `Float32Array`:

```js
const positionsArray = new Float32Array(9);

// First vertex
positionsArray[0] = 0; // x
positionsArray[1] = 0; // y
positionsArray[2] = 0; // z

// Second vertex
positionsArray[3] = 0;
positionsArray[4] = 1;
positionsArray[5] = 0;

// Third vertex
positionsArray[6] = 1;
positionsArray[7] = 0;
positionsArray[8] = 0;
```

or

```js
const positionsArray = new Float32Array(
  [
    0,
    0,
    0, // First vertex
    0,
    1,
    0, // Second vertex
    1,
    0,
    0,
  ], // Third vertex
);
```

So since the `Float32Array` is a one-dimension array, you should insert data for all vertices into it. Therefore, starting from the beginning of the array, each 3 number will represent the 3D coordinates of each vertex.

After creating the `Float32Array`, you can convert it into a `BufferAttribute` object of ThreeJS:

```js
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
// 3 indicates how many values corresponds to one vertex
```

Now you can send this `BufferAttribute` to `BufferGeometry`:

```js
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttribute);
// "position" is the name that will be used in the shaders
```

Now you have created a simple geometry. Here is an alternative process for creating a geometry:

```js
const geometry = new THREE.BufferGeometry();

const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);
```

## Indices (:plural <- index)

There are some vertices in any object that are used commonly by multiple triangles. When creating a `BufferGeometry`, you can specify a bunch of vertices and then the indices to create the faces and reuse vertices multiple times. This will cause less data to be processed for rendering and therefore improves performance.

This matter is not covered yet in this document.

# Debug UI

An essential aspect of every creative project is for the developer, the designers, and also for the client to be able to tweak things easily. This might even surprise you by exposing unexpected results which could lead to new ideas.

There are various libraries available to use as a debug UI for ThreeJS:

1. `dat.GUI`
2. `lil-gui`
3. `control-panel`
4. `ControlKit`
5. `Uil`
6. `Tweakpane`
7. `Guify`
8. `Oui`

We are going to use `lil-gui` here. It is popular, it is continously maintained and is easy to use.

## Setting up `lil-gui`

First install it using this command:

```
npm install lil-gui
```

You can then import it into your project and instantiate it:

```js
// script.js
import GUI from "lil-gui";

const gui = new GUI();
// instantiate right at the beginning
```

## Different types of tweaks

There are different types of tweaks that `lil-gui` can handle for you:

1. **Range:** for numbers with min and max values
2. **Color:** for colors with various formats
3. **Text:** for simple texts
4. **Checkbox:** for booleans
5. **Select:** for a choice from a list of values
6. **Button:** for triggering a function

We are now going to try some of these. Notice that most of the tweaks can be implemented using:

```js
gui.add(parameters);
// Parameters can either be an object or a property of that object
```

### Range

Let's try with `mesh.position.y` and tweak it using the GUI.

```js
const mesh = THREE.Mesh(geometry, material);
scene.add(mesh);

gui.add(mesh.position, "y", -3, 3, 0.01);
// Meaning that you are trying to tweak the 'y' property of the 'mesh.position' object. You can also determin "minimum" and "maximum" values as the third and fourth parameters, and finally a "precision" parameter.
```

> Notice that if you don't provide minimum, maximum and the preceision parameters, the tweak would appear in the form of text input. But if you do provide the parameters, it will become a dragger.

Since this pattern of passing paramters can be a bit ambigious in your code, you can use method chaining like this:

```js
gui.add(mesh.position, "y").min(-3).max(3).step(0.01);
```

#### Tweaking the geometry

First of all, you are not supposed to tweak the geometry itself. You can, however, tweak the geometry subdivisions. In order to do this, you have access to `widthSegments`, `heightSegments` and `depthSegments` properties in the `BoxGeometry` class. But this does not mean that you can simply do this:

```js
gui.add(geometry, "widthSegments");
```

This is because the `widthSegments` among others mentioned above, **are used to generate the whole geometry only once,** and once the geometry is rendered, the properties are not useful anymore. So, you can use the `debugObject` again.

```js
debugObject.subdivision = 2;

gui.add(debugObject, "subdivision").min(1).max(20).step(1);
```

Up until now the `subdivision` property is in no way related to the geometry that is being renderd. So now as the tweak value changes, you should destroy the old geometry and build a new one. You might think of using the `.onChange()` method here, but that is not recommended. Building a geometry can be a rather **heavy process for the CPU.** So instead, go on and use `.onFinishChange()` method:

```js
debugObject.subdivision = 2;

gui
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();

    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision,
    );
  });
```

> Doing this, you should always remember that the **old geometries are still somewhere in the GPU memory which can create a memory leak**. So you need to dispose old geometries. #yetToCome-dispose

### Checkbox

To use the checkbox tweak of `lil-gui` you can pass it a boolean property of an object.

```js
gui.add(mesh, "visible");
```

> Object `mesh` has a `visible` property

### Colors

To use the color picker tweak, you can use the `.addColor()` method of the `gui` object. Remember that you must pass an object of type `Color` class from the ThreeJS library.

```js
gui.addColor(material, "color");
```

#### Colors issue

If you try to take the color value from the tweak and put in your material code, you will end up with the wrong color. That is because ThreeJS applies some color management in order to optimise the rendering. The color value that is being displayed in the tweak is not the same value as the one being used internally.

There are some fixes for this:

##### Retreiving the modified color

The `color` object which is an instance of the `Color` class has access to the `.getHexString()` method. Here is the method signature:

```js
color.getHexString(colorSpace: string = "SRGBColorSpace")
```

The method returns the hexadecimal value of `this` color as a string. The point is that we want the Hexadecimal string of the color after it is changed (modified) by ThreeJS. So you would have to use the `.onChange()` method of the `gui` object. The method receives a callback as parameter, and the callback has access to a `value` parameter which is exactly the same as `material.color` object.

```js
gui.addColor(material, "color").onChange((value) => {
  console.log(value.getHexString());
});
```

It works, but it is not a very handy solution.

##### Deal only with non-modified color

In this solution, you first need to store the color somewhere outside of ThreeJS. To do this, go on and create an object whose purpose is to hold some properties. You can call this object `global`, `parameters`, `debugObject` by convention. Also, you would want to place the object right after instantiating the `GUI` class in your code:

```js
const gui = new GUI();
const debugObject = {};
```

Then before before the code that is responsible for creating your `material`, go on and add a `color` property to the `debugObject`, and then pass it to the `MeshBasicMaterial` class to instantiate the material.

```js
debugObject.color = "#3a6ea6";
const material = new THREE.MeshBasicMaterial({ color: debugObject.color });
```

Then, you can go back to the `gui.addColor()` tweak where you can now utilize the `.onChange()` method to set the material color to the `color` property of `debugObject`.

```js
gui.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});
```

### Functions/Buttons

This is to trigger some instructions on demand. For instance, you want to make the cube perform a spin animation when we click somewhere in the debug UI.

Since `lil-gui` must always receive an object to be able to create some tweaks, you would need to add the spinning function to the `debugObject`.

```js
debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 2,
  });
};

gui.add(debugObject, "spin");
```

### Folders

Since the debug UI can get crowded with tweaks, you can separate them into folders by using the `.addFolder()` method of the `gui` object. Here is wrap up of all the previous tweaks:

```js
const cubeTweaks = gui.addFolder("Awesome cube");

cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
cubeTweaks.add(mesh, "visible");
cubeTweaks.add(material, "wireframe");
cubeTweaks.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});

debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 2,
  });
};

cubeTweaks.add(debugObject, "spin");

debugObject.subdivision = 2;

cubeTweaks
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();

    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision,
    );
  });
```

> You can also have nested folders.

## `lil-gui` setup

You can setup the debug UI graphical user interface to make it match your needs.

### Width

You can set the width of the UI by passing the `width` property to the `GUI` instantiation:

```js
const gui = new GUI({
  width: 300,
});
```

### Title

You can change the title with the `title` property:

```js
const gui = new GUI({
  width: 300,
  title: "Nice debug UI",
});
```

### Folders default state

You can set the open/close default state of the folders:

```js
const gui = new GUI({
  width: 300,
  title: "Nice debug UI",
  closeFolders: false,
});
```

### Close the UI

You can close the UI by using the `.close()` method on the `gui` object:

```js
const gui = new GUI({
  width: 300,
  title: "Nice debug UI",
  closeFolders: false,
});
gui.close();
```

### Hide the UI

You can hide the UI by using the `.hide()` method on the `gui` object. Then you can listen for some events to make a toggle for the UI to appear back or disappear again.

```js
gui.hide();

window.addEventListener("keydown", (event) => {
  if (event.key == "h") gui.show(gui._hidden);
});
```

> Tip: Try to add the tweaks as you develop the project; don't leave them for the end.

# Textures

Textures are basically images that covers the surface of the geometries.
