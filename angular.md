# Quick Tutorial

## Component fundamentals

Components are the foundational building blocks for any Angular application. Each component has three parts:

- TypeScript class
- HTML template
- CSS styles

The simplest Angular component could be like this:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` Hello `,
  styles: `
    :host {
      color: blue;
    }
  `,
})
export class App {}
```

In Angular, the component's properties, logic and behavior are defined in the component's TypeScript class, and they are accessible in the component's template through interpolation.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` Hello {{ city }}`,
})
export class App {
  city = "Mashhad";
}
```

The interpolation syntax opens a window not only to any JavaScript expression, but also some Angular-specific computations.

Also, a component, as mentioned in its decorator, has a `selector` which determines how the component can be referenced and used in other places of your app.

Look at this example. You two componenets: `User` and `App` and you want to use the `User` component inside the `App` component:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-user",
  template: ` Username: {{ username }} `,
})
export class User {
  username = "youngTech";
}

@Component({
  selector: "app-root",
  template: `<section><app-user /></section>`,
  imports: [User],
})
export class App {}
```

### Control flows

#### `@if` and `@else`

You can decide what to display in a component's template by using Angular conditional template syntax.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    @if (isServerRunning) {
      <span>Yes, the server is running</span>
    } @else {
      <span>No, the server is not running</span>
    }
  `,
})
export class App {
  isServerRunning = true;
}
```

#### `@for`

When you need to diplay a list of items in the component's template, you can use the `@for` template syntax:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `@for (user of users; track user.id) {
    <p>{{ user.name }}</p>
  }`,
})
export class App {
  users = [
    { id: 0, name: "Sarah" },
    { id: 1, name: "Amy" },
    { id: 2, name: "Rachel" },
    { id: 3, name: "Jessica" },
    { id: 4, name: "Poornima" },
  ];
}
```

### Property bindings

Property binding in Angular enables you to set values for properties of HTML elements, Angular components and more.

Use property binding to dynamically set values for properties and attributes. You can do things such as:

- toggle button features
- set image paths programmatically
- share values between components.

To bind to an element's attribute, wrap the attribute name in square brackets `[attribute-name]`.

```html
<img alt="photo" [src]="imageURL" />
```

In this example, the value of the `src` attribute will be bound to the class property `imageURL`. Whatever value `imageURL` has will be set as the `src` attribute of the `img` tag.

Take this example:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  styleUrls: ["app.css"],
  template: ` <div [contentEditable]="isEditable"></div> `,
})
export class App {
  isEditable = true;
}
```

### Event handling

In Angular you bind to events with the parentheses syntax `()`. On a given element, wrap the event you want to bind to with parentheses and set an event handler.

Take this example:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <section (mouseover)="showSecretMessage()">
      There's a secret message for you, hover to reveal 👀
      {{ message }}
    </section>
  `,
})
export class App {
  message = "";

  showSecretMessage() {
    this.message = "Way to go...";
  }
}
```

### Input properties

Just like in React where a component can receive some data as `props`, in Angular you can set `input` properties for a component.

To create an input property, use the `input()` function to initialize the property of the component class.

The input function returns an `InputSignal`. You can read the value of a input property by calling the **signal**.

Take this example. The `User` component receives an input property called `name`:

```ts
import { Component, input } from "@angular/core";

@Component({
  selector: "app-user",
  template: ` <p>The user's name is {{ name() }}</p> `,
})
export class User {
  name = input<string>();
}
```

We then use this component in the `App` component and provide a value for the `name` input property of the `User`:

```ts
import { Component } from "@angular/core";
import { User } from "./user";

@Component({
  selector: "app-root",
  template: ` <app-user name="Omid" /> `,
  imports: [User],
})
export class App {}
```

> This is only one direction of the component communication. Unlike React, where data can only be communicated from a parent component to a child component, in Angular you can send information and data to a parent component from a child component using component `output` properties.

### Output properties

In some situations, you need to send some data from a child component to a parent component. For example:

- A button has been clicked
- An item has been added/removed from a list
- Some other important update has occurred

Angular uses the `output()` function to enable this type of behavior. Use the `output()` function to initialize the component's class property. When this is done, the component can generate **events** that can be listened to by the parent component. Inside this component, the event can be triggered using the `emit` method. The emit function will generate an event with the same type as defined by the `output`.

Take this example. We have a `child.ts` component:

```ts
import { Component, output } from "@angular/core";

@Component({
  selector: "app-child",
  styles: `
    .btn {
      padding: 5px;
    }
  `,
  template: ` <button class="btn" (click)="addItem()">Add Item</button> `,
})
export class Child {
  addItemEvent = output<string>();

