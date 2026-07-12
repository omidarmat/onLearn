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

Imagine you have this component:

```jsx
function FormData() {
  return (
    <div>
      <button>Go back</button>
      <form aria-label="form">
        <button>Save</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
```

Then to test this:

```jsx
import { within, screen, render } from "@testing-library/react";

test("form displays two buttons", () => {
  render(<FormData />);

  const form = screen.getByRole("form");
  const buttons = within(form).getAllByRole("button");

  expect(buttons).toHaveLength(2);
});
```

If you are working on a project where you would want to write tests like above so many times, you would probably want to create your own custom matcher. A function that is going to work as a custom matcher will get called automatically with the value or element that gets passed into the `expect` function. Any arguments you call your own matcher with, will be received as the next arguments inside the matcher definition. You should also extend the `expect` function to be aware of your custom matcher.

```js
function toContainRole(container, role, quantity = 1) {
  const elements = within(container).queryAllByRole(role);

  if (elements.length === quantity) {
    return {
      pass: true,
    };
  }

  return {
    pass: false,
    message: () =>
      `Expected to find ${quantity} ${role} elements. Found ${elements.length} instead.`,
  };
}

expect.extend({ toContainRole });
```

```jsx
import { within, screen, render } from "@testing-library/react";

test("form displays two buttons", () => {
  render(<FormData />);

  const form = screen.getByRole("form");
  const buttons = within(form).getAllByRole("button");

  expect(form).toContainRole("button", 2);
});
```

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

## The Act function

Many times when you're testing your components you will get an error or warning about the `act` function. This will occur frequently if you're doing data fetching in a `useEffect` hook in your component.

There are several things to understand here.

### Unexpected state updates

Take this component as example:

```jsx
function UserList() {
  const [sholdLoad, setShouldLoad] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (shouldLoad) {
      fetchUsers().then((data) => setUsers(data));
    }
  }, [shouldLoad]);

  return <button onClick={() => setShoudLoad(true)}>Load</button>;
}
```

And also this test:

```jsx
test("clicking the button loads users", () => {
  render(<UsersList />);

  const button = screen.getByRole("button");
  user.click(button);

  const users = screen.getAllByRole("listitem");
  expect(users).toHaveLength(3);
});
```

This test would fail because here is what happens in the test:

1. Simulate click on button
2. Click handler runs
3. `shouldFetch` state updates
4. Fake data fetching occurs
5. Screen is immediately checked for users (while actually it should await pending data fetch)
6. No user found! Test failed!
7. Time passes while data is still being fetched
8. Fake data fetch is done
9. `users` state gets updated
10. Users become visible on the screen, but the test has already failed some time ago.

### The `act` function

The act function is implemented by the `react-dom`. It defines a window in time where state updates can (and should) occur.

If you were to update the test mentioned above with `act` and without the `@testing-library/react` you would probably do:

```jsx
test("clicking the button loads users", () => {
  act(
    // Tells our tests that we expect state to be changed because of this
    () => {
      render(<UsersList />, container)
    }
  )

  const button = document.querySelector('button');
  await act(async () => {
    // React will process all state updates + useEffects before exiting the act function
    button.dispatch(new MouseEvent('click'));
  })

  const users = document.querySelectorAll('li');
  expect(users).toHaveLength(3)
})
```

Now this would happen during your test:

1. Simulate click on button
2. Click handler runs
3. `shouldFetch` state updates
4. Fake data fetching occurs
5. Act waits for the state updates
6. Fake data request finishes
7. `user` state updates
8. Users become visible on the screen
9. Checking for users
10. Users found! Test pass!

### `@testing-library/react` uses `act` behind the scenes

When you use these methods and functions from the `@testing-library/react` library:

- `screen.findBy...` (async by nature)
- `screen.findAllBy...` (async by nature)
- `waitFor` (async by nature, and takes up about 1 second by default)
- `user.keyboard` (sync)
- `user.click` (sync)

The library will automatically call `act` for you behind the scenes. This is the preferred and recommended way of using `act` when using the `@testing-library/react`.

Whenever you receive a warning in your test terminal about using `act`, just avoid using `act` and instead, use testing library's functions and methods mentioned in the list above.

### Overall options to solve act warning

From best to worst, follow this list:

1. Use a `findBy` or `findAllBy` to detect when the component has finished its data fetching
2. Use an `act` to control when the data fetching gets resolved.
3. Use a module mock to avoid rendering the troublesome component.
4. Use an `act` with a `pause`.

