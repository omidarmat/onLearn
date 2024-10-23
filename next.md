# NextJS essentials

- [NextJS essentials](#nextjs-essentials)
  - [Routing in NextJS](#routing-in-nextjs)
    - [Route handlers](#route-handlers)
      - [Handling GET requests](#handling-get-requests)
      - [Handling POST request](#handling-post-request)
      - [Dynamic route handlers](#dynamic-route-handlers)
      - [Handling PATCH requests](#handling-patch-requests)
      - [Handling DELETE requests](#handling-delete-requests)
      - [URL query parameters](#url-query-parameters)
      - [Redirects in route handlers](#redirects-in-route-handlers)
      - [Headers in route handlers](#headers-in-route-handlers)
      - [Cookies in route handlers](#cookies-in-route-handlers)
      - [Caching in route handlers](#caching-in-route-handlers)
      - [Middleware](#middleware)
  - [Rendering in NextJS](#rendering-in-nextjs)
  - [Rendering in React](#rendering-in-react)
    - [Client-Side Rendering (CSR)](#client-side-rendering-csr)
    - [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
      - [Suspense for SSR](#suspense-for-ssr)
    - [React Server Component](#react-server-component)
      - [Client components](#client-components)
      - [Server Components](#server-components)
      - [RSC key takeaways](#rsc-key-takeaways)
      - [RSC and NextJS](#rsc-and-nextjs)
      - [RSC in NextJS](#rsc-in-nextjs)
        - [Summary](#summary)
    - [Rendering lifecycle of server and client components](#rendering-lifecycle-of-server-and-client-components)
    - [Static rendering](#static-rendering)
      - [RSC file format](#rsc-file-format)
        - [Prefetching](#prefetching)
      - [Summary](#summary-1)
    - [Dynamic rendering](#dynamic-rendering)
      - [Summary](#summary-2)
    - [Streaming](#streaming)
    - [Server and client composition patterns](#server-and-client-composition-patterns)
      - [Server component patterns](#server-component-patterns)
        - [Server-only code](#server-only-code)
          - [Summary](#summary-3)
        - [Third-party packages](#third-party-packages)
          - [Summary](#summary-4)
        - [Context providers](#context-providers)
      - [Client component patterns](#client-component-patterns)
        - [Client-only code](#client-only-code)
          - [Summary](#summary-5)
        - [Client component placement](#client-component-placement)
    - [Interleaving server and client](#interleaving-server-and-client)
      - [Importing server component into another server component](#importing-server-component-into-another-server-component)
      - [Importing client component into another client component](#importing-client-component-into-another-client-component)
      - [Importing a client component inside a server component](#importing-a-client-component-inside-a-server-component)
      - [Importing a server component into a client component](#importing-a-server-component-into-a-client-component)

This file is written based on the content produced by _Codevolution_ in videos available on youtube via the link below:

```
https://www.youtube.com/playlist?list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI
```

## Routing in NextJS

Let's dive into the different features that NextJS offers. In this section we will explore the routing feature offered by NextJS, specifically focusing on the app router.

NextJS has a file-system based routing mechanism where the URL path that users can access in the browser are defined by file and folders in your codebase.

> **Note:** Does this mean every file in our app corresponds to a route? No. NextJS is a framework where we need to follow certain conventions. Routing is one such feature where we have to heavily follow the framework conventions.

We are now going to understand NextJS routing conventions.

1. All routes must be placed inside the `app` folder.
2. Every file that corresponds to a route must be named `page.jsx`.
3. Every folder corresponds to a path segment in the browser URL.

When these conventions are followed, the file automatically becomes available as a route.

For the first scenario, let's add a route that needs to be rendered when a user visits our website at `localhost:3000`.

```
+ src
  + app
    - page.jsx
```

[to be continued...]

---

Before we get into routing in NextJS, we should start with the concept of **React Server Components (RSC)**.

In NextJS, all components are server components by default. They have the ability to run tasks like reading files or fetching data from a database. However, they don't have the ability to use hooks or handle user interactions.

To create a client component, it is necessary to add `'use client'` directive at the top of the component file. Client components cannot perform tasks like reading files, but they have the ability to use hooks and manage interactions. Client components are the traditional React components that we are familiar with.

In this section which is concerned with Routing, we will explore examples where we use server components that await certain actions to finalize before rendering content on the screen. We will also see examples where we use client components to levarage hooks from the routing module.

### Route handlers

So far we have learned how to route to pages. Now it turnes out with NextJS app router, we have the capability to handle more than just page routing. We can also create custom request handlers for out routes using a feature called **route handlers**. Unlike page routes, which respond with HTML content, route handlers allow you to create RESTful endpoints, giving you full control over the response. You can perform credit operations with a database similar to a Node + Express app, except there is no overhead of having to create and configure a separate server. NextJS provides everything you need out of the box.

Route handlers are also great for making external API requests. For instance, if you are building an application that requires fetching data from a thrid-party service, route handlers are ideal. They run server-side, ensuring that sensitive information like private keys remain secure and never gets shipped to the browser.

For those familiar with page-based routing, route handlers are the equivalent of API routes. As you can see NextJS simplifies routing on both the front end and back end.

Now let's see how to create our first route handler. Go on in initialize a new next project.

```bash
npx create-next-app@latest
```

You can go on and create a folder inside `app` folder and call it `hello`. Note that similar to page routes, route handlers must also be placed within the `app` folder. Within this folder we create a new file. You may think that we should call this file `page.jsx`, but you are wrong! You should name it `route.js`. This is the NextJS convention that we must follow.

Within this file, we define and export a function corresponding to the GET HTTP verb. The function name matching an HTTP verb is another convention we must follow. For out simple API example here we are going to respond with plain text. We will be using the standard JavaScript **response object**.

```jsx
// app/hello/route.js
export async function GET() {
  return new Response("Hello world!");
}
```

We have now created our first route handler. Now heading to the browser, if you navigate to `/hello`, you will see the plain text response `hello world!` within the viewport.

There are two points to make note of. First, similar to page routes, route handlers can be organized in folders and nested within sub-folders. This allows for cleaner organization and easier management of routes. For instance you can create a `dashboard` folder within the `app` folder and then add a route handler within the folder. You can then create a sub-folder called `users` and inside it, create another `route.js` file. You can then go to the browser and navigate to each route and see the result of each route handler.

Second, you should be mindful of potential conflicts between page routes and route handlers. For instance, if you have a route `profile` with a `page.jsx` file in it, with a React component that simply returns an `<h1>` tag, and another file called `route.js` with a `GET` funciton within the same `profile` folder, the `route.js` route handler will handle the incoming request **by default**. To avoid this conflict between `page.jsx` and `route.js` and have both working, you can move the route handler into an `api` sub-directory. So you would have to create an `api` folder within the `profile` folder, and move `route.js` file into the `api` folder.

```
+ app
  + profile
    - page.jsx
    + api
      - route.js
```

Now if a refresh the route `/profile` in the browser, you will see the component response in the viewport. Now if you want to see the API response, you need to navigate to `/profile/api`.

To summarize, route handlers allow you to create custom request handlers for a given route. They are defined in a `route.js` file inside the `app` directory.

#### Handling GET requests

For the purpose of this section, we will use the Thunder Client in VS Code and a data file called `data.js` placed inside a folder called `comments` inside the `app` directory.

```jsx
// app/comments/data.js
export const comments = [
  {
    id: 1,
    text: "This is the first comment",
  },
  {
    id: 2,
    text: "This is the second comment",
  },
  {
    id: 3,
    text: "This is the third comment",
  },
];
```

let's now create our route handler. In the same `comments` folder, create a `route.js` file.

```jsx
// app/comments/route.js
import { comments } from "./data";

export async function GET() {
  return new Response.json(comments);
}
```

Now let's head to the Thunder client to send a `GET` request to the `http://localhost:3000/comments` route. This will be responded with `200` status code and all the comments placed inside the `data.js` file.

Responding to a `GET` request in JSON format, the response status would remain `200`. So we don't need to specify a certain status code.

> **Note:** At the moment we are using the Thunder client to fetch the comments, but in a real-world application the UI would make a request to fetch the comments on page load or on click of a button. But the bottom line is that we are able to define route handlers with NextJS.

#### Handling POST request

The POST request will be sent via the Thunder client using the `POST` verb to the same URL. But in this case, we need to specify a new comment object that is going to be added to the previous data. To do this, in the `Body` tab, under `JSON`, we specify an object as:

```json
{
  "test": "New Comment"
}
```

Note that we don't specify the `id` property, since it should be generated in the route handler function. Now we should go on and create the handler function in the `route.js` file.

Responding to a `POST` request, `201` that means resource creation is the proper status code of the response object. So we need to return a response and set the code manually:

```jsx
// app/comments/route.js
import { comments } from "./data";

export async function POST(request) {
  const comment = await request.json();
  const newComment = {
    id: comments.length + 1,
    text: comment.text,
  };
  comments.push(newComment);
  return new Response(JSON.stringify(newComment), {
    headers: {
      "Content-type": "appication/json",
      status: 201,
    },
  });
}
```

> **Note:** remember that all route handler functions have access to the `request` object, along with other things that will be mentioned later.

This is pretty much how we handle POST requests.

#### Dynamic route handlers

Before we can proceed to understand `PATCH` and `DELETE` requests, we need to understand dynamic route handlers. Because these HTTP verbs work a bit different since you need to specify the ID of a comment object to make them work.

While `/comments` route will handle both `GET` and `POST` requests, for a `PATCH` or `DELETE` request our endpoint will be `/comments/:id` where id is the **dynamic segment**.

Dynamic route handlers work similar to dynamic page routes. So within the `comments` folder, we create a new folder called `[id]`.

```
+ app
  + comments
    - route.js
    + [id]
      - route.js
```

Now in the `route.js` file inside the `[id]` folder, we define a `GET` handler function. In this function, we need to access the route parameter.

We mentioned before that all route handler functions have access to the `request` object. But there is more. Every route handler function has access to a `context` object. In the current example, the only value of the `context` is `params` which is an object containing the dynamic route parameters for the current route. So from `context`, we can immediately destructure `params`, and from that we get the `id` which corresponds to the dynamic route that we defined using the folder name `[id]`.

```jsx
// app/comments/[id]/route.js
import { comments } from "../data";

export async function GET(_request, { params: { id } }) {
  const comment = comments.find(
    (comment) => comment.id === parseInt(params.id)
  );

  return Response.json(comment);
}
```

#### Handling PATCH requests

A `PATCH` request applies partial modifications to a resource. In our case, since we have just one property (`text`), updating a comment is quirte straightforward.

Let's begin by understanding how a `PATCH` request looks like in the Thunder client.

The URL will be something like `http://localhost:3000/comments/3` which the last segment defines the id of the target comment object. Under the `Body` tab and in the `JSON` section, we add an object with the `text` property set to a different string like this:

```json
{
  "text": "Updated comment"
}
```

Let's now add the route handler function.

```jsx
// app/comments/[id]/route.js
export async function PATCH(request, { params: { id } }) {
  const body = await request.json();
  const { text } = body;
  const index = comments.findIndex(
    (comment) => comment.id === parseInt(params.id)
  );
  comments[index].text = text;
  return Response.json(comments[index]);
}
```

This is essentially how we handle `PATCH` requests.

#### Handling DELETE requests

A `DELETE` requests deletes a specified resource. In our case, we delete a comment by ID. Let's start by looking at how a `DELETE` request looks like in the Thunder client.

The URL stays the same as before. We don't need a JSON body with the request.

We now need to define the route handler function.

#### URL query parameters

Take the comments array that act as a database for our example. Now let's consider an example where we want to filter this array based on a specific query. For instance, we want to be able to navigate to this route:

```
http://localhost:3000/comments?query=first
```

and receive only those comments the text of which includes the word 'first'.

To handle query parameters effectively we need the request parameter. The `GET` handler function in the `route.js` file of `[id]` folder, receives the `request` object.

> **Note:** In this part of the video tutorial, the type of the request object is set to `NextResponse` and not the `Response` object. This is done in TypeScript, while the preferred language in this note is JavaScript. The code sample needs to be updated.

```jsx
// app/comments/[id]/route.js
export async function GET(request) {
  // nextURL is used on `request` while it may need to be updated to utilize `NextRequest`
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filteredComment = query
    ? comments.filter((comment) => comment.text.includes("query"))
    : comments;
  return Response.json(filteredComment);
}
```

Query parameters are often optional, but they are incredibly useful for implementing search, sort and pagination functionalities for your data.

#### Redirects in route handlers

We are now going to learn how to handle redirects in route handlers. Remember that we defined a `GET` handler function to return a specific comment by its `id`. However, if we navigate to a route with an `id` parameter value that does not exist in our simulated database, the application will end up in an error. This is because the current logic does not handle IDs that don't exist in the `comments` array. Let's improve this by redirecting to the comments listing page if the request ID is not found.

For redirection, we will use the `redirect` function from `next/navigation`. So in the `route.js` file within the `[id]` folder, at the top we import `redirect`:

```jsx
import { comments } from "../data";
import { redirect } from "next/navigation";

export async function GET(_request, { params }) {
  if (parseInt(params.id) > comments.length) {
    redirect("/comments");
  }
  const comment = comments.find(
    (comment) => comment.id === parseInt(params.id)
  );

  return Response.json(comment);
}
```

This is just one possible use case of redirection.

#### Headers in route handlers

#### Cookies in route handlers

#### Caching in route handlers

#### Middleware

## Rendering in NextJS

Rendering is the process that transforms the code you write into user interfaces. However, choosing the **right time and place** to do this rendering is vital for building a **performant** application. In this regard, we will consider some concepts: **CSR**, **SSR** and **RSCs**.

Before diving into rendering in NextJS, let's first understand rendering in React. This will help us better grasp how rendering works in NextJS.

To fully understand Rendering in NextJS, it helps to know about the evolution of React's rendering over the last decade. So let's first understand how React has evolved its rendering strategies.

## Rendering in React

### Client-Side Rendering (CSR)

In a typical SPA, when a client sends a request, the server sends a single HTML page to the browser, containing a simple `<div>` tag and a reference to a JavaScript file. This JavaScript file contains everything your application needs to run, including React library itself and your application code. It is downloaded when the HTML file is parsed. The downloaded JavaScript code then generates the HTML on your computer and inserts it into the DOM under the root `<div>` element. This process is evident when you see the HTML in the DOM inspector, containing rendered HTML, but not in the 'View source' option which shows the HTML file sent by the server to the browser. This HTML file is basically empty.

This method of rendering, where the component code is transformed into a user interface directly within the browser (the client), is known as **Client-Side Rendering (CSR)**. However, developers soon noticed some inherent drawbacks to this approach:

1. **Negative impact on SEO:** Genering HTML that mainly contains a single `<div>` is not optimal for SEO, as it provides little content for search engines to index. Large bundle size and a waterfall of network requests for API responses from deeply nested components may result in meaningful content not being renderd fast enough for being indexed.
2. **Negative impact on Performance:** Having the browser handle all the work such as fetching data, computing the UI, and making the HTML interactive, can slow things down. Users might see a blank screen or a loading spinner while the page loads. Each new feature added to the application increases the size of the JavaScript bundle, prolonging the wait time for users to see the UI. This delay will be noticable for users with slow internet connections.

To overcome these drawbacks of CSR, modern React frameworks like Gatsby and NextJS moved toward Server-Side solutions (SSR). This approach fundamentally changes how content is delivered to the user.

### Server-Side Rendering (SSR)

when a request comes in, instead of sending a nearly empty HTML file that depends on client-side JavaScript to construct the page, the server takes charge of rendering the full HTML. This fully-formed HTML document is then sent directly to the browser. Since the HTML is generated on the server, the browser is able to quickly parse and display it, improving the initial page load time. The Server-Side approach effectively addresses the issues associated with CSR.

1. **Positive impact on SEO:** search engines can easily index the server-rendered content.
2. **Positive impact on performance:** users can immediately see the page HTML content, instead of a blank screen or a loading spinner.

However, SSR approach to immediately improving the visibility of content has its own complexity, particularly when it comes to page's **interactivity**.

The full interactivity of the page is on hold until the JavaScript bundle comprising React itself along with your application-specific code has been completely downloaded and executed by the browser. This important phase, known as **hydration**, is where the static HTML page initially served by the server is brought to life.

During Hydration, React takes control in the browser with constructing the component tree in memory based on the static HTML that was served. It carefully plans the placement of interactive elements within this tree. Then React proceeds to bind the necessary JavaScript logic to these elements. This involves, initializing the application state, attaching event handlers for actions such as clicks and mouseovers, and setting up any other dynamic functionalities required for a fully interactive user experience.

Server-side solutions can be categorized in two strategies:

1. **Static Site Generation (SSG):** this occures at build time, when the application is deployed on the server. This results in pages that are already rendered and ready to be served. It is ideal for content that does not change often, like blog posts.
2. **Server-Side Rendering(SSR):** renders pages on-demand in response to user requests. It is suitable for personalized content like social media feeds, where the HTML depends on the logged-in user.

SSR was a significant improvement over CSR providing faster initial page loads and better SEO. However, SSR introduced its own set of challenges:

1. **You have to fetch everything before you can show anything:** components cannot start rendering and wait while data is still being loaded. If a component needs to fetch data from a database or an API, this fetching must be completed before the server can begin rendering the page. This can delay the server's response time to the browser, as the server must finish collecting all necessary data before any part of the page can be sent to the client.
2. **You have to load everything before you can hydrate anything:** for successful hydration, where React adds interactivity to the server-rendered HTML, the component tree in the browser must exactly match the server-generated component tree. This means that all the JavaScript for the components must be loaded on the client before you can start hydrating any of them.
3. **You have to hydrate everything before you can interact with anything:** React hydrates the domponent tree in a single pass, meaning once it starts hydrating, it won't stop until it is finished with the entire tree. As a consequence, all components must be hydrated before you can interact with any of them.

These three problems create an _all or nothing_ waterfall problem that spans from the server to the client, where each issue must be resolved before moving to the next one. This is inefficient if some parts of the application are slower than others, as is often the case in real-world apps. As a result, the React team introduced a new and improved SSR architecture.

#### Suspense for SSR

The suspense SSR architecture allows you to use the `<Suspence>` component to unlock two major SSR features:

1. **HTML streaming on the server**
2. **Selective hydration on the client**

As we discussed before, SSR has been an all or nothing affair. The server sends to the client the complete HTML with a reference to a JavaScript file. The client displays this HTML and only after the complete JavaScript bundle is loaded, React proceeds to hydrate the entire application to add interactivity. Here is a similar visualization from a user interface perspective:

```jsx
<Layout>
  <Header />
  <Sidenav />
  <MainContent />
  <Footer />
<Layout />
```

First, you render all HTML, the cient eventually receives it, then you load all the code and hydrate the entire application. However, with React 18 we have a new possibility:

```jsx
<Layout>
  <Header />
  <Sidenav />
  <Suspense fallback={<Spinner />}>
    <MainContent />
  <Suspense />
  <Footer />
<Layout />
```

By wrapping a part of the page, such as the `<MainContent />` within the `<Suspence>` component, we instruct React that it does not need to wait for the main section data to be fetched to start streaming the HTML for the rest of the page. React will send a placeholder, like a spinner, instead of the complete component. Once the server is ready with the data for the main section, React sends additional HTML to the ongoing stream accompanied by an inline `script` tag containing the minimal JavaScript needed to correctly position that HTML. As a result, even before the full React library is loaded on the clinet-side, the HTML for the main section becomes visible to the user. This solves the first problem mentioned before: **now you don't have to fetch everything before you can show anything.** If a particular section delays the initial HTML, it can be seamlessly integrated into the stream later. This is the essence of how `<Suspence>` facilitates server-side HTML streaming.

We still have another challenge. Until the JavaScript for the main section is loaded, client-side app hydration cannot start. Now if the JavaScript bundle for the main section is large, this could significantly delay the process. To mitigate this, **code splitting** can be used. Code splitting allows you to mark specific code segments as not immediately necessary for loading, signaling your bundler to segregate them into separate `script` tags. Using React `lazy` for code splitting, enables you to separate the main section's code from the primary JavaScript bundle. As a result, the JavaScript containing React and the code for the entire application, excluding the main section, can now be downloaded by the client without having to wait for the main section's code. This is crucial because by wrapping the main section within `<Suspence>` you have indicated to React that it should not prevent the rest of the page from not just streaming, but also from hydrating. This feature, called **Sselective hydration** allows for the hydration of sections as they become available before the rest of the HTML and the JavaScript code are fully downloaded.

From the user's perspective, initially they see non-interactive content that streams in as HTML. Then you tell React to hydrate. The JavaScript code for the main section is not there yet, but it is ok as we can selectively hydrate other components. The main section is hydrated once its code is loaded. Thanks to selective hydration, a heavy piece of JavaScript does not prevent the rest of the page from becoming interactive. Moreover, selective hydration offers a solution to a third issue: **the neccessity to hydrate everything to interact with anything.** React begins hydrating as soon as possible enabling interactions with elements like the header and side navigation without waiting for the main content to be hydrated. This process is managed automatically by React. In scenarios where multiple components are awaiting hydration, **React prioritizes hydration based on user interactions**. For instance, if the `<Sidenav />` is about to be hydrated, and you click on the `<MainContent />` area, React will synchronously hydrate the clicked component during the capture phase of the click event. This ensures the component is ready to respond immediately to user interactions. `<Sidenav />` is hydrated later on.

So the 3 significant drawbacks of traditional SSR have all been addressed by the new Suspense SSR architecture. Despite these improvemenet, few challenges still remain:

1. Eventhough JavaScript code is streamed to the browser asynchronously, eventually the entire code for a webpage must be downloaded by the user. As applications add more features, the amount of code users need to download grows. This leads to an important question: **Should users really have to download so much data?**
2. The current approach requires that all React components undergo hydration on the client-side, irrespective of their actual need for interactivity. This process can inefficiently spend resources and extend loading time and time to interactivity for users as their devices need to process and render components that might not even require client-side interaction. This leads to another question: **Should all components be hydrated, even those that don't need interactivity?**
3. In spite of server's superior capacity for handling intensive processing tasks, the bulk of JavaScript execution still takes place on the user's device. This can slow down the performance, especially on devices that are not very powerful. This leads to another important question: **Should so much of the work be done on the user's device?**

These issues highlight the need for a better way to build faster applications that improve upon traditional rendering techniques while overcoming their limitations. Let's take a look at what the solution is.

### React Server Component

Until now we have seen React rendering strategies evolve from CSR to SSR and then to suspense for SSR. Each step introduced its own set of improvements, and naturally, its own challenges. Suspense for SSR brought us closer to a seamless rendering experience while we still face some challenges: Increased bundle sizes leading to excessive downloads for users, Unneccessary hydration delaying interactivity, extensive client-side processing that could result in poor performance. To address these challenges, we need a significant leap toward a more powerful solution.

React Server Components (RSC) represent a new architecture designed by the React team. This approach aims to leverage the strengths of both server and client environments, optimizing for efficiency, load times, and interactivity.

The architecture introduces a dual-component model:

- Client components
- Server components

This distinction is not based on the functionality of the components, but rather on where they execute and the specific environments they are designed to interact with.

#### Client components

Client components are the familiar React components we have been using and talking about in the previous rendering techniques. They are tipically rendered on the clinet-side (CSR), but they can also be rendered to HTML on the server (SSR), allowing users to immediately see the page's HTML content reather than a blank screen.

The idea of client components rendering on the server might seem confusing, but it is helpful to view them as components that primarily run on the client but can (and should) also be executed once on the server as an optimization strategy.

Client components have access to client environment, such as the browser, allowing them to use state, effects, and event listeners to handle interactivity and also access browser-exclusive APIs like geolocation or local storage, allowing you to build UI for specific use cases. In fact, the term "client component" does not signify anything new. It simply helps differentiate these components from the newly introduced server components.

#### Server Components

Server components represent a new type of React component specifically designed to operate exclusively on the server. Unlike client components, their code stays on the server and is never downloaded to the client. This design choice offers multiple benefits to React applications. This design choice offers multiple benefits to React applications:

1. **Reduced bundle sizes:** Server components do not send code to the client, allowing large dependencies to remain server-side. This benefits users with slower internet connections or less capable devices by eliminating the need to download, parse, and execute JavaScript for these components. Additionally, it removes the hydration step, speeding up app loading and interaction.
2. **Direct access to server-side resources:** By having direct access to server-side resources like databases or file systems, server components enable efficient data fetching and rendering without needing additional client-side processing. Leveraging the server's computational power and proximity to data sources, they manage compute-intensive rendering tasks and send only interactive pieces of code to the client.
3. **Enhanced security:** Server components' exlusive server-side execution enhances security by keeping sensitive data and logic, including tokens and API keys, away from the client-side.
4. **Improved data fetching:** Server components enhance data fetching efficiency. Typically, when fetching data on the client-side using `useEffect`, a child component cannot begin loading it data until the parent component has finished loading its own. This sequential fetching of data often leads to poor performance. The main issue is not the round trips themselves, but that these round trips are made from the client to the server. Server components enable applications to shift these sequential round trips to the server-side. By moving this logic to the server, request latency is reduced, and overall performance is improved, eliminating client-server waterfalls.
5. **Caching:** Rendering on the server enables caching of the results, which can be reused in subsequent requests and across different users. This approach can significantly improve performance and reduce costs by minimizing the amount of rendering and data fetching required for each request.
6. **Faster initial page load and first contentful paint:** Initial page load and First Contentful Paint (FCP) are significantly improved with server components. By generating HTML on the server, pages become immediately visible to users without the dealy of downloading, parsing, and executing JavaScript.
7. **Improved SEO:** Regarding SEO, the server-rendered HTML is fully accessible to seach engine bots, enhancing the indexability of your pages.
8. **Efficient streaming:** Server components allow the rendering process to be divided into managable chunks, which are then streamed to the client as soon as they are ready. This approach allows users to start seeing parts of the page earlier, eliminating the need to wait for the entire page to finish rendering on the server.

With RSC architecture server components take charge of data fetching and static rendering, while client components are tasked with rendering the interactive elements of the application. The bottom line is that the RSC architecture enables React applications to leverage the best aspects of both server and client rendering, all while using a single language, a single framework, and a cohesive set of APIs.

#### RSC key takeaways

RSCs introduce a new way of building React apps by separating components into two types: Server Components and Client Components.

Server components run only on the server, accessing data and preparing content without being sent to the brower, which makes the app faster for users because less information needs to be downloaded.

Server components can't manage clicks or interactivity directly.

Client components, on the other hand, work in the user's browser and handle all the interactive parts of the app, like clicking and typing. They can also be rendered on the server for a fast initial load of the site. This setup helps make websites faster, more secure, and easier for everyone to use, no matter where they are or what device they are using.

#### RSC and NextJS

This deep dive into the evolution of rendering in React is great, but how exactly does it help to understand rendering in NextJS? What is the connection?

The App Router in NextJS is built around the RSC architecture, meaning that all the features and benefits we have discussed are already baked into the lates version of NextJS.

By understanding the evolution of React's rendering, you now have the necessary background for the rest of this section which will focus on NextJS.

#### RSC in NextJS

In this section, we will now try to understand the things we have discussed practically in NextJS.

By default, every component in NextJS app is considered a server component. This includes the root `layout.jsx` and `page.jsx` file. If we create a new component `page.jsx` inside a folder called `about`, we have now created a server component. To prove this, we add a console command to the component.

```js
// about/page.jsx
export default function AboutPage() {
  console.log("About server component");
  return <h1>About Page</h1>;
}
```

If we run the app, we don't see any log message in the browser console. Instead, we see the log in the terminal where we are running the app. So this is a server component. So it has its limitaions. It can't interact directly with browser APIs or handle user interactivity. Attempting to incorporate a client component like `useState` will result in error. On the server, there is no concept of state as it exists in the browser.

We now go on and create another `page.jsx` file inside a folder called `dashboard`. We then use the `'use client'` directive at the beginning of the file. Then we use the `useState` React hook and it works fine.

```jsx
// dashboard/page.jsx
"use client";

import { useState } from "react/cjs/react.production.min";

export default function DashboardPage() {
  const [name, setName] = useState("");
  return (
    <div>
      <h1>Dashboard page</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

The `'use client'` acts as our ticket to cross the boundry from server to client-side and is what allows us to define client components. It signals to NextJS that this component, along with any component it imports, is intended for client-side execution. As a result, the component gains full access to browser APIs and the ability to handle interactivity.

Let's now shift our attention to an important point about client components rendering behavior. Let's add a log statement within the dashboard component.

```jsx
// dashboard/page.jsx
"use client";

import { useState } from "react/cjs/react.production.min";

export default function DashboardPage() {
  console.log("Dashboard client component");
  const [name, setName] = useState("");
  return (
    <div>
      <h1>Dashboard page</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

Now let's add a link to the homepage that leads to dashboard:

```jsx
// app/page.jsx
import Link from "next/link";

export default function Home() {
  return <Link href="/dashboard">Dashboard</Link>;
}
```

Now when we click on the link, we are headed to the dashboard page. We now see the log message in the browser's console. There is no log message in the terminal however. But now if we reload the dashboard route, we will have the message in the browser's console again, and we also see the same message in the terminal. Client components are primarily executed in the client and have access to browser APIs, but they are also pre-rendered once on the server to allow the user to immediately see the page's HTML content rather than a blank screen. It is an optimization strategy that NextJS implements.

##### Summary

In the RSC architecture, and by extension, in the NextJS app router, components are server components by default. To use client components you must use the `'use client'` directive at the beginning of each file. Server components are only rendered on the server, but client components are rendered once on the server and then on the client.

### Rendering lifecycle of server and client components

We are going to learn about the rendering lifecycle of server and client components. In simpler terms, we will explore how they come to life on your screen.

For React Server Components, it is important to consider three elements: Your browser (the client), and on the server-side, NextJS (the framework) and React (the library).

When the browser requests a page, the NextJS app router matches the requested URL to a server component. NextJS then instructs React to render that server component. React renders the server component and any child components, that are also server components, converting them into a special JSON format known as the **RSC payload**.

If we inspect the Network tab when navigating to a route, you will come across this special JSON format which is the RSC payload. During this rendering, if any server component suspends, React pauses rendering of that sub-tree and sends a placeholder value instead. Meanwhile, client components are prepared with instructions for later in the lifecycle.

NextJS uses the RSC payload which includes the client component instructions to generate HTML on the server. This HTML is streamed to the browser to immediately show a fast non-interactive preview of the route. Alongside, NextJS streams the RSC payload as React renders each unit of UI.

In the browser, NextJS processes the streamed React response. React uses the RSC payload and client component instructions to progressively render the UI. Once all the components and the server components output has been loaded, the final UI state is presented to the user. Client components undergo hydration, transformin our app from a static display into an interactive experience. This is the initial loading sequence.

Next, let's take a look at the update sequence for refreshing parts of the app.

The browser requests a refetch of a specific UI such as a full route. NextJS processes the request and matches it to the requested server component. NextJS instructs React to render the component tree. React renders the component similar to the initial loading, but unlike the initial sequence, there is no HTML generation for updates. NextJS progressively streams the response data back to the client. On receiving the streamed response, NextJS triggers a re-render of the route using the new output. React reconciles or merges the new rendered output with the existing components on screen. Since the UI description is a special JSON format and not HTML, React can update the DOM while preserving crucial UI updates such as focus or input values.

This is the essence of the RSC rendering lifecycle with the app router in NextJS.

Diving deeper into rendering, we have 3 server rendering strategies:

1. **Static rendering**
2. **Dynamic rendering**
3. **Streaming**

### Static rendering

In this strategy, we generate HTML pages at the time of building our application. This means all the data and the content for a webpage are prepared in advance. This allows the page to be built once, cached by a CDN and served to the client almost instantly. This optimization enables you to share the result of the rendering work among different users, resulting in a significant performance boost for your application. Static rendering is particularly useful for blog pages, e-commerce product pages, documentation, and marketing pages.

But now the question is that how do we inform NextJS that we want to statically render a particular route in our app? The good news is that static rendering is the default rendering strategy in the app router. This means all routes are automatically prepared at build time without additional setup.

> **Note:** You might be wondering now that we have mentioned that HTML is generated at build time, but there is no build for our application yet. We are running the application in development mode. So how is everything working? Let's understand the distinction between a **production server** and a **dev server**. For production, an optimized build is created once, and you deploy that build. Code changes are not made on the fly, once it is deployed.
>
> A development server, on the other hand, focuses on the developer experience. We should be able to make changes in our code and see those changes immediately reflected in the browser. We can't afford to build our application once, make changes, rebuild, and so on. Therefore, the NextJS team decided that for production builds, a page will be pre-rendered (or statically rendered) once when we run the build command. However, in development mode, a page will be pre-rendered (or statically rendered) for every request. You can see the raw HTML file called, for instance, `localhost` in the browser's Network tab.
>
> You don't have to worry about static rendering in development mode. It is more important to understand how it works when you build your application.

In order to have a better understanding of static rendering, let's use this code as an example in the `AboutPage.jsx` server component.

```jsx
export default function AboutPage() {
  console.log("About server component");
  return <h1>About Page {new Date().toLocaleTimeString()}</h1>;
}
```

Now in the terminal we command:

```bash
npm run build
```

This will create an optimized build of the application. The output folder will be `.next` placed in the root, containing files and folders essential for serving the application to incoming requests from the browser. Inside, there are `server` and `static` folders.

Within the `server` folder we have an `app` folder corresponding to the app router. Important file types in this folder are HTML files. The root page of our document is rendered here inside the `index.html` file. Also, the `_not-found.html` file is rendered statically. We also have here the `about.html` file corresponding to the `/about` route.

Interstingly, there is also a `.dashboard.html` file although the dashboard component is a client component. We previously mentioned that even client components are pre-renderd as an optimization step and this is the reason we see the client component's HTML content here.

Besides HTML files, there are `rsc` payload files for each route. For instance, we have `about.rsc` for the corresponding server component, and `dashboard.rsc` for the corresponding client component.

#### RSC file format

The `rsc` special JSON format generated by React for each route is a compact string representation of the virtual DOM. It includes abreviations, internal refernces, and encoded special meanings.

For a server component, the payload includes the rendered result of the server component, like the `<h1>` tag with the test `"About Page"` which is the JSX from our component.

For a client component however, the payload includes placeholders or instructions where client components should be rendered along with references to their JavaScript files. For instance, the `/dashboard` route which is a client component, contains a reference to the code for the dashboard component. If we search `Dashboard page` in the payload file, we don't find it. However, if we track the link to the JavaScript file, we see the `"h1", {children:"Dashboard page"}` inside the file. This JavaScript file also contains code necessary for reconciliation and hydration.

In order to serve our application from the built `.next` folder, we run this command in the terminal:

```bash
npm run start
```

In the browser, with the Network tab open in the dev tools, click on 'Empty cache and hard reload'. You can see in the preview of the `localhost` file a raw version of the page's HTML. In the response tab you can see the HTML code. Let's now take a look at the `rsc` file for dashboard. This is essential for building the UI on the client-side when we navigate to `/dashboard` using the `<Link>` component on the homepage. You can see that the JavaScript file that is referenced in this file is also downloaded here and is ready for rendering the about page. Now if we click on the dashboard link, we see that the dashboard page is rendered without the need to download any additional resources from the server. The initial load includes everything required fro client-side navigation.

But we must ask, how does NextJS know to download the dashboard component code ahead of time? This is due to a feature known as **prefetching** in NextJS.

##### Prefetching

Prefetching is a technique used to preload a route in the background before the user navigates to it. Routes are automatically prefetched as they become visible in the user's viewport either when the page first loads or as it comes to view through scrolling.

For static routes, the entire route is prefetched and cached by default. Therefore, when we load the homepage, NextJS prefetches the `/about` and `/dashboard` routes (about if you did include a link to it) keeping them ready for instant navigation.

But what about `dashboard.html` in the server folder of the `.next` build output folder? we did not download that. This file is served when you directly navigate to the page in the browser. For instance, if you directly load the URL `localhost:3000/dashboard` you receive the HTML for the dashboard, along with the code shipped to the client for hydration.

Finally, let's observe the time rendered in the about page `about.html` file in the `.next` folder. It is `7:30:36`. This will remain the same regardless of how many times you refresh the page as it was rendered when the application was built. You can see the same in the HTML file.

#### Summary

Static rendering is a strategy where the HTML is generated at build time. Along with the HTML, the RSC payload is created for each component, and JavaScript chunks are produced for client-side component hydration in the browser.

If you navigate directly to a page route, the corresponding HTML file is served. However, if you navigate to the route from a different route, the route is created on the client-side using the RSC payload and JavaScript chunks, without any additional requests to the server.

Static rendering is great for performance, and use cases include blogs, documentation, marketing pages, etc.

### Dynamic rendering

Dynamic rendering is a server rendering strategy where routes are rendered for each user at request time. It is useful when a route has **data that is personalized to the user** or contains **information that can only be known at request time**, such as **cookies** or the **URL's search parameter**. News websites, personalized e-commerce pages, and social media feeds are some examples where dynamic rendering is beneficial.

But now we should ask, how can we use dynamic rendering? How do we inform NextJS that we want to dynamically render a particular route in our application? It turnes out that during rendering, If a dynamic function is discovered, NextJS will automatically switch to dynamically rendering the whole route. In NextJS, dynamic functions are `cookies()`, `headers()`, and `searchParams` which acts more like a prop available for every page. Using any of these will opt the whole route into dynamic rendering at request time.

Let's examin all this in code. We import the `cookies` dynamic function from NextJS, and use it like this:

```jsx
// about/page.jsx
import { cookies } from "next/headers";

export default function AboutPage() {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  console.log(theme);
  return <h1>About Page {new Date().toLocaleTimeString()}</h1>;
}
```

What we do with this dynamic function is not important for now. We just want to prove that NextJS will dynamically render this `/about` route page. So with this code in place, let's now build our application and inspect the output. Try to delete the `.next` folder and run the build command in the terminal again.

```bash
npm run build
```

If you take a look at the build report in the terminal, you will now see that the `/about` route is marked with a lambda symbol. This means that this route is dynamically rendered.

An important thing to keep in mind is that dynamically rendered pages are not statically rendered at build time. This means that if you inspect the `server` folder inside `.next` build folder, you will not find any HTML file for the About page.

Now if we start the application using this command:

```bash
npm run start
```

you will now see in the terminal a log that shows `theme`. You can also see an HTML file in the Network tab of chrome inspector, but we now know that the HTML file is not generated on the server. Since a new page is generated for every request, there is no need to build this page into the build folder.

#### Summary

Dynamic rendering is a strategy where the HTML is generated at request time. NextJS automatically switches to dynamic rendering when it comes across a dynamic function in the component, such as `cookies()`, `headers()`, or the `searchParams` object.

This form of rendering is great for when we need to render HTML personalized to a user, such as a social media feed.

As a developer, you don't need to choose between static and dynamic rendering. NextJS will automatically choose the best rendering strategy for each route based on the features and APIs used.

### Streaming

Streaming is a strategy that allows for progressive UI rendering from the server. Work is divided into chunks and streamed to the client as soon as it is ready. This enables users to see parts of the page immediately, before the entire content has finished rendering.

Streaming significantly improves both the initial page loading performance and the rendering of UI elements that rely on slower data fetches, which would otherwise block the rendering of the entire route.

Streaming is integrated into tht **NextJS app router** by default.

Let's dive into code and see how we can create suspense boundries in our application and rely on streaming for better performance.

```jsx
// product-details/page.jsx
import { Product } from "@/components/product";
import { Reviews } from "@/components/reviews";

export default function ProductDetailPage() {
  return (
    <div>
      <h1>Product detail page</h1>
      <Product />
      <Reviews />
    </div>
  );
}
```

To understand the code better, take a look at what we have written in the `<Product />` and `<Reviews />` component files.

```jsx
// components/product.jsx
export const Product = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <div>Product</div>;
};
```

```jsx
// components/reviews.jsx
export const Reviews = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return <div>Reviews</div>;
};
```

We are intentially delaying the functionality to simulate the time that it takes to fetch data.

With this setup let's now start the server. If we navigate to `/product-detail` route directly from the browser URL bar, we see that the page takes a while to render the `<h1>` tag along with the two components' JSX; `<Product />` and `<Reviews />`. If we refresh the page, we see in the Network tab of the browser that it took 4.05 seconds for the server to respond, indicating that the data for the entire for the page is fetched before sending the response. Now let's enhance this with streaming strategy supported by the app router.

All we need to do is to import the `<Suspense>` component and wrap the slow components with suspense, and let NextJS handle the rest.

```jsx
// product-details/page.jsx
import { Suspense } from "react";

import { Product } from "@/components/product";
import { Reviews } from "@/components/reviews";

export default function ProductDetailPage() {
  return (
    <div>
      <h1>Product detail page</h1>
      <Suspense fallback={<p>Loading product details...</p>}>
        <Product />
      </Suspense>
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Reviews />
      </Suspense>
    </div>
  );
}
```

If we now reload the page, we immediately see The page's heading 'Product detail page' followed by the `<Product />` and `<Reviews />` components. The waiting time for server response has significantly decreased to just 91.2 miliseconds.

As the fallback texts are rendered on the page, the process written for each component is being executed and the HTML is being streamed to the client.

This concludes our discussion on server rendering strategies in NextJS.

### Server and client composition patterns

Server components are perfect for:

- Fetching data
- Directly accessing backend resources
- Protecting sensitive information (like access tokens and API keys) on the server
- Keeping large dependencies server-side, which helps reducing client-side JavaScript

Client components however, are perfect for:

- Adding interactivity
- Handling event listeners (such as `onClick()`, `onChange()`, etc.)
- Managing state and lifecycle effects (using hooks like `useState()`, `useReducer()`, `useEffect()`)
- Using browser-exclusive APIs
- Using custom hooks
- Using React class components

> **Note:** while these usecases might seem straightforward, there is more to understand how to effectively use them.

#### Server component patterns

##### Server-only code

As the first server-component patter, let's talk about the separation of server-only code.

When building NextJS applications, certain code is intended to execute only on the server. For instance, you might have modules or functions that use multiple libraries, use environment variables, interact directly with a database, or process confidential information. Since JavaScript modules can be shared between both server and client components, it is possible for code that is meant only for the server to unintentionally end up in the client. If server-side code gets bundled into the client-side JavaScript, it could lead to a bloated bundle size, expose secret keys, database queries, and sensitive business logic.

It is crucial to separate server-only code from client-side code to protect the application's security and integrity.

To prevent unintended client-side usage of server code, we can use a package called `server-only` to provide a build-time error if developers accidentally import one of these midules into a client component.

Let's check this in an example. First, create two `page.jsx` files, one in a `server-route` directory, and the other in a `client-route` directory.

```jsx
// server-route/page.jsx
export default function ServerRoutePage() {
  return <h1>ServerRoutePage</h1>;
}
```

```jsx
// client-route/page.jsx
"use client";

export default function ClientRoutePage() {
  return <h1>ClientRoutePage</h1>;
}
```

Then create a folder called `utils` in the `app` folder and create a file called `server-utils` inside it. In this file, let's define a function intended solely for server-side use. The logic and content of the code is not important since this is just an example.

```jsx
// utils/server-utils.js
export const serverSideFunction = () => {
  console.log(
    `
    use multiple libraries, use environment variables, interact with a database, process confidential information
    `
  );

  return "server result";
};
```

Now let's import and invoke this `serverSideFunction` in a server component which is in our `page.jsx` file inside the `server-route` folder.

```jsx
// server-route/page.jsx
import { serverSideFunction } from "@/utils/server-utils";

export default function ServerRoutePage() {
  console.log("Server route rendered");
  const result = serverSideFunction();
  return (
    <>
      <h1>ServerRoutePage</h1>
      <p>{result}</p>
    </>
  );
}
```

Now let's head back to the browser. If we navigate to `/server-route` in the URL bar, we don't see the log message in the browser's console, but we do see it in the terminal because the `page.jsx` component inside the `server-route` folder is a server component. Now next include `serverSideFunction` function in our `ClientRoutePage` component.

```jsx
// client-route/page.jsx
"use client";

import { serverSideFunction } from "@/utils/server-utils";

export default function ClientRoutePage() {
  console.log("Client route rendered");
  const result = serverSideFunction();

  return (
    <>
      <h1>ClientRoutePage</h1>
      <p>{result}</p>
    </>
  );
}
```

Back to the browser, let's navigate to `/client-route`. Now we see the log messages in the console. We also see the same logs in the terminal as every client component is also rendered once on the server to generate the initial HTML. However, given the nature of the operations in server-side function it is crucial to ensure that this code executes only on the server. If this code was included in the client-side bundle, it could lead to performance concerns due to a larget bundle size and heavy computations which could degrade the user experience. Additionally, it could pose security risks due to sensitive logic and data exposure and could lead to functional errors as some server-specific logic might not work as intended in browser environment.

To ensure that the `serverSideFunction` remains server-side only, we can use the `server-only` package. In the terminal, run:

```bash
npm install server-only
```

Then we import it in the `serverSideFunction.js` file:

```jsx
// utils/server-utils.js
import "server-only";

export const serverSideFunction = () => {
  console.log(
    `
    use multiple libraries, use environment variables, interact with a database, process confidential information
    `
  );

  return "server result";
};
```

Now if a developer accidentally imports this module into a client-side component, like our `ClientRoutePage` component in this example, you will see that the build process will fail with an alert, preventing potential issues related to exposing server-only code to the client.

###### Summary

Maintaining a clear boundry between server-only and client-side code is crucial, especially when dealing with sensitive operations or data.

Using the `server-only` package, enforces this separation and helps maintain your application security, performance and reliablity.

##### Third-party packages

As the second server component pattern, let's explore the integration of third-party packages.

Since server-components introduce a new paradigm in React, third-party packages in the ecosystem are gradually adapting, beginning to add the `'use client'` directive to components that rely on client-only features, marking a clear distinction in their execution environment. However, many components from NPM packages, which traditionally leverage client-side features, have not yet integrated this directive. The absence of `'use client'` means that while these components will function correctly in client components, they may encounter issues or might not work at all within server components. To address this, you can wrap third-part components that rely on client-only features in your own client components.

Let's understand this concept in code. We will now use the `react-slick` NPM package which exports a React carousel component. This carousel component uses client-side features.

```bash
npm install react-slick click-carousel @types/react-slick
```

Now let's copy a sample code from the library's playground at NPM website. Copy the code sample into the `ClientRoutePage` client component.

```jsx
// client-route/page.jsx
"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ClientRoutePage() {
  const settings = {
    dots: true,
  };
  return (
    <div className="image-slider-container">
      <Slider {...settings}>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
      </Slider>
    </div>
  );
}
```

You can also copy the CSS styles from the playground into your `globals.css` file in your project.

Now in the browser, if you visit `/client-route` you should see a first image. Using the proper styling, you should be able to see the chevrons. Now let's integrate the carousel directly into a server component. We would now copy this code into the `page.jsx` of `server-route` folder.

```jsx
// server-route/page.jsx

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ClientRoutePage() {
  const settings = {
    dots: true,
  };
  return (
    <div className="image-slider-container">
      <Slider {...settings}>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
      </Slider>
    </div>
  );
}
```

Going back to the browser and navigating to `/server-route`, you will now see an error. This is because the slider component is using client-side features but the library code does not have the `'use client'` directive. Once solution is to add the this directive within the `page.jsx` of `/server-route`, but then we cannot use server-only features like database calss, secret environment variables, etc. To resolve this, you must encapsulate third-party components that depend on client-only features within your own client components.

So now in the `components` folder, go on and create a new file called `ImageSlider.jsx`. Copy the same code as before, including the `'use client'` directive at the top, and now inside the `ServerRoutePage` component we can invoke the `ImageSlider.jsx`.

```jsx
// components/ImageSlider.jsx
"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ServerRoutePage() {
  const settings = {
    dots: true,
  };
  return (
    <div className="image-slider-container">
      <Slider {...settings}>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
        <div>
          <img src="http://picsum.photos/400/200" />
        </div>
      </Slider>
    </div>
  );
}
```

```jsx
// server-route/ServerRoutePage.jsx
import { serverSideFunction } from "@/utils/server-utils";
import { ImageSlider } from "@/app/components/ImageSlider";

export default function ServerRoutePage() {
  console.log("Server route rendered");
  const result = serverSideFunction();
  return (
    <>
      <h1>ServerRoutePage</h1>
      <p>{result}</p>
      <ImageSlider />
    </>
  );
}
```

So we still have a server component, but now with one nested element behaving as a client component. Now in the browser, after refreshing the `/server-route`, you see that the carousel is working as expected.

###### Summary

Third-party packages in the React ecosystem are in a transitional phase where numerous components from NPM packages have not yet adopted the `'use client'` directive. Wrapping such components in our own client components allows us to leverage the ecosystem of third-party packages while adhering to the new server components model.

##### Context providers

As the last server component pattern, let's explore working with context providers.

You know from React that context providers are typically rendered near the root of an application to share global application state and logic; for instance, the application theme. However, since React context is not supported in server components, attempting to create a context at the root of your application will result in an error. To address this, you can create a context and render its provider inside a separate client component. Let's dive into code to understand this with an example.

In our NextJS application, the `layout.jsx` is the root file. Here let's create and provide a theme context for our entire application.

```jsx
// layout.jsx
import { createContext } from "react";

const defaultTheme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
  },
};

const ThemeContext = createContext(defaultTheme);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeContext.Provider value={defaultTheme}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </ThemeContext.Provider>
    </html>
  );
}
```

Going back to the browser, we now see an error that says that we can only use the `createContext` function in a client component, while the root layout component is a server component. To resolve this, we could convert `layout.jsx` to a client component, but this will signal NextJS that the whole application is intended to be rendered on client-side, which is not what we want.

To fix the problem in a better way, we need to create our context and render its provider inside a separate client component. So in the `components` folder let's create a file called `theme-provider.jsx`. It is very important to mention the `'use directive'` directive in this file.

```jsx
// components/theme-provider.jsx
"use client";
import { createContext, useContext } from "react";

const defaultTheme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
  },
};

const ThemeContext = createContext(defaultTheme);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// also exporting the context for any consuming component
export const useTheme = () => useContext(ThemeContext);
```

Now back to the `layout.jsx` file we can update the code with the theme provider component.

```jsx
// layout.jsx
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
```

To make sure this works, we can use this theme provider in a client component like `page.jsx` of `/client-route`.

```jsx
// client-route/page.jsx
"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "../components/theme-provider";

export default function ClientRoutePage() {
  const theme = useTheme();
  return (
    <h1
      style={{
        color: theme.colors.primary,
      }}
    >
      Client route
    </h1>
  );
}
```

It is important to note that even though we wrap the rest of the application within the `<ThemeProvider>` client component, server components down the tree will remain server components. We will discuss this with more detail, but this is essentially how you work with context providers and server components. **You don't convert a server component to a client component. Instead, you define a new client component and invoke it within the server component using `children` props.**

#### Client component patterns

##### Client-only code

As the first client component pattern, let's talk about the separation of client-only code.

In an earlier seciton, we dived into the concept of server-only code in NextJS. We are now going to focus on client-only code.

Just as it is important to restrict cetain operations to the server, it is equally important to confine some functionality to the client-side. Client-only code interacts with browser-specific features like the DOM, the window object, local storage, etc which are not available on the server. Ensuring such code is executed only on the client side, prevents errors during server-side rendering.

To prevent unintended server-side usage of client-side code, we can use a package called `client-only`.

Let's dive into code to understand this subject. In the `src` folder of the project, create a file called `client-utils.js`. Let's define a client-only function here.

```jsx
//src/utils/client-utils.js
export const clientSideFunction = () => {
  console.log(
    `use window object,
      use localStorage`
  );
  return "client result";
};
```

Now let's import and use this function in our `ClientRoutePage` component.

```jsx
// app/client-route/page.jsx
"use client";

import { clientSideFunction } from "@/utils/client-utils";

export default function ClientRoutePage() {
  const result = clientSideFunction();
  return <h1>Client route {result}</h1>;
}
```

You should see the log in the browser's console. This confirms that the code is executin client-side. But let's now safe guard our client-only code using the `client-only` package. In the terminal, use this command to install the package:

```bash
npm install client-only
```

Then import the package in the file that we want to be executed only on the client-side. This package will ensure that an error is returned at build time if the code is mistakenly included in the server-side code.

```jsx
//src/utils/client-utils.js
import "client-only";

export const clientSideFunction = () => {
  console.log(
    `use window object,
      use localStorage`
  );
  return "client result";
};
```

Now if we import this `clientSideFunction` in the `page.jsx` file of the `server-route` folder of the project, build process will end up with error since a client-only code will is being executed server-side.

###### Summary

Just as server-only code needs isolation, client-only code must be confined to the client-side to leverage browser specific features effectively.

##### Client component placement

As the second and final client component pattern, let's discuss the placement of client components within the component tree. This aspect plays a crucial role in optimizing the performance of your application.

To compensate for server components not being able to manage state and handle interactivity, you need to create client components. It is recommended to position these client components lower in your component tree. Why? Let's dive into code to find out.

We will now create a new route in our application called `landing-page` with a `page.jsx` in it. Then in the `components` folder, we will create `navbar.jsx`, `nav-search.jsx` and `nav-links.jsx` files.

Let's now visualize these components before we get into code. Imageine a landing page with a navigation bar at the top and a main section below it. It has an outer wrapper which is the `navbar` component itself. within this component, we have the `nav-links` component for various links, and a `nav-search` component that contains a search bar, allowing users to search throughout our site.

This forms a straightforward component tree with the landing page component at the top, the navbar and main component as its children, and the navbar in turn has navlinks and navsearch as its children. We will implement this structure in code within our NextJS application.

Let's now go through the code.

```jsx
// app/landing-page/page.jsx
import { Navbar } from "@/app/components/navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Page heading</h1>
      </main>
    </>
  );
}
```

```jsx
// components/navbar.jsx
import { NavLinks } from "./nav-links";
import { NavSearch } from "./nav-search";

export const Navbar = () => {
  console.log("Navbar rendered");
  return (
    <div>
      <NavLinks />
      <NavSearch />
    </div>
  );
};
```

```jsx
// components/nav-links.jsx
export const NavLinks = () => {
  console.log("NavLinks renderd");
  return <div>List of nav links</div>;
};
```

```jsx
// components/nav-search.jsx
export const NavSearch = () => {
  console.log("NavSeach rendered");
  return <div>Nav search input</div>;
};
```

let's now head to the browser and navigate to `/landing-page`. Taking a look at the browser's console, there is no log becasue all the components are server components by default. But if you check the terminal, you can see the log statements.

At the moment, the search bar doesn't have any state associated with it. Let's introduce a state variable to track the value of the search input.

```jsx
// components/navbar.jsx
"use client";

import { useState } from "react";
import { NavLinks } from "./nav-links";
import { NavSearch } from "./nav-search";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  console.log("Navbar rendered");
  return (
    <div>
      <NavLinks />
      <NavSearch />
    </div>
  );
};
```

Note that we have also added the `'use client'` directive at the top since we are using `useState` in a server component, but we should convert it into a client component. Now we reload the page and see all the logs in the browser's console, not just the `navbar` component logs.

Let's now think about this: if `'use client'` is declared in the `navbar` component, shouldn't that be the only component running client-side? This is a **common misconception**.

When you add `'use-client'` to a component, it not only make that component a client component, but also affects every child component in the component tree below it. In this scenario, `nav-links` and `nav-search` also become client components. You can think of `'use client'` directive as a boundry; once crossed, every subsequent component in the tree operates on the client side.

It is important to understand this concept, especially if you have a large component tree. Imagine converting a server component to a client component to add some interactivity. This change would turn the entire subtree of children into client components, and consequently, all their code will be sent to the browser. Therefore, the recommended practice is to place client components as low as possible in the component tree, ideally making them leaf components.

So in our example, we can now revert the `navbar` component to become a server component again, and instead, conver `nav-search` to a client component.

```jsx
//components/nav-search.jsx
"use client";

import { useState } from "react";

export const NavSearch = () => {
  const [search, setSearch] = useState("");
  console.log("NavSeach rendered");
  return <div>Nav search input</div>;
};
```

Now as we reload the page, we see that only the `nav-search` component's log appears in the browser's console, meaning the this is the only component executing client-side.

### Interleaving server and client

In this last section of Rendering, let's discuss the supported and unsupported patterns of interleaving sever and client components. Let's dive straight into the code.

We begin by creating a new route.

```jsx
//app/interleaving/page.jsx
export default function InterLeavingPage() {
  return <h1>InterLeavingPage</h1>;
}
```

Then we create one server component and one client component:

```jsx
// components/server-component-one.jsx
import fs from "fs";

export const ServerComponentOne = () => {
  fs.readFileSync("src/components/server-component-one.jsx", "utf-8");
  return <h1>Server component one</h1>;
};
```

As you see, we are performing a server specific process in this component. As for the second server component:

```jsx
//components/server-component-two.jsx
import fs from "fs";

export const ServerComponentTwo = () => {
  fs.readFileSync("src/components/server-component-two.jsx", "utf-8");
  return <h1>Server component two</h1>;
};
```

As for the client components we include a client specific operation also:

```jsx
// components/client-component-one.jsx
"use client";

import { useState } from "react";

export const ClientComponentOne = () => {
  const [name, setName] = useState("Batman");
  return <h1>Client component one</h1>;
};
```

```jsx
// components/client-component-two.jsx
"use client";

import { useState } from "react";

export const ClientComponentTwo = () => {
  const [name, setName] = useState("Batman");
  return <h1>Client component two</h1>;
};
```

Our setup is now complete. Let's now discuss the different patterns.

#### Importing server component into another server component

Let's import `server-component-one.jsx` into `page.jsx` of `/interleaving` route.

```jsx
// interleaving/page.jsx
import { ServerComponentOne } from "../components/server-component-one";

export default function InterLeavingPage() {
  return (
    <>
      <h1>InterLeavingPage</h1>
      <ServerComponentOne />
    </>
  );
}
```

And inside `server-component-one.jsx` let's import `server-component-two.jsx`.

```jsx
// components/server-component-one.jsx
import fs from "fs";
import { ServerComponentTwo } from "./server-component-two";

export const ServerComponentOne = () => {
  fs.readFileSync("src/components/server-component-one.jsx", "utf-8");
  return (
    <>
      <h1>Server component one</h1>
      <ServerComponentTwo />
    </>
  );
};
```

Now heading back to the browser, if you navigate to the `/interleaving` route, you see the route works without any issues.

#### Importing client component into another client component

Let's now import `client-component-one.jsx` into the `page.jsx` of the route `/interleaving`. Then within `clinet-component-one.jsx` we will import `client-component-two.jsx`.

```jsx
// app/interleaving/page.jsx
import { ClientComponentOne } from "../components/client-component-one";

export default function InterLeavingPage() {
  return (
    <>
      <h1>InterLeavingPage</h1>
      <ClientComponentOne />
    </>
  );
}
```

```jsx
// components/client-component-one.jsx
"use client";

import { useState } from "react";
import { ClientComponentTwo } from "./client-component-two";

export const ClientComponentOne = () => {
  const [name, setName] = useState("Batman");
  return (
    <>
      <h1>Client component one</h1>
      <ClientComponentTwo />
    </>
  );
};
```

Go to browser, and you should see the route working properly.

#### Importing a client component inside a server component

In `page.jsx` of the route `/interleaving` let's import `server-component-one.jsx`. Then within `server-component-one.jsx` let's import `client-component-one.jsx`.

```jsx
// app/interleaving/page.jsx
import { ServerComponentOne } from "../components/server-component-one";

export default function InterLeavingPage() {
  return (
    <>
      <h1>InterLeavingPage</h1>
      <ServerComponentOne />
    </>
  );
}
```

```jsx
// components/server-component-one.jsx
import fs from "fs";
import { ClientComponentOne } from "./client-component-one";

export const ServerComponentOne = () => {
  fs.readFileSync("src/components/server-component-one.jsx", "utf-8");
  return (
    <>
      <h1>Server component one</h1>
      <ClientComponentOne />
    </>
  );
};
```

Looking at the browser again, the route works perfectly without any issues.

#### Importing a server component into a client component

Let's now import `client-component-one.jsx` into `page.jsx` of `/interleaving`.

```jsx
// app/interleaving/page.jsx
import { ClientComponentOne } from "../components/client-component-one";

export default function InterLeavingPage() {
  return (
    <>
      <h1>InterLeavingPage</h1>
      <ClientComponentOne />
    </>
  );
}
```

Now within `client-component-one.jsx` import `server-component-one.jsx`.

```jsx
// components/client-component-one.jsx
"use client";

import { useState } from "react";
import { ServerComponentOne } from "./server-component-one";

export const ClientComponentOne = () => {
  const [name, setName] = useState("Batman");
  return (
    <>
      <h1>Client component one</h1>
      <ServerComponentOne />
    </>
  );
};
```

Now in the browser, we have an error. The error says that the `fs` module cannot be resolved. This is because `server-component-one.jsx` is imported into a client component and therefore is converted into a client component and executed client-side. But the `fs` module inside `server-component-one.jsx` cannot be executed client-side. It is a server-side feature, and on the client side, there is no `fs` module.

So this pattern is not supported in NextJS. However, there is a workaround.

Instead of nesting server component inside client component, you can pass it as a **prop** to the client component. A common pattern is to use React `children` prop to create a slot in your client component.

So let's remove the import of `server-component-one.jsx` from `client-component-one.jsx`, and instead, in `page.jsx` of the route `interleaving` let's, place `server-component-one.jsx` between the openning and closing tags of `client-component-one`.

```jsx
// app/interleaving/page.jsx
import { ClientComponentOne } from "../components/client-component-one";
import { ServerComponentOne } from "../components/server-component-one";

export default function InterLeavingPage() {
  return (
    <>
      <h1>InterLeavingPage</h1>
      <ClientComponentOne>
        <ServerComponentOne />
      </ClientComponentOne>
    </>
  );
}
```

And we also make `client-component-one.jsx` ready to receive a `children` prop.

```jsx
// components/client-component-one.jsx
"use client";

import { useState } from "react";

export const ClientComponentOne = ({ children }) => {
  const [name, setName] = useState("Batman");
  return (
    <>
      <h1>Client component one</h1>
      {children}
    </>
  );
};
```

Now heading back to the browser, the route is working fine again.