  addItem() {
    this.addItemEvent.emit("🐢");
  }
}
```

Notice that we have defined the `addItemEvent` output property. The `output()` function returns an event object on which the `emit` method can be called to trigger the corresponding event. This event can be detected and listened to by the parent component, just like a native event handler in Angular, so by using the `()` syntax around the `addItemEvent` property name.

The parent component in this example is `app.ts`:

```ts
import { Component } from "@angular/core";
import { Child } from "./child";

@Component({
  selector: "app-root",
  template: `
    <app-child (addItemEvent)="addItem($event)" />
    <p>🐢 all the way down {{ items.length }}</p>
  `,
  imports: [Child],
})
export class App {
  items = new Array();

  addItem(item: string) {
    this.items.push(item);
  }
}
```

Notice the value coming with the event is accessible using the `$event` syntax. This value is the exact same value passed into the `emit` method inside the child component.

## Deferable views

Sometimes in app development, you end up with a lot of components that you need to reference in your app, but some of those don't need to be loaded right away for various reasons.

Take this component as an example, and imagine the `article` element contains a long blog post so that the `comments` component is actually not visible in the screen when the `App` is first mounted on screen.

```ts
import { Component } from "@angular/core";
import { Comments } from "./comments";

@Component({
  selector: "app-root",
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      <article></article>
      <comments />
    </div>
  `,
  imports: [Comments],
})
export class App {}
```

To defer load the `comments` component:

```ts
import { Component } from "@angular/core";
import { Comments } from "./comments";

@Component({
  selector: "app-root",
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      <article></article>

      @defer (on viewport) {
        <comments />
      } @placeholder {
        <p>Future comments</p>
      } @loading (minimum 2s) {
        <p>Loading comments...</p>
      }
    </div>
  `,
  imports: [Comments],
})
export class App {}
```

Notice that both `@placeholder` and `@loading` sections have optional parameters to prevent flickering from occuring when loading happens quickly.

- `@placeholder` has `minimum`
- `@loading` has `minimum` and `after`

Also notice that we have used a `viewport` trigger to the `@defer` block. Check the Angular documentation for more on deferable views.

## Optimizing images

Optimizing images is a rather complicated thing to do, but Angular has done most of the difficult parts of it for you. To use Angular's image optimization, you need to import `NgOptimizedImage` directive from `@angular/common`.

```ts
import { NgOptimizedImage } from "@angular/common";
```

You then need to add it to the `imports` list of a component's decorator to be able to use it in the component.

```ts
@Component({
  imports: [NgOptimizedImage],
  // ...
})
```

Then to use this on an image, inside the `img` tag, you should use `ngSrc` attribute instead of `src`:

```ts
import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-user",
  template: `
    <p>Username: {{ username }}</p>
    <p>Preferred Framework:</p>
    <ul>
      <li>
        Static Image:
        <img ngSrc="/logo.svg" alt="Angular logo" width="32" height="32" />
      </li>
      <li>
        Dynamic Image:
        <img [ngSrc]="logoUrl" [alt]="logoAlt" width="32" height="32" />
      </li>
    </ul>
  `,
  imports: [NgOptimizedImage],
})
export class User {
  logoUrl = "/logo.svg";
  logoAlt = "Angular logo";
  username = "youngTech";
}
```

So you don't actually use the `NgOptimizedImage` as a component or so. `ngSrc` automatically uses the `NgOptimizedImage` behind the scenes.

### With or without `width` and `height`

Notice that when using `NgOptimizedImage`, your images need to have both `width` and `height` attributes in order to prevent layout shift.

But sometimes, you don't want to specify a static `height` and `width` for the image. In this situation, you can use the `fill` attribute to tell the image to act like a **background image**, filling its containing element. Remember that for this `fill` image to render propertly, its parent element must be styled with `position: "relative"`, `position: "fixed"`, or `position: "absolute"`.

### Prioritize images

One of the most important optimizations for loading performance is to prioritize any image which might be the "LCP element", which is the largest on-screen graphical element when the page loads. To optimize your loading times, make sure to add the `priority` attribute to your "hero image" or any other images that you think could be an LCP element.

```html
<img ngSrc="www.example.com/image.png" height="600" width="800" priority />
```

## Routing

Enabling routing in your Angular application requires you to create a `app.routes.ts` file and import `Routes` from `@angular/router` package and:

```ts
import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { User } from "./user/user";

export const routes: Routes = [
  {
    path: "",
    title: "App Home Page",
    component: Home,
  },
  {
    path: "user",
    title: "App User Page",
    component: User,
  },
];
```

Now inside the `app.config.ts` file:

```ts
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