## Test Hooks

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

## Testing a component with data fetching

In almost any React project your data fetching is most probably done using `axois` and a query manager like `@tanstack/react-query` or `swr`. They are normally used inside a hook like `useRepositories` like:

```js
async function handler([url, searchQuery]) {
  const res = await axios.get(url, {
    params: {
      q: searchQuery || "",
    },
  });

  return res.data.items;
}

export default function useRepositories(searchQuery) {
  const { data, error, isLoading } = useSWR(
    searchQuery && ["/api/repositories", searchQuery],
    handler,
  );
}
```

Then this hooks is used in a React component.

```jsx
function HomeRoute() {
  const { data } = useRepositories("stars:>1000 language:javascript");

  // render JSX
}
```

When we want to test this component we should keep in mind:

1. We don't want our components to make actual network requests as this would be slow and also data coming from the API might change.
2. We should fake (mock) data fetching in tests.

Here are some options to fake data fetching in tests:

1. Mock the file that contains the data fetching code
2. Use a library to mock `fetch` to get `fetch` to return fake data
3. Create manual mock for `fetch`

In the example data fetching hook mentioned above, it can be mocked as a simple JavaScript function that upon calling, returns an object with `data`

### Mocking the data fetching hook

Following the example above, by mocking the data fetching hook, you trick the `HomeRoute` component into importing this fake code instead of the real data fetching hook.

```js
jest.mock("../hooks/useRepositories", () => {
  return () => {
    return {
      data: [{ name: "react" }, { name: "bootstrap" }, { name: "javascript" }],
    };
  };
});
```

The downside of this approach is that the interaction between our data fetching hook and the component is left untested. We cannot know if we're using the hook correctly. The benefit of this approach is that it is easy to implement the test and you don't need to understand how the hook is doing its job.

### Use a library to mock `fetch`

To fake the `fetch` function, you can use a library called `msw`. This library intercepts all requests initialized by `fetch` and returns a fake response. This way all data fetching processes can work normally in the testing environment.

Here is a checklist to setup `msw`:

1. Create a test file
2. Understand the exact URL, method, and return value of requests that your component will make
3. Create a MSW handler to intercept that request and return some fake data for your component to use
4. Set up the `beforeAll`, `afterEach`, and `afterAll` hooks in your test file
5. In a test, render the component, wait for an element to be visible as a result of data fetching.

```js
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, scree } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute";

const handlers = [
  rest.get("/api/repositories", (req, res, ctx) => {
    const lanaguge = req.url.searchParams.get("q").split("language:")[1];

    return res(
      ctx.json({
        items: [
          { id: "id-1", full_name: `${language}_one` },
          { id: "id-2", full_name: `${language}_two` },
        ],
      }),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.reserHandlers();
});

afterAll(() => {
  server.close();
});

test("renders two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>,
  );

  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];

  for (let lang of languages) {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${lang}_`),
    });

    expect(links).toHaveLength(2);
  }
});
```

#### Issue with sharing fake handlers

You would most probably not want to share the fake fetch handlers for all your tests. You are going to find out very soon that each test will need its own customized fake data fetch response. So instead of sharing your handlers across all your tests, refactor the code for handler and server setup.

We would want the server and handler setup code to be used as simple as this:

```js
createServer([
  {
    path: "/api/repositories",
    method: "get",
    res: (req, res, ctx) => {
      return {
        items: [
          { id: "id-1", full_name: `${language}_one` },
          { id: "id-2", full_name: `${language}_two` },
        ],
      };
    },
  },
]);
```

So the previous setup mentioned above can be refactored into:

```js
// src/test/server.js
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, scree } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute";


