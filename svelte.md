# Svelte

In Svelte, an application is composed from one or more components. A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together, written into a `.svelte` file.

## Adding data

First, add a script tag to your component and declare a `name` variable:

```html
<script lang="ts">
  let name = "Svelte";
</script>

<h1>Hello world!</h1>
```

Then, we can refer to name in the markup:

```html
<h1>Hello {name}!</h1>
```

Inside the curly braces, we can put any JavaScript we want.

## Dynamic attributes

Just like you can use curly braces to control text, you can use them to control element attributes.

```jsx
<img src={src} alt="some alt text" />
```

We can use curly braces inside attributes:

```jsx
<script>
  let src = "/tutorial/image.gif";
  let name = "omid";
</script>

<img src={src} alt="{name} dances!" />
```

It’s not uncommon to have an attribute where the name and value are the same, like src={src}. Svelte gives us a convenient shorthand for these cases:

```html
<img {src} alt="{name} dances." />
```

## Styling

Just like in HTML, you can add a `<style>` tag to your component:

```html
<p>This is a paragraph.</p>

<style>
  p {
    color: goldenrod;
    font-family: "Comic Sans MS", cursive;
    font-size: 2em;
  }
</style>
```

Importantly, these rules are scoped to the component. You won’t accidentally change the style of `<p>` elements elsewhere in your app.

## Nest components

We can import components from other files and include them in our markup. Importing should be done in `<script>` tags:

```html
<script lang="ts">
  import Nested from "./Nested.svelte";
</script>
```

and include a `<Nested />` component:

```html
<script>
  import Nested from "./Nested.svelte";
</script>

<p>This is a paragraph.</p>
<Nested />

<style>
  p {
    color: goldenrod;
    font-family: "Comic Sans MS", cursive;
    font-size: 2em;
  }
</style>
```

Notice that even though `Nested.svelte` has a `<p>` element, the styles from `App.svelte` don’t leak in.

## HTML tags

Ordinarily, strings are inserted as plain text, meaning that characters like `<` and `>` have no special meaning.

But sometimes you need to render HTML directly into a component. For example, the words you’re reading right now exist in a markdown file that gets included on this page as a blob of HTML.

In Svelte, you do this with the special `{@html ...}` tag:

```html
<script>
  let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>

// this string contains some HTML!!!
```

## State

At the heart of Svelte is a powerful system of **reactivity** for keeping the DOM in sync with your application state — for example, in response to an event.

```html
<script>
  let count = $state(0);

  function increment() {
    count += 1;
  }
</script>

<button onclick="{increment}">clicked {count} times</button>
```

### Deep state

As we saw in the previous example, state reacts to **reassignments**. But it also reacts to **mutations** — we call this deep reactivity:

```html
<script>
  let numbers = $state([1, 2, 3, 4]);

  function addNumber() {
    numbers.push(numbers.length + 1);
  }
</script>

<p>{numbers.join(' + ')} = ...</p>

<button onclick="{addNumber}">Add a number</button>
```

> Deep reactivity is implemented using proxies, and mutations to the proxy do not affect the original object.

### Derived state

Often, you will need to derive state from other state. For this, we have the `$derived` rune:

```html
<script>
  let numbers = $state([1, 2, 3, 4]);
  let total = $derived(numbers.reduce((t, n) => t + n, 0));

  function addNumber() {
    numbers.push(numbers.length + 1);
  }
</script>

<p>{numbers.join(' + ')} = {total}</p>

<button onclick="{addNumber}">Add a number</button>
```

> Notice that any syntax starting with a `$` sign in Svelte is called a rune. There are many runes in Svelte.

### Inspecting state

It’s often useful to be able to track the value of a piece of state as it changes over time.

Inside the `addNumber` function, we’ve added a `console.log` statement. But if you click the button and open the console drawer (using the button to the right of the URL bar), you’ll see a warning, and a message saying the message could not be cloned.

That’s because numbers is a reactive proxy. There are a couple of things we can do. Firstly, we can create a non-reactive snapshot of the state with `$state.snapshot(...)`:

```html
<script>
  let numbers = $state([1, 2, 3, 4]);
  let total = $derived(numbers.reduce((t, n) => t + n, 0));

  function addNumber() {
    numbers.push(numbers.length + 1);
    console.log($state.snapshot(numbers));
  }
</script>
```

