# JavaScript testing

# Testing React applications

The general process of testing a React component consists of these steps:

1. Pick one component to test all by itself
2. Make a test file for the component
3. Decide what the important parts of the component are
4. Write a test to make sure each part works as expected
5. Run tests at the command line

## The testing environment

It is important to keep in mind that the tests always run in a NodeJS environment, and there is no browser. Whenever you call the `render` function with a component that you're going to test, a fake browser environment is created by a library called `js-dom`. Then the component is rendered, HTML is taken from it and it is placed into the fake browser environment.

## Finding elements after render

After the component is rendered, you can access rendered elements by using the `screen` object provided by the `@testing-library/react` library. The `screen` object provides us with a bunch of methods to find individual elements or a list of them. There are about 48 different methods available for querying elements in the rendered component. We will go over the most important ones.

### Different types of querying elements

We can group element querying methods into main 3 groups:

#### `getBy...`

Tries to get one target element. Throws error if no target element found. Also throws when finding more then 1 target element.

#### `getAllBy...`

Tries to get all elements matching the target. Throws error if no target element found.

#### `queryBy...`

Tries to query for a single target elemtn. Returns `null` if the cannot query the target element. Also throws when finding more then 1 target element.

#### `queryAllBy...`

Tries to query for all elements matching the target. Returns empty array if cannot query the target element.

#### `findBy...`

Await some async process in the component's functionality and keeps searching for the target element. Throws error if cannot find the target element. Also throws when finding more then 1 target element.

This query method is specifically used for components in which some data fetching is being executed and the target element should appear on the screen only after the data is successfully fetched.

Take this component as example:

```jsx
function LoadableColorList() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fakeFetchColors.then((colors) => setColors(colors));
  }, []);

  const renderedColors = colors.map((color) => <li key={color}>{color}</li>);

  return <ul>{renderedColors}</ul>;
}
```

Now let's see the test:

```jsx
test("using getAllByRole", async () => {
  render(<LoadableColorList />);

  const elements = screen.getAllByRole("listitem");

  expect(elements).toHaveLength(3);
  // This test fails because you have not awaited the data fetching async process that is being promised
});

test("favor findBy or findAllBy when data fetching", async () => {
  render(<LoadableColorList />);

  const elements = await screen.findAllByRole("listitem");

  expect(elements).toHaveLength(3);
  // This test passes because findAllByRole checks the existence of the target elements several times over a couple of milliseconds (1 sec by default)
});
```

#### `findAllBy...`

Await some async process in the component's functionality and keeps searching for all the elements matching the target. Throws error if cannot find the target element.

### When to use each

| Goal of test                           | Use                     |
| -------------------------------------- | ----------------------- |
| Prove an element exists                | `getBy`, `getAllBy`     |
| Prove an element does not exist        | `queryBy`, `queryAllBy` |
| Make sure an element eventually exists | `findBy`, `findAllBy`   |

### Querying elements with different criteria

Here is a list of criteria by which you can query for elements:

- `ByRole`: based on element's implicit or explicit ARIA role
- `ByLabelText`: based on the text their paired labels contain
- `ByPlaceholderText`: based on placeholder text of form elements
- `ByText`: based on the text the element contains
- `ByDisplayValue`: based on the current value of the input value
- `ByAltText`: based on element's `alt` attribute
- `ByTitle`: based on the element's `title` attribute
- `ByTestId`: based on the element's `data-testid` attribute

### Understanding ARIA roles

ARIA Roles clarify the purpose of an HTML element. The roles are traditionally used by screen readers. Many HTML elements have implicit or automatically assigned roles. Elements can be assigned a role manually, but even trained engineers might make mistakes in doing so. So it is generally not recommended to do so. Just keep using the pre-defined roles of HTML elements.

| ARIA Role    | Automatically applied to these HTML elements |
| ------------ | -------------------------------------------- |
| heading      | h1, h2, h3, h4, h5, h6                       |
| list         | ul, li                                       |
| button       | button                                       |
| link         | a                                            |
| textbox      | input of type text                           |
| rowgroup     | thead, tbody                                 |
| row          | tr                                           |
| columnheader | th                                           |
| cell         | td                                           |
| contentinfo  | footer                                       |
| img          | img                                          |
| checkbox     | input of type checkbox                       |
| spinbutton   | input of type number                         |
| radio        | input of type radio                          |
| listitem     | li                                           |
| banner       | header                                       |

### Querying elements by labels

Querying rendered elements by label is generally used for elements that have attached `<label>` elements in the HTML. When you have such an HTML structure:

```html
<div>
  <label htmlFor="name">Name</label>
  <input id="name" value="{name}" onChange="{(e)" ="" />
  setName(e.target.value)} />
</div>
```

You can query for the `input` element using its attached label:

```js
screen.getByLabelText(/enter email/i);
```

### Querying elements `within` other elements

Sometimes you need to query for some elements that you know must be rendered inside another element. In these cases, you should query and find the parent element:

```js
const tableBody = screen.getByTestId("users");
```

Then use `within` to query for elements inside the parent element:

```js
const rows = within(tableBody).getAllByRole("row");
```

### Querying elements with nothing but icons

Many times you would have a button element in your app that has no text content, but it has an SVG icon inside it. To be able to query these kinds of elements, you can use `aria-label` attribute on them:

