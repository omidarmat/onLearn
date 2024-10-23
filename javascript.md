- [**A brief JavaScript history**](#a-brief-javascript-history)
- [**JavaScript releases**](#javascript-releases)
- [**JavaScript fundamentals**](#javascript-fundamentals)
  - [**Values and variables**](#values-and-variables)
    - [**Naming variables**](#naming-variables)
    - [**Declaring variables**](#declaring-variables)
  - [**Data types**](#data-types)
    - [**Different primitive types**](#different-primitive-types)
    - [**Different object types**](#different-object-types)
    - [**Primitives vs. Objects**](#primitives-vs-objects)
    - [**Inspecting the data type**](#inspecting-the-data-type)
    - [**Dynamic typing in JavaScript**](#dynamic-typing-in-javascript)
    - [**Type conversion and coercion**](#type-conversion-and-coercion)
      - [**Type conversion**](#type-conversion)
      - [**Type coercion**](#type-coercion)
    - [**Truthy and Falsy values**](#truthy-and-falsy-values)
  - [**Basic operators**](#basic-operators)
    - [**Mathematical operators**](#mathematical-operators)
    - [**Assignment operators**](#assignment-operators)
    - [**Comparison operators**](#comparison-operators)
    - [**Boolean logic**](#boolean-logic)
  - [**Control structures**](#control-structures)
    - [**if/else statement**](#ifelse-statement)
    - [**switch statement**](#switch-statement)
    - [**Ternary operator**](#ternary-operator)
    - [**Loops**](#loops)
      - [**The `for` loop**](#the-for-loop)
      - [**The `while` loop**](#the-while-loop)
      - [**The `for-of` loop**](#the-for-of-loop)
  - [**Statements and Expressions**](#statements-and-expressions)
  - [**Strict mode**](#strict-mode)
- [**JavaScript behind the scenes**](#javascript-behind-the-scenes)
  - [**JavaScript runtime and engine**](#javascript-runtime-and-engine)
    - [**JavaScript runtime**](#javascript-runtime)
    - [**JavaScript engine**](#javascript-engine)
    - [**Just-In-Time compilation of JavaScript**](#just-in-time-compilation-of-javascript)
      - [**Compilation vs. Interpretation vs. JIT compilation**](#compilation-vs-interpretation-vs-jit-compilation)
    - [**Execution contexts and the call stack**](#execution-contexts-and-the-call-stack)
    - [**Execution context structure**](#execution-context-structure)
      - [**Scope and the scope chain**](#scope-and-the-scope-chain)
        - [**Scope chain**](#scope-chain)
      - [**Variable environments: hoisting and TDZ**](#variable-environments-hoisting-and-tdz)
      - [**The `this` keyword**](#the-this-keyword)
      - [**The `arguments` keyword**](#the-arguments-keyword)
- [**Functions**](#functions)
  - [**Defining functions**](#defining-functions)
    - [**Function declarations**](#function-declarations)
    - [**Function expressions**](#function-expressions)
    - [**Arrow functions**](#arrow-functions)
  - [**Calling functions**](#calling-functions)
- [**Data structures**](#data-structures)
  - [**Arrays**](#arrays)
    - [**Retrieve elements from array**](#retrieve-elements-from-array)
    - [**Mutate elements of array**](#mutate-elements-of-array)
    - [**Length of array**](#length-of-array)
    - [**Array methods**](#array-methods)
      - [**Add elements**](#add-elements)
      - [**Remove elements**](#remove-elements)
      - [**Find elements**](#find-elements)
      - [**Check element existence**](#check-element-existence)
      - [**Looping over arrays**](#looping-over-arrays)
        - [**Data transformation methods**](#data-transformation-methods)
      - [**Other array methods**](#other-array-methods)
    - [**Destructuring arrays**](#destructuring-arrays)
    - [**Spread operator for arrays**](#spread-operator-for-arrays)
    - [**Rest pattern in arrays**](#rest-pattern-in-arrays)
  - [**Objects**](#objects)
    - [**Retrieve data from object**](#retrieve-data-from-object)
    - [**Object methods**](#object-methods)
    - [**Destructuring objects**](#destructuring-objects)
    - [**Spread operator for objects**](#spread-operator-for-objects)
    - [**Rest pattern in objects**](#rest-pattern-in-objects)
  - [**Sets**](#sets)
    - [**Creating sets**](#creating-sets)
      - [**Set properties and methods**](#set-properties-and-methods)
  - [**Maps**](#maps)
    - [**Creating maps**](#creating-maps)
    - [**Populating maps**](#populating-maps)
    - [**Map methods**](#map-methods)
- [**Strings**](#strings)
  - [**String methods**](#string-methods)
    - [**Finding positions of characters**](#finding-positions-of-characters)
    - [**Extract parts of strings**](#extract-parts-of-strings)
    - [**Transforming strings**](#transforming-strings)
    - [**Checking characters existence**](#checking-characters-existence)
- [**Asynchronous programming**](#asynchronous-programming)
  - [**JavaScript pre-defined asynchronous functionalities**](#javascript-pre-defined-asynchronous-functionalities)
    - [**AJAX calls**](#ajax-calls)
      - [**`XMLHttpRequest()`**](#xmlhttprequest)
      - [**Fetch API**](#fetch-api)
  - [**Promises**](#promises)
    - [**A promise lifecycle**](#a-promise-lifecycle)
    - [**Working with promises**](#working-with-promises)
      - [**Consuming a promise**](#consuming-a-promise)
        - [**Consuming with `.then()`**](#consuming-with-then)
        - [**Consuming with `async` and `await`**](#consuming-with-async-and-await)
      - [**Creating a promise**](#creating-a-promise)
      - [**Error handling**](#error-handling)
        - [**Handling with `.then()` or `.catch()`**](#handling-with-then-or-catch)
        - [**Handling with `try/catch` blocks**](#handling-with-trycatch-blocks)
      - [**Finally!**](#finally)
- [**Object-Oriented Programming**](#object-oriented-programming)
  - [**Traditional OOP (classes and instances)**](#traditional-oop-classes-and-instances)
    - [**Four fundamental OOP principles**](#four-fundamental-oop-principles)
  - [**OOP in JavaScript**](#oop-in-javascript)
    - [**Prototype \& prototypal inheritance**](#prototype--prototypal-inheritance)
    - [**Implementing prototypal inheritance in JavaScript**](#implementing-prototypal-inheritance-in-javascript)
      - [**1. Constructor function and the `prototype` property:**](#1-constructor-function-and-the-prototype-property)
        - [**_Creating a construtor function_**](#creating-a-construtor-function)
        - [**_Defining methods on prototype_**](#defining-methods-on-prototype)
        - [**_Defining properties on prototype_**](#defining-properties-on-prototype)
        - [**_Defining static methods_**](#defining-static-methods)
        - [**_Creating an object (instance)_**](#creating-an-object-instance)
        - [**_Prototype chain_**](#prototype-chain)
        - [**_Inheritance between constructor functions (classes)_**](#inheritance-between-constructor-functions-classes)
      - [**2. ES6 Classes:**](#2-es6-classes)
        - [**_Defining a class and instance properties_**](#defining-a-class-and-instance-properties)
        - [**_Defining methods_**](#defining-methods)
        - [**_Creating an object (instance)_**](#creating-an-object-instance-1)
        - [**_Defining getters and setters_**](#defining-getters-and-setters)
        - [**_Defining static methods_**](#defining-static-methods-1)
        - [**_Inheritance between ES6 classes_**](#inheritance-between-es6-classes)
        - [**_Data Encapsulation_**](#data-encapsulation)
        - [**_Making class methods chainable_**](#making-class-methods-chainable)
      - [**3. `Object.create()`:**](#3-objectcreate)
        - [**_Defining a prototype object and instance methods_**](#defining-a-prototype-object-and-instance-methods)
        - [**_Creating an object (instance)_**](#creating-an-object-instance-2)
- [**MVC architecture**](#mvc-architecture)
  - [**Publisher-subscriber pattern**](#publisher-subscriber-pattern)
- [**Working with the DOM**](#working-with-the-dom)
  - [**A detailed look into the DOM**](#a-detailed-look-into-the-dom)
    - [**DOM organization**](#dom-organization)
  - [**Selecting elements**](#selecting-elements)
    - [**Select document, head and body**](#select-document-head-and-body)
    - [**Select elements with `querySelector()`**](#select-elements-with-queryselector)
    - [**Select elements with `querySelectorAll()`**](#select-elements-with-queryselectorall)
    - [**Select elements with `getElementById()`**](#select-elements-with-getelementbyid)
    - [**Select elements with `getElementsByTagName()`**](#select-elements-with-getelementsbytagname)
    - [**Select elements with `getElementsByClassName()`**](#select-elements-with-getelementsbyclassname)
  - [**Creating and inserting elements**](#creating-and-inserting-elements)
    - [**Create elements with `insertAdjacentHTML()`**](#create-elements-with-insertadjacenthtml)
    - [**Create elements with `createElement()`**](#create-elements-with-createelement)
    - [**Insert element with `prepend()`**](#insert-element-with-prepend)
    - [**Insert element with `append()`**](#insert-element-with-append)
    - [**Insert element with `before()`**](#insert-element-with-before)
    - [**Insert element with `after()`**](#insert-element-with-after)
    - [**Delete element with `remove()`**](#delete-element-with-remove)
  - [**Manipulating styles, attributes and classas**](#manipulating-styles-attributes-and-classas)
    - [**Manipulate styles**](#manipulate-styles)
    - [**Manipulate CSS custom properties**](#manipulate-css-custom-properties)
    - [**Manipulate HTML attributes**](#manipulate-html-attributes)
      - [**HTML data attribute**](#html-data-attribute)
    - [**Manipulate classes**](#manipulate-classes)
  - [**Events**](#events)
  - [**Event delegation**](#event-delegation)
- [**Problem solving framework**](#problem-solving-framework)

# **A brief JavaScript history**

Right after the internet was invented, and the first browsers were developed, developers wanted to start making websites more interactive. Therefore they needed a programming language for the browser. So here are a couple of historical notes that you should know:

| Time     | What happened?                                                                                                                                                                                                                                                                                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1995     | Brendan Eich created the **first version** of JavaScript in 10 days. It was called _Mocha_. It had many fundamental features of modern JavaScript.                                                                                                                                                                                                                            |
| 1996     | Mocha was renamed first to LiveScript and then to JavaScript, in order to attract Java developers, since Java was the most popular programming language at that time. But JavaScript has nothing to do with Java. People started to realise that they need a standard JavaScript language. So the language was submitted to an independant standard organization called ECMA. |
| 1997     | ECMA released **ECMAScript 1 (ES1)**, which was the first official standard for JavaScript. Now every browser could implement the same standard of JavaScript.                                                                                                                                                                                                                |
| 2009     | After a lot of controversy about where the language should be headed, ES5 was released with lots of new features.                                                                                                                                                                                                                                                             |
| 2015     | ES6/ES2015 was released. This was the biggest update to the language ever. The reason why releases were also announced with the year number starting from ES6, was that in 2015, ECMAScript changed to an annual release cycle in order to ship less features per update, and therefore, avoiding breaking changes in the language.                                           |
| 2016 - ∞ | Releases of ES7/ES2016, ES8/ES2017, ...                                                                                                                                                                                                                                                                                                                                       |

# **JavaScript releases**

JavaScript has a unique feature called **backwards compatibility**. It means that if we write old JavaScript code syntax, it will successfully be understood by modern JavaScript engines that we have today, so it will work in modern browsers. So no matter how far JavaScript goes in its future releases, old websites will still keep working.

This feature is based on a JavaScript development principle which is **Dont' break the web!** It means that there is almost never anything removed from the language, but only added to it in new releases (**incremental updates**).

The problem arises when we want to execute modern JavaScript code in old browsers, so with old engines. The solution comes with the last of the two stages of creating a website: **development** and **production**.

- Development phase: this is when you are building the site or application on your computer. We use the latest version of the Chrome browser to make sure that we can use JavaScript latest features.
- Production phase: when developing the application is finished, you deploy it on the internet where it will run on users' browsers. This is where things get out of developers' control. We cannot control which browsers the users use. Some users certainly use old browsers that cannot understand our code. The solution is to use **transpiling** (with _Babel_) and **polyfillying**, in order convert modern JavaScript (ES6 and later) to ES5. This is only done after your app is developed, and you want to ship it to your users.

Here is an overview of how different realses of JavaScript are supported:

- **ES5:** fully supported in all browsers (down to IE9 from 2011). It is why we use ES5 as transpiling target.
- **ES6 to ES2023:** also called altogether **ES6+**. These releases are weill supported by all modern browsers, but not supported by older browsers.
- **ESNext:** related to releases after the current release. Most browsers start implementing new features even before they enter the official ECMAScript specification. This is possible becasue any new feature that is requested to be added to the language, it has to pass through 4 stages. When features arrive at stage 3, browser companies can be pretty sure that they will pass to stage 4 and therfore, will be included in the language.

# **JavaScript fundamentals**

## **Values and variables**

A value is a piece of data. It is the most fundamental unit of information in programming. For example, the string `'jonas'` is a value, or `23` is another value.

We can store values in variables. This enables us to use certain values whenever we need. To assign a value to a variable we use either `let`, `const`, or `var`. This is called **declaring a variable**. By assigning a value to a variable, anywhere in our code that refers to that variable will be updated if we change the value of the variable.

```js
const name = "omid";
const age = 30;
```

### **Naming variables**

1. Variable names cannot start with numbers.
2. Variable names can only contain numbers, letters, underscores, or the dollar sign.
3. Variables cannot have the name of some reserved JavaScript keywords (`new`, `function`).
4. Keyword `name` is a reserved JavaScript keyword. However, it is possible to use it as a variable name, but we had better not.
5. Variable names that are written all in uppercase, are reserved for constants that we know will never change.

```js
const PI = 3.1415;
```

### **Declaring variables**

We can declare variables with `let`, `const`, and `var`. There are differences between them.

1. `let`: we declare variables with `let` if we want to reasign another value or mutate them during the execution of our program. This means that variables can be declared empty using `let`.
2. `const`: we declare variables with `const` if they are not to be changed at any point in future. Any attempt to mutate a variable defined with const will result in error. This means that variables cannot be declared empty with `const`.
3. `var`: this is the old way of declaring variables, prior to ES6. It appears to work pretty similar to `let`, but behind the scenes they are very different.

> **_Note_** | we can declare multiple empty variables using `let`.

```js
let x, y;
```

## **Data types**

Every value in JavaScript is either an **object** or a **primitive** value. It would only be primitive if it is not an object.

### **Different primitive types**

Primitive values can have 7 different data types:

| Data type       | Description                                                              | Example                   |
| --------------- | ------------------------------------------------------------------------ | ------------------------- |
| Number          | floating point numbers used for decimals and integers                    | `let age = 23;`           |
| String          | sequence of characters used for text                                     | `let firstName = 'omid';` |
| Boolean         | logical type, can be either `true` or `false`, used for taking decisions | `let fullAge = true;`     |
| Undefined       | value taken by a variable that is not yet defined (empty value)          | `let children;`           |
| Null            | means empty value                                                        |
| Symbol (ES2015) | unique value and cannot be changed                                       |
| BigInt (ES2020) | larger integers than the Number type                                     |

### **Different object types**

These are different types of objects in JavaScript:

1. Object literal
2. Arrays
3. Functions
4. Many more things...

### **Primitives vs. Objects**

In terms of memory and memory management, it is common to call primitives as _primitive types_, and objects as _reference types_, because these two are stored differently in the memory.

All reference types are stored in the JavaScript engine's [heap](#javascript-engine). All primitive types are stored in the [execution contexts](#execution-contexts-and-the-call-stack) in the [call stack](#javascript-engine).

Let's perform the comparison based on a code example:

```js
let age = 30;
let oldAge = age;
age = 31;
console.log(age); // 31
console.log(oldAge); // 30
```

When we declare a variable like `age`, JavaScipt will first create a unique **identifier** with the variable name. Then a piece of memory, with a certain **address** (like `0001`) will be allocated to the identifier. **Keep in mind that the identifier points to the address and not to the value**. So we say that age is equal to 30, but in fact, age is equal to `0001` memory address. Finally, the value will be stored in the memory. So what we will have in the engine's call stack is:

| Identifier | Address | Value |
| ---------- | ------- | ----- |
| age        | 0001    | 30    |

In the next code line, we declare `oldAge` to be equal to `age`. So what will happen in the call stack, is that another unique identifier will be created and it will point to the same memory address as the `age` identifier. JavaScript will not allocate another piece of memory.

| Identifier | Address | Value |
| ---------- | ------- | ----- |
| age        | 0001    | 30    |
| oldAge     | 0001    |       |

In the next line, we set `age` to 31. Certainly, the value at `0001` will not become 31. If it would, `oldAge` would be changed too. But a **value at a certain memory address is immutable**. What happens instead, is that a new piece of memory with address `0002` is allocated and the `age` identifier now points to this new address that holds 31.

| Identifier | Address | Value |
| ---------- | ------- | ----- |
| oldAge     | 0001    | 30    |
| age        | 0002    | 31    |

With reference values, things work a bit differently. Let's inspect another code example:

```js
const me = {
  name: "Omid",
  age: 30,
};

const friend = me;
friend.age = 27;

console.log(friend.age); // 27
console.log(me.age); // 27
```

When a new object is created, it is stored in the heap. Like in the call stack, there will be a memory address (like `D30F`), and then the value itslef, which in this case is an object. What happened to the identifier? The `me` identifier is also created in the call stack, which has a memory address for itself (like `0003`), and its value will be the memory address stored in the heap (D30F). So the piece of memory in the call stack will reference another piece of memory in the heap. That is why we call objects _reference types_. Objects are stored in this way because they could potentially become too large to be stored in the stack. Instead, the heap is like an unlimited memory pool.

**HEAP:**

| Address | Value                       |
| ------- | --------------------------- |
| D30F    | `{ name: 'Omid', age: 30 }` |

**CALL STACK:**

| Identifier | Address | Value |
| ---------- | ------- | ----- |
| me         | 0003    | D30F  |

In the next line, we create a new variable called `friend` and set it equal to `me`. Just like with what happened with primitives, a new identifier (`frined`) is created in the call stack, pointing to the same memory address as `me` identifier, so to `0003`, and then to the `D30F` memory address in the heap.

**CALL STACK:**

| Identifier | Address | Value |
| ---------- | ------- | ----- |
| me         | 0003    | D30F  |
| friend     | 0003    |       |

So what has happened is that the `friend` object is essentially the same as `me` object. So in the next line, when we change the `age` property of `friend`, the object is found in the heap and the age value is changed to 27.

> **_Note_** | this is why we can change values in objects although we declare them with `const`. When we change a value in an object, we are not actually changing the value of the allocated memory address in the call stack. All we do is to change a value in the heap. So when we say variables declared with `const` are immutable, it is actually concerned with primitive types, not reference types.

### **Inspecting the data type**

Using the `typeof` operator, we can see the data type of a value or a variable containing a value.

```js
console.log(typeof 32); // number
console.log(typeof true); // boolean

const firstName = "omid";
console.log(typeof firstName); // string

let year;
console.log(year); // undefined
console.log(typeof year); // undefined

console.log(typeof null); // object (!!!)
```

### **Dynamic typing in JavaScript**

When declaring variables, we don't need to define the data type that the variable is going to hold. JavaScript determines the data type of the value automatically. Also, when assigining a new value with a different data type to the same variable, JavaScript will automatically change the data type.

### **Type conversion and coercion**

**Type conversion** is when we _manually_ convert one type to another. But **type coercion** is when JavaScript _automatically_ converts one type to another.

#### **Type conversion**

We can use `String`, `Number`, and `Boolean` to convert value types.

```js
const inputYear = "1991";
console.log(inputYear + 18); // 199118 (type coercion)
console.log(Number(inputYear) + 18); // 2009 (type conversion)
```

#### **Type coercion**

This happens whenever an operator deals with two values of different types. JavaScript will automatically convert one of the values to match the other one. Look at the code example above.

Whenever there is a `+` math operation between a string and a number, the number is converted into a string. However, when there is a `-` operation between a string and a number, the string is converted to number.

```js
console.log("23" - "10" - 3); // 10
console.log("23" + "10" + 3); // 23103
console.log("23" * "2"); // 46
```

### **Truthy and Falsy values**

Truthy and Falsey values are not actually `true` or `false`, but they will translate to these if we attempt to convert the values to boolean.

In JavaScript, we have 5 falsey values, and everything else is a truthy value.

1. zero (0) and -0 and 0n (bigint)
2. empty string ('')
3. `undefined`
4. `NaN` (returned whenever an operation that involves numbers fails to produce a new number.)
5. `null`
6. `document.all` (the only falsey object in JavaScript)

```js
console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("omid")); // true
console.log(Boolean({})); // true
```

> **_Note_** | in practice, the conversion to boolean is always done automatically and implicitly. We almost never manually convert a value to boolean. JavaScript performs automatic type coercion to booleans in two situations:
>
> 1. When we use logical operators
> 2. In a logical context, for example, in the condition of an if/else statement.

## **Basic operators**

An operator allows us to transform or combine values. There are many categories of operators: **mathematical** operators, **comparison** operators, **logical** operators, **assignment** operators, and many more.

### **Mathematical operators**

Execution of mathematical operators have precendence over assignment operators and comaprison operators.

**`+`**: used to add numeric values together. Also used to join two strings together.

> **_Note_** | in mathematical operators, division (`/`) has a higher precedence than plus and minus.

### **Assignment operators**

**`=`**: used to assign values to variables or to mutate variables.

**`+=` and `*=`**: used to reassign values to variables, instead of writing the two operators separately.

```js
x += 10; // x = x + 10
x *= 10; // x = x * 10
```

**`x++` and `x--`**: used to increase the numeric value of a variable by one.

```js
x++; // x = x + 1
x--; // x = x - 1
```

### **Comparison operators**

These operators are used to produce boolean values. These operators include `>`, `<`, `>=`, `<=`, `==`, `===`.

Comparison operators can be used along with assignment operators to store the boolean result in a variable. They can also be used along with mathematical operators.

```js
const isFullAge = age >= 18;
console.log(now - 1992 > now - 2018);
```

> **_Note_** | the strict equality operator (`===`) checks the value and the value type, so it does not perform type coercion. The loose equality (`==`), however, does type coercion.

```js
console.log(18 === 18); // true
console.log(18 === "18"); // false
console.log(18 == "18"); // true
```

### **Boolean logic**

Boolean logic uses true and false values to solve complex logical problems. It does so by combining true and false values using logical operators.

The most basic and important logical operators are **`&&` (AND)**, **`||` (OR)**, **`!==` (NOT)**.

## **Control structures**

### **if/else statement**

```js
if (condition) {
  // code block
} else {
  // code block
}
```

### **switch statement**

```js
switch(variable) {
  case <value>:
    // code
    break
  case <value>:
    // code
    break
  default:
    // code
}
```

### **Ternary operator**

```js
return condition ? value : value;
```

### **Loops**

This is a funcdamental aspect of every programming language. It allows us to automate repetitive tasks.

#### **The `for` loop**

The for loop syntax starts with the `for` keyword followed by `()`. This is the **for** loop statement. The loop statement contains 3 parts separated with a `;` character:

1. The inital value of a **counter variable** that will just be defined using `let`. It can be any number, but it usually starts at 0 or 1.
2. **Logical condition** that will be evaluated before each iteration of the loop, so before each time that the code in the loop is executed. Therefore, the for loop will keep runing while this condition is true.
3. **updating the counter** value. We usually increment the counter value by 1 after each iteration of the loop.

```js
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}
```

> **_Note_** | notice how the `rep` variable is accessible in the `for` loop code block.

> **_Note_** | there are some situations when we would need to exit the current iteration of the loop or even exit the whole loop. For these situations we can use `continue` and `break` respectively.

```js
const arr = [1300, 500, 200, 150, 340, 650, 800];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] < 300) continue; // if the current element value is less then 300, it will skip this iteration and not log the value to the console.
  console.log(arr[i]);
}

//or

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 1000) break; // if the current element value is greater than 1000, it will terminate the whole loop and not go to the next iteration.
  console.log(arr[i]);
}
```

#### **The `while` loop**

This is mostly used when we want to implement a loop that needs no counter variable. This is particularly useful when we don't know how many loops are needed before achieving a desired result.

We can still implement loops with counter variable using the `while` loop. Unlike the `for` loop, we can only specify a condition in a `while` loop. To use the `while` loop to implement a loop with a counter, we must define the counter variable outside the loop. We also have to update this counter manually at the end of each loop.

```js
let rep = 1;
while (rep <= 10) {
  console.log(`Lifting weights repetition ${rep}`);
  rep++;
}
```

As mentioned above, a `while` loop can also be used in situations where the looping action is not based on a counter variable.

```js
let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
  console.log(`Dice: ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log(`finally a 6!`);
}
```

#### **The `for-of` loop**

Introduced in ES6, allows us to loop over arrays in a new way. This will automatically loop over the entire array, and in each iteration, it gives us access to the current array element (`friend` in the example below).

```js
const friends = ["Hooman", `Amirhossein`, `Behzad`, `Maryam`];

for (const friend of friends) {
  console.log(friend);
}
```

> **_Note_** | `continue` and `break` keywords can be used in this loop.

> **_Note_** | in order to have access to the current element's index in this loop, we would have to use the `.entries()` method on the array over which we are looping.

```js
for (const friend of friends.entries) {
  console.log(friend);
  // [0, 'Hooman']
  // [1, 'Amirhossein']
  // ...
}
```

## **Statements and Expressions**

An expression is a piece of code that produces a value. For instance, `3 + 4`, `2003`, or `true && false` are expressions.

A statement is a bigger piece of code that is executed and does not produce a value on itself. For instance, an if/else code block is a statement.

We write our programs as a sequence of actions, and these actions are statements. Basically whenever something ends with a semicolon, it is a statement.

JavaScript expects statements and expressions in different places. For example, in a template literal, we can only insert expressions, but not statements.

## **Strict mode**

# **JavaScript behind the scenes**

Here is a list of JavaScript features which kind of forms the whole definition of the language:

- **High-level:** JavaScript has a layer of abstraction that takes hardware management away from us.
- **Prototype-based object-oriented:** almost everything in JavaScript are objects. Each of these objects inherit certain methods from their prototypes. Refer to [object-oriented programming](#object-oriented-programming).
- **Multi-paradigm:** a paradigm is an approach of structuring our code, which directs the coding style and technique. Three popular paradigms are **procedural**, **object-oriented**, and **functional** programming. JavaScript supports all of these.
- **Interpreted or just-in-time compiled:** JavaScript syntax needs to be converted into machine code. Refer to...
- **Dynamically-typed:** We don't need to define data types as we declare variables. We also don't need to change data types when we mutate variables.
- **Garbage-collected:** Automatically removes old, unused objects from the computer memory. One of the powerful tools that takes memory management away from us.
- **With first-class functions:** functions are treated as variables. We can pass them into other functions, and return from functions. This allows us to use functional programming in JavaScript.
- **Single-threaded:** JavaScript runs in one single thread, meaning that it can only do one thing at a time. A thread is a sequence of instructions executed in the CPU. If one of the instructions is a long-running task (like fetching data from a server, or a timer), it would block our single thread. So we would need a way of taking it out of this thread, and process it somewhere else (Web API environment of the browser runtime), thus the non-blocking event loop.
- **Non-blocking event loop concurrency model:** concurrency model means how JavaScript engine handles multiple tasks hapenning at the same time. The event loop takes long-running tasks, executes them in the Web API environment, and when they are done, it takes their callback functions from the callback queue and puts them in the main thread so they can be executed.

> **_Note_** | The callback queue also contains callbacks coming from DOM event. Although DOM events are not asynchronous behavior, they still use the callback queue to run the callbacks attached to them. So for example, when a click happens on a button with an event listener attached to it, the associated callback function will be put in the callback queue, waiting to be executed by the event loop.

## **JavaScript runtime and engine**

A JavaScript runtime is like a big box that includes all the things we need in order to use JavaScript in a browser. The heart of any JavaScript runtime, is the JavaScript engine. In addition to the engine, JavaScript runtime includes Web APIs. A runtime also includes a callback queue.

A JavaScript **engine** is a program that executes JavaScript code. There are a lot of steps in doing so. Every browser has its own JavaScript engine, but the most well-known engine is Google's **V8**. Let's dive deeper into the engine's structure.

### **JavaScript runtime**

As mentioned above, a JavaScript runtime includes:

1. **JavaScript engine**
2. **Web APIs:** include DOM, timers, fetch API, Geolocation and many more. Web APIs are functionalities provided to the engine, but are not part of the JavaScript language itself. JavaScript has access to these APIs through the **global window object**.
3. **Callback quque:** It is a data structure containing all the callback functions attached to certain events and other asynchronous behavior. Once those events are emited or once an asynchronous behavior is done, callback functions attached to them will be inserted into the callback, so that the event loop will take them and put them into the call stack in order to be executed. For instance, when image source attribute loading is done, a _load_ event is emited and the callback queue attached to this event will be put into the callback queue.

> **_Note_** | Although DOM events are not asynchronous behavior, they still use the callback queue. So for example, we attach event listeners to DOM elements to react to certain events like a click. The reaction itself is defined as a callback function. When the event occures, the callback function is put in the callback queue. Then when the engine's call stack gets empty, the callback function is passed into the call stack where it will be executed. The execution is done by the **event loop**.

4. **Microtasks quque:** It is another callback queue which is only concerned with callbacks (microtasks) associated with promises. This queue has priority over the callback queue, meaning that after each tick, the event loop will check this queue if there are any callbacks ready to be executed. If there are, all callbacks in this queue will be executed before going back to the callback queue.

> **_Note_** | JavaScript can also run outside the browser. If that is the case, for example with NodeJS, the JavaScript runtime will no longer have the web APIs, simply because these are provided by the browser. Instead, we have multiple C++ bindings and a **thread pool**.

### **JavaScript engine**

Every JavaScript engine contains a **call stack** and a **heap**.

- **Call stack:** this is where our code is executed using [**execution contexts**](#execution-contexts-and-the-call-stack). There is one global execution context for top-level code, and one execution context for each function call. In a real-world program, there are hundreds of execution contexts. These execution contexts are stacked on top of each other in the call stack. So the call stack is actually what helps the JavaScript engine to keep track of the order in which functions are called, and also to know where it currently is in the execution. Execution starts from the global execution context, and each function call will stack another execution context on top of it and pause the previous execution context. Once one execution context is finished running, it will be removed from the stack, and execution will go back to the previous execution context that was paused. This process is kept on until there is nothing left in the call stack except the global execution context. The global execution context will remain there until the whole program is finished, for instance, when we close the browser.
- **Heap:** this is an unstructured memory pool, which stores all the **objects** that our application needs.

### **Just-In-Time compilation of JavaScript**

As a JavaScript code enters the engine, there are some steps ahead of this code:

1. The code is parsed: the code is parsed into **AST** which stands for Abstract Syntax Tree. It involves first splitting up each line of code into pieces that are meaningful to the language, and saving all these pieces into the tree in a structured way. It also involves checking for any syntax errors. This tree will later be used to generate the machine code.
2. The AST is compiled into **machine code**.
3. The machine code gets **executed** right away because of [**Just-In-Time compilation**](#compilation-vs-interpretation-vs-jit-compilation). This execution step happens in the engine's call stack.
4. Optimization strategies are carried out. Up to the 3rd step above, a very unoptimized version of machine code is produced, so that the program can start executing as fast as possible. Afterwards, in this 4th step, the machine code gets optimized and recompiled while the program is already running. This can be done multiple times, and each time, the unoptimized code is swept away and replaced by the more optimized code. This makes modern JavaScript engine like V8 so fast.

> **_Note_** | all these 4 steps happen in special threads of the engine that we cannot access from our code. It is completely separated from the main thread where our code is being executed.

#### **Compilation vs. Interpretation vs. JIT compilation**

The computers CPU only understands 0s and 1s. So any computer program ultimately needs to be converted into machine code. This is done through **compilation** or **interpretation**.

- Compilation: The entire source code is converted into machine code at once. The machine code is then written into a portable file that can be executed on any computer. So there are 2 steps here:

  - **Compilation:** machine code is built
  - **Execution:** machine code is executed in CPU. This step can happen way after the source code was compiled.

- Interpretation: There would be an interpretter that runs through the source code and executes it line by line. So there is only one step involved here which is execution line by line. The point is that the conversion of source code into machine code is done just before the execution.

> **_Note_** | JavaScript used to be a purely interpretted language. The problem with interpretted languages is that they are much slower than compiled languages. However, low performance is no longer acceptible today. Modern JavaScript now uses a mixture of compilation and interprettation which is called Just-In-Time compilation.

- **JIT compilation**: This approach compiles the entire code into machine code and executes it right away. So we still have the two steps, but there would be no portable file to be executed later. It executes right away.

### **Execution contexts and the call stack**

First of all, JavaScript code always runs inside an execution context. An execution context is an environment that stores all the necessary information for some code to be executed, such as local variables, arguments passed into a function, etc.

Let's now see what exactly happens when our code is executed. So after our code is finished compiling, we have these steps for execution:

1. As the first stage of execution, a **global execution context** is created for top-level code. Top-level code is code that is not inside any function. Obviously, functions should only be excuted when they are called. In any JavaScript project, there is only one global execution context. It is always there.
2. The global execution context is put into the call stack, and top level code is executed, also functions are declared so that they could be called later.
3. Functions are now executed and the program waits for callback functions. For each function call, one execution context is created. This execution context will contain all the necessary information for executing exactly that function.

All these execution contexts together, make up the call stack. When all functions are executed, the engine will keep waiting for callback functions to arrive. For instance, a callback function attached to a click event.

### **Execution context structure**

Inside an execution context we have:

1. **Variable environment object:** it contains

   - `let`, `const`, and `var` declarations inside and outside function.
   - functions
   - `arguments` object

2. **Scope chain:** makes it possible for the function to have access to variables declared outside the function
3. **`this` keyword**

> **_Note_** | the content of an execution context is created in the **creation** phase, which is right before execution. This is also the phase where hoisting happens.

> **_Note_** | execution contexts of arrow functions don't get their own `this` keyword and `arguments` object. Instead, they will use `this` and `arguments` of their closest regular function parent.

#### **Scope and the scope chain**

Scope is an environment in which a certain variable is declared. In case of functions, the scope is basically the variable environment. There are 3 types of scopes:

- **Global scope:** outside of any function or code block. Variables declared in global scope are accessible everywhere. They are also called global variables.
- **Function scope:** also called **local scope**. Each function, no matter it is function declaration, expression or arrow function, has its own scope. Variables declared in a function are only accessible inside the function, not outside.
- **Block scope:** starting in ES6, code blocks `{}` (for exmple, of if statements or for loops) also create scopes. Variables declared inside blocks are not accessible from outside the block. Note that this only applies to variables declared with `let` and `const`. So variables declared with `var` in a block, will be accessible outside the scope, so from an outer function scope or the global scope. Also note that functions are also block scoped in `strict` mode.

Scoping determines how our program variables are organized and accessed. Scoping is controlled by the placement of functions and code blocks in our program. This is called **lexical scoping**. For instance, a function defined in another function, has access to the variables of the parent function.

The scope of a variable is the entire region of our code that a certain variable can be accesed.

##### **Scope chain**

Every scope has access to all the variables from its **parent scopes**. If one scope needs to use a certain variable, but cannot find it in the current scope, it will look up in the scope chain to find it in one of the parent scopes.

> **_Note_** | a certain scope will never have access to variables inside child scopes. Also sibling scopes don't have access to each other's variables.

#### **Variable environments: hoisting and TDZ**

**Hositing** is the mechanism that makes some types of variables accessible before they are actually declared in the code. The mechanism actually involves scanning the code before execution. This scanning process looks for variable declarations, and for each variable, a new property is created in the **variable environment object**. This happens during the **creation phase** of the execution context.

Let's now take a look at how hoisting behaves with different types of variables:

| Type                            | Hoisted?                                         | Initial value         | Scope    |
| ------------------------------- | ------------------------------------------------ | --------------------- | -------- |
| function declarations           | yes                                              | actual function       | block    |
| `var` variables                 | yes                                              | undefined             | function |
| `let` and `const` variables     | no                                               | TDZ <`uninitialized`> | block    |
| function expressions and arrows | depends if defined with `let`, `const`, or `var` |

> **_Note_** | TDZ for a `let` or `const` variable starts from the beginning of the scope until the line where the variable is actually declared. TDZ was introduced to JavaScript in ES6, in order to make it easier to avoid and catch errors. Accessing variables before declaration is bad practice and should be avoided. TDZ also makes `const` variables behave as they do.

> **_Note_** | Hoisting was implemented in JavaScript in order to make it possible to use functions before they are declared. This is essential for some programming techniques such as **mutual recursion**.

#### **The `this` keyword**

It is a special variable that is created for every execution context (every function). It refers to the **owner** of the function in which the `this` keyword is used.

Note that the value of `this` is not static. It depends on how the function is called, and its value is only assigned when the function is actually called.

The `this` keyword in different ways of calling functions:

1. function called as a method: `this` = object that is calling the method
2. function called normally: `this` = undefined (only in strict mode, otherwise refers to global `window` object)
3. [Arrow functions](#arrow-functions): `this` = `this` of the parent function (lexical `this`)
4. function called as event listener: `this` = the dom element that the handler is attached to.
5. calling function with `new`, `call`, `apply`, `bind`:

> **_Note_** | The `this` keyword never points to the function itself, it also never points to the function's variable environment.

#### **The `arguments` keyword**

Regular functions (function delcarations and expressions) have access to the `arguments` keyword. This keyword holds an array of the arguments passed into a function. We can inspect them inside the scope of a function. Even if passing more parameters than a function can accept, the arguments will still be stored in the `arguments` array.

Arrow functions do not have access to this keyword. If we attempt to inspect it, an error would be returned telling us that the keyword is not defined.

# **Functions**

A function is a piece of code that we can use over and over in our code. It is a bit similar to a variable, but while a vairable holds a value, a function can hold one or more complete lines of code. So functions help us write more maintainable code and follow the DRY principle.

Functions can receive and return data. They receive data as **arguments**, do some process on it, create some new data, and then `return` the new data. Note that functions do not necessarily have to receive arguments, and they do not necessarily have to return anything.

In practice, we first define functions, and then call, run, or invoke them whenever we need them.

## **Defining functions**

### **Function declarations**

We simply use the `function` keyword and then set a name to declare a function.

```js
function calcAge1(birthYear) {
  return 2037 - birthYear;
}
```

> **_Note_** | Although, it is generally not recommended, we can call function declarations even before they are defined in the code. This is becasue function declarations or [**hoisted**]().

### **Function expressions**

First remember that expressions are pieces of code that produces values. Now to define a function expression, instead of writing a name for the function, we store the function in a variable, so we then have to give the variable a name:

```js
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
```

> **_Note_** | the function defined here is also called an **anonymous function**.

> **_Note_** | using function expressions or function declarations is oftentimes just a matter of personal preference. Using function expressions will inevitably lead to cleaner and more structured code writing.

### **Arrow functions**

Arrow functions were introduced to JavaScript in ES6. Arrow functions are simply a special form of function expressions. It is just shorter and therefore, faster to write.

This is how we define arrow functions:

```js
const calcAge3 = (birthyear) => {
  return 2037 - birthYear;
};
```

> **_Note_** | in case the functionality only contains one line of code, it is not necessary to put it inside `{}`, and you will then be able to omit the `return` keyword.

> **_Note_** | The execution context of an arrow function does not get its own `this` keyword and `arguments` object. Instead, it will use `this` and `arguments` of its closest regular function parent. Refer to **lexical `this`**.
>
> This special feature of arrow functions make them especially useful in situations where we need to use a function inside an obejct method, and we need the `this` keyword to point to the object. So we will implement the inner function as an arrow function, so that its `this` keyword will get the `this` keyword of its parent function, which in turn refers to the object.

```js
const calcAge3 = (birthYear) => 2037 - birthYear;
```

## **Calling functions**

No matter a function is defined as a function declaration or a function expression or even an arrow function, to call the function, we write the name of the function declaration or the name of the variable of the function expression with `()` at the end. If the function receives arguments, we can pass them into the `()`.

To call the functions from the code example above:

```js
calcAge1(1992);
calcAge2(1992);
```

We can capture the returned value of the function by calling the function and storing its result in a variable:

```js
const age1 = calcAge1(1992);
const age2 = calcAge2(1992);
```

# **Data structures**

## **Arrays**

An array acts a container into which we can store variables and then reference them.

We have two ways of defining an array:

```js
const friends = ["masoud", "amirhossein", "behzad"];
// or
const friends = new Array("masoud", "amirhossein", "behzad");
```

> **_Note_** | an array can hold as many values as we want, and also of any type that we need. It is even possible to insert an expression, a variable containing a value, or another array as an element.

### **Retrieve elements from array**

In order to retrieve an element from an existing array we can use the bracket notation with the index of the required element in it.

```js
console.log(friends[0]);
```

> **_Note_** | inside the bracket we can insert any **expression**. Remember that expression is anything that can produce a value. We canno put a **statement** here.

> **_Note_** | a new array method (`.at()`) was introduced in ES2022 that enables us to retrieve elementes in another way. This method can also count the elements index from the end using negative indexes. Getting the last element with this method requires `-1` as the index passed into it. This method is particularly useful when we want to do method chaining, or just retrieve elements from the end of an array.

```js
const arr = [1, 2, 3];
console.log(arr.at(0)); // 1
console.log(arr.at(-1)); // 3
console.log(arr.at(-2)); // 2
```

### **Mutate elements of array**

The bracket notation also allows us to mutate array elements.

```js
friends[2] = "maryam";
```

> **_Note_** | this works becasue an array is not a primitive value. Remember that primitive values declared with `const` are immutable. However, we cannot replace (redefine) the entire array.

### **Length of array**

Length of an array is the number of elements that the array holds in it. We can access this value with the `length` property of the array.

```js
console.log(friends.length); // not zero-based
```

> **_Note_** | This can be useful when we want to retrieve the last element of an array.

```js
console.log(friends[friends.length - 1]);
```

### **Array methods**

There are many array methods that we can attach to arrays in order to perform some operations on them.

#### **Add elements**

**`.push()`**: adds elements to the end of an array.

- Receives one argument: data of any type that should be added to the array.
- Returns the `length` of the updated array. (We rarely use this value).

**`.unshift()`**: adds elements to the beginning of an array.

- Receives one argument: data of any type that should be added to the array.
- Returns the `length` of the updated array. (We rarely use this value).

#### **Remove elements**

**`.pop()`**: removes the last element of an array.

- Receives no argument.
- Returns the removed element.

**`.shift()`**: removes the first element of an array.

- Receives no argument.
- Returns the removed element.

#### **Find elements**

**`.indexOf()`**: finds the index of a certain element in the array.

- Receives the element value.
- Returns the element's index (zero-based). If there is no such element, returns `-1`.

**`.find()`**: retrieves one element of an array based on a condition.

- Does NOT mutate the original array.
- Receives a callback function that is called in each iteration in order to check the current element with the condition.
- Returns the first element in the array that satisfies the condition. (unlike `.filter()` the returns a new array of all the elements that satisfy the condition)

```js
const movements = [200, 450, -400, 3000, 650];
const firstWithdrawal = movements.find((mov) => mov < 0);
```

**`.findIndex()`**: works almost the same way as `.find()`.

- Does NOT mutate the original array.
- Receives a callback function that is called in each iteration in order to check the current element with the condition.
- Returns the index of the first element in the array that satisfies the condition.

```js
const movements = [200, 450, -400, 3000, 650];
const firstWithdrawal = movements.findIndex((mov) => mov < 0);
```

#### **Check element existence**

**`.includes()`**: Checks through _strict equality_ if a certain element exists in the array.

```js
const movements = [200, 450, -400, 3000, 650];
console.log(movements.includes(-400)); //true
```

- Receives the element value.
- Returns boolean.

**`.some()`**: Checks whether there is **any element** in an array that satisfy a given condition.

- Receives a callback function where the condition is defined.
- Returns boolean.

```js
const movements = [200, 450, -400, 3000, 650];
console.log(movements.some((mov) => mov > 500)); //true
```

**`.every()`**: Checks whether **all elements** of an array satisfy a given condition.

- Receives a callback function where the condition is defined.
- Returns boolean.

```js
const movements = [200, 450, -400, 3000, 650];
console.log(movements.every((mov) => mov > 500)); //false
```

#### **Looping over arrays**

We can use the `for` loop to loop over arrays.

```js
const arr = [1300, 200, -340, -650];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

However, there are much better ways to loop over arrys. We can use special array methods:

**`.forEach()`**: used to loop over an array. It receives a callback function in order to tell it what to do. So it is the `forEach()` method that will call the callback function, not us. The method loops over the array and in each iteration, it will call the callback function.

- Receives a callback function as argument.
- Callback has access to: 1) current element of array, 2) current element's index, 3) the entire array that is being looped over. (order matters)

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${mov}`);
  }
});
```

> **_Note_** | unlike for-of loop, we cannot break out of a `forEach` loop. Once it starts, it will go to the end. We cannot use `continue` and `break` in a `forEach` loop.

##### **Data transformation methods**

There are 3 important array methods to perform data transformations, the results of each are always stored in new arrays.

**`.map()`**: yet another method, used to loop over arrays. As it loops over the array, in each iteration, it calls a callback function passed into it.

- Does NOT mutate the original array.
- Receives a callback function.
- Callback has access to: 1) current element of array, 2) current element's index, 3) the entire array that is being looped.
- Returns a new array based on an operation that it does on the original array. The value that is returned by the callback function in each iteration will be pushed to the new array.

```js
const movements = [200, 450, -400, 3000, 650];
const movementsUSD = movements.map((mov, i, arr) => mov * 1.1);
```

**`.filter()`**: used to filter elements in the original array that satisfies a condition that is checked by a callback function that we pass into the method.

- Receives a callback function.
- Callback has access to: 1) current element of array, 2) current element's index, 3) the entire array.
- Returns a new array including the elements that satisfy the condition that is checked by the callback function that we pass into the method.

```js
const movements = [200, 450, -400, 3000, 650];
const deposites = movements.filter((mov, i, arr) => mov > 0);
```

**`.reduce()`**: used to boil down all the elements of an array into one single value. This is usually used to calculate totals, averages, etc. of elements stored in an array.

- Receives two arguments: a callback function and the starting number for the accumulator variable.
- Callback has access to: 1) accumulator variable, 2) current element, 3) current element's index, 4) the entire array.
- Returns a single value.

```js
const movements = [200, 450, -400, 3000, 650];
const balance = movements.reduce((acc, mov, i, arr) => {
  return acc + mov;
}, 0);
```

#### **Other array methods**

**`.slice()`**: extracts a slice of any array, without chainging the original array.

- Does NOT mutate the original array.
- Receives either 1 or 2 arugments: in either case, the first argument will be the starting index for slicing. The element related to the starting index will be included in the slice. If there is a second argument, it would be the ending index of the slice, which will not be included in the slice. Inserting one negative index will start slicing from the end of the array. Negativa and positive indexes can be used together as the starting and ending indexes.
- Returns a new array with the slice part extracted from the original array.

```js
let arr = ["a", "b", "c", "d", "e"];
console.log(arr.slice(2)); // ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // ['c', 'd']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(1, -2)); // ['b', 'c']
```

> **_Note_** | it is also possible to create shallow copies with the slice method. Just use it with no index.

```js
const arrCopy = arr.slice();
```

**`.splice()`**: works very similar to `.slice()`, but actually mutates the original array. The extracted elements will be gone from the original array.

Use case: when we want to delete a specific element from the array. (`.splice(<index>, 1)`)

- Mutates the original array
- Receives either 1 or 2 arugments: first the starting index and then the delete count.
- Returns a new array with the slice part extracted from the original array. But we are usually not interested in what it returns, we just need its deletion operation to be performed on the original array.

```js
let arr1 = ["a", "b", "c", "d", "e"];
arr.splice(2); // arr1 = ['a', 'b']

let arr2 = ["a", "b", "c", "d", "e"];
arr.splice(1, 2); // arr2 = ['a', 'd', 'e']
```

**`.reverse()`**: reverses the order of elements in an array. It mutates the original array.

- Mutates the original array
- Receives no argument.
- Returns the same array after its elements being reversed.

```js
let arr = ["a", "b", "c", "d", "e"];
console.log(arr2.reverse());
```

**`.concat()`**: used to concatenate two arrays.

- Does NOT mutate the original array
- Receives the other array that should be attached to the array that the method is called upon.
- Returns a new array.

```js
let arr1 = ["a", "b", "c", "d", "e"];
let arr2 = ["f", "g", "h"];
const letters = arr1.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
```

**`.join()`**: used to join the elements of an array.

- Does NOT mutate the original array.
- Receives a character which will be inserted between the elements as they are joined together as a whole string.
- Returns a string.

**`.flat()`**: Introduced in ES2019, will flat a nested array for a specified depth.

- Does NOT mutate the original array.
- Receives one arguments: flatening level. If left empty, default is 1.
- Returns a new array.

```js
const arr = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arr.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8];
```

**`.flatMap()`**: Introduced in ES2019, executes `.map()` and then `.flat()` method on a given array of elements. Since the execution sequence is a pretty popular one, the method was introduced to perform it in one go.

> **_Note_** | The flatening operation can go only 1 level deep and we cannot increase it.

- Receives the callback function that we would normally pass into the `.map()` method.
- Returns a new flattened array.

**`.sort()`**: used to sort elements of an array based on a sorting logic implemented in a callback function that is passed into the method. If no callback is passed into the method, it can only be used to sort string values in an array, not numbers.

- Mutates the original array.
- Receives a callback function where the sorting logic is implemented.
- Returns the original array with its elements sorted.

```js
const owners = ["omid", "ali", "saber", "nasrin"];
console.log(owners.sort());
```

For sorting arrays with numbers, the callback function will have 2 arguments as 2 consecutive elements of the array in each iteration. In each iteration, if the callback returns a positive value, `a` will be positioned before `b`. If the callback returns a negative value, `a` will be positioned after `b`.

```js
const movements = [200, 450, -400, 3000, 650];
movements.sort((a, b) => {
  // for ascending order
  if (a > b) return 1;
  if (a < b) return -1;

  // for descending order
  if (a > b) return -1;
  if (a < b) return 1;
});
```

> **_Note_** | this works with both numbers and strings. However, if we are attempting to sort numbers, the logic above can be simplified as:

```js
const movements = [200, 450, -400, 3000, 650];
movements.sort((a, b) => {
  // for ascending order
  return a - b;

  // for descending order
  return b - a;
});
```

### **Destructuring arrays**

Destructuring is an ES6 feature allowing us to unpack values from an array or an object into separate variables.

Whenever JavaScript detects `[]` on the left side of the equal sign, it knows that it should perform destructuring.

```js
const arr = [2, 3, 4];

const [x, y] = arr;
console.log(x, y); //2 3

const [a, , c] = arr;
console.log(a, c); //2 4
```

> **_Note_** | Attempting to retrieve more variables than the actual length of the array will result in `undefined`. However, we can prevent producing an `undefined` value by definging default values.

```js
const arr = [2, 3];

const [a = 1, b = 1, c = 1] = arr;
console.log(a, b, c); //2 3 1
```

> **_Note_** | the original array is not destroyed with destructuring.

### **Spread operator for arrays**

Spread operator is used to expand an array into its elements. It is usually used when we want to create a new array based on a previous array, but the new array is intended to have some determined elements and then include all the elements of the previous array.
So the spread operator (`...`) will take out the elements of an array and automatically write its elements with a comma between them, just as we would do manually.

**In other words:** we use the spread operator whenever we would otherwise write multiple values separated by commas.

> **_Note_** | spread operator works on all iterables. Iterables in JavaScript include arrays, strings, maps, and sets, but not objects.

> **_Note_** | the `...` syntax is considered by JavaScript as the spread operator if it is used on the right side of the equal sign. If it is on the left side of the equal sign, it will be considered as the **rest pattern**, which would usually be used together with the destructuring syntax. Also this syntax would be considered as the rest pattern if it is used in defining the arguments of a function.

Use cases:

1. when we want to rewrite the elements of an array in a new array, and

```js
const arr = [7, 8, 9];
const newArr = [5, 6, ...arr];
console.log(newArr); // [5, 6, 7, 8, 9]
```

2. when we want to pass multiple arguments into functions.

```js
const arr = [1, 2, 3];
const calcAvg = function (val1, val2, val3) {
  const avg = (val1 + val2 + val3) / 3;
};

calcAvg(...arr);
```

3. create shallow copies of arrays.

```js
const menuCopy = [...restaurant.mainMenu];
```

4. Join two or more arrays.

```js
const wholeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
```

### **Rest pattern in arrays**

The rest pattern looks exactly like the spread operator, but it does the opposite. Rest pattern is used to condence or pack multiple elements into one array. The rest pattern is usually used together with the destructuring syntax.

**In other words:** we use the rest pattern whenever we would otherwise write multiple variable names separated by commas.

Use cases:

1. to destructure multiple elements from the beginning of an array into new variables and leave all the _rest_ in another variable. In this use case, the rest pattern should be the last element of the destructuring syntax.

```js
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(others); // [3, 4, 5]
```

1. to pass multiple arrguments into a function, and also make the function ready to receive any arbitrary amount of arguments. This works because the rest pattern will pack any number of values into an array, and then the function would have to be programmed to work on the array in order to produce a desired result:

```js
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[1];
};

add(2, 3);
add(5, 3, 6, 2);
```

This situation can be used together with the same use case of the spread operator.

```js
const numbers = [2, 5, 5, 6, 3, 5, 3];
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[1];
};

add(...numbers);
```

## **Objects**

Objects are the most fundamental concept in the whole JavaScript language.

In arrays there is no way of giving names to elements. So we are not able to reference them by a name, but only with their index number. Objects, however, provide this option.

In objects we define key-value pairs. So each value will have a key (property) that can be referenced by it.

There are multiple ways of creating objects. This is the object literal syntax:

```js
const omid = {
  name: "omid",
  age: 2037 - 1992,
  job: "developer",
  friends: ["amirhossein", "behzad", "maryam"],
};
```

After defining the object, we can still add key-value pairs to it using the dot notation:

```js
omid.location = "iran";
```

### **Retrieve data from object**

Unlike arrays, the order of properties does not matter when we want to retrieve them. To retrieve data from an object we have two ways:

- Dot notation:

```js
console.log(omid.name); //omid
```

- Bracket notation: the bracket notation can receive any expression in it. We don't need to explicitely write the property name as a string. We can generate it programmatically with an expression.

```js
console.log(omid["name"]); //omid
```

> **_Note_** | when we try to retireve a property that does not exist in an object, we receive `undefined`. This implies that we can, in a sense, remove a property from an object by setting it to `undefined`.

### **Object methods**

Since functions are yet another type of values in JavaScript, we can add functions as key-value pairs to objects. Functions defined in objects are also called **methods**.

```js
const omid = {
  name: "omid",
  birthYear: 1992,

  // can only insert function expression, not function declaration
  calcAge: function () {
    this.age = 2037 - this.birthYear;
  },
};

omid.calcAge();
// or
omid["calcAge"]();
```

> **_Note_** | `this` refers to the object that is calling the method.

### **Destructuring objects**

Destructuring is an ES6 feature allowing us to unpack values from an array or an object into separate variables.

Whenever JavaScript detects `{}` on the left side of the equal sign, it knows that it should perform destructuring objects.

```js
const omid = {
  name: "omid",
  age: 2037 - 1992,
  job: "developer",
  friends: ["amirhossein", "behzad", "maryam"],
};

const { name, age, job } = omid; //variable names should match the exact property names of the object
```

> **_Note_** | we can rename variables as we create them in destructuring:

```js
const { name: fullname, age, job: occupation } = omid;
```

> **_Note_** | Attempting to retrieve variables that don't exist in the object will result in `undefined` value. However, we can set default values just like with array destructuring. Notice that we can both rename and provide default value at the same time.

```js
const { name, age, job, location: country = "iran" } = omid;
```

> **_Note_** | to destructure nested objects we nest the destructuing syntax like this:

```js
const restaurant = {
  name: 'italiano';
  openingHours: {
    fri: {
      open: 12,
      close: 23,
    }
  }
}

const {
  fri: { open, close },
} = restaurant.openingHours;
// renaming and default values also work in this case
```

> **_Note_** | we can destructure an object immediately as we receive it in a function. Default values can be set here also.

```js
const restaurant = {
  name: 'italiano';
  openingHours: {
    fri: {
      open: 12,
      close: 23,
    }
  }

  orderDelivery: function({starterIndex, mainIndex, time, address}) {
    console.log(starterIndex, mainIndex, time, address);
  }
}

// This way the function is ready to receive an object as an argument. In order for the function to be capable of performing its process, the object passed into it needs to include the property names defined in the function expression above.

restaurant.orderDelivery({
  time: '20:45',
  address: 'Ahmad Abad St.',
  mainIndex: 2,
  starterIndex: 3,
})
```

### **Spread operator for objects**

Since ES2018 spread operators can operate on objects although objects are not iterables.

```js
const newRestaurant = { ...restaurant, founder: "Philipo", foundedIn: 1998 };
```

We can also create shallow copies of objects:

```js
const restaurantCopy = { ...restaurant };
```

### **Rest pattern in objects**

The rest pattern looks exactly like the spread operator, but it does the opposite. Rest pattern is used to condence or pack multiple elements into one object.

Use cases:

1. to destructure multiple properties of an object and then pack them into a new object and leave all the _rest_ in another object.

```js
const { sat, ...weekDays } = restaurant.openingHours;
```

## **Sets**

Introduced in ES6, it is a collection of unique values. Its main use case is to remove duplicate values from arrays.

### **Creating sets**

To create a set, we use the `new` operator with the `Set` constructor. We then pass an iterable (array, string, etc.) into the constructor. If the iterable contains duplicate values, the constructor will remove them and only keep one.

```js
const rolesSet = new Set(["user", "user", "author", "admin", "admin"]);
console.log(roleSet); // {'user', 'author', 'admin'}
```

> **_Note_** | Just like arrays, sets are iterables. Unlike arrays, however, the order of elements in a set does not matter.

#### **Set properties and methods**

**Property `size`:** To inspect the set's size.

```js
console.log(rolesSet.size); // 3
```

**Method `.has()`:** To check if an element exists in a set.

```js
console.log(rolesSet.has("user")); // true
```

**Method `.add()`:** To add an element to a set.

```js
rolesSet.add("editor");
```

**Method `.delete()`:** To delete an element from a set.

```js
rolesSet.delete("author");
```

**Method `.clear()`:** To clear all elements of a set.

```js
rolesSet.clear();
```

> **_Note_** | Since sets are iterables, we can loop over them using the `for/of` loop.

> **_Note_** | The spread operator (`***`) works on sets.

```js
const roles = ["user", "user", "author", "admin", "admin"];
const rolesUnique = [...new Set(roles)];
```

> **_Note_** | There is no way of retrieving a certain value from a set. There is no point in doing so. All we need to know, is whether a certain element exists in a set or not.

## **Maps**

Introduced in ES6, it is a data structure that we can use to map values to keys, just like objects. The big difference here is that in maps, keys can have any type, even objects or arrays, while in objects, keys can only be strings. And also note that even DOM elements, which are another type of objects, can be used as keys.

### **Creating maps**

To create a map we use the `new` operator with the `Map` constructor function.

```js
const me = new Map();
```

### **Populating maps**

**`.set()`:** The method accepts two arguments: first, the key. Second, the value. The method updates the map and also returns the updated map. This allows us to chain multiple `.set()` methods.

```js
me
  .set("name", "Omid")
  .set(1, "Mashhad, Ahmadabad")
  .set(2, "Karaj, Mehrshahr")
  .set('startWork', 7);
  .set('stopWork', 20);
  .set(true, 'Working');
  .set(false, 'Not working')
```

**Passing an array into a map:** we can populate a map right when we create it. We would pass in an array of key-value pairs, each stored in another array.

```js
const me = new Map([
  ["name", "Omid"],
  [1, "Mashhad, Ahmadabad"],
  [2, "Karaj, Mehrshahr"],
  ["startWork", 7],
  ["stopWork", 20],
  [true, "Working"],
  [false, "Not working"],
]);
```

> **_Note_** | An array of arrays is actually what we get when we use `Object.entries()` on an object. This shows us that we can easily convert an object to a map.

```js
const meMap = new Map(Object.entries(meObject));
```

> **_Note_** | Maps are iterables. So we can use `for/of` to loop over them.

### **Map methods**

**`.get()`**: accepts a key, and retrieves the related value.

```js
console.log(me.get(true)); // Working
```

**`.has()`**: checks if a certain key-value pair exists in the map. Accepts a key.

```js
console.log(me.has("name")); // true
```

**`.delete()`**: deletes a key-value pair from map. Accepts a key.

```js
me.delete(true);
```

**Property `size`**: to inspect the size of a map.

```js
console.log(me.size); // 7
```

**`.clear()`**: deletes all key-value pairs from map.

```js
me.clear();
```

> **_Note_** | when inserting arrays or objects (reference types) as keys in a map, in order to be able to retrieve data based on these keys, we should store them in a variable before putting them in the map.

# **Strings**

We are going to introduce some methods and properties that are available on strings. To do so, we need to work on some examples:

```js
const airline = "TAP Air Portugal";
const plane = "A320";
```

**`[<index>]`:** used to retrieve a character at a certain position.

```js
console.log(plane[0]); // A
```

> **_Note_** | remember that spaces also count as a character, and therefore indexes are assigned to them.

**Property `length`:** used to get the length of a string.

```js
console.log(airline.length); // 16
```

## **String methods**

First of all, we should know that when we use methods on strings, behind the scenes, JavaScript will convert the string primitive to a string **object** with the same content. Then we can have access to methods. This process is called **boxing**. After the method's operation is done, the obejct is converted back to a regular string primitive.

```js
// behind the scenes
const stringObj = new String("TAP Airline Portugal");
```

### **Finding positions of characters**

**`.indexOf()`:** used to get the index of a given character. This returns the index of the first occurence.

```js
console.log(airline.indexOf("r")); // 6
```

> **_Note_** | the method can also be used to look for an entire word, not just a character. It will return the index of the starting character. Remember that this specific search will be case sensitive.

**`.lastIndexOf()`:** used to get the index of a given character. This returns the index of the last occurence.

```js
console.log(airline.lastIndexOf("r")); // 10
```

> **_Note_** | The two methods mentioned above will return `-1` if they can't find the given character or word.

### **Extract parts of strings**

**`.slice()`:** used to extract part of a string.

- Accepts two indexes as arguments, one for the starting position and one for the ending position. Remember that the character related to the ending index will not be included in the returned sliced string. If only one argument passed, that would be considered as the starting index, and slicing will be performed from that index until the end of the string.
- Returns the sliced part of the string as a new string.
- Does not mutate the original string. Strings are primitives.

```js
console.log(airline.slice(4)); // Air Portugal (sub-string)
```

> **_Note_** | passing a negative start and end index into the method will make the method count from the end of the string and perform the slicing.

```js
console.log(airline.slice(-2)); // al
```

> **_Note_** | in order not to hard-code the index value into this method, we can use it with the `.indexOf()` methods.

### **Transforming strings**

**`.toLowerCase()` and `.toUpperCase()`:** used to convert strings to lowercase and uppercase.

- Accepts no argument.
- Returns a new string.
- Does not mutate the original string.

**`.trim()`:** used to delete all white spaces from a string. `\n` is considered a white space too.

- Accepts no argument.
- Returns a new string.
- Does not mutate the original string.

```js
const trimmedEmail = email.trim();
```

> **_Note_** | there are also `.trimStart()` and `.trimEnd()` methods available.

> **_Note_** | nearly all string methods can be chained together.

```js
const normalizedEmail = loginEmail.toLowerCase().trim();
```

**`.replace()`:** used to replace parts of strings. Note that this will only replace the first occurence of the first argument.

- Accepts 2 arguments: first, the character that should be found. Second, the character that should be placed instead of the found character.
- Returns a new string.
- Does not mutate the original string.

```js
const priceUS = priceGB.replace("£", "$").replace(",", ".");
```

> **_Note_** | the method can also replace whole words, not only single characters.

**`.replaceAll()`:** used to replace parts of strings. Note that this will replace all occurences of the first argument.

**`.split()`:** used to split a string into multiple parts based on a divider string that it receives as argument.

- Accpets a divider character as argument typed as string.
- Returns an array containing multiple string elements.

```js
console.log("omid+armat+programming".split("+")); // ['omid', 'armat', 'programming'];
```

**`.join()`:** used to join string elements stored in an array into one whole string value, each separated by a separator character from the next element.

- Accepts a seperator character as argument types as string.
- Returns a new string.

```js
const name = ["Mr.", "Omid", "Armat"];
console.log(name.join(" ")); // Mr. Omid Armat
```

**`.padStart()` and `.padEnd()`:** padding means to add a number of characters to a string until the final string has a desired length. These methods add some characters to the beginning/end of any given string.

- Accepts two arguments: first, the desired length of the returned string. Second, the character that should be added until reaching the desired number of characters.
- Returns a new string.

```js
const message = "Go to gate 23!";
console.log(message.padStart(25, "+"));
// ++++++++++++++Go to gate 23!
console.log(message.padEnd(25, "+"));
// Go to gate 23!++++++++++++++
```

> **_Note_** | this method can be useful when we need to mask a series of numbers from a sensitive data, like creadit card numbers.

**`.repeat()`:** allows us to repeat a given string multiple times.

- Accpets a number as argument, determining how many times the string should be repeated.
- Returns a new string.

```js
const message2 = "Bad weather... All flights delayed... ";
console.log(message2.repeat(5));
```

### **Checking characters existence**

**`.includes()`:** used to check if a certain character exists in a given string.

- Accepts a string as argument.
- Returns boolean.

```js
console.log(plane.includes("A3")); // true
```

**`.startsWith()`:** used to check if a given string starts with certain characters.

- Accepts a string as argument.
- Returns boolean.

**`.endsWith()`:** used to check if a given string ends with certain characters.

- Accepts a string as argument.
- Returns boolean.

# **Asynchronous programming**

Asynchronous programming is all about coordinating the behavior of our program over a period of time.

Synchornous code refers to a code that is executed line by line, in the exact order that they are defined in the code. Most of the time, synchronous code is fine, but in some cases, a heavy or time-consuming task should be performed, for which the whole program would have to stop until it is finished. In such cases, we can use asynchoronous code.

We implement some functionalities to behave asynchronously. It means that we design them to perform their tasks in the background (Web API environment). When their operation is done, the callback functions attached to them will be put into the callback queue, ready to be executed.

> **_Note_** | It is important to keep in mind that callback functions associated with promises will not be inserted into the callback queue. Instead, they will be inserted into the **microtasks queue**. This queue is especially designed for promises. The microtasks queue has priority over the callback queue. At the end of an event loop tick, which means after taking a callback to the call stack and executing it, the event loop will check if there are callbacks available in the microtasks queue. If there are, it will run all of them before going to the callback queue again.
>
> If one microtask adds a new microtask, this new microtask will also be executed before running any callbacks from the callback queue. Microtasks queue can essentially starve callback queue.

Some functionalities are implemented, by default, in an asynchronous way in JavaScript. For instance, the `setTimeout()` timer does its job asynchronously. But we can also implement our own asynchronous functionalities. **Asynchronous code is normally coupled with callback functions**. It means that when the heavy task is done processing in the background, a callback function would be put into the callback queue and called. But **this does not mean that using callback functions will turn our code to an asynchronous one**.

## **JavaScript pre-defined asynchronous functionalities**

1. `setTimeout()` function.
2. Changing the `src` attribute of an image element. Once it is done, a `load` event is emited to which we can listen using an event listener.
3. Geolocation API
4. AJAX calls: stands for Asynchronous JavaScript And XML and allows us to communicate with remote web servers. With AJAX calls, we can request data from web servers dynamically.

### **AJAX calls**

AJAX calls are designed in nature to work with promises. It means that fetching data from a remote server is actually implemented as a promise. So once the data arrives, the callback function associated with it will be inserted into the microtasks queue.

There are multiple ways of doing AJAX calls.

#### **`XMLHttpRequest()`**

To perform an AJAX call in this method, we first need to create a request object.

```js
const request = new XMLHttpRequest();
```

We then have to `.open()` the request by specifying the HTTP method and the URL. Afterwards, we would have to `.send()` the request. Sending the request will start performing the asynchronous task of sending the request and waiting for the server's response. So we cannot expect the resulting data to be immediately available on the request object.

Once the response from the server arrives, which means the requested data is ready, the request object will emit a `load` event, to which we can listen. The event listener would receive a callback function that will actually be called once the `load` event is detected. Note that the actual data comming from the server will be stored on the `responseText` property of the request object.

```js
request.open("GET", "<URL>");
request.send(); // Asynchronous

request.addEventListener("load", function () {
  console.log(this.responseText); // this refers to the request object,
});
```

> **_Note_** | Data received from an API is usually in JSON format and we would probably need to convert it to meaningful JavaScript data structures before we can use them. This is done using `JSON.parse()` method.

```js
const data = JSON.parse(this.responseText);
```

#### **Fetch API**

To perform an AJAX call in this method, we create a request by calling the `fetch()` function which receives a URL. There are multiple options that can be specified in the fetch function, but to perform a simple `GET` request, we just need to pass in a URL.

If we immediately attempt to log the request result to the console, we would see a **pending promise**.

```js
const request = fetch("<URL>"); // Asynchronous
console.log(request); // Promise {<pending>}
```

## **Promises**

Promise (introduced in ES6) is an object that is used as a **placeholder** for the **future result** of an **asynchronous operation**. In more simple terms, a promise is a container for a value that would become available some time in future. Response comming from an AJAX call is the perfect example of a future value.

Using promises for asynchronous programming has 2 advantages:

- We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results.
- Instead of nesting callbacks which leads to **callback hell**, we can chain promises for a sequence of asynchronous operations.

### **A promise lifecycle**

Once a promise is created, we say the promise is **pending**. While the promise is pending, the asynchronous task is doing its job in the background. When this background task is done, we say the promise is **settled**. But settled promises have two types. If the promise has successfully resulted in the expected value, it would be a **fulfilled** promise. If an error happened during the asynchronous task in the background, the promise would still be settled, but a **rejected** one.

> **_Note_** | In the case of an AJAX call using the fetch API, the `fetch()` function will only reject a promise when the user loses their internet connection. In other cases, for example, when a bad request is sent to the server, the promise will still be considered as fulfilled, although the response will not contain the expected data. This is important to keep in mind when handling errors.

When using promises, or in other words, when we **consume** promisses, we can handle the promise's state to perform different actions. We can consume a promise if there is a promise. In the case of the fetch API, the promise is automatically created by the `fetch()` function. If there is no promise, it should first be built.

### **Working with promises**

Working with promises basically involves 1) **creating promises**, 2) **consuming promises**, 3) **handling errors** that happen during the execution of promises, etc.

#### **Consuming a promise**

We can consume a promise using either the `.then()` method along with `.catch()` error handler, or the `async` and `await` statements.

##### **Consuming with `.then()`**

In this case, we simply consume an already existing or a previously created promise by using the `.then()` method on the promise. This method accepts a callback function that has access to the response of the promise. The result is actually returned as a `response` object. Remember that the callback function will only be executed once the promise is fulfilled.

For example, when we use the fetch API to request data from a remote server, the `fetch` function returns a promise and we can consume it.

```js
const getCountryData = function (country) {
  fetch("<URL>").then(function (response) {
    console.log(response);
  });
};
```

The response object contains, in addition to the requested data, some information about the request itself, including the `status`, `ok`, `body`, etc. The actual data that we have requested is stored in the `body` property. At this stage, we cannot look at the actual data. It just says `ReadableStream`. To be able to access the data, we should call the `.json()` method on the response object. The problem is that the `.json()` method itself is an asynchronous function. So it returns another promise that should, again, be consumed using yet another `.then()` method.

```js
const getCountryData = function (country) {
  fetch("<URL>")
    .then((response) => response.json())
    .then((data) => conssole.log(data));
};
```

> **_Note_** | notice how callback functions in the `.then()` methods can be converted into simple arrow functions.

> **_Note_** | the `.then()` method always return a promise, no matter if we return anything from it or not. If we do return a value, that would be the fulfillment value of the promise that it returns. If we return a promise in the method, the fullfilment value of that promise would be the fullfilment value of the promise that the method returnes. This is particularly useful when we want to make multiple AJAX calls where one call depends on the result of the previous call. Using promises and the `.then()` method will help us avoid callback hell.

Up until this point we have only handled fullfilment values. If the promise is rejected, an error saying _Uncaught error_ will occur, and we would have to capture the error using the `.catch()` method, usually attached to the final `.then()` method. Refer to [error handling](#error-handling).

##### **Consuming with `async` and `await`**

Since ES2017, we can consume promises using `async` and `await` statements. In this syntax, we start by creating an async function. **This will make the function immediately return a promise** and start running in the background. So an async function can be consumed since what it returns is a promise. Now if the async function returns a value, that value will be the fulfilled value of the promise returned by the function.

Inside any async function, we can have one or more await statements. Await will stop the code execution at the point where it is typed until the related promise is fulfilled.

```js
const whereAmI = async function (country) {
  const response = await fetch("<URL>");
  console.log(response); // response object, containing data as ReadableStream
  const data = await response.json();
  console.log(data); // actual requested data
};
```

#### **Creating a promise**

To create a new promise, we use the `new` operator and then call the `Promise()` constructor. The Promise constructor function accepts one argument, and that is the **executor function**. The executor function is called as soon as the Promise constructor is executed. The executor has access to 2 other arguments: `resolve` and `reject` functions. Calling the resolve function in the executor will mark the promise as fulfilled, while calling the reject function will mark it as rejected. Also, the value that we pass into the resolve function will be the fulfillment value of the promise, while the value that we pass into the reject function will be the error message that will then be accessible in the `.catch()` method.

The executor function is where we implement the asynchronous behavior that we are trying to handle using a promise. So the executor function should eventually produce a value. That would be the future value of the promise.

```js
const promise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve("You won!"); // will resolve the promise
  } else {
    reject("You lost!"); // will reject the promise
  }
});
```

We can now consume the promise that we just created.

```js
promise
  .then((resolved) => console.log(resolved))
  .catch((errMsg) => console.log(errMsg));
```

> **_Note_** | The promise in the mentioned example does not contain any asynchronous operation. It just shows how a promise can be created and consumed.

> **_Note_** | Normally we just consume promises. We only build promises when we need to wrap callback-based functions into promises. This is called _promisifying_. It means to convert callback-based asynchronous behavior to promise-based. For instance, to promisify the `setTimeout()` function. Notice how we don't need the `reject()` function in the executor function in the case of promisifying the timer. A timer cannot fail.

```js
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
```

Now to consume this promise:

```js
wait(2)
  .then(() => {
    console.log("Waited for 2 seconds.");
    return wait(1);
  })
  .then(`Waited for 1 second.`);
```

#### **Error handling**

##### **Handling with `.then()` or `.catch()`**

Actually, there are two ways of handling errors. We can pass a second callback function into the `.then()` method. This callback function will have access to the error object.

```js
const getCountryData = function (country) {
  fetch("<URL>").then(
    (response) => response.json(),
    (err) => alert(err)
  );
};
```

But this is not a good way of handling errors. Because if there are multiple promises chained together, then we would have to define another error handling callback function in the next promise. So instead of passing a second callback function into the `.then()` method, we can implement a central error handling strategy using the `.catch()` method.

```js
const getCountryData = function (country) {
  fetch("<URL>")
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
```

This way, any error that happens in any of the promises, will propagate down the chain and will be caught by the `.catch()` method.

##### **Handling with `try/catch` blocks**

Using the try/catch block to handle errors is not something limited to the use of asynchronous programming in JavaScript. We can actually use try/catch everywhere. But if we want to use try/catch to handle asynchronous programming errors, we must use it for the async/await syntax.

This is how we use try/catch block in general:

```js
try {
  // actual functionality
} catch (err) {
  // handling logic for errors happened in the try block
}
```

In order to handle errors in async functions using the try/catch block:

```js
const whereAmI = async function () {
  try {
    const pos = await getPosition();
    console.log(pos);
  } catch (err) {
    console.log(err);
  }
};
```

#### **Finally!**

In addition to methods that we have been using on promises up until now (`.then()` and `.catch()`) we can also chain the `.finally()` method. This method accepts a callback function which will be called no matter what happens with the response. So this would be a functionality that will always be performed after the chain of promises are executed.

```js
const getCountryData = function (country) {
  fetch("<URL>")
    .then((response) => response.json())
    .catch((err) => console.log(err))
    .finally(() => console.log("Finished fetching."));
};
```

# **Object-Oriented Programming**

Object-oriented programming is a programming paradigm based on the concept of obejcts. It was developed with the goal of organazing code (paradigm), to make code more flexible and easier to maintain. Here are some tips to be added on this general definition.

- We use objects to **model** or describe real-world or abstract features.
  - Objects are self-contained pieces/blocks of code.
  - Objects usually contain **properties** and **methods**. With objects, we pack data and the corresponding behavior into one block of code.
- In OOP, objects are **building blocks** of applications, and interact with one another through a **public interface (API)**.
  - An API includes methods that the code outside the object can access and use to communicate with the object.

**_Main ideas:_**

1. Creating objects programmatically
2. Being able to reuse some code (methods)

## **Traditional OOP (classes and instances)**

In OOP, in order to create objects programmatically, we use classes. A **class** contains some rules and it will act as a blueprint from which instances (new objects) can be created.

For example, a class named `User`, will hold some properties and methods that should be available on all user objects created from this class.

> **_Note_** | classes are not objects.

```js
User {
  username;
  password;
  email;

  login(password) {
    // login logic
  }

  sendMessage(str) {
    // message sending logic
  }
}
```

An object created from this class is called an **instance**. Many instances can be created from a class. Instances of the same class may have different data as properties, but they share the same functionalities.

### **Four fundamental OOP principles**

There are four important principles that can guide us toward a good class implementation:

1. **Abstraction:** ignoring details that don't matter, allowing us to get an overview perspective of the main things that we want to implement.
2. **Encapsulation:** keeping properties and methods private inside the class, so they are not accessible from outside the class. By having critical properties private within the class, we prevent them from being accidentally manipulated by outside code. We may also need some methods to be private to a class. One advantage is that this will prevent the whole code from breaking if the private method's code is updated.
3. **Inheritance:** making all properties and methods of a certain class accessible to a child class. In such cases, a child class `extends` a parent class. This allows common logic to be reused and also to model real-world relationships between features.
4. **Polymorphism:** a child class can overwrite a method it inherited from a parent class.

## **OOP in JavaScript**

Unlike classical or traditional OOP with its 'class' and 'instance' terminology that is used in other programming languages, in JavaScript we have **Constructor functions**, **Prototypes** and **Objects**. JavaScript does not really have classes. In JavaScript, we create objects from constructor functions. So constructor functions in JavaScript somehow simulate classes in traditional OOP.

### **Prototype & prototypal inheritance**

A prototype is an object that contains some methods and properties. All objects created from this prototype, will have access to these methods and properties. This mechanism is called **prototypal inheritance**.

Here is a table comparing classical OOP and JavaScript OOP:

| Classical OOP                                              | JavaScript OOP                                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Objects (instances) are _instantiated_ from a class        | Objects are _linked_ to a prototype object                                            |
| Behavior (methods) is _copied_ from class to all instances | Behavior is _delegated_ to the linked prototype object through prototypal inheritance |

For instance, we can use the `map` method on an array, because the map method is defined on the `Array.prototype` object, which is the prototype of all the arrays that we create in JavaScript.

```js
const num = [1, 2, 3];
num.map((v) => v * 2);
```

So the `num` array is linked to `Array.prototype` object, and therefore has access to all methods defined on it. The map method is not defined on the `num` array, but on its prototype.

### **Implementing prototypal inheritance in JavaScript**

There are 3 ways of implementing prototypal inheritance in JavaScript:

#### **1. Constructor function and the `prototype` property:**

This is a technique to create objects from a function, and it is how built-in objects like Array, Map and Set are actually implemented in JavaScript.

##### **_Creating a construtor function_**

To create a constructor function, the syntax is exactly the same as a regular function declaration or expression.

> **_Note_** | we don't use an arrow function to define a constructor function, because an arrow function does not have its own `this` keyword. In OOP, we always need the `this` keyword.

```js
const Person = function (name, birthYear) {
  // instance properties: available on all instances
  this.name = name;
  this.birthYear = birthYear;
};
```

> **_Note_** | we can define methods inside a constructor function, but this is a bad practice. Methods that are defined inside the constructor function, would be copied into each and every instance object, producing unnecessary copies of the same functionality. The better way to go is to add methods to the `prototype` property of the constructor function.

##### **_Defining methods on prototype_**

Any function in JavaScript automatically has access to a property called `prototype`. Objects created from a constructor function, will have access to all the methods defined on the `prototype` property of that constructor function.

```js
Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};
```

##### **_Defining properties on prototype_**

We can also set properties on the prototype, not just methods.

```js
Person.protoype.species = "Homo Sapiens";
```

##### **_Defining static methods_**

Static methods are usually used as helper functions defined on constructor functions. So objects (instances) created from a constructor function will not have access to static methods.

For instance, the `from` method is available on the `Array` constructor, but not on array instances.

To define a static method on the `Person` constructor function:

```js
Person.hey = function () {
  console.log("Hey there!");
};
```

We should then call the `hey` method on the `Person` constructor, and not on its instances.

```js
Person.hey();
```

##### **_Creating an object (instance)_**

`Person` is a normal JavaScript function. If we want it to act as a constructor function in order to create an object from it, we should call it using the `new` keyword.

```js
const omid = new Person("Omid", 1992);
```

Calling the the `Person` function with the `new` keyword will perform 4 steps:
| Step No. | Action |
| --------: | ------ |
| 1 | a new empty object is created |
| 2 | `Person` is called, `this` is set to the new empty object |
| 3 | the new empty object is linked to prototype, meaning that the `__proto__` property is created and set to `Person.prototype` |
| 4 | `Person` returns the object |

`omid` has now access to the methods defined on the `prototype` property of the `Person` constructor function:

```js
omid.calcAge(); //45
```

Here are some proof regarding the prototypal inheritance relationships:

- We can say that `omid` is an instance of `Person`. We can prove this using the JavaScript `instanceof` operator:

```js
console.log(omid instanceof Person); //true
```

- The prototype of `omid` is `Person.prototype`. So `prototype` property is not the prototype of `Person`. We can access the prototype of `omid` using the `__proto__` property of it.

```js
console.log(omid.__proto__);
```

We can check if it is exactly the same as the `prototype` property of the `Person` constructor function:

```js
console.log(omid.__proto__ === Person.prototype); //true
```

We can also confirm this using the `isPrototypeOf` method that is available on the `prototype` property of `Person`:

```js
console.log(Person.prototype.isPrototypeOf(omid)); //true
```

- Properties defined on the `prototype` property of the constructor function will not be available on the objects (instances), but they will have access to it through their prototype. We can use the `hasOwnProperty` method to check if a certain property is available on the object itself or not:

```js
console.log(omid.hasOwnProperty("name")); //true
console.log(omid.hasOwnProperty("species")); //false
```

##### **_Prototype chain_**

Every objects in JavaScript has a prototype. Remember that arrays and functions are also objects in JavaScript. An object and its prototype form a prototype chain, but the chain is not always this short.

We saw that the prototype of `omid` is `Person.prototype`. However, `Person.prototype` itself is an object, and should have its own prototype, and it actually does. `Person.prototype` is a simple object, meaning that it was created by the `Object` constructor function. So the prototype of `Person.prototype` is `Object.prototype`. This is usually the final ring of the prototype chain. The prototype of `Object.prototype` is `null`. This is very similar to the _scope chain_.

> **_Note_** | we can add methods to the JavaScript built-in prototypes like `Array.prototype` and `Object.prototype`. However, extending these prototypes is generally not a good idea: next versions of JavaScript might include a method with the same name that you added, and this will break your code. Also, doing this while working in teams may make some troubles during the project development.

```js
console.log(omid.__proto__.__proto__); // Object.prototype
```

For example, the prototype chain for a simple array is like:

```js
const arr = [1, 2, 3];
console.log(arr.__proto__); // Array.prototype
console.log(arr.__proto__.__proto__); // Object.prototype
```

When we call the `hasOwnProperty` method on an object like `omid`, JavaScript will first start looking for the method on the object itself. If it is not there, it will go up the prototype chain and look for the method in `omid`'s prototype, which is `Person.prototype`. If it is not there too, it will go up the prototype chain one level further and look into `Object.prototype`. This is where it will find and call the method.

##### **_Inheritance between constructor functions (classes)_**

This is a situation where we define 2 constructor functions, and we want one (child) to extend another (parent). For example, we want a `Person` constructor function, and a `Student` constructor function to extend `Person`.

We define the `Person` constructor function as:

```js
const Person = function (name, birthYear) {
  this.name = name;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};
```

Then we define the `Student` constructor function, and call the `Person` constructor function in it. It is important to note here that the `Person` constructor function needs to use `this`. So calling the `Person` in `Student` should not be a regular function call, since in a regular function call, `this` is `undefined`. We can use the `call` method on `Person` to be able to define `this` manually.

```js
const Student = function (name, birthYear, course) {
  Person.call(this, name, birthYear);
  this.course = course;
};

Student.prototype.introduce = function () {
  console.log(`My name is ${this.name} and I study ${this.course}`);
};
```

We can then create an instance of `Student`:

```js
const omid = new Student("Omid", 1992, "Photography");
```

> **_Note_** | up until this point, any instance created from the `Student` constructor function will not have access to instance methods defined on `Person.prototype`. They will only have access to instance methods defined on `Student.prototype`. We need to manually establish the prototype chain, meaning that we want to set the `__proto__` of `Student.prototype` to `Person.prototype`.

```js
const Student = function (name, birthYear, course) {
  Person.call(this, name, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);
// linking prototypes should be implemented right at this point of code, before defining any instance methods, otherwise it would overwrite all instance methods and delete them since it returns an empty object.

Student.prototype.introduce = function () {
  console.log(`My name is ${this.name} and I study ${this.course}`);
};
```

#### **2. ES6 Classes:**

This is where classes were introduced to JavaScript. However, this is not exactly what we mean by 'classes' in traditional OOP. ES6 classes do **NOT** behave like classes in traditional OOP.

##### **_Defining a class and instance properties_**

To declare classes in JavaScript we use a special syntax. Remember that a class is a special type of function. Inside the class, a `constructor` function should be defined. This constructor function behaves exactly the same way as the regular JavaScript constructor function.

```js
class Person {
  constructor(name, birthYear) {
    // instance properties
    this.name = name;
    this.birthYear = birthYear;
  }
}
```

> **_Note_** | we can also define properties that are not based on inputs. They will just be set by the constructor function

```js
class Person {
  constructor(name, birthYear) {
    // instance properties
    this.name = name;
    this.birthYear = birthYear;
    this.movements = [];
    this.locale = navigator.language;
  }
}
```

> **_Note_** | any code can be inserted into the constructor function and it would be executed once the constructor function is called.

```js
class Person {
  constructor(name, birthYear) {
    // instance properties
    this.name = name;
    this.birthYear = birthYear;
    this.movements = [];
    this.locale = navigator.language;

    // any executable code
    console.log(`Thanks for opening an account, ${name}`);
  }
}
```

##### **_Defining methods_**

We can simply write methods after the constructor function. These methods will not be copied into the instances, they will be accessed by the instances through their prototype.

```js
class Person {
  constructor(fullName, birthYear) {
    // instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance methods: will be added to Person.prototype
  calcAge() {
    return 2037 - this.birthYear;
  }
}
```

> **_Note_** | methods defined in a class can call each other.

> **_Note_** | we can still define methods on the `prototype` property of the `Person` class. It is just simpler to write it in the class declaration.

```js
Person.prototype.greet = function () {
  console.log(`Hey ${this.fullName}`); //Hey omid
};
```

##### **_Creating an object (instance)_**

To create an instance of a declared class, we use the exact same syntax as before:

```js
const omid = new Person("Omid Armat", 1992);
```

Here are some tips to remember about ES6 classes:

- Classes are **NOT** hoisted.
- Classes are **first-class citizens**. We can pass them into functions and we can also return them from functions.
- Classes are always executed in **strict mode**.

##### **_Defining getters and setters_**

Every object in JavaScript can have getter and setter properties. These are called **Assessor properties**, while normal properties are called **Data properties**.

Getters and setters are functions that get and set values, but on the outside, they look like regular properties.

We can also define setters and getters in classes.

```js
class Person {
  constructor(name, birthYear) {
    // instance properties
    this.name = name;
    this.birthYear = birthYear;
  }

  // instance methods: will be added to Person.prototype
  get age() {
    return 2037 - this.birthYear;
  }
}
```

To call this getter function, we should not write a function call syntax. We should use the method as a property.

```js
console.log(omid.age);
```

Setters are usually used for data validation before being persisted into an object. Also remember that setter methods should always receive at least one argument.

```js
class Person {
  constructor(fullName, birthYear) {
    // instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance methods: will be added to Person.prototype
  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    // creates _fullName instead of fullName property
    else alert(`${name} is not a full name.`);
  }
}
```

In order to be able to retrieve the `fullName` variable while we don't actually have it stored on the object, we should implement a getter function with the `fullName` name.

```js
class Person {
  constructor(fullName, birthYear) {
    // instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance methods: will be added to Person.prototype
  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    // creates _fullName instead of fullName property
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }
}
```

##### **_Defining static methods_**

To define a static method on the `Person` class:

```js
class Person {
  constructor(fullName, birthYear) {
    // instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // static methods
  static hey() {
    console.log("Hey there!");
  }
}
```

We should then call the `hey` method on the `Person` class, and not on its instances.

```js
Person.hey();
```

##### **_Inheritance between ES6 classes_**

We first define a `Person` class:

```js
class Person {
  constructor(fullName, birthYear) {
    // instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance methods: will be added to Person.prototype
  calcAge() {
    return 2037 - this.birthYear;
  }
}
```

Then we define a `Student` class knowing that it `extends` the `Person` class. The `extends` keyword will make the `Student` class to inherit from the `Person` class, it will link the prototypes for us. We also need to call the `super` function inside the `Student`'s constructor function. `super` is the constructor function of the parent class `Person`, and it is responsible for defining `this` in the child class.

```js
class Student extends Person {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // defines this, so should be called before other code

    // instance properties
    this.course = course;
  }

  // instance methods
  introduce() {
    console.log(`My name is ${this.fullName} and I strudy ${this.course}`);
  }
}
```

> **_Note_** | It is not necessary for the child class to accept additional instance properties compared to the parent class. In such case, we would not have to define the constructor function in the child class, and still all instances of `Student` will get their `fullName` and `birthYear` instance properties, because `Student` would still _extend_ `Person`. Just keep in mind that no constructor function, means no `super` function call, and therefore `this` would be `undefined`.

##### **_Data Encapsulation_**

It means to keep some properties and methods private inside a class so that they are not accessible from outside the class. There are 2 main reasons why we need encapsulation and data privacy:

1. prevent code from outside the class to accidentally manuipulate data inside the class.
2. encapsulation enables us to expose only a small public interface of the class, and this, in turn, allows us to change all other internal methods with confidence, because this way we can be sure that external code does not rely on these internal private methods and our code will not break.

In order to make properties and methods fake-private, we add an underscore at the beginning of their names:

```js
class Student {
  constructor(name, birthYear, pin) {
    this._pin = pin;
  }

  _approveLoan(val) {
    return true;
  }
}
```

> **_Note_** | this does not make the property truly private, it is just a convention and they are still accessible with the underscore. Therefore, we call these _protected properties_.

In traditional OOP, properties are called **class fields**. With the current proposal of implementing private class fields in JavaScript, the language is actually giving its classes some abilities that they didn't have previously.

In this proposal, there are 6 different kinds of fields and methods:

1. Public fields
2. Private fields (fields cannot be defined in constructor functions, they should be defined outside. Then the constructor can access them via `this`)
3. Public methods
4. Private methods
5. Public static methods
6. Private static methods

```js
class Account {
  // public fields (available on all instances)
  locale = navigator.language;

  // private fields (not accessible from outside the class)
  #movements = [];
  #pin;

  constructor(name, birthYear, pin) {
    this.#pin = pin;
  }

  // private methods (currently not supported by any browser)
  #approveLoan(val) {
    return true;
  }
}
```

##### **_Making class methods chainable_**

Each method defined in the class should `return` the object (`this`) after all its process.

```js
class Account {
  #movements = [];
  #pin;

  constructor(name, birthYear, pin) {
    this.#pin = pin;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  requestLoan(val) {
    this.deposit(val);
    return this;
  }
}
```

#### **3. `Object.create()`:**

this is the easiest way of linking an object to a prototype object. However, this syntax is not used much.

In this last way of implementing OOP, the idea is still based on prototypal inheritance, but there are no `prototype` properties involved. Also, there is no constructor function, and no `new` operator.

We use `Object.create()` to manually set the prototype of an object, to any other object that we want. For example, we can now create a new object and make it the prototype of all the person objects.

##### **_Defining a prototype object and instance methods_**

The prototype objects would be defined as a simple JavaScript object. However, to make the instances be created programmatically, we need to implement a method like `init` in this object that will place instance properties as they are passed into it. This would be very similar to a constructor function, but it actually has nothing to do with it. It is just a regular method available on an object.

```js
const Person = {
  // instance methods
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  }

  calcAge() {
    return 2037 - this.birthYear;
  },
};
```

##### **_Creating an object (instance)_**

```js
const omid = Object.create(Person);
// creates an empty object
```

to input data into this object is it is defined in the `Person` object, we should call the `init` method on it.

```js
omid.init("Omid", 1992);
```

# **MVC architecture**

## **Publisher-subscriber pattern**

According to the MVC architecture, we must be able to handle all application logic in Controller, and handle all presentation logic in View. Therefore, we should be able to listen for events in View, and handle events in Controller. The solution is the publisher-subscriber pattern.

The publisher-subscriber pattern involves event listeners attached to DOM elements in View, and events handled by Controller functions living in the controller module.

In this pattern, publisher is the code that knows when to react. It will certainly involve the `addEventListener` method and it is written in View. On the other hand, there is a subscriber which is the code that actually performs the reaction to the event, so it is the code that should be executed when the event happens. It is written in Controller.

The actual implementation of this solution will include a controller `init` function which passes the subscriber into the publisher, so that the publisher would know that the subscriber even exists. The `init` will be called as soon as the program is loaded, and it will, in turn, call the publisher and pass the subscriber into it.

**`controller.js`:**

```js
const init = function () {
  recipeView.addHandlerRender(handler);
};

init();
```

**`view.js`:**

```js
// publisher is usually implmented as a public API of a view class
addHandlerRender(handler) {
  window.addEventListener('load', handler);
}
```

# **Working with the DOM**

DOM stands for Document Object Model. It is a structured representation of HTML documents which allows JavaScript to access and manipulate HTML elements. So the DOM is the connection between HTML documents and JavaScript code.

The DOM is automatically created by the browser as soon as the HTML page loads. It is stored in a tree structure of nodes, where each HTML element is an object. In the DOM tree, for each HTML element there is one element node that we can manipulate and interact with. The DOM also allows us to respond to certain DOM events using the JavaScript code.

The DOM always starts with the document object. Document is a special object that we can access in JavaScript. It serves as an entry point into the DOM as we can easily examine this by using the `querySelector` method on it to select any HTML element:

```js
document.querySelector(".class");
```

The first child element of the document is usually the `<html>` element. This is usually the root element in all HTML documents.

Next, the `<html>` element usually has two child elements: `<head>` and `<body>`. These are adjacent elements, so they are siblings in the DOM.

The DOM has more than just element nodes. It also has nodes for each group of text characters (e.g text inside a `<p>` element), comments and other stuff.

> **_Note_** | the rule is that whatever is in the HTML document, also has to be in the DOM.

> **_Note_** | DOM is not part of the JavaScript language. DOM allows us to make JavaScript code impact the appearance of webpages. **Web APIs** make it possible to work with DOM and DOM methods. Web APIs are libraries written in JavaScript and implemented by browsers, which we can access from our JavaScript code. Besides the DOM, there are many other web APIs like timers, fetch API, Geolocation and so on.

## **A detailed look into the DOM**

The DOM API allows JavaScript to programmatically interact with the DOM. So the DOM actually contains a ton of methods and properties that we use to interact with the DOM tree. (e.g `querySelector`, `addEventListener`, and `createElement` methods, or `innerHTML`, `textContent`, and `children` properties among many others)

There are different types of nodes in the DOM. Some nodes are HTML elements, but others are just text. This is important because DOM methods and properties are organized into these different types of objects.

### **DOM organization**

Every single node in the DOM tree is of the type **Node**. Each node is represented in JavaScript by an object. This object has access to different node methods and properties, such as `textContent`, `childNodes`, `parentNodes`, `cloneNodes` among many others.

This Node type has a couple of child types: **Element**, **Text**, **Comment**, **Document**.

- `Window` node

- `Node` node: every single node in the DOM is of this type. Each `Node` is represented in JavaScript by an object that has access to special methods and properties, such as `.textContent`, `.childNodes`, `.parentNode`, `cloneNode` among many others.

  - `Element` node: each HTML element is of this type. Gives each HTML elemtn access to a ton of useful methods and properties, such as `innerHTML`, `classList`, `children`, `parentElement`, `append()`, `remove()`, `querySelector()`, `closest()` and so on. Each element is represented internally as an object.

    - `HTMLElement` node: this node type would have exactly one child type for each HTML element that exists in the HTML file. Each of these HTML elements can have unique properties. (e.g `src` attribute of the `<img>` element, or `href` attribute of the `<a>` element)

      - HTMLDivElement
      - HTMLButtonElement

  - `Text` node: text inside any element gets its own Text node.
  - `Comment` node: comment in the HTML file gets its Comment node.
  - `Document` node: has access to methods and properties, such as `querySelector()`, `createElement()`, `getElementById()`.

> **_Note_** | Inheritance makes the relation between these node types work. So all the child types will have access to methods and properties of their parent node types. Note how the Document node type and Element node type both have access to `querySelector()`.

The DOM needs to provide all node types with the ability to listen to events. Remember that we usually listen to events by calling the `addEventListener` method on an Element or Document node type. The DOM has another node type called `EventTarget` which is a parent of both the `Node` and the `Window` node types. So actually, we can call the `addEventListener` method on every single type of node.

## **Selecting elements**

### **Select document, head and body**

To select the document element in order to apply CSS styles we don't need to use any selector:

```js
const doc = document.documentElement;
```

We can also select the `head` and `body` elements:

```js
const head = document.head;
const body = document.body;
```

### **Select elements with `querySelector()`**

> Frequently used

We can use any CSS selector with the`querySelector()` method in order to select one element.

- Returns the first element that matches the query.

```js
const header = document.querySelector(".header");
```

### **Select elements with `querySelectorAll()`**

> Frequently used

We can use any CSS selector with the`querySelectorAll()` method in order to select a series of elements.

- Returns a `NodeList` containing all the elements that match the query. Remember that a `NodeList` is not a live list.

```js
const allSections = document.querySelectorAll(".section");
```

> **_Note_** | `querySelector()` and `querySelectorAll()` are available not only the document, but also on all the elements. Using them on elements is usually with the goal of selecting child elements.

### **Select elements with `getElementById()`**

We can select elements only with their ID in this method. We don't need to insert the CSS ID selector actually.

- Returns the only element with the inserted ID.

```js
const map = document.getElementById("map");
```

### **Select elements with `getElementsByTagName()`**

Used to selec all elements with the same tag name.

- Returns a `HTMLCollection`, which is a live collection, meaning that if the DOM changes, this collection is immediately updated.

```js
const allButtons = document.getElementById("button");
```

### **Select elements with `getElementsByClassName()`**

Used to selec all elements with the same class name.

- Returns a `HTMLCollection`.

```js
const allButtons = document.getElementsByClassName("button");
```

## **Creating and inserting elements**

### **Create elements with `insertAdjacentHTML()`**

Used to insert HTML markup into a certain HTML element.

- Accepts two arguments:

  1. Determine where the HTML markup should be inserted in the HTML element: `beforeend`, `beforebegin`, `afterend`, `afterbegin`.
  2. HTML markup code

```js
const section1 = document.querySelector('.section-1');
section1.insertAdjacentHTML('beforebegin', <markup-code>);
```

### **Create elements with `createElement()`**

used to create an HTML element.

- Accepts one argument: string containing the tag name.
- Returns an HTML element with the specified tag name.

```js
const message = document.createElement("div");
```

> **_Note_** | All this does is to create a DOM element. It is not yet in the DOM itself, and it cannot yet be found on the webpage. We have to manually insert it into the page.

We can also add classes to this newly created element.

```js
message.classList.add("cookie-message");
```

We can add text to this element.

```js
message.textContent =
  "We use cookies for improved functionality and analytics.";
```

We can also insert HTML code into this element.

```js
message.innerHTML = '<button class="btn btn--close-cookie">Got it!</button>';
```

> **_Note_** | we can use the `innerHTML` property to both read and set the HTML markup.

Finally, to insert this element really into the DOM, we can use `prepend()`, `append()`, `before()`, or `after()`.

### **Insert element with `prepend()`**

Used to insert an element at the beginning of another element.

- Accepts one argument: the element that should be inserted.

```js
header.prepend(message);
```

### **Insert element with `append()`**

Used to insert an element at the end of another element.

- Accepts one argument: the element that should be inserted.

```js
header.append(message);
```

> **_Note_** | one DOM element is unique and cannot exist at two places at the same time. Therefore, in a code example where both prepend and append are used, only the last method used will affect the DOM. However, if we need the same element appear in two places, we have to make a copy of it using the `cloneNode()` method.

```js
header.prepend(message);
header.append(message.cloneNode(true)); // true determines that all the child elements of the message will also be copied
```

### **Insert element with `before()`**

Uset to insert an element as a sibling, before another element.

- Accepts one argument: the element that should be inserted.

```js
header.before(message);
```

### **Insert element with `after()`**

Uset to insert an element as a sibling, after another element.

- Accepts one argument: the element that should be inserted.

```js
header.after(message);
```

### **Delete element with `remove()`**

Used to delete elements, usually based on a click or timer event.

```js
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });
```

> **_Note_** | previously, before the `remove()` method became available in JavaScript, we had to move up the DOM to select the parent element, and then remove the child element using the `removeChild()` method, into which we had to pass in the element that should be removed again.

```js
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.parentElement.removeChild(message);
  });
```

## **Manipulating styles, attributes and classas**

### **Manipulate styles**

In order to manipulate the style of an element, we should select the `style` property of that element, and then select a specific css property on it.

```js
message.style.backgroundColor = "#374956";
message.style.width = "120%";
```

> **_Note_** | Styles set through JavaScript code are inserted into the HTML file as inline styles. Therefore, we cannot use the `style` property to read styles defined outside the HTML file, for example, in a CSS file. However, we can use it to read inline styles.

> **_Note_** | in order to get non-inline styles of an element, we can use the `getComputedStyle()` function. It receives the target element as an argument. It returns a `CSSStyleDeclaration` object containing all the styles with which the element is appearing on the page. So these styles are not necessarily written in the CSS file.

```js
console.log(getComputedStyle(message));
```

### **Manipulate CSS custom properties**

We can change the values stored in CSS custom properties using JavaScript. As we know, CSS custom properties are stored in the document root, and in JavaScript that is equivalent to the document element.

In order to achieve this we can use the `setProperty()` method on the style property of the document element.

```js
document.documentElement.style.setProperty("--color-primary", "orangered");
```

### **Manipulate HTML attributes**

We can read and set attributes in JavaScript.

```js
const logo = document.querySelector(".nav__logo");
console.log(logo.src); // returns absolute URL while in HTML file we write the relative URL. To get the relative URL we use getAttribute(). Same is true about 'href' for links.
console.log(logo.className); // NOT 'class'

logo.alt = "Beautiful minimalist logo";
```

> **_Note_** | this works only if the target attribute is a standard HTML attribute that the element is supposed to have it. So if we set these standard attributes in the HTML file, they will be accessible in JavaScript simply as properties of the element. However, if we set some non-standard properties on an element, we would only be able to access them using the `getAttribute()` method, into which we can pass the attribute name.

```js
const logo = document.querySelector(".nav__logo");
console.log(logo.designer);
```

> **_Note_** | we can also set non-standard attributes using the `setAttribute()` method. This method accepts as the first argument the attribute name, then as the second argument the attribute value.

```js
const logo = document.querySelector(".nav__logo");
logo.setAttibute("company", "bankist");
```

#### **HTML data attribute**

We can add a special data attribute for a HTML element. We frequently use this attribute when we need to store some data in the UI in order to basically create a bridge between the frontend and the backend code.

The name of this attribute should start with 'data-' and then we continue the name however we want. These attributes will then be accessible in JavaScript through the 'dataset' property of the element. Just notice how the dictation of the attributes name changes in JavaScript to cammelcase.

```html
<img class="nav__logo" data-verion-number="3.0" />
```

```js
const logo = document.querySelector(".nav__logo");
console.log(logo.dataset.versionNumber); //3.0
```

### **Manipulate classes**

In order to interact with classes of an HTML element we can use 4 methods on the `classList` property of the element:

1. `.add()`: adds a class name string to the classlist of the element.
2. `.remove()`: removes a class name string from the classlist of the element.
3. `.toggle()`: adds/removes a class name string to/from the classlist of the element if it doesn't/does alreadey exist.
4. `.contains()`: returns boolean whether the specified class name string exists on the classlist of the element. (Don't mistake it with `includes()` in arrays)

> **_Note_** | multiple class name strings can be passed into the `add()` and `remove()` methods separated by commas.

## **Events**

## **Event delegation**

In event delegation we use the fact that events _bubble up_. Utilizing this fact usually means to attach the event listener to a common parent of a series of elements. Now if the user clicks on any of the elements in that parent element, an event is emited and we can catch it at the parent level as it bubbles up. We can also identify where the event is originating from using the `e.target` property.

Actual steps in utilizing event delegation:

1. Add the event listener to a common parent element of all the elements that we are interested in.
2. Determine what element originated the event.
3. Execute a custom command.

```js
document.querySelector(".nav__links").addEventListener("click", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    // other executable commands
  }
});
```

> **_Note_** | Event delegation is a nice solution for situations where we want to work with elements that are not yet on the page in the runtime. This is a common use case of event delegation, especially with buttons that are added dynamically to the webpage while using the application.

# **Problem solving framework**

In order to solve a problem, first of all you need to stay calm and slow down. Do NOT just jump at a problem without a plan. In order to be able to solve a problem, you need to take a very logical and rational approach.

Here is a 4-step framework that can help you take this logical and rational approach to solve a problem:

1. Make sure you **fully understand the problem**. Ask all the questions you need to get a clear picture of the problem. This way you can step back and take a high-level look at the big picture.
2. **Divide and conquer:** Break a big problem into smaller sub-problems. These smaller sub-problems are a lot easier to solve. This step will also help you with the first step, which is to fully understand the problem. This is an essential method of problem solving. It is not limited to programming.
3. Do as much **research** as you need. You should attempt to implement a sub-problem with your own coding abilities, but if you find yourselft constantly hitting a wall, start your research. You can go for Google, Stack overflow, and MDN. Researching is a huge part of a programmer's job.
4. For bigger problems, **write pseudo-code** before writing the actual code.

> **_Note_** | Try to develop a genuine curiosity and passion for understanding how things actaully work, not only in programming, but in the whole world.
