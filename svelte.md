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

The `svelte/transition` module has a handful of built-in transitions, but it’s very easy to create your own. By way of example, this is the source of the `fade` transition:

```js
function fade(node, { delay = 0, duration = 400 }) {
  const o = +getComputedStyle(node).opacity;

  return {
    delay,
    duration,
    css: (t) => `opacity: ${t * o}`,
  };
}
```

The function takes two arguments — the node to which the transition is applied, and any parameters that were passed in — and returns a **transition object** which can have the following properties:

- `delay` — milliseconds before the transition begins
- `duration` — length of the transition in milliseconds
- `easing` — a `p => t` easing function (see the chapter on tweening)
- `css` — a `(t, u) => css` function, where `u === 1 - t`
- `tick` — a `(t, u) => {...}` function that has some effect on the node

The `t` value is `0` at the **beginning of an intro** or the **end of an outro**, and `1` at the end of an intro or beginning of an outro.

> Most of the time you should return the `css` property and not the `tick` property, as CSS animations run **off the main thread** to prevent jank where possible. Svelte ‘simulates’ the transition and constructs a CSS animation, then lets it run.

You can take a look at another more complex example here: https://svelte.dev/tutorial/svelte/custom-css-transitions

### Custom JS transitions

While you should generally use CSS for transitions as much as possible, there are some effects that can’t be achieved without JavaScript, such as a typewriter effect:

```js
function typewriter(node, { speed = 1 }) {
  const valid =
    node.childNodes.length === 1 &&
    node.childNodes[0].nodeType === Node.TEXT_NODE;

  if (!valid) {
    throw new Error(
      `This transition only works on elements with a single text node child`
    );
  }

  const text = node.textContent;
  const duration = text.length / (speed * 0.01);

  return {
    duration,
    tick: (t) => {
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    },
  };
}
```

As a real example:

```html
<script>
  let visible = $state(false);

  function typewriter(node, { speed = 1 }) {
    const valid =
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
      throw new Error(
        `This transition only works on elements with a single text node child`
      );
    }

    const text = node.textContent;
    const duration = text.length / (speed * 0.01);

    return {
      duration,
      tick: (t) => {
        const i = Math.trunc(text.length * t);
        node.textContent = text.slice(0, i);
      },
    };

    return {};
  }
</script>

<label>
  <input type="checkbox" bind:checked="{visible}" />
  visible
</label>

{#if visible}
<p transition:typewriter>The quick brown fox jumps over the lazy dog</p>
{/if}
```

### Transition events

It can be useful to know when transitions are beginning and ending. Svelte dispatches events that you can listen to like any other DOM event:

```html
<p
	transition:fly={{ y: 200, duration: 2000 }}
	onintrostart={() => status = 'intro started'}
	onoutrostart={() => status = 'outro started'}
	onintroend={() => status = 'intro ended'}
	onoutroend={() => status = 'outro ended'}
>
	Flies in and out
</p>
```

### Global transitions

Ordinarily, transitions will only play on elements when their direct containing block is added or destroyed. In the example here, toggling the visibility of the entire list does not apply transitions to individual list elements:

```html
<script>
  import { slide } from "svelte/transition";

  let items = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];

  let showItems = $state(true);
  let i = $state(5);
</script>

<label>
  <input type="checkbox" bind:checked="{showItems}" />
  show list
</label>

<label>
  <input type="range" bind:value="{i}" max="10" />
</label>

{#if showItems} {#each items.slice(0, i) as item}
<div transition:slide>{item}</div>
{/each} {/if}

<style>
  div {
    padding: 0.5em 0;
    border-top: 1px solid #eee;
  }
</style>
```

Instead, we’d like transitions to not only play when individual items are added and removed with the slider but also when we toggle the checkbox.

We can achieve this with a `global` transition modifier, which plays when any block containing the transitions is added or removed:

```jsx
{#each items.slice(0, i) as item}
		<div transition:slide|global>
			{item}
		</div>
{/each}
```

### Key blocks

Key blocks destroy and recreate their contents when the value of an expression changes. This is useful if you want an element to play its transition whenever a value changes instead of only when the element enters or leaves the DOM.

