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

# Side notes

If you want to check the exit status of a program that has just run on your machine you can use this command on Linux or Mac:

```
echo $?
```

or this command on Windows:

```
echo %ErrorLevel%
```

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
- `%p`: pointer

> Remember to use double quotes (`" "`) for strings, and single quotes (`' '`) for individual characters.

### `scanf()`

This function is used to read input data. The function accepts multiple arguments; first, the format string, and then, pointer variables, or array variables (treated as a pointer variables) being used as format string parameters.

```c
char name[40];
scanf("%39s", name);
```

The reason this function takes a pointer is that it is going to update the contents of the pre-defined array. Functions that **update** a variable, don't need the value of the variable, they want its **address**.

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
