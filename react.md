- [**A first look at react**](#a-first-look-at-react)
  - [**Why do front-end frameworks exist?**](#why-do-front-end-frameworks-exist)
  - [**What is React?**](#what-is-react)
  - [**Setting up a new React project: The options**](#setting-up-a-new-react-project-the-options)
    - [**Setting up a project with `create-react-app`**](#setting-up-a-project-with-create-react-app)
    - [**Setting up a project with Vite**](#setting-up-a-project-with-vite)
      - [**A professional file structure**](#a-professional-file-structure)
- [**Core concepts of building React apps**](#core-concepts-of-building-react-apps)
  - [**JSX**](#jsx)
    - [**Declarative JSX**](#declarative-jsx)
      - [**Imperative appraoch**](#imperative-appraoch)
      - [**Declarative appraoch**](#declarative-appraoch)
    - [**Rules of JSX**](#rules-of-jsx)
    - [**Extracting JSX into a new component**](#extracting-jsx-into-a-new-component)
  - [**Components**](#components)
    - [**Rendering the `root` component and strict mode**](#rendering-the-root-component-and-strict-mode)
    - [**Creating and reusing a component**](#creating-and-reusing-a-component)
      - [**Using public assets in components**](#using-public-assets-in-components)
      - [**Implementing JavaScript logic in components**](#implementing-javascript-logic-in-components)
    - [**Moving components into separate files**](#moving-components-into-separate-files)
    - [**Component composition**](#component-composition)
  - [**Props**](#props)
    - [**Props make one-way data flow**](#props-make-one-way-data-flow)
    - [**Passing and reciving props**](#passing-and-reciving-props)
      - [**Rendering lists with props**](#rendering-lists-with-props)
      - [**Conditional rendering**](#conditional-rendering)
        - [**With `&&`**](#with-)
        - [**With ternary operator**](#with-ternary-operator)
        - [**With multiple `return` statements**](#with-multiple-return-statements)
      - [**Prop drilling**](#prop-drilling)
      - [**PropTypes**](#proptypes)
    - [**Props as an API**](#props-as-an-api)
  - [**Effects**](#effects)
    - [**Effects vs. event handlers**](#effects-vs-event-handlers)
      - [**Syncronization and lifecycle**](#syncronization-and-lifecycle)
      - [**When are effects executed?**](#when-are-effects-executed)
    - [**Dependancy array**](#dependancy-array)
    - [**Cleanup functions**](#cleanup-functions)
      - [**When to use a cleanup function?**](#when-to-use-a-cleanup-function)
    - [**Effect use cases**](#effect-use-cases)
      - [**Fetching data in React**](#fetching-data-in-react)
        - [**The wrong way**](#the-wrong-way)
        - [**The `useEffect` hook: the correct way**](#the-useeffect-hook-the-correct-way)
        - [**Handling errors**](#handling-errors)
        - [**Preventing race conditions**](#preventing-race-conditions)
      - [**Listening for keypress event on the document object**](#listening-for-keypress-event-on-the-document-object)
    - [**RECAP**](#recap)
  - [**The Context API**](#the-context-api)
    - [**The provider**](#the-provider)
    - [**The value**](#the-value)
    - [**Consumers**](#consumers)
    - [**Creating and providing a context**](#creating-and-providing-a-context)
    - [**Advanced pattern: A custom provider and hook**](#advanced-pattern-a-custom-provider-and-hook)
  - [**Performance Optimization**](#performance-optimization)
  - [**React Fragments**](#react-fragments)
  - [**Styling React applications**](#styling-react-applications)
    - [**Inline styling**](#inline-styling)
    - [**External CSS or Sass**](#external-css-or-sass)
    - [**CSS modules**](#css-modules)
      - [**Global CSS**](#global-css)
    - [**CSS-in-JS**](#css-in-js)
    - [**Utility-first CSS**](#utility-first-css)
    - [**No CSS!**](#no-css)
  - [**Separation of concerns in React**](#separation-of-concerns-in-react)
  - [**Routing and Single-Page Applications (SPA)**](#routing-and-single-page-applications-spa)
- [**State, Events and Forms: interactive components**](#state-events-and-forms-interactive-components)
  - [**Handling events**](#handling-events)
  - [**State in React**](#state-in-react)
    - [**Mechanics of state**](#mechanics-of-state)
    - [**State guidelines**](#state-guidelines)
    - [**Working with a state variable**](#working-with-a-state-variable)
    - [**Forms and handling submissions**](#forms-and-handling-submissions)
      - [**Creating a form**](#creating-a-form)
      - [**Form Events**](#form-events)
      - [**Controlled elements**](#controlled-elements)
  - [**Review: State vs. Props**](#review-state-vs-props)
- [**Thinking in React**](#thinking-in-react)
  - [**Thinking: State management (Basic)**](#thinking-state-management-basic)
    - [**Types of state (accessibility)**](#types-of-state-accessibility)
    - [**When and where?**](#when-and-where)
    - [**Lifting state**](#lifting-state)
    - [**Derived state**](#derived-state)
  - [**Thinking: State management (Advanced)**](#thinking-state-management-advanced)
    - [**Types of state**](#types-of-state)
    - [**Where to place state**](#where-to-place-state)
    - [**State management tool options**](#state-management-tool-options)
  - [**Thinking: Components**](#thinking-components)
    - [**Splitting a UI into components**](#splitting-a-ui-into-components)
      - [**When to create a new component?**](#when-to-create-a-new-component)
      - [**General guidelines**](#general-guidelines)
    - [**Component categories**](#component-categories)
    - [**Component's API**](#components-api)
- [**How React works behind the scenes**](#how-react-works-behind-the-scenes)
  - [**Know more about React components, component instances and React elements**](#know-more-about-react-components-component-instances-and-react-elements)
    - [**React Component**](#react-component)
    - [**Component Instance**](#component-instance)
    - [**React element**](#react-element)
  - [**How rendering works**](#how-rendering-works)
    - [**How components are displayed on the screen**](#how-components-are-displayed-on-the-screen)
      - [**REACAP**](#reacap)
    - [**What is the `key` prop?**](#what-is-the-key-prop)
    - [**Rules for render logic**](#rules-for-render-logic)
      - [**Functional programming principles**](#functional-programming-principles)
  - [**How events work in React**](#how-events-work-in-react)
    - [**Synthetic events**](#synthetic-events)
    - [**How event handlers bahave in vanilla JavaScript and React**](#how-event-handlers-bahave-in-vanilla-javascript-and-react)
    - [**Component lifecycle**](#component-lifecycle)
      - [**Phase 1: mounting - initial render**](#phase-1-mounting---initial-render)
      - [**Phase 2: re-rendering**](#phase-2-re-rendering)
      - [**Phase 3: unmounting**](#phase-3-unmounting)
  - [**Hooks**](#hooks)
    - [**Rules of hooks**](#rules-of-hooks)
    - [**The `useState` hook**](#the-usestate-hook)
      - [**Creating state**](#creating-state)
      - [**Updating state**](#updating-state)
      - [**`useState`: some useful details**](#usestate-some-useful-details)
        - [**Initial state value only matters for initial render**](#initial-state-value-only-matters-for-initial-render)
        - [**State is always updated asynchronously**](#state-is-always-updated-asynchronously)
        - [**Initialize state with a callback function: Lazy evaluation**](#initialize-state-with-a-callback-function-lazy-evaluation)
    - [**`useRef` hook**](#useref-hook)
      - [**`useState` vs. `useRef`**](#usestate-vs-useref)
      - [**`useRef` to count something behind the scenes**](#useref-to-count-something-behind-the-scenes)
    - [**`useReducer` hook**](#usereducer-hook)
      - [**Reducers in detail**](#reducers-in-detail)
      - [**`useReducer` vs. `useState`**](#usereducer-vs-usestate)
      - [**When to use `useReducer`**](#when-to-use-usereducer)
    - [**custom hooks**](#custom-hooks)
- [**React 3rd party libraries**](#react-3rd-party-libraries)
  - [**React developer tools**](#react-developer-tools)
  - [**React Router**](#react-router)
    - [**Basic implementation**](#basic-implementation)
    - [**Linking between routes**](#linking-between-routes)
    - [**Nested routes and index route**](#nested-routes-and-index-route)
    - [**Storing state in the URL**](#storing-state-in-the-url)
      - [**Dynamic routes with URL parameters**](#dynamic-routes-with-url-parameters)
      - [**Reading and setting a query string**](#reading-and-setting-a-query-string)
    - [**Programmatic navigation with `useNavigate`**](#programmatic-navigation-with-usenavigate)
    - [**Programmatic navigation with `Navigate`**](#programmatic-navigation-with-navigate)
    - [**Data loading with React Router**](#data-loading-with-react-router)
  - [**React Query**](#react-query)
    - [**Setting up React Query**](#setting-up-react-query)
      - [**React Query Dev tools**](#react-query-dev-tools)
      - [**Fetching data**](#fetching-data)
      - [**Mutations**](#mutations)
      - [**Mutations (adding data to remote server state)**](#mutations-adding-data-to-remote-server-state)
  - [**React Hook Form**](#react-hook-form)
    - [**Handling form errors**](#handling-form-errors)
    - [**Uploading images through form**](#uploading-images-through-form)
    - [**Filling in a form with default values**](#filling-in-a-form-with-default-values)
  - [**React Hot Toast**](#react-hot-toast)
  - [**Styled Component library**](#styled-component-library)
    - [**Introducing global styles**](#introducing-global-styles)
    - [**Styled Component props and CSS function**](#styled-component-props-and-css-function)
- [**Project deployment**](#project-deployment)
  - [**First, build the application**](#first-build-the-application)
  - [**Second, deploy to Netlify**](#second-deploy-to-netlify)
  - [**Deploying to Vercel**](#deploying-to-vercel)

# **A first look at react**

We will talk about:

1. Why we need something like React?
2. What React is and how it compares to Vanilla JavaScript?
3. What are different options for setting up a new React application?
4. Use a tool called `Create-React_App` to build our very first React project.

## **Why do front-end frameworks exist?**

So why not simply use Vanilla JavaScript to build our applications?

Before around 2010 all websites were **server-side rendered** websites. A website is assembled on the backend based on data and templates. The resulting HTML, CSS, and JavaScript code is then sent to the client-side. The browser then takes this code and paints it to the screen. All websites built with Wordpress are of this kind. The JavaScript used in this kind of websites was initially only to add some simple dynamics to the page, like simple animations, hover effects, and other stuff. Usually a popular library called **jQuery** was used for this purpose.

However, developers started to write more and more JavaScript code to be executed by the browser, and this led to fully fledged web applications which then led to the rise of so-called **single-page applications**. These are webpages that are rendered on the client and not on the server.

In client-side rendering, the process of rendering a webpage is shifted from the server to the client. We call these not webpages anymore, but **web applications**. A web application gets its data from the backend, usually by consuming an **API**. The application renders the screen for each view of the application. This single-page application feels as if you were using a native desktop or phone application.

There are several problems with using Vanilla JavaScript for building large-scale applications. Keep in mind that building any front-end web application is all about **handling data** and **displaying data** in a user interface. The most important task of a single-page application (and really of any application and website) is to keep the user interface in sync with the data, or in other words, to make sure that the **UI always displays the current state of the data**. This have proved to be a hard task to perform! Without a framework, it would be virtually impossible to keep the huge amount of data in an application in sync with a super-complex UI. Why?

1. Building a complex front-end with Vanilla JavaScript alone requires large amount of direct **DOM traversing and manipulation**, and this will lead to a huge mess of spaghetti code.
2. In Vanilla JavaScript apps, **states** such as simple text or numbers are often simply **stored right in the DOM**, right in the HTML elements themselves rather in a central place in the application. This results in many parts of the app accessing and changing that DOM state directly. This will introduce many bugs into our application.

So in conclusion, this is mainly why framworks exist:

1. **Keeping a user interface in sync with data** is really hard and takes a lot of work.
2. Frameworks enforce a **correct way of structuring and writing code**, therefore contributing to solving the problem of spaghetti code.
3. Frameworks give developers and teams a **consistent way of building front-end applications**.

## **What is React?**

React is a JavaScript library for building user interfaces. But let's extend this definition. React is an extremely **popular**, **declarative**, **component-based**, **state-driven** JavaScript library for building user interfaces, created by Facebook.

- **Based on components:** components are the building blocks of user interfaces in React, such as buttons, input fields, search bars and so on. Basically, what React does is to **take components and draw them on webpages**. We build complex UIs by building and combining multiple components.
- **Declarative:** We describe how components look like and how they work using a declarative syntax called **JSX**. So React is a huge abstraction away from the DOM, we never touch the DOM. JSX is a syntax that **combines HTML, CSS, JavaScript, as well as referncing other components**. If we never touch the DOM, how does React update the UI? This is where state comes to play.
- **State-driven:** React keeps the data in sync with the UI. Let's call this data "state" from now on. Whenever the state changes, **we manually update the state in our application, and React will automatically re-render the UI to reflect the latest state**. In other words, React actually reacts to state changes by re-rendering the UI.
- **JavaScript library:** React is actually just a JavaScript library. React is only the **view** layer. We need to pick **multiple external libraries** to build a complete application, for instance, for routing or for data fetching. To address this issue, multiple frameworks have been built on top of React, such as **NextJS** and **Remix**.

## **Setting up a new React project: The options**

The two options that are available for setting up a react project:

1. **`create-react-app` tool:** a complete starter kit for React applications. The nice thing about this is that everything is already configured in it: An app created with this tool automatically comes with a development server, Webpack for module bundling, and important developer tools such as ESLint, Prettier, Jest, Babel, etc. The problem with this tool is that it was built many years ago, and uses some **slow and outdated technologies** like Webpack. So don't use this tool for real-world projects anymore. Only use for tutorials or experiments.
2. **Vite build tool:** use this tool for **real-world applications**. It is a modern build tool that contains a template for setting up React applications. This needs you to manually set up ESLint and other things. This can sometimes go wrong. So why use Vite? For its extremely **fast page refreshment** when the code changes. This is called **Hot Module Replacement (HMR)**. Also bundling is extremely fast in Vite.

But we also have other options in addition to the two options mentioned above. It is to use a React framework like **NextJS** or **Remix**. A framework like NextJS contains solutions for things like routing, data fetching, and server-side rendering, which are things that React itself does not provide easily out of the box. So a React framework is something built on top of React and makes it even easier to build applications.

This sounds great, but only for some applications. **Vanilla React applications** are still very important. It only makes sense to use React frameworks for building actual products, not for learning React.

### **Setting up a project with `create-react-app`**

Here are the steps you should follow:

1. Open up the command prompt and navigate to the directory where you want to start your project. Then type this command:

```
npx create-react-app@5 <project-name>
```

This will create a new folder with the project name defined in the command. It will also download a lot of files which will take a few minutes. As a result, you will see in the newly created folder a structured set of files and folders. This structure is designed in this way because developers thought it was the best possible structure. But it could be completely different.

```
- node_modules (dir)
- public (dir)
- src (dir)
    App.css //delete
    App.js
    App.test.js //delete
    index.css //delete
    index.js
    logo.svg //delete
    reportWebVitals.js //delete
    setupTests.js //delete
.gitignore
package.lock.json
package.json
```

In the `src` folder we have some files that we don't need and we will get rid of. So in order to create a project from scratch, we will select all files in this folder and delete them. This will make the application show you an error.

We will then create an `index.js` file in this folder. Remember that this file needs to be named `index.js` because **Webpack** expects the entry points to be called that. Inside this file, we will first import React:

```js
import React from "react";
import ReactDOM from "react-dom/client";
```

Next up, we will create our `App` component. It is not necessary to call it App, but it is necessary to start its name with a capital letter. From here on, you can go on to the [Core Concepts](#core-concepts-of-building-react-apps) section of this file.

The `public` folder contains all the assets that will end up in the final application, such as all the images and an `index.html` file that contains a `<div>` element with the id `root`. Remember that Webpack, which is the module bundler here, will automatically look into the `public` folder to find the assets of our application, such as images, etc.

### **Setting up a project with Vite**

In order to start a project with Vite, you need to insert this command in the terminal:

```
npm create vite@latest
```

However, to follow the tutorials seamlessly, we would have to use version 4 of Vite:

```
npm create vite@4
```

This will cause the terminal ask us for the name of our project, the framework and the language that we want to use. Then a folder with the name of our project will be created at the location where we opened the terminal. We would then open up VS code inside the project folder, and use this npm command to install all necessary dependencies:

```
npm install
```

This will eventually give us a file structure as:

```
- node_modules
- public
- src
  - Assets
  App.css
  App.jsx
  index.css
  main.jsx
.gitignore
index.html
package-lock.json
package.json
vite.config.js
```

> Note that the `index.html` file is outside of `public` folder.

Inside the `src` folder, we see that instead of `main.js` or `index.js` in the `create-react-app` method, we now have a `main.jsx` file as the entry point. Vite needs the extension of this file to be JSX, but there is actually no difference between `.jsx` and `.js`.

There is also an `App.jsx` file, where there are some default code written, which we get rid of and start from scratch. We also remove all `.css` files since we will introduce our own styles.

```js
// Starting a simple code in App.jsx
function App() {
  return <div>Worldwise</div>;
}

export default App;
```

Finally, in order to start developing our project, we don't use the `npm start` script. There actually is no such script implemented in the `package.json` file. We use this command instead:

```
npm run dev
```

This will run a local server, but unlike `create-react-app`, it won't open the browser. You should do it manually.

However, the great thing about `create-react-app` is that it comes with all the important dev tools installed. The most important one of those is ESLint which helps us avoid so many bugs. Building a React app without ESLint is a bit like coding half blind. So we should manually config ESLint. This can be annoying but there is no other choice.

We should first install 3 packages using the terminal command below:

```
npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
```

As they are being installed, we need to config our project to integrate it with the 3 packages. So we create a file in the root of our project called `.eslintrc.json`. We should configure ESLint's behavior in this file.

```json
// .eslintrc.json
{
  "extends": "react-app"
}
```

Then we go to `vite.config.js` file in the root where we can config our Vite project. Here we can configure everything about development and building of our project. Here we now have to add the ESLint plugin and update the code as:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
```

Now we have Vite correctly set up.

#### **A professional file structure**

To establish a professional order in your file structure, so that you will be able to manage your project files more efficiently, you can use this structure inside your `src` folder:

```
-data
-features
-hooks
-pages
-services
-styles
-ui
-utils
```

1. Features: this is for all the feature categories that we identify while planning the app, such as authentication, bookings, cabins, etc.
2. Hooks: this is for truly reusable custom hooks, which we need in multiple features
3. Pages: in big projects it is helpful to have this folder. Here we will have one component file per route. The important convention here is that each of these pages will not have any side effect. Instead, they will delegate their functionalities to the components that are associated with the feature. We need to create these pages once, and then we can completely forget about them.
4. Services: this contains some code for interacting with APIs.
5. Styles: this contains code regarding CSS.
6. UI: this is for all the components that don't belong to any of the features or those that we want to reuse in many different features, like inputs, forms, buttons, tables, etc.
7. Utils: usually contains some helper code.

# **Core concepts of building React apps**

We will talk about **Components**, **Props**, and **JSX**. We will learn how components are the building blocks of React applications and how to create and reuse them using the powerfull JSX syntax.

We will also share data between components using Props and learn about rendering **lists**, **conditional rendering**, and more. Looking at a React app, there is nothing that is not a component, or at least not inside of some component. As mentioned before, what React does is to basically take components and draw them on to a webpage. In technical terms, React renders a "View" for each component, and all these views together make up the UI.

It is important to remember that each component has its own:

1. Data (props)
2. JavaScript Logic
3. Appearance (JSX)

## **JSX**

JSX is a declarative syntax to describe how components look like and how they work based on their data and logic. In practice, this means that each component must return one block of JSX, which React will then use to render the component on the UI.

JSX is similar to HTML, but it is actually an extension of JavaScript that allows us to embed JavaScript, CSS, and React components into HTML.

If react is a JavaScript framework, how does it understand this HTML-looking code? Remember that JSX is an extension of JavaScript, which means that there is a simple way of converting JSX to JavaScript. This is done by **Babel**, which was automatically included in our application by `create-react-app`.

Each JSX element is converted to a `React.createElement()` function call. Remember that browsers don't understand JSX, they only understand HTML. So our JSX is converted into `createElement()` function calls, which in the end creates the HTML elements that we see on the screen.

### **Declarative JSX**

Let's first review what is imperative, in order to understand what is declarative.

#### **Imperative appraoch**

When we try to build UIs using Vanilla JavaScript we use an imperative approach. It means that we manually select elements, traverse the DOM, and attach event handlers to elements. Then as soon as an event happens, we give the browser a step-by-step instruction on how to mutate DOM until we reach the desired UI.

So in the imperative approach, we tell the browser exactly **how to do things**. However, doing this in a complex app is virtually impossible! So we use React in order to implement a declarative approach.

#### **Declarative appraoch**

Declarative approach means to describe what the UI should look like at all times, always based on the current data that is in the component. We know that this data is actually **props** and **state**. So basically, we use JSX to describe the UI based on props and state. All this, happens without any DOM manipulation at all!

So in the declarative approach, we tell the browser **what we want to achieve**. It helps us developers to never think of touching the DOM. Instead, we should only think of the UI as a reflection of the current data.

### **Rules of JSX**

1. JSX works essentially like HTML, but we can enter JavaScript mode by using `{}`.
2. Inside the JavaScript mode, we can place any JavaScript expressions. Example: reference variables, create arrays or objects, `.map()`, ternary opertor. But statements are not allowed (`if/else`, `for`, `switch`)
3. A piece of JSX produces a JavaScript expression. By that we mean that this:

```js
const el = <h1>Hello React!</h1>;
```

is converted to:

```js
const el = React.createElement("h1", null, "Hello React!");
```

This fact has 2 important implications:

- We can place other pieces of JSX inside `{}`
- We can write JSX anywhere inside a component (in `if/else`, assign to variables, pass it into functions)

4. A piece of JSX can only have one, and exactly one root element. If you need more, use `<React.Fragment>`. Also note that when you open a `return` statement to return a JSX, you must always start with a JSX element. You cannot immediately enter JavaScript mode by `{}`. You will have to first open a `<div>` element, and then inside that, you can enter JavaScript mode.

### **Extracting JSX into a new component**

Let's talk on the `Footer` component example. As we notice that the JSX inside this component is growing too much, we can extract JSX into another component. We simply define another component that returns a JSX.

```js
function Order(props) {
  return (
    <div className="order">
      <p>
        We're open until {props.closeHour}:00. Come visit us or order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
```

We would obviously have to udpate the `Footer` component like this:

```js
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour} and {closeHour}
        </p>
      )}
    </footer>
  );
}
```

So we take out a part of the JSX, and replace it with the result of calling the `Order` component by passing the `closeHour` prop into it, because it depends on it.

## **Components**

Components are the most fundamental concept in React. React applications are entirely made out of components. Each component is a self-contained piece of the UI which contains its own data, JS logic, and appearance (JSX).

In a real-world application, we can identify main components, and if we look with more precision, we can also identify some smaller components inside other major components. In React applications, it is very normal to **nest** components inside other components.

These nested components may be of the **list** type, which means that their appearance is the same, but their data is different. So they are actually the same component that is being reused to display varying information. This can be handled using **props** which enables us to pass data between components.

One thing that can help to analyze our components is the component tree which clarifies the hierarchy that exists between the components (parent and child components).

### **Rendering the `root` component and strict mode**

Inside the `index.js` file which we normally place inside the `src` folder of our project, we first import `React` and `ReactDOM` libraries.

```js
import React from "react";
import ReactDOM from "react-dom/client";
```

Then we add the first component which is usually called `App` and its name needs to start with a capital letter.

```js
function App() {
  return <h1>Hello React!</h1>;
}
```

Now in order to render this component to the DOM, we would have to use the `createRoot` method that is available on `ReactDOM`. This method receives as argument the `<div>` element with the ID `root` in the `index.html` file which is currently located in the `public` folder.

> We are not allowed to return more than one element in a single JSX. If we want to include more than one element, we would have to wrap them in one single parent element, like a `div`. This can also be handled using React [fragments]().

```js
const root = ReactDOM.createRoot(document.getElementById("root"));
```

Now this `root` object has the `render` method available on it, and we can use it to render our `App` component. The `render` method accepts JSX as argument.

```js
root.render(<App />);
```

Now to activate **strict mode**, we can do the rendering in another way. So instead of directly rendering the `App` component as the root component, we can wrap the `App` component inside a `React.StrictMode` component.

```js
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

The only thing that strict mode does is that during development, it will render our components twice to find certain bugs and to check if we are using outdated parts of the React API.

We can now start our project using the NPM command below, since it is already defined as an NPM script in the `package.json` file.

```
npm run start
```

### **Creating and reusing a component**

In React, we write new components using functions. Also, there are 2 important rules as we define components as functions.

1. The function name needs to start in **uppercase**.
2. The function needs to return some **markup**, usually in the form of JSX, but we can also return nothing, like `null`.

```js
function Pizza() {
  return <h2>Pizza</h2>;
}
```

Up until this point this component cannot appear in the UI since we are not incluing this new component anywhere. We can include this in our main component which is usually called `App`. This way we are actually **nesting** the `Pizza` component inside the `App` component.

```js
function App() {
  return <h1>Hello React!</h1><Pizza />;
}
```

> Nesting a component inside another component never means to write the child component's function inside the parent component function. The two functions should be written separately, but the child component will be called or inserted into the parent component as an element. Of course, React will still work if we put the child function inside the parent function, but it is a really bad practice.

But remember that each component can only return one element. So the `<h1>` and the `<Pizza />` element should be wrapped in another element, like a `<div>`.

```js
function App() {
  return (
    <div>
      <h1>Hello React!</h1>
      <Pizza />
    </div>
  );
}
```

The `Pizza` component is now **reusable**, meaning that we can include its returned JSX in any of our other components simply by inserting the `<Pizza />`. For now, this will re-render the `Pizza` component with the same data over and over, but we can update it each time we insert it by using [**props**](#using-props-in-a-component).

#### **Using public assets in components**

In order to use an image inside a component we include an `<img/>` tag in the `return` statement of the component. Note that if we are actually returning more than one elements, we should wrap them all in another whole `<div>` element.

```js
function Pizza() {
  return (
    <div>
      <img src="pizzas/spinaci.jpg" alt="Pizza spinaci" />
      <h2>Pizza Spinaci</h2>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p>
    </div>
  );
}
```

> When writing the address to a specific image, you should consider the `public` folder as the root directory and start the image file path from that root.

#### **Implementing JavaScript logic in components**

This will include writing JavaScript logic in components. Until this point, we have already written some JavaScript logic, but it was only inside JSX. But since components are JavaScript functions, we can do any JavaScript code inside them.

```js
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  return (
    <footer>{new Date().toLocaleTimeString()}, We're currently open!</footer>
  );
}
```

Notice how we have used regular JavaScript logic before returning the JSX. Also keep in mind that in order to implement JavaScript logic in JSX, we should always insert the JavaScript code inside `{}`.

> You will probably receive every result twice, and that is becasue of the strict mode.

### **Moving components into separate files**

We take the component code from the main `App.js` file and put it in a separate file in the `src` folder of our project. It is a good practice to call the new file with the same name as the component. For instance, if we are taking the `Logo` component to a separate file, we call the new file `Logo.js`.

Inside the `Logo.js` file we `export default` the component, and then import it in the main `App.js` file.

### **Component composition**

Component composition is all about reusability. We have talked about a way of creating and reusing a component, but that would introduce a problem regarding reusability.

Imagine we have a `Modal` component that uses another component called `Success` like this:

```js
function Modal() {
  return (
    <div className="modal">
      <Success />
    </div>
  );
}

function Success() {
  return <p>Well done!</p>;
}
```

This way of using a component inside another component actually makes the `Modal` component un-reusable. The Component composition technique can be used to fix this problem. This technique involves combining different components using the `children` prop (or explicitly defined props).

This is how we should implement component composition in order for the `Modal` component to be reusable:

```js
function Modal({ children }) {
  return <div className="modal">{children}</div>;
}
```

Now we can use this `Modal` component anywhere with any content that we want. We previously passed a success message into it, but we may need to pass an error message into it some other time:

```js
<Modal>
  <Error />
</Modal>
```

> This is only possible because components don't need to know about their children in advance. This allows us to leave the `children` empty slot in them.

Component composition is used in 2 important situations:

1. Create hightly reusable and flexible components
2. Fix [prop drilling](#prop-drilling) problems (great for layouts)

> We can explicitely pass `element` as prop, instead of passing implicit `children`. This means that we can prepare a component to receive an element as a prop, simply by using the word `element` instead of `children`. But this will enable us to pass a real element as an `element` prop into the component. Nevertheless, using the `children` prop is usually the preferred way of doing this in React.

```js
function Box({ element }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && element}
    </div>
  );
}
```

Then as we call this component in another component, like `App`, we can pass the child element as an `element` prop.

```js
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box element={<MovieList movies={movies} />} />
      </Main>
    </>
  );
}
```

In this case, we don't need opening and closing tags for the reusable component element, which here is `Box`. Instead, we use a single tag just like before.

> We can pass multiple elements as the `element` prop into the component tag. In this case however, we would have to use the [React fragment](#react-fragments) tool around the elements that are passed in.

## **Props**

Up until this point, we have learned about a component's appearance and logic. We also know that React renders a component based on its current data and that the UI will always be in sync with that data. This data is made out of **props** and **state**. There are actually more, but for now these two matter.

State is **internal component data** that can be updated by the component's **logic**, while props is the data coming from the **parent component**, so from outside. So it is the parent component that owns the data, and therefore it cannot be modified by the child component. Props can only be updated by the parent component itself. So keep in mind that **Props are read-only, they are immutable**. Therefore, if you need to mutate props, you actually need state.

Why props are immutable? Because props are just simple objects. Mutating props would affect the parent component, that is how objects work in JavaScript. If you change an object that is located outside a function, that function has then created side effects. React is all about pure functions that don't produce side effects. Components have to be pure in terms of their props and state, because this allows React to optimize apps, avoid bugs, and make apps predictable.

Props essentially define **how we pass data between components**, in particular, from parent components to child components. Props are an essential React tool to configure and to customize components. You can imagine props as settings that we can use to make a parent component control how its child components should look like. Props are just like **function arguments** passed to regular JavaScript functions.

### **Props make one-way data flow**

This means that in React applications, data can only be passed from parent to child components which happens by using props. There are multiple reasons that React uses this one-way data flow:

1. Makes applications more **predictable** and easier to understand for developers.
2. Makes applications **easier to debug**, as we have more control over the data.
3. This is more **performant**.

Now you might ask, what if I actually wanted to pass some state up to a parent component? There is a very clever way to do that, but we will learn that later.

### **Passing and reciving props**

To define props we do it in 2 steps:

1. **Pass** the props
2. **Receive** the props

Imagine we have a `Menu` component that is going to pass props into a `Pizza` component. This would be the most basic way to implement:

```js
function Menu() {
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />
    </main>
  );
}
```

Notice how we have defined props similar to regular attributes in HTML.

> The order in which we define props as attributes is not important. Also note that you can insert anything as props. It is limited to strings or numbers. It can be objects, or even other React components. However, if you want to insert anything but strings, you should first enter JavaScript mode by typing `{}`.

Now the `Pizza` component will be able to receive these props in an object called `props`. The attributes will be available as properties on the `props` object.

```js
function Pizza(props) {
  return (
    <div>
      <img src={props.photoName} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.ingredients}</p>
    </div>
  );
}
```

> The `props` object is always available on all components, but if we don't pass anything into a component as argument, it will simply be an empty object.

> We normally call a component in a JSX as a single-tag element. But we can call a component with opening and closing tags and also insert some text in between. This text is received by the component function as a parameter called `children`. Take the code below as an example. Here, the `Select` text content passed in between the opening and closing tags of `<Button>` is received by the `Button` component as the `children` parameter. This basically allows you to reuse a component multiple times throughout your project with different text contents.

```js
function Friend({ friend }) {
  return <Button>Select</Button>;
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}
```

#### **Rendering lists with props**

Rendering a list is when we have an array and we want to render an element for each component of the array. We will continue the example mentioned above for this use case.

We should now update the `Menu` component we defined in the example above:

```js
function Menu() {
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <ul>
        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name} />
        ))}
      </ul>
    </main>
  );
}
```

> This is the conventional practice in React that in these cases, the parent component passes the whole data object as props to the child component.

We would also have to update the `Pizza` component to receive the whole pizza object for each pizza on the menu.

```js
function Pizza(props) {
  return (
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </li>
  );
}
```

> Note how we also defined a `key` prop in the `Menu` component. If we didn't do it, React would give us an error in the console saying that "Each child in a list should have a unique "key" prop." This means that each time we render a list, as we did in the `Menu` component using the `.map()` method, each of the items that gets rendered needs also a **`key`** property or attribute. This is a prop that is internal to React and it uses it to do some performance optimization. We should pass a unique value for the `key` prop. In this example, we used the pizza name as the key for each pizza.

> Also keep in mind that we should still keep using **semantic HTML** in React. Notice how we did that by using `ul` and `li` tags in the `Menu` and `Pizza` components respectively.

> It is a good practice to destructure props immediately when they are received in a component. This lets us quickly figure out what props the component is receiving, without having to look at the parent component in the chain. For instance, for the `Pizza` component mentioned above, we can do it like this:

```js
function Pizza({ pizzaObj }) {
  if (pizzaObj.soldOut) return null;

  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.price}</span>
      </div>
    </li>
  );
}
```

#### **Conditional rendering**

This is a very important technique that we use all the time in React. There are 3 ways of rendering some JSX or an entire component in React.

Keep these notes in mind:

1. Use the **ternary operator** when you need to return some piece of JSX based on a condition.
2. Sometimes you may need to return something entirely different in a certain condition. In these situations you may use **multiple `return` statements** based on conditions.

##### **With `&&`**

This basically involves using the short circuiting technique of JavaScript. Short circuiting means that you combine a condition with something that should be returned. If the condition becomes **`true`** or if it contains a **truthy** value, the second thing will actually be returned.

In this example, we want to render the footer content if the `isOpen` variable contains `true`.

```js
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  return (
    <footer className="footer">
      {isOpen && (
        <div className="order">
          <p>We're open until {closeHour}:00. Come visit us or order online.</p>
          <button className="btn">Order</button>
        </div>
      )}
    </footer>
  );
}
```

As another example, take the `Menu` component that we previously mentioned. We want to render the `ul` only if there are some pizzas avilable on the `pizzaData` array.

```js
function Menu() {
  const numPizzas = pizzaData.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 && (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      )}
    </main>
  );
}
```

This will make it so that if the `pizzaData` array is empty, then the whole `ul` won't be rendered.

> We should not implement the condition by simply writing `numPizzas` as a truthy/falsey value. In this case, if `numPizzas` is 0, then it would be a falsey value and short circuiting will happen. Therefore, what will be returned is not what we wrote after the `&&`. Instead, the value of `numPizzas` will be returned and rendered on the page. We don't want that. So we should actually write the condition in a way that becomes `true` or `false`.

##### **With ternary operator**

We are now going to do the same thing with the ternary operator. The advantage of using ternary operator is that we can display some alternative.

```js
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : null}
    </main>
  );
}
```

Let's also use this for the `Footer` component:

```js
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>We're open until {closeHour}:00. Come visit us or order online.</p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour} and {closeHour}
        </p>
      )}
    </footer>
  );
}
```

> We can use ternary operator to render the text content of a JSX element based on a condition. We can also use the ternary operator to insert class names based on a condition. Take the `Pizza` component for instance where we want to add the `sold-out` class name to any of the pizzas that are sold out. We also want to show the "SOLD OUT" text content instead of pizza's price in the `<span>` element that we defined in the JSX.

```js
function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}
```

##### **With multiple `return` statements**

Up until this point, all our components only ever had one `return` statement. But as JavaScript allows us, we can use multiple return statements based on some condition. Of course, only one of the `return` statements would be executed in the component, and that is why we implement this based on some condition.

For instance, if we want to render a `Pizza` component if only it is not sold out, we can do this:

```js
function Pizza(props) {
  if (props.pizzaObj.soldOut) return null;

  return (
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </li>
  );
}
```

#### **Prop drilling**

When the scale of the application grows a bit, we might find ourselves from time to time passing props through several nested child components to get the data into some **deeply nested component**. This is called **prop drilling** and can become frustrating in large-scale applications. It is obvious that many of the components through which the prop is passed does not even need that prop. They are just acting as a tunnel only to pass data to our destination component.

There are several ways that we can use to fix prop drilling:

1. [Component composition](#component-composition): This solution involves preparing a component to receive `children` components, which will in turn, make it possible to pass props right into a specific child component instead of passing them through a tunnel of nested components. For instance, here we have an `App` component that passes a `movies` state to the `NavBar` component, but then this component passes the movie data to a child `NumResults` component.

```js
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar movies={movies} />
      <Main movies={movies} />
    </>
  );
}

function NavBar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults movies={movies} />
    </nav>
  );
}
```

But with component composition, we make the `NavBar` component receive a `children` prop, and then insert its children right in the `App` component where we can directly pass the `movies` prop into the `NumResults` child component.

```js
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main movies={movies} />
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
```

This can obviously be done for several levels of nesting.

#### **PropTypes**

With `PropTypes` we can specify the type of values that we expect the consumer of the component to pass in for each of the props. For this pupose, we can use React's built-in prop types.

In order to be able to use PropTypes, we should first import it into the script where we want to use it.

```js
import PropTypes from "prop-types";
```

> There is no need to perform a separate NPM installation for `prop-types`. It is already installed through the `create-react-app` installation process.

We would then use the the `propTypes` (starting in lowercase) property on any of our components, and assign an object to it where we define the value types of each prop.

```js
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func.isRequired,
};
```

### **Props as an API**

This is directly related to the issue of thinking about components' reusability that comes with props acting as the [component's API](#components-api).

## **Effects**

What is an effect, and how is it different from an event handler function?

First, let's review what a side effect is. In React, any interaction between the component and the world outsite that component is a side effect. Side effect is a code that make something useful happen, for example, fetching some data from an API. We always need side effects when we build React apps. What we know for sure is that **side effects should not happen during the component's render**. In other words, side effects should not be in render logic. Instead, we can create side effects in 2 different places:

1. **Inside event handlers:** these are functions that are triggered when the event that they are listening to, happens.
2. **Effects (`useEffect`):** simply reacting to events is sometimes not enough for what an app needs. Instead, in some situations, we need to write some **code that will be executed automatically as the component renders or re-renders**. This is when we can create an effect to run code at different moments of a component lifecycle; mounting, re-rendering, or unmounting. This activates a whole new door of posibilities.

### **Effects vs. event handlers**

Let's compare these two in the case of fetching movie data in our app.

Fetching movie data is clearly a side effect since it is an interaction with the outside world. There are two possibilities of when we might want to create this side effect.

1. We might want to fetch movie data when a certain event happens. This is when we use an event handler function.

```js
function handleClick() {
  fetch(`http://www.omdbapi.com/?s=inception`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
}
```

2. We might want to fetch movie data immediately after the component mounts, and also after subsequent re-renders (according to dependancy array)

```js
useEffect(function () {
  function handleClick() {
    fetch(`http://www.omdbapi.com/?s=inception`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search));
  }
  return () => console.log("cleanup");
}, []);
```

We can say that the two pieces of code produce the exact same result, but they do so at different moments in time. The exact moment in which the effect is executed depends on its **[dependancy array](#dependancy-array)**. We can use the dependancy array to tell an effect to also run after a component re-renders.

This dependancy array is only one of the three parts that an effect can have. Besides the dependancy array, we have the effect code itself, inserted into the `useEffect()` function call as the first argument. As the third part, each effect can `return` a **cleanup** function, which is called before the component re-renders or unmounts.

Thinking about the different moments of a component lifecycle can be very helpful to understand how effects work. However, we should not think about lifecycles, but about **synchronization**. The real reason that effects exist is not to run code at differnt points of the lifecycle, but to keep a component synchronized with some **external system**. That would mean, in our example, to keep the component in sync with the movie data that comes from an external API.

`useEffect` is truly a synchronization mechanism to synchronize effect with the state of the application. Refer to [Synchronization and lifecycle](#syncronization-and-lifecycle) for a deeper dive into this.

#### **Syncronization and lifecycle**

When a dependancy changes, the effect is executed again. But now let's remember that dependancies are alaways states or props. What happens to a component when its state or prop is updated? The component will re-render. This means that effects and the lifecycle of a component are deeply interconnected. When the `useEffect` hook was first introduced, many thought that it was a lifecycle hook, rather than a hook for syncing a component with a side effect.

The conclusion here is that we can use the dependancy array to run effects when the component renders or re-renders. The `useEffect` is about synchronization and about the component lifecycle.

Let's now look at 3 different types of dependancy arrays that we can specify, and also how they effect both synchronization and lifecycle.

```js
// 1.
useEffect(fn, [x, y, z]);

// In this example, where we have multiple dependancies, it means that the effect synchronizes with `x`, `y` or `z`. In terms of the lifecycle it means that the effect runs on the initial render and also on each re-render triggered by updating one or all of the dependancies. If some other piece of state or prop is updated, then this effect will not be executed.
```

```js
// 2.
useEffect(fn, []);

// In this example, where we have an empty dependancy array, it means that the effect syncs with no state or props. Therefore, it will only run on mount. In other words, if an effect has no dependancies, it does not use any values that are relevant for rendering a component, and therefore it is safe to be executed only once.
```

```js
// 3.
useEffect(fn);

// In this example, where we have no dependancy array, we know that the effect will run on every render, which is a bad practice. This means that the effect syncs with everything. Every state and every prop will be dependancies in this case.
```

#### **When are effects executed?**

Let's see when are effects executed during the render and commit process?

We previously mentioned that effects are executed after render, but this is not the full story. There is a timeline of events that happen as components render and re-render.

1. The whole process starts with **mounting** the component instance, which is the initial render.
2. The result of rendering is commited to the DOM.
3. Finally the DOM changes are painted on the screen by the browser.
4. Effects are only executed at this point, after the browser has painted the component instance on the screen, not immediately after render. This is why we say effects run asynchronously after the render has been painted on the screen. The reason why effect works this way, is that effects may contain long-running process, such as fetching data. So in such situations, if React would execute the effect before the browser paints a new screen, it would block this entire process, and users would see an old version of the component for too long. One important consequence of the fact the effects don't run during a render, is that if an effect sets state, then a second additional render is required to display the UI correctly. This is why you should not overuse `useEffect`.
5. As one of the props change, the component will re-render.
6. DOM changes will be commited.
7. In React there is another type of effect called the **layout effect**, which runs before the browser paints the changes on the screen. This is the only difference between layout effects and regular effects. We almost never need this. It is just good to know that this exists.
8. DOM changes will be painted to the screen again.
9. This is a point in a component's lifecycle where the effect's cleanup function is executed.
10. Now if the updated state is part of the dependancy array of the effect, the effect will be executed again at this point.
11. This whole process can be repeated over and over again until the component is **unmounted**.
12. This is another point in a component's lifecycle where the effect's cleanup function is executed.

### **Dependancy array**

By default, an effect will run after each and every render. However, that is almost never what we want. We can change this default behavior by passing a dependancy array into the `useEffect()` hook as the second argument.

Why the `useEffect` hook need the dependancy array? Without this array, React does not know when to run the effect, but if we specify the effect dependancies by passing in the dependancy array, the effect will be executed each time that a dependancy changes.

We can think of the `useEffect` hook as an event listener that listens for one or more dependancies to change. When one or more dependecies change, `useEffect` will execute the effect again. This is similar to a regular even listener, but for effects.

What exactly are the dependencies? These are state variables and props used inside the effect. The rule is that **each and every one of state variables and props must be included in the dependency array**. Take a look at the code example below:

```js
const title = props.movie.Title;
const [userRating, setUserRating] = useState("");

useEffect(
  function () {
    if (!title) return;
    document.title = `${title} ${userRating && `(Rated ${userRating})`}`;
  },
  [title, userRating]
);
```

So the effect function depends on the `title` and `userRating` variables to do its job. If we don't pass these variables into the dependancy array, React will not know about them, and it won't be able to re-execute the effect code, and this would lead to a bug called **stale closure**.

Whenever the `title` or `userRating` changes, the effect is executed again. This will, in turn, update the `document.title`. Essentially, effects react to updates to state and props that are used inside the effect. Effects are reactive, just like React reacts to state updates by re-rendering the UI. This is extremely useful as you will see.

Let's now look at a real-world example of using the `useEffect` hook, which actually utilize the ability of effects to synchornize with state.

In this example project called ''usePopcorn', we want to implement a feature so that as the user types something in the search bar, the app starts fetching data from a remote server, without the user having to click on a button or hitting on the enter key on the keyboard. This is when we can introduce an effect and set the query that the user types in the search bar as the effect's dependancy.

```js
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (res.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
```

> Note that we have lifted up the `query` state from the `<SearchBar />` component to this parent `<App />` component.

> Sometimes we pass state setter functions as props into a component where we are introducing an effect, and the effect that we have introduced is actually using that state setter function to perform some action. In these situations, you should include the function in the dependency array. [more about this later...]

### **Cleanup functions**

Take the example of the usePopcorn project, where we wanted the title of the page to change whenever we select a movie to display its details. We actually want the title go back to it's primary value if the movie details column is closed and no movie is selected. This is one situation where we need the cleanup function of the effect that is responsible for changing the page title.

What we are basically trying to do here is to make sure that the page title stayes in sync with the application even after the component is unmounted. So we need a way of executing some code as a component unmounts. This is done by `return`ing a cleanup function from the effect. This would simply be a function that sets the title back to its primary value.

It is optional to return a cleanup function from an effect. We can simply omit it. This cleanup function runs on 2 occasions:

1. Before the effect is executed again, in order to cleanup the results of the previous side effect.
2. After a component has unmounted in order to enable us to reset the side effect that we created if it is necessary.

#### **When to use a cleanup function?**

Using a cleanup function in an effect is necessary whenever the side effect keeps happening after the component has been re-rendered or unmounted.

For example, you might be doing an HTTP request in your effect. If the component is re-rendered while the first request is still running, a new request will be fired off. This might create a bug called **race condition**. Therefore, it is a good idea to cancel the request in a cleanup function when the component re-renders or unmounts.

Other examples include:

- Subscribing to an API service: you should cancel subscription in a cleanup function.
- Starting a timer: you should stop the timer in a cleanup function.
- Adding an event listener: you should cleanup by removing it.

> In order to make effects easier to cleanup, you should always follow one rule. That is, each effect should do only one thing. So use the `useEffect` hook for each side effect seperately.

### **Effect use cases**

#### **Fetching data in React**

Let's first learn the wrong way of fetching data in a React app. This way you can learn more effectively.

##### **The wrong way**

As we learned before, we should never update state in render logic. Let's break this rule so we can see why this rule exists.

We now want to fetch some movie data as soon as the `App` component mounts for the very first time in the usePopcorn project.

To fetch data we use the OMDB API, which is something like the open version of IMDB.

```js
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => setMovies(data));

    return (
      // JSX
    )
}
```

This is the wrong way because this data fetching is introducing side effect into the component's render logic. This is an interaction with the outside world, which should never be allowed in render logic. The fetching code, written in the top level of the function, runs as the component first runs, which is actually why it is called render logic. But what is the problem?

As you run your app with this fetching approach, you can observe in the Network tab of the browser that your app is endlessly attempting to fetch data from the API. Why? Setting the state in the render logic causes the component to re-render itself again. However, as the component is re-rendered, the fetching function is executed again, leading to another state update, which in turn, will cause the component to re-render itself in an **infinite loop**.This is why it is not allowed to `setState` in render logic.

> "React limits the number of renders to prevent an infinite loop."

But we actually need to update the state here. So let's now learn the correct way to do this, which is the `useEffect` hook.

##### **The `useEffect` hook: the correct way**

The idea of the `useEffect` hook is to give us a place where we can safely introduce side effects. The side effects registered with the `useEffect` hook will only be executed after certain renders, for instance, only right after the initial render.

```js
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(function() {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => setMovies(data));
  }, []);

    return (
      // JSX
    )
}
```

> When you want to use the `useEffect` hook, make sure you import it from the `react` library into your script file.

The `useEffect` does not return anything, so we don't store its result in any variable, but instead, we pass in a function, and this function is called the 'effect', containing the code that we want to run as a side effect.

The `useEffect` hook accepts as the first argument, a function which holds the code that we want it to run as the side effect, and as the second argument, the **dependancy array**. For now we just pass in an empty array, which means that this effect will only run on the mount phase.

Now if you check your Network tab of your browser, you will see that the problem with your infinite loop is now gone. This is the very bare bones way of data fetching in simple React app, at least if we want to fetch our data as soon as the app loads. In a larger, more real-world app, we may use some **external library** for data fectching.

> When we say that we 'register' a side effect, we mean that we want a specific code not to run as the component renders, but after it has been painted on the screen. This is what `useEffect` does.

Note that we used `then()` to handle the fetch promise. Instead, we can use `async` functions to do this, but let's see in detail how we can do this. At first, you might think that we can simply put an `async` keyword at the beginning of the effect's callback function, but this won't work, because the effect function that we place in the `useEffect` hook cannot return a promise, which is what an `async` function does.

```js
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(async function() {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => setMovies(data));
  }, []);

    return (
      // JSX
    )
}
```

So instead of the code above, we can do this:

```js
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(function () {
    async function fetchMovies() {
      const res = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
    }
    fetchMovies();
  }, []);
```

So we basically define an `async` function `fetchMovies` inside the `useEffect` hook, and called it immediately afterwards. Inside this `async` function, we can use as many `await` expressions as we need.

> Whenever we are using `async` functions, especially to load data from an API, it is a good practice to indicate for the user that some data is being loaded. This way the user would know that they should wait for their expected result. There is an amazing library that takes care of all this along with many other things such as error handling, which is called [React Query](#react-query). But as of now, to do this, we usually define another state variable for the loading status. See code example below:

```js
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchMovies() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
      );

      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
```

The `<Loader />` component simply returns a `<p></p>`.

##### **Handling errors**

Whenever we deal with `async` functions to fetch some data from a remote server, we need to take care of errors, because we should always assume that something might go wrong.

**1. Situation 1: user loses internet connection**

On of these situations is when the user suddenly loses their connection. This is when your app encounters an error saying 'Failed to fetch'. So if this happens, we want to show something to user, and not keep the app in the loading status.

Handling error main strategies are no different than what you have learned in JavaScript. So what we need to do is to look for the `ok` property of the response object (`res`) and based on it, `throw` a `new Error()` if the response is not ok. This thrown error can be caught in the `catch` block if we wrap all the functionality inside your `async` function into a `try` block. Then the `catch` block would simply only deal with the error.

Now in order to display this error in the UI for the user, we need yet another piece of state. This state would determine what JSX will be rendered on the screen.

```js
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
```

Note how we used a `finally` block in order to set the loading state to `false` eventually, because whether the data is fetched with no problem or there was an error in the fetching process, we need to remove the 'Loading...' text from the UI.

**2. Situation 2: there is no result for the search query**

Let's say that the user searches for an invalid movie name like 'lauksflabj'. We should also be able to display an appropriate error for this situation. This is when the response object no longer contains the `Search` property, it is basically `undefined', and we get a `Response` property set to the straing 'False'. Remember that this is specific to the OMDB API that you are using for this app.

```js
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if (res.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
```

##### **Preventing race conditions**

Currently, with each key stroke on the keyboard, the effect the we have introduced is executed again, starting `fetch` requests one after another. This creates a race condition where the results displayed on the UI will be the result of any request that takes longer to be responded with actual data from the API. However, that is not what we want. We only want the result of the last request to be displayed on the UI. So what we need to do now is to **cleanup** the previous `fetch` request each time the effect is going to be executed again.

In this specific example, we are going to use the `AbortController` API that belongs to the browser. We are going to use it in the cleanup function of the effect.

```js
useEffect(
  function () {
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies.");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovie();

    return function () {
      controller.abort();
    };
  },
  [query]
);
```

As you can see in the code above, in order to use the browser's `AbortController` API, we should first create a new instance from the `AbortController` constructor function. This new instance has a property called `signal` which we use to plug the `AbortController` API into the `fetch` function. The `fetch` function accepts as the second argument an object with the `signal` property set to the controller's signal property. So we can now send the abort signal in the cleanup function. In order to send the abord signal we should call the `.abort()` method on the controller object.

In this example, we want to listen for the event in which the Escape key on the keyboard is pressed.

```js
useEffect(
  function () {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
        console.log("CLOSING");
      }
    }

    document.addEventListener("keydown", callback);
  },
  [onCloseMovie]
);
```

> Note how we passed the `onCloseMovie` function into the dependency array. This function was passed into the component where this effect is introduced through props. We will later learn why we can and we should pass a function into the dependency array. [more about this later...]

The problem with this implementation is that each time this effect is re-executed, another event listener is attached to the document object. So when it is executed for the second time, we would now have 2 event listeners that will respond to the event. This is not what we want. We want to remove the event listener that was previously attached by the effect in the previous execution. So, again, we need a cleanup function.

```js
useEffect(
  function () {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
        console.log("CLOSING");
      }
    }

    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  },
  [onCloseMovie]
);
```

> Note that the callback function mentioned in the `removeEventListener()` method should be exactly the same function that was used in the `addEventListener()` method. So we have to define the callback function outside of the methods, and simply refer to them in the methods.

#### **Listening for keypress event on the document object**

In order to listen for a key press event on the whole document object, we can introduce an effect. Inside this effect we can use the native `addEventListener()` JavaScript method on the `document` object.

### **RECAP**

We need side effects in all our React apps. It is a good thing, but it is not allowed everywhere. Side effects are not allowed in the render logic at all. We can, however, introduce side effects in two places:

1. Event handlers - this is usually the preferred way of introducing side effects, but it is not enough, because sometimes we need more than just reacting to a certain event, like a click.
2. `useEffect` hooks - in some situations we need some code to be automatically executed as the component mounts, and/or re-renders, or unmounts. We use the dependency array to tell the effect when to execute. The ability to hook into all of these phases opens a whole new door of possibilities. An effect has 3 parts: the effect code, the dependency array, a cleanup function which is called before a component re-renders or unmounts.

> Thinking about the lifecycle of a component instance is useful for understanding how effects work, but it doesn't explain why effects actually exist. Effects are meant to be used as a way to keep components synchronized with an external system. Effects and component lifecycle are in fact deeply connected, but this is just the nature of effects. When states or props of a component changes, the component is re-rendered. Now if an effect actually depends on the same states or props, this effect will be executed again as they change.

So we use effects to keep a component in sync with the external world. On the other hand, we use event handlers to react to a certain event that happens in the UI.

> Event handlers are always the preferred way of creating side effects. Do not overuse the `useEffect` hook.

The dependency array is a requirement for the effect, because without that, React doesn't know when to run the effect. By setting the dependecies in the dependency array, we are actually telling React that each time one of those dependencies changes, the effect will be executed again.

But how should we determine the dependency array? Basically, every state variable and prop used inside the effect must be included in the dependency array. Otherwise, React will not know about the changes happened to states and props used in the effect, and this would lead to a bug called stale closure.

Now that we know about the dependency array, we can think of `useEffect` hook as an event listener that listens for one dependency to change. Once it changes, the effect will be executed again.

> There are 3 different ways of defining the dependency array:
>
> 1. `useEffect(fn, [x, y, z])`: This means that the effect synchronizes with x, y, and z. From the lifecycle viewpoint, the effect will run on mount and re-renders triggered by updating x, y, or z.
> 2. `useEffect(fn, [])`: This means that the effect synchronizes with no states or props. From the lifecycle viewpoint, the effect will run only on mount. Since the effect does not depend on any state or props, it is actually safe to be executed once on mount.
> 3. `useEffect(fn)`: This means that the effect synchronizes with everything. This is usually a bad thing to be implemented in a React app.

Let's now review when effects are actually executed regarding the lifecycle of a component. A component is first mounted, which is its initial render. After this, the result of rendering is commited to the DOM. Finally, the DOM changes are painted to the screen by the browser. Effect are executed after the browser paint. This is why effects run asynchronously, as effects may contain long-running processes like fetching data. In such situations, if React executed the effect before the browser paint, it would block the entire process and users would have to see the old version of the component for too long.

> An important consequence of effects not running during render is that if an effect sets state, then an additional render is needed to display the UI correctly.

As one of the states of the component changes, it will go through the process of re-render, then commit, and then another browser paint. Then the effect will run again. This process can repeat again and again until the component is unmounted.

So up until now, we can use the dependency array to execute an effect on component's mount and/or re-renders. What if we want to execute a certain code when the component is unmounted? What if we want to do so just before the effect is executed again? This is where we can use the effect's cleanup function.

The cleanup function is an optional part of any effect. It means that we don't have to include this cleanup function in every effect that we create. But if we need to execute some code after a component is unmounted, or if we need to do so right before the effect is executed again, we should use the effect's cleanup function.

So as a practical guideline, remember that using a cleaup function becomes necessary whenever the side effect you introduced is executed again when the component is re-rendered or unmounted. For example, if you have implemented an HTTP request in your effect, this may create a situation in which your component re-renders while your first request is being done, starting a new second HTTP request, leading to the **race condition** bug. So you need to cleanup the previous request in such situations. Other examples include API subscription, starting a timer, or adding an event listener.

> Remember a good rule about introducing effects: each effect should do only one thing. use the `useEffect` hook for each side effect seperately. This makes effects easier to cleanup.

## **The Context API**

Let's start with the problem that the context API solves. Imagine an application where you need to pass state into multiple deeply nested child components.

The first solution that comes to mind is to simply pass the state variable as props all the way down until it reaches the components that need the state. However, this will create a new problem, because passing props down through multiple levels in the tree can become inconvenient. This problem is called prop drilling.

> Remember that we previously mentioned **component composition** as a possible solution. But it is not always possible. Component composition with the `children` prop does not always solve this problem.

We need a way of directly passing down state from a parent component into a deeply nested child component. React has already thought of that and has provided us with the Context API. The context API allows components everywhere in the tree to read state that a context shares.

First of all, the context API is a system to pass data throughout the app without manually passing props down the component tree. It essentially allows us to **broadcast global state** to the entire app.

### **The provider**

The first part of the Context API is the **Provider**. The provider gives all child components access to a `value`. This provider can sit everywhere in the component tree, but it is common to place it at the very top.

### **The value**

The second part of the Context API is the **value** that the provider provides to the components. The value is the data that we want to broadcast through the provider. We pass this value into the provider. This value usually contains one or more state variables and even some setter functions.

### **Consumers**

Finally, we have the **Consumers**. Consumers are all the components that subscribe to the context, and therefore are able to read the provided context value.

Now you might ask, what happens when the context value changes? When the context value is updated, all consumers of that value will get re-rendered. This means that now we have a new way in which component instances can be re-rendered. We already knew that state updates re-render a component, but now we know that an update to a context value also re-renders a component as long as that component is subscribed to that context.

### **Creating and providing a context**

We usually create a context in the top component of our application which is usually the `App` component. Inside this file (or component function), we call the `createContext()` function that is provided to us by React. Make sure that you import it from React first. This function returns a context that we can store in a variable. Into the `createContext` function we could pass a default value for the context. However, we usually never do that becasue that value can never change over time. So we normally leave the function empty or pass `null` into it.

```jsx
// Create a new context
const PostContext = createContext();
```

> Note that the variable name we selected for the context starts with a capital letter. That is because the context is actually a component. You will see how we would include it as a component into our JSX code.

Then we need to pass the value into the context provider. What we do in this step is to insert the `<PostContext.Provider>` component in our JSX in a way that it wraps all other components. However, this will not do anything on its own. So we have to pass the value into the provider.

```jsx
function App() {
  // Some other logic code

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts, //derived state
        onAddPost: handleAddPost, //handler function
        onClearPosts: handleClearPosts, //handler function
        searchQuery, //state variable
        setSearchQuery, //state setter function
      }}
    >
      <section>
        <button
          onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
          className="btn-fake-dark-mode"
        >
          {isFakeDark ? "☀️" : "🌙"}
        </button>

        <Header
          posts={searchedPosts}
          onClearPosts={handleClearPosts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Main posts={searchedPosts} onAddPost={handleAddPost} />
        <Archive onAddPost={handleAddPost} />
        <Footer />
      </section>
    </PostContext.Provider>
  );
}
```

Usually we create one context per state domain. So for instance, in the example above, we would create a context only for the posts and call it `PostContext` and then another context for the search, and we would call it `SearchContext`. But here we just keep it simple.

Now it is time to consume the context in all the components that need access to this data. In order to do this, we need to call the `useContext()` function provided by React and we pass the context that we created into this function. This function returns the entire value that we passed into the context. We can store it in a variable or we can immediately destructure and take out what we need for a specific component.

For example, a header component of our imaginary project needs the `onClearPosts` handler function.

```jsx
function Header() {
  const { onClearPosts } = useContext(PostContext);

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}
```

Another component called `SearchPosts` needs the `searchQuery` and `setSearchQuery`:

```jsx
function SearchPosts() {
  const { searchQuery, setSearchQuery } = useContext(PostContext);
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}
```

And also the `Results` component needs the `posts` value.

```jsx
function Results() {
  const { posts } = useContext(PostContext);
  return <p>🚀 {posts.length} atomic posts found</p>;
}
```

But let's now implement an advanced pattern in using the Context API.

### **Advanced pattern: A custom provider and hook**

The idea is to remove all the state and state updating logic from the main `App` component and place it into our own custom context provider component. It is basically just a refactoring of what we already have at this point. We are just going to have the different parts of implementing a context in different files.

We start with creating a file in the `src` folder called `PostContext.jsx`. In that file, we paste the context creation code that we implemented previously in the `App` component. We also define a function called `PostProvider` which will be responsible for creating and exporting a provider.

```jsx
//PostContext.jsx
import { createContext } from "react";
const PostContext = createContext();
function PostProvider() {}
```

Then we take all the state declaration and update logic from the `App` component and place it inside the `PostProvider` function. We also need to take the `<PostContext.Provider>` component that we implemented in the JSX of the `App` component and put it here in this file. We would finally export this function from this file.

```jsx
const PostContext = createContext();
function PostProvider() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    ></PostContext.Provider>
  );
}

export { PostContext, PostProvider };
```

However simply importing this into the `App.jsx` file and wrapping the `App` JSX into `<PostProvider></PostProvider>` won't work because what we pass into this post provider component is not received anywhere by the provider.

```jsx
import { PostProvider, PostContext } from "./PostContext";
function App() {
  const [isFakeDark, setIsFakeDark] = useState(false);
  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}
```

> Note how we have wrapped only the components that need to have access to the context and not the whole JSX of the `App` component. However, when you do this you should keep in mind that the context will no longer be accessible in the `App` component itself. It will only be available in the `Header`, `Main`, and only in the components that are placed inside the provider. **So you can only access the context where it is provided**.

We are now going to create our custom hook. Why? Right now to consume the context, we use the `useContext` hook and we pass in the `PostContext` object. This works great, but over time, after using it many times you will notice that it becomes anoying. So we are going to create a custom hook in order to get rid of this repetition. So in the `PostContext.jsx` file we go ahead and create a custom hook called `usePosts` and define it like this:

```jsx
// PostContext.jsx
function usePosts() {
  const context = useContext(PostContext);
  return context;
}

export { PostProvider, usePosts };
```

Then instead of exporting the `PostContext` component, we export our custom hook and import it in the `App` component. Now in the `App` component file we can easily replace all `useContext(PostContext)` with `usePosts()`.

## **Performance Optimization**

We start by an overview of what can actually be optimized in React apps and how we can do it. There are 3 main areas where we can focus on when we need to optimize performance of React apps.

1. **Prevent wasted renders:** in order to prevent wasted renders we can memoize components with `memo`, or we can memoize objects and functions with `useMemo` and `useCallback` hooks. We can also use a technique in which we pass elements into other elements as children or as a normal prop in order to prevent them from being re-rendered.
2. **Improve app speed or responsiveness:** We can use the `useMemo` and `useCallback` and also `useTransition` hooks.
3. **Reduce bundle size:** we can reduce the bundle size simply by using fewer 3rd-party packages in our code base, and we can also implement code splitting and lazy loading.

## **React Fragments**

Basically, a React fragment lets us group elements without leaving any trace in the DOM.

Remember that a piece of JSX, no matter where it is defined, can only have one root element. Previously, we said that one way to fix this is to wrap our elements in a single parent element, like a `div`. This can potentially mess up the styles and appearances that we defined for the page. So we can use fragments.

You will again wrap the elements that you want to return as JSX in a parent element, but this parent element will not be an actual HTML element. It won't be inserted into the HTML code of the page. Only React will know about this. The parent element's opening would be `<>` and its closing would be `</>`.

```js
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>

      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone stove, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later.</p>
      )}
    </main>
  );
}
```

> Sometimes we need to add a `key` to the React fragment, for instance, when we are using it to render a list. Then the fragment would have to be written in a different way. The wrapper element will now be `<React.Fragment>` and then we would be able to add a `key` prop to it.

## **Styling React applications**

There are several ways to style components. React does not really care about how we do it. React is more of a library than a framework.

But why there are so many ways of styling a React app? One fundamental philosophy of React is to be unopinionated in regards to many common aspects of building web apps, and one of them is styling. So React does not really care about how you do it.

### **Inline styling**

In HTML, we can style elements using the `style` attribute. But it works a bit different in JSX. We cannot assign a string to the style attribute as we did with the normal HTML syntax. The style attribute in JSX should receive a JavaScript object containing the styles defined as properties.

```js
function Header() {
  return (
    <h1 style={{ color: "red", fontSize: "48px" }}>Fast React Pizza Co.</h1>
  );
}
```

Note how we used the first set of `{}` to enter JavaScript mode in the JSX, and then used another set of `{}` which indicates the JavaScript object that is used to define style properties.

> Inline stylings are scoped to the JSX element where they have been inserted. It applies only to the exact element to which they are attached.

> There is no problem in using inline styles in JSX, but this can easily get out of control when designing large-scale applications.

> Some style properties that we type their names with dashes in CSS, should be written in cammelCase in JavaScript. For instance, `font-size` in CSS should be written as `fontSize` in JSX.

> The JavaScript object inserted into the style attribute can be defined separately outisde the JSX.

### **External CSS or Sass**

We should first import the external CSS file into the JavaScript file where our components and their JSX are declared.

```js
import "./index.css";
```

We then have to insert class names that we used in the external CSS file. Keep in mind that in JSX, we cannot use the `class` attribute as we do it in HTML. Instead, we should use `className`.

```js
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
```

> Styles applied in this way are scoped to the entire app. Every single JSX element in the entire app can use the class names introduced in the CSS files. This can cause huge problems, especially in big apps. For instance, you won't know which components are using which classes. So when you update one of the classes it will have repercussions in other components and other problems. So global CSS is a nightmare in large apps.

> The external CSS file should normally be located in the `src` folder.

> Styles included here as an external CSS file are global styles, they are not scoped to the components where they are used.

### **CSS modules**

This option scopes the CSS styles to a single component which is the proper way of applying styles to big React apps.

CSS modules are similar to regular CSS files with the difference that we write one CSS file for each component. This also better reflects React's separation of concerns.

Let's first learn all the fundamentals of CSS modules that you need. CSS modules already comes with `create-react-app` and Vite. So you don't need to install any additional package. We should create one CSS file per component.

For instance, for a component file called `PageNav.jsx` we need to create a `PageNav.module.css` file in the `components` folder of our project.

Inside the CSS file we need to define class names. We don't use, for instance, the element selector. That is because if you do so you will be applying your styles to all elements of the specified type throughout the whole application. This would obviously cancel the whole purpose of CSS modules.

```css
.nav {
  display: flex;
  justify-content: space-between;
}

/* Element selector (below) does not work */
ul {
  list-style: none;
}
```

However, you can select native HTML elements under class names:

```css
.homepage section {
  display: flex;
  flex-direction: column;
  height: 83%;
}
```

We now have to use the class name `nav` in our JSX markup in the component JSX file. We first need to import the CSS file into the component file and then add the class names to our elements. All the classes that we define in the CSS module are exported in one big object, which we usually call `styles` as we import them.

```js
// PageNav.jsx file
import styles from "./PageNav.module.css";
```

Now the `nav` class defined in the CSS module is available at `styles.nav`.

```js
function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

> If you inspect the `nav` element in your browser you will see that the class name inserted into the element is not actually just `nav`. A random string is added to it which act as a unique ID for the `nav` class name attached to this specific component. This means that if you have another component, the CSS module of which contains a class also named `nav`, you will not see any conflict in applying CSS styles. This is because the `nav` class name applied to the second component will actually be inserted into the HTML element with another random string attached to it as another unique ID.

#### **Global CSS**

Sometimes, in addition to CSS modules, we need some global CSS settings, such as global reset, or setting some font properties on the `body` element of the document. For this purpose, we can keep including an external CSS file as we have been doing up until now.

In this case, we create an `index.css` file in the `src` folder of our project. Then we import this file usually into the `main.jsx` file of our project.

This global CSS file normally does not contain any class names. It only defines styles for native HTML elements. As a simple guide, this can be the content of a global CSS file:

```css
@import "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
@import "https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap";

/* These CSS variables are global, so they are available in all CSS modules */
:root {
  --color-brand--1: #ffb545;
  --color-brand--2: #00c46a;

  --color-dark--0: #242a2e;
  --color-dark--1: #2d3439;
  --color-dark--2: #42484d;
  --color-light--1: #aaa;
  --color-light--2: #ececec;
  --color-light--3: #d6dee0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  font-family: "Manrope", sans-serif;
  color: var(--color-light--2);
  font-weight: 400;
  line-height: 1.6;
}

label {
  font-size: 1.6rem;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-family: inherit;
  font-size: 1.6rem;
  border: none;
  border-radius: 5px;
  background-color: var(--color-light--3);
  transition: all 0.2s;
}

input:focus {
  outline: none;
  background-color: #fff;
}

.cta:link,
.cta:visited {
  display: inline-block;
  background-color: var(--color-brand--2);
  color: var(--color-dark--1);
  text-transform: uppercase;
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 3rem;
  border-radius: 5px;
}
```

> Note that you can define class names in global CSS files. This will make it so that whenever you use that class name in your components, the corresponding styles will get applied unless you define the same class names in your CSS modules.

But let's now see how we can define some more global CSS properties inside CSS modules. Imagine for some reason we want a `background-color: red` CSS property to be availabel in our homepage, but we don't want to import this CSS module into the `HomePage.jsx` file. To do this we can use the `:global()` function in our CSS module file and pass the class name to it.

```css
:global(.test) {
  background-color: red;
}
```

This will now allow us to use the `test` string as the value for the `className` prop in any of our JSX elements.

```js
function Homepage() {
  return (
    <div>
      <PageNav />
      <h1 className="test">WorldWise</h1>

      <Link to="/app">Go to the app</Link>
    </div>
  );
}
```

> The class name inserted in the actual DOM element in this case will be exactly the string `test` and no random string will be added to it. This is a global style. This option is useful, for instance, when we want to style the active link in a navigation bar. In order to introduce a global style in a CSS module we use the `.global()` function like this:

```css
.nav :global(.active) {
  background-color: green;
}
```

This means that the element with the `active` class name that also has the `nav` class name will get the background color of green.

### **CSS-in-JS**

If you want to further with the moduling option, you write your CSS inside a JavaScript file, so in the same file where you define your component. This allows us to create React components that have our styles directly applied to them which we can then use like regular components.

This fully embraces the React philosophy that a component should contain all the information about its appearance, and that includes CSS.

### **Utility-first CSS**

This is getting more popular everyday. In this method, you use predefined utility classes to define individual styles, to use flexbox, to make layout responsive, to make hover effects, and to design your entire UI without ever having to leave the JSX markup.

### **No CSS!**

You can build your entire project using a fully-fledged UI component library. A component library contains all kinds of pre-built and pre-styled components that are common in most applications. One of the famous libraries that helps us doing this is the _Styled Components_.

## **Separation of concerns in React**

[Notes will be added later.]

Before React we had one technology per file, but with React we have one component per file. So separation of concerns is still there, but in a different paradigm.

## **Routing and Single-Page Applications (SPA)**

When we use routing in a web app, we basically match different URLs to different views in the UI. In the specific case of React, we match each URL to a specific React component. We call each match between a URL and a component a **route**. Then when one of the specific URLs gets visited, the corresponding React component will gbeet rendered.

For instance, we show the homepage of our application at the `www.example.com/` URL which is also called the root URL. Then we render the login page for the `www.example.com/login` URL, and also when the user is logged in, we load the main functionality of our app for the `www.example.com/app` URL.

This enable users to navigate between different screens of the app by simply using links in the browser. At the same time, routing like this, keeps the UI in sync with the current browser URL, which has a couple of nice advantages [more about this later...]

This type of routing only works this way on the client side. There is also another routing that happens on the server side, but not in client-side React apps that we build during this tutorial.
Most front-end frameworks have this client-side routing capablities baked right into the framework, but React is different, because it relies on 3rd-party packages for many different functionalities, and routing is one of them.

In React, routing is usually handled by [**React Router**](#react-router) library. This is the most important and most used React 3rd-party library. If you want to learn React development you need to learn React Router. The reason for this is that routing is fundamental for building sing-page applications (SPA).

Sing-page apps are web applications that are executed entirely on the client, so only in the user's browser. SPAs rely heavily on the concept of routes where different URLs corresponds to different views.

Here is how single-page apps works:

Whenever a user clicks on a special link provided by the router, the URL in the broswer simply changes. In the case of React, this job is usually done by `react-router` package. Chainging the URL will then trigger the DOM to be updated as a result. In single-page apps it is always JavaScript that will update the DOM and therefore the page.

Usually, on a normal webpage, when we click on a link, the broswer loads a completely new page and then show us that new page. But SPAs are different. The page is updated by JavaScript which means that there will never be a complete page reload, and that is the whole point of SPAs. This makes the web app feel just like a native desktop or a mobile app, which is a fantastic user experience.

Going back to React, whenever the URL is changed, React Router and React itself will update the DOM by rendering the component that corresponds to the new URL. Then the whole cycle can be repeated as many times as necessary. Each time a user clicks on a router link, it will change the URL and the component that is being displayed, all without reloading the whole page.

It is quite common that some pages need to display some external data, but that is not a problem at all. When that happens, a component can load some additional data from a server, usually from some kind of a web API. While the SPA itself runs entirely on the client side, it can always communicate with a server to fetch some data. What we cannot do in SPAs is to load a completely new page, because then it would no longer be an SPA.

Big and complex applications rely on URLs and need the routing capabilities, because only then they can become real SPAs.

# **State, Events and Forms: interactive components**

In this section, we will be working on a steps component as an example. We initialized the a new project using the `npx create-react-app@5 steps` command, then deleted everything in the `src` folder except the `App.js` and `index.js` files. Inside the `App.js` file we define the `App` component and export it so that the `root` element defined in the `index.js` file can have access to it.

**`App.js`**

```js
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const step = 1;
  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button style={{ backgroundColor: "#7950f2", color: "#fff" }}>
          Previous
        </button>
        <button style={{ backgroundColor: "#7950f2", color: "#fff" }}>
          Next
        </button>
      </div>
    </div>
  );
}
```

## **Handling events**

To handle events in React, we don't use the `.addEventListener()` method, because that is the imperative way of responding to events. But in React, we use a **declarative** approach, meaning that we don't manually select DOM elements. Instead, we use something similar to the **HTML inline event listener**.

To listen for a click event on a certain element, we use the `on<Event>` prop or attribute on the element in the JSX. This prop accepts a JavaScript function. For instance, if we want to listen for a click event on a button:

```js
export default function App() {
  const step = 1;

  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={() => alert("previous")}
          onMouseEnter={() => alert("previous")}
        >
          Previous
        </button>
        <button style={{ backgroundColor: "#7950f2", color: "#fff" }}>
          Next
        </button>
      </div>
    </div>
  );
}
```

> Notice how we have listened for two events (`onClick` and `onMouseEnter`) at the same time on one element.

> We don't usually define the callback function inside the event listener prop. Instead, we define a separate function inside the current component, and pass it into the prop.

```js
export default function App() {
  const step = 1;

  function handlePrevious() {
    alert("previous");
  }

  function handleNext() {
    alert("next");
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

We usually handle events in order to work with **states**.

## **State in React**

State is the most important concept in React. Mastering state is the most difficult part of learning React. Everything revolves around the concept of state in React. Here is what React developers need to learn about state:

1. What is state and why we need it?
2. How to use state in practice?
   - `useState` hook
   - `useReducer` hook
   - Context API
3. Thinking about state
   - When to use state
   - Where to place state
   - Types of state

We know how to pass data into a component using props, which is data coming from outside the component. But what if a component needs to **hold its own data**, especially **over time**? Also, what if we want to make our application interactive and change the UI as a result of an action? This is where state comes in.

State is data that a component can hold over time. It is necessary for information that the component needs to remember throughout the application's lifecycle. So we can think of state as the **memory of a component**.

Examples of state:

- Notification count
- Text content of an input field
- Active tab in a tabbed component
- Content of a shopping cart

The common thing between all kinds of state is that the user can easily change the state value in the application. For instance, when they read a notification, the count will decrease. So each component needs to be able to hold this data, which is **a piece of state**, over time.

A piece of state or a state variable is a single variable in a component, which is also called a component state.

Keep in mind that **updating** the state triggers React to **re-render** the component in the UI. So state is how React keeps the user interface in sync with data. Therefore, state allows developers to do 2 important things:

1. Update the component's view by re-rendering the component.
2. Persist local variables between renders and re-renders

So state is actually a tool. **Mastering the state will unlock the power of React development**.

### **Mechanics of state**

Let's start from a fundamental React principle that we learned earlier.

1. **PRICIPLE:** In react, we do NOT manipulate the DOM directly when we want to update a component's view. React is declarative, not imperative.

So how do we update a component on the screen when some data changes or when we need to respond to some event like a click?

2. **PRICIPLE:** React updates a component view by re-rendering the entire component whenever the underlying data changes. Re-rendering means that **React calls the component function again**. React removes the entire component view and replaces it with a new view each time a re-render needs to happen. React **preserves the component state throughout re-renders**, unless the component disappears from UI entirely which we call **unmounting**.
3. It is when the state is updated that a component is automatically re-rendered.

Now here is a flow of what happens in this process in the actual application. Imagine there is an event handler in the view, for instance, on a button that the user can click:

1. The moment that button is clicked, we can update a piece of state using the **setter function** coming from the `useState()` hook.
2. When React notices that a state has changed, it will automatically re-render the component, which will result in the updated view for the component.

**REACT REAECTS TO STATE CHANGES BY RE-RENDERING THE UI.**

### **State guidelines**

There is one important technical detail to remember: **Each component has and manages its own state, no matter how many times we render the same component, and no matter if there are multiple components of the same type (like a list) but for different contents.** For instance, imagine a list of score componentes for multiple football teams. State is isolated inside each component.

Therefore, we can think of the entire Application (UI) as a function of the state. In other words the entire UI is always a representation of all the current states in all components.

Taking it one step further, we can say that a React application is fundamentally all about **changing state over time**. Instead of viewing a UI as explicit DOM manipulations, with state, we now view a **UI as a reflection of data changing over time**.

Here are a few practical guidelines about state:

1. Use a state variable for **any data that the component should keep track of or remember over time**. This is data that will change at some point.
2. Whenever you want something in the component to be **dynamic**, create a piece of state related to that thing, and update the state when that thing should change. For instance, you can create an `isOpen` state variable that tracks whether a model window is open or not. Then when `isOpen` is `true` we display the window, and if `false`, we hide it.
3. When building a component, imagine its **view as a reflection of state** changing over time.
4. For data that should not trigger component re-renders, don't use state. Use a regular variable instead.

### **Working with a state variable**

Following the example mentioned earlier, we now want to implement a functionality that causes the step to change as we click on the next and previous buttons.

To do this, we no longer define the `state` variable as we did before like this:

```js
const step = 1;
```

Instead, in order to use state in a component we should follow 3 steps:

1. Add a new state variable with `useState()` function. Don't forget to import `useState` from `react`. The `useState()` function receives an argument which is the dafault value of the state variable that is being defined. This function returns an array with two elements: first, the default value that we defined, and second, a function that updates the state variable. So we can immediately destructure this returned array into two separate variables: `step`, `setStep`.

```js
export default function App() {
  const [step, setStep] = useState(1);

  function handlePrevious() {
    alert("previous");
  }

  function handleNext() {
    alert("next");
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

> The `useState()` function is also called a **hook** in React. Hooks are identified with the `use` keyword at the beginning of their name. It is extremely important to remember that we can only call hooks on the top-level of a function, not inside an `if` statement or a function or a loop.

> We should only update state using the setter function that is, by default, defined as the second element of the array returned by the `useState()` function. If you attempt to update the state manually using regular JavaScript code, React cannot understand what you are trying to do. The functionality will simply not work. This is true about primitive values. But what if the state variable holds an object and then we update this state manually? This will actually work and React will re-render! But it is definitely a bad practice, especially in React, which is all about **immutablity** and **function state updates**.

```js
const [test] = useState({ name: "Jonas" });

function handleNext() {
  test.name = "Fred";
}
```

2. Use it in a code, usually in JSX. In this example, we should use the `setStep()` function in `handlePrevious()` and `handleNext()` functions. The `setStep()` function receives an expression that tells it how to update the state variable.
3. Update the piece of state in some event handler

```js
function handlePrevious() {
  if (step > 1) setStep(step - 1);
}

function handleNext() {
  if (step < messages.length) setStep(step + 1);
}
```

> In case we are **updating the state based on the current state**, it is the best practice to implement a callback function inside the state setter function that will handle the upading task. This way we prepare our application for future changes in its state updating mechanism. Again, this is important when we are updating the state based on the current state. It means that the new value of the state variable is derived somehow from the current value of the state variable.

```js
function handlePrevious() {
  if (step > 1) setStep((s) => s - 1);
}

function handleNext() {
  if (step < messages.length) setStep((s) => s + 1);
}
```

> In case the new value of the state variable does not depend on its current value, we can simply ignore using a callback function inside the state setter function.

### **Forms and handling submissions**

One of the most important things that we do on the web is to interact with web applications through forms. We are now going to learn how to use forms in React.

#### **Creating a form**

Take the "Far Away" project as an example. When we build forms in React, we use the normal HTML `<form>` element. So we have a `Form` component, and inside it we write the JSX for a form like this:

```js
function Form() {
  return (
    <form className="add-form">
      <h3>What do you need for your trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}
```

> Notice how we have inserted all the `option` elements of the `select` form element programatically. So basically, we made an `Array` by defining its `length` and a mapping function that receives first the current value, and second the current index, and it will return any value that we produce with any expression in this mapping function.

> Remember to define a `key` prop for any element that is produced through a mapping operation. We will later learn what this key is and why it is important.

#### **Form Events**

When we work with a form, we basically want the form to be submitted once we click on a button element. We can then react to the form submission with an event handler.

To listen for the submission event on a form, we add the `onSubmit` prop to its JSX element, and we pass an event handler function to it, not call it. So we would also have to define an event handler function inside the `Form` component.

```js
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}
```

> Note that we have prevented the default behavior of the HTML form element when a submission happens. The default behavior is to perform a full reload for the whole application, but as we have talked about React and its aim to create single-page applications, that is not what we want.

> The input data that is submitted by a form is accessible in the event (`e`) object that is received by the event handler function. Inside this object there is a `target` object that stores all the elements of the form, and their values if they have any. But this is not the way we acquire form input data in React. Instead, we use **Controlled Elements**.

#### **Controlled elements**

An important thing to keep in mind is that, by default, the input fields of a form maintain their own state inside the DOM. This makes it hard to read their values, and it also leaves the state right in the DOM, which is not ideal for many reasons. In React, we want to keep all states in one central place which is inside the React application, and not inside the DOM. In order to do this, we use a technique called **Controlled Elements**.

With this technique, it is React that will control and own the state of the input fields. So, basically, we need some state in our application.

In order to implement the controlled element technique, we follow 3 steps:

1. Create a piece of state
2. Use this state as a value of the input field

```js
function Form() {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description} />
      <button>Add</button>
    </form>
  );
}
```

3. This will make it so that the `value` of the input field is only in sync with the value of the `description` state variable. So we are no longer able to type anything into the field in the UI. In order to fix this, we would have to connect the `description` state variable to the UI. This is done by inserting an `onChange` prop on the input field.

```js
function Form() {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
```

So we have basically defined an event handler function for the `onChange` prop of the input field. This makes it so that everytime we type something in the field, it will update the state with the value that has just been typed. What then? React detects that the state has been updated, so it triggers a re-render.

> Note that `e.target` is the element to which the event handler function is attached.

> **EXTREMELY IMPORTANT:** Notice how functions are passed differently into `onSubmit` and `onChange` props. The reason behind this difference is that when the `submit` event happens, meaning the form data is being submitted, we call the submit handler function immediately with the `event` object automatically passed into it. On the other hand, when the input `change` event happens, we need to pass the new value into the state setter function. So although the `e` object is automatically passed into the setter function, we need to call the setter function with the new state value which is inside the event object, we don't want to call the setter with the event object itself.

We can implement the same technique for the `select` form field.

```js
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
```

We should also twick the `handleSubmit` function to prevent the application to accept empty submissions. It is also a normal practice to make the form go back to its empty initial status as the form is submitted.

```js
function handleSubmit(e) {
  e.preventDefault();

  if (!description) return;

  const newItem = { description, quantity, packed: false, id: Date.now() };
  console.log(newItem);

  setDescription("");
  setQuantity(1);
}
```

> Now as the example application is going on in its development phase, we now need to render this new item created through the form submission. Remember that we cannot pass data as props between sibling elements. Data can only flow down the tree, but not sideways. This is where we really need to start thinking about state and state management in React in order to make it possible to pass data between sibling elements.

## **Review: State vs. Props**

| State                                        | Props                                                                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Internal data, owned by component            | External data, owned by parent component. Similar to function parameters, as a communication channel between parent and children |
| Component's memory                           | Read-only, cannot be modified by the component that is receiving them                                                            |
| Can be updated by the component itself       | **Receiving new props causes components to re-render. Usually when the parent's state has been updated.**                        |
| Updating state causes component to re-render |                                                                                                                                  |
| Used to make components interactive          | Used by parent to configure child component (settings)                                                                           |

# **Thinking in React**

A core skill that every React developer needs to develop, is to think in React. Thinking in React encompasses many aspects:

1. State management
   - When and where to **create** state?
   - When and how to **derive** state?
   - How to communicate between child and parent components by **lifting** state up?
2. some other aspect
3. some other aspect

While you are building an application, thinking in React basically means that you have a very good **mental model** of how and when to use all the React tools, like components, state, props, data flow, effects, and many more. It is also always thinking in terms of **state transitions** rather than element mutations.

Thinking in React can be interpretted as a process that can help us build apps in a more structured way. This process, of course, is not a rigid process. In practice there will be a lot of back and forth between these steps. But here is a good suggestion:

1. Break the desired UI into components and establish **how these components are related** in the component tree. This also includes thinking about **reusablity** and **composiblity** of components.
2. Build a **static version** in React (without state and interactivity). By doing this, we do most of the coding up front, before having to wory about state and interactivity.
3. Think about **state**:
   - When to use state
   - Types of state: local vs. global
   - Where to place each piece of state
4. Establish **data flow**:
   - One-way data flow
   - Child-to-parent communication
   - Accessing global state

> Steps 3 and 4 are called altogether **state management**.

Once we know how to think in React, we will be able to answer these questions:

- How to break up a UI design into components?
- How to make some of my components truly reusable?
- How to assemble UI from reusable components?
- What piece of state do I need for interactivity?
- Where to place state? (what component should own each piece of state?)
- What types of state can or should I use?
- How to make data flow through the application?

## **Thinking: State management (Basic)**

Take a look at a complicated web application. How would we know that we need all pieces of state in the application? How do we know where to place them in the code? This is where state management comes to play.

State management is about deciding **when** to create pieces of state, what **types** of state are necessary, **where** to place each piece of state, and how **data flows** through the app. State management is to give each piece of state a home within our code base.

Up until this point, we never had to worry about state management. We simply placed each state in a component that needed it. However, as an application grows the need to find the right home to each piece of state starts to become really important.

### **Types of state (accessibility)**

There are two types of state: Local vs. Global.

| Local                                                                                             | Global                                                  |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Needed only by one or few components                                                              | Many components might need                              |
| Defined in a component and only that component and child components have access to it (via props) | Accessible to every component in the entire application |

> Looking at a complicated application, an example of local state might be the input text in the search bar. An example of global state can be the shopping cart since this piece of data is used all over the place.

The distinction between local and global state matters more in large-scale applications. In small apps, we won't have any truly global state. One important guideline in state management is to **always start with local state**, and only move to global state if you truly need it.

> In practice, we can define global state using React's **Context API** or an external global state management library called **Redux**.

### **When and where?**

It all starts **when** you realize that **you need to store some data**. When this happens, you have to ask yourself:

**Will this data change at some point in time?**

- No: use a regular `const` variable
- Yes: **Is it possible to compute this new data from an existing piece of state or props?**
  - Yes: _Derive_ state, meaning that you should compute it based on already existing state or prop
  - No: **Should updating the state re-render the component?**
    - No: `useRef`, which persists data over time, like regular state, but does not re-render a component.
    - Yes: Place a new piece of state in the component. (mentioned earlier: always start with local state.)

**Is the state variable that we just created only used by the current component?**

- Yes: Leave the state in the component.
- No: **State variable is also used by a child component?**
  - Yes: Pass to child via props
  - No: **Used by one or a few sibling components or a parent component?**
    - Yes: _Lift_ state up to first _common parent_.
    - No: Probably _global state_. later...

### **Lifting state**

Let's go back to the "Far Away" application as an example. In this application, we are going to set a state variable for all the things that should be listed.

Following the set of questions mentioned in the previous part, we should first ask if the data will change at some point? Yes. Can it be computed from an existing state? No. Should it re-render the component? Yes. So we would have to place a new piece of state in the component for now.

What we do now is to create a new piece of state in the `Form` component for `items`. Then we should use the `setItems` setter function to update the `items` state variable whenever the form input data is submitted.

```js
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
```

> Notice again how we have implemented a callback function inside the `setItems` state setter function because the new state is computed based on the current state.

Up until this point, the state is being updated successfully, but it is not rendered anywhere in the UI. The problem is that the `Form` component in which we have defined the `items` state is actually the sibling of `PackingList` component which is actually responsible for rendering the `items` state to the UI. We cannot pass this data as a prop to the `PackingList`. The solution here is to **lift up state** to the first common parent component, which is the `App` component in this case.

So we move the state definition to the `App` component. Then we would also have to move the `handleAddItems` function to the `App` component because that is where, now, the `setItems` setter function and the `items` state is defined and therefore usable.

Now that we have lifted the state to the `App` component, we can pass the state down to any of the child components.

So the `PackingList` component will simply receive the `items` state variable as a prop, and use it to render the `items` state to the UI.

We also need to pass the `handleAddItems` function, responsible for calling the `setItems` setter function to update the state function, to the `Form` component. Passing down a setter function is also called **child-to-parent communication** or **inverse data flow**, because here it is the child that will update the parent state. It seems as if the data is flowing up, which in fact is not true.

```js
export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}
```

> There is a convention for naming the prop through which a state setter function is passed. In this example, we insert the `handleAddItems` function into a prop called `onAddItems`.

We would then have to prepare the `Form` and `PackingList` components to receive these props. We would update the `Form` component like this:

```js
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
```

And the `PackingList` component like this:

```js
function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
```

As another example, we now want to implement the functionality of deleting items from the list. This means that whenever we hit the X button on any of the elements, that button should be removed from the state, and therefore, should also be removed from the UI.

So we define a `handleDeleteItem` function in the `App` component.

```js
export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}
```

And then we should pass it into the `Item` since it is in that component where the click on delete button will happen in the UI. But on the way to that component, there is the `PackingList` component. So we first pass the `handleDeleteItem` function to the `PackingList` component, and then from there, we pass it into the `Item` component.

```js
function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
```

> This is, again, the case where we previously mentioned an **EXTREMELY IMPORTANT** note. Keep in mind that we cannot immediately call the `onDeleteItem` function in the `onClick` prop, because in that case, the function will be called with the event (`e`) object passed into it automatically. But here, we don't want to call this function with the event object. Instead, we want the function to be called while the item ID is passed into it. This is why we used a callback function inside the `onClick` prop, in order to be able to pass the necessary data into the `onDeleteItem` handler.

As another example, we now want to implement a checkbox for each item. If the checkbox is checked, we want the item's `packed` property to be updated. It means that we actually want the `items` state variable to be updated.

We start by defining the `handleToggleItem` function in the `App` component since this is where the `items` state variable and its setter function are located. Remember that this `handleToggleItem` function should receive the item ID in order to be able to find it in the items and update it.

```js
function handleToggleItem(id) {
  setItems((items) =>
    items.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    )
  );
}
```

We should then pass this function into the `Item` component, but on its way, it should first go through the `PackingList` component.

```js
export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}
```

Now we should receive the function inside the `PackingList` component and then pass it to the `Item` component.

```js
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
```

### **Derived state**

This is pretty straight forward. Derived state is state that is computed from an existing piece of state of from props.

Whenever you are in a situation where one state is easily computed from another, always prefer derived state.

As an exmple of this, let's calculate the statistics displayed in the `Stats` component of our imaginary application. What we should do is to pass the `items` state variable to the `Stats` component, where some new states will be derived from the `items` state and then reflected in the `Stats` component.

So in the `App` component, the only thing we do is:

```js
return (
  <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList
      items={items}
      onDeleteItem={handleDeleteItem}
      onToggleItem={handleToggleItem}
    />
    <Stats items={items} />
  </div>
);
```

Then we receive the `items` state variable in the `Stats` component, and based on the value of this state variable, we perform some actions.

```js
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list.</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈"
          : `💼 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
```

## **Thinking: State management (Advanced)**

In this advanced section of state management, we are going to talk about:

1. State management (domain): UI vs. remote
2. Where to place each piece of state
3. Tools to manage all types of state

### **Types of state**

We can classify state in terms of state accessibility and state domain.

1. **Accessibility:** in this categorization we have local state and global state. Local state is needed only by one or few components, and it is only accessible in component and child components. However, global state is state that might be needed by many components, and is accessible to every component in the application.

> If you need to create a state variable in a component but you are not sure if it should be local or global, there is nice trick you can use. All you need to do is to ask yourself **if this component was rendered twice, should a state update in one of them reflect in the other one?** If the answer is no, then it means that it should be a local state, but if it is a yes, you should implement a global state.

2. **Domain:** we can classify each piece of state in 2 categories: When you have a piece of state, it is extremely important to know whether you are dealing with remote state or UI state, because they should be managed in complete different ways.

   - Remote state: this is all application data that is loaded from a remote server, usually using an API. It is state that lives on a server that can be loaded into the application. Remote state is usually acquired asynchronously, and might need to be re-fetched and updated frequently. Therefore, in a large-scale app, remote state should be cached, revalidated and so on, which needs some special tools.
   - UI state: basically everything else, such as theme, list filters, form data, etc. In other words, all state that is not core application data that we usually fetch from an API is UI state. UI state is usually synchronous and stored right in the application and does not interact with any server at all. UI state is very easy to handle with the tools that we know of, such as `useState` and `useReducer`.

### **Where to place state**

When we want to create a piece of state, we basically have 6 different options on where we can place it.

| Where to place?   | Tools                                    | When to use?                        |
| ----------------- | ---------------------------------------- | ----------------------------------- |
| local component   | `useState`, `useReducer`, `useRef`       | local state                         |
| parent component  | `useState`, `useReducer`, `useRef`       | lifting state up                    |
| context           | Context API + `useState` or `useReducer` | global state (preferably UI state)  |
| 3rd-party library | Redux, React Query, SWR, Zustand, etc.   | global state (remote or UI)         |
| URL               | React Router                             | global state, passing between pages |
| browser           | local storage, session storage, etc.     | storing data in user's browser      |

> Context API on its own is not a state management feature of React. We almost always use it with `useState` and `useReducer`.

### **State management tool options**

If we combine all classifications of state according to accessibility and domain, we end up with these combinations:

1. Local UI state
2. Global UI state
3. Local remote state
4. Global Remote state

Let's now take a look at the tools that we can use to manage each variation.

| State classification | Local state                                     | Global state                                                                                                                                                  |
| -------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UI state**         | `useState`, `useReducer`, `useRef`              | using Context API + `useState`/`useReducer` or using Redux, Zustand, Recoil, etc. or using React Router                                                       |
| **Remote state**     | `fetch` + `useEffect` + `useState`/`useReducer` | General solutions: using Context API + `useState`/`useReducer` or using Redux, Zustand, Recoil, etc. Highly specialized solution: React Query, SWR, RTK Query |

> In large-scale applications using the combination of `fetch` + `useEffect` + `useState` to manage local remote state is not simply enough. This brings us to the tools that we need to manage global remote state.

> The specialized methods included in managing global remote state involve built-in mechanisms like caching and re-fetching in order to deal with the asynchronous nature of remote state. These solutions are highly recommended.

## **Thinking: Components**

We will now learn:

- How to think about components
- Composition
- Reusability
- How to split a component
- Building layouts

It is important to first understand how to split a UI into components and what type of components we can use.

### **Splitting a UI into components**

When it comes to components these are the important questions that we should ask:

1. How to split a UI into components?
2. When should we create new components?

One important factor that helps us answer these questions is the **component size**. A component, at its extremes, can be huge or small. Many times none of these extremes are ideal.

A huge component is identified when it has a lot of responsibilities. Components are just like JavaScript functions, in the sense that if a function **does too many different things**, we should break it up into multiple functions. Another sign of a huge component is that it might **receive too many props**, like 10 or 15! These make the component very **hard to reuse**. It also makes the code complex and hard to understand.

But this does not mean that we should switch to the other extreme and build small components, splitting every single functionality into its own component.

| Small                                               | Huge                      |
| --------------------------------------------------- | ------------------------- |
| End up with 100s of mini-components                 | Too many responsibilities |
| Confusing code base because of too much abstraction | Might need too many props |

Most of the time the goal is to create components that strike the right balance between being too specific and too broad.

Here are 4 criteria for splitting a UI into comonents:

1. **Logical separation** of content/layout
2. **Reusability**
3. Each component has **a single well-defined responsibility** to avoid complexity
4. **Personal coding style:** some people prefer smaller components, while others prefer larger components

#### **When to create a new component?**

When you are creating a new component and you are in doubt about what the component should include, just start with a relatively big component, but not a huge component. Then split the big component into smaller components as it is necessary. But when does it become necessary?

Here is a framework based on the 4 criteria mentioned above to help you decide when to create a new component:

1. **Logical separation of content/layout:** Does the component contain pieces of content or layout that don't belong together? If yes, Then you might need a new component.
2. Is it possible to **reuse parts of the component?** Do you want or need to reuse it? If yes, then you should probably take that code and extract it into its new component.
3. Is the component **doing too many different things?** Does the component **rely on too many props?** Does the component **have too many pieces of state and/or effects?** Is the code, including JSX, **too complex/confusing?** If yes, then you might need a new smaller component.
4. **Personal coding style:** Do you prefer smaller functions/components? If yes, you might need a new component.

#### **General guidelines**

- Creating a new component creates a new abstraction. Abstractions have a cost, because **more abstractions require more mental energy to switch back and forth between components.** So try not to create new components too early.
- **Name a component according to what it does** or what it displays. Don't be afraid of using long names.
- **Never declare a new component inside another component.** Instead, co-locate related components inside the same file. Don't separate components into different files too early.
- It's completely normal that **an application has components of many different sizes**, including very small and huge ones: we always need some very small components in any application, because they are highly reusable and have very low complexity. For instance, you can imagine the like button component in an application.
- Most apps will have a **few huge components that are not meant to be reused.** For instance, a `Page` component of an application that contains the layout of the entire application or the page.

> The reusability range is pretty similar to the size range. **Generally, the smaller the components are, the more reusable they will be,** but not all components are meeant to be reusable. These are usually the huge components.

### **Component categories**

Most of your components will naturally fall into one of these three categories. We say naturally, because we should not force our components into one of these categories.

1. **Stateless/presentational:** They don't have any state. They are usually components that receive some props and then they simply present the received data or other content. These are usually small and reusable components, like logo, number of results, and one single item component.
2. **Stateful:** They do have state. Just because they have state, it does not mean they cannot be reusable. For instance, a search component does have state and we can reuse it as many times as we need.
3. **Structural:** These include pages, layouts, or screens of the application, which are oftentimes the result of componsing smaller components together. Structural components can be **large and non-reusable components,** but they don't have to. Structural components can also be small. What matters is that they are responsible for providing some sort of structure to applications, such as pages or layouts. So these components might not be used in small applications.

### **Component's API**

When we build a reusable component, we should think about what props the component needs.

Any component is always created by someone, and always consumed by someone. Obviously, when you are working on your own, the creator and consumer of a component is the same person, but on a team they might very well be different people. In any case, it is always a good idea to think in terms of there being a **creator** and a **consumer**.

The creator is the person who builds a component and **defines what props** the component can accept. The consumer uses the component by **specifying values for the props**. The reason for separation between consumer and creator is that if we have this mindset, we can think of component props as the **public API** of the component.

As a component creator, when we choose what the component consumer is allowed to pass in, we are actually defining the public interface of our component. At the same time, we are choosing how much complexity of the component we want to expose to the consumer of the API. In the end, a component is just an abstraction. It encapsulates a part of the UI and the associated logic into a component and allows consumers to interact with that component via props.

When we decide about what props to allow in the component, we need to find a good balance on how strict we want to be, especially about how many props we want to enable for configuration.

| Too little props    | Too many props               |
| ------------------- | ---------------------------- |
| Not flexible enough | Too hard to use              |
| Might not be useful | Exposing too much complexity |
| -                   | Hard-to-write code           |

It is best to try to find the right balance between too little and too many props, that works for both the consumer and the creator. In case you need to expose so many props, make sure you provide some good default values for many of them.

# **How React works behind the scenes**

As the first topic in this section, it is nice to know the difference between three key concepts:

1. React components
2. Component instances
3. React elements

This will help you understand what actually happens with your components as you use them.

## **Know more about React components, component instances and React elements**

### **React Component**

Components are what we write to describe a piece of the user interface. A component is a regular JavaScript function, but it returns React elements. It actually returns an element tree and we usually write these elements using the JSX syntax.

A component is a generic ddescription of the UI. It can be imagined as a blueprint. It is out of this one blueprint that React creates one or more component instances. React does this whenever you call the component in JSX somewhere in your code, that is when you 'use' a component. For instance:

```js
<Tab item={content[0]}/>
<Tab item={content[1]}/>
<Tab item={content[2]}/>
```

This will make it so that the `Tab` component would be included three times in your app, and therefore, three instances of the component will be placed in the component tree. Behind the scenes this happens because React calls the `Tab` item three times, once for each instance. So an instance is the actual physical manifestatiion of a component that lives in our component tree, whilte the component itself is just a function that you write before being called.

> Calling a component using a regular JavaScript function call violates the rules of hooks among creating many other problems. So calling a component like this:
>
> ```js
> {
>   TabContent({ item: content[0] });
> }
> ```
>
> will make the component's state end up in the parent component. They will no longer be inside the `TabContent` component, so it won't be able to manage it's own state. Also, React will not even consider this function call to be a component. You cannot see it in the component tree diagram in React dev tools.

### **Component Instance**

A physical manifestation of a component that holds its own states and props and it also has its own life cycle. It can 'be born', 'live' for some time, and 'die' finally.
As React executes the code in each of the instances, each instance will return one or more React elements. Behind the scenes, JSX will get converted to multiple `React.createElement()` function calls. Then as React calls these functions, the result will be a React element. So, essentially, a React element is the result of using a component in your code.

### **React element**

It is a big immutable JavaScript object that React keeps in memory. It contains all the information necessaray to create DOM elements for the current component instance. So the React element will eventually be converted into an actual DOM element, and then painted on to the screen by the browser. So the DOM elements are the actualy, final and visual representation of the component's instance in the browser. Again, it is not React elements that are rendered to the DOM. React elements just live inside the React app and have nothing to do with the DOM. They are converted to DOM elements when they are printed on the screen.

## **How rendering works**

In summary, as you build your application, you are actually building a bunch of components. You then use these components as many times as you want, which will cause React to create one or more component instances, which are the actual physical components that live in our application, holding their own state and props.

Each component instance returns a JSX, which in turn will produce a bunch of `React.createElement()` function calls, which in turn, will produce a React element for each instance. This React element will eventually be transformed into actual DOM elements and displayed as the whole user interface on the screen.

We currently have a good understanding about the initial part of this process; that is, transforming components to React elements. But we don't know yet, how the second part of this process is carried out, which is transforming React elements into DOM elements and then being displayed in the UI.

### **How components are displayed on the screen**

We are now going to take a quick look at each of the phases involved in displaying components on the screen. Then we will zoom into each phase to understand how the entire process works internally.

The process that we are interested in starts by React each time that a new render is triggered, most of the time by updating the state somewhere in the app. So we can now list the phases as:

1. **Render is triggered:** There are only 2 ways in which a render can be triggered:

   - Initial render of the application, which is the very first time that the app runs.
   - Re-render which happens when state is updated in one or more component instances.

> The render process is triggered for the entire application, not just for one single component. However, this does not mean that the entire DOM is updated. In React, rendering is only about calling the component functions, and later figuring out what needs to change in the DOM. This might seem confusing because in practice, it looks like React only re-renders the component where the state update happens, but that is not how it works behind the scenes. Actually, React looks at the entire tree whenever a render happens.

> A render is not triggered immediately, but **scheduled** for when JS engine has some 'free time'. This, however, means a few miliseconds that we don't even notice. There are also some situations like multiple `setState` function calls in the same function, like event handlers, where renders will be **batched**. Take this code as an example:
>
> ```js
> const [answer, setAnswer] = useState("");
> const [best, setBest] = useState(true);
> const [solved, setSolved] = useState(false);
> const reset = function () {
>   setAnswer("");
>   console.log(answer);
>   setBest(true);
>   setSolved(false);
> };
> return (
>   <div>
>     <button onClick={reset}>Reset</button>
>   </div>
> );
> ```
>
> Let's focus on the `reset` event handler function. You might think that React will trigger a re-render right after each state update, but that is not how React works. The three state updates will get batched to be performed in one go and there will be only one render and commit per event handler. It is nice to note that this makes it so that at the point where `answer` state is logged to the console, it will still show the current value of this state before being changed to an empty string.
>
> State update will only be reflected in the state variable after the corresponding render. This is why we say that updating state in React is asynchronous. This also applies when only one state variable is updated. The updated state is only available after the re-render, not immediately. However, sometimes we need the new value of the state variable immediately after updating it. This might happen, for instance, when we need to update the state variable again, based on the updated value. In other words, this is when we need to update state based on a previous state update in the same event handler. In these situations we pass a callback function into the state setter function.
>
> ```js
> setAnswer((answer) => answer + "*");
> ```
>
> This is important to remember about functionalities like the tripple like button in the example you studied.
>
> Before React 18, React only did automatic batching in event handlers, but not in situations that happened after a browser event has already happened. However, there are some important situations when we do need to update state long after a browser event, like a click, has happened. Examples are `setTimeout()` and promises. For instance, we might want to call the `reset` function mentioned above only after 1 second, or we might want it to be called after a data has been fetched. It would be useful to have automatic batching in these situations too. Luckily, React 18 has enabled this feature, but before that, when the `reset` function was called in a `setTimeout()` function, state updates were not batched, and a re-render would be triggered for each state update. React 18 also supporta automatic batching in native events. So batching will also be done if the `reset` function is called in an `addEventListener()` function. It is nice to know that if a batch state update leads the state variables to a value that they currently have, React will not even bother doing the update and the re-render. It knows nothing will change with this update.

> We can opt out of automatic batching by wrapping a state update in `ReactDOM.flushSync()`. This is almost never used.

2. **Render phase:** React calls component functions and figures out how it should update the DOM, in order to reflect the latest state changes. However, it will not update the DOM in this phase. So React's definition of render is different than what we usually refer to by using the word 'render'. It is important to consider that **in React, rendering is NOT updating the DOM or displaying elements on the screen. Rendering only happens internally inside React. It does not produce visual changes.** In the common sense, the meaning of the word 'render' will actually involve this and the next phase; that is the Commit phase. But let's see the stages that happen in this phase in detail:

In the beginning of the render phase, React goes through the entire component tree, take all the component instances that triggered a re-render and actually render them, which means calling the corresponding component functions written in the code. This creates updated React elements which altogether make up the new **Virtual DOM**.

> What is a Virtual DOM? Let's see when it was first created. On the initial render, React takes the entire component tree, and transform it into one big React Element, which is the React Element Tree, which is what we call the **Virtual DOM**. So the Virtual DOM is a tree of all React elements created from all instances in the component tree. It is cheap and fast to create a tree like this, even if we need many iterations of it, because it is just a JavaScript object.

Now if a state update happens in a component, like D, it will trigger a re-render. This means that React will call the component function again, and place the new React element in the new React Element Tree or the new Virtual DOM. It is now important to remember that **re-rendering a component will cause all of its child components to be re-rendered as well** no matter the props passed into them has changed or not. So again, if the updated component returns one or more other components, those nested components will be re-rendered all the way down the component tree. Remember that re-rendering means that a new Virtual DOM is created.

> If you update the highest component in the component tree, the entire application will be re-rendered. React uses this strategy because it does not know beforehand whether an update in a component will affect the child components or not. Remember that this does not mean that the entire DOM is updated. It is just the Virtual DOM that will be recreated, which is not a problem in small or medium-sized apps.

The new Virtual DOM that was created after the state update, will get **Reconciled** with the **current Fiber tree** as it exists before the state update. The reconsiliation happens in React's reconciler, which is called **Fiber**. The result of the reconciliation process is an **updated fiber tree** that will be used to write to the DOM.

> Now what is the reconciliation process? Let's answer some questions before that. Why do we even need stuff like the Virtual DOM, a reconciler, and the fiber trees? why not simply update the entire DOM whenever state changes somewhere in the app? The answer is easy. We previously mentioned that creating the Virtual DOM is cheap and fast because it is just a JavaScript object. However, writing to the DOM is not cheap and fast. It is actually relatively slow. It is extremely inefficient to always write the entire virtual DOM to the actual DOM each time that a render was triggered. Also when state is updated in the app, usually only a small part of the DOM needs to be updated, and this is what React tries to do. Whenever a render is triggered, React tries to be as efficient as possible by reusing as much of the existing DOM tree as possible. But how does React do this? How does it know what changed from one render to the next one? This is where reconciliation comes to play.
>
> Reconciliation is the process of deciding which DOM elements actually need to be inserted, deleted, or updated, in order to reflect the latest state changes. The result of this process is a list of DOM operations that are necessary to update the current DOM with the new state.
>
> Reconciliation is processed by a reconciler. We can say that the reconciler is the engine of React. This reconciler allows us to never touch the DOM directly. It tells React simply what the next snapshot of the UI should look like based on state. The current reconciler in React is called **Fiber**.
>
> Let's now see how Fiber works. During the initial render of the app, Fiber takes the entire React element tree (Virtual tree), and based on it, builds yet another tree which is the **Fiber tree**. It is a special internal tree where for each component instance and DOM element in the app there is one Fiber. The special thing about this tree is that unlike React elements in the virtual DOM, Fibers are not recreated on every render. The Fiber tree is never destroyed. Instead, it is a mutable data structure and once it has been created during the initial render, it is mutated over and over again in future reconciliation steps. This makes Fibers the perfect place for keeping track of things like the current component state, props, side effects, list of used hooks, and so on. So the actual state and props of any component instance that we see on the screen, are internally stored inside the corresponding fiber in the Fiber tree. Additionally, each fiber contains a queue of works, like updating state, updating refs, running registered side effects, performing DOM updates, and so on. This is why a Fiber is also defined as a unit of work.
>
> Taking a look at the Fiber tree, you can notice that it's structure is different from the Virtual DOM. Instead of a normal parent-child relationship, each first child has a link to its parent, and all the other children then have a link to their previous sibling. This structure is called a **linked list**, and it makes it easier for React to process the work associated with each fiber. Also note that both trees (Virtual DOM and Fiber tree) include not only React elements or components, but also regular DOM elements. So both trees are a complete representation of the entire DOM representation.
>
> Returning to the idea of considering each fiber a unit of work, one important characteristic of the Fiber reconciler is that **work can be performed asynchronously**. This means that the rendering process, which is what the reconciler does, can be split into chunks, some tasks can be prioritized, and work can be paused, reused, or thrown away. All this happens behind the scenes, but there are some practical uses of this asynchronous rendering. It enables modern concurrent features, like suspense and transitions, starting in React V18. It also allows the rendering process to pause and resume later so that it won't block the browser's JS engine with too long renders which can be problematic for performance in large apps. This is only possible because the render phase does not produce any visible output to the DOM yet.
>
> So now that we now what the reconciler is, and how the fiber tree works, it is time to talk about what Fiber actually does, which is the reconciliation process in action. Imagine a certain Virtual DOM and the corresponding Fiber tree. In the imaginary `App` component, there is a piece of state called `showModal` which determines whether a `Modal` window should be visible in the app or not. This state is currently set to `true`. But now we change this state to `false`. This triggers a re-render which will, in turn, create a new Virtual DOM where there is no sign of the `Modal` component and its children anymore. In this new Virtual DOM all remaining children of the `App` component are re-rendered because the `App` component itself is re-rendered due to the `showModal` state change. Now this new Virtual DOM needs to be reconciled with the current Fiber tree, which will then result in an updated Fiber tree, which is internally called the `workInProgress` tree. Whenever reconciliation needs to happen, Fiber walks through this updated tree step-by-step and analyses exactly what needs to change between the current fiber tree and the updated fiber tree based on the new Virtual DOM. This process of comparing elements step-by-step based on their position in the tree is called **Diffing**. Once this process is over, all these DOM mutations will be placed into a list called **List of Effects** which will be used in the Commit phase to actually mutate the DOM.

Up until this point, React hasn't written anything to the DOM yet, but it has figured out the so-called **List of Effects**, which is actually a list of DOM updates.

> Diffing is based on 2 fundamental assumptions:
>
> 1. Two elements of different types will produce different trees.
> 2. Elements with a stable key, which is consistent over time, will stay the same across renders.
>
> These assumptions allow the algorithm to be much faster, improving from a billion operations per thousand elements to only one thousand operations per thousand elements.
>
> Diffing is comparing elements step-by-step between two renders based on their position in the tree. They are basically 2 different situations that need to be considered:
>
> 1. **Two different elements at the same position in the tree between two renders:** imagine a JSX syntax where a type `<div>` element is changed to type `<header>`, but its child component `<SearchBar>` is the same. In this situation React assumes the element and all its children are no longer valid. So old components are destroyed and removed from the DOM, including their state. This will include the `<SearchBar>` in the re-render process, so it will also be replaced with a new `<SearchBar>` and its state will not be recovered. This scenario works this way no matter the change happened on a DOM element or a React component instance.
> 2. **Same element at the same position in the tree:** if after a render an element at a certain position in the tree is the same as before, the element will simply be kept in the DOM, and that includes all child elements and more importantly, the component's state. This scenario works no matter it is a DOM element or a React component instance that has remained the same. It is important to remember that for this scenario to happen, only the DOM element or React component instance itself needs to stay the same, but their props or attributes can change. If attributes or props are changed, React will simply mutate the DOM element attributes or pass in the new props. **Sometimes we don't want this standard behavior, but instead, we want to create a new component instance with the new state, and this is where the `key` prop comes to play.**

1. **Commit phase:** in this phase, new elements might be placed in the DOM and already existing elements might get updated or deleted so as to correctly reflect the current state of the application. It is this phase that is responsible for what we traditionally call rendering. After all this, the browser will notice that the DOM has been updated and so it repaints the screen. Of course, this final step has nothing to do with React, but this is where the user will actually see the visual change on their screen.

Continuing from the previous phase, technically, the current `workInProgress` Fiber tree also goes into this phase but let's just keep it simple here.

In this phase, the DOM gets updated. React writes to the DOM. This involves insertions, deletions, and updates. This is sometimes referred to as 'React **flushes** the list of DOM updates to the DOM'. React goes through the effects list that was created during rendering, and applies them one-by-one to the actual DOM elements that were already existing in the DOM tree.

> It is important to note that comitting is **synchronous** unlike the rendering phase which can be paused. It means that DOM is updated in one go, it can't be interrupted. This is necessary so that the DOM never shows partial results, ensuring a consistent UI that is in sync with state at all times. Actually, this is the whole point of dividing the entire process into the render phase and commit phase in the first place.

After the commit phase completes, the `workInProgress` fiber tree becomes the current tree **for the next render cycle**. Fiber trees are never discarded, as we mentioned earlier. They are reused in order to save precious rendering time. Now the commit phase is closed, and the browser will notice that the DOM has changed, and it will re-pain the screen when it has some idle time. This is when the DOM updates are finally made visible to the user in the form of an updated UI.

> So the next phase in this whole process is the Browser paint phase, which is performed by whatever browser the user is using. The rendering phase is performed by the React library. But what about the commit phase? We would think that it is performed by React, but that is not true. It is actually the `ReactDOM` that writes to the DOM. React never touches the DOM. React actually has no idea where the result of the render phase will be commited and painted. The reason for this is that React was designed to be used independantly from the platform where elements will be shown, therefore React can be used on different platforms (hosts). Up until this point, we have only thought of React in conjunction with the DOM, because we usually use it to build web apps, and that is mostly the case. But React is used with other hosts as well. For instance, you can build native mobile apps for iOS or Android using **React Native**. You can also create videos with React using a package called **Remotion**. We can even make all kinds of documents, like Microsoft Word, PDF docs, and Figma designs, and many more using different **Renderers**.
>
> According to React's terminology, renderers do not render, but they commit the results of the render phase. Some believe that the 'renderer' name comes from before React divided the render and the commit phase into separate phases. Anyway, in all these situations, the result of the render phase is not a list of DOM updates, but a list of updates of whatever elements are used in the host that is being used. So looking at this process from this point of view, the 'Virtual DOM' term also does not make much sense. All you need to keep in mind from what is said here, is that the React library is not responsible for writing to the DOM, because a DOM is just one of many hosts to which React apps can be commited. For each host, we have a package that we can use. That is why we have always imported `react` and `react-DOM` in `index.js` files.

4. **Browser Paint phase**

#### **REACAP**

1. The whole process of rendering and displaying a React app, starts with a trigger, which can either be the initial render of the app, or a state update in one of the component instances.
2. This then triggers the Render phase which does not produce any visual output. This phase starts by rendering all component instances that need a re-render. Rendering in React means to call the component functions. This will create one or more updated React elements placed in a new virtual DOM, which is actually a tree of React elements. You should remember that re-rendering a component will cause all of its child components to render no matter if props changed or not. The new Virtual DOM needs to be reconciled with the current Fiber tree. This is necessary becasue it would be inefficient and slow to destroy and rebuild the entire DOM tree each time that something on the screen must be updated. Instead, reconciliation tries to reuse as much of the DOM as possible by finding the smallest number of DOM updates that reflect the lates state update on the screen. The reconciliation process is done using a reconciler called Fiber, which works with a mutable data structure called the Fiber tree. In this tree, for each React element and DOM element there is a fiber. This fiber holds the actual component state, props, and a queue of work. After reconciliation, the queue of work will contain the DOM updates needed for that element. The computation of these DOM updates is performed by a Diffing algorithm, which step-by-step compares the elements in the new Virtual DOM with the elements in the current Fiber tree to see what has changed. The final result of the render phase (Reconciliation + Diffing) is a second updated fiber tree as well as a list if all necessary DOM updates. Note that the render phase is asynchronous. So Fiber can prioritize and split work into chunks and pause and resume some work later. This is neccessary for concurrent features, and also to prevent the JS engine from being blocked by complex render processes. The output of the render phase will finally be written to the DOM in the commit phase.
3. In the commit phase, a renderer like ReactDOM will insert, delete, and update DOM elements, so that we end up with an updated DOM that reflects the new state of the app. Unlike the render phase, this phase is synchronous. So all the DOM updates are performed in one go so as to ensure a consistent UI over time.
4. Once the browser realized that the DOM is updated, it starts a new browser paint in order to print a new UI on to the screen.

### **What is the `key` prop?**

It is a special prop that we use to tell the diffing algorithm that an element is unique. This works for both DOM elements and React component instances. It means that we can give each component instance a unique identification, which allows React to distinguish between multiple instances of the same type. But why we need this?

Remember what the second assumption of the diffint algorithm?

> **Same element at the same position in the tree.**

1. Whenever an element has a stable key across renders, the element will be kept in the DOM even if the position in the tree has changed. **This is why we should always use the `key` prop in lists.** Imagine we have a list with two `Question` items but with no key props.

```js
<ul>
  <Question question={q[1]} />
  <Question question={q[2]} />
</ul>
```

When we add a new item to the top of the list:

```js
<ul>
  <Question question={q[0]} />
  <Question question={q[1]} />
  <Question question={q[2]} />
</ul>
```

The two previous list items is obviously the same, but their position in the Virtual DOM. So we now have the same elements at different positions. According to diffing rules, these two DOM elements will be removed from the DOM and then recreated immediately at their new positions. This is bad for performance, but React has no way of understanding it. So we use the `key` prop to uniquely identify an element, then give React this information.

```js
<ul>
  <Question question={q[0]} key="q0" />
  <Question question={q[1]} key="q1" />
  <Question question={q[2]} key="q2" />
</ul>
```

This way `Question` instances with `q1` and `q2` keys will not be destroyed and recreated. This makes a huge impact on performance when you render long lists with thousands of elements.

**Always use the `key` prop when you have multiple child elements of the same type.**

2. On the other hand, when an element's key changes between renders, the element will be destroyed and a new one will be created even if the position in the tree is the same as before. **This is great to reset state in component instances**, which is the second big use case of the `key` prop. Whenever you need to reset state, make sure you give the element a key, and the key changes across renders.

For instance, in this code:

```js
<QuestionBox>
  <Question
    question={{
      title: "React vs JS",
      body: "Why should we use React?",
    }}
  />
</QuestionBox>
```

Now if the `question` prop changes, what React sees is that the `Question` component instance type has remained the same and its position in the Virtual DOM has not changed. So it will keep it in the DOM and preserve its `answer` state, which is not what we want. We actually want to change the `answer` state whenever the question is changed. In this case we need to insert a `key` prop into the `Question` instance.

```js
<QuestionBox>
  <Question
    question={{
      title: "React vs JS",
      body: "Why should we use React?",
    }}
    key="q23"
  />
</QuestionBox>
```

We now need to make sure that the `key` prop changes for the next question.

```js
<QuestionBox>
  <Question
    question={{
      title: "Best course ever :D",
      body: "This is THE React course!",
    }}
    key="q89"
  />
</QuestionBox>
```

### **Rules for render logic**

In order for the rendering process to work in the way that we learned, your render logic needs to follow some simple rules. But what is render logic?

There are 2 types of logic in React components:

1. Render logic: it is all the code living at the top level of the component function, and participates in descibing how the component view looks like. For instance, state declarations and JSX return statements are considered render logic. Render logic is all the code that is executed as soon as the component is rendered, so each time that the function is called.
2. Event handler functions: these are pieces of code that are executed as a consequence of the event that the handler is listening to.

It is important to differentiate between these 2 different types of logic since they do fundamentally different things. While render logic is code that renders the component, event handlers contain code that actually **does things**, so that is code that makes things happen in the app. Event handlers contain things like state updates, HTTP requests, reading input fields, page navigation, and so on. These are things that manipulate the app in some way.

This is important to understand because React requires that components are **pure** when it comes to render logic, in order for everything to work as expected.

What does pure mean? we must remind ourselves of some functional programming principles.

#### **Functional programming principles**

**Side effects:** this happens when a function depends on any data that is outside the function scope, or even more importantly, when a function modifies data that is outside its scope. Side effect is the function's interaction with the outside world. Examples of side effects are HTTP requests, writing to the DOM, setting timers and more.

**Pure functions:** these are functions without side effects. They do not change any variable outside their scope. Also, when they are given the same input, they always return the same output.

Here is an example of a pure function:

```js
function circleArea(r) {
  return 3.14 * r * r;
}
```

But this is an example of an impure function:

```js
function circleArea(r) {
  const date = Date.now();
  const area = 3.14 * r * r;
  return `${date}: ${area}`; // unpredictable output
}

const areas = {};
function circleArea(r) {
  areas.circle = 3.14 * r * r; // outside variable mutation
}
```

Now it may seem that it is bad to have functions with side effects, but it is not. Actually, a program can only be useful if it has some interaction with the outside world at some point. However, in order to make useful and bug-free apps, we need to know when and how to create side effects, which brings us back to React rules for render logic.

Essentially, there is just one big rule which is that **components must be pure functions when it comes to render logic**. It means that if we give a component instance the same props the component should always return the same output in the form of JSX.

This practically means that **render logic is not allowed to produce any side effects**. So the logic that runs at the top level and is responsible for rendering the component should have no interaction with the outside world. This means that render logic is not allowed to perform:

1. Network requests (API calls)
2. Start timers
3. Directly use the DOM API: listening to events with `addEventListener`
4. Not mutate objects or variables outside the function scope: so we cannot mutate props.
5. Update state (or refs): state updates are not side effects, but it will create an infinite loop.

> Keep in mind that all this stuff are only forbidden inside render logic. It means that you have other options for running your side effects. For instance, side effects are allowed (and even encouraged) in event handler functions. There is also a special hook to register side effects `useEffect`. This is used if we need to create a side effect as soon as the component function is first executed.

## **How events work in React**

[There is a useful review on events and their behavior in JavaScript in the tutorial video.]

### **Synthetic events**

Let's now see how event objects actually work behind the scenes. When we declare an event handler like the code example below...

```js
<input onChange={(e) => setText(e.target.value)} />
```

...React gives us access to the event object that was created, just like in JavaScript. However, in React, this event object is different. In vanilla JavaScript we get access to the native DOM event object, such as `PointerEvent`, 'MouseEvent', 'KeyboardEvent', and so on. React, on the other hand, gives us access to something called `SyntheticEvent`, which is a wrapper around the DOM's native event object. By 'wrapper', we mean that `SyntheticEvent` is very similar to the native event obejct, but they just add or change some functionalities on top of them.

Synthetic events have the same interface as native event objects, such as `stopPropagation()` and `preventDefault()`. The special thing about synthetic events is that they fix some browser inconsistencies, making it so that events work in the same way in all browsers. The React team also decided most of the synthetic events bubble, including _focus_, _blur_, and _change_ events which usually do not bubble. There is one exception, and that is the _scroll_ event, which does not bubble in React also.

### **How event handlers bahave in vanilla JavaScript and React**

1. In React, the prop name to attach an event handler is named in camelCase. So that is `onClick` instead of `onclick` or `click`.
2. In vanilla JavaScript, when we want to stop the default behavior of the browser in response to an event, we can return `false` from the event handler function. The big example of this, is the browser's automatic reload in response to a form submission. However, returning `false` in a React event handler would simply not work. The only way in React is to call the `preventDefault()` on the synthetic event object.
3. In rare situations where you need to handle an event in the capturing phase rather in the bubbling phase, you can simply attach 'Capture' to the event handler name. For instance, you would write `onClickCapture` instead of `onClick`. However, you will probably never use this.

### **Component lifecycle**

The lifecycle of a component encompasses the different phases that a component can go through over time. Here is a list of these phases:

#### **Phase 1: mounting - initial render**

This is when the component is rendered for the very first time. This is also when fresh state and props are created for the component instance, and therefore we can say that this is when the component is born. Once the component is rendered and is on the screen, it can be rendered an unlimited number of times.

#### **Phase 2: re-rendering**

A React application is re-rendered whenever there is a state update. However, when we mentioned this, we were talking about the entire application, not about one specific component instance.

Here we can go deeper in detail and say that a component instance also re-renders when:

1. State changes
2. Props changes
3. Parent component re-renders
4. Context changes [more about this later...]

This phase is **optional**. It does not always happen in all components. Some components are mounted and then unmounted right away, which brings us to the next phase.

#### **Phase 3: unmounting**

This is when a component instance dies, meaning that it is completely destroyed and removed from the screen along with its state and props. This can happen when users navigate to a new section or new page of the app, or they close the app.

> Remember that after one instance of a component is unmounted, a new instance of the same component can be mounted later, but the previous instance is completely gone.

> It is important to know about the lifecycle of a componenta instance, because you can hook into different phases of this lifecycle. You can basically define code to be executed at these specific points in time, which can be extremely useful. We do this using the `useEffect()` hook

## **Hooks**

React hooks are special built-in functions that allow us to hook into some of React internal mechanisms. In other words, hooks are APIs that expose some internal React functionality such as creating and accessing state from the fiber tree, or registering side effects in the fiber tree.

The fiber tree is somewhere deep inside React, and usually not accessible to us at all. But using the `useState` or `useEffect` hook, we can hook into that internal mechanism. Hooks also allow us to manually select and store DOM nodes, and many more things.

All React hooks start with the word `use`. We can even create our own custom hooks which should also start with the `use` keyword. Custom hooks are very useful since they enable easy reusing of non-visual logic. We can compose multiple hooks into our own custom hook.

Hooks has enabled React function components the ability to own state and run side effects at different lifecycle points.

Up until now we know about `useState` and `useEffect` hooks, but React has almost twenty built-hooks. Some of them are used very often:

1. `useState`
2. `useEffect`
3. `useReducer`
4. `useContext`

Some others are less used:

1. `useRef`
2. `useCallback`
3. `useMemo`
4. `useTransition`
5. `useDeferredValue`
6. `useLayoutEffect`
7. `useDebugValue`
8. `useImperativeHandle`
9. `useId`

Some others also exist, but only for library authors:

1. `useSyncExternalStore`
2. `useInsertionEffect`

### **Rules of hooks**

In order for hooks to work as intended there are 2 simple rules that we must follow:

- **RULE 1:** Hooks can only be called at the **top level**. We cannot call hooks inside conditionals, loops, functions nested inside the component, or after an early return because that is also similar to a condition. Why this rule exists? Hooks only work if they are always called in the same exact order, which can only be ensured if they are called at the top level. But why do hooks need to be called in the same order on every render? Let's dive deeper into the reasons behind this rule.

Remember that when an app is rendered, React creates a tree of React elements (Virtual DOM). On the initial render, React also builds a Fiber tree out of the virtual DOM where each element is a fiber. Each fiber contains a lot of stuff, like the received props, list of work, and more importantly, a linked list of all the hooks that were used in the component instance. Let's build ourselves a linked list of used hooks based on the hypothetical code example below to understand how hooks work behind the scenes. It is hypothetical because it won't actually work. It even violates the rule that we just mentioned. By breaking this rule we are trying to understand why hooks rely on the order in which they are called.

```js
const [A, setA] = useState(23);

if(A===23) const [B, setB] = useState('');

useEffect(fnZ, []);
```

Speaking of the order, our linked list will be built based on the call order of the used hooks:

1. State A
2. State B
3. Effect Z

So this is the list of our hooks, but how are they linked? It means that the first list element contains a reference to the second list element, which in turn, has a link to the third list element. Linked list is a common data structure in computer science.

Moving back to our code example, let's imagine that a re-render happened because state A updated from 23 to 7. This creates a huge problem. Notice how state B was only created initially because the condition `A === 23` was true. However, after the re-render the condition is false, which means that the `useState` hook for state B would not be called, and therefore, it would no longer exist in the linked list of hooks after the re-render. Now the problem is that the first hook is still pointing to the original second hook. But that link is now broken. So state A is now linked to a hook that no longer exists, and nothing is pointing to the effect hook Z, meaning that the linked list is now destroyed. It works this way because **fibers are not recreated on every render**. So the linked list is also not recreated. So if one of the hooks just disappears from the list, then the order of the list is completely broken. So if we conditionally use a hook, it would completely mess up the linked list of hooks between renders, which will leave React confused and unable to correctly track all the hooks that are used. So this is why hooks need to be called in the same order on every render. Following this rule, the code example above should be corrected to:

```js
const [A, setA] = useState(23);
const [B, setB] = useState("");
useEffect(fnZ, []);
```

> Why even bother having the linked list? A linked list which relies on the hook call order is the simplest way to associate each hook with its value. The order in which the hook is called, uniquely identifies the hook. This is very convenient, because by using the call order, we developers don't have to manually assign names to each hook.

- **RULE 2:**Hooks can only be called from **React functions**. This means that hooks can only be called from **function components** or from **custom hooks**, but not from regular functions or class components.

> You don't have to worry about these rules if you are using a linter. These rules are automatically enforced by React's ESLint rules.

### **The `useState` hook**

We use the `useState` hook to create a state, and then the setter function to update state.

#### **Creating state**

We can creat state in its simple way which is to pass a value into the `useState` hook.

```js
const [count, setCount] = useState(23);
```

We can also create state by passing a callback function into the `useState` hook which makes it so that the initial value of the state would be computed. This second option is also called _Lazy Evaluation_. The callback is only called by the `useState` hook on the **initial render**. On subsequent renders, this callback function will simply be ignored. The callback function needs to fulfill 2 requirements:

1. It should be a pure function
2. It should require no arguments in order to work

```js
const [count, setCount] = useState(() => localStorage.getItem("count"));
```

#### **Updating state**

We can update state in a simple way just by passing a value into the setter function.

```js
setCount(1000);
```

In many situations we want to update state, based on current state. The callback function here also should be a pure one.

```js
setCount((c) => c + 1);
```

> It is very important to remember that we should not mutate objects or arrays, but to replace them with a new object or array which incorporates your changes.

#### **`useState`: some useful details**

Up until now we have always used the `useState` hook. But let's now take a deeper look inside.

```js
const [movie, setMovie] = useState({});
```

##### **Initial state value only matters for initial render**

The initial value passed into the `useState` hook only matters for the initial render. Let's take this code as an example:

```js
// This code is inside a component which asynchronously loads movie data from an external API
const { title, year, imdbRating } = movie;

const [isTop, setIsTop] = useState(imdbRating > 8);
console.log(isTop);
```

As you can see, here we are actually assigning an initial value to the `isTop` state variable based on a condition. So if the `imdbRating` of the `movie` is higher than `8`, a `true` value would be assigned to the `isTop` state.

But as we select a movie with an IMDB rating of 9 to be loaded into the UI, we see in the console that the `isTop` state is holding a `false` value, while we expect it to be true. Why is that? The answer is that whatever we pass into the `useState` hook, is the initial state, and React only look at this initial state on the inital render, so when the component first mounts. But when the component first mounts, the `imdbRating` is still `undefined`. So `imdbRating > 8` is false, and it will stay false even after the movie has been loaded, because we have not used the `setIsTop` to update the state as the `imdbRating` becomes available. To fix this, we can use a `useEffect` hook.

```js
// This code is inside a component which asynchronously loads movie data from an external API
const { title, year, imdbRating } = movie;

const [isTop, setIsTop] = useState(imdbRating > 8);
console.log(isTop);

useEffect(
  function () {
    setIsTop(imdbRating > 8);
  },
  [imdbRating]
);
```

But let's now take a look at the bigger picture. If this is what we want to do, we can simply use a **derived state**. We don't need the `useState` hook.

```js
// This code is inside a component which asynchronously loads movie data from an external API
const { title, year, imdbRating } = movie;

const isTop = imdbRating > 8;
console.log(isTop);
```

This solution works seamlessly, because `isTop` variable is regenerated each time that the component is rendered. So as the component is mounted, the `imdbRating` variable is `undefined` and we will see in the console that `isTop` is `false`. But when the movie data arrives, the component function is called again to render the data to the UI, and therefore `imdbRating` becomes available, and therefore `isTop` will become true since the exmample movie is rated 9. So we have used the power of derived state which is that it updates as the component gets re-rendered.

##### **State is always updated asynchronously**

Another important thing to remember about the `useState` hook is that the state updating process really happes asynchronously. We need to use a callback function to update state in certain situations. So we cannot access the updated state variable right after updating it.

```js
const [avgRating, setIsRating] = useState(0);

// Some other handler function code...

setAvgRating(Number(imdbRating));
alert(avgRating);
```

in the code example above, although the `avgRating` state is updated to the `imdbRating` value, the `alert` function in the next line will return `0` as the initial value passed into the `useState` hook. Let's take another example:

```js
const [avgRating, setIsRating] = useState(0);

// Some other handler function code...

setAvgRating(Number(imdbRating));
setAvgRating((avgRating + userRating) / 2);
```

This will return a wrong average value, since the updated value of `avgRating` is not yet available at this point. So the second `setAvgRating` call to calculate the average based on the updated value of `avgRating` will result in a wrong outcome, because `avgRating` state is still `0` (initial value) at this point.

We know how to go around this. We should use a callback function in the state setter function. This callback function has access to the current value of the state variable.

```js
const [avgRating, setIsRating] = useState(0);

// Some other handler function code...

setAvgRating(Number(imdbRating));
setAvgRating((avgRating) => (avgRating + userRating) / 2);
```

##### **Initialize state with a callback function: Lazy evaluation**

There is just one final thing to learn about the `useState` hook, which is, besides using a callback function to update state, as we did in the example above, we can use callback functions to initialize state. This is particularly needed when the initial value of the `useState` hook depends on some sort of computaion.

> Remember that this function must be pure and it cannot receive any argument.

Take the usePopcorn project as an example. We need to implement a functionality that whenever the user adds a movie to their watched list, we want to store the movie in the local storage, so that when the app is refreshed and the `App` component is mounted again, the data stored in the local storage would be read and loaded into the watched list. Of course, this is possible by introducing a `useEffect` hook, but there is a better way, which is to put a callback function into the `useState` hook as the state's initial value.

```js
// This code is inside a component
const [watched, setWatched] = useState(function () {
  const storedValue = localStorage.getItem("watched");
  return JSON.parse(storedValue);
});

useEffect(
  function () {
    localStorage.setItem("watched", JSON.stringify(watched));
  },
  [watched]
);
```

> As a consequence of implementing the `useEffect` in the example above, we now have also enabled the application to automatically delete a watched movie from the local storage if we click on the delete button in the application. This is because, as we have learned before, the `useEffect` hook is used to keep a component in sync with an external system, which here is the local storage.

> Note that the function passed into the `useState` hook should be callback function. We cannot call the function right in the `useState` hook. Eventhough React will simply ignore the value of the function call, it would still call this function on every render. Based on the example above, we cannot do this:

```js
const [watched, setWatched] = useState(localStorage.getItem("watched"));
```

### **`useRef` hook**

Imagine we want a search bar in our application to become focused once the `Search` component is mounted. We can implement an effect in the component like this:

```js
function Search({ query, setQuery }) {
  useEffect(function () {
    const el = document.querySelector(".search");
    el.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

However, we know that React is all about being declarative. So manually selecting a DOM element is not the React way of doing things. So what should we do? We should use the `useRef` hook.

We use the `useRef` hook to create something called a ref. But what is a ref? Ref stands for reference, and it is like a box into which we can put any data that we want to be preserved between renders. In practice, when we use the `useRef` hook, React gives us an object with a **mutable** `current` property, into which we can write any data, and we can read from it.

```js
const myRef = useRef(23);

// Some code

myRef.current = 1000;
```

This `current` property is actually mutable unlike everything else in React. The special thing about refs is that they are persisted across renders. Their `current` property value stays the same between renders like states. This makes refs useful in 2 situations:

1. We can use refs to create variables that stay the same between renders (e.g. preserving previous state or storing the ID of a `setTimeout` function, etc.)
2. We can use refs to select and store DOM elements. Just like the ID of a `setTimeout` function, a DOM element is a peice of data that we want store and preserve between renders.

> Refs are usually only used for data that is NOT rendered. Refs usually only appear in event handlers or effects, not in JSX. We can use them in JSX but usually that is not the place for them. So if you need data that participates in the visual output of the component, that is usually a good sign that you need a state, not a ref.

> You are not allowed to read the `.current` property or write to it in the render logic as it will create an undesirable side effect. Instead, we usually perform these mutations inside a `useEffect` hook. So keep in mind that **whenever you are planning to use a `useRef` hook, you would very likely want to use a `useEffect` hook to update the ref**.

#### **`useState` vs. `useRef`**

Let's now compare the two in order to fully understand their similarities and differences.

| `usestate`                                                                          | `useRef`                                                                            |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| persists across renders, so the component rememebrs its value even after re-renders | persists across renders, so the component rememebrs its value even after re-renders |
| cause the component to re-render                                                    | does not cause the component to re-render                                           |
| immutable                                                                           | mutable (`.current`)                                                                |
| updated asynchronously                                                              | updated synchronously                                                               |

A conclusion is that we use state when we want to store data that should re-render the component, and refs for data that should only be remembered by the component over time but never re-render it.

So returning to the example mentioned above, the better way to select the search bar in the DOM is to use refs. Using a ref with a DOM element happens in 3 steps:

1. Create the ref

```js
const inputEl = useRef(null);
// Remember to import useRef from 'react'.
```

> The value passed into the `useRef` hook is the initial value that we are assigning to the `current` property of the ref object. In case we are using ref for selecting a DOM element, we usually pass `null` into the hook.

2. Then in the JSX, pass the `ref` prop into the DOM element that you want to select. This way the `ref` and the DOM element are now connected in a declarative way.

```js
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
```

3. Then we use a `useEffect` hook in order to use the implemented `useRef` hook that contains a DOM element. This is because the ref only gets added to the DOM element after the DOM is loaded. Therefore we can only access it in an effect which also runs after the DOM is loaded. From this point, `inputEl.current` is really the `<input>` element itself. So we can call the `.focus()` method on it.

```js
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
```

We now want to implement a feature that whenever we press the Enter key on the keyboard, the input element gets focused. So we should listen for the `keydown` event on the document, and there is a point here:

> In order to add event listeners to the document, we have no way but to do it manually. So just as we normally do in vanilla JavaScript using the `addEventListener` method on the `document.`

```js
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
```

#### **`useRef` to count something behind the scenes**

We now want to use the `useRef` hook to create a variable that persists across renders without triggering a re-render.

As a real-world example, in the usePopcorn project, we want a counter variable to store the number of clicks that the user does on the star rating component, basically to evaluate how long it takes for the user to rate a specific movie. So for example, if the user first clicks for rate 3, then for 7, and then for 9, we want store this three clicks in a variable behind the scenes. So in this case, we actually want a variable that is persisted between re-renders, but does not trigger a re-render itself.

```js
const countRef = useRef(0);
// So now 0 is the initial value for the 'current' property of the ref object.
```

Now we want to update the ref each time the user clicks on a rate. Now again, in order to implement the updating logic of the ref, we should use a `useEffect` hook, because we are not allowed to mutate the ref in render logic.

```js
useEffect(
  function () {
    if (userRating) countRef.current = countRef.current + 1;
  },
  [userRating]
);
```

### **`useReducer` hook**

The `useReducer` hook is a more advanced and more complex way of managing state instead of `useState`. We usually use the `useReducer` hook when we have a complex state to manage. It means that we usually don't use the `useReducer` hook for managing a state that includes only one single value. Instead, we use it when the state actually holds an object.

The `useReducer` hook works with a **reducer** function, which is a pure function that will always take in the previous state and an action, and will return the next state. Note that the reducer function must always **return** something. The `useReducer` hook itself receives not only the initial state, but also the reducer function we just described.

> What the reducer function returns must be similar in shape to the initial state we passed into the `useReducer` hook. This is especially important when we pass an object of states into the the reducer hook, which is what we actully use this hook for.

The `useReducer` hook works similar to the `useState` hook. It returns the current state and a so-called `dispatch` function which is used to update state, but works in a slightly different way compared to the state setter function returned by the `useState` hook. We might ask when the reducer function provided to the `useReducer` hook will be called? This is actually where the `dispatch` function comes to play.

Let's now use it in practice.

```js
function reducer(state, action) {
  console.log(state, action);
  return state + action;
}

function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  const inc = function () {
    dispatch(1);
  };

  //some other handler functions

  // returning <JSX>
}
```

Now as we click on the `+` button to increment the date, we see the console shows `0 1` in response. So the state is `0` and the action is `1`. So what is happening here? The reducer function has access to the **current state**, and then it also gets access to the **action**, which currently is the `1` value we passed into the `dispatch` function. So whatever we pass into the `dispatch` function will be received in the reducer function as the action. **The idea in the reducer function is to take the current state and the action and, based on these, return the next state**.

Now to implement a simlir functionality to decrease the date. So we now need to call the `dispatch` function again. In terms of `useReducer` is considered as dispatching an action.

```js
function reducer(state, action) {
  console.log(state, action);
  return state + action;
}

function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  const inc = function () {
    dispatch(1);
  };

  const dec = function () {
    dispatch(-1);
  };

  //some other handler functions

  // returning <JSX>
}
```

This might not seem to be a useful way of updating a state variable, but it will make sense as we go further in this example.

Let's now think how we can set the date according to the input number that the user types. We might think that we can do this:

```js
function reducer(state, action) {
  console.log(state, action);
  return state + action;
}

function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  const inc = function () {
    dispatch(1);
  };

  const dec = function () {
    dispatch(-1);
  };

  const defineCount = function (e) {
    dispatch(Number(e.target.value));
    // setCount(Number(e.target.value));
  };

  //some other handler functions

  // returning <JSX>
}
```

But this makes us totally lose control over the input value. So we can now think about the action provided to the reducer function. In this case we have 3 actions: decreasing the count, increasing it, and setting it. So we should actually name these actions. we are no longer going to pass single values to the `dispatch` function, but an object which contains an action as well as the single values.

```js
const dec = function () {
  dispatch({ type: "dec", payload: 1 });
};
```

The object passed into the dispatch function is what we call an action when working with reducer functions. This object can, in theory, have any shape, but it is a convention to include just the `type` and `payload` properties in it. Let's now do the same thing for increasing the date.

```js
const inc = function () {
  dispatch({ type: "inc", payload: 1 });
};
```

Let's also implement the action object for the handler function that is responsible for updating date based on user input number:

```js
const defineCount = function (e) {
  dispatch({ type: "setCount", payload: Number(e.target.value) });
};
```

And we now have to update the `reducer` function to acount for the different `type` properties in the action object.

```js
function reducer(state, action) {
  console.log(state, action);
  if (action.type === "inc") return state + action.payload;
  if (action.type === "dec") return state + action.payload;
  if (action.type === "setCount") return action.payload;
}
```

Now we can understand that it is not necessary to pass the `payload` property for the `inc` and `dec` functions. We can simply ignore them and implement the logic in the reducer function itself. However, in the `defineCount` function we still need the `payload` since we actually receive the payload based on the user input. The `payload` property is optional.

```js
function reducer(state, action) {
  console.log(state, action);
  if (action.type === "inc") return state + 1;
  if (action.type === "dec") return state - 1;
  if (action.type === "setCount") return action.payload;
}

function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  //some other handler functions

  // returning <JSX>
}
```

Up until now, we have transformed the previous count state from a simple `useState` to a `useReducer`. We now want to incorporate a step state into the `useReducer` hook we just introduced to our code. This will enable the increase and decrease buttons to change the date by the step state value. First, let's convert the code we have been writing into a fully-fledged `useReducer` hook application, which is to incorporate an object of states into the reducer hook we have been using.

In order to do this, we first need to define an object as the initial state passed into the reducer hook:

```js
function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
}
```

We then let the handler functions remain as before:

```js
function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialState = { count: 0, step: 1 };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };
}
```

But then we update the reducer function declaration to perform its logic based on a `switch` statement.

```js
function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - 1 };
    case "inc":
      return { ...state, count: state.count + 1 };
    case "setCount":
      return { ...state, count: action.payload };

    default:
      throw new Error("Unknown action");
  }
}
```

This should now make the app work just like before. We are now going to implement the step state in the reducer hook. So we implement the handler function like this:

```js
const defineStep = function (e) {
  dispatch({ type: "setStep", payload: Number(e.target.value) });
  // setStep(Number(e.target.value));
};
```

And update the reducer function as:

```js
function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - 1 };
    case "inc":
      return { ...state, count: state.count + 1 };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };

    default:
      throw new Error("Unknown action");
  }
}
```

We now have to take into acount the step value when we increase or decrease the date.

```js
function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };

    default:
      throw new Error("Unknown action");
  }
}
```

We are fine now. But you might still ask that why bother doing all this work? What we have been doing until this point could have been done with some simple `useState` hooks. Let's now do something different to understand the advantage of the reducer hook more clearly. We now want to implement a reset functionality that resets the count and step values. What we did previously was to take the state setter functions seperately and call them while passing the initial values into each.

```js
const reset = function () {
  setCount(0);
  setStep(1);
};
```

But now we can do one big state transition doing all the state reset functionality in one go.

```js
const reset = function () {
  dispatch({ type: "reset" });
};
```

We now update the reducer function again to account for the `reset` case:

```js
function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action");
  }
}
```

> Note that we can place the `initialState` object outside the component, in the top level, so as to make it accessible in both the reducer function and the component.

If you take a look at your handler functions now, you will see that what we are doing in each of them is just to dispatch. This means that we could implement the dispatch codes into the `onChange` props of the JSX elements, and let the logic reside in the reducer function. But let's keep it as we have wrote them now.

So basically, we have all the possible state updates that can happen in our application in one central place which is the reducer function. This makes it a lot easier to understand the entire app without having to go over all the components and functions. As we proceed, the advantages of the `useReducer` hook start to emerge.

#### **Reducers in detail**

Let's now see how reducers can make our application a lot better in certain situations.

Before knowing about the `useReducer` hook, we used the `useState` hook to manage all our states. But as components and state updates become more complex, using `useState` to manage all states is, in certain situations, not enough. What situations are those:

1. When components have a lot of state variables and a lot of state updates spread across many event handlers all over the component, or maybe even multiple components. This can quickly become overwhelming and hard to manage.
2. When multiple state updates need to happen at the same time (as a reaction to certain events, like starting a game where we might have to set score to 0, set an `isPlaying` status, and start a timer.)
3. When updaing one piece of state depends on one or multiple other pieces of state.

In all these situations the `useReducer` hook is really helpful. Reducers try to solve problems with these situations.

`useReducer` is an alternative way of setting and managing state, which is ideal for complex state and also for related pieces of state.

We call the `useReducer` hook with a reducer function and an initial state. The hook then returns a state and a dispatch function.

When we use `useReducer` hook, we usually store related states in a state object that is returned from the `useReducer` hook. As we know, `useReducer` needs a reducer function where all the logic that is responsible for updating the state resides. This enables us to completely decouple state logic from the component, making our components a lot cleaner and much more readable.

So when we manage state with `useReducer`, it is the reducer function that will be updating the state object. In a sense, we can say that the reducer function is like the state setter function, but with superpowers.

The reducer funtion is simply a JS function that gets access to `state` and an `action`, and based on these, returns the next state, that is the updated state.

> State is immutable in React. So the reducer is not allowed to mutate the state. In fact, no side effects are allowed in the reducer function at all. A reducer must be a pure function that always returns a new state based on the current state and a defined action.

The action that the reducer function has access to is passed to it as an object that describes how state should be updated. It usually contains an action `type` and `payload`. Based on these 2 properties, the reducer determines how to create the next state.

There is one last piece of the puzzle here. How do we trigger a state update? This is where the `dispatch` function comes to play. The `useReducer` hook returns a dispatch function which we can use to trigger state updates. We use the dispatch function to send an action from the event handler where we are calling the dispatch to the reducer. The reducer function will then use this action object to compute the next state. Once it updates the state, a re-render will be triggered.

So in conclusion there are different parts that should fit together in the whole reducer concept:

1. The `useReducer` hook
2. The state object
3. The reducer function, responsible for updating the state object based on the action object received via the dispatch funciton
4. The dispatch function, responsible for sending an action object to the reducer funciton
5. The action object, usually including a `type` and a `payload` property, which the latter is optional. The object does not need to have this exact shap, but this is the convention followed by developers.

> Curious why the reducer function is called a reducer? Becasue it follows the exact same idea as the array `.reduce()` method. While the reduce method of arrays accumulates all the array values into one single value, the React reducer accumulates all actions into one single state over time.

Behind the scenes the dispatch function has access to the reducer function because we passed it into the `useReducer` hook. So dispatch function coordinates the whole thing and also gives the reducer access to the current state.

#### **`useReducer` vs. `useState`**

| `useState`                                                                                                        | `useReducer`                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ideal for single, independent pieces of state (numbers, strings, single arrays, etc.)                             | Ideal for multiple related pieces of state and comples state (object with many values and nested objects or arrays)                                                                          |
| Logic to update state is placed directly in event handlers or effects, spread all over one or multiple components | Logic to update state lives in one central place, decoupled from components: the reducer function.                                                                                           |
| State is updated by calling the state setter function, which makes it a lot more imparative.                      | State is updated by _dispatching_ an **action** to the reducer function. Essentially, reducers map state transitions to actions with well-defined names, making them a lot more declarative. |
| Easy to understand and use                                                                                        | More difficult to understand and implement                                                                                                                                                   |

> Most of the time, using `useState` is perfectly fine.

#### **When to use `useReducer`**

We would have to think about answers to a couple of questions in order to figure out when we do need to use the `useReducer` hook.

1. Just one piece of state?

   - Yes: just use one `useState` hook.
   - No: go to question No. 2

2. Do states frequently update together?

   - Yes: possible `useReducer` case. Before that, you need to answer one more question. Are you willing to implement slightly more complex code?
     - Yes: Definately use the `useReducer` hook.
     - No: Go for `useState` hook.
   - No: Go to question No. 3

3. Over 3 or 4 pieces of related state, including objects? This is called complex state.
   - Yes: possible `useReducer` case. Before that, you need to answer one more question. Are you willing to implement slightly more complex code?
     - Yes: Definately use the `useReducer` hook.
     - No: Go for `useState` hook.
   - No: Go to question No. 4
4. Too many event handlers that make components too large and confusing?
   - Yes: possible `useReducer` case. Before that, you need to answer one more question. Are you willing to implement slightly more complex code?
     - Yes: Definately use the `useReducer` hook.
     - No: Go for `useState` hook.
   - No: use `useState` hook.

> The `useState` hook should remain your default choice for managing state. But if `useState` is causing one of the problems mentioned above, you may want to opt for the `useReducer` hook.

### **custom hooks**

Custom hooks are all about reusablity. In React, we have 2 types of things that we can reuse:

1. A piece of UI: we use a component
2. A piece of Logic: In this case we should first ask ourselves that does the logic contain any hook? If not, all you need is a regular function, which can live either inside or outside any component. But if the logic does contain any React hook, you cannot extract the logic into a regular function. Instead, what you need is a custom hook.

Custom hooks allow us to reuse stateful logic in multiple components, and actually not only stateful logic, but any logic that contains one or more React hooks. In more general terms, custom hooks allow us to reuse **non-visual logic**.

One hook should only have one purpose. It should only do one specific, well-defined thing. The idea is not to simply put all the hooks of a component into one custom hooks, but it is to make custom hooks reusable and portable, so that you can reuse them across different projects.

> Rules of hooks mentioned earlier apply to custom hooks.

A custom hook is really just a JS function. So it can receive and return any data that is relevant to the custom hook. It is very common to return an object or array from a custom hook. Notice how this is different from components which are also just regular JS functions, but which can only receive props and always have to return some JSX.

The difference between regular functions and custom hooks is that custom hooks need to use one or more React hooks.

In order for us and React to recognize this function as a hook, the function name needs to start with the word `use`. This is really not optional. It is a rule that you should follow in order to introduce a custom hook.

Take this code example:

```js
function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    fetch("<URL>")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return [data, isLoading];
}
```

Let's now create a real-world custom hook for the usePopcorn project. In this project, we want to implement a custom hook where we can place all our logic related to fetching a movie data. So here is the process:

1. Create a new file in your `src` folder and call it `useMovies.js`.
2. Export a function which has the same name as the newly create file.

```js
// ./useMovies.js
export function useMovies() {}
```

3. import this function into the main `App.js` file.

```js
// ./App.js
import { useMovies } from "./useMovies";
```

4. Place the functionality code inside the function. Remember that this is a regular JS function. So it can receive any argument and it can return anything. Note that when moving code like this, you will find out that this code now needs some values and variables that were available in the previous file. So you either need to move those variables to the new file, or pass them as arguments into this function. For things that are only needed in this new file, and they are actually not needed in the `App.js` file, you usually want to move them into the new file.

```js
// ./useMovies.js
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();

      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies.");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovie();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
}
```

5. Return what the logic in the previous `App.js` file actually needed to perform its operations. We know that the main `App.js` file needs the `movies`, `isLoading` and `error` states in oreder to correctly render the JSX. So we should return these from this custom hooks.

```js
// ./useMovies.js
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.(); // notice the use of optional chaining in calling a function
      const controller = new AbortController();

      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies.");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovie();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
```

> Note that we have used the `callback` inside the effect, and therefore we have to mention it in the dependency array. But doing this will lead to an infinit loop of errors, which we cannot deal with just yet. So we remove the ability of this custom hook to receive a callback function as an argument. [more about this later...]

6. Call the custom hook in the `App.js` and pass the required arguments into it. You should store the returned values from it into related variables. We can use destructuring since we are actually returning an object from the custom hook:

```js
// ./App.js
const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
```

> Remember that a custom hook can be called and used anywhere in our logic code. So it can act like the `useState` hook that returns a state variable and its setter function, or it can be used like a `useEffect` hook which performs some logic in an abstracted way. We can say, in a sense, that a custom hook can be based on either a `useState` or a `useEffect` hook, although a custome hook can use more than one React hooks.

# **React 3rd party libraries**

## **React developer tools**

Since developer tools are so helpful for developers, the React team built dev-tools specific to React, which can be extremely helpful when working with [state](#state-in-react).

Install React's Chrome dev-tools.

## **React Router**

To implement routing, we start by creating the file structure for the components that correspond to different URLs. Usually, we create a folder in the `src` folder and call it `pages`. This folder will basically include our structural components. So inside the `pages` folder, we now create a file, for instance, called `Product.jsx`, and remember to write `jsx` as the file's extension.

### **Basic implementation**

In the beginning of this process, we normally don't write any specific code in each component file, but just a simple React component function:

```js
function Product() {
  return <div>Product</div>;
}

export default Product;
```

We would then continue with creating other structural component files in the `pages` folder to implement the base of our routing.

Eventually we get to create the routes. To do this we go to the terminal and use this command to install the latest version of React Router:

```
npm install react-router-dom
```

However, on this tutorial we use the 6th version of it.

```
npm install react-router-dom@6
```

Since React version 6.4, there are 2 huge ways of defining routes in our code. We are now going to use the more traditional approach which is to define our routes in a declarative way. This means that we will use a couple of special components that React Router gives us to define our routes right in the JSX. This might seem confusing.

So inside the `App.jsx` file, we use the `<BrowserRouter>` tag and make sure that it is imported in the file:

```js
import { BrowserRouter } from "react-router-dom";

function App() {
  return <BrowserRouter></BrowserRouter>;
}

export default App;
```

Then inside the `<BrowserRouter>` component, we need the actual `<Routes>` component.

```js
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
```

Now inside the `<Routes>` component, we do the actual rout definition, which brings us eventually to the `<Route />` component in which we should define `path` and `element` as props.

The `path` prop will include the URL route after the root address, and the `element` prop will include the component which you want to be rendered for the specified `path`.

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

> Don't forget to import all `BrowserRouter`, `Routes` and `Route` components from `reaect-router-dom`, and also your own components that are passed as props to the `<Route />` component.

> We can pass props into the components that we insert in the `element` prop of the `<Route />` component.

We can keep on adding different routes for different components of our app.

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

> If we wrap the whole `<BrowserRouter>` component in a `div` element and in it, we define an `h1` element, the browser will render the `h1` tag and its content on all routes, and it will render the URL's corresponding component afterwards:

```js
function App() {
  return (
    <div>
      <h1>Hello Router!</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// However, Usually we just have our `App` component decide which page should be displayed on the UI.
```

> If you want to show a _Page not found_ message for all other routes that are not defined in your SPA, you can define another final `<Route />` component where you set the `path` prop to `*`, and the `element` to a proper component you defined in your file structure.

```js
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Up until this point, we have half of our routing implemented. We have our routes, but we cannot transition between them without a page reload. We currently need to change the URL manually, and then our app goes to that page. This is not what we want though. So we need to stablish some sort of **linking** between the routes.

### **Linking between routes**

To start, let's follow an example. Let's say that on our `Homepage` we want a link to the `Pricing` page. We would traditionally and obviously create an anchor element in the `Homepage` component.

```js
function Homepage() {
  return (
    <div>
      <h1>WorldWise</h1>

      <a href="/pricing">Pricing</a>
    </div>
  );
}
```

This actually works, but if you look closely, it makes the app fully reload. You can examine this in detail via the Network tab of your browser console.

So what should we do to avoide this kind of hard reload? We should use the `<Link>` element provided by the React Router. Remember to import the `Link` component from `react-router-dom`.

```js
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <h1>WorldWise</h1>

      <Link to="/pricing">Pricing</Link>
    </div>
  );
}

export default Homepage;
```

the Network tab would prove that now the app does not reload; there is no additional request initiated when clicking on the `Pricing` link. So we have now implemented the linking between the Homepage and the Pricing page. What about other pages of our app? We now have to create a page navigation component which we can reuse in all the pages so we can implement transition between them.

We actually create our `PageNav.jsx` component in a different folder than our `pages` folder that contains our structural components. In this file:

```js
import { Link } from "react-router-dom";

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
```

Now this is a reusable component which we can use in every single one of our pages.

```js
// HomePage.jsx
import PageNav from "../components/PageNav";
function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>WorldWise</h1>
    </div>
  );
}
export default Homepage;


// Pricing.jsx
import PageNav from "../components/PageNav";
function Pricing() {
  return (
    <div>
      <PageNav />
      <h1>Pricing</h1>
    </div>
  );
}
export default Pricing;
```

What we usually do in navigations like these is to display which one is the currently rendered page by, for instance, highlighting the related link. React router gives us a tool for that, which is to use the `NavLink` component instead of `Link` components we used in the `PageNav` component.

```js
function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

You will not see any apparent difference as a result, but if you inspect your elements in the browser, you see that the navigation link corresponding to the currently rendered page has the `active` class added to it. You can use this class in your CSS file to style it. We will learn how to use a different way of incorporating CSS into our project, which is [CSS modules](#css-modules) and [global CSS](#global-css).

In this approach to CSS styling, we can insert global styling in the CSS module created for the `PageNav` component as below:

```css
.nav :global(.active) {
  background-color: green;
}
```

This means that the element with the `active` class name that also has the `nav` class name will get the background color of green.

> Just remember that the `active` class is given to us by React Router as a result of using the `<Navlink>` element. Otherwise, if we just want to define some global classes we would not do it inside a module, but we would do it in a normal CSS file. Refer to [global CSS](#global-css).

### **Nested routes and index route**

We need nested routes when we want a part of the UI to be controlled by a part of the URL. In our exmaple, we want to show a list of cities in the app layout, and we want the URL to be like:

```
localhost:3000/app/cities
```

So the cities will be displayed if the `cities` route is nested inside the `app` route. Then we would also want to display a form as we click on the map. So clicking on the map would also have to update the URL to request another nested URL under `app` route. So nested routes are used when we want to show a part of the UI based on a part of the URL.

> Note how nested routes are not simply routes made up of multiple parts like the example mentioned above. Just because we have a longer path including the `cities` after `app` route, it does not mean that `cities` route is nested under `app` route. Instead, it is a nested route because the `cities` route influences what component is being rendered in the bigger component corresponding to the `app` route.

In order to implement nested routes, we need to use the `<Route />` element with its opening and closing forms.

```js
<Route path="app" element={<AppLayout />}>
  <Route path="cities" element={<p>List of cities</p>} />
  <Route path="countries" element={<p>List of countries</p>} />
  <Route path="form" element={<p>Form</p>} />
</Route>
```

> Note that in the `path` prop of the nested routes, you don't need to rewrite the parent route. React is smart enough to understand the hierarchy of routes that you have implemented. Also note that for the `element` prop of the nested routes, it is no longer necessary to insert a component. You can simply insert regular HTML elements.

But now you might ask where would the `<p>` elements passed to the child routes be displayed in the UI? How are we now going to display one component or element inside another component? That is where the `<Outlet />` component provied by React Router comes into play.

In our example, the child components corresponding to the nested routes defined above should be rendered inside the `Sidebar` component. So in the `Sidebar.jsx` file we use the outlet component:

```js
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
```

So when React detects a nested route in the URL, it goes through the `<Route />` elements defined inside the parent `<Route>` element and selects the one corresponding to the nested route. Then it takes the related JSX from the corresponding component file and puts it in the place of the `<Outlet />` element defined in the parent component JSX. This is pretty similar to the concept of children prop, but in this case for the routes.

> In this example, as it would be the case with many examples of nested routes, we may actually not want the bare parent route empty of any of the possible child components corresponding to the defined nested routes. This means that we show a list of `Cities` in the `App` layout component for the `app/cities` route, and we show a list of `Countries` in the `App` layout component for the `app/countries` route, but we actually don't want the page to render empty for the `/app` URL. So we want to display, for instance, the list of cities or any other content as a default render. This is where the **index route** comes to play. To implement an index route, we should use another nested route in the parent route and pass an `index` prop to it in order to define it as an index route. See the code exmaple below:

```js
<Route path="app" element={<AppLayout />}>
  <Route index element={<p>List</p>} />
  <Route path="cities" element={<p>List of cities</p>} />
  <Route path="countries" element={<p>List of countries</p>} />
  <Route path="form" element={<p>Form</p>} />
</Route>
```

We also need to create some buttons on the UI in order to enable the user go through different URLs by clicking on them, and not by changing the URL manually.

```js
function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

Having implemented such rounting along with some buttons on the UI that will change the URL accordingly, reminds us of showing content in the UI based on the value of a state variable when creating a tabbed component. Before, when we implemented such components, we would have to use the `useState` hook to manage the currently active tab. But with React Router we do it in a completely different way. Instead of using the `useState` to manage state, we allow the React Router and the URL to store the state of the active tab. We now decide which tab is active based on the URL.

> We still build components like tabbed or accordion components with the `useState` hook all the time. But from now on, the overall navigation of the application is controlled by the React Router. This includes a small sub-navigation as mentioned in the example code above.

### **Storing state in the URL**

We can now take the usefulness of React Router to the next level. Storing state in the URL enables us to use the state in different places of the app.

But you might ask, don't we actully use the `useState` hook to manage state? That is true most of the time, but the URL is also an excelent place to store state, especially a UI state. With UI state, we mean a state that affects what the UI looks like. This include things like an open or close panel, or a currently applied list sorting order or filter. These examples of state are greate candidates to be stored in the URL, and to be managed by the URL with React Router.

Why we would want to do that? The first reason is that placing state in the URL is an easy way to store state in a gloabl place that is easily accessible to all components in the app. Before, if we wanted a state to be accessible everywhere, we would have to store it in a parent component, and then pass it down to all child components using props. But if you place state in the URL we can easily just read the value from there wherever the component is in the component tree.

So we can move some state management from React to the URL. Also, placing state in the URL is in many situations a good way to pass data from one page into the next page without having to store that data in a temporary place inside the app. Finally, another amazing reason why we should place state right in the URL is that doing so makes it possible to bookmark or to share the page with the exact UI state that the page had at the time that we are sharing or bookmarking it.

For instance, in an online shop, we might be filtering products by color and by price. If that filter is saved in the URL we can then share the page with someone and they will see the exact same filters applied to the list of products. This enables a great user experience.

Let's now see how we do this using the React Router. We know that in a URL like this:

```
www.example.com/app/cities/lisbon?lat=38.72&lng=-9.14
```

we know that we have a path which is `/app/cities`, and we can consider this part a state becasue it corresponds to the component that is being displayed. But this is not useful for state management in the way that we have been describing.

For storing state in the URL we use **params** or **query strings**.

- Params: stands for parameters and it is very useful to pass data to the next page
- Query string: is useful to store some global state that should be accessible everywhere.

To understand it a bit better, let's look at this example in more detail. The URL mentioned above corresponds to a certain view. In the URL we see that the param is `lisbon` and because of that the page that was loaded is about the city of Lisbon. So by creating a link that points to a URL with this param we are able to pass the city name to the next page whenever the user clicks on that link. If the URL had another city name as the param, then the loaded page would be based on that param.

We also have the query string which works in a very similar way. In this example, we store the `lat` and `lng` pieces of state in the query string which corresponds to a certain position on the map. So the location of the city is reflected right in the URL. In this example, we leveraged the power of the URL to manage state in an effective way by reading the city name and the GPS location from the URL instead of using application state inside React.

#### **Dynamic routes with URL parameters**

To use `params` with React Router we do it in 3 steps:

1. Create a new route
2. Link to the new route
3. In the new route, read the state from the URL.

Let's follow these steps one by one in an example.

```js
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="product" element={<Product />} />
    <Route path="pricing" element={<Pricing />} />
    <Route path="login" element={<Login />} />
    <Route path="app" element={<AppLayout />}>
      <Route
        index
        element={<CityList cities={cities} isLoading={isLoading} />}
      />
      <Route
        path="cities"
        element={<CityList cities={cities} isLoading={isLoading} />}
      />
      // This is the route for URL params
      <Route path="cities/:id" element={<City />} />
      <Route
        path="countries"
        element={<CountryList cities={cities} isLoading={isLoading} />}
      />
      <Route path="form" element={<p>Form</p>} />
    </Route>
    <Route path="*" element={<PageNotFound />} />
  </Routes>
</BrowserRouter>
```

Now whenever the URL takes the shape of `cities/[something]` it will then render the `City` component corresponding to the city's ID.

So we now need to create a link in each of our `CityItem` components in order to create a URL that leads to a `City` component:

```js
function CityItem({ city }) {
  const { cityName, emoji, date, id } = city;

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
```

> Note that we should only pass the city ID into the `to` prop of the `<Link>` component. This will make it so that the ID of the city will be added to the current URL. If we pass the ID with a `/` at the beginning, so like `/${id}`, it will add the ID to the root URL which is wrong.

Now its time to read the data from the URL into the `City` component. In order to do this, we use the `useParams` hook provided by React Router.

```js
import { useParams } from "react";

function City() {
  const x = useParams();
}
```

Now if we have a URL like this:

```
localhost:3000/app/cities/30498573
```

variable `x` will now be an object with the `id` property holding `30498573` as value. Why is this property called `id`? Because we defined the `path` prop of the `<Route />` component with `path="cities/:id"`.

#### **Reading and setting a query string**

In the `Link` element we inserted for each `CityItem` component where we tried to form the URL with the city ID, we can now go on and set a query string.

```jsx
function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
```

The query string in the URL should always start with a `?` mark. Then we add a name for the value that is being stored in the URL, then we would have an `=` sign between the variable name and the value, and finally the value itself would be inserted dynamically. This will make it so that as we click on a `CityItem` component in the UI, the URL will be formed as:

```
http://localhost:5173/app/cities/73930385?lat=38.727881642324164&lng=-9.140900099907554
```

So the `lat` and `lng` values are now globally accessible. For instance, the `Map` component that is working just on the same page, can now access these variables to load the city location on the map.

So now we are going to read the `lat` and `lng` values from the URL into the `Map` component. To do this we use the `useSearchParams` custom hook. This is very similar to the `useState` hook. So it also returns an array with the first element being the state variable, and the second element being the state setter function.

```js
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  return <div className={styles.mapContainer}>Map</div>;
}
```

Now you might think that the `lat` variable defined in the query string is simply accessible as a `lat` property on the `searchParams` object, but this is not the case. The `searchParams` is an object but in order to access variables defined in the query string, you should use the `.get()` method on it.

```js
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
    </div>
  );
}
```

We can also update the query string using the `setSearchParams` function. For instance, in the `Map` component, we can implement a button that `onClick`, updates the `searchParams` state to a specific value.

```js
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 50 });
        }}
      >
        Change position
      </button>
    </div>
  );
}
```

### **Programmatic navigation with `useNavigate`**

Programmatic navigation means to move to a new URL without the user having to click on any link. A common usecase of this behavior is right after submitting a form. Many times, when the user submites a form, we want them to move to a new page on the application automatically. This is programmatic navigation.

In our example project, we want to implement a programmatic navigation that changes the URL to render a form component once the user clicks on a certain location on the map.

> Basically, some situations actually makes the developer implement programmatic navigation, because according to the UI and its expected functionality, there would essentially be no link for the user to click and move on to a specific URL. So in the mentioned example, forming the URL of the input form is not achieved by clicking on any link, because we have not defined our app to work that way. The input form should only get activated if the user clicks on a location on the map.

In order to implement programmatic navigation in the example mentioned above we use the `useNavigate` hook. This hook returns a function that we can store in a variable, conventionally called `navigate`.

Then on the whole map container we can attach an `onClick` event handler and pass a callback function where the `navigate()` function is called while the target path for the URL is passed into it.

```jsx
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 50 });
        }}
      >
        Change position
      </button>
    </div>
  );
}
```

This was one usecase of the navigate function. But we can also use the same function to navigate back, which is something that we cannot do just with `<Link />`s. In our example, when we render the input form as a result of going forward with the `navigate` function, we will have a _back_ button to move back from the input form. So we would have to use the `useNavigate` hook inside the `Form` component, but this time passing a different value into it; a number!

```jsx
function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}
```

> Including a button element inside a form element will make it so that whenever we click on the button, a page reload will happen as a default behavior. So if you have your button inside the form element, remember to `preventDefault` behavior from happening.

This time we pass `-1` to the `navigate` function. `-1` basically refers to the **number of steps that we want to go back in the browser's history**. We can also use `1` or `-2` or any other number if necessary! Usually we only need `-1`.

### **Programmatic navigation with `Navigate`**

There is also a declarative way of programmatic navigation. Let's now check out the `<Navigate />` component. It is not so much used anymore, but it is still important to learn because one important usecase of it is inside nested routes. Let's see what that means.

As you can remember with the example project that we have been building, when we move to the `/app` route, we implemented an index route so that there would be a default render on this route that would make a list of cities visible. However, when this happens, the cities button on the webpage is not rendered as the active link, so its appearance is just the same as the button for countries. Now if we click on the cities button, the list of cities would still be there and the button gets the appearance of an active button and the URL will be updated to `/app/cities`. This is not a good thing to happen on an SPA. In order to fix this problem, we can use the `Navigate` component to immediately navigate to the cities component as soon as the user enters the `/app` route.

Right now in our `App.jsx` file, we have both the index route and the cities route pointing to the exact same element, so the `CityList` component.

```jsx
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

But let's now change the index route's element prop to point towards the `<Navigate />` component. And inside this component we can insert the `to` prop which will basically act as a redirect.

```jsx
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

> Note that we have inserted a `replace` keyword into the `Navigate` component. This keyword will replace the current element in the history stack of the browser. Otherwise, the browser's back button won't work.

### **Data loading with React Router**

## **React Query**

With this library, we will let **React Query** to take over all fetching and storing of remote data. We implement an integration of React Query for all data fetching and remote state management.

React Query is a powerful library for managing remote (server) state. This is state that is stored on a server that we need to load into our application. This library has many features that allow us to write a lot less code, while also making the UX a lot better.

The most fundamental thing about React Query is that all remote state is cached. This means that the fetched data will be stored in order to be reused in different points of the application. For instance, if we fetch data about cabins in component A, React Query will fetch the data from the API and will store the received data in cache, so that component A can use it. Then, if at a later point, component B also wants to fetch the cabin data, no additional API requests will be necessary. Instead, React Query will provide the same data to component B from cache. This has 2 huge advantages:

1. It wastes a bit less data to be downloaded
2. Once the data is in the cache, all other components can receive it instantly, without showing the user another loading spinner. This will improve the UX a lot.

React Query also gives us all loading and error states, so that we can only focus on what really matters. React Query also automatically re-fetches the data in certain situations. For instance, after a certain timeout or after we leave the browser window and then come back. This is super important in order to ensure that the remote state always stays in sync with the application. For example, if some other user of the app changes the remote state at some point, then the application running on all other devices will have this state out of sync with the newly updated state. So React Query can help with this as well.

Besides re-fetching, with React Query we can pre-fetch data, meaning that we can fetch data that we know will become necessary later but before it is actually displayed on the screen. A classical example of this is pagination, where with pre-fetching we can not only fetch data for the current page, but also for the next page.

It is also very easy to mutate remote state using the many tools that are built into the React Query.

React Query also supports when the user becomes offline. In this situation, since the data is already cache, as the user moves arround in the app while being offline, components that use the cache data can be displayed.

We need a library with all these features because remote state is fundamentally different from UI state. It is asynchronous and usually shared by many users of the app. Applications running in different browsers can very easily get out of sync with the remote data that is stored on the server.

### **Setting up React Query**

You first need to install the library using the terminal:

```
npm install @tanstack/react-query@4
```

The idea behind integrating React Query into our application is very similar to what we did earlier with the Context API or Redux. So We first create a place where the data lives, and then we provide that to the application. In the case of React Query, we set up the cash and the query client using the `QueryClient`.

So in our `App.jsx` file:

```jsx
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
```

Into the `QueryClient` function we can pass an object of options. One of the options is the `staleTime` property for `queries`. Stale time is the amount of time that data in the cache will stay fresh and valid until it is re-fetched again.

With this setup, we have the cache behind the scenes and now to provide this to the application, we use the `<QueryClientProvider>` component in our JSX and wrap all our JSX of the `App` component inside it.

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

#### **React Query Dev tools**

you need to install this NPM package:

```
npm install @tanstack/react-query-devtools
```

You then need to include `<ReactQueryDevtools>` component as the first child of the `QueryClientProvider` component.

```jsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

#### **Fetching data**

We basically want to replace this piece of code:

```jsx
function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" />
    </Row>
  );
}
```

So instad of manually fetching data with the `useEffect` hook, we will now let React Query do this work. We now want to update the `Cabins` component function to return another JSX:

```jsx
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
    </>
  );
}
```

And now we want to generate the `CabinTable` component using React Query. In order to use React Query to fetch data, we should use the `useQuery` custom hook.

```jsx
function CabinTable() {
  const x = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  return <div>Table</div>;
}
```

Into this hook, we need to pass an object with 2 properties. First, `queryKey`, which is usually an array containing a string, but can be a complex array too. This query key that we define here will uniquely identify this data that we are going to query here. So if later, we use the `useQuery` hook on another page, with this exact query key, then the data would be read from the cash. Second, the actual query function named `queryFn` as property. This is the function that is responsible for actually fetching the data from the API. The function that we insert here, needs to return a promise. So we can use the `async` function that we previously defined in the `apiCabins.js` file:

```js
// apiCabins.js
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
```

Async functions always return a promise. In this function, when the promise is resolved, the incoming data will be returned, and therefore if we pass this `getCabins` function to the query function of the React Query, the returned data will be stored into the cache.

Insepcting the `x` variable that has stored the result of the `useQuery` hook, we can now see that it holds an object. This object includes many properties such as `data`, `error`, `isLoading`, `isSuccess`, etc., which are all different states defined by React Query. We can use these:

```jsx
function CabinTable() {
  const {isLoading, data: cabins, error} = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  if(isLoading) return <Spinner />;

  return (
    <Table role='table'>
      <TableHeader role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      <TableHeader />
  {cabins.map(cabin => <CabinRow cabin={cabin} key={cabin.id} />)}
    </Table>
  );
}
```

> Note how we define the `role` attribute for the elements above to make them actually play the role of a table and its rows without having to use the actual `<table>` and `<tr>` HTML elements.

While defining the `CabinRow` component as:

```jsx
function CabinRow({ cabin }) {
  const {name, maxCapacity, regularPrice, discount, image} = cabin;
  return (
    <TableRowr role='row'>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button>Delete</button>
    </TableRow>
  );
}
```

Up until now, nothing seems to be any different than before. The whole code seems to work like what we did without React Query, but you can see the difference if you move to another page on your app, which means to unmount the cabins component. When you return to the cabins page however, you will see that the data previously loaded, is still there without sending another request to the API. So React Query reads data from cache.

The difference is that when we used the `useEffect` hook to directly fetch data, in this scenario, moving back to the cabins page, the hook would fetch the data again. But with React Query, the data would be read from cache and not re-fetched.

Now if you take a look the React Query Dev tools, you see that after a while, the data is not fresh anymore, but it becomes _stale_. This means that React Query is trying to tell us that the data is old and no longer valid. Doing certain things will cause React Query to automatically re-fetch the data. For instance, if we move away from the browser tab and come back to it again, a re-fetch will be triggered. Remember that while the data is still fresh, doing this will not trigger a re-fetch. So by setting the `staleTime` in the React Query setup to `0`, we make it so that the data becomes stale once it arrives. So anytime you switch between browser tabs, React Query will re-fetch.

```jsx
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
```

#### **Mutations**

We now want to mutate our remote server state and automatically re-render the UI. To do this we first define a function that is responsible for deleting a cabin in our `apiCabins.js` file, where we previously define an async function for fetching cabins data.

```js
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
```

However, if we now attempt to delete a cabin by calling this function, nothing will happen since we have the Supabase row-level security enabled on the cabins table. We have enabled all users to only read data from this table, but not to delete from it. So we would have to update this policy temporarily to allow all users to delete cabins from this table. However, we would later update this policy to allow only logged-in users to have these privilages.

Now in order to make the delete button work, so to delete a cabin row, we use React Query, but this time not by the `useQuery` hook. We should now use the `useMutation` hook. This hook receives an object in which we should insert a `mutationFn` property that holds a mutating function.

```jsx
function CabinRow({ cabin }) {
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image} = cabin;

const { isLoading: isDeleteing, mutate } = useMutation({
  mutationFn: (id) => deleteCabin(id),
})

  return (
    <TableRowr role='row'>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button onClick={() => mutate(cabinId)} disabled={isDeleteing}>Delete</button>
    </TableRow>
  );
}
```

The `useMutation` hook returns an `isLoading` state along with a `mutate` callback function that we can connect with the delete button. Now deleting a cabin works, but the UI won't re-render immediately. You would have to reload the page to see the deletion happened. What we should do now is to tell React Query what to do if the mutation is successful. This is actually done by defining an `onSuccess` property on the object passed into the `useMutation` hook. This property would accept a callback function which will be executed once the mutation meets success. In this callback function, we tell the React Query to _invalidate_ the cache, so that it will automatically re-fetch data from the remote server. In practical terms, we should call the `invalideQueries` function on the `queryClient`. In order to get access to the `queryClient`, we use a special hook called `useQueryClient`. The `invalidateQueries` function receives an object where you should define the `queryKey` property with an array containing a string that points to the same cache that you want to be mutated.

```jsx
const queryClient = useQueryClient();

const { isLoading: isDeleteing, mutate } = useMutation({
  mutationFn: (id) => deleteCabin(id),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["cabin"],
    });
  },
  onError: (err) => alert(err.message),
});
```

The `useMutation` hook can also receive an `onError` property in its object, where we can use the error that we throw in the mutation function to display an error to the user.

#### **Mutations (adding data to remote server state)**

Just like what we did in order to be able to delete a cabin data, we now have to implement a handler function for adding a cabin to the `apiCabins.js` function.

```js
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(neWCabin) {
  const { data, error } = await supabase
    .from("cabin")
    .insert([{ newCabin }])
    .select()
    .single(); // This part is necessary to actually return the newly created cabin data available to be returned at the end of the createCabin function.

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
```

Remember that you should create a new policy to the cabins table in Supabase so that users will be able to add data to this table. Again, later you should implement this policy only for authenticated users.

Now we would have to use the `useMutation` hook again in order to mutate the remote server state, this time in the `CreateCabinForm` component which uses the React Hook Form to handle form submission data.

```jsx
function CreateCabinForm() {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={icCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}
```

We should now think about validing the data that is being submitted through the form. So let's now learn about the React Hook Form library.

## **React Hook Form**

We use the React Hook Form library in order to simplify handling forms in React SPAs. First we need to set up the form in our JSX in the UI. The library is only about handling form submissions and errors, etc. So it does not give us any pre-built components. Take this form as an example:

```js
function CreateCabinForm() {
  return (
    <Form>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" defaultValue="" />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}
```

> Note that we have not made any of the input elements of this form a controlled element. We don't have a state variable for any of them. This will be handled using the React Hook Form library.

And we want to display this form at the bottom of our cabins table.

```jsx
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}
```

We can now start handling this form using the React Hook Form library. Let's first install it:

```
npm install react-hook-form@7
```

Now in order to use this library, we implement a `useForm` hook and this will return a few functions that we can use. One of the most fundamental things in React Hook Form is to register inputs into the `useForm` hook. The way it works is to go into the `Input` components, enter JavaScript mode and call the `register` function by passing into it the input field ID. So we write `{...register('name')}`, for example. The `register` can become more complex by adding some validators and we can then handle the errors in the input process.

```jsx
function CreateCabinForm() {
  const { register, handleSubmit } = useForm();
  function onSubmit(data) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Add cabin</Button>
      </FormRow>
    </Form>
  );
}
```

> Note that setting the `type` attribute to `reset` on the `Button` component will make it so that it won't act as a submission button on the form.

Going into the React Query dev tools, we now see that the input fields now have `onBlur` and `onChange` functions added to them automatically.

Note that we also need to pass an `onSubmit` prop to the `Form` component. In this prop, we need to immediately call the `handleSubmit` function returned by the React Hook Form and pass into it a handler function that we define. This makes it so that whenever the form is submitted, our handler function will be called while having access to the form data, so to the values passed into input fields that we registered for the React Hook Form.

### **Handling form errors**

This probably where the React Hook Form shines the most. We can use its features and also create a reusable form row. As we mentioned earlier, the `register` function that we passed as prop to the input fields, can get a bit more complex with data validation.

One of the simplest things that we can do with form validation is to mark an input field as required, so it won't be left empty by the user when submitting. This is done by passing a second argument into the `register()` function. This second argument would be an object in which we can define many properties, one of which is the `required`. This property can accept a string which would be used as an error feedback if the field is left empty.

Another validation task is to determine a minimum value for input fields that receive numbers. This is done by inserting the `min` property into the object. This property should also hold another object where the `value` and `message` properties are set for validation success and error situations.

We can also define our own custom validation functions by inserting a `validate` property into the object. This property should hold a callback function which, by default, has access to the current `value` typed into the input field. In this example we want to compare this value with the value of another input field which is related to the regular price of a cabin. In order to gain access to the value of another input field, we can use the `getValues` function returned by the `useForm` hook. Also note that the error message that should be displayed in case the validation is met with error is passed to the `validate` property next to the validation funciton using the `or` operator (`||`).

Remember that all validations inserted into the form would be executed each time the submit button of the form is clicked. So as we implemented before, the submit button will actually call the submit handler function that we defined previously, and if there is an error in validation, our submit handler function that we passed into the `onSubmit` prop of the `<Form>` component won't be called, but instead, a second callback function that we should now pass into it will be executed. We call this second function `onError`. This function will have access to all the `errors` that happened during data validation.

```jsx
function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  function onError(errors) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={icCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}
```

Now in order to be able to get the defined error messages and display them in the UI we can use another feature of the React Hook Form, which is a function also returned by the `useForm` hook called `formState`. This would an object that includes an `errors` property, which we can extract by destructuring.

### **Uploading images through form**

We can basically upload files to our remote server using the `FileInput` component defined in the form. Remember that in order to store this image in the new object that is sent to the remote server, we need to only include the image's file name since that is usually the data structure that we define in managing a database in Supabase.

```jsx
function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data, image: data.image[0]);
  }

  function onError(errors) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={icCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}
```

In order to be able to upload the image to the database, we need to update the `createCabin` function like below:

```jsx
export async function createCabin(neWCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = `<supabase-base-url>/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabin")
    .insert([{ newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image (after the new cabin row is created in the remote server)
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin row if there was an error uploading image
  if (storageError) {
    await supase.from("cabin").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
```

Remember that in order to be able to upload images to the Supabase bucket, you need to enable the related RLS.

### **Filling in a form with default values**

In case we want to display a form to enable the user to edit the data of a cabin, we would reuse the `CreateCabinForm` component, but this time making the component able to receive default values. To do this, we first need to make the component ready to receive data cabin's already exisiting data as an argument, for exmaple, called `cabinToEdit`. Then inside the component we need to destructure the values of this `cabinToEdit` and also figure out if the form is displayed to _edit_ or to _create_ cabin data. Then based on one of the two situations, we need to pass an object of options to the `useForm` hook in which we define a property called `defaultValues`. This default values property, of course, should only be used if the form is actually created to edit a cabin's data. This would be the situation where we would need to prefill the form with the already exisiting data of the cabin.

```jsx
function CreateCabinForm({cabinToEdit = {}}) {
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data, image: data.image[0]);
  }

  function onError(errors) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={icCreating}>{isEditSession ? 'Edit Cabin' : 'Add new cabin'}</Button>
      </FormRow>
    </Form>
  );
}
```

Then we should update the `apiCabins.js` file to update a cabin data.

```js
"Add code here";
```

## **React Hot Toast**

This 3rd-party library is used to display toast notifications in React applications. We should first install its library:

```
npm install react-hot-toast
```

Then we need to set it up in the `App.jsx` file. Just like the `ReactQueryDevtools` we now need to include yet another self-closing component that is responsible for providing some options to the toaster.

```jsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

    <Toaster position='top-center' gutter={12} containerStyle={{margin: '8px'}} toastOptions={{
      success: {
        duration: 3000,
      },
      error: {
        duration: 5000,
      },
      style: {
        fontSize: '16px',
        maxWidth: '500px',
        padding: '16px 24px',
        backgroundColor: 'var(--color-grey-0)',
        color: 'var(--color-grey-700)'
      }
    }} />
  );
}
```

We are now able to use this toaster in different parts of our application to display errors.

```jsx
const queryClient = useQueryClient();

const { isLoading: isDeleteing, mutate } = useMutation({
  mutationFn: (id) => deleteCabin(id),
  onSuccess: () => {
    toast.success("Cabin successfully deleted");
    queryClient.invalidateQueries({
      queryKey: ["cabin"],
    });
  },
  onError: (err) => toast.error(err.message),
});
```

## **Styled Component library**

The styled component library allow us to write CSS right inside our JavaScript component files. The way it works is that we take a regular HTML element and then, using the `styled` function, we create a brand new React component with some CSS styles applied to it. We can then use and reuse that new component instead of using the regular HTML element.

In order to use the Styled Components library you need to install it in the terminal first:

```
npm install styled-components
```

Then we can use this syntax in order to implement, for instance, a primary heading component:

```jsx
// App.jsx
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;
```

The `H1` variable now holds a React component called with that name and we can now use it as a regular React component in our JSX.

```jsx
function App() {
  return (
    <div>
      <H1>The Wild Oasis</H1>
    </div>
  );
}
```

In order to make VS code prettify your styled component syntax you can install the `vscode-styled-components` extension.

The intersting thing to know about this, is that the styled components that we define can receive all the same props that a regular HTML or JSX element can receive. For instance, we can pass the `onClick` prop to a button that we define like this:

```jsx
const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
`;

function App() {
  return (
    <div>
      <H1>The Wild Oasis</H1>
      <Button onClick={() => alert("Checked out")}>Check in</Button>
    </div>
  );
}
```

We can also create an input element like this:

```jsx
const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

function App() {
  return (
    <div>
      <H1>The Wild Oasis</H1>
      <Button onClick={() => alert("Checked out")}>Check in</Button>
      <Input type="number" placeholder="Number of guests" />
    </div>
  );
}
```

In designing a form in our application, we many times need to define the `type` attribute for the input fields, so that we would not have to manually insert it into the styled component every single time that we use it. To do this we can attach the `attrs` property to the `input` when declaring a styled input component. This will make it so that the `Input` component will always have the `type` attribute set to `file` on it.

```jsx
const Input = styled.input.attrs({ type: "file" })`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

function App() {
  return (
    <div>
      <H1>The Wild Oasis</H1>
      <Button onClick={() => alert("Checked out")}>Check in</Button>
      <Input type="number" placeholder="Number of guests" />
    </div>
  );
}
```

> In order to style the `App` component itself, it is a convention to style a `div` element as it would be the container of all the elements and components that you include in the JSX of your `App` component. This conventions requires you to declare a component name of `StyledApp` in terms of styled components.

```jsx
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <H1>The Wild Oasis</H1>
      <Button onClick={() => alert("Checked out")}>Check in</Button>
      <Input type="number" placeholder="Number of guests" />
    </StyledApp>
  );
}
```

Now you might ask, how we can include global styles with styled components, for instance, for CSS resets that should be applied to the entire page.

#### **Introducing global styles**

Inside the `styles` folder, we create a new file called `GlobalStyles.js`, and what we basically do is to create a new styled component which will become our global style component. In this file, we use the `createGlobalStyle` function and pass our global styles into it:

```jsx
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
```

> The idea of defining all CSS style variables as design tokens in one central place, is to be able to use them in all different styled components that we are going to build.

Now in order to apply these global styles to our application, the `GlobalStyles` component that we just exported, needs to be added to the component tree but cannot accept any children. We want it to be a sibling of the `StyledApp` component. So we also need to use a React Fragment.

```jsx
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert("Checked out")}>Check in</Button>
        <Input type="number" placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}
```

> Instead of using all the CSS variables that we defined manually, the Styled Component library actually also gives us its own way of providing variables to our entire application. This is done using a mechanism called _Themes_. However, it is a lot better to stick to the native CSS.

#### **Styled Component props and CSS function**

We are now going to use Styled Component library to create more reusable components. For instance, we want to have this styled component for primary heading:

```jsx
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;
```

But we want to make it more reusable so that we could use it also for secondary headings and other levels of headings.

We first take this code to its separate file, for instance, called `Heading.jsx`.

```jsx
const Heading = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

export default Heading;
```

Now pay attention to the fact that CSS declarations above are inserted into a template literal. So we can insert JavaScript expressions where you need to.

```jsx
import styled from "styled-component";

const Heading = styled.h1`
  font-size: ${10 > 5 ? "20px" : "40px"};
  font-weight: 600;
`;
```

You can also insert CSS declaration in a separate variable and then insert it into the CSS declarations.

```jsx
const test = `text-align: center;`;

const Heading = styled.h1`
  font-size: ${10 > 5 ? "20px" : "40px"};
  font-weight: 600;
  ${test}
`;
```

Now you might notice that defining CSS rules in a separate variable will not provide you with syntax highlighting. To fix this, you can import the `css` function from `styled-components` and then use it before the template literal that you used in the separate variable.

```jsx
import styled, { css } from "styled-component";

const test = css`
  text-align: center;
`;

const Heading = styled.h1`
  font-size: ${10 > 5 ? "20px" : "40px"};
  font-weight: 600;
  ${test}
`;
```

But in order to create a more reusable styled component we need to somehow accept some prop where the component is being used. For instance, we use this component in the `App` component like this:

```jsx
function App() {
  return <Heading type="h2">Heading text</Heading>;
}
```

How are we going to receive that prop in the styled component and act based on it? To do this, we can enter JavaScript mode in the styled component template literal and declare a function like this:

```jsx
import styled, { css } from "styled-component";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  line-height: 1.4;
`;
```

However, this will always insert a `h1` element in the HTML file no matter what `type` prop you pass into the component. To fix this, we can us the `as` prop instead of `type`.

```jsx
import styled, { css } from "styled-component";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  line-height: 1.4;
`;
```

And then when we use this component we can do:

```jsx
function App() {
  return <Heading as="h2">Heading text</Heading>;
}
```

# **Project deployment**

## **First, build the application**

In order to deploy our applications we first need to build our actual application bundle. This is where Vite takes all the files that we have created during development and bundle them into one single file. That file is what we then deploy to production.

With Vite, the build command is:

```
npm run builds
```

This process may end up with some warnings about problems that exist in our code, such as unused variables, etc. We can go on and correct the problems, and then attempt on building our project again.

Finally we acquire a bundle file in the `dust/asets` folder with a name similar to:

```
index-dff3a02c.js
```

along with some other files in the `dist` folder like `index.html` and other files such as images that are necessary.

You may see that your bundle is pretty huge in size. We actually do code splitting to avoid such a problem, but some applications are fully hidden behind a login and some applications are only ever used by few users, which is the reason that we don't implement server-side rendering. In this situation it is perfectly fine to have a bit larger bundle size.

## **Second, deploy to Netlify**

Before deploying to Netlify, we need to create a file in the `dist` folder called `netlify.toml`. In this file, you need to insert the code below:

```
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

You also need to copy this file into the main folder of your project so that you won't lose it in later attempts on building the application, since it will overwrite the currently existing `dist` folder.

We are now ready to deploy this build to a hosting provider like Netlify. In Netlify you go on with adding a new site by manual deployment. You would have to drag and drop your `dist` folder.

You can take this process to the next level by implementing continious integration. This is done, basically, by connecting your GitHub account to Netlify.

## **Deploying to Vercel**

To deploy to Vercel with continious integration, we should use a Git and GitHub repository. In fact, connecting your GitHub account to Vercel is among the first steps in signing up to Vercel.

To deploy to Vercel, you go on with creating a new project, which leads you to a page where Vercel fetches your projects from your GitHub repositories.

The main difference with deploying to Vercel, is that you don't need to build your application manually before deploying. Vercel will automatically detect your React's development kit and package JSON file, and it will build your bundle and finally take care of deploying it. This way, Vercel has implemented the continious integration of projects.