function createServer(handlerConfig) {
  const handlers = handlerConfig.map(config => {
    return rest[config.method || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(
        config.res(req, res, ctx)
        ))
    })
  })

  const server setupServer(...handlers)

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })
}
```

#### Issue with data caching in query manager libraries

Some query managing libraries such as Tanstack Query or SWR implements a rather aggressive caching strategy behind the scenes. This would cause serious bugs and problems that are hard to recognize when running multiple tests that performs data fetching during the process.

The solution to this matter is to render the component that is being tested each time with a **clean cache provider**. To implement the fix, as for the SWR library, you need to wrap the component that you're testing within a `<SWRConfig>` component and also wrap each of your test cases in separate `describe` test suits:

```jsx
describe("when user is signed in", async () => {
  createServer([
    {
      path: "/api/repositories",
      method: "get",
      res: (req, res, ctx) => {
        return {
          items: [
            { id: "id-1", full_name: `${language}_one` },
            { id: "id-2", full_name: `${language}_two` },
          ],
        };
      },
    },
  ]);

  test("sign in and sign up are not visible", () => {
    render(
      <SWRConfg value={{ provider: () => new Map() }}>
        <AuthButtons />
      </SWRConfig>
    )
  });

  test("sign out button is visible", () => {
    // some other test
  });
});
```

By wrapping the `createServer` function call (which calls test hooks inside it), we limit the scope of test hooks executions to the `describe` function. When the test suite is done executing, the `afterAll` hook will run and the next `describe` suite will start by calling the `beforeAll` hook and therefore, initializing a new MSW server. This way each test will render the cache clean and will also each describe suite will initialize and clean up its own scope.

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

### Testing a component with links

In almost all React apps, you use a library for your application's routing. That library would be something like React Router DOM that needs to wrap you whole application in a context. Libraries like this normally provide you with a `<Link>` component that you will use throughout your project instead of using the HTML `<a>` element. For these `<Link>` components to work, they should always be used and rendered where they have access to that wrapper context no matter it is in the production environment or testing environment.

React Router DOM library provides you with multiple router options that you can use either in production or your tests:

- `BrowserRouter`: Stores current URL in the address bar of the browser
- `HashRouter`: Stores the current URL in the `#` part of the address bar
- `MemoryRouter`: Stores the current URL in memory

So you would probably want wrap your components that you are going to test in a `MemoryRouter`.

```jsx
import { MemoryRouter } from "react-router-dom";

render(
  <MemoryRouter>
    <RepositoriesListItem />
  </MemoryRouter>,
);
```

### Testing a component with `useEffect` and `async` function

Take this component as example where some async function is getting executed inside a `useEffect` hook:

```jsx
function FileIcon({ name, className }) {
  const [klass, setKlass] = useState("");

  useEffect(() => {
    icons
      .getClass(name)
      .then((k) => setKlass(k))
      .catch(() => null);
  }, [name]);

  if (!klass) {
    return null;
  }

  return (
    <i
      role="img"
      aria-label={name}
      className={classNames(className, klass)}
    ></i>
  );
}
```

This component is used inside another component like:

```jsx
function RepositoriesListItem({ repository }) {
  const { full_name, language, description, owner, name } = repository;

  return (
    <div className="py-3 border-b flex">
      <FileIcon name={language} className="shrink w-6 pt-1" />
      <div>
        <Link to={`/repositories/${full_name}`} className="text-xl">
          {owner.login}/<span className="font-bold">{name}</span>
        </Link>
        <p className="text-gray-500 italic py-1">{description}</p>
        <RepositoriesSummary repository={repository} />
      </div>
      <div className="grow flex items-center justify-end pr-2">
        <a href={repository.html_url} aria-label="github repository">
          <MarkGithubIcon />
        </a>
      </div>
    </div>
  );
}
```

Now as you try to test the component like:

```jsx
test("shows a link to the github page for the repo", () => {
  renderComponent();

  screen.debug()
  await pause()
  screen.debug()
});

const pause = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 100)
  })
}
```

You will see that the HTML output before and after `pause` are different. So you can implement your final test like:

```jsx
test("shows a link to the github page for the repo", async () => {
  renderComponent();

  const imageElement = await screen.findByRole("img", {
    name: "JavaScript",
  });

  expect(imageElement).toBeInTheDocument();
});
```

You can also choose to mock the `FileIcon` component in your test.

```jsx
jest.mock("../FileIcon", () => {
  return () => {
    return "File icon component";
  };
});

test("shows a link to the github page for the repo", () => {
  renderComponent();
});
```

Doing this, you're actually making the `FileIcon` component to return a simple string as `File icon component` instead of the React component and all the processing it does. You will also see that you will no longer receive an `act` warning.

As a last ditch effort, you would want to use `act` with `pause` to implement the test.

```js
import { render, screen, act } from "@testing-library/react";

test("shows a link to the github page for the repo", () => {
  renderComponent();

  await act(async () => {
    await pause()
  })
});

const pause = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 100)
  })
}
```

This will also get rid of the `act` warning.