Then to determine where the content of each route should be displayed, go to your `App` component and import `RouterOutlet` and `RouterLink` and use them in the template:

```ts
import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";

@Component({
  selector: "app-root",
  template: `
    <nav>
      <a routerLink="/">Home</a>
      |
      <a routerLink="/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet, RouterLink],
})
export class App {}
```

We use `routerLink` attribute instead of HTML native `href` attribute of the `<a>` tag to prevent page refresh when app navigation is happening.

> Notice that `RouterOutlet` and `RouterLink` need to be mentioned in the `imports` list of the component. It seems that anything that is going to be somehow used inside the componet's template, needs to be listed in the component's `imports`.

## Forms

In Angular, there are 2 types of forms:

1. Template-driven forms
2. Reactive forms

## Template-driven forms

For a template-driven form to use Angular features that enable **data binding** to forms, you'll need to import the `FormsModule` from `@angular/forms` package.

Then, to use this module, list it in the component's `imports` array and implement data binding with the `ngModel` attribute of your input fields. Take this example:

```ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-user",
  template: `
    <p>Username: {{ username }}</p>
    <p>{{ username }}'s favorite framework: {{ favoriteFramework }}</p>
    <label for="framework"
      >Favorite Framework:
      <input [(ngModel)]="favoriteFramework" id="framework" type="text" />
    </label>
  `,
  imports: [FormsModule],
})
export class User {
  username = "youngTech";
  favoriteFramework = "";
}
```

Notice that `[()]` syntax is known as "banana in a box" and it represents two-way data binding: **property binding** and **event binding**.

## Reactive forms

When you want to manage your forms programmatically instead of relying purely on the template, reactive forms are the answer.

In reactive forms, the "form control" concept refers to "form input". Reactive forms use the `FormControl` class to represent the form controls (inputs). Angular provides the `FormGroup` class to serve as a **grouping of form controls** into a helpful **object** that makes handling large forms more convenient for developers.

To use reactive forms, import the `ReactiveForms` module from `@angular/forms` package. You also need to import `FormControl` and `FormGroup` from `@angular/forms` package.

You should then use these imports as:

```ts
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  template: `
    <h2>Profile Form</h2>
    <p>Name: {{ profileForm.value.name }}</p>
    <p>Email: {{ profileForm.value.email }}</p>
    <form [formGroup]="profileForm">
      <label>
        Name
        <input type="text" formControlName="name" />
      </label>
      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class App {
  profileForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
  });
}
```

Notice that each `FormGroup` should be attached to a form using `[formGroup]` directive. In addition, each `FormControl` can be attached to the corresponding input field using the `formControlName` attribute.

You can always access the current form values using the `value` property on the `FormGroup` instance, which in this example, is `profileForm`, for instance `profileForm.value.name`.

Now that you have access to the form values, you can handle the submission event of the form. You can listen to the `ngSubmit` event on the form element:

```ts
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  template: `
    <h2>Profile Form</h2>
    <p>Name: {{ profileForm.value.name }}</p>
    <p>Email: {{ profileForm.value.email }}</p>
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label>
        Name
        <input type="text" formControlName="name" />
      </label>
      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class App {
  profileForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
  });

  handleSubmit() {
    alert(this.profileForm.value.name + " | " + this.profileForm.value.email);
  }
}
```

### Validating forms

To use Angular's built-in validators, you can import `Validators` from `@angular/forms`.

Every `FormControl` can be passed the `Validators` you want to use for validating the `FormControl` values. For instance:

```ts
import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  template: `
    <form [formGroup]="profileForm">
      <input type="text" formControlName="name" name="name" />
      <input type="email" formControlName="email" name="email" />
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class App {
  profileForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });
}
```

So what you pass to a `FormControl` as validator, can either be a single validator or an array of validators. Notice that you can always inspect the `FormGroup`'s `valid` status; for example, `profileForm.valid`

## Injectable services

A dependency that can be injected into a component, can be service or some other resources. Fo a dependency class to be eligible to be injected by the DI system, use the `@Service` decorator. Marking a class with this decorator notifies the DI system that it can be accessed anywhere in your application.

> By default, Angular provides the service across your entire application, so you don't need to write any extra configuration.

```ts
import { Service } from "@angular/core";

@Service()
export class CarService {
  cars = ["Sunflower GT", "Flexus Sport", "Sprout Mach One"];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
```

Now to inject this service into a component, you initialize a component class property with the `inject()` function and the the `CarService`.

```ts
import { Component, inject } from "@angular/core";
import { CarService } from "./car.service";

@Component({
  selector: "app-root",
  template: `<p>Car listing: {{ display }}</p>`,
})
export class App {
  carService = inject(CarService);
  display = this.carService.getCars().join("*");
}
```

