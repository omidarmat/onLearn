# First animation ever (a tween)

To animate an HTML element with a class of `box`:

```js
gsap.to(".box", { x: 200 });
```

## Methods

This is called a tween. There are 4 types of tweens:

1. `gsap.to()`: The most common type; starts at the element's current state and animate "to" the values defined in the tween.
2. `gsap.from()`: Like a backwards `.to()` where animates "from" the values defined in the tween and ends at the element's current state.
3. `gsap.fromTo()`: You get to define both starting and ending values.
4. `gsap.set()`: Immediately sets properties (no animation).

## Targets

To select the element on which the animation is going to be applied, you can use:

```js
// use a class or ID
gsap.to(".box", { x: 200 });

// a complex CSS selector
gsap.to("section > .box", { x: 200 });

// a variable
let box = document.querySelector(".box");
gsap.to(box, { x: 200 });

// or even an Array of elements
let square = document.querySelector(".square");
let circle = document.querySelector(".circle");

gsap.to([square, circle], { x: 200 });
```

## Variables

The vars object contains all the information about the animation. These can be arbitrary properties you want to animate, or special properties that influence the behavior of the animation - like `duration`, `onComplete` or `repeat`.

```js
gsap.to(target, {
  // this is the vars object
  // it contains properties to animate
  x: 200,
  rotation: 360,
  // and special properties
  duration: 2,
});
```

> GSAP can animate almost anything, there is no pre-determined list. This includes CSS properties, custom object properties, even CSS variables and complex strings! The most commonly animated properties are transforms and opacity.

By default GSAP will use px and degrees for transforms but you can use other units like, vw, radians or even do your own JS calculations or relative values!

```js
x: 200, // use default of px
x: "+=200" // relative values
x: '40vw', // or pass in a string with a different unit for GSAP to parse
x: () => window.innerWidth / 2, // you can even use functional values to do a calculation!

rotation: 360 // use default of degrees
rotation: "1.25rad" // use radians
```

### What else to animate?

#### CSS properties

Transforms, colors, padding, border radius, GSAP can animate it all! Just remember to camelCase the properties - e.g. `background-color` becomes `backgroundColor`.

> Although GSAP can animate almost every CSS property, we recommend sticking to transforms and opacity when possible. Properties like filter and boxShadow are CPU-intensive for browsers to render. Animate with care and make sure to test on low-end devices.

#### SVG attributes

Just like HTML elements, SVG elements can be animated with transform shorthands. Additionally you can animate SVG attributes like `width`, `height`, `fill`, `stroke`, `cx`, `opacity` and even the SVG `viewBox` itself using an `attr` object. Here is an example:

```html
<svg id="svg" viewBox="0 0 100 100">
  <rect
    class="svgBox"
    fill="#28a92b"
    x="0"
    y="35"
    width="30"
    height="30"
    rx="2"
  />
</svg>
```

```css
svg {
  height: 90vh;
  max-height: 300px;
  border: solid 2px white;
  overflow: visible;
}
```

```js
gsap.to(".svgBox", {
  duration: 2,
  x: 100, // use transform shorthand (this is now using SVG units not px, the SVG viewBox is 100 units wide)
  xPercent: -100,
  // or target SVG attributes
  attr: {
    fill: "#9d95ff",
    rx: 50,
  },
});
```

#### Any numeric value, color, or complex string containing numbers

When we say anything we mean anything. GSAP doesn't even need DOM elements in order to animate properties. You can target literally any property of any object, even arbitrary ones you create like this:

```js
//create an object
let obj = { myNum: 10, myColor: "red" };

gsap.to(obj, {
  myNum: 200,
  myColor: "blue",
  onUpdate: () => console.log(obj.myNum, obj.myColor),
});
```

### Special properties

To adjust how a tween behaves we can pass in some special properties:

- `duration`: Duration of animation (seconds) Default: 0.5
- `delay`: Amount of delay before the animation should begin (seconds)
- `repeat`: How many times the animation should repeat.
- `yoyo`: If true, every other repeat the tween will run in the opposite direction. (like a yoyo) Default: false
- `stagger`: Time (in seconds) between the start of each target's animation (if multiple targets are provided)
- `ease`: Controls the rate of change during the animation, like the motion's "personality" or feel. Default: "power1.out"
- `onComplete`: A function that runs when the animation completes

#### Repeats and alternating repeats

repeat does exactly what you might think - it allows you to play an animation more than once. repeat is often paired with yoyo in order to reverse the direction each cycle.

```js
gsap.to(".box", {
  rotation: 360,
  x: "100vw",
  xPercent: -100,
  // special properties
  duration: 2, // how long the animation lasts
  repeat: 2, // the number of repeats - this will play 3 times
  yoyo: true, // this will alternate back and forth on each repeat. Like a yoyo
});
```

