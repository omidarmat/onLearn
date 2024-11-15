# TypeScript essentials

- [TypeScript essentials](#typescript-essentials)
- [My Notes](#my-notes)
- [Defining functions?](#defining-functions)
  - [Define argument types](#define-argument-types)
    - [Primitive types](#primitive-types)
      - [Literal types](#literal-types)
        - [One problem with literal types](#one-problem-with-literal-types)
    - [Object types](#object-types)
      - [Optional properties](#optional-properties)
      - [Type aliases](#type-aliases)
      - [Interfaces](#interfaces)
      - [Generic object type](#generic-object-type)
    - [Array Type](#array-type)
    - [Function type](#function-type)
      - [Type aliases](#type-aliases-1)
  - [Define return types](#define-return-types)
  - [Generic types](#generic-types)
- [Defining variables?](#defining-variables)
  - [Type aliases](#type-aliases-2)
- [Asserting types?](#asserting-types)
  - [With `as`](#with-as)
  - [With angle-bracket `<>`](#with-angle-bracket-)
- [Important tips](#important-tips)
  - [Differences Between Type Aliases and Interfaces](#differences-between-type-aliases-and-interfaces)
- [Explicit Types](#explicit-types)
- [TypeScript strictness](#typescript-strictness)
- [Everyday Types](#everyday-types)
  - [The primitives: string, number, and boolean](#the-primitives-string-number-and-boolean)
  - [Arrays](#arrays)
  - [`any`](#any)
  - [Type Annotations on Variables](#type-annotations-on-variables)
  - [Functions](#functions)
  - [Parameter Type Annotations](#parameter-type-annotations)
  - [Return Type Annotations](#return-type-annotations)
  - [Functions Which Return Promises](#functions-which-return-promises)
  - [Anonymous Functions](#anonymous-functions)
  - [Object Types](#object-types-1)
  - [Optional Properties](#optional-properties-1)
  - [Union Types](#union-types)
  - [Defining a Union Type](#defining-a-union-type)
  - [Working with Union Types](#working-with-union-types)
  - [Type Aliases](#type-aliases-3)
  - [Interfaces](#interfaces-1)
  - [Differences Between Type Aliases and Interfaces](#differences-between-type-aliases-and-interfaces-1)
  - [Type Assertions](#type-assertions)
  - [With `as`](#with-as-1)
  - [With angle-bracket](#with-angle-bracket)
  - [Literal Types](#literal-types-1)
  - [Literal interfaces](#literal-interfaces)
- [Functions (advanced)](#functions-advanced)
  - [Function Type Expressions](#function-type-expressions)
  - [Call Signatures](#call-signatures)
  - [Construct Signatures](#construct-signatures)
  - [Generic Functions](#generic-functions)
  - [Other types to know about](#other-types-to-know-about)
  - [void](#void)
  - [object](#object)
- [Object Types](#object-types-2)
  - [Property Modifiers](#property-modifiers)
  - [Optional Properties](#optional-properties-2)
  - [readonly Properties](#readonly-properties)
  - [Extending Types](#extending-types)
  - [Intersection Types](#intersection-types)
  - [Interface Extension vs. Intersection](#interface-extension-vs-intersection)
  - [Generic Object Types](#generic-object-types)
  - [The Array Type](#the-array-type)
- [Found in codebase](#found-in-codebase)
  - [Tables](#tables)
  - [React function component](#react-function-component)

This markdown file is written based on TypeScript official website documentations.

<!-- MY NOTES -->

# My Notes

Types are used to determine both reading and writing behavior.

# Defining functions?

If you are declaring a function, you can use these instructions to introduce types.

## Define argument types

### Primitive types

In order to define types of arguments that a function can receive you can use this syntax:

```ts
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

You can also set multiple types for one argument using the **union types** syntax:

```ts
function printId(id: number | string) {}
printId(101);
printId("202");
```

#### Literal types

You can use literal types in order to limit argument values more specifically than just general types like `string`, `number` or `boolean`.

```ts
function printText(s: string, alignment: "left" | "right" | "center") {}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

##### One problem with literal types

In the example below, `req.method` is inferred to be `string`, not `"GET"`. Because code can be evaluated between the creation of `req` and the call of `handleRequest` which could assign a new string like `"GUESS"` to `req.method`, TypeScript considers this code to have an error.

```ts
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

You can change the inference by adding a type assertion in either location:

```ts
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```

### Object types

If your function receives an **object** as argument you can define the argument type with this syntax:

```ts
function printCoord(pt: { x: number; y: number }) {}
printCoord({ x: 3, y: 7 });
```

#### Optional properties

If any of the properties of the object is optional you can use this syntax to define the argument type:

```ts
function printName(obj: { first: string; last?: string }) {}
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

#### Type aliases

Instead of type annotation, you can use type aliases in order to define the object type of a function argument:

```ts
type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {}

printCoord({ x: 100, y: 100 });
```

#### Interfaces

You can opt to use interfaces in order to define the object type of a function argument:

```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {}

printCoord({ x: 100, y: 100 });
```

#### Generic object type

Generic object types are often some sort of container type that work independently of the type of elements they contain. It’s ideal for data structures to work this way so that they’re re-usable across different data types.

You can make a generic `Box` type which declares a type parameter.

```ts
interface Box<Type> {
  contents: Type;
}
```

You might read this as “A `Box` of `Type` is something whose contents have type `Type”`. Later on, when we refer to `Box`, we have to give a type argument in place of `Type`. It means that whenever you define a variable of type `Box` and pass a generic type to it, the `content` property of that variable will have the type that you just passed.

```ts
let box: Box<string>;
```

This means that the type of `box.contents` is `string` and you would have to mutate it with a string type. Think of Box as a template for a real type, where `Type` is a placeholder that will get replaced with some other type. When TypeScript sees `Box<string>`, it will replace every instance of Type in `Box<Type>` with `string`, and end up working with something like `{ contents: string }`.

This also means that we can avoid overloads entirely by instead using generic functions.

```tsx
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
```

### Array Type

It turns out we’ve been working with a type just like that throughout this handbook: the Array type. Whenever we write out types like `number[]` or `string[]`, that’s really just a shorthand for `Array<number>` and `Array<string>`.

```ts
function doSomething(value: Array<string>) {}

let myArray: string[] = ["hello", "world"];

// either of these work!
doSomething(myArray);
doSomething(new Array("hello", "world"));
```

### Function type

If your function receives another function as argument, to define the type of the argument you can use **type expression**. This is syntactically similar to arrow functions.

```ts
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

#### Type aliases

You can use a type alias to define and name a function type:

```ts
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {}
```

## Define return types

In order to define the type of the value returned by a function you can use this syntax:

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

If you want to annotate the return type of a function which returns a promise, you should use the `Promise` type:

```ts
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

If a function should return nothing, you use `void`:

```ts
async function getFavoriteNumber(): void {}
```

## Generic types

It’s common to write a function where the types of the input relate to the type of the output, or where the types of two inputs are related in some way. Let’s consider for a moment a function that returns the first element of an array:

```ts
function firstElement(arr: any[]) {
  return arr[0];
}
```

This function does its job, but unfortunately has the return type any. It would be better if the function returned the type of the array element.

In TypeScript, _generics_ are used when we want to describe a correspondence between two values. We do this by declaring a _type parameter_ in the function signature:

```ts
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

By adding a type parameter `Type` to the function declaration between the function's name and arguments, you are basically defining a reference which will be used by TypeScript to relate the argument type and return type altogether. In other words, using `Type` in argument type and return type, we have created a link between the input of the function (the array) and the output (the return value). Now when we call it, a more specific type comes out:

```ts
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```

<!-- I DON'T UNDERSTAND THIS PART -->

We can use multiple type parameters as well. For example, a standalone version of `map` would look like this:

```ts
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

# Defining variables?

When you declare a variable using `const`, `var`, or `let`, you can optionally add a type annotation to explicitly specify the type of the variable:

```ts
let myName: string = "Alice";
```

## Type aliases

You can use type aliases to define the type of a variable:

```ts
type ID = number | string;
```

# Asserting types?

Sometimes you will have information about the type of a value that TypeScript can’t know about. For example, if you’re using `document.getElementById`, TypeScript only knows that this will return some kind of `HTMLElement`, but you might know that your page will always have an `HTMLCanvasElement` with a given ID.

Type assertions are only used in case some value is going to be returned and we know the type of the returned value more specifically. You can assert types with two syntaxes. Type assertions are always implemented on the right side of the equal `=` sign.

## With `as`

In this situation, you can use a _type assertion_ with `as` to specify a more specific type:

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.

## With angle-bracket `<>`

You can also use the angle-bracket syntax (except if the code is in a `.tsx` file), which is equivalent:

```ts
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

# Important tips

## Differences Between Type Aliases and Interfaces

Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

```ts
// Interface
// Extending an interface
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

// Adding new fields to an existing interface
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}
```

```ts
// Type
// Extending a type via intersections
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;

// A type cannot be changed after being created
type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};
// Error: Duplicate identifier 'Window'.
```

<!-- MY NOTES -->

# Explicit Types

Up until now, we haven’t told TypeScript what `person` or `date` are. Let’s edit the code to tell TypeScript that `person` is a `string`, and that `date` should be a `Date` object. We’ll also use the `toDateString()` method on `date`.

```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

With this, TypeScript can tell us about other cases where greet might have been called incorrectly. For example:

```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", Date());
// Argument of type 'string' is not assignable to parameter of type 'Date'.
```

Perhaps surprisingly, calling `Date()` in JavaScript returns a string. On the other hand, constructing a Date with `new Date()` actually gives us what we were expecting. Anyway, we can quickly fix up the error:

```ts
greet("Maddison", new Date());
```

# TypeScript strictness

TypeScript has several type-checking strictness flags that can be turned on or off, and all of our examples will be written with all of them enabled unless otherwise stated. The `strict` flag in the CLI, or `"strict": true` in a `tsconfig.json` toggles them all on simultaneously, but we can opt out of them individually. The two biggest ones you should know about are `noImplicitAny` and `strictNullChecks`.

# Everyday Types

Types can also appear in many more places than just type annotations. As we learn about the types themselves, we’ll also learn about the places where we can refer to these types to form new constructs.

We’ll start by reviewing the most basic and common types you might encounter when writing JavaScript or TypeScript code. These will later form the core building blocks of more complex types.

## The primitives: string, number, and boolean

JavaScript has three very commonly used primitives: `string`, `number`, and `boolean`. Each has a corresponding type in TypeScript. As you might expect, these are the same names you’d see if you used the JavaScript `typeof` operator on a value of those types:

- `string` represents string values like "Hello, world"
- `number` is for numbers like 42. JavaScript does not have a special runtime value for integers, so there’s no equivalent to int or float - everything is simply number
- `boolean` is for the two values true and false

## Arrays

To specify the type of an array like `[1, 2, 3]`, you can use the syntax `number[]`; this syntax works for any type (e.g. `string[]` is an array of strings, and so on). You may also see this written as `Array<number>`, which means the same thing. We’ll learn more about the syntax `T<U>` when we cover **generics**.

## `any`

TypeScript also has a special type, `any`, that you can use whenever you don’t want a particular value to cause typechecking errors.

When a value is of type `any`, you can access any properties of it (which will in turn be of type `any`), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal:

```ts
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

The `fi` type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.

## Type Annotations on Variables

When you declare a variable using `const`, `var`, or `let`, you can optionally add a type annotation to explicitly specify the type of the variable:

```ts
let myName: string = "Alice";
```

> **Note:** TypeScript doesn’t use “types on the left”-style declarations like int x = 0; Type annotations will always go after the thing being typed.

**In most cases, though, this isn’t needed**. Wherever possible, TypeScript tries to automatically _infer_ the types in your code. For example, the type of a variable is inferred based on the type of its initializer:

```ts
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```

## Functions

Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.

## Parameter Type Annotations

When you declare a function, you can add type annotations **after each parameter** to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:

```ts
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

When a parameter has a type annotation, arguments to that function will be checked:

```ts
// Would be a runtime error if executed!
greet(42);
// Argument of type 'number' is not assignable to parameter of type 'string'.
```

> **Note:** Even if you don’t have type annotations on your parameters, TypeScript will still check that you passed the right number of arguments.

## Return Type Annotations

You can also add return type annotations. Return type annotations appear **after the parameter list**:

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its `return` statements. The type annotation in the above example doesn’t change anything. Some codebases will explicitly specify a return type for documentation purposes, to prevent accidental changes, or just for personal preference.

## Functions Which Return Promises

If you want to annotate the return type of a function which returns a promise, you should use the `Promise` type:

```ts
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

## Anonymous Functions

Anonymous functions are a little bit different from function declarations. When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types. Here’s an example:

```ts
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});
```

Even though the parameter `s` didn’t have a type annotation, TypeScript used the types of the `forEach` function, along with the inferred type of the array, to determine the type `s` will have. This process is called _contextual typing_ because the context that the function occurred within informs what type it should have.

## Object Types

Apart from primitives, the most common sort of type you’ll encounter is an object type. This refers to any JavaScript value with **properties**, which is almost all of them! To define an object type, we simply list its properties and their types.

For example, here’s a function that takes a point-like object:

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

Here, we annotated the parameter with a type with two properties - `x` and `y` - which are both of type `number`. You can use `,` or `;` to separate the properties, and the last separator is optional either way.

The type part of each property is also optional. If you don’t specify a type, it will be assumed to be any.

## Optional Properties

Object types can also specify that some or all of their properties are optional. To do this, add a ? after the property name:

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

## Union Types

TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators. Now that we know how to write a few types, it’s time to start combining them in interesting ways.

## Defining a Union Type

The first way to combine types you might see is a union type. A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the _union’s members_.

Let’s write a function that can operate on strings or numbers:

```ts
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

The separator of the union members is allowed before the first element, so you could also write this:

```ts
function printTextOrNumberOrBool(
  textOrNumberOrBool: string | number | boolean
) {
  console.log(textOrNumberOrBool);
}
```

## Working with Union Types

It’s easy to provide a value matching a union type - simply provide a type matching any of the union’s members. If you have a value of a union type, how do you work with it?

TypeScript will only allow an operation if it is valid for every member of the union. For example, if you have the union `string | number`, you can’t use methods that are only available on string:

```ts
function printId(id: number | string) {
  console.log(id.toUpperCase());
  //Property 'toUpperCase' does not exist on type 'string | number'.
  //Property 'toUpperCase' does not exist on type 'number'.
}
```

The solution is to **narrow** the union with code, the same as you would in JavaScript without type annotations. Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.

For example, TypeScript knows that only a string value will have a `typeof` value "string":

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

Another example is to use a function like `Array.isArray`:

```ts
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```

Notice that in the `else` branch, we don’t need to do anything special - if `x` wasn’t a `string[]`, then it must have been a `string`.

Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a `slice` method. If every member in a union has a property in common, you can use that property without narrowing:

```ts
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

## Type Aliases

We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.

A _type alias_ is exactly that - a name for any type. The syntax for a type alias is:

```ts
type Point = {
  x: number;
  y: number;
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

You can actually use a type alias to give a name to any type at all, not just an object type. For example, a type alias can name a union type:

```ts
type ID = number | string;
```

## Interfaces

An interface declaration is another way to name an object type:

```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

## Differences Between Type Aliases and Interfaces

Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

```ts
// Interface
// Extending an interface
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

// Adding new fields to an existing interface
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}
```

```ts
// Type
// Extending a type via intersections
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;

// A type cannot be changed after being created
type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};
// Error: Duplicate identifier 'Window'.
```

## Type Assertions

Sometimes you will have information about the type of a value that TypeScript can’t know about.

For example, if you’re using `document.getElementById`, TypeScript only knows that this will return some kind of `HTMLElement`, but you might know that your page will always have an `HTMLCanvasElement` with a given ID.

## With `as`

In this situation, you can use a _type assertion_ with `as` to specify a more specific type:

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.

## With angle-bracket

You can also use the angle-bracket syntax (except if the code is in a `.tsx` file), which is equivalent:

```ts
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

> **Note:** Because type assertions are removed at compile-time, there is no runtime checking associated with a type assertion. There won’t be an exception or `null` generated if the type assertion is wrong.

TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:

```ts
const x = "hello" as number;
```

## Literal Types

In addition to the general types `string` and `number`, we can refer to specific strings and numbers in type positions.

One way to think about this is to consider how JavaScript comes with different ways to declare a variable. Both `var` and `let` allow for changing what is held inside the variable, and const does not. This is reflected in how TypeScript creates types for literals.

```ts
let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that is how TypeScript describes it in the type system
changingString;
// let changingString: string

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it has a literal type representation
constantString;
// const constantString: "Hello World"
```

By themselves, literal types aren’t very valuable:

```ts
let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
// Type '"howdy"' is not assignable to type '"hello"'.
```

It’s not much use to have a variable that can only have one value!

But by combining literals into unions, you can express a much more useful concept - for example, functions that only accept a certain set of known values:

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

Numeric literal types work the same way:

```ts
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

Of course, you can combine these with non-literal types:

```ts
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");
// Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

There’s one more kind of literal type: boolean literals. There are only two boolean literal types, and as you might guess, they are the types `true` and `false`. The type `boolean` itself is actually just an alias for the union `true | false`.

## Literal interfaces

When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later. For example, if you wrote code like this:

```ts
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

TypeScript doesn’t assume the assignment of `1` to a field which previously had `0` is an error. Another way of saying this is that `obj.counter` must have the type `number`, not `0`, because types are used to determine both reading and writing behavior.

The same applies to strings:

```ts
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

In the above example `req.method` is inferred to be `string`, not `"GET"`. Because code can be evaluated between the creation of `req` and the call of `handleRequest` which could assign a new string like `"GUESS"` to `req.method`, TypeScript considers this code to have an error.

There are two ways to work around this.

1. You can change the inference by adding a type assertion in either location:

```ts
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```

Change 1 means “I intend for `req.method` to always have the literal type `"GET"`”, preventing the possible assignment of `"GUESS"` to that field after. Change 2 means “I know for other reasons that `req.method` has the value `"GET"`“.

2. You can use as const to convert the entire object to be type literals:

```ts
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

The `as const` suffix acts like `const` but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like `string` or `number`.

# Functions (advanced)

Functions are the basic building block of any application, whether they’re local functions, imported from another module, or methods on a class. They’re also values, and just like other values, TypeScript has many ways to describe how functions can be called. Let’s learn about how to write types that describe functions.

## Function Type Expressions

The simplest way to describe a function is with a function type expression. These types are syntactically similar to arrow functions:

```ts
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

The syntax `(a: string) => void` means “a function with one parameter, named a, of type string, that doesn’t have a return value”. Just like with function declarations, if a parameter type isn’t specified, it’s implicitly any.

> **Note:** Note that the parameter name is required. The function type `(string) => void` means “a function with a parameter named string of type `any`“!

Of course, we can use a type alias to name a function type:

```ts
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

## Call Signatures

## Construct Signatures

## Generic Functions

It’s common to write a function where the types of the input relate to the type of the output, or where the types of two inputs are related in some way. Let’s consider for a moment a function that returns the first element of an array:

```ts
function firstElement(arr: any[]) {
  return arr[0];
}
```

This function does its job, but unfortunately has the return type any. It’d be better if the function returned the type of the array element.

In TypeScript, _generics_ are used when we want to describe a correspondence between two values. We do this by declaring a _type parameter_ in the function signature:

```ts
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

By adding a type parameter `Type` to this function and using it in two places, we’ve created a link between the input of the function (the array) and the output (the return value). Now when we call it, a more specific type comes out:

```ts
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```

We can use multiple type parameters as well. For example, a standalone version of `map` would look like this:

```ts
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

## Other types to know about

There are some additional types you’ll want to recognize that appear often when working with function types. Like all types, you can use them everywhere, but these are especially relevant in the context of functions.

## void

`void` represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any `return` statements, or doesn’t return any explicit value from those return statements:

```ts
// The inferred return type is void
function noop() {
  return;
}
```

In JavaScript, a function that doesn’t return any value will implicitly return the value undefined. However, void and undefined are not the same thing in TypeScript.

## object

The special type object refers to any value that isn’t a primitive (`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, or `undefined`). This is different from the empty object type `{ }`, and also different from the global type `Object`. It’s very likely you will never use `Object`.

Note that in JavaScript, function values are objects: They have properties, have `Object.prototype` in their prototype chain, are `instanceof Object`, you can call `Object.keys` on them, and so on. For this reason, function types are considered to be `object`s in TypeScript.

# Object Types

In JavaScript, the fundamental way that we group and pass around data is through objects. In TypeScript, we represent those through object types.

As we’ve seen, they can be anonymous:

```ts
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

or they can be named by using either an interface:

```ts
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}
```

or a type alias:

```ts
type Person = {
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.name;
}
```

In all three examples above, we’ve written functions that take objects that contain the property `name` (which must be a `string`) and `age` (which must be a `number`).

## Property Modifiers

Each property in an object type can specify a couple of things:

1. The type
2. Whether the property is optional
3. Whether the property can be written to

## Optional Properties

Much of the time, we’ll find ourselves dealing with objects that might have a property set. In those cases, we can mark those properties as optional by adding a question mark (?) to the end of their names.

```ts
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

In this example, both `xPos` and `yPos` are considered optional. We can choose to provide either of them, so every call above to `paintShape` is valid. All optionality really says is that if the property is set, it better have a specific type.

We can also read from those properties - but when we do under `strictNullChecks`, TypeScript will tell us they’re potentially `undefined`.

In JavaScript, even if the property has never been set, we can still access it - it’s just going to give us the value `undefined`. We can just handle `undefined` specially by checking for it.

```js
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;

  let xPos: number;
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;

  let yPos: number;
  // ...
}
```

Note that this pattern of setting defaults for unspecified values is so common that JavaScript has syntax to support it.

```js
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
  console.log("y coordinate at", yPos);
}
```

## readonly Properties

Properties can also be marked as `readonly` for TypeScript. While it won’t change any behavior at runtime, a property marked as `readonly` can’t be written to during type-checking.

```ts
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  obj.prop = "hello";
  // Cannot assign to 'prop' because it is a read-only property.
}
```

## Extending Types

It’s pretty common to have types that might be more specific versions of other types. For example, we might have a `BasicAddress` type that describes the fields necessary for sending letters and packages in the U.S.

```ts
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

In some situations that’s enough, but addresses often have a unit number associated with them if the building at an address has multiple units. We can then describe an `AddressWithUnit`.

```ts
interface AddressWithUnit {
  name?: string;
  unit: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

This does the job, but the downside here is that we had to repeat all the other fields from `BasicAddress` when our changes were purely additive. Instead, we can extend the original `BasicAddress` type and just add the new fields that are unique to `AddressWithUnit`.

```ts
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

The extends keyword on an interface allows us to effectively copy members from other named types, and add whatever new members we want. This can be useful for cutting down the amount of type declaration boilerplate we have to write, and for signaling intent that several different declarations of the same property might be related. For example, `AddressWithUnit` didn’t need to repeat the `street` property, and because `street` originates from `BasicAddress`, a reader will know that those two types are related in some way.

interfaces can also extend from multiple types.

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

## Intersection Types

`interfaces` allowed us to build up new types from other types by extending them. TypeScript provides another construct called intersection types that is mainly used to combine existing object types.

An intersection type is defined using the `&` operator.

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

Here, we’ve intersected `Colorful` and `Circle` to produce a new type that has all the members of `Colorful` and `Circle`.

```ts
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
draw({ color: "red", raidus: 42 });
// Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
```

## Interface Extension vs. Intersection

We just looked at two ways to combine types which are similar, but are actually subtly different. With interfaces, we could use an `extends` clause to extend from other types, and we were able to do something similar with intersections and name the result with a type alias. The principal difference between the two is how conflicts are handled, and that difference is typically one of the main reasons why you’d pick one over the other between an interface and a type alias of an intersection type.

If interfaces are defined with the same name, TypeScript will attempt to merge them if the properties are compatible. If the properties are not compatible (i.e., they have the same property name but different types), TypeScript will raise an error.

In the case of intersection types, properties with different types will be merged automatically. When the type is used later, TypeScript will expect the property to satisfy both types simultaneously, which may produce unexpected results.

For example, the following code will throw an error because the properties are incompatible:

```ts
interface Person {
  name: string;
}
interface Person {
  name: number;
}
```

In contrast, the following code will compile, but it results in a never type:

```ts
interface Person1 {
  name: string;
}

interface Person2 {
  name: number;
}

type Staff = Person1 & Person2;

declare const staffer: Staff;
staffer.name;
// (property) name: never
```

In this case, Staff would require the name property to be both a string and a number, which results in property being of type `never`.

## Generic Object Types

Let’s imagine a Box type that can contain any value - `strings`, `numbers`, `Giraffes`, whatever.

```ts
interface Box {
  contents: any;
}
```

Right now, the contents property is typed as any, which works, but can lead to accidents down the line.

We could instead use `unknown`, but that would mean that in cases where we already know the type of `contents`, we’d need to do precautionary checks, or use error-prone type assertions.

```ts
interface Box {
  contents: unknown;
}

let x: Box = {
  contents: "hello world",
};

// we could check 'x.contents'
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}

// or we could use a type assertion
console.log((x.contents as string).toLowerCase());
```

One type safe approach would be to instead scaffold out different `Box` types for every type of `contents`.

```ts
interface NumberBox {
  contents: number;
}

interface StringBox {
  contents: string;
}

interface BooleanBox {
  contents: boolean;
}
```

But that means we’ll have to create different functions, or overloads of functions, to operate on these types.

```ts
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}
```

That’s a lot of boilerplate. Moreover, we might later need to introduce new types and overloads. This is frustrating, since our box types and overloads are all effectively the same.

Instead, we can make a generic `Box` type which declares a type parameter.

```ts
interface Box<Type> {
  contents: Type;
}
```

You might read this as “A `Box` of `Type` is something whose contents have type `Type”`. Later on, when we refer to `Box`, we have to give a type argument in place of `Type`.

```ts
let box: Box<string>;
```

[to be continued...]

## The Array Type

Generic object types are often some sort of container type that work independently of the type of elements they contain. It’s ideal for data structures to work this way so that they’re re-usable across different data types.

It turns out we’ve been working with a type just like that throughout this handbook: the Array type. Whenever we write out types like number[] or string[], that’s really just a shorthand for `Array<number>` and `Array<string>`.

```ts
function doSomething(value: Array<string>) {
  // ...
}

let myArray: string[] = ["hello", "world"];

// either of these work!
doSomething(myArray);
doSomething(new Array("hello", "world"));
```

# Found in codebase

## Tables

```ts
interface iTable {
  title?: string;
  columns: {
    title: string;
    dataIndex: string;
    key?: string | number;
    render?: (input: any) => React.ReactNode;
  }[];
  colSizes?: string[];
  isLoading?: boolean;
  data?: { [key: string]: any }[];
  mobileCard: any;
  pagination?: iPagination;
}
```

The `data` field type definition is set to accept this format for the data array:

```ts
// data
[
  {
    name: "omid",
    lastName: "armat",
  },
  {
    country: "iran",
    isAvailable: true,
    population: 1.2,
  },
];
```

## React function component

???

```ts
export const DepositHistory = ({ tradeAccess }: { tradeAccess: boolean }) => {};
```
