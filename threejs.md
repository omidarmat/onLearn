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
  - [PBR principles](#pbr-principles)
  - [Loading textures](#loading-textures)
    - [Native JavaScript](#native-javascript)
    - [Using `TextureLoader` class](#using-textureloader-class)
    - [Using `LoadingManager` class](#using-loadingmanager-class)
  - [UV unwrapping](#uv-unwrapping)
  - [Transforming textures](#transforming-textures)
    - [Repeat](#repeat)
    - [Offset](#offset)
    - [Rotation](#rotation)
    - [Filtering and Mipmapping](#filtering-and-mipmapping)
  - [Texture format and optimization](#texture-format-and-optimization)
- [Materials](#materials)
  - [`MeshBasicMaterial`](#meshbasicmaterial)
    - [`.map()`](#map)
    - [`.color`](#color)
    - [`.wireframe`](#wireframe)
    - [`.opacity`](#opacity)
    - [`.alphaMap`](#alphamap)
    - [`.side`](#side)
  - [`MeshNormalMaterial`](#meshnormalmaterial)
    - [`.flatShading`](#flatshading)
  - [`MeshMatcapMeterial`](#meshmatcapmeterial)
  - [`MeshDepthMaterial`](#meshdepthmaterial)
  - [`MeshLambertMaterial`](#meshlambertmaterial)
  - [`MeshPhongMaterial`](#meshphongmaterial)
  - [`MeshToonMaterial`](#meshtoonmaterial)
  - [`MeshStandardMaterial`](#meshstandardmaterial)
    - [Adding environment map](#adding-environment-map)
    - [`.map`](#map-1)
    - [`.aoMap`](#aomap)
    - [`.displacementMap`](#displacementmap)
    - [`.metalnessMap` and `.roughnessMap`](#metalnessmap-and-roughnessmap)
    - [`.normalMap`](#normalmap)
    - [`.alphaMap`](#alphamap-1)
  - [`MeshPhysicalMaterial`](#meshphysicalmaterial)
    - [`.clearcoat`](#clearcoat)
    - [`.sheen`](#sheen)
    - [`.iridescence`](#iridescence)
    - [`.transmission`](#transmission)
  - [Other types of materials](#other-types-of-materials)
- [3D Text](#3d-text)
  - [Adding matcap material to text](#adding-matcap-material-to-text)
  - [Adding more objects to the scene](#adding-more-objects-to-the-scene)
- [Lights](#lights)
  - [`AmbientLight`](#ambientlight)
  - [`DirectionalLight`](#directionallight)
  - [`HemisphereLight`](#hemispherelight)
  - [`PointLight`](#pointlight)
  - [`RectAreaLight`](#rectarealight)
  - [`SpotLight`](#spotlight)
  - [Performance](#performance)
  - [Baking](#baking)
  - [Helpers](#helpers)
  - [`HemisphereLightHelper`](#hemispherelighthelper)
  - [`DirectionLightHelper`](#directionlighthelper)
  - [`PointLightHelper`](#pointlighthelper)
  - [`SpotLightHelper`](#spotlighthelper)
  - [`ReactAreaLightHelper`](#reactarealighthelper)
- [Shadows](#shadows)
  - [How ThreeJS handles shadows](#how-threejs-handles-shadows)
  - [Activate shadows](#activate-shadows)
  - [Shadow map optimization](#shadow-map-optimization)
    - [Adjust the `near` and `far` parameters](#adjust-the-near-and-far-parameters)
    - [Amplitude of the render](#amplitude-of-the-render)
    - [Blur](#blur)
    - [Shadow map algorithm](#shadow-map-algorithm)
    - [Using spot light (`SpotLight`) and its `fov`](#using-spot-light-spotlight-and-its-fov)
    - [Using point light (`PointLight`)](#using-point-light-pointlight)
    - [Baking shadows](#baking-shadows)
    - [Alternative to baking shadows](#alternative-to-baking-shadows)
- [Particles](#particles)
  - [Custom geometry](#custom-geometry)
  - [Textures](#textures-1)
    - [Alpha test (`alphaTest`)](#alpha-test-alphatest)
    - [Depth test (`depthTest`)](#depth-test-depthtest)
    - [Depth write](#depth-write)
  - [Blending](#blending)
  - [Random colors](#random-colors)
  - [Animation](#animation-1)
  - [Performance considerations](#performance-considerations)
- [Scroll-based animation](#scroll-based-animation)
  - [White background when page is over-scrolled](#white-background-when-page-is-over-scrolled)
  - [Positioning your objects](#positioning-your-objects)
  - [Moveing the camera with scroll](#moveing-the-camera-with-scroll)
  - [Implementing parallax effect](#implementing-parallax-effect)
  - [Implement easing/smoothing](#implement-easingsmoothing)
  - [Triggered animations](#triggered-animations)
- [React Three Fiber (R3F)](#react-three-fiber-r3f)
  - [Creating a simple mesh](#creating-a-simple-mesh)
  - [Position and rotation](#position-and-rotation)
  - [Nested objects and grouping](#nested-objects-and-grouping)
  - [Creating the first R3F app](#creating-the-first-r3f-app)
    - [Creating and handling meshes](#creating-and-handling-meshes)
    - [Animate things](#animate-things)
    - [Adding the `OrbitControls`](#adding-the-orbitcontrols)
      - [The hard way](#the-hard-way)
      - [The easy way](#the-easy-way)
    - [Adding lights](#adding-lights)

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

Textures are basically images that covers the surface of the geometries. But the image is not actually one simple image. The image will consist of multiple layers of images.

1. **Color**: The color image is simply going to be applied to the geometry as a color.
2. **Alpha**: It is a grayscale image. Anywhere on this image that is white, will be visible and anywhere that is black, will not be visible. Something between black and white will correspond to a visibility portion.
3. **Height**: Also called **displacement**, which again is a grayscale image. With this image you can move the vertices to create some relief. This requires enough subdivisions on the geometry. For instance, anywhere on the image that is white, might move the corresponding vertices up, and anywhere that is black, will move the vertices down.
4. **Normals**: It adds details regarding to things like light. Does not need subdivisions and vertices won't move. Better performance than adding a height texture with a lot of subdivisions. It lures the light about the face orientation.
5. **Ambient occlusion**: It is a grayscale image which adds fake shadows in crevices. It is not physically accurate, but helps to create contrast and see details.
6. **Metallness**: It is a grayscale image in which white will be metallic, and black will be non-metallic. It is used mostly for reflactions.
7. **Roughness**: Again, a grayscale image used in duo with the metallness. White willbe rough, black will be smooth. It is used mostly for light dissipation.

There are many other types of texture images by these are the main ones and this document is focused on them.

## PBR principles

All the texture images mentioned above (especially the metallness and the roughness) follow PBR principles (Physically Based Rendering):

- Techniques that tend to follow real-life directions to get realistic results
- These techniques are becoming the standard for realistic renders
- Many software, engines, and libraries are using it

## Loading textures

There are multiple ways of importing images:

### Native JavaScript

You can use JavaScript's `Image` class, then listen to the `onload` event and set a callback for it. Then set the `src` attribute of the image.

```js
const image = new Image();
image.onload = () => {
  const texture = new THREE.

};
image.src = "/textures/door/color.jpg";
// image is located in the project's "static/" folder
```

But you cannot simply use this image as a texture; you must transform it into a `Texture` class of ThreeJS. The conversion can be done once the image is loaded (`onload`):

```js
const image = new Image();
image.onload = () => {
  const texture = new THREE.Texture(image);
  console.log(texture);
};
image.src = "/textures/door/color.jpg";
```

You can now use this texture in the `material` object, but since it is scoped to the arrow function's block, you actually need to create the `Texture` instance outside, and then _update_ the texture once the image is loaded (`onload`):

```js
const image = new Image();
const texture = new THREE.Texture(image);

image.onload = () => {
  texture.needsUpdate = true;
};

image.src = "/textures/door/color.jpg";
```

Then you can use it in the creation of your `material`:

```js
const material = new THREE.MeshBasicMaterial({ map: texture });
```

### Using `TextureLoader` class

It is much easier to use the ThreeJS class `TextureLoader` to load the texture. Here is the general syntax:

```js
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/textures/door/color.jpg");
```

Behind the scenes, it is doing the same operations as we implemented using native JavaScript.

> One instance of `TextureLoader` can load multiple textures

The `.load()` method of the `TextureLoader` instance can receive 3 more arguments, each being a callback called in specific cases:

1. `load`: when the image loaded successfully
2. `progress`: when the loading is in progress
3. `error`: if something went wrong

```js
const texture = textureLoader.load(
  "/textures/door/color.jpg",
  () => {
    console.log("loaded");
    // This callback is called when the image is successfully loaded
  },
  () => {
    console.log("progress");
  },
  () => {
    console.log("error");
    // This callback might be called due to any error in loading the file; for example, wrong image url
  },
);
```

### Using `LoadingManager` class

You can use the `LoadingManager` class of ThreeJS to mutualize the events. It is useful when you want to know the global loading progress or be informed when everything is loaded.

To use this class, you must first create an instance, and then pass the instance to the `TextureLoader` instance:

```js
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load("/textures/door/color.jpg");
```

Using the `loadingManager`, you can now listen to various useful events:

1. `onStart`
2. `onLoad`
3. `onProgress`
4. `onError`

```js
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {};
loadingManager.onLoad = () => {};
loadingManager.onProgress = () => {};
loadingManager.onError = () => {};
// Before using the loadingManager in the textureLoader instance
```

Now go on and import all texture files you need for your material:

```js
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg",
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
```

## UV unwrapping

UV unwrapping is about the texture being stretched or squeezed in different ways to cover each different types of geometry. The word "unwrapping" related to the concept of unwrapping the paper cover around a chocolate.

Make a cube using a flat paper. Now open the cube and go back to the **flat paper**. Take a single vertex. It will always have a 2D coordinate on a flat plane.

In a 3D model, you have a 3D coordinate for each vertex, and each vertex also has a UV coordinate which is 2D. You can see the UV coordinates in `geometry.attributes.uv`. Those UV coordinates are generated by ThreeJS. If you create your own geometry, you'll have to specify the UV coordinates. If you are making the geometry using a 3D software, you'll also have to do the UV unwrapping.

## Transforming textures

There are multiple transformations you can implement on textures.

### Repeat

You can repeat a texture using the `repeat` property which is a `Vector2` class of ThreeJS. `Vector2` class of ThreeJS has `x` and `y` properties. You then have to set `wrapS` and `wrapT` properties of `colorTexture` to the `RepeatWrapping` constant value of ThreeJS.

```js
const colorTexture = textureLoader.load("/textures/door/color.jpg");
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;
```

> You can also use `MirroredRepeatWrapping`.

### Offset

You can offset the wrapping texture using the `offset` property of the texture which is also a `Vector2` class of ThreeJS.

```js
colorTexture.offset.x = 0.5;
colorTexture.offset.y = 0.5;
```

### Rotation

You can rotate the texture using the `rotation` property of the texture. It is just a numeric value in radians.

```js
colorTexture.rotation = Math.PI * 0.25;
```

This rotation might be executed with the corner of the texture acting as the rotation center. To fix this and to put rotation center in the center of the texture, you need to set `texture.center.x` and `texture.center.y` to `0.5`:

```js
colorTexture.rotation = Math.PI * 0.25;
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;
```

### Filtering and Mipmapping

If you look at the cube's top face while this face is almost hidden in zoom, you will see a blurry texture due to the filtering and the mipmapping. **Mipmapping** is a technique that consists of creating half smaller version of a texture again and again until we get a 1x1 texture. All those texture variations are sent to the GPU and the GPU will choose the most appropriate version of the texture.

All of this is already handled by ThreeJS and the GPU but we can choose different algorithms. There are 2 types of algorithms:

1. **Minification filter:** happens when the pixels of texture are smaller than the pixels of the render. In other words, the texture is too big for the surface it covers. For instance, when you zoom out your render very small, the texture file that you are using, should be rendered into a really small area and that is when minification happens. You can change the minification filter of the texture using the `minFilter` property with these 6 values:
   - `THREE.NearestFilter`
   - `THREE.LinearFilter`
   - `THREE.NearestMipmapNearestFilter`
   - `THREE.NearestMipmapLinearFilter`
   - `THREE.LinearMipmapNearestFilter`
   - `THREE.LinearMipmapLinearFilter` (default)

2. **Magnification filter:** happens when the pixels of the texture are bigger than the pixels of the render. In other words, texture is too small for the surface that it should cover. You can change the magnification filter of the texture using the `magFilter` property with these 2 values:
   - `THREE.NearestFilter`
   - `THREE.LinearFilter` (default)

> Notice that `THREE.NearestFilter` is cheaper than the other ones and if the result is fine with your, just use it

> Notice that if you are using `THREE.NearestFilter` on `minFilter`, you don't need the mipmaps. So you can deactivate the mipmaps generation with `colorTexture.generateMipmaps = false`.

## Texture format and optimization

When preparing your textures, keep these 3 things in mind:

1. The weight: Users will have to download texture files. So choose the right type of file. `.jpg` is a lossy compression but usually lighter, while `.png` is lossless compression but usually heavier. You can also use compression websites and softwares like _TinyPNG_.
2. The size (or the resolution): Each pixel of the texture will have to be stored on the GPU regardless of the image's weight. GPU has storage limitations. It is even worse because mipmapping increases the number of pixels to be stored. So try to reduce the size of your images as much as possible. Also, since the mipmapping will produce a half smaller version of the texture repeatedly until 1x1, the texture width and height must be a **power of 2** like 512x512 or 1024x1024 or 512x2048.
3. The data (that we put in the texture): Textures support transparency but we cannot have transparency in `.jpg` files. If you want to have only one texture that combine color and alpha, you'd better use `.png` file format. If you are using a _normal_ texture you want to have the exact values (since these values are going to be used for the movement of vertices) which is why you should not apply lossy compression and you had better use `.png` file format.

> The difficulty is to find the right combination of texture formats and resolutions

Checkout these links to find texture files:

1. poliigon.com
2. 3dtextures.me
3. arroway-textures.ch

# Materials

Materials are used to put a color on each visible pixel of the geometries. Algorithms that decide on that color of each pixel are written in programs called **shaders**. ThreeJS has many built-in materials with pre-made shaders.

> We will discover how to create our own shaders which is fairly difficult.

For this learning project we are going to setup some geometries along with some texture files:

```js
const material = new THREE.MeshBasicMaterial();

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);

sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material,
);

torus.position.x = 1.5;

scene.add(sphere, plane, torus);
```

And we are going to load some texture files:

```js
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclustionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg",
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg",
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg",
);

const matcapTexture = textureLoader.load("./textures/matcaps/1.png");

const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");
```

Also, for the purpose of this learning project which is experimenting with the effects of light on materials and textures, we are going to add some additional animation to the `tick` function as:

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //   Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
```

Textures used as `map` and `matcap` are supposed to be encoded in `sRGB` space. This is done by setting their `colorSpace` to `THREE.SRGBColorSpace`.

```js
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;

const matcapTexture = textureLoader.load("./textures/matcaps/1.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;
```

You can then test the textures on the material with the `map` property:

```js
const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
```

You can now see how the texture sits on the material.

There are many different materials available in ThreeJS. Let's now inspect a bit into the `MeshBasicMaterial`.

## `MeshBasicMaterial`

There are many useful properties available on this class.

### `.map()`

You can do either:

```js
const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
```

or

```js
const material = new THREE.MeshBasicMaterial();
material.map = doorColorTexture;
```

### `.color`

Applies a uniform color on the surface of the geometry. When changing the `color` property directly, you must instantiate a `Color` class. You can set color like this:

```js
const material = new THREE.MeshBasicMaterial({ color: "green" });
```

But you cannot simply do:

```js
const material = new THREE.MeshBasicMaterial();
material.color = "green";
```

This will not work. The first syntax will automatically set the `color` property to a `Color` object. The second syntax, however, is setting it to a simple string which is not acceptible in ThreeJS. This is the working syntax:

```js
const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color("green");

// These will work too
material.color = new THREE.Color("#F00");
material.color = new THREE.Color("0xff0000");
```

> If you use both `color` and `map` a texture to the material, the applied color will tint the texture.

### `.wireframe`

This property shows the triangles that compose the geometry with a thin line of `1px` width.

```js
material.wireframe = true;
```

### `.opacity`

Before being able to tweak opacity, you need to set `transparent` property to `true`.

```js
material.transparent = true;
material.opacity = 0.5;
```

### `.alphaMap`

Similar to opacity, but you can actually set this property to a loaded texture. For instance:

```js
material.alphaMap = doorAlphaTexture;
```

What this does bascially is that wherever the texture is white the material will be visible (`opacity = 1`), and wherever it is black it will be unvisible (`opacity = 0`).

### `.side`

This property decides which side of the face is visible. It can be set to these values:

- `FrontSide`: default value
- `BackSide`
- `DoubleSide`

For example:

```js
material.side = THREE.DoubleSide;
```

> Avoid using `DoubleSide` since it requires more resources when rendering.

> Some of the mentioned properties like `wireframe` and `opacity` can be used with most other types of ThreeJS materials.

## `MeshNormalMaterial`

This type of material displays a nice purpel, bluish color that looks like the normal texture we saw in the `Texture` lessons. "Normals" are information encoded in each vertex that contains the direction toward the outside of the face. The color displays the normal orientation relative to the camera. In other words, the normal directions toward x, y and z axes are relative to the camera. This is the actual reason that when you rotate around a `MeshNormalMaterial`, you see that the colors remain the same no matter how much you rotate.

This type of material is used for things like calculating how to illuminate the face or how the environment should reflect or refract on the geometry's surface.

This type of material is usually used to debug the normals.

> Portfolio: `https://www.ilithya.rocks`

### `.flatShading`

Flat shading can be used to display flat faces on the material.

```js
material.flatShading = true;
```

## `MeshMatcapMeterial`

DEFINITION

This type of material usually requires a reference texture that looks like a sphere. The material will pick colors from the texture according to the normal orientation relative to the camera.

> With this type of material, when you rotate aroud an object, it seems that a light source exists right behind the camera toward the object (there is no actual light source, but it seems so). Notice that this can reveal a conflict between the direction of this light and direction of shadows if you implement some shadows in your scene.

```js
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
```

> Portfolio: `https://bruno-simon.com`

You can get a vast list of matcaps at `https://github.com/nidorx/matcaps`, or you can create your own matcaps using:

1. 3D software by rendering a sphere in front of the camera in a square image.
2. With a 2D software like photoshop
3. With online tools like `kchapelier.com/matcap-studio`

## `MeshDepthMaterial`

This special type of material colors the geometry in white if it is close to the camera's `near` value and in black if it is close to the `far` value.

```js
const material = new THREE.MeshDepthMaterial();
```

We are not much going to use this type of metarial directly since ThreeJS already uses this internally to render scenes.

However, It can also be used for post-processing and also for shadows. It is used to save the depth in a texture, which can be used for later complex computations like shadows.

## `MeshLambertMaterial`

This type of material requires light to be seen. So just by doing this:

```js
const material = new THREE.MeshLambertMaterial();
```

You won't be able to see any of your geomteries. You are going to need to place some lights. You can start by adding an ambient light:

```js
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
```

But this does not resemble even close to the reality. Let's add a point light also:

```js
const pointLight = new THREE.PointLight(0xffffff, 30);
scene.add(pointLight);
```

By default, the point light will be located at the center of the scene, which is porbably never what you want. So:

```js
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
```

`MeshLambertMaterial` supports the same properties as the `MeshBasicMaterial` but also some properties related to lights.

`MeshLambertMaterial` is the most performant type of meterial that uses light. The parameters are not convenient, and you can see strange patterns in the geometry if you look closely at rounded geometries like the sphere.

## `MeshPhongMaterial`

With this type of material, which needs light similar to lambert, you can use properties like `shininess` and `specular`:

```js
const material = new THREE.MeshPhongMaterial();
// shininess controls the light reflection intensity
material.shininess = 100;

// specular controls the light reflection color
material.specular = new THREE.Color(0x1188ff);
```

Getting realistic results with this type of material is hard and often impossible.

## `MeshToonMaterial`

This type of material also needs light sources. By default, you only get a two-part coloration (one for the shadow and one for light). To add more gradient steps, you can use a loaded gradient texture on the `gradientMap` property.

```js
const material = new THREE.MeshToonMaterial();
material.gradientMap = gradientTexture;
```

Notice that if you deliberately create your gradient texture file small enough to make only 3 steps, ThreeJS, by default, tries to make the gradient smooth (mipmapping). But you don't want it. To get rid of this default setting, you need to alter `minFilter` and `magFilter` on the gradient texture that you loaded into your program, and deactivate the default mipmapping:

```js
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
```

## `MeshStandardMaterial`

This type of material uses physically-based rendering principles like in the textures lesson. It supports lights but with a more realistic algorithm and better paramters like roughness and metalness. It is called "standard" since the PBR has become the standard in many software, engines and libraries.

You can get a realistic output with realistic parameters, and similar result regardless of the technology you are using. So go on and play with the `roughness` and `metalness` properties:

```js
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.95;
material.roughness = 0.25;
```

### Adding environment map

Experimenting with the propeties mentioned above can be done better if your obejcts are placed in a natural revealing surrounding environment. To do this, you can add an environment map. An environment map is like an image of what is surrounding the scene.

> You can find environement map `.hdr` files at `https://polyhaven.com`

An environment map will help you add reflection, refraction and also lighting to your objects, in addition to the current `DirectionalLight` and `AmbientLight` objects used in code.

To implement environment map, you should first import it:

```js
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
```

Then conventionally after you add lights in your code, you do:

```js
const rgbeLoader = new RGBELoader();

// The `load` method receives as its second parameter a callback the has access to the loaded environment map.
rgbeLoader.load("./textures/environmentMap/2k.hdr", (envMap) => {
  // we will learn about this later
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  // to apply the environment map to the scene, you need to apply it to the background
  scene.background = envMap;
  // and also to the environment, since this will be handling the lighting effects on the objects
  scene.environment = envMap;
});
```

The environment map is also compatible with `MeshLambertMaterial` and `MeshPhongMaterial`.

> Since an environment map provides for lighting qualities of the objects in your scene, you might not need any manual light setup in your code.

### `.map`

### `.aoMap`

This property (stands for "ambient occlusion map"), when set to an ambient occlusion loaded texture, will add shadows where the texture pattern is dark. This will only affect the lights created by `AmbientLight`, the environment map and also the `HemisphereLight`.

You can also set the intensity at which the ambient occlusion map impacts the lighting properties:

```js
const material = new THREE.MeshStandardMaterial();
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclustionTexture;
material.aoMapIntensity = 1;
```

### `.displacementMap`

This property, when set to a loaded height texture moves the vertices to create true relief.

```js
material.displacementMap = doorHeightTexture;
```

A height map, used as `displacementMap`, will move a vertex up if the corresponding pixel in the map is white, and moves down if the pixel is black. For this to work properly, the material to which you are appling the map should have enough details, meaning that you should increase the subdivisions of your geometries:

```js
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
```

Usually, the default displacement scale is too much and you would want to tweak it:

```js
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.2;
```

The downside of this is that you need to use a lot of subdivisions and this is bad for performance.

### `.metalnessMap` and `.roughnessMap`

Instead of setting a uniform `metalness` and `roughness` for the whole geometry, you can load map texture files and set them to `.metalnessMap` and `.roughnessMap`:

```js
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
```

In the metalness map file, pixels with white color represent metallic surfaces, and pixels with black color represent non-metalic surfaces.

In the roughness map file, pixels with white color represent rough surfaces, and pixels with black color represent smooth surfaces.

Also notice that to make these work fine, you need to set the `metalness` and `roughness` properties to `1`:

```js
material.metalness = 1;
material.roughness = 1;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
```

### `.normalMap`

This property, if set to a loaded normal texture, fakes the normal orientation and add details to the surface regardless of the subdivisions:

```js
material.normalMap = doorNormalTexture;
```

> The small details that you notice are added now is not caused by the `.displacementMap`. With `.normalMap` you can add some important details to your objects by affecting light behavior without adding vertices.

You can also tweak the intensity at which the `.normalMap` works by using `.normalScale` and apply `.set()` on it:

```js
material.normalScale.set(0.5, 0.5);
```

### `.alphaMap`

Controls the alpha using `alphaMap` property. Don't forget to set the `.transparent` property to `true`:

```js
material.transparent = true;
material.alphaMap = doorAlphaTexture;
```

## `MeshPhysicalMaterial`

This is the worst type of material regarding performance. You can create one using:

```js
const material = new THREE.MeshPhysicalMaterial();
```

It is more physically realisitc. Same as `MeshStandardMaterial` but with support of additional effects:

- `clearcoat`
- `sheen`
- `iridescence`
- `transmission`

### `.clearcoat`

It simulates a thin layer of varnish on top of the actual material. It has its own reflective properties while you can still see the default material behind it, like putting a layer of glass on your main material.

> Be careful using this type of material since it can impact performance.

```js
material.clearcoat = 1;
material.clearcoatRoughness = 0;
```

### `.sheen`

The `sheen` property will make the clearcoat more apparent as a separate varnish layer covering the main material right on top.

```js
material.sheen = 1;
material.sheenRoughness = 0.25;
material.sheenColor.set(1, 1, 1);
```

### `.iridescence`

Creates color artifacts like a fuel puddle, soap bubbles, or even laser disks.

```js
material.iridescence = 1;
material.iridescenceIOR = 1;
material.iridescenceThicknessRange = [100, 800];
```

Notice that if you need to add tweaks for these properties to `lil-gui` you should follow:

```js
gui.add(material, "iridescence").min(0).max(1).step(0.0001);
gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.0001);
gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);
```

> Notice you should not exceed `2.333` as the maximum value for `iridescenceIOR` since it generates effects that are not realistic.

### `.transmission`

Enables light to go through the material. It is more than just transparency with `opacity`, because the image behind the objects get deformed with `transmission`:

```js
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

// lil-gui
gui.add(material, "transmission").min(0).max(1).step(0.0001);
gui.add(material, "ior").min(0).max(10).step(0.0001);
gui.add(material, "thickness").min(0).max(10).step(0.0001);
```

With `transmission` the objects feel translucent. `ior` stands for index of refraction and depends on the type of material you want to simulate. Here is a small guide:

- Diamond: `ior = 2.417`
- Water: `ior = 1.333`
- Air: `ior = 1.000293`

> You can find a complete guide on this on Wikipedia `https://en.wikipedia.org/wiki/List_of_refractive_indices`

## Other types of materials

Other types of materials will be covered later as they need more knowledge:

- `PointsMaterial`: For particles, their size, color, etc.
- `ShaderMaterial` and `RawShaderMaterial`: Used to create your own materials using a special language named GSSL.

> Materials can have a drastic impact on performance. As a nice guide, remember that if the camera is not going to rotate around your object, use a matcap.

# 3D Text

We are now going to use the `TextBufferGeometry` class but we need a particular font format called **typeface**.

You can convert a font fila that you have with tools like `https://gero3.github.io/facetype.js`. You can also use fonts provided by ThreeJS. Go to `/node_modules/three/examples/fonts` folder. You can take fonts from there and put them in the `/static/` folder or you can import them directly into your project.

We are going to manually copy/paste the typeface json file into the project's `static` folder and then load it using the ThreeJS `FontLoader` function.

So first import it:

```js
import { FontLoader } from "three/examples/jsm/Addons.js";
```

And then instantiate and use it:

```js
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  console.log("Font loaded: ", font);
});
```

Now its time to use the `TextBufferGeometry` class. First import it:

```js
import { TextGeometry } from "three/examples/jsm/Addons.js";
```

And then use it in the callback of the `fontLoader.load()` function:

```js
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Omid Armat Portfolio", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });

  const text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);
});
```

You have the text in your scene and now you need to think about performance. Creating a text geometry is long and hard for the computer. Avoid doing it too many times and keep the geometry as low poly as poissble by reducing the `curveSegments` and `bevelSegments`. Also remember to remove the wireframe once you're happy with the level of details. In letters that have lots of curves, you get lots of triangles and that is bad for performance.

After optimizing the text render, you might probably need to center your view on the center of the text. To do this, you need to create an axis helper to visualize the center of the scene, so you can adjust it more easily afterwards:

```js
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
```

To center the text, you have multiple solutions:

1. **Using the bounding:** It is an information associated with the geometry that tells about the space that is taken by that geometry. It can be a box or a sphere tightly surrounding an object (each letter). Each letter has this bounding information. This information helps ThreeJS calculate if the object is on the screen (**frustum culling** - to render or not to render the object). We can use the bounding measures to re-center the geometry. To use this method, you first need to know that ThreeJS uses, by default, the sphere bounding, which you have to change by using `computeBoundingBox()`.

```js
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Omid Armat Portfolio", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.computeBoundingBox();
  // This will now give you access to `textGeometry.boundingBox` which is of type `Box3`, with `min` and `max` properties. The `min` property is not at `0` because of the `bevelThikness` and `bevelSize`.

  const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
});
```

Right now, if you inspect the `textGeometry.boundingBox` in the console, you can see that the `min.x` property is at about `-0.02`. This is because of the bevel settings applied to the text geometry as you can see in the scene if you zoom enough on the axis helper origin.

Now back to re-centering the geometry, we are not going to move the mesh, but we are going to move the whole geometry using the `translate` method. Notice that you have access to this method because the inheritance chain is: `BufferGeometry -> ExtrudeBufferGeometry -> TextBufferGeometry`:

```js
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Omid Armat Portfolio", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.computeBoundingBox();
  textGeometry.translate(
    -textGeometry.boundingBox.max.x * 0.5,
    -textGeometry.boundingBox.max.y * 0.5,
    -textGeometry.boundingBox.max.z * 0.5,
  );

  const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });

  const text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);
});
```

Now the text seems to be centered, although it is actually not because of the `bevelThickness` and `bevelSize` that is set on the text geometry. You can account for the corresponding bevel values by doing:

```js
textGeometry.translate(
  -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  -(textGeometry.boundingBox.max.z - 0.03) * 0.5,
);
```

...since you have set `bevelThickness: 0.03` and `bevelSize: 0.02`. This was a long way to re-center the text in your scene and there is a much faster and efficient way of doing this.

2. Using `textGeometry.center()`: The `center` method will simply center the geometry based on the bounding box:

```js
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Omid Armat Portfolio", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.center();

  const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });

  const text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);
});
```

## Adding matcap material to text

We are going to use `MeshMatcapMaterial`.

> You can download matcaps from `https://github.com/nidorx/matcaps`

Let's load a matcap texture with `TextureLoader`:

```js
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
```

You can now replace your `MeshBasicMaterial` by the `MeshMatcapMaterial` and use your loaded `matcapTexture` with the `matcap` property:

```js
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Omid Armat Portfolio", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.center();

  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  const text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);
});
```

## Adding more objects to the scene

We want to add some randomly scattered donuts around the text. Let's first see what is the wrong way of doing this:

```js
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Omid Armat Portfolio", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.center();

  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  const text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);

  console.time("donuts");

  for (let i = 0; i < 100; i++) {
    const donutGeometery = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    const donutMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    const donut = new THREE.Mesh(donutGeometery, donutMaterial);

    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }

  console.timeEnd("donuts");
});
```

As you can see in your console, the `console.time` shows that generating the donuts takes about `52` milli seconds. But there is an optimization we can do: We can use the same material and the same geometry on multiple meshes. Currently, we are creating these two for each donut separately.

```js
console.time("donuts");

const donutGeometery = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture,
});

for (let i = 0; i < 100; i++) {
  const donut = new THREE.Mesh(donutGeometery, donutMaterial);

  donut.position.x = (Math.random() - 0.5) * 10;
  donut.position.y = (Math.random() - 0.5) * 10;
  donut.position.z = (Math.random() - 0.5) * 10;

  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);

  scene.add(donut);
}

console.timeEnd("donuts");
```

Look how much time and performance you have saved just by moving two lines of code out of the loop! There is one more thing you can optimize. As you can see we are using the same code for both text and donut materials:

```js
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
```

Use it once and you see we have now reduced the time difference from about 50 to about 2-3 milliseconds.

# Lights

Adding lights to a scene is as simple as adding meshes. You just need to instantiate your lights with the right class and add it to the scene. There are many types of lights.

## `AmbientLight`

Ambient light applies omni-directional lighting to your scene. To instantiate an ambient light do:

```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// or
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.5;
scene.add(ambientLight);
```

The first paramtere of the `AmbientLight` constructor is the **color** of the light, and the second parameter is the **intensity** of the light.

`AmbientLight` is used to simulate light bouncing.

## `DirectionalLight`

It has a sun-like effect as if the sun rays were traveling in parallel. Again, you need **color** and **intensity** to instantiate a directional light:

```js
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
scene.add(directionalLight);
```

You can obviously change the direction of this light:

```js
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
```

Remember that the directional light will always direct light toward the center of the scene. If you're not using shadows, it makes no difference to put the light far or close. But there is a slight difference if you are implemening shadows. [later...]

## `HemisphereLight`

This is similar to the `AmbientLight` but with a different color from the **sky** than the color coming from the **ground**. To instantiate this type of light you are going to need:

1. `color` or `skyColor` as first parameter
2. `groundColor` as second parameter
3. `intensity` as third parameter

```js
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
```

## `PointLight`

This is almost like a lighter. The light starts at an infinitely small point and spreads uniformly in every direction. You need **color** and **intensity** to instantiate this light:

```js
const pointLight = new THREE.PointLight(0xff9000, 0.5);
scene.add(pointLight);
```

By default, the light is placed at the center of the scene, but you can re-position it:

```js
const pointLight = new THREE.PointLight(0xff9000, 0.5);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
```

Also, by default, the light intensity does not fade. You can control the fade distance and how fast it fades with `distance` as the third parameter of instantiation and `decay` as the forth parameter. The `distance` paramter sets the distance by which the light effect is terminated and objects farther than that distance will not get illuminated by that light. `decay` determines how fast the light dims.

## `RectAreaLight`

Tis works like the big rectangle lights you can see on the photoshoot sets. It is a mix between a directional light and a diffuse light. To instantiate this light you are going to need:

1. `color`
2. `intensity`
3. `width`
4. `height`

```js
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 3, 1);
scene.add(rectAreaLight);
```

> Remember that the `RectAreaLight` only works with `MeshStandardMaterial` and `MeshPhysicalMaterial`

By default, the light is positioned at the center of the scene, which is most probably not what you want. You can move the light and rotate it, and you can also use `.lookAt()` method on it:

```js
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 3, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);
```

## `SpotLight`

It is like a flashlight. It is a cone of light starting at a specific point and oriented in a specific direction (you will see a circle of light on objects illuminated by this type of light). To instantiate this type of light you are going to need:

1. `color`
2. `intensity`
3. `distance`
4. `angle`: Determines how wide your light is. `Math.PI * 0.1` means `0.1` of `180deg`
5. `penumbra`: Determines how sharp is the border of the circle of light. The lower, the sharper. If set to completely sharp (`0`), part of an object within the lighting circle will be illuminated, and part of it outside will not.
6. `decay`

```js
const spotLight = new THREE.SpotLight(0x78ff00, 1, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);
```

To rotate the spot light, you need to add its `target` property to the scene and then move it. The `target` property of the spot light is actually an object of type `Object3D`. It is not a vector. The `target` is what the spot light always looks at. So in order to rotate the spot light, you need to move its `target`:

```js
const spotLight = new THREE.SpotLight(0x78ff00, 1, 10, Math.PI * 0.05, 0.25, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

// Notice that you can position the `target` and then add it to the scene
spotLight.target.position.x = -0.75;
scene.add(spotLight.target);
```

## Performance

Lights can cost a lot when it comes to performance issues. Try to add as few lights as possible and try to use the lights that cost less.

The lights with the minimal cost are:

- `AmbientLight`
- `HemisphereLight`

The lights with moderate cost are:

- `DirectionalLight`
- `PointLight`

And the lights with high cost are:

- `SpotLight`
- `RectAreaLight`

## Baking

When you need to use a lot of lights and the lights should look perfect, you may not be able to do it in ThreeJS and need to use baking. The idea is to **bake** the lights into the texture. This can be done in a 3D software. The drawback of this technique is that you cannot move the lights anymore and you will have to load huge textures.

> Portfolio: https://threejs-journey.xyz

## Helpers

Helpers can assist with positioning lights. You can use:

- `HemisphereLightHelper`
- `DirectionalLightHelper`
- `PointLightHelper`
- `RectAreaLightHelper`
- `SpotLightHelper`

## `HemisphereLightHelper`

To instantiate the helper, you need the actual hemisphere light instance as the first parameter, and a number as the second parameter that determines the size of the helper.

```js
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2,
);
scene.add(hemisphereLightHelper);
```

## `DirectionLightHelper`

To instantiate the helper, you need the actual directional light instance as the first parameter, and a number as the second parameter that determines the size of the helper.

```js
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2,
);
scene.add(directionalLightHelper);
```

## `PointLightHelper`

To instantiate the helper, you need the actual point light instance as the first parameter, and a number as the second parameter that determines the size of the helper.

```js
const pointLightHelper = new THREE.PointLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper);
```

## `SpotLightHelper`

To instantiate the helper, you only need to pass the actual spot light instance as parameter. Remember that with this helper, you also need to call its `.update()` method on the next frame after moving the `target`.

```js
const spotlightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotlightHelper);
```

## `ReactAreaLightHelper`

This helper is not part of the `THREE` variable and you need to import it manually:

```js
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";
```

And then use it by passing in the actual instance of rect area light:

```js
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
```

# Shadows

When you place some light on one side of an object, you automatically get some **core shadows** on the object's opposite side. Core shadows are created automatically. What we are missing, is called **drop shadows**.

Shadows have always been a challenge for real-time 3D rendering, and developers must find tricks to display realistic shadows at a reasonable frame rate. ThreeJS has a built-in solution for this matter; it is not perfect, but it is convenient.

> In 3D software like Blender, the **ray tracing** feature handles this issue.

## How ThreeJS handles shadows

When you do one render, ThreeJS will do the render for each light supporting shadows. Those renders will simulate what the light sees as it if was a camera. During these lights renders, a `MeshDepthMaterial` replaces all meshes material.

The lights renders are stored as textures and we call those **shadow maps**. They are then used on every materials supposed to receive shadows and projected on the geometry.

## Activate shadows

To activate shadows, you should first go to your renderer and enable `shadowMap`:

```js
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
```

You should then go through each object and decide it it can case a shadow with `castShadow` and if it can receive shadow with `receiveShadow`:

```js
// In the current scene, there is a sphere on a plane

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
// shadow
sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
// shadow
plane.receiveShadow = true;
```

Now you should activate shadows on light sources. Remember that only the following types of light support shadows:

- `PointLight`
- `DirectionalLight`
- `SpotLight`

```js
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.castShadow = true;
```

You can now see shadows in your scene.

## Shadow map optimization

The shadow maps that are generated by the renderer are actually some images. These images, like any other image, have width and height, which you can modify. You can access the shadow maps on the light that is causing the shadows.

For instance:

```js
console.log(directionalLight.shadow);
// returns DirectionalLightShadow object
```

By default, the shadow map size is `512x512`. You can increase it, but make sure you keep a power of 2 for the sake of mipmapping:

```js
directionalLight.shadow.mapSize.width = 1024;
// can also use `x` instead of `width`
directionalLight.shadow.mapSize.height = 1024;
// can also use `y` instead of `height`
```

### Adjust the `near` and `far` parameters

Another step in optimizing shadows is to adjust the `near` and `far` parameters. To help us debug, we can use a `CameraHelper` with the camera used for the shadow map located in the `directionalLight.shadow.camera` object.

```js
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera,
);

// can toggle helper's visibiltiy
directionalLightCameraHelper.visible = false;

scene.add(directionalLightCameraHelper);
```

Now that you can see the exact direction and scale of the camera view, you can adjust it:

```js
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
```

### Amplitude of the render

Sometimes the scale of render is much bigger than the actual scene. Since the render is done by an orthographic camera, you can access parameters such as `left`, `right`, `top`, and `bottom` all measured from the center of the camera view.

```js
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
```

> Remember that the smaller the values, the more precise the shadow will be. However, if it is too small, the shadows will be cropped.

### Blur

You can control the shadow blur with the `radius` property. This technique does not use the proximity of the camera with the object, it's a general and cheap blur.

```js
directionalLight.shadow.radius = 10;
```

### Shadow map algorithm

Different types of algorithms can be applied to shadow maps:

- `THREE.BasicShadowMap`: Very performant but lossy quality
- `THREE.PCFShadowMap`: Less performant but smoother edges (default)
- `THREE.PCFSoftShadowMap`: Less performant but even softer edges
- `THREE.VSMShadowMap`: Less performant, more constraints, can have unexpected results

### Using spot light (`SpotLight`) and its `fov`

If you are casting shadow using a spot light (`SpotLight`) you can also modify the `fov` property of the camera that is accessible at:

```js
spotLight.shadow.camera.fov = 30;
```

### Using point light (`PointLight`)

When using point lights in your scene to cast shadows, ThreeJS uses a perspective camera. A point light throws light on all directions. So to be able to render the shadows cast by such light type, ThreeJS will try to render 6 shadow maps in each of the 6 directions around the light source. That is a lot! For each point light you will have 6 shadow map renders before your main scene render and that is before each render of your scene.

> The last shadow map that ThreeJS generates is by looking at the bottom of the light source (looking downward), and that may be the reason why using the `CameraHelper` to create a shadow camera helper for a point light displays the helper looking down.

To optimize shadows cast by this type of light you can tweak `mapSize`, `near` and `far` properties:

```js
const pointLight = new THREE.PointLight(0xffffff, 0.3, 10, Math.PI * 0.3);
pointLight.castShadow = true;

pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.mapSize.near = 0.1;
pointLight.shadow.mapSize.far = 5;

pointLight.position.set(-1, 1, 0);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);

scene.add(pointLight);
scene.add(pointLightCameraHelper);
```

### Baking shadows

A good alternative to ThreeJS shadows is baked shadows. That is to integrate shadows in textures that we apply on materials; similar to baking lights mentioned previously.

To use a baked shadow, you first need to create the texture file with the required shadow qualities. Then to use this baked shadow texture, you first need to disable ThreeJS shadows (if you have any) and then load the texture using the `TextureLoader` class:

```js
const textureLoader = new THREE.TextureLoader();
const bakedShadowTexture = textureLoader.load("/textures/bakedShadow.jpg");
```

Then you can use this loaded shadow texture with a `MeshBasicMaterial` (instead of `MeshStandardMaterial`) for the plane on which the shadow texture is going to be displayed:

```js
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({
    map: bakedShadowTexture,
  }),
);
```

The problem with this type of shadow is that if you move your object that is causing the shadow, the shadow will not move with the object, since it is baked into the texture. However, there is a fix for this.

### Alternative to baking shadows

You can also use a simpler baked shadow and move it so it stays under the object causing the shadow. The texture used for this type of baked shadow is a much smaller texture representing an alpha that is supposed to be positioned eight right under the object that casts shadow.

The small texture file is going to be used as a plane right below the object and slightly above the main plane.

```js
const textureLoader = new THREE.TextureLoader();
const simpleShadowTexture = textureLoader.load("/textures/simpleShadow.jpg");

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadowTexture,
  }),
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;
scene.add(sphereShadow);
```

> Notice that the texture plane should not be positioned exactly at the same `y` as the original scene plain since this would cause **z-fighting**. Place it slightly above the original scene plane with a `0.01` difference.

Let's now implement the movement of the shadow texture plane with the movement of the object itself:

```js
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Move the sphere - moving in a circle while bouncing
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  // Move the shadow
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3;
  // when the object moves up, we want the shadow to decrease in intensity and increase when the object moves down close to plane

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

> Finding the right solution to handle shadows is up to you. It depends on the project, the preformances and the techniques you know. You can also combine your techniques.

# Particles

With particles you can create stars, smoke, rain, dust, fire, etc. You can have thousands of them with a reasonable frame rate.

Each particle in ThreeJS is composed of a plane (two triangles) always facing the camera.

Creating particles is like creating a `Mesh`. You are going to need:

- A geometry (`BufferGeometry`)
- A material (`PointsMaterial`)
- A `Points` instance (instead of `Mesh`)

So first go on and create a geometry for your particles:

```js
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
```

Then to create a particle material:

```js
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true,
});
```

The `sizeAttenuation` parameter determines the appearance size of the particle in relation to its distance from the camera; the less the distance, the bigger the particle appears in the view.

Then to create the particles:

```js
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);
```

You will now be able to see a series of particles around a sphere geometry. But you can also implement a custom geometry.

## Custom geometry

To make the particles appear on a custom geometry you need to use `BufferGeometry` instead of `SphereBufferGeometry`, and add a `position` attribute as we did in the Geometries lesson.

```js
const particlesGeometry = new THREE.BufferGeometry();
```

To give the `BufferGeometry` a specific shape, you need to give it the position of its vertices. Let's say we now want the geometry to have `500` vertices. You should set the positions of these vertices for the `BufferGeometry` by using a JavaScript `Float32Array` array:

```js
const count = 500;
const positions = new Float32Array(count * 3);
```

`count` is multiplied by `3` because each vertex needs 3 pieces of data: `x`, `y`, `z`. You then need to set the `position` attribute of the `particlesGeometry` to these vertices positions using ThreeJS `BufferAttribute`:

```js
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3),
);
```

With this setup, the particles start from the center of the scene and go further, but we actually want them to spread all around the scene. To do this, you should update the random position generation:

```js
const particlesGeometry = new THREE.BufferGeometry();

const count = 500;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  // updated random position generation
  positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3),
);
```

## Textures

You can also use the `map` property to put textures on the particles.

```js
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/11.png");

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  color: "#ff88cc",
});
particlesMaterial.map = particleTexture;
```

> Visit `https://www.kenney.nl/assets/particle-pack` for particle textures. Also visit their X account named "Kenny".

Doing this, you are going to notice that each particle has a surrounding edge that covers other particles randomly, irrelevant of their distance from the camera. This is because the particles are drawn in the same order as they are created, and WebGL does not really know which one is in front of the other. There are several ways of fixing this:

```js
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
```

This solves the problem to some extent, but not completely.

### Alpha test (`alphaTest`)

The `alphaTest` is a value between `0` and `1` that enables WebGL to know when not to render the pixel according to that pixel's transparency. By default, the value is `0` meaning that the pixel will be rendered anyway. Use `0.001`.

```js
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.alphaTest = 0.001;
```

This solves a major part of the problem, but still, at the very edges of the texture shape, you can still see some bad renders. At this level, if the particles are going to rotate around the scene constantly and the user is not capable of stopping it, this level of fix is fine. But if you need to fix it better, follow the instructions.

### Depth test (`depthTest`)

When drawing, the WebGL tests if what is being drawn is closer than what's already drawn. That is called depth testing and can be deactivated with `depthTest`:

```js
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.depthTest = false;
```

This seems to have fixed the problem completely, but you should not use this method since it creates bugs if you have other objects in your scene or if you have particles with different colors. For instance, if you place a cube at the center of you particles, you can see the particles behind the cube through the cube. So you need a better fix.

### Depth write

The depth of what is being drawn is stored in what we call a **depth buffer**. Instead of not testing if the particle is closer than what is in this depth buffer, we can tell WebGL not to write particles in that depth buffer with `depthTest`.

```js
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.depthWrite = false;
```

This solution fixes the cube bug and the particles edges issue. This solution, too, has some bugs in certain situations, but you now have multiple ways to fix this problem and you can choose between them according to your project.

## Blending

The WebGL currently draws pixels one on top of the other. With the `blending` property, we can tell the WebGL to add the color of the pixel to the color of the pixel already drawn. To do this, you can change the `blending` property to `THREE.AdditiveBlending` class:

```js
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
```

> Notice that the `AdditiveBlending` can impact your project performance.

## Random colors

If you want to apply random colors to each particle in your scene, you can use the `setAttribute` method to add a `color` attribute just like you did it for the positions. Again, since each color is going to be composed of 3 values (RGB), you are going to use `Float32Array` and pass it to `BufferAttribute`:

```js
const count = 20000;
const positions = new Float32Array(count * 3);
// for colors
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  // for colors
  colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3),
);

// for colors
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  // notice we got rid of the color property here, since it can affect the random colors applied randomly to each particle
});

particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;

particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;

// for colors
particlesMaterial.vertexColors = true;
```

## Animation

The `Points` class of ThreeJS inherits from the `Object3d` class, so you can use it just like any other object to animate it. You can do this:

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update particles
  particles.rotation.y = elapsedTime * 0.2;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
```

This will animate all particles together as a group. We want to animate each particle separately. Remember that the particles positions are stored in the `positions` attribute of the `particlesGeometry`. So you can update each vertex separately in `particlesGeometry.attributes.position.array` since this array contains the particles positions. Again, remember that you would have to go 3 values in each iteration.

> NOTE: This technique imposes too much pressure on the machine and it is not recommended.

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update particles
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Select the x position of each vertex
    const x = particlesGeometry.attributes.position.array[i3 + 0];

    // Offset the animation of y position property of each vertex relative to its x position property
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x,
    );
  }

  // ThreeJS needs to be told each time the position atrribute is updated
  particlesGeometry.attributes.position.needsUpdate = true;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
```

The better solution is using a **custom shader**.

## Performance considerations

When you want to create a scene where you need to re-render an object after each GUI tweak, it is a good practice to remove the old object and then render then new object. Refer to practice `18` folder and review this:

```js
if (points !== null) {
  geometry.dispose();
  material.dispose();
  // you cannot dispose of a mesh, you can just remove them from a scene:
  scene.remove(points);
}
```

# Scroll-based animation

In many cases, you would like the 3D interactive experience to be part of a classic website. Therefore, the 3D rendering can be in the background, yet you would like it to integrate well with the HTML content.

In such cases you should:

- Learn how to use Three.js as a background of a classic HTML page
- Make the camera translate to follow the scroll
- Know some tricks to make the whole experience more immersive
- Add a parallax animation based on the cursor position
- Trigger some animations when arriving at the corresponding sections

> In such projects, you would usually not want to use `OrbitControls` as you have used up until this point and instead, you would let the HTML document to scroll.

## White background when page is over-scrolled

In MacOS laptops or iOS phones, you might notice that when the page is scrolled to the end, if the user tries to scroll more, a white background would appear from underneath the canvas background, that is because normally we don't apply a background color to the HTML document, but only to the canvas itself.

You might be able to find you simple solution, but a better solution is to set the `clearColor` of the webgl renderer to transparent, and then set a background color on the HTML document itself.

So the first step would be to set `alpha` on the renderer to `true`:

```js
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
```

This would set the webgl renderer background to become completely transparent, since the `clearAlpha` property of the renderer is, by default, set to `0`.

Now you can go to the CSS file and set the background color for the `html` document:

```css
html {
  background: #1e1a20;
}
```

You now have a seamless background throughout the whole page, no matter how far user scrolls over it.

## Positioning your objects

In ThreeJS, the field of view is vertical. If you put one object on the top, one on the bottom and then resize the window, objects will stay at the top and at the bottom. This is a good thing since you won't have to handle medial queries for the 3D scene. Wherever you position your objects, they will stay where they were set however wide or tight the screen becomes vertically.

Here is an example:

```js
const objectsDistance = 4;

const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
mesh1.position.y = -objectsDistance * 0;

const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
mesh2.position.y = -objectsDistance * 1;

const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material,
);
mesh3.position.y = -objectsDistance * 2;

scene.add(mesh1, mesh2, mesh3);

// Store the meshes in an array since you would probably want to use them in the `tick` function to animate them
const sectionMeshes = [mesh1, mesh2, mesh3];
```

## Moveing the camera with scroll

You first need to retrieve the scroll value on the window object and also update the variable that you store it into, whenever the user scrolls:

```js
let scrollY = window.scrollY;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});
```

Now as you scroll further on the page, the value of `scrollY` becomes larger. So inside the `tick` function, you can now update the camera's `y` position as:

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animate camera
  camera.position.y = -scrollY;

  // Animate meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
```

However, setting the `y` position of the camera to `-scrollY` will make the camera movement too sensitive when the scroll is happening. You need to reduce the camera movement sensitivity. For this, you should consider that in most cases, you would probably want each of your sections to be as high as the viewport itself. This means that when you scroll the distance of 1 viewport height, the camera should reach the next object. So this would be the calculation to run:

```js
camera.position.y = (-scrollY / sizes.height) * objectsDistance;
```

## Implementing parallax effect

Parallax is the action of seeing one object through different observation points. This is done naturally by our eyes and it is how we feel the depth of things.

To simulate this, you can make the camera move horizontally and vertically according to the mouse movements.

```js
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  // You need to adapt the clientX and clientY values mathematically to create the same experience on every device, so you should get a value between 0 and 1 no matter how much the width of the screen will be. Also, since you want the camera to be able to move up/down and left/right mouse movement values should translate the clientX and clientY values to remain between -0.5 and 0.5.
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});
```

You can then continue and position the camera based on the mouse movement in the `tick` function:

```js
onst tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = cursor.x;
  const parallaxY = cursor.y;

  // but this will disable the previous scroll-based camera movement
  camera.position.x = parallaxX;
  camera.position.y = parallaxY;

  // Animate meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
```

Notice that this will neutralize the previous scroll-based camera movement. To fix this, you need to put the camera in a `Group` with your objects, and apply the parallax effect on the group, not on the camera itself.

```js
// Group
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
```

Then add the group to the scene instead of the camera itself:

```js
// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 6;
cameraGroup.add(camera);
```

Then in the `tick` function, you move the camera group for the parallax effect, and move the camera itself with the scroll:

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = cursor.x;
  const parallaxY = -cursor.y;

  cameraGroup.position.x = parallaxX;
  cameraGroup.position.y = parallaxY;

  // Animate meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
```

## Implement easing/smoothing

It is also a good thing to add some easing to the movement animations. You need to add some easing (also called **smoothing** or **lerping**) and you are going to use a well-known formula.

The calculation is basically this: On each frame, instead of moving the camera right to the target, you will move it a 10th closer to the target, then on the next frame, another 10th closer, and so on.

This would be one solution:

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = cursor.x;
  const parallaxY = -cursor.y;

  cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.1;
  cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.1;

  // Animate meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
```

But the problem with this approach is that on a high-frequency screen, the `tick` function will be called more often and the camera will move faster toward the target. It is a lot better to have the same result and experience across all devices as much as possible.

To be able to handle this, you need to know how much time there is between the current frame and the previous frame.

```js
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = cursor.x;
  const parallaxY = -cursor.y;

  // then use the deltaTime in the camera position calculation and increase the intensity from 0.01 to 5 to make the position value larger so it can be noticeable, because the deltaTime is in seconds, and the value will be very small (around 0.016) for most common screens running at 60fps
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // Animate meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
```

## Triggered animations

It would be a nice thing to make your objects do some special animation when the user arrives at a specific section by scrolling.

First, you need to know when the user reaches a specific section. There are plenty of ways of doing that and you could even use a library for it, but in this case, you can use the `scrollY` value and do some math to find the current section.

Start by declaring a variable as:

```js
let scrollY = window.scrollY;
let currentSection = 0;
```

Then inside the `scroll` event handler, calculate the current section by dividing the `scrollY` value by `sizes.height`, since in this specific case and project, each section has the viewport height, just like the webgl canvas:

```js
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const newSection = Math.round(scrollY / sizes.height);
});
```

You can also compare and check if the `newSection` is different from `currentSection`:

```js
let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != currentSection) {
    currentSection = newSection;
  }
});
```

You can now use `gsap` to implement your special animation on each object related to each section.

```js
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != currentSection) {
    currentSection = newSection;

    gsap.to(sectionMeshes[currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: "+=6",
      y: "+=3",
    });
  }
});
```

But this won't work since you are updating the mesh rotations in the `tick` function on each frame:

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;

  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // This part is neutralizing gsap animation:
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
```

To fix it, in the `tick` function, instead of setting a very specific rotation based on the `elapsedTime`, you should add the `deltaTime` to the current rotation. So you need to change that part in the `tick` function to this:

```js
for (const mesh of sectionMeshes) {
  mesh.rotation.x += deltaTime * 0.1;
  mesh.rotation.y += deltaTime * 0.12;
}
```

# React Three Fiber (R3F)

R3F is a React renderer. With R3F, you write code in JSX and the data gets converted to a ThreeJS scene. It also takes care of a lot of default settings for us and makes good use of React tools.

> To see some examples of things that can be done with R3F, check https://docs.pmnd.rs/react-three-fiber/getting-started/examples

## Creating a simple mesh

You can use this syntax to create a mesh:

```jsx
<mesh>
  <boxGeometry />
  <meshBasicMaterial color="red" />
</mesh>
```

This way:

- The geometry and the material are automatically associated with the mesh
- The syntax is shorter and easier to understand
- Default parameteres are automatically set for us

## Position and rotation

To implement positions and rotations you can use:

```jsx
<mesh position={[1, 2, 3]} rotation-x={0.5}>
  <boxGeometry />
  <meshBasicMaterial color="red" />
</mesh>
```

Which:

- Is shorter
- The `set` function is called automatically and we can still change individual properties like the `rotation.x`

## Nested objects and grouping

To include multiple objects in a group, you can use:

```jsx
<group>
  <mesh>
    <boxGeometry />
    <meshBasicMaterial color="red" />
  </mesh>

  <mesh>
    <sphereGeometry />
    <meshBasicMaterial color="orange" />
  </mesh>
</group>
```

This is where the tag-based structure of JSX gets really handy.

> R3F implements all ThreeJS classes automatically. If ThreeJS is updated and adds new classes, R3F won't break, and it will continue to support the new classes.

> In R3F, automatically generated primitive component names are written in camelCase. But more specific components like the ones that we create ourselves or the ones that come from Drei will be written in PascalCase.

## Creating the first R3F app

In a React app, inside the `index.jsx` file which would be the project's entry file, do this:

```jsx
import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas>
      <mesh>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh>
    </Canvas>
  </>,
);
```

You can notice that, by default, the canvas does not fill the whole viewport. There are some spaces at the edges. You can make the `#root` element fill the viewport and do the same with the `html` and `body` tags.

Notice that:

- We didn't have to create a `Scene`
- We didn't have to create the `WebGLRenderer`
- The scene is being rendered on each frame
- The default settings are making it look appealing (antialias, encoding, etc.)
- We didn't have to place a `PerspectiveCamera`
- We didn't have to pull it back from the center
- When you resize the viewport everything that needs resizing is handled automatically
- We didn't have to provide any specific value for the `<torusKnotGeometry />`
- We didn't have to import the `Mesh`, nor the `SphereGeometry`, nor the `MeshNormalMaterial`
- We didn't even have to reload the page (most of the time)

> There some special hooks provided by the R3F which can only be used in components created inside the `<Canvas>`.

You can create a R3F component and import it in your app as:

```jsx
// Experience.jsx
export default function Experience() {
  return (
    <>
      <mesh>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}
```

```jsx
// index.jsx
import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas>
    <Experience />
  </Canvas>,
);
```

### Creating and handling meshes

When creating a geometry in R3F, you can still use the arguments you would normally use with vanilla JS to create a new geometry. For instance, to create a sphere geometry with the corresponding arguments you can:

```js
export default function Experience() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
}
```

This is because you would normally create a sphere geometry with:

```js
const geometry = new THREE.SphereGeometery(1.5, 32, 32);
```

> In the case of a geometry, be careful not to update the valuse too much or animate them. Each change will result in the whole geometry being rebuilt.

Creating a material with arguments is a bit different since it only requires one argument. You still need to pass in an array, but the array should only have 1 element and that element would be an object:

```jsx
<meshBasicMaterial args={[{ color: "red", wireframe: true }]} />
```

However, you can also pass the argument object properties directly as props:

```jsx
<meshBasicMaterial color="mediumpurple" wireframe={true} />
```

Just like you changed the `color` or `wireframe` props on the material, you can play with the `position`, `rotation`, and `scale` on the `<mesh>` element.

```jsx
export default function Experience() {
  return (
    <>
      <mesh scale={[3, 2, 1]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh>
    </>
  );
}
```

Or if you want to pass the same value for the 3 arguments of `scale` you can simply do:

```jsx
export default function Experience() {
  return (
    <>
      <mesh scale={1.5}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh>
    </>
  );
}
```

You can also target specific axes:

```jsx
export default function Experience() {
  return (
    <>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>
      <mesh rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
        <boxGeometry scale={1.5} />
        <meshBasicMaterial color="mediumpurple" />
      </mesh>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
```

### Animate things

The scene that you have created up until this point, is already being drawn on each frame, but nothing is moving.

You can rotate the cube using the `useFrame` hook prvided by R3F. Notice that to be able to refer to the target mesh, you need to use React's `useRef` hook.

```jsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();

  useFrame(() => {
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>
      <mesh
        ref={cubeRef}
        rotation-y={Math.PI * 0.25}
        position-x={2}
        scale={1.5}
      >
        <boxGeometry scale={1.5} />
        <meshBasicMaterial color="mediumpurple" />
      </mesh>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
```

The same problem that we have discussed earlier should also be handled here. With this animation setup:

```js
useFrame(() => {
  cubeRef.current.rotation.y += 0.01;
});
```

The animation speed will be different in devices with different frame rates. To handle this, you need to know how much time passes in between frames. Good news is that the callback inside `useFrame` has access to 2 parameters: `state` and `delta`.

```js
useFrame((state, delta) => {
  cubeRef.current.rotation.y += delta;
});
```

### Adding the `OrbitControls`

There are actually 2 ways; the hard way and the easy way.

#### The hard way

Since `OrbitControls` is not part of the default ThreeJS classes, we cannot declare it like we declare a `<mesh>` element.

So we are going to first import it and the convert it into a declarative version.

```jsx
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
```

Then import `extend` from `@react-three/fiber`, since this will automaticaly convert a ThreeJS class into a declarative version and make it available in the JSX:

```jsx
import { extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls });

// Component function
```

Now to add the `<orbitControls>` element to the JSX, you need to provide some arguments, since the class originally requires some arguments upon initialization. The arguments are first a camera and then a DOM element.

Where can these arguments be found? In the `state` variable available inside the `useFrame` hook, there is a `camera` and a `gl` property which is exactly what we need for the `<orbitControls>` element. But we don't want to get these arguments on each frame. We only need to acquire them once. For this purpose, you can use `useThree` hook instead of `useFrame`. The `useThree` returns exactly the same object as the `state` variable itself.

```js
import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls });

export default function Experience() {
  const sphereBoxGroup = useRef();
  console.log(OrbitControls);

  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    sphereBoxGroup.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <group ref={sphereBoxGroup}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
        <mesh rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
          <boxGeometry scale={1.5} />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
```

#### The easy way

### Adding lights