Here, for example, we’d like to play the typewriter transition from `transition.js` whenever the loading message, i.e. `i` changes. Wrap the <p> element in a key block:

```jsx
{#key i}
	<p in:typewriter={{ speed: 10 }}>
		{messages[i] || ''}
	</p>
{/key}
```

Look at this example to understand it better:

```html
<script>
	import { typewriter } from './transition.js';
	import { messages } from './loading-messages.js';

	let i = $state(-1);

	$effect(() => {
		const interval = setInterval(() => {
			i += 1;
			i %= messages.length;
		}, 2500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<h1>loading...</h1>

{#key i}
<p in:typewriter={{ speed: 10 }}>
	{messages[i] || ''}
</p>
{/key}
```

# Advanced Svelte

## Advanced Reactivity

### Raw state

In previous examples, we learned that state is deeply reactive — if you (for example) change a property of an object, or push to an array, it will cause the UI to update. This works by creating a proxy that intercepts reads and writes.

Occasionally, that’s not what you want. If you’re not changing individual properties, or if it’s important to maintain referential equality, then you can use _raw state_ instead.

In this example, we have a chart of Svelte’s steadily increasing stock price. We want the chart to update when new data comes in, which we could achieve by turning `data` into state

```js
let data = $state(poll());
```

but there’s no need to make it **deeply reactive** when it will be discarded a few milliseconds later. Instead, use `$state.raw`:

```js
let data = $state.raw(poll());
```

> Mutating raw state will have no direct effect. In general, mutating non-reactive state is strongly discouraged.

Take a look at the example here to understand it better and also get to know some interesting techniques: https://svelte.dev/tutorial/svelte/raw-state

### Reactive Javascript classes

It’s not just variables that can be made reactive — in Svelte, we can also make properties of classes reactive.

Let’s make the width and height properties of our `Box` class reactive:

```js
class Box {
  width = $state(0);
  height = $state(0);
  area = 0;

  // ...
}
```

> In addition to `$state` and `$derived`, you can use `$state.raw` and `$derived.by` to define reactive fields.

#### Getters and setters

Classes are particularly useful when you need to validate data. You can setup getters and setters and implement your validations in them:

```js
class Box {
  #width = $state(0);
  #height = $state(0);
  area = $derived(this.#width * this.#height);

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  set width(value) {
    this.#width = Math.max(0, Math.min(MAX_SIZE, value));
  }

  set height(value) {
    this.#height = Math.max(0, Math.min(MAX_SIZE, value));
  }

  embiggen(amount) {
    this.width += amount;
    this.height += amount;
  }
}
```

#### Reactive built-ins

Svelte ships with several reactive classes that you can use in place of JavaScript built-in objects: `Map`, `Set`, `Date`, `URL` and `URLSearchParams`.

For instance, instead of using `$state(new Date())` to make the regular JavaScript date object reactive, you can use `new SvelteDate()` from `svelte/reactivity` which is reactive by nature.

### Stores

Prior to the introduction of runes in Svelte 5, stores were the idiomatic way to handle reactive state outside components. That’s no longer the case, but you’ll still encounter stores when using Svelte (including in SvelteKit, for now).

Remember the example we created in the _Universal reactivity_ section? We are now going to do that again, but this time the shared state is implemented using a store.

In `shared.js` we’re currently exporting count, which is a number. Turn it into a writable store:

```js
import { writable } from "svelte/store";

export const count = writable(0);
```

To reference the value of the store, we prefix it with a $ symbol. Remember that whenever you want to refer to the `count` variable in a component, you need to use the $ prefix. In `Counter.svelte`:

```html
<!-- Counter.svelte -->
 <script>
	import { count } from './shared.js';
</script>

<button onclick={() => $count += 1}>
	clicks: {$count}
</button>
```

Finally, you can add the event handler. Because this is a writable store, we can update the value programmatically using its `set` or `update` method...

```js
count.update((n) => n + 1);
```

## Reusing content

Snippets allow you to reuse content within a component, without extracting it out into a separate file.

This could be a snippet for the table row representing some unicode data related to monkey:

```js
{#snippet monkey()}
	<tr>
		<td>{emoji}</td>
		<td>{description}</td>
		<td>\u{emoji.charCodeAt(0).toString(16)}\u{emoji.charCodeAt(1).toString(16)}</td>
		<td>&amp#{emoji.codePointAt(0)}</td>
	</tr>
{/snippet}
```

Then whenever you want this snipper to be rendered:

```js
{@render monkey()}
```

You can also make your snippet accept parameters:

```js
{#snippet monkey(emoji, description)}
	<tr>
		<td>{emoji}</td>
		<td>{description}</td>
		<td>\u{emoji.charCodeAt(0).toString(16)}\u{emoji.charCodeAt(1).toString(16)}</td>
		<td>&amp#{emoji.codePointAt(0)}</td>
	</tr>
{/snippet}
```

And then when you use it:

```js
{@render monkey('🐵', 'see no evil')}
```

### Passing snippets to components

Since snippets — like functions — are just values, they can be passed to components as props.

Take this `<FilteredList>` component as an example. Its job is to filter the data that gets passed into it, but it has no opinions about how that data should be rendered — that’s the responsibility of the parent component.

These are the snippets:

```js
{#snippet header()}
	<header>
		<span class="color"></span>
		<span class="name">name</span>
		<span class="hex">hex</span>
		<span class="rgb">rgb</span>
		<span class="hsl">hsl</span>
	</header>
{/snippet}

{#snippet row(d)}
	<div class="row">
		<span class="color" style="background-color: {d.hex}"></span>
		<span class="name">{d.name}</span>
		<span class="hex">{d.hex}</span>
		<span class="rgb">{d.rgb}</span>
		<span class="hsl">{d.hsl}</span>
	</div>
{/snippet}
```

We are now going to make the `<FilteredList>` component accept them:

```html
<!-- FilteredList.svelte -->
<script>
  let { data, field, header, row } = $props();

  let search = $state("");

  let filtered = $derived.by(() => {
    if (search === "") return data;

    const regex = new RegExp(search, "i");
    return data.filter((d) => regex.test(d[field]));
  });
</script>

<div class="list">
  <label> Filter: <input bind:value="{search}" /> </label>

  <div class="header">{@render header()}</div>

  <div class="content">{#each filtered as d} {@render row(d)} {/each}</div>
</div>
```

Then pass those snippets to the `FilteresList` component:

```html
<FilteredList data="{colors}" field="name" {header} {row}></FilteredList>
```

### Implicit snippet props

As an authoring convenience, snippets declared directly inside components become props on those components. Take the `header` and `row` snippets from previous example and move them inside `<FilteredList>`, then you will no longer need to pass the snippets as explicit props:

```js
<FilteredList
	data={colors}
	field="name"
>
	{#snippet header()}
	<header>
		<span class="color"></span>
		<span class="name">name</span>
		<span class="hex">hex</span>
		<span class="rgb">rgb</span>
		<span class="hsl">hsl</span>
	</header>
  {/snippet}

  {#snippet row(d)}
	<div class="row">
		<span class="color" style="background-color: {d.hex}"></span>
		<span class="name">{d.name}</span>
		<span class="hex">{d.hex}</span>
		<span class="rgb">{d.rgb}</span>
		<span class="hsl">{d.hsl}</span>
	</div>
  {/snippet}
</FilteredList>
```

Any content inside a component that is not part of a declared snippet becomes a special `children` snippet. Since `header` has no parameters, we can turn it into children by removing the block tags...

```js
<FilteredList
	data={colors}
	field="name"
>
	<header>
		<span class="color"></span>
		<span class="name">name</span>
		<span class="hex">hex</span>
		<span class="rgb">rgb</span>
		<span class="hsl">hsl</span>
	</header>

  {#snippet row(d)}
	<div class="row">
		<span class="color" style="background-color: {d.hex}"></span>
		<span class="name">{d.name}</span>
		<span class="hex">{d.hex}</span>
		<span class="rgb">{d.rgb}</span>
		<span class="hsl">{d.hsl}</span>
	</div>
  {/snippet}
</FilteredList>
```

Now the `header` parameter that is expected by the `FilteredList.svelte` component is no longer available, instead it will receive it as a `children` prop:

```html
<script>
  let { data, field, children, row } = $props();

  let search = $state("");

  let filtered = $derived.by(() => {
    if (search === "") return data;

    const regex = new RegExp(search, "i");
    return data.filter((d) => regex.test(d[field]));
  });
</script>

<div class="list">
  <label> Filter: <input bind:value="{search}" /> </label>

  <div class="header">{@render children()}</div>

  <div class="content">{#each filtered as d} {@render row(d)} {/each}</div>
</div>
```

## Motion

Often, a good way to communicate that a value is changing is to use motion. Svelte ships classes for adding motion to your user interfaces.

### Tweened values

Import the `Tween` class from `svelte/motion` and turn `progress` into an instance of `Tween`:

```html
<!-- App.svelte -->
<script>
  import { Tween } from "svelte/motion";
  let progress = new Tween(0);
</script>
```

The `Tween` class has a **writable** `target` property and a **readonly** `current` property — update the `<progress>` element:

```html
<progress value="{progress.current}"></progress>

<button onclick={() => (progress.target = 0)}>
	0%
</button>

<button onclick={() => (progress.target = 0.25)}>
	25%
</button>

<button onclick={() => (progress.target = 0.5)}>
	50%
</button>

<!-- more buttons -->
```

However, at this point, the progress animation might seem a bit robatic. To make it smoother you can add an easing function by importing `cubicOut` from `svelte/easing` and then passing it as the second argument of `Tween` contstructor:

```html
<script lang="ts">
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  let progress = new Tween(0, {
    duration: 400,
    easing: cubicOut,
  });
</script>
```

The full set of options available to `Tween` are:

- `delay` — milliseconds before the tween starts
- `duration` — either the duration of the tween in milliseconds, or a `(from, to) => milliseconds` function allowing you to (e.g.) specify longer tweens for larger changes in value
- `easing` — a `p => t` function
- `interpolate` — a custom `(from, to) => t => value` function for interpolating between arbitrary values. By default, Svelte will interpolate between numbers, dates, and identically-shaped arrays and objects (as long as they only contain numbers and dates or other valid arrays and objects). If you want to interpolate (for example) colour strings or transformation matrices, supply a custom interpolator.

You can also call `progress.set(value, options)` instead of assigning directly to `progress.target`, in which case options will **override the defaults**. The `set` method returns a **promise** that resolves when the **tween completes**.

### Springs

The `Spring` class is an alternative to `Tween` that often works better for values that are **frequently changing**.

This is how you can import and set some variables to use it:

```html
<script>
  import { Spring } from "svelte/motion";

  let coords = new Spring({ x: 50, y: 50 });
  let size = new Spring(10);
</script>
```

As with Tween, springs have a writable `target` property and a readonly `current` property. So you can use these in a tamplate like this:

```html
<svg
	onmousemove={(e) => {
		coords.target = { x: e.clientX, y: e.clientY };
	}}
	onmousedown={() => (size.target = 30)}
	onmouseup={() => (size.target = 10)}
	role="presentation"
>
	<circle
		cx={coords.current.x}
		cy={coords.current.y}
		r={size}
	></circle>
</svg>
```

Springs have default `stiffness` and `damping` values, which control the spring’s, well... springiness. We can specify our own initial values:

```js
let coords = new Spring(
  { x: 50, y: 50 },
  {
    stiffness: 0.1,
    damping: 0.25,
  }
);
```

## Advanced bindings

### `contentEditable` binding

Elements with a `contenteditable` attribute support `textContent` and `innerHTML` bindings. Take this example:

```html
<script>
  let html = $state("<p>Write some text here!</p>");
</script>

<div contenteditable bind:innerHTML="{html}"></div>

<pre>{html}</pre>

<style>
  [contenteditable] {
    padding: 0.5em;
    border: 1px solid #eee;
    border-radius: 4px;
  }
</style>
```

### `each` block binding

You can bind to properties inside `each` blocks.

```jsx
{#each todos as todo}
	<li class={{ done: todo.done }}>
		<input
			type="checkbox"
			bind:checked={todo.done}
		/>

		<input
			type="text"
			placeholder="What needs to be done?"
			bind:value={todo.text}
		/>
	</li>
{/each}
```