> Do you want your animation to repeat infinitely? No problem! Use `repeat: -1`

#### Delays

You can `delay` the start of an animation by a certain number of seconds. You can also use `repeatDelay` to add a delay to the start of any repeat iterations.

#### Easing

Easing is possibly the most important part of motion design. A well-chosen ease will add personality and breathe life into your animation.

```js
gsap.to(".green", { rotation: 360, duration: 2, ease: "none" });
gsap.to(".purple", { rotation: 360, duration: 2, ease: "bounce.out" });
```

#### Staggers

Staggers are totally configurable and SUPER powerful. If a tween has multiple targets, you can easily add some delay between the start of each animation:

**Simple configuration:**

```js
gsap.to(".box", {
  y: 100,
  stagger: 0.1, // 0.1 seconds between when each ".box" element starts animating
});
```

A value of `stagger: 0.1` would cause there to be 0.1 second between the start times of each tween. A negative value would do the same but backwards so that the last element begins first.

You can even stagger items that are laid out in a grid just by telling GSAP how many columns and rows your grid has!

```js
gsap.to(".box", {
  duration: 1,
  scale: 0.1,
  y: 40,
  ease: "power1.inOut",
  stagger: {
    grid: [7, 15],
    from: "center",
    amount: 1.5,
  },
});
```

**Advanced configuration:**

All tweens recognize a stagger property which can be a number, an object, or a function:

```js
gsap.to(".box", {
  y: 100,
  stagger: {
    // wrap advanced options in an object
    each: 0.1,
    from: "center",
    grid: "auto",
    ease: "power2.inOut",
    repeat: -1, // Repeats immediately, not waiting for the other staggered animations to finish
  },
});
```

To get more control, wrap things in a configuration object which can have any of the following properties in addition to most of the special properties that tweens have:

- `amount`: [Number]: The total amount of time (in seconds) that gets split among all the staggers. So if amount is 1 and there are 100 elements that stagger linearly, there would be 0.01 seconds between each sub-tween's start time. If you prefer to specify a certain amount of time between each tween, use the each property instead.
- `each`: [Number]: The amount of time (in seconds) between each sub-tween's start time. So if each is 1 (regardless of how many elements there are), there would be 1 second between each sub-tween's start time. If you prefer to specify a total amount of time to split up among the staggers, use the amount property instead.
- `from`: [String | Integer | Array]: The position in the Array from which the stagger will emanate. To begin with a particular element, for example, use the number representing that element's index in the target Array. So from:4 begins staggering at the 5th element in the Array (because Arrays use zero-based indexes). The animation for each element will begin based on the element's proximity to the "from" value in the Array (the closer it is, the sooner it'll begin). You can also use the following string values: "start", "center", "edges", "random", or "end" ("random" was added in version 3.1.0). If you have a grid defined, you can specify decimal values indicating the progress on each axis, like [0.5,0.5] would be the center, [1,0] would be the top right corner, etc. Default: 0.
- `grid`: [Array | "auto"]: If the elements are being displayed in a grid visually, indicate how many rows and columns there are (like grid:[9,15]) so that GSAP can calculate proximities accordingly. Or use grid:"auto" to have GSAP automatically calculate the rows and columns using element.getBoundingClientRect() (great for responsive layouts). Grids are assumed to flow from top left to bottom right layout-wise (like text that wraps at the right edge). Or if your elements aren't arranged in a uniform grid, check out the distributeByPosition() helper function we created.
- `axis`: [string]: If you define a grid, staggers are based on each element's total distance to the "from" value on both the x and y axis, but you can focus on just one axis if you prefer ("x" or "y"). Use the demo above to see the effect (it makes more sense when you see it visually).
- `ease`: [String | Function]: The ease that distributes the start times of the animations. So "power2" would start out with bigger gaps and then get more tightly clustered toward the end. Default: "none".

**Function**

Only use this if you need to run custom logic for distributing the staggers. The function gets called once for each target/element in the Array and should return the total delay from the starting position (not the amount of delay from the previous tween's start time). The function receives the following parameters:

1. index [Integer] - The index value from the list.
2. target [Object] - The target in the list at that index value.
3. list [Array | NodeList] - The targets array (or NodeList).

```js
gsap.to(".box", {
  y: 100,
  stagger: function (index, target, list) {
    // your custom logic here. Return the delay from the start (not between each)
    return index * 0.1;
  },
});
```

# Sequencing animations - Timelines

what if we need more control over the order and timing of those animations? Timelines are the key to creating easily adjustable, resilient sequences of animations. When you add tweens to a timeline, by default they'll play one-after-another in the order they were added.

```js
// create a timeline
let tl = gsap.timeline();

// add the tweens to the timeline - Note we're using tl.to not gsap.to
tl.to(".green", { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1 });
tl.to(".orange", { x: 600, duration: 1 });
```

But what if we want to add a gap or delay in between some of the tweens? One option would be to add a delay to a tween to offset it 's start time. But this isn't hugely flexible. What if we want tweens to overlap or start at the same time?

```js
let tl = gsap.timeline();

tl.to(".green", { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1, delay: 1 });
tl.to(".orange", { x: 600, duration: 1 });
```

The answer lies in the hands of Position parameter

## Position parameter

This handy little parameter is the secret to building gorgeous sequences with precise timing. There are a variety of position parameters that we can use to position tweens pretty much anywhere! Take a look at this timeline...

```js
let tl = gsap.timeline();

// start at exactly 1 second into the timeline (absolute)
tl.to(".green", { x: 600, duration: 2 }, 1);

// insert at the start of the previous animation
tl.to(".purple", { x: 600, duration: 1 }, "<");

// insert 1 second after the end of the timeline (a gap)
tl.to(".orange", { x: 600, duration: 1 }, "+=1");
```

The most commonly used position parameters are the following:

1. Absolute time (in seconds) measured from the start of the timeline.

```js
// insert exactly 3 seconds from the start of the timeline
tl.to(".class", { x: 100 }, 3);
```

2. A Gap

```js
//  1 second after the end of the timeline (usually the previously inserted animation)
tl.to(".class", { x: 100 }, "+=1");
// beyond the end of the timeline by 50% of the inserting animation's total duration
tl.to(".class", { x: 100 }, "+=50%");
```

3. An Overlap

```js
//  1 second before the end of the timeline (this is usually the previously inserted animation)
tl.to(".class", { x: 100 }, "-=1");

//  overlap with the end of the timeline by 25% of the inserting animation's total duration
tl.to(".class", { x: 100 }, "-=25%");
```

## Special properties

Timelines share most of the same special properties that tweens have like `repeat` and `delay` which allow you to control the entire sequence of animations as a whole!

```js
let tl = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

tl.to(".green", { rotation: 360 });
tl.to(".purple", { rotation: 360 });
tl.to(".orange", { rotation: 360 });
```

## Timeline defaults

If you find yourself typing out a property over and over again, it might be time for `defaults`. Any property added to the defaults object in a timeline will be inherited by all the children that are created with the convenience methods like `to()`, `from()`, and `fromTo()`. This is a great way to keep your code concise.

```js
var tl = gsap.timeline({ defaults: { duration: 1 } });

//no more repetition of duration: 1!
tl.to(".green", { x: 200 })
  .to(".purple", { x: 200, scale: 0.2 })
  .to(".orange", { x: 200, scale: 2, y: 20 });
```

# Control and callbacks

## Control methods

All the animations we've looked at so far play on page load or after a `delay`. But what if you want a little more control over your animation? A common use case is to play an animation on a certain interaction like a button click or hover.

Control methods can be used on both tweens and timelines and allow you to **play**, **pause**, **reverse** or even **speed up** your animations!

```js
// store the tween or timeline in a variable
let tween = gsap.to("#logo", { duration: 1, x: 100 });

//pause
tween.pause();

//resume (honors direction - reversed or not)
tween.resume();

//reverse (always goes back towards the beginning)
tween.reverse();

//jump to exactly 0.5 seconds into the tween
tween.seek(0.5);

//jump to exacty 1/4th into the tween 's progress:
tween.progress(0.25);

//make the tween go half-speed
tween.timeScale(0.5);

//make the tween go double-speed
tween.timeScale(2);

//immediately kill the tween and make it eligible for garbage collection
tween.kill();

// You can even chain control methods
// Play the timeline at double speed - in reverse.
tween.timeScale(2).reverse();
```

## Callbacks

If you need to know when an animation starts, or maybe run some JS when an animation comes to an end, you can use Callbacks. All tweens and timelines have these callbacks:

- `onComplete`: invoked when the animation has completed.
- `onStart`: invoked when the animation begins
- `onUpdate`: invoked every time the animation updates (on every frame while the animation is active).
- `onRepeat`: invoked each time the animation repeats.
- `onReverseComplete`: invoked when the animation has reached its beginning again when reversed.

```js
gsap.to(".class", {
  duration: 1,
  x: 100,
  // arrow functions are handy for concise callbacks
  onComplete: () => console.log("the tween is complete"),
});

// If your function doesn't fit neatly on one line, no worries.
// you can write a regular function and reference it
gsap.timeline({ onComplete: tlComplete }); // <- no () after the reference!

function tlComplete() {
  console.log("the tl is complete");
  // more code
}
```

### Usecase (interaction events that trigger animations)

Inside of event listeners for user interaction events, we can use control methods to have fine control over our animation’s play state.

In the example below, we are creating a timeline for each element (so that it doesn’t fire the same animation on all instances), attaching a reference for that timeline to the element itself, and then playing the relevant timeline when the element is hovered, reversing it when the mouse leaves. We're also adjusting the speed so it's faster on reverse and slower on entry. This is a good UX pattern.

```js
gsap.set(".information", { yPercent: 100 });

gsap.utils.toArray(".container").forEach((container) => {
  let info = container.querySelector(".information"),
    silhouette = container.querySelector(".silhouette .cover"),
    tl = gsap.timeline({ paused: true });

  tl.to(info, { yPercent: 0 }).to(silhouette, { opacity: 0 }, 0);

  container.addEventListener("mouseenter", () => tl.timeScale(1).play());
  container.addEventListener("mouseleave", () => tl.timeScale(3).reverse());
});
```

# Plugins

A plugin adds extra capabilities to GSAP's core. This allows the GSAP core to remain relatively small and lets you add features only when you need them. Here is a list of GSAP plugins categories:

1. Scroll Plugins:
   - ScrollTrigger
   - ScrollTo
   - ScrollSmoother
2. Text Plugins:
   - SplitText
   - ScrambleText
   - TextReplacement
3. SVG Plugins:
   - DrawSVG
   - MorphSVG
   - MotionPath
   - MotionPathHelper
4. UI Plugins:
   - Flip
   - Draggable
   - Inertia
   - Observer
5. Other Plugins:
   - Physics2D
   - PhysicsProps
   - GSDevTools
   - Easel
   - Pixi
6. Eases:
   - CustomEase
   - EasePack
   - CustomWiggle
   - CustomBounce
7. React:
   - useGSAP

## Registring plugins

Registering a plugin with the GSAP core ensures that the two work seamlessly together and also prevents tree shaking issues in build tools/bundlers. You only need to register a plugin once before using it, like:

```js
//list as many as you'd like
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, MorphSVGPlugin);
```

# ScrollTrigger

## Tips

### Nesting ScrollTriggers inside multiple timeline tweens

A very common mistake is applying ScrollTrigger to multiple tweens that are nested inside a timeline. Logic-wise, that can't work. When you nest an animation in a timeline, that means the playhead of the parent timeline is what controls the playhead of the child animations (they all must be synchronized otherwise it wouldn't make any sense). When you add a ScrollTrigger with scrub, you're basically saying "I want the playhead of this animation to be controlled by the scrollbar position"...you can't have both. For example, what if the parent timeline is playing forward but the user also is scrolling backwards? See the problem? It can't go forward and backward at the same time, and you wouldn't want the playhead to get out of sync with the parent timeline's. Or what if the parent timeline is paused but the user is scrolling?

So definitely avoid putting ScrollTriggers on nested animations. Instead, either keep those tweens independent (don't nest them in a timeline) -OR- just apply a single ScrollTrigger to the parent timeline itself to hook the entire animation as a whole to the scroll position.

### Creating `to()` logic issues

If you want to animate the same properties of the same element in multiple ScrollTriggers, it 's common to create logic issues like this:

```js
gsap.to("h1", {
  x: 100,
  scrollTrigger: {
    trigger: "h1",
    start: "top bottom",
    end: "center center",
    scrub: true,
  },
});

gsap.to("h1", {
  x: 200,
  scrollTrigger: {
    trigger: "h1",
    start: "center center",
    end: "bottom top",
    scrub: true,
  },
});
```

You might think that it will animate the x value to 100 and then directly to 200 when the second ScrollTrigger starts. However if you scroll through the page you 'll see that it animates to 100 then jumps back to 0 (the starting x value) then animates to 200. This is because the starting values of ScrollTriggers are cached when the ScrollTrigger is created.

To work around this either use set `immediateRender: false` (like this demo shows) or use `.fromTo()`s for the later tweens (like this demo shows) or set a `ScrollTrigger` on a timeline and put the tweens in that timelines instead (like this demo shows).

### Using one ScrollTrigger or animation for multiple "sections"

If you want to apply the same effect to multiple sections/elements so that they animate when they come into view, for example, it's common for people to try to use a single tween which targets all the elements but that ends up animating them all at once. For example:

```js
const boxes = gsap.utils.toArray(".box");
boxes.forEach((box) => {
  gsap.to(".box", {
    // this will animate ALL boxes
    x: 300,
    scrollTrigger: {
      trigger: ".box", // this will use the first box as the trigger
      scrub: true,
    },
  });
});
```

Since each of the elements would get triggered at a different scroll position, and of course their animations would be distinct, just do a simple loop instead, like this:

```js
const boxes = gsap.utils.toArray(".box");
boxes.forEach((box) => {
  gsap.to(box, {
    x: 300,
    scrollTrigger: {
      trigger: box,
      scrub: true,
    },
  });
});
```
