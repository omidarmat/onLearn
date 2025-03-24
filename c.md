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
void happy_birthday(turtue *a) {
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

There are other situations when you need to reuse a specific functionality that you have written previously in multiple other programs. This basically means that you would have a special functionality written in a `.c` file, and you would like to share it in some other `.c` files. If the compiler can somehow include the shared code when it is compiling your program, you will be able to reuse the same code in multiple applications. But there is a problem. Up until this point you have only ever created programs from one single `.c` file. What we are talking about right now is a program that consists of multiple `.c` programs. In other words, you now want to give the compiler a set of source code files, and not just one source code file. It means that the compiler would have to create a single executable program from several files. How is it going to work?

1. To do this, you first need to create a header file for the shared code. If you are going to share the `encrypt.c` code between programs, you need some way to tell those programs about te encrypt code. You do this with a header file.

```c
// encrypt.h
void encrypt(char *message);
```

2. Then you include the header inside `encrypt.c` file:

```c
// encrypt.c
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
> extern int passcode;
> ```

### Frsutrating problems

With this approach and the steps described above, you are going to face a serious problem. Imagine you are working on a huge program with a lot of functions in many separate files, and you are currently developing the program. This means that even after a simple change in one of the source files, you need to compile all the source files and regenerate the single executable file, but that is not really necessary. You don't need to re-compile the files that did not change. To find a solution to this problem, you need to understand what the compiler does when you execute your command in the terminal.

when you use this command for example:

```
gcc reaction_control.c pitch_motor.c engine.c after_burner.c -o launch
```

The compiler will run the preprocessor, compiler and assembler for each source code file, even the ones that have not changed. This will then generate an **object code** for each file. If a file has not changed, its object code will not change also, so the same object code would be generated again, which is not necessary. Anyways, after generating all the object codes, they will all be passed to the compiler for the **linking** process, where object codes are linked to produce a final executable file. Now during development, when you change some small code in just one file, you don't want to regenerate object codes for all the files. The solution to this problem is to save copies of object codes during the compiling process and use them in the next compiling process if their source files have not changed. So generating object files will be done only for files that have changed. Then the liking process will be done again to recreate the final executable file. So, as a general solution, how do you tell GCC to save the object codes somewhere? And then how do you tell it to link the object files as a separate command?

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

> Notice that the linking process should be executed on all the object files, even of just one of the object files are updated.

Ok, everything seems to work fine, but we have another problem. It is really hard to keep track of the files that have changed and remembering to use this solution only for the changed files. So it is true that partial compiles are a lot faster, but you really have to think more carefully to make sure you recompile everything you need. There should be a way to automate this process, and this is where the **Make** tool comes to play.

## The make tool

Thinking about the source files and their object files this way enables us to automate this process: If `thruster.c` is newer than `thruster.o` regarding its timestamp, you need to recompile it, so as to update the object file with the new version of source code. If `thruster.o` is newer than `thruster.c`, then everything is fine and you don't need to recompile. This is exactly how the make tool works. Before being able to use the make tool, you need to tell `make` about your source code and how you want to build the code.

Every file that `make` compiles is called a **target**. For every target,`make` needs to be told 2 things:

1. The dependencies: which files the target is going to be generated from.
2. The recipe: the set of instructions it needs to run to generate the file.

Together, the dependencies and the recipe form a **rule**.

> The make tool is not limited to compiling files. A **target** is any file that is generated from some other file. So a target migh be a zip archive that is generated from the set of files that need to be compressed.

### How make works

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

### The `makefile`

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

# Working with strings

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

Array variables are like pointers. They are NOT pointers, but they can be used a pointers. When you define an array like this:

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