### Media elements

You can bind to properties of `<audio>` and `<video>` elements, making it easy to (for example) build custom player UI. For instance:

```html
<script>
	let { src, title, artist } = $props();

	let time = $state(0);
	let duration = $state(0);
	let paused = $state(true);

	function format(time) {
		if (isNaN(time)) return '...';

		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);

		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	}
</script>

<div class={['player', { paused }]}>
	<audio
		{src}
		bind:currentTime={time}
		bind:duration
		bind:paused
		onended={() => {
			time = 0;
		}}
		></audio>
	<button
		class="play"
		aria-label={paused ? 'play' : 'pause'}
		onclick={() => paused => !paused}
	></button>
</div>
```

Look at the example here to learn a lot more: https://svelte.dev/tutorial/svelte/media-elements

The complete set of bindings for `<audio>` and `<video>` is as follows — seven readonly bindings:

- `duration`: the total duration, in seconds
- `buffered`: an array of `{start, end}` objects
- `seekable`: ditto
- `played`: ditto
- `seeking`: boolean
- `ended`: boolean
- `readyState`: number between (and including) 0 and 4

And five 2-way bindings:

- `currentTime`: the current position of the playhead, in seconds
- `playbackRate`: speed up or slow down (1 is normal)
- `paused`: it is clear what it is!
- `volume`: a value between 0 and 1
- `muted`: a boolean value where true is muted

Videos additionally have readonly `videoWidth` and `videoHeight` bindings.

### Dimensions

You can add `clientWidth`, `clientHeight`, `offsetWidth` and `offsetHeight` bindings to any element, and Svelte will update the bound values using a `ResizeObserver`.

```html
<div bind:clientWidth="{w}" bind:clientHeight="{h}">
  <span style="font-size: {size}px" contenteditable>edit this text</span>
  <span class="size">{w} x {h}px</span>
</div>
```

Take a look at the example here to learn a lot more: https://svelte.dev/tutorial/svelte/dimensions

### This

You can use the special `bind:this` directive to get a **readonly binding** to an element in your component.

```html
<script>
  import { paint } from "./gradient.js";

  let canvas;

  $effect(() => {
    const context = canvas.getContext("2d");

    let frame = requestAnimationFrame(function loop(t) {
      frame = requestAnimationFrame(loop);
      paint(context, t);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<canvas bind:this="{canvas}" width="{32}" height="{32}"></canvas>
```

Note that the value of `canvas` will remain `undefined` until the component has mounted — in other words you can’t access it until the `$effect` runs.

### Component bindings

Just as you can bind to properties of DOM elements, you can bind to component props. For example, we can bind to the value prop of this `<Keypad>` component as though it were a form element.

First, we need to mark the prop as _bindable_.

```html
<!-- Keypad.svelte -->
<script>
  let { value = $bindable(""), onsubmit } = $props();

  const select = (num) => () => (value += num);
  const clear = () => (value = "");
</script>
```

Then, when using the component:

```html
<!-- App.svelte -->
<Keypad bind:value="{pin}" {onsubmit} />
```

Now, when the user interacts with the keypad, the value of pin in the parent component is immediately updated.

> Use component bindings sparingly. It can be difficult to track the flow of data around your application if you have too many of them, especially if there is no ‘single source of truth’.

### Binding to component instances

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

# Basic SvelteKit

Whereas Svelte is a component framework, SvelteKit is an app framework (or ‘metaframework’, depending on who you ask) that solves the tricky problems of building something production-ready:

- Routing
- Server-side rendering
- Data fetching
- Service workers
- TypeScript integration
- Prerendering
- Single-page apps
- Library packaging
- Optimised production builds
- Deploying to different hosting providers
- ...and so on

SvelteKit apps are server-rendered by default (like traditional ‘multi-page apps’ or MPAs) for excellent first load performance and SEO characteristics, but can then transition to client-side navigation (like modern ‘single-page apps’ or SPAs) to avoid jankily reloading everything (including things like third-party analytics code) when the user navigates. They can run anywhere JavaScript runs, though — as we’ll see — your users may not need to run any JavaScript at all.

## Routing

### Pages