```jsx
<button aria-label='login'>
  <svg />
<button>

<button arial-label='sign up'>
  <svg />
<button>
```

You can then query these buttons using:

```js
const signupButton = screen.getByRole("button", {
  name: /sign up/i,
});
```

### Fallbacks

Sometimes querying elements by role doesn't work well. In these cases, you can fall back to 2 escape hatches to find elements:

1. `data-testid`: By setting an attribute of `data-testid` on an element, you can query the element using `screen.getByTestId()`. Generally, it is not recommended to add an attribute to your application elements just for the purpose of testing.
2. `container.querySelector()`: The `render` function that you normally use to render your component in a test, returns a couple of helper objects. One of them is a `container` object. This is a reference to a HTML element that is automatically added into your component. It is usually a `div` element that wraps up your entire component. You can use this `container` object and query for elements in it using `container.querySelector()`.

```js
const table = container.querySelector("table");
// Attempting to find a <table> element within the container
```

> It is generally recommended to avoid these 2 fallbacks unless you really have no other choice.

## Simulating user interactions

Generally, when a user action alters some thing in the component, you might want to test the result of that action. To simulate user actions in the testing environment, you need to use the `user` object from the `@testing-library/user-event` library.

You can then use methods available on the `user` object as:

```js
user.click(nameInput);
user.keyboard("omid");

user.click(emailInput);
user.keyboard("omidarmat@gmail.com");
```

> Notice that user interaction methods are not `async` and you don't need to `await` them.

## Understanding JEST matchers

Whenever you want to make an assertion you are going to use `expect` function and pass the value you want to make an assertion on into it. Then you chain an assertion method or _matcher_ on it.

Here is a list of matchers provided by the `jest` library:

- `toHaveLength()`: Make sure the value is an array with a particular length
- `toEqual()`: Make sure the value equals another value
- `toContain()`: Make sure an array contains a value, or make sure a string contains another string
- `toThrow()`: Make sure a function throws an error when called
- `toHaveBeenCalled()`: Make sure a mock function has been called

Here is a list of matchers provided by the `@testing-library/react` library:

- `toBeInTheDocument()`: Make sure element is present on the page
- `toBeEnabled()`: Make sure an element (like an input) is not disabled
- `toHaveClass()`: Make sure an element has a class name
- `toHaveTextContent()`: Make sure an element has some particular text
- `toHaveValue()`: Make sure an input, select, or textarea has a value

### Creating your own matchers

## Mock functions

Many times in a React component you need to test and verify that a certain function either gets called or it gets called `n` times, or it gets called with some specific arguments. It turnes out that this is a testing scenario that is frequently applied in tests. So `jest` has provided us with a nice way of implementing this.

In these cases, you need to **mock** the target function. A mock function is a fake version of you own function that actually does not do anything. It just records whenever it gets called and it also records the arguments it was called with. You can then implement assertions on whether the mock function is called and if it was called with specific arguments.

You mock a function simply by:

```js
const mock = jest.fn();
```

Then to make assertions on this mock function you can:

```js
expect(mock).toHaveBeenCalled();
expect(mock).toHaveBeenCalledTimes(2);
expect(mock).toHaveBeenCalledWith({ name: "omid", email: "omid@gmail.com" });
```

## Testing Hooks

You are going to notice some setup code that gets repeated in all the tests written in a single test file. You might think of using a `beforeAll` or `beforeEach` hook to refactor that setup code into, but in most cases, you just need to refactor the code into a simple JavaScript function.

As an example, you might want to put the rendering of your component in a hook, but that is not recommended:

```js
function renderComponent() {
  const users = [
    {
      name: "omid",
      email: "omidarmat@gmail.com",
    },
    {
      name: "parisa",
      email: "parisapourmahdi@gmail.com",
    },
  ];
  // Render component
  render(<UserList users={users} />);

  // You can also return some data from it and use it in your tests for assertions
  return { users };
}
```

You can then call this function in all of your tests:

```js
test("render the email and name of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
```

### `beforeAll()`

### `beforeEach()`

### `afterEach()`

### `afterAll()`

## Testing debugger

In any part of your testing code, you can use `screen.debug()` in order to display the rendered HTMl at that specific point of your testing code. Under the hood, it uses a `console.log()` to print the HTML output into the terminal.

## Examples

### Testing a form component

Take this form component as an example:

```jsx
import React, { useState } from "react";

export default function UserForm({ onUserAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onUserAdd({ name, email });

    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit">Add user</button>
    </form>
  );
}
```

This could be one test for this component:

```jsx
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("shows 2 inputs and 1 button", () => {
  // Render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Assertion
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});
```

Here is another test which focuses on user interaction:

```jsx
test("calls onUserAdd when the form is submitted", async () => {
  const mock = jest.fn();

  // Render component
  render(<UserForm onUserAdd={mock} />);

  // Find 2 inputs
  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  // Simulate typing in a name
  user.click(nameInput);
  user.keyboard("omid");

  // Simulate typing in an email
  user.click(emailInput);
  user.keyboard("omidarmat@gmail.com");

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  user.click(button);

  // Assertion to make sure onUserAdd gets called with email and name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "omid",
    email: "omidarmat@gmail.com",
  });
});
```