Alternatively, we can use the `$inspect` rune to automatically log a snapshot of the state whenever it changes. This code will automatically be stripped out of your production build:

```html
<script>
  function addNumber() {
    numbers.push(numbers.length + 1);
    console.log($state.snapshot(numbers));
  }

  $inspect(numbers);
</script>
```

You can customise how the information is displayed by using `$inspect(...).with(fn)` — for example, you can use `console.trace` to see where the state change originated from:

```html
<script>
  let numbers = $state([1, 2, 3, 4]);
  let total = $derived(numbers.reduce((t, n) => t + n, 0));

  function addNumber() {
    numbers.push(numbers.length + 1);
  }

  $inspect(numbers).with(console.trace);
</script>
```

### Effect

So far we’ve talked about reactivity in terms of state. But that’s only half of the equation — state is only reactive if **something is reacting to it**, otherwise it’s just a sparkling variable.

The thing that reacts is called an **effect**. You’ve already encountered effects — the ones that Svelte creates on your behalf to update the DOM in response to state changes — but you can also create your own with the `$effect` rune.

> Most of the time, you shouldn’t. `$effect` is best thought of as an **escape hatch**, rather than something to use frequently. If you can put your side effects in an event handler, for example, that’s almost always preferable.

Let's go over an example. Let’s say we want to use `setInterval` to keep track of how long the component has been mounted. Create the effect:

```html
<script lang="ts">
	let elapsed = $state(0);
	let interval = $state(1000);

	$effect(() => {
		setInterval(() => {
			elapsed += 1;
		}, interval);
	});
</script>

<button onclick={() => interval /= 2}>speed up</button>
<button onclick={() => interval *= 2}>slow down</button>

<p>elapsed: {elapsed}</p>
```

Click the ‘speed up’ button a few times and notice that `elapsed` ticks up faster, because we’re calling `setInterval` each time `interval` gets smaller.

If we then click the ‘slow down’ button... well, it doesn’t work. That’s because we’re not clearing out the old intervals when the effect updates. We can fix that by returning a cleanup function:

```html
<script lang="ts">
	let elapsed = $state(0);
	let interval = $state(1000);

$effect(() => {
	const id = setInterval(() => {
		elapsed += 1;
	}, interval);

	return () => {
		clearInterval(id);
	};
});
</script>

<button onclick={() => interval /= 2}>speed up</button>
<button onclick={() => interval *= 2}>slow down</button>

<p>elapsed: {elapsed}</p>
```

The cleanup function is called immediately before the effect function re-runs when interval changes, and also when the component is destroyed.

If the effect function doesn’t read any state when it runs, it will only run once, when the component mounts.

> Effects do not run during server-side rendering.

### Universal reactivity

Think of an object which is going to act as a state and it is also going to be shared across the app. This object is going to be declared in a file like `shared.svelte.js` and not `shared.js`, because svelte compiler needs to be able to parse the `$state` rune:

```javascript
export const counter = $state({
  count: 0,
});
```

You can then use this state object in a component:

```html
<script>
	import { counter } from './shared.svelte.js';
</script>

<button onclick={() => counter.count += 1}>
	clicks: {counter.count}
</button>
```

> You cannot export a `$state` declaration from a module if the declaration is reassigned (rather than just mutated), because the importers would have no way to know about it.

## Declaring props

So far, we’ve dealt exclusively with internal state — that is to say, the values are only accessible within a given component.

In any real application, you’ll need to pass data from one component down to its children. To do that, we need to declare properties, generally shortened to ‘props’. In Svelte, we do that with the `$props` rune.

Take this `Nested.svelte` component file:

```html
<script>
  let { answer } = $props();
</script>

<p>The answer is {answer}</p>
```

Now the `<Nested />` component is able to receive `answer` as prop:

```html
<script>
  import Nested from "./Nested.svelte";
</script>

<Nested answer="{42}" />
```

### Props default value

We can easily specify default values for props:

```html
<script>
  let { answer = "a mystery" } = $props();
</script>

<p>The answer is {answer}</p>
```

### Spread props