SvelteKit uses filesystem-based routing, which means that the routes of your app — in other words, what the app should do when a user navigates to a particular URL — are defined by the directories in your codebase.

Every `+page.svelte` file inside `src/routes` creates a page in your app. In this app we currently have one page — `src/routes/+page.svelte`, which maps to `/`. If we navigate to `/about`, we’ll see a 404 Not Found error.

To fix this, you can add a folder called `about` in your `routes` folder, and then add another `+page.svelte` app in it.

```html
<!-- routes/about/+page.svelte -->
<nav>
  <a href="/">home</a>
  <a href="about">about</a>
</nav>

<h1>About</h1>
<p>This is the about page.</p>
```

Unlike traditional multi-page apps, navigating to `/about` and back updates the contents of the current page, like a single-page app. This gives us the best of both worlds — fast server-rendered startup, then instant navigation. (This behaviour can be configured.)

### Layouts

Different routes of your app will often share common UI. Instead of repeating it in each +page.svelte component, we can use a `+layout.svelte` component that **applies to all routes in the same directory**. In this file, the `{@render children()}` tag is where the page content will be rendered:

```html
<!-- routes/+layout.svelte -->

<script lang="ts">
  let { children } = $props();
</script>

<nav>
  <a href="/">home</a>
  <a href="/about">about</a>
</nav>

{@render children()}
```

A `+layout.svelte` file applies to **every child route**, including the sibling `+page.svelte` (if it exists). You can nest layouts to arbitrary depth.

### Route parameters

To create routes with dynamic parameters, use square brackets around a valid variable name. For example, a file like `src/routes/blog/[slug]/+page.svelte` will create a route that matches `/blog/one`, `/blog/two`, `/blog/three` and so on.

Multiple route parameters can appear within one URL segment, as long as they are **separated by at least one static character**: `foo/[bar]x[baz]` is a valid route where `[bar]` and `[baz]` are dynamic parameters.

## Loading data

### Page data

At its core, SvelteKit’s job boils down to three things:

1. Routing — figure out which route matches an incoming request
2. Loading — get the data needed by the route
3. Rendering — generate some HTML (on the server) or update the DOM (in the browser)

We’ve seen how routing and rendering work. Let’s talk about the middle part — loading.

Every page of your app can declare a load function in a `+page.server.js` file alongside the `+page.svelte` file. As the file name suggests, this module **only ever runs on the server**, including for client-side navigations.

```js
// routes/blog/+page.server
import { posts } from "./data.js";

export function load() {
  return {
    summaries: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
    })),
  };
}
```

We can then access this data in `src/routes/blog/+page.svelte` via the `data` prop:

```html
<!-- routes/blog/+page.svelte -->
<script lang="ts">
  let { data } = $props();
</script>

<h1>blog</h1>

<ul>
  {#each data.summaries as { slug, title }}
  <li><a href="/blog/{slug}">{title}</a></li>
  {/each}
</ul>
```

And in another page:

```js
// routes/blog/[slug]/+page.server.js
import { posts } from "../data.js";

export function load({ params }) {
  const post = posts.find((post) => post.slug === params.slug);

  return {
    post,
  };
}
```

> Notice how we can access the `slug` parameter in the `load` function as we desctructur `{params}`.

And then again, use this returned data in the page:

```html
<!-- routes/blog/[slug]/+page.server.js -->
<script lang="ts">
  let { data } = $props();
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
```

There’s one last detail we need to take care of — the user might visit an invalid pathname like `/blog/nope`, in which case we’d like to respond with a **404 page**:

```js
// routes/blog/[slug]/+page.server.js
import { error } from "@sveltejs/kit";
import { posts } from "../data.js";

export function load({ params }) {
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) error(404);

  return {
    post,
  };
}
```

We’ll learn more about error handling in later chapters.

### Layout data

Just as `+layout.svelte` files create UI for every child route, `+layout.server.js` files load data for every child route.

Suppose we’d like to add a ‘more posts’ sidebar to our blog post page. We could return `summaries` from the load function in `src/routes/blog/[slug]/+page.server.js`, like we do in `src/routes/blog/+page.server.js`, but that would be repetitive.