## Pipes

Pipes are functions that are used to transform data in templates. Pipes are pure functions and don't cause side effects. There are some built-in pipes in Angular and you can also create your own pipes.

> Remember: since pipes are used in the component's template, they should be listed in the component's `imports` list.

```ts
import { Component } from "@angular/core";
import { LowerCasePipe } from "@angular/common";

@Component({
  selector: "app-root",
  template: ` {{ username | lowercase }} `,
  imports: [LowerCasePipe],
})
export class App {
  username = "yOunGTECh";
}
```

> Notice that we imported `LowerCasePipe` into the component `imports` list, but we used `lowercase` as the actual pipe name in the component template.

### Pipe parameters

Since pipes are actual functions, they can also receive parameters to customize their functionality. To pass a parameter to a pipe, use the `:` syntax followed by the parameter value. Take this example where we are going to use `DecimalPipe`:

```ts
import { Component } from "@angular/core";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: "app-root",
  template: `
    <ul>
      <li>Number with "decimal" {{ num | number: "3.2-2" }}</li>
    </ul>
  `,
  imports: [DecimalPipe],
})
export class App {
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}
```

The `DecimalPipe` parameter is called `digitsInfo` and it uses the format: `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`

Let's now take another example where we are going to use `DatePipe` to format date and `CurrencyPipe` to format currency:

```ts
import { Component } from "@angular/core";
import { DatePipe, CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-root",
  template: `
    <ul>
      <li>Date with "date" {{ birthday | date: "medium" }}</li>
    </ul>
  `,
  imports: [DatePipe, CurrencyPipe],
})
export class App {
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}
```

### Creating a pipe

A pipe is a TypeScript class with `@Pipe` decorator:

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse",
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    let reverse = "";

    for (let i = value.length - 1; i >= 0; i--) {
      reverse += value[i];
    }

    return reverse;
  }
}
```

Notice that:

- the `name` in the `@Pipe` decorator configuration is what will be used in the template to call the pipe
- the `transform` function is where you put your logic

Then to use this pipe:

```ts
import { Component } from "@angular/core";
import { ReversePipe } from "./reverse.pipe";

@Component({
  selector: "app-root",
  template: ` Reverse Machine: {{ word | reverse }} `,
  imports: [ReversePipe],
})
export class App {
  word = "You are a champion";
}
```

# Angular signals

Signals are Angular's reactive primitive that provide a way to manage state and automatically update your UI when that state changes.

You should basically know:

1. How to create a signal using the `signal()` function
2. Display the signal value in templates
3. Update the signal value using `set()` and `update()` methods

```ts
import { Component, signal } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="user-profile">
      <h1>User Dashboard</h1>
      <div class="status-indicator" [class]="userStatus()">
        <span class="status-dot"></span>
        Status: {{ userStatus() }}
      </div>

      <div class="status-controls">
        <button>Go Online</button>
        <button>Go Offline</button>
        <button class="toggle-btn">Toggle Status</button>
      </div>
    </div>
  `,
  styleUrl: "./app.css",
})
export class App {
  userStatus = signal<"online" | "offline">("offline");
}
```

Notice:

1. To create a signal you should call `signal()` and initialize it with an initial value
2. To read the signal value you should call the variable that holds the signal `userStatus()`
3. To update the signal you should use the `update()` function which receives a callback that has access to the `current` value of the signal. You can also use the `set()` method to update the signal value.

## Computed signals

Computed signals are derived values that automatically update when their dependencies change. They're perfect for creating reactive calculations based on other signals.

```ts
import { Component, signal, computed } from "@angular/core";

export class App {
  userStatus = signal<"online" | "away" | "offline">("offline");

  notificationsEnabled = computed(() => this.userStatus() === "online");
}
```

> Notice that the `computed()` function receives a callback that should return the value for the computed signal.

This is another example of how you could use a computed signal with complex logic and calculation:

```ts
statusMessage = computed(() => {
  const status = this.userStatus();

  switch (status) {
    case "online":
      return "Available for meetings and messages";
    case "away":
      return "Temporarily away, will respond soon";
    case "offline":
      return "Not available, check back later";
    default:
      return "Status unknown";
  }
});
```

To retrieve the value of a computed signal, you should call the computed signal variable, just like a regular signal:

```ts
@if(notificationsEnabled()) {
    Enabled
  } @else {
    Disabled
  }
```

Remember:

- Computed signals are reactive: They automatically update when their dependencies change
- They're read-only: You can't directly set computed values, they're derived from other signals
- They can contain complex logic: Use them for calculations, transformations, and derived state
- They provide a way to make performant computations based on dynamic state: Angular only recalculates them when their dependencies actually change (automatic `useMemo`!)

## Linked signals

Take this scenario as example: You create a computed signal called `notificationsEnabled` that automatically follows the user's `userStatus` signal. But what if the user wants to manually disable notifications even when they're online? This is where **linked signals** come in.

Linked signals are writable signals that maintain a reactive connection to their source signals. They're perfect for creating state that normally follows a computation, but can be overridden when needed.

So you import `linkedSignals`, declare a linked signal with it, and then you have access to the `.set()` method on the linked signal to override its value anywhere you need.

```ts
import { Component, computed, signal, linkedSignal } from "@angular/core";

export class App {
  userStatus = signal<"online" | "away" | "offline">("offline");

  notificationsEnabled = linkedSignal(() => this.userStatus() === "online");

  statusMessage = computed(() => {
    const status = this.userStatus();
    switch (status) {
      case "online":
        return "Available for meetings and messages";
      case "away":
        return "Temporarily away, will respond soon";
      case "offline":
        return "Not available, check back later";
      default:
        return "Status unknown";
    }
  });

  isWithinWorkingHours = computed(() => {
    const now = new Date();
    const hour = now.getHours();
    const isWeekday = now.getDay() > 0 && now.getDay() < 6;
    return (
      isWeekday && hour >= 9 && hour < 17 && this.userStatus() !== "offline"
    );
  });

  toggleNotifications() {
    this.notificationsEnabled.set(!this.notificationsEnabled());
  }

  goOnline() {
    this.userStatus.set("online");
  }

  goAway() {
    this.userStatus.set("away");
  }

  goOffline() {
    this.userStatus.set("offline");
  }

  toggleStatus() {
    const current = this.userStatus();
    switch (current) {
      case "offline":
        this.userStatus.set("online");
        break;
      case "online":
        this.userStatus.set("away");
        break;
      case "away":
        this.userStatus.set("offline");
        break;
    }
  }
}
```

> The key difference: computed signals are read-only, but linked signals can be updated manually while still maintaining their reactive connection.

## Async data, the resources API and signals

The Resource API provides a powerful way to manage async operations using signals, with built-in loading states, error handling, and request management.

Let's learn how to use the `resource()` function to load data asynchronously and how to handle different states of async operations by building a user profile loader that demonstrates the Resource API in action.

```ts
// TODO: Add the resource import from @angular/core
import { Component, resource, signal, computed } from "@angular/core";
import { getUserData } from "./user-api";

@Component({
  selector: "app-root",
  template: `
    <div>
      <h2>User Profile Loader</h2>

      <div>
        <button (click)="loadUser(1)">Load User 1</button>
        <button (click)="loadUser(2)">Load User 2</button>
        <button (click)="loadUser(999)">Load Invalid User</button>

        <button (click)="reloadUser()">Reload</button>
      </div>

      <div class="status">
        @if (isLoading()) {
          <p>Loading user...</p>
        } @else if (hasError()) {
          <p class="error">Error: {{ userResource.error()?.message }}</p>
        } @else if (userResource.hasValue()) {
          <div>
            <h3>{{ userResource.value().name }}</h3>
            <p>{{ userResource.value().email }}</p>
          </div>
        }
        <!-- Use isLoading(), hasError(), and userResource.hasValue() -->
        <!-- For loading: show "Loading user..." -->
        <!-- For error: show error message with userResource.error()?.message -->
        <!-- For success: show user name and email from userResource.value() -->
        <p>Click a button to load user data</p>
      </div>
    </div>
  `,
  styleUrl: "./app.css",
})
export class App {
  userId = signal(1);

  userResource = resource({
    params: () => ({ id: this.userId() }),
    loader: (params) => getUserData(params.params.id),
  });

  isLoading = computed(() => this.userResource.status() === "loading");

  hasError = computed(() => this.userResource.status() === "error");

  loadUser(id: number) {
    this.userId.set(id);
  }

  reloadUser() {
    this.userResource.reload();
  }
}
```

Changing the `params` signal automatically triggers a reload, or you can manually reload with `reload()`. So notice that the `params` parameter is a signal itself.

The Resources API provide a `status()` signal that can be `loading`, `resolved`, or `error`, and a `value()` signal for the loaded data, and a `hasValue()` method that safely checks if data is available.

The resource provides different methods to check its state:

- `isLoading()` - true when fetching data
- `hasError()` - true when an error occurred
- `userResource.hasValue()` - true when data is available
- `userResource.value()` - access the loaded data
- `userResource.error()` - access error information