If the props that are expected by a component are the exact same properties of the object that is going to be passed to the component as props, you can simply use spread props:

```html
<!-- PackageInfo.svelte -->
<script>
  let { name, version, description, website } = $props();
</script>

<p>
  The <code>{name}</code> package is {description}. Download version {version}
  from <a href="https://www.npmjs.com/package/{name}">npm</a> and
  <a href="{website}">learn more here</a>
</p>

<!-- App.svelte -->
<script>
  import PackageInfo from "./PackageInfo.svelte";

  const pkg = {
    name: "svelte",
    version: 5,
    description: "blazing fast",
    website: "https://svelte.dev",
  };
</script>

<PackageInfo {...pkg} />
```

Conversely, in `PackageInfo.svelte` you can get an object containing all the props that were passed into a component using a rest property...

```html
<script>
  let { name, ...stuff } = $props();
</script>
```

or skip destructuring altogether:

```html
<script>
  let stuff = $props();
</script>
```

## If blocks

To conditionally render some markup, we wrap it in an if block:

```jsx
<button onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
	<p>{count} is greater than 10</p>
{/if}
```

> Remember that in Svelte, blocks start with `#` and end in `/`. `:` continues blocks.

To add an `else` block you can do:

```jsx
<button onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
	<p>{count} is greater than 10</p>
{:else}
	<p>{count} is between 0 and 10</p>
{/if}
```

To add an `else-if` block you can do:

```jsx
<button onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
	<p>{count} is greater than 10</p>
{:else if count < 5}
	<p>{count} is less than 5</p>
{:else}
	<p>{count} is between 5 and 10</p>
{/if}
```

## Each block

When building user interfaces you’ll often find yourself working with lists of data. In this example, we’ve repeated the `<button>` markup multiple times — changing the colour each time — but there’s still more to add.

Instead of laboriously copying, pasting and editing, we can get rid of all but the first button, then use an `each` block:

```jsx
{#each colors as color}
		<button
			style="background: {color}"
			aria-label={color}
			aria-current={selected === color}
			onclick={() => selected = color}
		></button>
{/each}
```

The expression (`colors`, in this case) can be any iterable or array-like object — in other words, anything that works with `Array.from`.

You can get the current index as a second argument, like so:

```jsx
{#each colors as color, i}
		<button
			style="background: {color}"
			aria-label={color}
			aria-current={selected === color}
			onclick={() => selected = color}
		>{i + 1}</button>
{/each}
```

### Keyed each block

By default, updating the value of an each block will add or remove DOM nodes at the end of the block if the size changes, and update the remaining DOM. That might not be what you want.

Inside Thing.svelte, name is a dynamic prop but emoji is a constant.

```html
<!-- Thing.svelte -->
<script>
  const emojis = {
    apple: "🍎",
    banana: "🍌",
    carrot: "🥕",
    doughnut: "🍩",
    egg: "🥚",
  };

  // `name` is updated whenever the prop value changes...
  let { name } = $props();

  // ...but `emoji` is fixed upon initialization
  const emoji = emojis[name];
</script>

<p>{emoji} = {name}</p>
```

Click the ‘Remove first thing’ button a few times, and notice what happens:

1. It removes the last component.
2. It then updates the name value in the remaining DOM nodes (the text node containing ‘doughnut’ now contains ‘egg’, and so on), but not the emoji.

> If you’re coming from React, this might seem strange, because you’re used to the entire component re-rendering when state changes. Svelte works differently: the component ‘runs’ once, and subsequent updates are ‘fine-grained’. This makes things faster and gives you more control.

One way to fix it would be to make emoji a `$derived` value. But it makes more sense to remove the first `<Thing>` component altogether rather than remove the last one and update all the others.

To do that, we specify a unique key for each iteration of the `each` block:

```jsx
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

> You can use any object as the key, as Svelte uses a `Map` internally — in other words you could do `(thing)` instead of `(thing.id)`. Using a `string` or `number` is generally safer, however, since it means identity persists without referential equality, for example when updating with fresh data from an API server.

## Await blocks

Most web applications have to deal with asynchronous data at some point. Svelte makes it easy to await the value of promises directly in your markup:

```jsx
{#await promise}
	<p>...rolling</p>
{:then number}
	<p>you rolled a {number}!</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

> Only the most recent promise is considered, meaning you don’t need to worry about race conditions.

If you know that your promise can’t reject, you can omit the `catch` block. You can also omit the first block if you don’t want to show anything until the promise resolves:

```jsx
{#await promise then number}
	<p>you rolled a {number}!</p>
{/await}
```

## DOM events

As we’ve briefly seen already, you can listen to any DOM event on an element (such as click or pointermove) with an `on<name>` function:

```html
<script>
  let m = $state({ x: 0, y: 0 });

  function onpointermove(event) {
    // event handler has access to the event object as argument
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<div onpointermove="{onpointermove}">
  The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>
```

Like with any other property where the name matches the value, we can use the short form:

```html
<div {onpointermove}>
  The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>
```

### Inline handlers

You can also use inline event handlers:

```html
<div
	onpointermove={(event) => {
		m.x = event.clientX;
		m.y = event.clientY;
	}}
>
	The pointer is at {m.x} x {m.y}
</div>
```

### Capturing events

Normally, event handlers run during the bubbling phase. Sometimes, you want handlers to run during the capture phase instead. Add capture to the end of the event name:

```html
<div onkeydowncapture={(e) => alert(`
<div>
  ${e.key}`)} role="presentation"> <input onkeydowncapture={(e) => alert(`<input />
  ${e.key}`)} />
</div>
```

> If both capturing and non-capturing handlers exist for a given event, the capturing handlers will run first.

### Component events

You can pass event handlers to components like any other prop. In this example, `Stepper.svelte`, add increment and decrement props...

```html
<!-- Stepper.svelte -->
<script>
  let { increment, decrement } = $props();
</script>

<button onclick="{decrement}">-1</button>
<button onclick="{increment}">+1</button>
```

And then to use this component:

```html
<!-- App.svelte -->
<script>
  import Stepper from "./Stepper.svelte";
  let value = $state(0);
</script>

<p>The current value is {value}</p>

<Stepper increment={() => value += 1} decrement={() => value -= 1} />
```

### Spreading events

We can also spread event handlers directly onto elements. Look at this example:

```html
<!-- App.svelte -->
<script>
  import BigRedButton from "./BigRedButton.svelte";
  import horn from "./horn.mp3";

  const audio = new Audio();
  audio.src = horn;

  function honk() {
    audio.load();
    audio.play();
  }
</script>

<BigRedButton onclick="{honk}" />

<!-- BigRedButton.svelte -->
<script>
  let props = $props();
</script>

<button {...props}>Push</button>
```

## Inputs

As a general rule, data flow in Svelte is top down — a parent component can set props on a child component, and a component can set attributes on an element, but not the other way around.

### Text inputs

Sometimes it’s useful to break that rule. Take the case of the `<input>` element in this component — we could add an `oninput` event handler that sets the value of `name` to `event.target.value`, but it’s a bit... boilerplatey. It gets even worse with other form elements, as we’ll see.

Instead, we can use the `bind:value` directive:

```html
<script>
  let name = $state("world");
</script>

<input bind:value="{name}" />

<h1>Hello {name}!</h1>
```

This means that not only will changes to the value of `name` update the input value, but changes to the input value will update `name`.

### Numeric inputs

In the DOM, every input value is a `string`. That’s unhelpful when you’re dealing with numeric inputs — `type="number"` and `type="range"` — as it means you have to remember to coerce `input.value` before using it.

With `bind:value`, Svelte takes care of it for you:

```html
<script>
  let a = $state(1);
  let b = $state(2);
</script>

<label>
  <input type="number" bind:value="{a}" min="0" max="10" />
  <input type="range" bind:value="{a}" min="0" max="10" />
</label>

<label>
  <input type="number" bind:value="{b}" min="0" max="10" />
  <input type="range" bind:value="{b}" min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>
```

### Checkbox

Checkboxes are used for toggling between states. Instead of binding to `input.value`, we bind to `input.checked`:

```html
<input type="checkbox" bind:checked="{yes}" />
```

Take this example:

```jsx
<script>
	let yes = $state(false);
</script>

<label>
	<input type="checkbox" checked={yes} />
	Yes! Send me regular email spam
</label>

{#if yes}
	<p>
		Thank you. We will bombard your inbox and sell
		your personal details.
	</p>
{:else}
	<p>
		You must opt in to continue. If you're not
		paying, you're the product.
	</p>
{/if}

<button disabled={!yes}>Subscribe</button>
```

### Select

We can also use `bind:value` with `<select>` elements:

```html
<select bind:value={selected} onchange={() => answer = ''} >
```

Take this example:

```html
<script>
	let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	];

	let selected = $state(); // uninitialized

	let answer = $state('');

	function handleSubmit(e) {
		e.preventDefault();

		alert(
			`answered question ${selected.id} (${selected.text}) with "${answer}"`
		);
	}
</script>

<h2>Insecurity questions</h2>

<form onsubmit={handleSubmit}>
	<select
		bind:value={selected}
		onchange={() => (answer = '')}
	>
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer} />

	<button disabled={!answer} type="submit">
		Submit
	</button>
</form>

<p>
	selected question {selected
		? selected.id
		: '[waiting...]'}
</p>
```

> Note that the `<option>` values are objects rather than strings. Svelte doesn’t mind.

Because we haven’t set an initial value of `selected`, the binding will set it to the default value (the first in the list) automatically. Be careful though — until the binding is initialised, `selected` remains `undefined`, so we can’t blindly reference e.g. `selected.id` in the template.

### Group inputs

If you have multiple `type="radio"` or `type="checkbox"` inputs relating to the **same value**, you can use `bind:group` along with the `value` attribute. Radio inputs in the same group are **mutually exclusive**; checkbox inputs in the same group form an **array of selected values**.

Check this example:

```html
<script>
  let scoops = $state(1);
  let flavours = $state([]);

  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
<label>
  <input type="radio" name="scoops" value="{number}" bind:group="{scoops}" />

  {number} {number === 1 ? 'scoop' : 'scoops'}
</label>
{/each}

<h2>Flavours</h2>

{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
<label>
  <input
    type="checkbox"
    name="flavours"
    value="{flavour}"
    bind:group="{flavours}"
  />

  {flavour}
</label>
{/each} {#if flavours.length === 0}
<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
<p>Can't order more flavours than scoops!</p>
{:else}
<p>
  You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'} of
  {formatter.format(flavours)}
</p>
{/if}
```

### Select multiple

A `<select>` element can have a multiple attribute, in which case it will populate an array rather than selecting a single value.

```html
<select multiple bind:value="{flavours}">
  {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
  <option>{flavour}</option>
  {/each}
</select>
```

> Note that we’re able to omit the `value` attribute on the `<option>`, since the value is identical to the element’s contents.

### Textarea inputs

The `<textarea>` element behaves similarly to a text input in Svelte — use `bind:value`:

```html
<textarea bind:value="{value}"></textarea>
```

In cases like these, where the names match, we can also use a shorthand form:

```html
<textarea bind:value></textarea>
```

> This applies to all bindings, not just `<textarea>` bindings.

## Classes and styles

### The `class` attribute

Like any other attribute, you can specify classes with a JavaScript attribute. In this example, we could add a `flipped` class to the card:

```html
<button class="card {flipped ? 'flipped' : ''}" onclick={() => flipped =
!flipped} >
```

We can make it nicer though. Adding or removing a class based on some condition is such a common pattern in UI development that Svelte allows you to pass an object or array that is converted to a string by clsx.

```jsx
<button
	class={["card", { flipped }]}
	onclick={() => flipped = !flipped}
>
```

This means ‘always add the `card` class, and add the `flipped` class whenever `flipped` is truthy’.

### The `style` directive

As with `class`, you can write your inline `style` attributes literally, because Svelte is really just HTML with fancy bits:

```html
<button class="card" style="transform: {flipped ? 'rotateY(0)' : ''}; --bg-1:
palegoldenrod; --bg-2: black; --bg-3: goldenrod" onclick={() => flipped =
!flipped} >
```

When you have a lot of styles, it can start to look a bit wacky. We can tidy things up by using the `style:` directive:

```html
<button class="card" style:transform={flipped ? 'rotateY(0)' : ''}
style:--bg-1="palegoldenrod" style:--bg-2="black" style:--bg-3="goldenrod"
onclick={() => flipped = !flipped} >
```

Notice that in this example you are actually defining `--bg-1` and other css custom properties using the `style:` directive. You would then have to use them within your `<style>` tag.

### Component styles

Often, you need to influence the styles inside a child component. Perhaps we want to make these boxes red, green and blue.

```html
<div class="boxes">
  <Box />
  <Box />
  <Box />
</div>
```

Components should be able to decide for themselves which styles can be controlled from ‘outside’, in the same way they decide which variables are exposed as props.

Inside `Box.svelte`, change `background-color` so that it is determined by a CSS custom property:

```html
<!-- Box.svelte -->
<div class="box"></div>

<style>
  .box {
    width: 5em;
    height: 5em;
    border-radius: 0.5em;
    margin: 0 0 1em 0;
    background-color: var(--color, #ddd);
  }
</style>
```

Now any parent element (such as `<div class="boxes">`) can set the value of `--color`, but we can also set it on individual components:

```html
<div class="boxes">
  <Box --color="red" />
  <Box --color="green" />
  <Box --color="blue" />
</div>
```

The values can be dynamic, like any other attribute.

> This feature works by wrapping each component in an element with `display: contents`, where needed, and applying the custom properties to it. If you inspect the elements, you’ll see markup like this:

```html
<svelte-css-wrapper style="display: contents; --color: red;">
  <!-- contents -->
</svelte-css-wrapper>
```

> Because of `display: contents` this won’t affect your layout, but the extra element can affect selectors like `.parent > .child`.

## Actions

Actions are essentially **element-level lifecycle functions**. They’re useful for things like:

- interfacing with third-party libraries
- lazy-loaded images
- tooltips
- adding custom event handlers

As an example, imagine we have defined an action function called `trapFocus` and this function is going to be used by an element like:

```html
<script>
  import { trapFocus } from "./actions.svelte.js";
</script>

<div class="menu" use:trapFocus></div>
```

It is important to remember that that action function definition receives the element that is calling it as argument, and this happens only because the function is used with `use` directive on the element:

```js
export function trapFocus(node) {
  // logic
}
```

### Adding parameters

An action can take an argument, which the action function will be called with alongside the element it belongs to.

Look at this action function:

```js
function tooltip(node, fn) {
  $effect(() => {
    const tooltip = tippy(node, fn());

    return tooltip.destroy;
  });
}
```

> We’re passing in a function as the second parameter, rather than the options themselves, because the `tooltip` function does not re-run when the options change.

Then, we need to pass the options into the action:

```jsx
<button use:tooltip={() => ({ content })}>Hover me</button>
```

Where `() => ({content})` is the function that is being passed to the `tooltip` function.

## Transitions

We can make more appealing user interfaces by gracefully transitioning elements into and out of the DOM. Svelte makes this very easy with the `transition` directive.

First, import the `fade` function from `svelte/transition` as an example, and then use it:

```html
<script>
  import { fade } from "svelte/transition";
  let visible = $state(true);
</script>

<label>
  <input type="checkbox" bind:checked="{visible}" />
  visible
</label>

{#if visible}
<p transition:fade>Fades in and out</p>
{/if}
```

### Adding parameters

Some transition functions can accept parameters. Replace the `fade` transition with `fly`:

```html
<script>
	import { fly } from 'svelte/transition';

	let visible = $state(true);
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<p transition:fly={{ y: 200, duration: 2000 }}>
		Flies in and out
	</p>
{/if}
```

### `in` and `out`

Instead of the `transition` directive, an element can have an `in` or an `out` directive, or both together. Import fade alongside fly and use them:

```html
<script>
	import { fade, fly } from 'svelte/transition';

	let visible = $state(true);
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<p in:fly={{ y: 200, duration: 2000 }} out:fade>
		Flies in, fades out
	</p>
{/if}
```

### Custom CSS transitions

# Side notes

## Rendering HTML text

If you have a string variable containing an HTML text like the example below, you can use the `marked` function to render it as HTML. You should first import it:

```html
<script>
  import { marked } from "marked";

  let value = $state(
    `Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`
  );
</script>

<div class="grid">
  input
  <textarea {value}></textarea>

  output
  <div>{@html marked(value)}</div>
</div>
```