Instead, let’s rename `src/routes/blog/+page.server.js` to `src/routes/blog/+layout.server.js`. Notice that the `/blog` route continues to work — `data.summaries` is still available to the page.

The layout (and any page below it) inherits `data.summaries` from the parent `+layout.server.js`.

When we navigate from one post to another, we only need to load the data for the post itself — the layout data is still valid. See the documentation on invalidation here: https://svelte.dev/docs/kit/load#Rerunning-load-functions

## Headers and cookies

### Setting headers

Inside a `load` function (as well as in form actions, hooks and API routes, which we’ll learn about later) you have access to a `setHeaders` function, which — unsurprisingly — can be used to set headers on the response.

Most commonly, you’d use it to customise caching behaviour with the `Cache-Control` response header, but for the sake of this tutorial we’ll do something less advisable and more dramatic:

```js
export function load({ setHeaders }) {
  setHeaders({
    "Content-Type": "text/plain",
  });
}
```

### Reading and writing cookies

The `setHeaders` function can’t be used with the `Set-Cookie` header. Instead, you should use the `cookies` API.

In your `load` functions, you can read a cookie with `cookies.get(name, options)`:

```js
export function load({ cookies }) {
  const visited = cookies.get("visited");

  return {
    visited: visited === "true",
  };
}
```

To set a cookie, use `cookies.set(name, value, options)`. It’s strongly recommended that you explicitly configure the `path` when setting a cookie, since browsers’ default behaviour — somewhat uselessly — is to set the cookie on the parent of the current path. So do this as a better practice:

```js
export function load({ cookies }) {
  const visited = cookies.get("visited");

  cookies.set("visited", "true", { path: "/" });

  return {
    visited: visited === "true",
  };
}
```

Calling `cookies.set(name, ...)` causes a `Set-Cookie` header to be written, but it also updates the internal map of cookies, meaning any subsequent calls to `cookies.get(name)` during the same request will return the updated value. Under the hood, the `cookies` API uses the popular `cookie` package — the options passed to `cookies.get` and `cookies.set` correspond to the `parse` and `serialize` options from the `cookie` documentation. SvelteKit sets the following defaults to make your cookies more secure:

```js
{
	httpOnly: true,
	secure: true,
	sameSite: 'lax'
}
```

## Shared modules

Because SvelteKit uses directory-based routing, it’s easy to place modules and components alongside the routes that use them. A good rule of thumb is ‘put code close to where it’s used’.

Sometimes, code is used in multiple places. When this happens, it’s useful to have a place to put them that can be accessed by all routes without needing to prefix imports with `../../../../`. In SvelteKit, that place is the `src/lib` directory. Anything inside this directory can be accessed by any module in src via the `$lib` alias.

```js
// .js file located in src/lib
export const message = "hello from $lib/message";
```

```html
<!-- component file located in 'routes' folder in 'src' -->
<script>
  import { message } from "$lib/message.js";
</script>
```

## Forms

In the chapter on loading data, we saw how to get data from the server to the browser. Sometimes you need to send data in the opposite direction, and that’s where `<form>` — the web platform’s way of submitting data — comes in.

Imagine you have this form:

```html
<!-- src/routes/+page.svelte -->
<form method="POST">
  <label>
    Add a todo:
    <input name="description" autocomplete="off" />
  </label>
</form>
```

If you fill in the form and hit Enter, the form will be submitted through a `POST` request. You need to define an appropriate server-side action to handle this `POST` request:

```js
// src/routes/+page.server.js
import * as db from "$lib/server/database.js";

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    db.createTodo(cookies.get("userId"), data.get("description"));
  },
};
```

The `request` is a standard Request object; `await request.formData()` returns a `FormData` instance.

Notice that we haven’t had to write any `fetch` code or anything like that — data updates automatically. And because we’re using a `<form>` element, this app would work even if JavaScript was disabled or unavailable.

### Named form actions

A page that only has a single action is, in practice, quite rare. Most of the time you’ll need to have multiple actions on a page. In this app, creating a todo isn’t enough — we’d like to delete them once they’re complete.

Take the actions object from the previous example and replace our default action with named `create` and `delete` actions:

```js

```