## Input signals

The Angular's signal-based `input()` API is used for passing data from parent to child components. If you're familiar with component props from other frameworks, inputs are the same idea.

Take this example. In the `App` component below, we are going to use a `ProductCard` component which is written as:

```ts
// product-card.ts
import { Component, input } from "@angular/core";

@Component({
  selector: "product-card",
  template: `
    <div class="product-card">
      <h3>{{ name() }}</h3>
      <p class="price">\${{ price() }}</p>
      <p class="status">
        Status:
        @if (available()) {
          Available
        } @else {
          Out of stock
        }
      </p>
    </div>
  `,
})
export class ProductCard {
  name = input.required<string>(); // required
  price = input.required<number>();
  available = input<boolean>(true); // optional
}
```

Then in the parent `App` component you can use it as:

```ts
// app.ts
import { Component, signal } from "@angular/core";
import { ProductCard } from "./product-card";

@Component({
  selector: "app-root",
  imports: [ProductCard],
  template: `
    <div class="shopping-app">
      <h1>Input Signals Demo</h1>

      <div class="demo-section">
        <h2>Signal Inputs (Parent → Child)</h2>
        <p>Data flows down from parent to child via signal inputs:</p>

        <product-card
          [name]="productName()"
          [price]="productPrice()"
          [available]="productAvailable()"
        />

        <div class="controls">
          <button (click)="updateProduct()">Update product information</button>
          <button (click)="toggleAvailability()">Toggle avilable</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: "./app.css",
})
export class App {
  productName = signal<string>("");
  productPrice = signal<number>(0);
  productAvailable = signal<boolean>(false);

  updateProduct() {
    this.productName.set("Updated Product");
    this.productPrice.set(149);
  }

  toggleAvailability() {
    this.productAvailable.set(!this.productAvailable());
  }
}
```

Notice how data is being passed to the `product-card` component using `[]` data binding syntax. Compare this with the case of using `[]` around a native HTML attribute (for example, `[src]` on an `image` element).

Notice that:

- **Signal inputs** - Use input() and input.required() to receive data from parent components
- **Reactive updates** - Child components automatically update when parent signal values change
- **Type safety** - Signal inputs provide full TypeScript type checking
- **Default values** - Optional inputs can have default values while required inputs must be provided

> Signal inputs make component communication more reactive and eliminate the need for `OnChanges` lifecycle hooks in many cases.

## Model signals

Input signals provide one-way data binding, meaning that you can pass data to child components with input signals, but you cannot send data back from child components to parent components.

The `model()` API provides two-way data binding. Model signals are perfect for UI components like checkboxes, sliders, or custom form controls where the component needs to both receive a value AND update it.

```ts
// custom-checkbox.ts
import { Component, model, input } from "@angular/core";

@Component({
  selector: "custom-checkbox",
  template: `
    <label class="custom-checkbox">
      <input type="checkbox" [checked]="checked()" (change)="toggle()" />
      <span class="checkmark"></span>
      {{ label() }}
    </label>
  `,
})
export class CustomCheckbox {
  checked = model.required<boolean>();
  label = input<string>("");

  toggle() {
    this.checked.set(!this.checked());
  }
}
```

When this child component `custom-checkbox.ts` calls `this.checked.set()`, it automatically propagates the change back to the parent. This is the key difference from `input()` signals.

Now to setup two-way binding in the parent component:

```ts
// app.ts
import { Component, model } from "@angular/core";
import { CustomCheckbox } from "./custom-checkbox";

