- [C programming setup](#c-programming-setup)
- [The `main` function](#the-main-function)
  - [Running `main` with command-line arguments](#running-main-with-command-line-arguments)
  - [Running `main` with command-line options](#running-main-with-command-line-options)
- [Understanding the memory structure](#understanding-the-memory-structure)
  - [Stack](#stack)
  - [Heap](#heap)
  - [Globals](#globals)
  - [Constants](#constants)
  - [Code](#code)
- [Side notes](#side-notes)
  - [Inspect program's exit status](#inspect-programs-exit-status)
  - [Object and memory in C](#object-and-memory-in-c)
- [Data types](#data-types)
  - [List of data types in C](#list-of-data-types-in-c)
    - [`char`](#char)
    - [`int`](#int)
    - [`short`](#short)
    - [`long`](#long)
    - [`float`](#float)
    - [`double`](#double)
    - [`unsigned` keyword](#unsigned-keyword)
    - [`long` keyword](#long-keyword)
  - [Putting big values in small variables](#putting-big-values-in-small-variables)
  - [Casting](#casting)
  - [`struct`s](#structs)
    - [Nesting `struct`s](#nesting-structs)
    - [`struct` alias](#struct-alias)
    - [Updating `struct` instances](#updating-struct-instances)
    - [`struct`s in memory](#structs-in-memory)
    - [`structs` passed as function arguments](#structs-passed-as-function-arguments)
  - [`union`s](#unions)
    - [`union`s and `struct`s](#unions-and-structs)
  - [`enum`s](#enums)
  - [`bitfield`s](#bitfields)
- [Standard input and output](#standard-input-and-output)
  - [Standard error](#standard-error)
  - [Connecting output to input](#connecting-output-to-input)
- [Header files](#header-files)
  - [`<stdio.h>`](#stdioh)
    - [`puts()`](#puts)
    - [`printf()`](#printf)
    - [`scanf()`](#scanf)
    - [`fopen()`](#fopen)
      - [Entering numbers with `scanf`](#entering-numbers-with-scanf)
      - [Buffer overflow with `scanf`](#buffer-overflow-with-scanf)
    - [`fgets()`](#fgets)
  - [`<stdlib.h>`](#stdlibh)
  - [`<string.h>`](#stringh)
    - [`strchr()`](#strchr)
    - [`strstr()`](#strstr)
    - [`strcmp()`](#strcmp)
    - [`strcpy()`](#strcpy)
    - [`strlen()`](#strlen)
    - [`strcat()`](#strcat)
  - [`<unistd.h>`](#unistdh)
    - [`getopt()`](#getopt)
  - [`<limits.h>`](#limitsh)
  - [`<float.h>`](#floath)
  - [`<stdlib.h>`](#stdlibh-1)
    - [`atoi()`](#atoi)
    - [`malloc()`](#malloc)
    - [`free()`](#free)
    - [`qsort()`](#qsort)
      - [Deeper into the comparator](#deeper-into-the-comparator)
  - [`<stdarg.h>`](#stdargh)
  - [Your own header files](#your-own-header-files)
    - [Frsutrating problems](#frsutrating-problems)
    - [The make tool](#the-make-tool)
      - [How make works](#how-make-works)
      - [The `makefile`](#the-makefile)
  - [Your own libraries available all over your machine](#your-own-libraries-available-all-over-your-machine)
    - [Sharing header files](#sharing-header-files)
    - [Sharing object files](#sharing-object-files)
  - [Creating an archive](#creating-an-archive)
    - [Using your archive](#using-your-archive)
    - [Some notes around your archives](#some-notes-around-your-archives)
  - [Static vs. dynamic linking](#static-vs-dynamic-linking)
    - [Dynamic libraries](#dynamic-libraries)
      - [Creating dynamic libraries](#creating-dynamic-libraries)
- [Strings](#strings)
  - [Defining strings](#defining-strings)
    - [Define a pointer variable for a literal string](#define-a-pointer-variable-for-a-literal-string)
    - [Define an array variable for a literal string](#define-an-array-variable-for-a-literal-string)
  - [Passing strings to a function](#passing-strings-to-a-function)
  - [Defining a sequence of strings](#defining-a-sequence-of-strings)
- [Pointers](#pointers)
  - [How to work with pointers](#how-to-work-with-pointers)
  - [Pointers and arrays](#pointers-and-arrays)
    - [Pointer decay](#pointer-decay)
  - [Pointers have types](#pointers-have-types)
- [Data structures and Dynamic memory](#data-structures-and-dynamic-memory)
  - [Linked list](#linked-list)
    - [Creating a linked list](#creating-a-linked-list)
    - [Inserting values into the linked list](#inserting-values-into-the-linked-list)
  - [Dynamic storage](#dynamic-storage)
    - [Using dynamic memory](#using-dynamic-memory)
    - [`valgrind` to detect leaks](#valgrind-to-detect-leaks)
      - [Using `valgrind`](#using-valgrind)
- [Functions](#functions)
  - [Function names as pointers](#function-names-as-pointers)
    - [Declaring function pointers](#declaring-function-pointers)
    - [Passing function to function](#passing-function-to-function)
    - [Special case of automation](#special-case-of-automation)
  - [Variadic functions](#variadic-functions)
- [Processes and system calls](#processes-and-system-calls)
  - [System calls](#system-calls)
  - [System calls with more control](#system-calls-with-more-control)
    - [`exec()` functions replace the current process](#exec-functions-replace-the-current-process)
    - [Different types of `exec()` functions](#different-types-of-exec-functions)
      - [The list functions](#the-list-functions)

# C programming setup

In order to be able to write and execute C programs, you need to have `gcc` compiler installed on your machine. You would then write your programs in files with `.c` extension (e.g. `code.c`).

> GCC stands for Gnu Compiler Collection.

In order to execute your program, you should first compile your code using the `gcc` compiler. To do this, you need to open a terminal window where your code file is located, and use this command:

```
gcc code.c -o code
```

This will create a binary file called `code` at the same location where your terminal is running. You can now execute this compiled code using this command in the same terminal window:

```
./code
```

> The `./` at the beginning of the command actually gives the address of the compiled code file to the terminal. `./` refers to the current location where the terminal is running.

On Windows you can simply use this command:

```
code
```

If you want to compile and execute your program in one go you can use this command:

```
gcc code.c -o code && ./code
```

# The `main` function

The most important function you will find in any C program is the `main()` function. This function is the starting point for all of the code in your program. The main function is always defined with `int` as its **return type**. So the `main` function always returns an integer, but why is that?

When the computer runs your program, it will need to have some way of deciding if the program ran successfully or not. It does this by checking the **return value** of the `main` funcion. If you tell your `main` function to return `0`, this means that the program was successful. If you tell it to return any other value, this means that there was a problem.

> Generally, functions in C can return any type of value. In case the function is not expected to return anything, you can set the return type to `void`.

The main function, like any other function in programming, can accept arguments. These arguments would have be received from the user of the program through the terminal when they are using the execution command. It would look like something like this:

```
./categorize mermaid mermaid.csv elvis elvises.csv the_rest.csv
```

## Running `main` with command-line arguments

In order to be able to receive these command arguments in the `main` function is to declare `argc` and `argv` arguments to the function:

```c
int main(int argc, char *argv[]) {}
```

As it is clear from the declaration above, the main function can read the command-line arguments as an **array of strings** (`char *argv[]`). To be more precise, since C does not really have strings built in, it reads them as **as array of character pointers to strings**. In other words, command-line arguments are passed to the `main` function as an argument count and an array of pointers to the argument strings. So the terminal command above will be received by the main function as these elements:

```
"./categorize" "mermaid" "mermaid.csv" "elivs" "elives.csv" "the_rest.csv"
```

Now in order for C to know how long the array is, it uses `argc`. So `argc` is an integer representing the number of elements in the array. According to the elements above, `argv[0]` will be the program's name that should be executed, and the first proper command-line argument is `argv[1]`. Accessing these arguments in the `main` function will enable you to allow your users to configure the way the program works according to their needs. It makes your program more flexible to respond to your users' needs.

## Running `main` with command-line options

Chances are, any program you write is going to need options. Command line options are the little switches you often see and use with command-line tools:

```
ps -ae
<!-- Displays all the processes, including their environments -->
```

In order to be able to deal with command-line options, you can use a the `getopt()` function coming from `<unistd.h>` header file. Each time you call this function, it returns the next option it finds on the command line.

> In the case of running a program with command-line options and command-line arguments, after you have processed the command-line options in your code, `argv[0]` of the `main` function will no longer be the program's name, but instead it will be the first command-line argument.

To learn more about this function refer to [`getopt`](#getopt) function.

# Understanding the memory structure

## Stack

This is the section of memory used for **local variable** storage. Every time you call a function, all of the function's local variables get created on the stack. It is called the _stack_ because it is like a stack of plates. Variables get added to the stack when you enter a function, and get taken off the stack when you leave that function. Weird thing is, the stack actually works upside down. It starts at the top of the memory and grows downward.

## Heap

This is a section of memory we have not really used yet. The heap is for **dynamic memory**; that is, pieces of data that get created when the program is running and then hand around a long time.

## Globals

A global variable is a variable that lives outside of all the functions and is visible to all of them. Globals get created when the program first runs, and you can update them freely, unlike constants.

## Constants

Constants are also created when the program first runs, but they are stored in read-only memory. Constants are things like stirng literals that you will need when the program is running, but you will never want them to change.

## Code

A lot of operating systems place the code right down in the lowest memory addressed. The code segment is also read-only. This is the part of the memory where the actual assembled code gets loaded.

# Side notes

## Inspect program's exit status

If you want to check the exit status of a program that has just run on your machine you can use this command on Linux or Mac:

```
echo $?
```

or this command on Windows:

```
echo %ErrorLevel%
```

## Object and memory in C

In languages like Java, if you assign an object to a variable, it does not copy the object, it just copies a reference. In C, all assignments **copy data**. If you want to copy a reference to a piece of data, you should assign a pointer.

# Data types

## List of data types in C

### `char`

Each character is stored in the computer's memory as a character code. That is just a number. So when the computer sees 'A', it is the same as seeing the literal number `65`, which is the ASCIII code for 'A'.

### `int`

If you need to store a whole number, you can generally just use an `int`. The exact maximum size of an `int` can vary, but it is guaranteed to be at least 16 bits. In general, an `int` can store numbers up to a few million.

### `short`

Sometimes you want to save a little memory. Why use an `int` if you just want to store numbers up to few hundreds or thousands? That is what a `short` is for. A `short` number usually takes up about half the space of an `int`.

### `long`

If you want to store a really large count, the `long` data type is here to help. On some machines, the `long` data type takes up twice the memory of an `int`, and it can hold numbers up in the billions. But because most computers can deal with really large `int`s, on a lot of machines the `long` data type is exactly the same size as an `int`. The maximum size of `long` is guaranteed to be at least 32 bits.

### `float`

This is the basic data type for string floating-point numbers. For most everyday floating-point numbers - like the amount of fluid in your orange mocha frappuccino - you can use a `float`.

### `double`

If you want to get really precise, or if you want to perform calculations that are accurate to a large number of decimal places, then you might want to use a `double`. A `double` takes up twice the memory of a `float`, and it uses that extra space to store numbers that are larger and more precise.

### `unsigned` keyword

Using the `unsigned` keyword before an `int` variable, will make the number always be positive. Since the variable does not need to worry about recording negative numbers, `unsigned` numbers can store larger numbers, because there is now one more bit to work with. So an `unsigned int` stores numbers from 0 to a maximum value that is about twice as large as the maximum number that can be stored inside an `int`. As another example, an `unsigned char` will probably store numbers from 0 to 255.

### `long` keyword

You can prefix a data type with the word `long` and make it longer. So a `long int` is a longer version of `int`, and a `long long` is longer than `long`. You can also use `long double` which is really really precise.

## Putting big values in small variables

If you try to put an `int` value into a `short` variable, your program might show you no error and silently respond with wrong answers. For instance, take this code:

```c
int x = 100000;
short y = x;
print("The value of y = %hi\n", y);
```

Sometimes the compiler can find out your mistakes about this and warn you about them. But most of the times, it doesn't. So it will fit in as many 1s and 0s of `100000` as it can in the `short` variable and leave the rest out. Therefore, the number that ends up stored inside the `short` variable will be very different from the one you tried to insert into it.

```
The value of y = -31072
```

## Casting

If you divide two `int` values and expect to receive a `float` value, you will be surprised that you will not receive what you expect.

```c
int x = 7;
int y = 2;
float z = x / y;
printf("z = %f\n", z);
// returns 3.0000
```

Dividing integers will always give you rounded-off whole numbers. In order to make this work you can use casting to convert integers to floats on the fly:

```c
int x = 7;
int y = 2;
float z = (float)x / (float)y;
printf("z = %f\n", z);
```

## `struct`s

C can handle a lot of different data types, but quite often, when you are recording data about something in the real world, you will find out that you need to use more than one piece of data. You would also have to work with the same set of data in multiple functions in your program. Repeating reference to and instance of this data makes your code a bit dirty. To go around this problem, wee need something that lets us refer to a whole set of data of different types all at once, as if it were a single piece of data. This is where `struct` comes to play, standing for **structured data type**.

```c
struct fish {
    const char *name;
    const char *species;
    int teeth;
    int age;
};
```

> Notice that the `name` variable will only store an address that points to the fish name, and the string literal of the fish name will be stored somewhere else in the memory.

> A huge advantage of using structs is that when you are using a specific structured data type in multiple functions in your program, and if you decide sometime in the future to add some data to the structure, you will no longer have to update your functions to cope with the change. Your functions don't know and don't care what data is included in the `struct` as long as the `struct` has the data they need.

Then to create pieces of data that uses this structured data type, you must follow the array syntax, meaning that you should initialize an array and follow the same order of the `struct`:

```c
struct fish snappy = {"Snappy", "Piranha", 69, 4};
```

Now as you pass the data stored inside the `snappy` variable to a function, you can use individual fields of its data using the `.` notation and the field's name. For instance:

```c
struct fish snappy = {"Snappy", "piranha", 69, 4};
printf("Name = %s\n", snappy.name);
```

You can also declare your custom functions in a way that they are able to receive your structured data type. Take this function as example:

```c
void catalog(struct fish f) {
    printf("%s is a %s with %i teeth. He is %i\n", f.name, f.species, f.teeth, f.age);
}
```

> IMPORTANT: a `struct` is not an array. It is just like an array. It groups a number of pieces of data together. Also, a `struct` variable, unlike an array variable which is just a pointer to the array, is not a pointer, but is a name for the struct itself.

> `struct`s are a bit similar to classes in other languages, but it is not so easy to add methods to them.

### Nesting `struct`s

You can also create structs from other structs. This is also called **nesting** structs inside other structs. Here is an example:

```c
struct preferences {
    const char *food;
    float exercise_hours;
}

struct fish {
    const char *name;
    const char *species;
    int teeth;
    int age;
    struct preferences care;
}
```

Now to create instances of data:

```c
struct fish snappy = {"Snappy", "piranha", 69, 4, {"meat", 7.5}};
```

As you pass this instance to a function, you can access nested fields using a chain of `.` operators:

```c
printf("Snappy likes to eat %s", snappy.care.food);
```

### `struct` alias

Notice that you have to write the word `struct` both when you are defining the struct and then agein, when you are defining an instance of the struct. You can go around this by creating an **alias** for your struct. Here is the syntax:

```c
typedef struct cell_phone {
    int cell_no;
    const char *wallpaper;
    float minutes_of_charge;
} phone;
```

In this example, `phone` is the alias for `struct cell_phone`. You can use this alias to refer to the struct wherever you need.

```c
phone p = {5557879, "sinatra.png", 1.35};
```

> There are 2 names you need to decide on: name of the struct (`struct cell_phone`) and the name of the type which is also called the alias (`phone`). You can also skip the name of the struct and simply refer to it by the alias. Even if you choose a name for the `struct`, you can always refer to it using the alias. Most of the time, if you create an alias for the `struct`, you won't need a name.

```c
typedef struct {
    float tank_capacity;
    int tank_psi;
    const char *suit_meterial;
} equipment;

typedef struct scuba {
    const char *name;
    equipment kit;
} diver;

void badge(diver d) {
    printf("Name: %s Tank: %2.2f(%i) Suit: %s\n", d.name, d.kit.tank_capacity, d.kit.tank_psim d.kit.suit_material);
}

int main() {
    diver randy = {"Randy", {5.5, 3500, "Neoprene"}};
    badge(randy);
    return 0;
}
```

### Updating `struct` instances

To update a struct, you can use the `.` notation:

```c
fish snappy = {"Snappy", "piranha", 69, 4};
snappy.teeth = 68;
```

### `struct`s in memory

When you define a `struct` you are not actually creating anything in memory. But when you define a new variable, the computer will need to create some space in memory for an **instance** of the `struct`. That space in memor will need to be big enough to contain all of the fields within the `struct`.

If you assign a `struct` to another variable, the computer will create a new copy of the struct. This means that it will need to allocate another piece of memory of the same size, and then copy over each of the fields.

```c
struct fish snappy = {"Snappy", "piranha", 69, 4};
struct fish gnasher = snappy;
```

In this example, `gnasher`, the new instance of the `struct`, will point to the same string literals as `snappy`.

![struct-in-memory](/images/c/struct_in_memory.png);

### `structs` passed as function arguments

Remember that whenever you pass a data using its variable to a function, what the function receives is not the data itself, but it is a copy of the data. So if you modify the data in the function, the original data will still remain untouched. In other words, in C, paramteres are passed to functions **by value**. It is as if the function now has a clone of the original data.

In order to be able to modify the original struct instance in a function, you need a pointer to the struct.

> Reminder: When you passed a variable to the `scanf` function, you could not pass the variable itself, you had to pass a pointer. That is because if you tell the `sacnf` function where the variable lives in memory, then the function will be able to update the data stored at that place in memory, which means it can update the variable. You can do the same with struct updates.

If you want a function to update a struct instance, you can't just pass the struct as a parameter because that will simply send a copy of the data to the function. Instead, you need to pass the address of the struct instance using the `&` operator, and you also need to define your function in a way that it would receive a pointer:

```c
void happy_birthday(turtue *t) {
    (*t).age = (*t).age + 1;
    printf("Happy birthday %s! You are now %i years old!\n", (*t).name, (*t).age);
}

// some code
happy_birthday(&mytrtle)
```

> Notice that `(*t).age` and `*t.age` are very different. The first one is the age of the turtle struct referred to by `*t`. The second one is the value stored at the address given by `t.age`. So `*t.age` is really `*(t.age)`. To make this easier, inventors of C came up with another syntax. So `(*t).age` can be written as `t->age`. This means that you can use it in a function like this:

```c
void happy_birthday(turtle *a) {
    a->age = a->age + 1;
    printf("Happy birthday %s! You are now %i years old!\n", a->name, a->age);
}

// some code
happy_birthday(&mytrtle)
```

## `union`s

Imagine you need to create a `struct` in which you need a `quantity` field that can hold numeric values of amount (`short`), weight (`float`), volume (`float`), etc. In C, you can do this by using a `union`. So it basically allows you to reuse memory space.

Every time you create an instance of a `struct`, the computer will lay out the fields in memory, one after another. A `union`, however, is different. A `union` will use the space for just one of the fields in its definition. So, if you have a `union` called `quantity`, with fields called `count`, `weight`, and `volume`, the computer will give the `union` enough space for its largest field, and then leave it up to you which value you will store in there. Whether you set the `count`, `weight`, or `volume` field, the data will go into the same space in memory

To define a `union` you can use this syntax:

```c
typedef union {
    short count;
    float weight;
    float volume;
} quantity;
```

To set the value for the union you can choose between 2 options:

1. Setting value for the first field: In the example above, the first field is `count`. If you want to set a value for the `count` field of the union, you can use this syntax:

```c
quantity q = {4};
```

> This is the C89 style.

2. Setting value for other fields: There are 2 options here. You can use either the **designated initializers** or the **dot notation**.

```c
// designated initializers (C99) - also works for structs
quantity q = {.weight=1.5};

// dot notation - does NOT work for structs
quantity q;
q.volume = 3.7;
```

So the `union` just gives you a way of creating a variable that supports several different data types.

> Designated initializers can be used to set the initial values of fields in structs as well.

```c
typedef struct {
    const char *color;
    int gears;
    int height;
} bike;

bike b = {.height = 17, .gears = 21};
```

### `union`s and `struct`s

You can use your `union` value anywhere you would use another data type like an `int` or `struct`. For instance:

```c
typedef struct {
    const char *name;
    const char *country;
    quantity amount;
} fruit_order;
```

You can then access the values in the `struc`/`union` combination using the **dot notation** or the `->` notation:

```c
fruit_order apples = {"apples", "England", .amount.weight = 4.2};
printf("This order containes %2.2f lbs of %s\n", apples.amount.weight, apples.name)
```

In the dot notation used above, you can see that `.amount` is for the `struct` and `.weight` is for the `union`.

> There is a big problem when using unions. When you set a value for one field of a union, you may try to read some other field of the union by mistake, and C will not stop you from doing this mistake. For instance you have a `cupcake` union like this:
>
> ```c
> typedef union {
>   float weight;
>   int count;
> }
> ```
>
> But later in your code you might try to read `order.count` by mistake. Some programmers create an `enum` to avoid making such mistakes with unions.

## `enum`s

Sometimes you don't want to store a number or a piece of test. Instead, you want to store something from a **limited list of symbols**. If you want to record a day of the week, you only want to store "MONDAY", "TUESDAY", "WEDNESDAY", etc. You don't need to store the text, because there are only ever going to be seven different values to choose from. To create an `enum` you do this:

```c
enum colors {RED, GREEN, PUCE};
```

> You can also give the enum a proper name using `typedef`.

Any variable defined with a type of `enum colors` can then only be set to one of the keywords in the list. Here is how you can define an `enum colors` variable:

```c
enum colors favorite = PUCE;
```

Under the hood, the computer will just assign numbers to each of the symbols in your list, and the `enum` will just store a number. But you don't need to worry about what the numbers are, your C code can just refer to the symbold. Advantages of using `enum`s are:

1. Your code becomes easier to read
2. It will prevent storing values like `REB` or `PUSE` by mistake

Now how do `enum`s help you keep track of `union`s? Here is an example:

```c
#include <stdio.h>

typedef enum {
    COUNT, POUNDS, PINTS
} unit_of_measure;

typedef union {
    short count;
    float weight;
    float volume;
} quantity;

typedef struct {
    const char *name;
    const char *country;
    quantity amount;
    unit_of_measure units;
} fruit_order;

void display(fruit_order order) {
    printf("This order contains");

    if(order.units == PINTS)
        printf("%2.2f pints of %s\n", order.amount.volume, order.name);
    else if (order.units == POUNDS)
        printf("%2.2f  lbs of %s\n", order.amount.weight, order.name);
    else
        printf("%i %s\n", order.amount.count, order.name);
}

int main() {
    fruit_order apples = {"apples", "England", .amount.count = 144, COUNT};

    fruit_order strawberries = {"strawberries", "Spain", .amount.weigt = 17.6, POUNDS};

    fruit_order oj = {"orange juice", "U.S.A", .amount.volume = 10.5, PINTS};

    display(apples);
    display(strawberries);
    display(oj);
    return 0;
}
```

## `bitfield`s

Let's say you need a `struct` that will contain a lot of yes/no values. You could create the `struct` with a series of `short`s, but the problem is that `short` fields will take up a lot more space than the **single bit** that you need for **true/false** values. This is where `bitfield`s come to play.

A `bitfield` lets you specify how many bits an individual field will store. For instance, you could write your `struct` like this:

```c
typedef struct {
    unsigned int low_pass_vcf:1;
    unsigned int filter_coupler:1;
    unsigned int reverb:1;
    unsigned int sequential:1;
} synth;
```

Notice that `:1` at the end of each declaration line means that the field will only use 1 bit of storage.

> It is important to notice that if you have a sequence of bitfields, the computer can squash them together to save space. In other words, bitfields can save space if they are collected together in a `struct`. But if the compiler finds a single bitfield on its own, it might still have to pad it out to the size of a word. That is why bitfields are usually grouped together. So if you have 8 single-bit bitfields, the computer cna store them in a single byte.

> Notice that bitfields can also be useful for other short-range values like months of the year. If you want to store a month number in a `struct`, you know it will have a value between 0 and 11. So you would only need 4 bits of space to store this type of value. That will be:
>
> ```c
> unsigned int month_no:4;
> ```

# Standard input and output

There is a fundamental concept you need to understand about each and every program running on an operating system. There are three communicating channels or **data streams** established by the operating system for the program: Standard Input, Standard Output, and Standard Error. This way, the operating system controls how data gets into and out of the standard input and output. If you run a program from the command prompt or terminal, the operating system will send all of the keystrokes from the keyboard into the standard input. If the operating system reads any data from the standard output, by default, it will send that data to the display. There is a very good reason why operating systems commiunucate with programs using the standard input and standard output: You can **redirect** the standard input and standard output so that they read and write data somehwere else, such as to and from **files**.

As an example, imagine you have written a C program called `geo2json.c` that takes input data using the `scanf` function of the `<stdio.h>` header file. When you run your program in the terminal:

```
gcc geo2json.c -o geo2json
./geo2json
```

you would have type in the input data in the terminal. However, you can redirect the standar input from keyboard to a file, for example `locations.csv`. Redirecting the standard input is done using the `<` operator.

```
./geo2json < locations.csv
```

Now in the same program, if you are using the `printf` function to output processed data, it will by default, appear in the terminal screen, but you can redirect the output data to a file too. This is done using the `>` operator.

```
./geo2json < locations.csv > output.json
```

This way you will no longer see the output data on the terminal screen. The problem with this redirection of standard output, is that you will probably output your program's errors to the output file too. That is not what you want. In fact, there is a solution for this.

## Standard error

Every C program will have one input and two outputs, as mentioned before. The two outputs are: standard output and **standard error**. The standard error is designed to output errors resulting from exceptions happening in your program. By default, the standard error is sent to the display.

So if you use the standard error in your program while trying to redirect the standard input and output, you will still be able to receive error messages on your terminal display. You can redirect the standard error output using `2>` sign in order to store error messages in a file.

```
./geo2json < locations.csv > output.json 2> errlogs.txt
```

So you can redirect standard input, output and error in the terminal, but you can also do it within your program code using the [`<stdio.h>`](#stdioh) functions.

## Connecting output to input

You can connect (or pipe) the output of one program to the input of another program in the terminal using the `|` sign. For instance, if you want to first execute the `bermuda` program to filter some data and insert the filtered data into the `geo2json` program you can do this in the terminal:

```
(./bermuda | ./geo2json) < locations.csv > output.json
```

> Notice tat if two programs are piped together, both programs run at the same time. As output is produced by the first program, it can be consumed by the second program.

# Header files

C is a very, very small language and it can do almost nothing without the use of external libraries. You will need to tell the compiler what external code to use by including **header files** for the relevant libraries. Here is a list of header files you can `include`.

## `<stdio.h>`

This is probably the library that you will need to include in all your C code files. It contains code that allows you to read and write data from and to the terminal or files.

Here is a list of functions available in this library.

### `puts()`

This function receives a string literal and prints it to the screen.

```c
puts("C rocks!");
```

### `printf()`

This function is used to produce formatted output text. It can receive multiple arguments. The first argument is always the _format string_. The rest of the arguments will be values that are referenced in the format string. Here is an example:

```c
printf("%s says the count is %i", "Ben", 21);
```

> `%s` and `%i` are parameters placed inside the format string. They will be replaced by the arguments passed to the `printf` function after the format string, and they will be replaced in the same order that they were declared in the format string. Also note that paramater `%s` should be replaced by a **string** value, and `%i` should be replaced by an **integer** value.

Here is a list of parameter types that can be inserted into the format string:

- `%s`: string
- `%i`: integer
- `%f`: float
- `%.2f`: formats a floating point number to two decimal places
- `%hi`: short integer
- `%li`: long integer
- `%p`: pointer

> Remember to use double quotes (`" "`) for strings, and single quotes (`' '`) for individual characters.

The `printf` function is just a version of a more general function called `fprintf`. The `fprintf` function sends data to a data stream of your choice. The function receives multiple arguments: first, the data stream you want your data to be sent to. You can choose between `stdout` (which will make `fprintf` the same as `printf`), `stderr`, or you can also establish your own data stream. Second, the data that will be sent which can be in the form of a format string including some parameters. Arguments after this will be the parameters of the format string.

```c
fprintf(stdout, "I like turtles!");
fprintf(stderr, "There was an error reading the file!");
```

Now when you need a data stream of your own other than standard output and standard error, you can use the `fopen` function.

### `scanf()`

This function is used to read input data. The function accepts multiple arguments; first, the format string, and then, pointer variables, or array variables (treated as a pointer variables) being used as format string parameters.

```c
char name[40];
scanf("%39s", name);
```

> Remember that `scanf` returns the number of parameters it reads from the input.

The reason this function takes a pointer is that it is going to update the contents of the pre-defined array. Functions that **update** a variable, don't need the value of the variable, they want its **address**.

The `scanf` function is a version of a more general function called `fscanf`. The `fscanf` function is used to redirect the standard input to a data stream of your choice. You can choose `stdin` (which would make this function the same as `scanf` funciton), or you could create your own input data stream. This function receives first the data stream from which you want to read data. Second, it receives the format string probably with some paramteres, and after that, it receives the variable into which it has to store the input data.

```c
fscanf(stdin, "%79[^\n]\n")
```

### `fopen()`

Each data stream is represented by a pointer to file, and you can create a new data stream using the `fopen` function. The function receives first the file name that you want to be used as your input data stream, and second, the mode which can either be `"r"` for read or `"w"` for write, or `"a"` for append.

```c
FILE *in_file = fopen("input.txt", "r");
FILE *out_file = fopen("output.txt", "w");
```

Once you have created your custom data streams you can read data from or write data to them using the `fprintf` and `fscanf` functions:

```c
fprint(out_file, "Don't wear %s with %s", "red", "green");
fscanf(in_file, "%79[^\n]\n", sentence);
```

Finally, when you are done using your data streams, it is a very good practice to close them using the `fclose` function.

```c
fclose(in_file);
fclose(out_file);
```

#### Entering numbers with `scanf`

If you want to receive input data using the `scanf` function, take this code as example:

```c
int age;
scanf("%i", &age);
```

Just like with strings, you need to give the `scanf` function a pointer. The reason you need to use `&` with an `int` variable but not with a `char`, is the way integers and strings are stored in memory.

#### Buffer overflow with `scanf`

If you forget to limit the length of the string that you read with `scanf()` function, the extra data gets written into memory that has not been properly allocated by the computer. You might get lucky and the data will simply be stored and not cause any problems. However, it is very likely that buffer overflows will cause bugs. It might be called a _segmentation fault_ or an _abort trap_. You program will crash.

To go around this risk, you can use `fgets()` function.

### `fgets()`

Just like `scanf()`, this function takes a `char` pointer, but unlike `scanf()`, this function must be given a maximum length. The first argument received by this function is a pointer to a buffer. The second argument is the maximum size of the string. The third argument determines where the input data is coming from. `stdin` means the data will come from the keyboard.

```c
char food[5];
fgets(food, sizeof(food), stdin);
```

> The buffer size passed as the second argument, includes the sentinel character `\0`. So with `fgets` you don't need to subtract 1 from the maximum string length like what you did to limit input in `scanf`.

> Be careful with the `sizeof` operator that you usually use in the second argument of the function. If you give it a pointer variable, you will receive the size of the pointer, which would be 4 or 8, and not the size of the data itself.

## `<stdlib.h>`

## `<string.h>`

This is a part of the C standard library that is dedicated to **string manipulation**. Concatenenating strings together, copying one string to another, comparing two strings and searching within strings are among the functionalities provided to you by this header file.

### `strchr()`

This function returns the location of a character inside a

### `strstr()`

This function receives two stirng arguments. The second one is the string that you want to look for inside the first string. The function returns the address of the second string in memory.

```c
char s0[] = "dysfunctional";
char s1[] = "fun";

if(strstr(s0, s1))
    puts("I found fun in dysfunctional!");
```

### `strcmp()`

This function compares two strings.

### `strcpy()`

This function copies one string to another.

### `strlen()`

This function returns the length of a string.

### `strcat()`

This function concatenates two strings.

Find out more about `string.h` functions at:

```
http://tinyurl.com/82acwue
```

## `<unistd.h>`

Library description...

### `getopt()`

This function is used to get command line options that are used along with a program execution command. Each time you call this function, it will return the next option it finds on the command line.

For instance, imagine you have a program that can take a set of different options:

```
./rocket_to -e 4 -a Brasilia Tokyo London
```

Based on this command, this program takes these options:

1. one option that takes a value: `-e` referring to 'engines' and `4` as value.
2. one option that is simply on or off: `-a`
3. The `Brasilia Tokyo London` arguments are the arguements by which the `main` function is going to be called. They are not command-line options. We will write a special code to move to these arguments after the command-line options are read.

You can handle these options by calling `getopt` in a loop:

```c
#include <unistd.h>

// some code

while ((ch = getopt(argc, argv, "ae:")) != EOF)
    switch(ch) {
        // some code
        case 'e':
            engine_count = optarg;
        // some code
    }

argc -= optind;
argv += optind;
```

inside the `while` condition statement, the `"ae:"` inserted as the 3rd argument of the `getopt` function means that both `a` and `e` options are valid, and also because of `:` the `e` option needs an argument (value). Then inside the switch statement, on case `e`, you are actually using the value passed for the `e` option using the `optarg` keyword.

The two lines after the the loop make sure that you skip past the options that are read. `optind` stores the number of strings read from the command line to get past the options. So `Brasilia Tokyo London` are the arguments by which the `main` function of the program is going to be called. So:

```c
argv[0] == "Brasilia";
argv[1] == "Tokyo";
argv[2] == "London";
```

Unlike when you run a program with no options, but with arguments for the `main` function, where `argv[0]` is the program's name, here it is not the case since we are using command-line options before command-line arguments.

> Since the command-line options are read using a switch statement, it does not matter if you change the order you enter them in your command.

> The program will consider all values starting with `-` in the terminal as command-line options only if they are inserted before the command-lind arguments.

## `<limits.h>`

This library is used to observe the values for integer types like `int` and `char`.

```c
#include <stdio.h>
#include <limits.h>

int main() {
    printf("The value of INT_MAX is %i\n", INT_MAX);
    printf("The value of INT_MIN is %i\n", INT_MIN);

    printf("The value of CHAR_MAX is %i\n", CHAR_MAX);
    printf("The value of CHAR_MIN is %i\n", CHAR_MIN);
}
```

> The values may differ on different machines.

## `<float.h>`

This library is used to observe the values for `float` and `double` types.

```c
#include <stdio.h>
#include <float.h>

int main() {
    printf("The value of FLT_MAX is %f\n", FLT_MAX);
    printf("The value of FLT_MIN is %f\n", FLT_MIN);

    printf("The value of DBL_MAX is %f\n", DBL_MAX);
    printf("The value of DBL_MIN is %f\n", DBL_MIN);
}
```

> The values may differ on different machines.

## `<stdlib.h>`

This library includes functions to manage [dynamic memory](#dynamic-storage).

### `atoi()`

The function name stands for **ASCII To Integer**. It converts the numbers in string form to their integer value. It accepts a string (which represents an integer) as a parameter and yields an integer value in return.

```c
atoi("C");
// returns 0 (as int)

atoi("4");
// returns 4 (as int)
```

### `malloc()`

This function is used to allocate space dynamically from the heap for a specific data. This function is, most of the times, used with `sizeof` operator to detemine the byte size of space that is needed to store some data. The function returns a pointer to the allocated space.

### `free()`

This function is used to free up a space that was previously allocated to some data using the `malloc` function. The function receives the pointer that was received previously by the `malloc` function.

### `qsort()`

This is a sorting function that accepts a pointer to a **comparator function**, which will be used to decide if one piece of data is the same as, less than, or greater than another piece of data. This is what the function looks like:

```c
qsort(void *array, size_t length, size_t item_size, int (*compare)(const void *, const void *));
```

> Notice that `void *` pointer can point to anything. `size_t` is the size of a varible.

The `qsort` function compares pairs of values over and over again, and if they are in the wrong order, the computer will switch them. Here comes the comparator function. This function will tell `qsort` which order a pair of elements should be in. It does this by returning 3 different values:

1. If the first value is greater than the second value, it should return a **positive** number.
2. If the second value is less than the second value, it should return a **negative** number.
3. If the two values are equal, it should return **zero**.

#### Deeper into the comparator

The signature of the comparator function that `qsort` needs shows that it needs to take two `void` pointers given by `void *`.

> Remember `void *` when we used `malloc`? A void pointer can store the address of any kind of data, but you always need to **cast** it to something more specific before you can use it.

The `qsort` function works by comparing pairs of elements in the array and then placing them in the correct order. It compares the values by calling the comparator function that you give it.

```c
int compare_scores(const void *score_a, const void *score_b) {
  // some code
}
```

Values are always passed to the function as pointers, so the first thing you need to do it **get the integer values from the pointers**:

```c
int compare_scores(const void *score_a, const void *score_b) {
  // This is casting the `void` pointer to an integer pointer
  int a = *(int*)score_a;
  int b = *(int*)score_b;
}
```

Then you need to return a positive, negative, or zero value, depending on whether `a` is greater than, less than, or equal to `b`. For integers, it is very easy:

```c
int compare_scores(const void *score_a, const void *score_b) {
  // This is casting the `void` pointer to an integer pointer
  int a = *(int*)score_a;
  int b = *(int*)score_b;

  // Returning a value
  return a - b;
}
```

You then need to ask `qsort` to sort the array:

```c
qsort(scores, 7, sizeof(int), compare_scores);
```

## `<stdarg.h>`

This header file includes macros that help us define variadic functions. To learn more, refer to [variadic functions](#variadic-functions).

## Your own header files

To create your own header files, you need to do 2 things:

1. Create a new file with `.h` extension: If you are writing a program called `totaller`, then create a file called `totaller.h` and write your declarations inside it:

```c
// totaller.h
float add_with_tax(float f);
```

> You don't need to include a `main` function here in the header file, because nothing else will need to call it.

2. Include your header file in your main program: At the top of your program, you should add an extra `include` statement:

```c
// totaller.c
#include <stdio.h>
#include "totaller.h"
```

When the compiler reads the `#include` statement, it will read the contents of the header file, just as if it had been typed into the code.

Separating the declarations into a separate header file keeps your main code a little shorter. This technique is especially useful when you want to get yourself out of trouble with thinking about the order of function declarations in your program. This also has another big advantage.

There are other situations when you need to re-use a specific functionality that you have written previously in multiple other programs. This basically means that you have a special functionality written in a `.c` file, and you would like to share it in some other `.c` files. If the compiler can somehow include the shared code when it is compiling your program, you will be able to re-use the same code in multiple applications. But there is a problem. Up until this point you have only ever created programs from one single `.c` file. What we are talking about right now is a program that consists of multiple `.c` programs. In other words, you now want to give the compiler a set of source code files, and not just one source code file. It means that the compiler would have to create a single executable program from several files. How is it going to work?

1. To do this, you first need to create a header file for the shared code. If you are going to share the `encrypt.c` code between programs, you need some way to tell those programs about the encrypt code. You do this with a header file.

```c
// encrypt.h
void encrypt(char *message);
```

2. Then you include the header inside `encrypt.c` file:

```c
// encrypt.c
#include "encrypt.h";

void encrypt(char *message) {
    char c;
    while (*message) {
        *message = *message ^ 31;
        message++;
    }
}
```

3. You can then include `encrypt.h` in your program. This time you are not using the header file to just record the functions. You are using it to tell other programs about the `encrypt()` function:

```c
// message_hider.c
#include <stdio.h>
#include "encrypt.h"

int main() {
    char msg[80];
    while(fgets(msg, 80, stdin)) {
        encrypt(msg);
        printf("%s", msg);
    }
}
```

4. Finally, to compile everything together you just need to pass the source files to `gcc`:

```
gcc message_hider.c encrypt.c -o message_hider
```

> You now know how to share functions between different files. But what if you want to share variables? Source code files normally contain their own separate variables to prevent a variable in one file affecting a variable in another file with the same name. But if you are really going to share variables, you should declare them in your header file and prefix them with `extern` keyword:
>
> ```c
> // encrypt.h
> extern int passcode;
> ```

### Frsutrating problems

With this approach and the steps described above, you are going to face a serious problem. Imagine you are working on a huge program with a lot of functions in many separate files, and you are currently developing the program. This means that even after a simple change in one of the source files, you need to compile all the source files and regenerate the single executable file, but that is not really necessary. You don't need to re-compile the files that did not change. To find a solution to this problem, you need to understand what the compiler does when you execute your command in the terminal.

when you use this command for example:

```
gcc reaction_control.c pitch_motor.c engine.c after_burner.c -o launch
```

The compiler will run the preprocessor, compiler and assembler for each source code file, even the ones that have not changed. This will then generate an **object code** for each file. If a file has not changed, its object code will not change also, so the same object code would be generated again, which is not necessary. Anyways, after generating all the object codes, they will all be passed to the compiler for the **linking** process, where object codes are **linked** to produce a final executable file. Now during development, when you change some small code in just one file, you don't want to regenerate object codes for all the files. The solution to this problem is to save copies of object codes during the compiling process and use them in the next compiling process if their source files have not changed. So generating object files will be done only for files that have changed. Then the liking process will be done again to recreate the final executable file. So, as a general solution, how do you tell GCC to save the object codes somewhere? And then how do you tell it to link the object files as a separate command?

> How does the linker work? Once you initiate the command to compile you code, the compiler works out what needs to be done to join some files together and then calls the linker. The linker stitches pieces of compiled code together, a bit like a telephone operator. The old telephone operators would patch calls from one location to another so the two parties could talk. An object file is like that. An object file might need to call a function that is stored in some other file. The linker link together the point in one file where the function call is made to the point in another file where the function lives.

1. Compile source codes into object files: To do this you can use this command to compile all source codes (`.c`) into object codes:

```
gcc -c *.c
```

The `*.c` pattern translates to "all files with `.c` extension". The `-c` flag will tell the compiler to only create object codes, but don't link them together into a final executable file.

2. You can now link the object files created during the previous step. By separating the two steps, you are actually storing object files that are generated during the whole compilation process. The command to do this is:

```
gcc *.o -o launch
```

The `*.o` translates to "all files with `.o` extension", targetting all the object files created during the previous step. This time, the `-o` flag will take object files as srouce files of the process, but the compiler is smart enough to understand that these are not source codes. Finally, the `launch` string detemines the name for the final executable file that should be generated by this command.

Now as for the problem mentioned above, when you are developing your code, and you make a slight change in just on of your source files, you don't need to create object files for all the source files (`*.c`). You can just target the changed file:

```
gcc -c thrusters.c
```

Then you perform the linking process to recreate the final executable file:

```
gcc *.o -o launch
```

> Notice that the linking process should be executed on all the object files, even ff just one of the object files are updated.

Ok, everything seems to work fine, but we have another problem. It is really hard to keep track of the files that have changed and remembering to use this solution only for the changed files. So it is true that partial compiles are a lot faster, but you really have to think more carefully to make sure you recompile everything you need. There should be a way to automate this process, and this is where the **Make** tool comes to play.

### The make tool

Thinking about the source files and their object files this way enables us to automate this process: If `thruster.c` is newer than `thruster.o` regarding its timestamp, you need to recompile it, so as to update the object file with the new version of source code. If `thruster.o` is newer than `thruster.c`, then everything is fine and you don't need to recompile. This is exactly how the make tool works. Before being able to use the make tool, you need to tell `make` about your source code and how you want to build the code.

Every file that `make` compiles is called a **target**. For every target,`make` needs to be told 2 things:

1. The dependencies: which files the target is going to be generated from.
2. The recipe: the set of instructions it needs to run to generate the file.

Together, the dependencies and the recipe form a **rule**.

> The make tool is not limited to compiling files. A **target** is any file that is generated from some other file. So a target migh be a zip archive that is generated from the set of files that need to be compressed.

#### How make works

Let's go over an example. If you want to compile `thruster.c` into some object code in `thruster.o`, the **target** is the object file, and the **dependency** is the source `.c` file, because the compiler needs it to generate the object file. The recipe or the **rule** would be the compile command that you enter in terminal:

```
gcc -c thruster.c
```

Now that `make` knows the dependency and the recipe, you can leave it to `make` to decide when it needs to recompile.

As for the next step, once your object files are created, you are going to use them to create the `launch` program, which is the final executable file. This means that the `launch` file can also be set up as a **target**. The **dependencies** for this file are all the `.o` files. So the rule for this step would be:

```
gcc *.o -o launch
```

When `make` knows about all dependencies and rules, all you have to do is tell it to create the `launch` (final executable) file. Then `make` will take care of all the details.

#### The `makefile`

All details about the targets, dependencies, and recipes need to be stored in a file called either `makefile` or `Makefile`. Imagine you have a set of source files that together create the `launch` executable program.

![project_structure](/images/c/project_structure.png)

The `launch` executable is made by linking the `launch.o` and `thruster.o` files. These files are, in turn, compiled from their matching `.c` and `.h`files, but notice that the `launch.o` also depends on `thruster.h` file because it contains code that will need to call a function in the `thruster.c` file. So this would be how you should describe everything for `make` in the `makefile`:

```makefile
launch.o: launch.c launch.h thruster.h
    gcc -c launch.c

thruster.o: thruster.h thruster.c
    gcc -c thruster.c

launch: launch.o thruster.o
    gcc launch.o thruster.o -o launch
```

> Notice that all recipes must begin with a **tab** character.

After writing the `makefile`, you need to save it in the same directory of your project, and then open up the console and type:

```
make launch
```

You will see:

```
gcc -c launch.c
gcc -c thruster.c
gcc launch.o thruster.o -o launch
```

Now if, during development, you make a change to, for example, the `thruster.c` file and then run `make` again, you will see:

```
gcc -c thruster.c
gcc launch.o thruster.o -o launch
```

Notice that `make` no longer needs to compile `launch.c` since it did not change. The only file that was recompiled was `thruster.c`. Then it would also need to do the linking again and regenerate the executable `launch` file.

> `make` is most commonly used to compile code. But it can also be used as a command-line installer, or a source control tool. In fact, you can use `make` for almost any task that you can perform on the command line.

## Your own libraries available all over your machine

Imagine you have written some pieces of code to produce a set of functions that are really useful when used together. For instance, an `encrypt()` function and a `checksum()` function can be used together for security purposes. This is a good case to build a security library and share it among many programs that live in different directories of your machine. So the security library must be available all over your machine. How could you do that?

To do this, you need to share `.h` header files and `.o` object files between programs.

### Sharing header files

To share header files you have 3 options:

1. Store them in a standard directory: If you copy your header files into one of the standard directories, you can include them in your source code using angle brackets `<>`.

```c
#include <encrypt.h>
```

2. Put the full pathname in your include statement: If you want to store your header files somewhere else, such as `/my_header_files`, you can add the directory name to your `include` statement.

```c
#include "/my_header_files/encrypt.h"
```

3. You can tell the compiler where to find them: The final option is to tell the compiler where it can find your header files. You can do this with the `-I` option on GCC:

```
gcc -I/my_header_files test-code.c -o test_code
```

This will tell the GCC compiler that there is another place where it can find header files. It will still search in al lthe standard places, but first, it will check the directory names in the `-I` option.

> On Unix-style systems like Mac or Linux, if you include headers using angle brackets, the compiler will look for the files under these directories:
>
> ```
> /usr/local/include
> often used for header files for third-party libraries.
> this path will be checked first.
>
> /usr/include
> used for operating system header files.
> ```

### Sharing object files

You can always put your `.o` object files into some sort of shared directory. Once you have done that, you can then just add the full path to the object files when you are compiling the program that uses them.

```
gcc -I/my_header_files test_code.c
      /my_object_files/encrypt.o
      /my_object_files/checksum.o -o test_code
```

Using the full pathname to the object files means you don't need a separate copy for each C project. In other words, if you compile your code with the full pathname to the object files you want to use, then all your C programs can share the same `encrypt.o` and `checksum.o` files.

This works fine if you just have one or two object files to share, but what if you have a lot of them? Is there a way of telling the compiler about a bunch of object files? Yes! If you create an **archive** of object files, you can tell the compiler about a whole set of object files all at once. An archive is just **a bunch of object files wrapped up into a single file**. By creating a single archive file of all your security code, you can make it a lot easier to share the code between projects.

> Object codes included in archives are completely different in different operating systems.

## Creating an archive

A file containing other files is called an archive file with a `.a` extension. You can look into an archive using the `nm` command in the terminal:

```
nm libl.a
```

This might be the returning report:

```
libl.a(libmain.o):
00000000000003a8 s EH_frame0
U _exit
0000000000000000 T _main
00000000000003c0 S _main.eh
U _yylex
libl.a(libyywrap.o):
0000000000000350 s EH_frame0
0000000000000000 T _yywrap
0000000000000368 S _yywrap.eh
```

> `T` means 'text' which means it is a function. `T _main` means that `libmain.o` ocntains a `main()` function.

This command lists the **names** that are stored inside the archive. The `libl.a` archive shown here contains two object files: `libmain.o` and `libyywrap.o`. Let's now see how we can store our `encrypt.o` and `checksum.o` files in an archive.

You can use the `ar` (archive command) to store a set of object files in an archive file:

```
ar -rcs libhfsecurity.a encrypt.o checksum.o
```

Let's now examine the command in detail:

- `r` in the options means the `.a` file will be updated if it already exists.
- `c` in the options means the archive will be created without any feedback.
- `s` in the options tells the command to create an index at the start of the `.a` file.
- `libhfsecurity.a` is the name of the `.a` file to create.
- The rest of the names are the files that will be stored in the archive.

> The standard way of naming archives is `lib<something>.a`. The names start with `lib` because they are **static libraries**. We will learn about this later. Make sure you always follow this naming rule, otherwise your compiler will have problems tracking them down.

You will then have to store the archive file in a library directory. You have a couple of choices:

1. Standard directory: You can put your `.a` file in a standard directory like `usr/local/lib`. On Linux, Mac, and Cygwin, this directory is a good choice because that is the directory set aside for your own local custom libraries.
2. Other directory: You can put the `.a` file in you own `/my_lib` directory if you are still developing your code, or if you don't feel comfortable installing your code in a system directory.

### Using your archive

The whole point of creating a library archive was so you could use it with other programs. If you have installed your archive in a standard directory, you can compile your code using the `-l` switch:

```
gcc test_code.c -lhfsecurity -o test_code
```

Remember to list your source files before the `-l` switch. If you are using several archives, you can set several `-l` options.

In case you put your archive somewhere else, like `/my_lib` you would have to use the `-L` option to say which directories to search:

```
gcc test_code.c -L/my_lib -lhfsecurity -o test_code
```

### Some notes around your archives

1. You can see what is inside your aarchive using this command:

```
ar -t <filename>
```

2. Object files in an archive are not linked together. They are stored in the archive as distinct files.
3. You cannot put any kind of file in a library archive. The `ar` command will check the file type before including it.
4. You can extract a single objcet file from an archive using this command:

```
ar -x libhfsecurity.a encrypt.o
```

## Static vs. dynamic linking

You have already seen that you can build programs using different pieces of object code. You have created `.o` files and `.a` archives, and you have linked them together into a single executable. But once they are linked, you cannot change them. If you build programs like this, they are **static**. Once you have created a single executable file from the separate pieces of object code, you really have no way of changing any of the ingredients without rebuilding the whole program. Is there a way around this?

The reason you cannot change the different pieces of object code in an executabl file is that they are all contained in a single file. They were statically linked together when the program was compiled. But if your program was not just a single file - if your program was made up of lots of separate files that only joined together when the program was run - you would avoid the problem.

So the trick is to find a way of storing pieces of object code in separate files and then **dynamically linking** them together only when the program runs. But you have already got separate files containing object code: the `.o` files and the `.a` files. Does that mean you just need to tell the computer not to link the object files until you run the program? It is not that easy!

Simple object files and archives don't have quite enough information in them to be linked together at runtime. There are other things our dynamic library files will need, like the **names of the other files** they need to link to.

### Dynamic libraries

Dynamic libraries are similar to those `.o` files you have been creating, but they are not quite the same. Like an archive file, a dynamic library can be built from several object files, but unlike an archive, the object files are properly linked together in a dynamic library to form a single piece of object code.

![dynamic-library-character](/images/c/dynamic-library-character.png)

How do you create your own dynamic libararies?

#### Creating dynamic libraries

1. Create an object file: Imagine you have a `hfcal.c` code which is going to act as your dynamic libarary. You first need to compile it into an object file like this:

```
gcc -I/includes -fPIC -c hfcal.c -o hfcal.o
```

> Remember `-c` means just compile and don't link. The `hfcal.h` header is in `/includes` directory.

Compare this to the previous command you used. The only difference is the `-fPIC` flag. This flag tells GCC that you want to create **position-independent code**. Some operating systems and processors need to build libraries from position-independent code so that they can decide at runtime where they want to load it into memory.

position-independent code is code that does not mind where the computer loads it into memory. Imagine you had a dynamic library that expected to find the value of some piece of global data 500 bytes away from where the library is loaded. Bad things would happen if the operating system decided to load the library somewhere else in memory. If the compiler is told to create position-independent code, it will avoid problems like this.

> Some operating systems, like Windows, use a technique called **memory mapping** when loading dynamic libraries, which means all code is effectively position-independent. If you compile your code on Windows, you might find that GCC will give you a warning that the `-fPIC` option is not needed. You can either remove the `-fPIC` flag, or ignore the warning. Either way you code will be fine.

> Dynamic libraries are available on most operating systems, and they all work in pretty much the same way. But what they are called can vary a lot. On Windows, dynamic libraries are usually called **dynamic link libraries** and they have the extension `.dll`. On Linux and Unix, they are **shared object files** with `.so` extension, and on Mac they are just called **dynamic libraries** with `.dylib` extension.

2. Convert the object file into dynamic libraries: Even though the files have different extensions on different systems, you can create them in very similar ways:

```
gcc -shared hfcal.o -o
```

The `-shared` option tells GCC that you want to convert an `.o` object file into a dynamic library. When the compiler creates the dynamic library, it will store the name of the library inside the file. So if you create a library called `libhfcal.so` on Linux, the `libhfcal.so` file will remember that its library name is `hfcal`. This means that if you compile a library with one name, you cannot just rename the file afterward. If you need to rename a library, recompile it with the new name.

3. Compile your program: Once you have created the dynamic library, you can use it just like a static lirary. So you can build your program (for instance called `elliptical`) like this:

```
gcc -I\include -c elliptical.c -o elliptical.o
gcc elliptical.o -L\libs -lhfcal -o elliptical
```

Even though these are the same commands you would use if `hfcal` where a static archive, the compile will work differently. Because the library is dynamic, the compiler will not include the library code into the executable file. Instead, it will insert some placeholder code that will track down the library and link to it at runtime.

4. Run your program:
   - On a Mac: you can just run the program. When the program is compiled on the Mac, the full path to the `/libs/libhfcal.dylib` file is stored inside the executable, so when the program starts, it knows exactly where to find the library.
   - On Linux: The compiler just records the filename of the `libhfcal.so` library, without including the path name. That means if the library is stored outside the standard libarary directories (like `/usr/lib`), the program will not have any way of finding the `hfcal` library. To get around this, Linux checks additional directories that are stored in the `LD_LIBRARY_PATH` variable. If you make sure your library directory is added to the `LD_LIBRARY_PATH` and if you make sure you **export** it - then your program will find `libhfcal.so`. To do this you can first use this command: `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/libs` and then run your program `./elliptical`. Notice that if the library is somehwere standard (like `/usr/lib`) there is no need to set the `LD_LIBRARY_PATH`.
   - On Windows: Both Cygwin and MinGW versions of the GCC compiler create Windows DLL libraries and Windows executables. And just like Linux, Windows executables store the name of the `hfcal` library without the name of the directory where it is stored. But Windoes does not use a `LD_LIBRARY_PATH` variable to hunt the library down. Instead, Windows programs look for the library in the current directory, and if they don't find it there, the programs search for it using the directories stored in the `PATH` variable.
     - Cygwin: If you have compiled the program using Cygwin, you can run the program from the _bash shell_ like this: `PATH="PATH:/libs"` and then run the program `./elliptical`.
     - MinGW: If you have compiled the program using MinGW, you can run it from the command prompt using this command: `PATH="%PATH%:C:/libs"` and then run your program `./elliptical`.

If all this seem a bit complex, you should know that this is why most programs that use dynamic libraries store them in one of the standard directories. On Linux or Mac, they are normally in directories like `/usr/lib` or `/usr/local/lib`, and on Windows developers normally keep `.dll`s stored in the same directory as the executable.

# Strings

C is a more low-level than most other languages. Because of that, instead of strings, C uses something similar to strings: **an array of single characters**. With this in mind, in order to define a variable that can hold a string, we would actually have to define an **array** that its **elements** are single **characters** in addition to the arrays's **length**. This would look like:

```c
char some_string[5];
```

This allocates memory for a string with a length of 5 characters. It is extremly important to remember that when you define a string array like this, you will actually be able to store strings with 4 characters. Why not 5? Because whenever you store a string in memory, C will always place a _sentinel character_ (`\0`) at the end of the string. So, for example, if you insert `fork` as string into the `some_string` variable, the array would actually be like:

```
{'f', 'o', 'r', 'k', '\0'}
```

> C needs the sentinel character to be able to know where your string ends. C is usually not very good at keeping track of how long arrays are.

You can then refer to the 3rd element of this string array using this syntax in your code:

```c
some_string[2];
// It would be 'r'
```

## Defining strings

You can define your strings as either **string literals** or **explicit arrays**. Stirng literals are the usual and easier way to go. There is only one difference however: string literals are **constant**. This means that once you define your string as a string literal and store it in a variable, you will no longer be able to change its individual characters. If you try to do so, GCC will return a _bus error_. This error means that your program cannot update that piece of memory where your string is stored.

You should understand that defining strings in the form of arrays has a very important implication. When you create an array, the array variable can be used as a pointer that refers to the start of the array in memory. It means that when C reads a line of code like this:

```c
char quote[] = "Cookies make you fat";
```

the computer will set aside space on the stack for each of the characters in the string, plus the `\0` end character. It will also associate the **address of the first character** with the `quote` variable. So every time the `quote` variable is used in the code, the computer will replace it with the address of the first character of the string. In fact, the array variable is just like a pointer.

> IMPORTANT: The array variable is actually not a pointer variable, but it can be used or treated as a pointer in some situations. You will learn about this later.

Let's now go over 2 examples in defining a string.

### Define a pointer variable for a literal string

Imagine you are defining a string likes this:

```c
char *cards = "JKQ";
```

When the computer reads this line of code, it proceeds over 3 steps:

1. The computer loads the string literal: When the computer loads the program into memory, it puts all of the **constant values** - like the string literal "JKQ" - into the **constant memory block**. This section of memory is **read-only**.
2. The program creates the cards variable on the stack: The stack is the section of memory that the computer uses for **local variables**; that is, variables inside functions.
3. The `cards` variable is set to the address of the "JKQ" literal string: The `cards` variable will contain the address of the string literal assigned to it. String literals are usually stored in read-only memory to prevent anyone from changinig them.

Now if the computer tries to change the string, based on some instructions in your code, it won't succeed because the string is read-only.

### Define an array variable for a literal string

Imagine you define a string in your code like this:

```c
char cards[] = "JKQ";
```

When the computer reads this line of code, it proceeds over 3 steps:

1. The computer loads the string literal: Just like before, the computer stores the constant values like the literal string into read-only memory.
2. The program creates a new array on the stack: Since you are declaring an array, the program will create one large enough to store the "JKQ" string.
3. The program **initializes** the array: As well as allocating the space for the array, the program will also copy the contents of the string literal into the stack memory.

The difference between the two mentioned approaches is that the first one used a pointer to point to a read-only string literal, but the second one deifnes an array in the stack and initializes the array with the string literal, so you would have a copy of the letters of the string and you can change them as much as you need.

> There is nothing wrong with defining a pointer variable that points to a literal string as long as you are not intending to modify the string literal later in your code. Therefore, as a good practice, it is recommended to mark such pointer variable with `const` so if you accidentally try to modify the string at some point in your code, the compiler will let you know with an error. The `const` modifier is actually used on any variable that you need to prevent its value from being modified.

```c
const char *s = "some string";
```

## Passing strings to a function

Passing simple values to functions is easy, but what if you want to send a string to a function, regarding that a string is actually an array of single characters? In order to be able to receive a string in a function, you should define the function in a way that it is ready to receive an array of characters:

```c
void print_message(char msg[]) {
    printf("message: %s", msg);
}

char quote[] = "Cookies make you fat";
print_message(quote);
```

Since strings are defined as arrays in C, it is important to go deep into how pointers and arrays work together in the [pointers and arrays section](#pointers-and-arrays).

## Defining a sequence of strings

When you want to store a list or a sequence of strings, you need to define it as an array of arrays, where inner arrays store characters. For exmple, if you want to store a list of music track by their names, you can define an array of arrays like this:

```c
char tracks[][80] = {
    "I left my heart in Harvard Med School",
    "Newark, Newark - a wonderful town",
    "Dancing with a Dork",
    "From here to maternity",
}
```

In `tracks[][80]` the second set of brackets indicate the size of inner arrays that store track names. We are defining them to be of length 80. The first set of brackets defines the outer array, which wraps the inner ones. We didn't specify the length of the outer array because we are initializing the outer array right at the point of declaration. So the compiler will understand its length.

Another option to define a sequence of strings is to create an array of pointers.

```c
char char *names_for_dog[] = {"Bowser", "Bonza", "Snodgrass"};
```

This way, there will be one pointer for each string literal, and these pointers will be stored in the defined array.

# Pointers

A pointer is just an address of a piece of data in memory. Pointers are used in C for a couple of reasons:

1. Instead of passing around a whole copy of the data, you can just pass a pointer.
2. You might want two pieces of code to work on the same piece of data rather than a separate copy.

> Pointers are a form of indirection. If you are not careful, you can quickly get lost chasing pointers through memory.

Everytime you declare a variable, the computer creates space for it somewhere in memory. If you declare a variable inside a function like `main`, the computer will store it in a section of memory called the **stack**. If a variable is declared outside any function, it will be stored in the **globals** section of memory.

Take this code as an example:

```c
int y = 1;

int main() {
    int x = 4;
    return 0;
}
```

Now you have `y` stored in the globals section, while `x` will be stored in the stack. Variable `y` might have an address like `1,000,000`. Variable `x` might have an address like `4,100,000`. The values assigned to these variables will be stored inside these addresses.

Now if you want to find out the memory address of a variable, not the value assigned to it, you can use `&` operator:

```c
printf("x is stored at %p", &x);
```

> Remember that in order to replace a format string paramater with a pointer address value, you should define it as `%p`.

You will find out that memory addresses are something like `0x3E8FA0`. This is actually a value address like `4,100,000` in **hex** (base 16) format.

The address of the variable tells you where to find the variable in memory. This is why an address is also called a pointer, because it points to the variable in memory.

## How to work with pointers

There are 3 things you need to know in order to be able to use pointers to read and write data:

1. Get the address of a variable: you can find where a variable is stored in memory using the `&` operator.

```c
int x = 4;
printf("x lives at %p", &x);
```

You will most probably need to store the address of a variable in another variable, so that you can access it whenever you need:

```c
int *address_of_x = &x;
```

> Notice that the **pointer variable** is defined using `*`.

2. Read the contents of an address: when you have a memory address, you will want to read the data that is stored there. You do this with the `*` operator:

```c
int value_stored = *address_of_x;
```

> The `*` and `&` operators are opposites. The `&` operator takes a piece of data and tells you where it is stored, so it tells you the data's address in memory. The `*` operator takes an address and tells you what data is stored in that address.

3. Change the contents of an address: if you have a pointer variable and you want to change the data at the address where the variable's pointing, you can use the `*` operator again, but this time, you need to use it on the left side of the assignment:

```c
*address_of_x = 99;
```

## Pointers and arrays

C behaves a little complicated when it comes to array variables and pointers. Let's review some facts from before.

Array variables are like pointers. They are NOT pointers, but they can be used as pointers. When you define an array like this:

```c
char quote[] = "Cookies make you fat";
```

and pass it to a function defined as:

```c
void print_message(char msg[]) {
    printf("Message is: %s", msg);
}
```

the `msg` variable defined as the function's argument will only contain the address pointing to the start of the array. The `msg` variable is not the array itself. The `quote` variable is the actual array variable. This variable is not a pointer, it is the array itself.

So array variables are not pointers, although they can be used as pointers, but there are 3 important differences. To understand these, take this code as an example:

```c
char s[] = "How big is it?";
char *t = s;
```

1. `sizeof(an array)` is the size of an array: If you give an array variable to the `sizeof` operator, although the array variable holds the address to the start of the array, but C is smart enough to understand that you want the size of the actual array, not the pointer that points to the start of the array. So regarding the code above, `sizeof(s)` will return with the size of array, which is `15`, whereas `sizeof(t)` will return with the size of the pointer, which can either be `4` or `8`.
2. The address of the array is the address of the array: Althouth an array variable actually points to the start of the array, it is different than a regular pointer variable. If you use the `&` operator on an array variable, it will return with the array variable itself. So the address of the `s` variable is just `s`, while the address of `t` is the address of the variable that points to the `s` array.

```
&s == s
&t != t
```

3. An array variable cannot point anywhere elese: When you create an array, the computer will allocate space to store the array, but it will not allocate any memory to store the array variable. The compiler simply plugs in the address of the start of the array. Compare this to a pointer variable that upon creation, the machine will allocate 4 or 8 bytes of space to store the variable itself. Since array variables don't have allocated storage, it means you cannot point them at anything else:

```c
c = t;
// results in compile error
```

### Pointer decay

Because array variables are slightly different from pointer variables, you need to be careful when you assign arrays to pointers. If you assign an array to a pointer variable, then the pointer variable will only contain the address of the array. The pointer does not know anything about the size of the array, so a little information has been lost. That loss of information is called _decay_.

Every time you pass an array to a function, you'll decay to a pointer, so it is unavoidable. But you need to keep track of where arrays decay in your code, because it can cause very subtle bugs.

## Pointers have types

We can do arithmatic operations with pointers. But this arithmatic is sneaky. If you add 1 to a `char` pointer, the pointer will point to the very next memory address. But that is just because a `char` occupies 1 byte of memory. With `int` pointer, knowing that integers usually take 4 bytes of space, if you add 1 to the pointer, the compiled code will actually add 4 to the memory address. So the pointer types exist so that the compiler knows how much to adjust the pointer arithmatic.

> Pointer arithmatics is the actual reason why array indexes start from 0.

# Data structures and Dynamic memory

It is interesting to know that C does not really come with any data structures built in. You have to create them yourself.

## Linked list

When you need to store a list of some data and you are not sure about the length of this list, an array might not be a good choice. You would probably have to use a **linked list**.

Linked lists of like chains of data. It is also an example of an **abstract data structure**. It is called abstract because a linked list is _general_: it can be used to store a lot of different kinds of data.

A linked list stores **a piece of data**, and **a link to another piece of data**. In such list, as long as you know where the list starts, you can travel along the list of links, from one of piece of data to the next, until you reach the end of the list. With linked lists, it is really easy to insert a new piece of data into the list, even in the middle. But with arrays, it is really hard to insert new data in the middle. Therefore, linked lists allow you to store a **variable amount of data** and they make it simple to **add more data**.

### Creating a linked list

Each one of the `struct`s in the list will need to connect to the one next to it. A `struct` that contains a link to another `struct` of the same type is called a **recursive structure**. This is how you define a recursive `struct` for a linked list:

```c
typedef struct island {
    char *name;
    char *opens;
    char *closes;
    struct island *next;
} island;
```

> Remember that when you use the `typedef` command you can normally skip giving the `struct` a name. Here, however, notice that you MUST give the structure a name, and you cannot omit it like you did before. This is because you need to refer to the `struct` inside itself since it is a recursive structure.

To store a link from one struct the next, you need a **pointer**. So the island data will contain the address of the next island. Whenever our code is at one island, it will always be able to hop over to the next island.

Let's now, as an example, create some islands:

```c
island amity = {"Amity", "09:00", "17:00", NULL};
island craggy = {"Craggy", "09:00", "17:00", NULL};
island isla_nublar = {"Isla Nublar", "09:00", "17:00", NULL};
island shutter = {"Shutter", "09:00", "17:00", NULL};
```

> Notice that `NULL` in C has the value of 0, but it is set aside for setting pointers.

Let's now link these islands together:

```c
amity.next = &craggy;
craggy.next = &isla_nublar;
isla_nublar.next = &shutter;
```

### Inserting values into the linked list

You can insert islands just like you did earler, by changing the values of the pointers between islands:

```c
island skull = {"Skull", "09:00", "17:00", NULL};
isla_nublar.next = &skull;
skull.next = &shutter;
```

## Dynamic storage

When you need to create a linked list according to a list of data which is going to grow continously, you need some way to create dynamic storage because you don't from beforehand how much memory you need to allocate to your program.

Up until this point, you have uses static storage, meaning that every time you wanted to store something, you have added a **variable** to the code. Those variables have generally been stored in the **stack**.

> Remember that stack is the area of memory set aside for storing local variables.

Using variables and static storage is what you did in the examples mentioned above when you did this:

```c
island amity = {"Amity", "09:00", "17:00", NULL};
island craggy = {"Craggy", "09:00", "17:00", NULL};
island isla_nublar = {"Isla_nublar", "09:00", "17:00", NULL};
island shutter = {"Shutter", "09:00", "17:00", NULL};
```

This piece of code will alawys create exactly 4 islands. If you wanted the code to store more than 4 islands, you would need another local variable. That is fine if you know how much data you need to store at compile time, but quite often, programs don't know how much storage they need until runtime. For instance, if you are writing a web browser, you won't know how much data you will need to store a web page until you read the web page. So C programs need some way to tell the operating system that they need a little extra storage at the moment they need it. This, in other words, means that programs need **dynamic storage**. You can use the **heap** for dynamic storage.

> Heap is called heap because it is just a big heap of data! The computer does not automatically organize it. C does not contain garbage collection (unlike languages like JavaScript). C is an old language and when it was invented, most languages didn't do automatic garbage collection.

Most of the memory you have been using so far has been in the stack. Stack is for local variables. Each piece of data is stored in a variable, and each variable disappears as soon as you leave its function.

The trouble is that it is harder to get more storage on the stack at runtime, and that is where the **heap** comes in. The heap is the place where a program stores data that will need to be available longer term. It won't automatically get cleared away, so that means that it is the perfect place to store data structures like our linked list.

### Using dynamic memory

Imagine your program suddenly finds it has a large amount of data that it needs to store at runtime. So you need access dynamic memory. Follow these steps:

1. Get your memory with `maclloc`: In C you ask for storage dynamically using the `malloc()` function. You should tell this function exactly how much memory you need. The function will, in turn, ask the operating system to set that much memory aside in the heap. The function would finally return a **pointer** to the new heap space. This allows you access to the memory and it can also be used to keep track of the storage that has been allocated.

The `malloc` function receives a single parameter, which is the number of bytes that you need. Since most of the time you probably don't know how much memory you need in bytes, the function is almost always used with an operator called `sizeof` like this:

```c
#include <stdlib.h>

// some other code

malloc(sizeof(island));
// This means give me enough space to store an island struct
```

Notice that `sizeof` can tell you how many bytes a particular **data type** occupies on your system. It might be a `struct` or it could be some base data type, like `int` or `double`.

The `malloc` function returns a pointer containing the start address of the allocated chunk of memory. This pointer is a **general-purpose** pointer with type `void*`. You can store this pointer in a pointer variable:

```c
island *p = malloc(sizeof(island));
// This means create enough space for an island, and store the address in variable "p"
```

2. Free memory by calling the `free` function: The important thing to keep in mind is that you should give the memory back when you are done with it. When you were just using the stack, you didn't need to worry about returning memory; it all happened automatically. The heap is different. Once you have asked for space on the heap, it will never be available for anything else until you explicitly tell C that you are finished with it.

> There is only so much heap memory available, so if your code keeps asking for more and more heap space, your program will quickly start to develop **memory leaks**. A memory leak happens when a program asks for more and more memory without releasing the memory it no longer needs. Memory leaks are among the most common bugs in C programs, and they can be really hard to track down.

You can use the pointer that you are given by the `malloc` function to access the data and then, when you are finished with the storage, to release the memory using the `free` function. This way the previously allocated and now freed space can be reused for another data. If you have stored the pointer in a variable called `p`, you can use it to free the allocated space.

```c
free(p);
```

> Every time some part of your code requests heap storage with the `malloc` function, there should be some other part of your code that hands the storage back with the `free` function. When your program stops running, all of its heap storage will be released automatically, but it is always good practice to explicitly call `free()` on every piece of dynamic memory you have created.

> IMPORTANT: Data structures are useful, but you should be careful about them. You need to be careful when you create these data structures using C. If you don't keep proper track of the data you are storing, there is a rist that you will leave old dead data on the heap. Over time, this will start to eat away at the memory on your machine, and it might cause your program to crash with memory errors. That means it is really important that you learn to track down and fix memory leaks in your code.

### `valgrind` to detect leaks

Memory leaks are among the hardest bugs to find in C programs. The truth is that many of the C programs available probably have some memory bugs buried deep inside them. One of the tools that can be used on Linux operating system to find memory leaks in C programs is `valgrind`. This tool can monitor the pieces of data that are allocated space on the heap. It works by creating its own **fake version** of `malloc`. When your program wants to allocate some heap memory, `valgrind` will intercept your calls to `malloc` and `free` and run its own versions of those functions. The `valgrind` version of `malloc` will take note of which piece of code is calling it and which piece of memory it allocated. When your program ends, `valgrind` will report back on any data that was left on the heap and tell you where in your code the data was created.

#### Using `valgrind`

To get the most out of `valgrind`, you need to make sure your executable contains **debug information**. Debug information is extra data that gets packed into your executable when it is compiled - things like the line number in the source file that a particular piece of code was compiled from. If the debug info is present, `valgrind` will be able to give you a lot more details about the source of your memory leak. To add debug info into your executable, you need to recompile the source with the `-g` switch:

```
gcc -g spies.c -o spies
```

> Debug information make your final executable larger and it may also make your program slightly slower. This is why your program is not compiled with this option by default.

You can read more about `valgrind` at: http://valgrind.org

To start `valgrind` use the `--leak-check=full` option along with the compiled program name in the command line:

```
valgrind --leak-check=full ./spies
```

You would most probably need to run your program through `valgrind` multiple times checking different scenarios. This way you can make sure you receive enough details from `valgrind` to help you find and fix the memory leak.

> It is important to understand that memory leaks don't happen when data is created; they happen when the program loses all references to the data.

# Functions

We are not going to review functions from the beginning here, but we are going to introduce advanced uses of functions. You will learn how to up you code's IQ by passing functions as parameters. There are actually still some ways to make your C functions a lot more powerful. This will eventually enable your code do more things without you having to write a lot more code.

This basically means that you need more than just passing values to a function, so that function would act based on those values. This will not enable you to fully customize the functions behavior. You actually need to pass other code to a function to adjust the function's behavior based on your need.

Take this `find` function as an example:

```c
void find() {
    int i;
    puts("Search results:");
    puts("-----------------------");
    for(i=0; i < ) {
        if(strstr(ADS[i], "sports") && !strstr(ADS[i], "bieber")) {
            printf("%s\n", ADS[i]);
        }
    }
    puts("-----------------------");
}
```

Imagine you wanted to check for 3 strings instead of 2, and also you would like to perform a more complicated check. If you had wrapping up a piece of code and handing that code to the function, it would be like passing the `find` function a testing machine that it could apply to each piece of data. This means the bulk of the `find` function would stay exactly the same. It would still contain the code to check each element in an array and display the same kind of ouput. But the test it applies against each element in the array would be done by the code that you pass to it.

So you definately need to pass the name of a function to the `find` function. How is that possible? How do you say that a parameter stores the name of a function? And if you have a function name, how do you use it to call the function?

## Function names as pointers

Function names are actually a way of referring to a piece of code. This is essentially a pointer: a way of referring to something in memory. In C, function names are also pointer variables. When you create a function called `accelarate(int speed)` you are also creating a pointer variable called `accelarate`. Therefore, if you pass a function a parameter of type _function pointer_ you should be able to use the parameter to call the function it points to.

### Declaring function pointers

Usually it is easy to declare pointers in C. If you have a data type like `int`, you just need to add an asterisk `*` to the end of the data type name.

```c
int *a;
```

Unfortunately, C does not have a `function` data type, so you cannot declare a functin pointer with:

```c
// This does not work
function *f;
```

C does not have a `function` data type because there is not just one type of function. When defining a function, you can vary a lot of things, such as:

1. The return type
2. The list of parameters

The combination of these things is what defines the type of a function. That is why for function pointers, you need to use a slightly more complex notation.

To create a pointer variable that can store the addess of these functions:

```c
int go_to_warp_speed(int speed)
{
// some code
}

char** album_names(char *artist, int year) {
  // some code
}
```

You can do this:

```c
int (*warp_fn)(int);
warp_fn = go_to_warp_speed;
warp_fn(4);

char** (*names_fn)(char*, int);
names_fn = album_names;
char** results = names_fn("sacha Distel", 1972);
```

Notice that `warp_fn(4)` is actually calling the `go_to_warp_speed` function with `4` as `int` argument.

> Notice that `*` comes before the function pointer, but after normal data type declarations.

> Notice that `char**` is a pointer normally used to point to an array of strings.

Once you have declared a function pointer variable, you can use it like any other variable. You can assign values to it, you can add it to arrays, and you can also pass it to functions.

### Passing function to function

To define a function in a way that it is capable of receving another function as argument, you can do:

```c
int some_finding_function(char *s) {
  // some finding algorithm
}

void find(int(*match)(char*)) {
  match("some char");
}

// To call the `find` function with the function passed into it:

int main() {
  find(some_finding_function);
}
```

> Notice that any function you pass into the `find` function will be named `match` within the `find` function.

### Special case of automation

There is a special technique that is now available for us to use since we can declare function pointers. This technique involves function pointers and the `enum` data structure. Together, these two enable you to make automatic function calls without you having to decide which function to call in your code.

Imagine you have a program in which you have defined 3 different functions called `DUMP`, `SECOND_CHANCE`, and `MARRIAGE`. You want to call these functions when you read some data, that in its structure, there is a `type` field holding either `DUMP`, `SECOND_CHANCE` or `MARRIAGE` values as an `enum` structure. So you want each of your functions to be called automatically according to the `type` field in the data. You can do this by defining an array of function pointers in the exact same order as the `enum` data.

Let's see this example in more detail:

```c
// This is the enum structure of the field 'type' in your data
enum response_type {DUMP, SECOND_CHANCE, MARRIAGE};

// This is the array of function pointers to enable you call each function automatically based on the data present in the enum structure
void (*replies[])(response)
```

You have defined an array called `replies`. This array contains pointers that point to functions. These functions have `void` return type and receive the `response` data structure as argument.

Notice that an `enum` assigns numbers to the values you pass to it. Therefore, when you refer to a value of the `enum`, your program will actually refer to the number that relates to the value you are trying to access. This can be used to select a function pointer in the array of function pointers, and then call the function.

```
replies[SECOND_SHCNAGE] == second_chance
```

The big advantage of this techinque is that, if at some point in the future, you decide to add a new function to this list, you would only have to add the function name to the `enum` and the array of function pointers. You no longer need to implement the logic for calling that new function manually.

## Variadic functions

Remember working with the `printf` function? Remember how it could receive any number of arguments? You are now going to learn how to create such functions. This type of functions, which can receive a variable number of parameters, are called **variadic** functions. The C Standard Library contains a set of _macros_ that can help you create your own variadic functions.

> You can think of macros as a special type of function that can modify your source code.

For example, you can create a function that can print out series of `int`s:

```c
print_ints(3, 79, 101, 32);
// The first argument (3) tells the number of ints to print
// The rest of the arguments are the ints that should be printed
```

Here is the code to define this variadic function:

```c
#include <stdarg.h>
// All the code to handle variadic functions is in this library

void print_ints(int args, ...) {
  // Notice that ellipsis (...) syntax is telling the function that besides the 'args' argument, there are more arguments to come
  va_list ap;
  // Creating a va_list type and name it 'ap'. The va_list will be used to store the extra arguments that are passed to your function.
  va_start(ap, args);
  // You need to tell C the name of the last fixed argument. In this case, it will be 'args'. Using the 'va_start' macro is the way to tell C where the variable arguments (as opposed to fixed arguments) start.
  int i;
  for(i = 0; i < args; i++) {
    printf("argument: %i\n", va_arg(ap, int));
  }
  // Reading off the variable arguments in a loop, on at a time. Your arguments are all stored in the 'va_list'. You can read them with 'va_arg' macro which takes two values: the 'va_list' (which is 'ap' in our case) and the type of the next argument (which are all ints in our case).
  va_end(ap);
  // After finishing reading all of the arguments, you need to tell C that you are finished using the 'va_end' macro.
}
```

> Macros might look just like functions, but they are different. A macro is used to rewrite your code before it is compiled. The macros we used in the example above hide secret instructions that tell the preprocessor how to generate lots of extra smart code inside your program, just before compiling it.

> A variadic function needs to have at least one fixed argument in order to pass its name to `va_start`. You cannot have a variadic function with just variable arguments and no fixed arguments.

> You can control the `va_list` using `va_start()`, `va_arg()`, and `va_end()`.

# Processes and system calls

You have already seen that you can build complex applications by connecting small tools together on the command line. But what if you want to use other programs from inside your own code? In this chapter, you will learn how to use **system services** to create and control **processes**. That will give your programs access to email, the web, and any other tool you have got installed. This will eventually give you power to go beyond C.

## System calls

C programs rely on the operating system for pretty much everything. They make **system calls** if they want to talk to the hardware. System calls are just **functions** that live inside the operating system's **kernel**. Most if the code in the C Standard Library depends on them. When you cal `printf()` to display something on the command line, somewhere at the back of things, a system call will be made to the operating system to send the string of text to the screen.

Take `system()` as an example. This function takes a single string paramter and executes it as if you had typed it on the command line:

```c
system("dir D:");
system("gedit");
system("say 'End of line'");
```

The `system` function is an easy way of running other programs from your code. Take this code as an example:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
char* now()
{
time_t t;
time (&t);
return asctime(localtime (&t));
}
/* Master Control Program utility.
Records guard patrol check-ins. */
int main() {
  char comment[80];
  char cmd[120];

  fgets(comment, 80, stdin);

  sprintf(cmd, "echo %s %s >> reports.log", comment, now());

  system(cmd);
  return 0;
}
```

The program reads a comment from the command line and calls the `echo` command to add the comment to the end of a file. Even though you could have written the whole program in C, by using `system()` you simplified the program and got it working with very little work.

> The `system()` function does not get compiled into your program. This function - like all system calls - does not live in your program. It lives in the main operating system. When you make a system call, you are kind of making a call to some external piece of code, like a library. But the details depend on the operating system. On some operating systems, the code for a system call lives inside the kernel of the operating system. On other operating systems, it might simply be stored in some dynamic library.

The code example above, has a major security problem. By injecting some command-line code into the text, you can make the program run whatever code you like. What is your code has been called from a web server? Or if it is processing data from a file? But security is not the only problem. You should also worry about:

- What if the comments contain apostrophes? That might break the quotes in the command.
- What if the `PATH` variable causes the `system()` function to call the wrong program?
- What if the program we are calling needs to have a specific set of environment variables set up first?

The `system()` function is easy to use, but most of the time, you are going to need something more structured - some way of calling a specific program, with a set of command-line arguments and maybe even some environment variables.

> We said that on most machines, system calls are functions that live inside the **kernel** of the operating system. But what is the kernel? The kernel is the most important program on your computer, and it is in charge of 3 things:
>
> 1. Processes: No program can run on the system without the kernel loading it into memory. The kernel creates processes and makes sure they get the resources they need. The kernel also watches for processes that become too greedy or crash.
> 2. Memory: your machine has a limited supply of memory, so the kernel has to carefully ration the amount of memory each process can take. The kernel can increase the virtual memory size by quietly loading and unloading sections of memory to disk.
> 3. Hardware: The kernel uses device drivers to talk to the equipment that is plygged into the computer. Your program can use the keyboard and the screen and the graphics processor without knowing too much about them, because the kernel talks to them on your behalf.
>
> System calls are the functions your program uses to talk to the kernel.

## System calls with more control

When you call the `system()` function, the operating system has to interpret the command string and decide which programs to run and how to run them. And that is where the problem is: The operating system needs to interpret the string, and it is easy to get that wrong. So the solution is to remove the ambiguity and tell the operating system precisely which program you want to run. That is what the `exec()` functions are for.

### `exec()` functions replace the current process

A **process** is just a program running in memory. If you type `taskmgr` on Windows or `ps -ef` on most other machines you will see the processes running on your system. The operating system tracks each process with a number called the **Process Identifier (PID)**.

The `exec()` functions replace the current process by running some other program. You can say which command-line arguments or environment variables to use, and when the program starts it will have exactly the same PID as the old one.

### Different types of `exec()` functions

Over time, programmers have created several different versions of `exec()`. Each version has a slightly different name and its own set of parameters. Even though there are lots of versions, there are really just two groups of `exec()` functions: The **list** functions and the **array** functions.

#### The list functions

The list functions accept command-line arguments as a list of parameters.