@Component({
  selector: "app-root",
  imports: [CustomCheckbox],
  template: `
    <div class="shopping-app">
      <h1>Custom Checkbox Example</h1>

      <div class="demo-section">
        <custom-checkbox
          [(checked)]="agreedToTerms"
          label="I agree to the terms"
        />

        <custom-checkbox
          [(checked)]="enableNotifications"
          label="Enable notifications"
        />

        <div class="controls">
          <p>
            Terms agreed:
            @if (agreedToTerms()) {
              Yes
            } @else {
              No
            }
          </p>
          <p>
            Notifications:
            @if (enableNotifications()) {
              Yes
            } @else {
              No
            }
          </p>
          <button (click)="toggleTermsFromParent()">
            Toggle Terms from Parent
          </button>
          <button (click)="resetAll()">Reset All</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: "./app.css",
})
export class App {
  agreedToTerms = model(false);
  enableNotifications = model(true);

  toggleTermsFromParent() {
    this.agreedToTerms.set(!this.agreedToTerms());
  }

  resetAll() {
    this.agreedToTerms.set(false);
    this.enableNotifications.set(false);
  }
}
```

The `[(checked)]` syntax creates two-way binding - data flows down to the component AND changes flow back up to the parent by emitting an event that references the signal itself and does not call the signal getter directly.

Notice:

**Model signals** - Use `model()` and `model.required()` for values that can be both read and written
**Two-way binding** - Use `[(property)]` syntax to bind parent signals to child models
**Perfect for UI components** - Checkboxes, form controls, and widgets that need to manage their own state
**Automatic synchronization** - Parent and child stay in sync without manual event handling

### When to use `model()` vs `input()`

Use `input()` for data that only flows down (display data, configuration)

Use `model()` for UI components that need to update their own value (form controls, toggles)

## Services

Services are perfect for **sharing reactive state across multiple components**, and signals make this even more powerful by providing automatic change detection and clean reactive patterns (sounds like `zustand` in React!).

```ts
// cart-store.ts
import { Service, signal, computed } from "@angular/core";
import { CartItem } from "./cart-types";

@Service()
export class CartStore {
  private items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();

  readonly totalQuantity = computed(() => {
    return this.items().reduce((sum, item) => sum + item.quantity, 0);
  });

  readonly totalPrice = computed(() => {
    return this.items().reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  });

  addItem(id: string, name: string, price: number) {
    this.items.update((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...currentItems, { id, name, price, quantity: 1 }];
      }
    });
  }

  removeItem(id: string) {
    this.items.update((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }

    this.items.update((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  }

  clearCart() {
    this.items.set([]);
  }
}
```

Notice that these signals allow components to reactively access cart data and computed totals. The `asReadonly()` method prevents external code from modifying the cart items directly, while `computed()` creates derived state that automatically updates when the source signal changes.

Now to use this service in another component like:

```ts
// cart-display.ts
import { Component, inject } from "@angular/core";
import { CartStore } from "./cart-store";

@Component({
  selector: "cart-display",
  template: `
    <div class="cart-display">
      <h2>Shopping Cart Demo</h2>

      <div class="add-products">
        <h3>Add Products</h3>
        <button (click)="addLaptop()">Add Laptop ($999)</button>
        <button (click)="addMouse()">Add Mouse ($25)</button>
        <button (click)="addKeyboard()">Add Keyboard ($79)</button>
      </div>

      <h3>Cart Contents</h3>
      @if (cartStore.cartItems().length === 0) {
        <p class="empty-message">Your cart is empty</p>
      } @else {
        <div class="cart-items">
          @for (item of cartStore.cartItems(); track item.id) {
            <div class="cart-item">
              <div class="item-info">
                <h4>{{ item.name }}</h4>
                <p class="price">\${{ item.price }} each</p>
              </div>

              <div class="quantity-controls">
                <button (click)="decreaseQuantity(item.id)">-</button>
                <span class="quantity">{{ item.quantity }}</span>
                <button (click)="increaseQuantity(item.id)">+</button>
                <button (click)="removeItem(item.id)" class="remove">×</button>
              </div>
            </div>
          }
        </div>

        <div class="cart-summary">
          <p>Total Items: {{ cartStore.totalQuantity() }}</p>
          <p class="total-price">Total: \${{ cartStore.totalPrice() }}</p>
          <button (click)="clearCart()" class="clear-btn">Clear Cart</button>
        </div>
      }
    </div>
  `,
})
export class CartDisplay {
  cartStore = inject(CartStore); // notice you would have to `inject()` the CartStore to be able to use it in this component

  addLaptop() {
    this.cartStore.addItem("1", "Laptop", 999);
  }

  addMouse() {
    this.cartStore.addItem("2", "Mouse", 25);
  }

  addKeyboard() {
    this.cartStore.addItem("3", "Keyboard", 79);
  }

  increaseQuantity(id: string) {
    const items = this.cartStore.cartItems(); // notice `cartItems()` should be called to retrieve its value since it is a signal originally
    const currentItem = items.find((item) => item.id === id);
    if (currentItem) {
      this.cartStore.updateQuantity(id, currentItem.quantity + 1);
    }
  }

  decreaseQuantity(id: string) {
    const items = this.cartStore.cartItems();
    const currentItem = items.find((item) => item.id === id);
    if (currentItem && currentItem.quantity > 1) {
      this.cartStore.updateQuantity(id, currentItem.quantity - 1);
    }
  }

  removeItem(id: string) {
    this.cartStore.removeItem(id);
  }

  clearCart() {
    this.cartStore.clearCart();
  }
}
```

Then inside a parent component, again using `inject()`:

```ts
// app.ts
// TODO: Import inject from @angular/core
import { Component, inject } from "@angular/core";
import { CartStore } from "./cart-store";
import { CartDisplay } from "./cart-display";

@Component({
  selector: "app-root",
  imports: [CartDisplay], // You need to put it in `imports` array since you're going to use it in your template
  template: `
    <div class="shopping-app">
      <header>
        <h1>Signals with Services Demo</h1>
        <div class="cart-badge">Cart: {{ cartStore.totalQuantity() }}</div>
      </header>

      <main>
        <cart-display />
      </main>
    </div>
  `,
  styleUrl: "./app.css",
})
export class App {
  cartStore = inject(CartStore);
}
```

You've now learned how to use signals with services. Key concepts to remember:

- **Service-level signals:** Services can use signals to manage reactive state
- **Dependency injection:** Use `inject()` to access services with signals in components
- **Computed signals in services:** Create derived state that updates automatically
- **Readonly signals:** Expose read-only versions of signals to prevent external mutations

## Directives

Signals work exactly the same in directives as they do in components! The main difference is that since directives don't have templates, you'll primarily use signals in host bindings to reactively update the host element.

This is a Directive:

```ts
// highligh-directive.ts
import { Directive, input, signal, computed } from "@angular/core";

@Directive({
  selector: "[highlight]",
})
export class HighlightDirective {
  color = input<string>("yellow");
  intensity = input<number>(0.3);

  private isHovered = signal<boolean>(false);

  backgroundStyle = computed(() => {
    const baseColor = this.color();
    const alpha = this.isHovered() ? this.intensity() : this.intensity() * 0.5;

    const colorMap: Record<string, string> = {
      yellow: `rgba(255, 255, 9, ${alpha})`,
      blue: `rgba(0, 100, 255, ${alpha})`,
      green: `rgba(0, 200, 0, ${alpha})`,
      red: `rgba(255, 0, 0, ${alpha})`,
    };

    return colorMap[baseColor] || colorMap["yellow"];
  });
}
```

Notice how this is identical to component patterns. Since directives don't have templates, you'll use signals in **host bindings** to reactively update the host element. Add the `host` configuration and event handlers:

```ts
// highlight-directive.ts
import { Directive, input, signal, computed } from "@angular/core";

@Directive({
  selector: "[highlight]",
  host: {
    "[style.backgroundColor]": "backgroundStyle()",
    "(mouseenter)": "onMouseEnter()",
    "(mouseleave)": "onMouseLeave()",
  },
})
export class HighlightDirective {
  color = input<string>("yellow");
  intensity = input<number>(0.3);

  private isHovered = signal<boolean>(false);

  backgroundStyle = computed(() => {
    const baseColor = this.color();
    const alpha = this.isHovered() ? this.intensity() : this.intensity() * 0.5;

    const colorMap: Record<string, string> = {
      yellow: `rgba(255, 255, 9, ${alpha})`,
      blue: `rgba(0, 100, 255, ${alpha})`,
      green: `rgba(0, 200, 0, ${alpha})`,
      red: `rgba(255, 0, 0, ${alpha})`,
    };

    return colorMap[baseColor] || colorMap["yellow"];
  });

  onMouseEnter() {
    this.isHovered.set(true);
  }

  onMouseLeave() {
    this.isHoevered.set(false);
  }
}
```

The host bindings automatically re-evaluate when the signals change - just like template bindings in components! When `isHovered` changes, the `backgroundStyle` computed signal recalculates, and the host binding updates the element's style.

Then to use this directive in another component's template:

```ts
// app.ts
import { Component } from "@angular/core";
import { HighlightDirective } from "./highlight-directive";

@Component({
  selector: "app-root",
  imports: [HighlightDirective],
  template: `
    <div>
      <h1>Directive with Signals</h1>

      <div highlight color="blue" [intensity]="0.2">
        Hover me - Blue highlight
      </div>

      <div highlight color="green" [intensity]="0.4">
        Hover me - Green highlight
      </div>

      <div highlight color="yellow" [intensity]="0.6">
        Hover me - Yellow highlight
      </div>
    </div>
  `,
  styleUrl: "./app.css",
})
export class App {}
```

Notice how `highlight` is used as a `div` attribute to call the hightlight directive as defined in its `selector`.

You've now seen how signals work with directives. Some key takeaways from this lesson are:

- **Signals are universal** - All signal APIs (`input()`, `signal()`, `computed()`, `effect()`) work the same in both directives and components
- **Host bindings are the primary use case** - Since directives don't have templates, you use signals in host bindings to reactively modify the host element
- **Same reactive patterns** - Signal updates trigger automatic re-evaluation of computed signals and **host bindings**, just like in component templates
