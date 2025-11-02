# Input/Output

`<iostream>`
`<iomanip>`

# Variables

## Declaring and initializing variables

In C++ it is best practice to initialize a variable right when you declare it. This is a variable declaration which is not initialized. This is the source of many C++ programming errors since the value of `age` at this point could be anything:

```c++
int age;
```

C++ provides 3 ways of initializing variables:

1. C-like initialization:

```c++
int age = 21;
```

2. Constructor initilization:

```c++
int age (21);
```

3. C++11 list initialization:

```c++
int age {21};
```

This is the best initialization practice since it is consistent across different types in C++, plus there are other benefits to this style. One important benefit is that this type of initilization will cause the compiler to check if the initilization value actually fits in the defined integer type. If not, you will receive a compiler error. Former types of initialization will not perform this check and you may see unexpected values and behavior in your program.

Declaring and initializing character types is done in a similar way:

```c++
char first_letter {'j'}
```

> Note that single quotes are used to declare single letter characters. Declaring strings with single quotes is not allowed.

> You can also initialize a variable by simply using an empty `{}` in the declaration:

```c++
int age {};
int letter {};
```

## Built-in primitive types

Fundamental data types implemented directly by the C++ language are:

1. Character types
2. Integer types
3. Floating-point types
4. Boolean types

> The size and precision of C++ primitive data types depend on the platform you are working on and the compiler you are using. C++ has a `climits` file that includes size and precision of C++ primitive data types.

### Character types

Used to represent single characters. Wider types are used to represent wide character sets.

- `char`: Exactly 1 byte. At least 8 bits.
- `char16_t`: At least 16 bits.
- `char32_t`: At least 32 bits.
- `wchar_t`: Can represent the largest available chracter set.

### Integer types

Used to represent whole numbers. Signed and unsinged versions are supported. There are many variants of the integer data type:

- `signed short int`: At least 16 bits.
- `signed int`: At least 16 bits.
- `signed long int`: At least 32 bits.
- `signed long long int`: At least 64 bits.
- `unsigned short int`: At least 16 bits.
- `unsigned int`: At least 16 bits.
- `unsigned long int`: At least 32 bits.
- `unsigned long long int`: At least 64 bits.

> Writing `int` in `long` types is optional.

> What we actually mean by `unsigned` is that the value could be zero or positive only, not negative. For instance, a variable that is going to store age or distance value, can be declared as unsigned integer since it cannot be negative.

> It is poissible to store both signed and unsigned integeres in the **character** data type.

> If you want to declare a signed integer, you don't need to include the word `signed` since they are, by default, signed.

> When declaring `long` or `long long` variables, you can use `'` as thousand separator. Remember that only C++14 and later versions can compile this.

```c++
long long people_on_earth {7'600'000'000}
```

> Assigning a large value to a smaller type will cause overflows. For instance:

```c++
short value1 {30000};
```

### Floating-point types

Used to represent non-integer numbers. Represented by mantissa and exponent (scientific notation). Precision is the number of digits in the mantissa. Precision and size are compiler dependant.

- `float`: 7 decimal digits. `1.2 * 10^-38 to 3.4 * 10^38`
- `double`: 15 decimal digits. `2.2 * 10^-308 to 1.8 * 10^308`
- `long double`: 19 decimal digits. `3.3 * 10^-4932 to 1.2 * 10^4932`

> Storing a floating-type value in an integer type will cause the decimal part of the value to be truncated off and then the integer part of the value be stored in the variable.

> Assigning decimal values with scientific notation in a `long double` type is possible:

```c++
long double large_amount {2.7e120}
```

### Boolean types

In C++ zero is `false`, and any other value is `true`. A boolean type is usually 8 bits in size

## `sizeof` operator

Determines the size (in bytes) of a types or variable. So it can be used on both types and variables.

```c++
sizeof(int)
sizeof(double)

sizeof(some_variable)
sizeof some_variable
```

The `sizeof` operator gets its information from `<climits>` and `<cfloat>` include files. So if you want to use `sizeof` operator on integer types, make sure you include `climits`. If you are going to use it on floating-type variables, include `<cfloat>`.

```c++
INT_MAX
INT_MIN

LONG_MAX
LONG_MIN

LLONG_MIN
LLONG_MAX

FLT_MIN
FLT_MAX

SHRT_MIN // yes its SHRT not SHORT!
SHRT_MAX
```

## Constants

To define a constant value that should not change during the time your program runs you can use `const`:

```c++
const int months_in_year {12};
```

Trying to mutate the value of a constant variable will result in compiler error.

### Literal constants

These are the most obvious types of literals:

```c++
x = 12;
y = 1.56;
name = "Frank";
middle_initial = 'J';
```

We can also have character literal constants. These are called _escape codes_ and are used within string literals.

```
\n
\r
\t
\b
\'
\"
\\
```

You can also define constants using the keyword `#define`, but don't. This style is used in C++ legacy codes. This is performed by the pre-processor as a blind find/replace procedure. Since it does not understand C++ code, it could result difficult-to-find errors.

```c++
#define pi 3.1415926
```

# Arrays

In C++ the name of an array represents the memory address of the first element of the array.

## Declaring and initializing arrays

To declare an array, you must first write the type of each element of the array, followed by the variable name that you are going to give the array, and finally the indexing syntax to define the size of the array. Remember that arrays in C++ have fixed sizes. So the size of the array can be declared as a constant integer also.

```c++
int test_scores [5];

const int days_in_year {365};
double hi_temps [days_in_year];
```

It is important to note that none of declarations above are initialized. So the elements in these arrays could contain any values. So always initialize arrays when you declare them. The syntax for initializing is again done by using `{}`.

```c++
int test_scores [5] {100, 95, 99, 87, 88};

// In this case, you can ignore defining the size of the array explicitly:
int test_scores {100, 95, 99, 87, 88}; // Compiler will automatically figure out the size of array

// You can initialize only a number of elements of the array from the beginning and let the rest automatically initialize to zero:
int high_score_per_level [10] {3, 5};

// You can initialize all elements of an array to zero:
double hi_temps [365] {0};
```

## Accessing and modifying array elements

This is called array subscrpiting:

```c++
int test_scores [5] {100, 90, 85, 92, 50};
test_scores[1];
```

If you try to access a value at in index that goes beyond the size of the array, C++ compiler will not throw any errors; it will return an unexpected values. You should always keep track of the size of your arrays so you don't mistakenly try to access outside the its bounds.

Trying to modify an element outside the bounds of your array may probably cause your application to crash, but it is possible that it may not crash, but change the behavior of your application in strange, unexpected ways.

> Trying to access the value of the array variable name will give you the hexadecimal number of memory address related to the first element of the array:

```
0x61fee4
```

## Declaring and initializing vectors

Vectors are a more advanced implementation of arrays. This type of arrays is not fixed in size. Vectors are arrays that can grow or shrink as your application is running.

A C++ vector is part of the C++ standard library. When you are creating a C++ vector, you are actually creating a C++ object. This object has methods available in it.

To declare a vector you must first include the `<vector>` library:

```c++
#include <vector>

// To create empty vectors that contain no elements
vector <char> vowels;
vector <int> test_scores;

// To create empty vectors and define the initial number of elements, without initializing them
vector <char> vowels (5);
vector <int> test_scores(10); // will initialize all 10 values to zero

// To create and initialize vectors
vector <char> vowels {'a', 'e', 'i', 'o', 'u'};
vector <int> test_scores {100, 98, 89, 75, 93};
vector <double> hi_temps (365, 80.0); // will initialize all 365 bouble values to 80.0
```

### Accessing and modifying vector elements

You can access vector elements using the regular array subscripting syntax, and it will not perform bounds checking. You can also access vector elements using the `at` method, which will actually perform bounds checking.

```c++
vector <int> test_scores {100, 98, 89, 75, 93};
test_scores.at(0); // 100
test_scores.at(6); // compiler throws exception out_of_range
```

Modifying vector elements can also be done using the `at` method.

### Adding/removing elements to/from vectors

To add an element to a vector you can use the `push_back` method on it:

```c++
test_scores.push_back(80);
```

# Statements and operators

## Operators

C++ has 3 types of operators: unary, binary, ternary.

common operators can be grouped as follows:

1. Assignment
2. Arithmetic
3. Increment/decrement
4. Relational
5. Logical
6. Member access

and others...

### Assignment operator

You can use the assignment operator `=` to change the value stored in a variable. There is an important mindset when doing this. When using the assignment operator, there is a left side and a right side:

```
lhs = rhs
```

`rhs` is an expression that is evaluated to a value. Then, the value of `rhs` is stored in `lhs`. Also note that the value of `rhs` should be type-compatible with the `lhs`.

Related to this, in C++, we have `l-value` and `r-value`. The `r-value` is the content stored in a variable. The `l-value` is the location of that variable. So when using the assignment operator, we are actually saying that store the `l-value` of the expression on the right side, in the location of the expression on the left side of the operator.

# Controlling program flow

There are 3 extremely important basic building blocks of programming:

1. Sequence: Ordering statements sequentially
2. Selection: Making decisions
3. Iteration: Looping or repeating

With these 3 building blocks you can implement any algorithm. Learning a new programming language is to just learn the syntax for these 3 programming building blocks in that specific language.

## Switch statement

The switch statement syntax is pretty similar to that of JavaScript. Keep in mind that it is best practice to include a `break` statement for each `case` except you have a good reason not to. When a `case` control expression evaluates to true, its statements will be executed and the program will _fall through_ and go on to the next `case`s without checking their control expressions and execute the cases until it reaches to a `break` statement. That's why you really need to use `break`s in a switch statement.

The switch statement can have a `default` statement at the end, which runs when none of the `case`s are true. It is best practice to include this too.

For each `case` you can have multiple statements without having to use a code block as `{}`. However, if you need to declare a variable in a `case` you need the code block.

This is the typical switch statement syntax:

```c++
char letter_grade {};

switch (letter_grade) {
    case 'a':
    case 'A':
        cout << "You need a 90 or above, study hard!" << endl;
        break;
    case 'b':
    case 'B':
        cout << "You need 80-89 for B, go study!:" << endl;
        break;
    case 'c':
    case 'C':
        cout << "You need 70-79 for an average grade." << endl;
    case 'd':
    case 'D':
        cout << "Hmm, you should strive for a better grade. All you need is 60-69" << endl;
    case 'f':
    case 'F':
        cout << "XXXX" << endl;
        break;
    default:
        cout << "Sorry, not a valid grade." << endl;
}
```

You can also use switch statements with enumeration types:

```c++
enum Direction {
    left, right, up, down
}

Direction heading {left};

switch (heading) {
    case left:
        cout << "Going left";
        break;
    case right:
        cout << "Going right";
        break;
    default:
        cout << "Ok" << endl;
}
```

> In the example above, if you don't handle all possible values of `heading` in the switch statement, the compiler will warn you about them. You should either handle them explicitly, or provide a default statement like above.

## Conditional operator

This is the exact same operator as in JavaScript. Best practice is not to nest conditional operators in each other.

```c++
// conditional_expression ? expression_1 : expression_2
cout << num << " is " << ((num % 2 == 0) ? "even" : "odd") << endl;
```

# Looping

Looping is also called iteration or repetition. Every loop is made up of 2 parts:

1. Loop condition
2. Loop body: the statement or the block of statements that will be repeated.

C++ has 3 main looping structures: `for` loop, `while` loop, and `do-while` loop. The `for` loop has also a `range-based` variant for iteration over a collection of elements in an array, or vector.

1. `for` loop: Iterate a specific number of times
2. `range-based for` loop: One iteration for each element in a range or collection
3. `while` loop: Iterate while a condition remains true. Stop when the condition becomes false. Check the condition **at the beginning of every iteration**.
4. `do-while` loop: Iterate while a condition remains true. Stop when the condition becomes false. Check the condition **at the end of every iteration**.

## `for` loop

The syntax of a `for` loop is as:

```c++
// With no code block
for (initialization; condition; increment/decrement)
    statement;

// With code block
for (initialization; condition; increment/decrement) {
    statement;
}
```

> In the increment/decrement part of the loop, remember that `++i`/`--i` or `i++`/`i--` are not different.

Here are some example to also see different options available. You can initialize the counter variable as:

```c++
for (int i {1}; i <= 5; ++i) //this initialization is preferred
    cout << i << endl;

for (int i {1}; i <= 5; ++i)
    cout << i << endl;
```

> Note that the value of `i` counter variable is only accessible inside the loop.

You can declare and initialize two variables for the loop and increment them in the loop. Remember that you should separate them with `,`:

```c++
for (int i {1}, j {5}; i <= 5; ++i, ++j) {
    cout << i << " * " << j << " : " << (i * j) << endl;
}
```

You can have an endless loop by:

```c++
for (;;)
    cout << "Endless loop" << endl;
```

> Best practice is not to write `for` loops with missing expressions and complicated expressions with comma operators.

You can use the `for` loop to iterate over the elements of a vector:

```c++
#include <vector>

vector <int> nums {10, 20, 30, 40, 50};

for(unsigned i{0}; i < nums.size(); ++i) {
    cout << nums[i] << endl;
}
```

> Note that since `nums.size()` returns an unsigned integer (the size of a vector cannot be negative), we have declared `i` counter as an `unsigned` integer. Ignoring this will result in a compiler warning.

## `range-based for` loop

Range-based for loop was introduced in C++11. With this type of `for` loops, you no longer need to worry about counter variables and incrementing/decrementing them during the loop.

```c++
// With no code block
for (var_type var_name: sequence)
    statement;

// With code block
for (var_type var_name: sequence) {
    statement;
}
```

Here is an example:

```c++
int scores [] {100, 90, 97};

for (int score : scores)
    // score variable is accessible inside the loop
    cout << score << endl;

// use 'auto' instead of explicit variable type
for (auto score : scores)
    cout << score << endl;

// initialize the collection right in the loop
for (auto temp: {60.2, 80.1, 90.0, 78.2}) {
    running_sum += temp;
    ++size; // you will have to calculate the size as you loop if you need to make decisions based on the size
}
```

You can also use `range-based for` loop to iterate over a string, which is a collection of characters:

```c++
for (auto c : "Frank")
    cout << c << endl;
```

## `while` loop

The syntax for `while` loop is as:

```c++
// With no code block
while (expression)
    statement;

// With code block
while (expression) {
    statement;
}
```

You would usually need to change the state of some tracking variable (incrementing a counter variable) within the loop to make the loop stop somewhere.

While loops are commonly used in programming to provide **input validation**.

```c++
int number {};

cout << "Enter an integer less than 100";
cin >> number;

while (number >= 100) {
    cout << "Enter an integer less than 100";
    cin >> number;
}

cout << "Thanks" << endl;
```

> Notice that there are 2 lines of duplicate code in the example above. That is because the process of asking the user for input should be executed at least once so as to be able to receive user's input and getting into the while loop by checking the loop condition. You can see that the loop condition itself is based on the user input. However, this code can be improved by using the `do-while` loop or by providing a separate boolean variable that will be avilable for loop condition evaluation.

## `do-while` loop

The `do-while` loop syntax is as:

```c++
do {
    statements;
} while (expression);
```

Remember that the loop condition is checked at the end of each iteration, so the loop body will execute at least once. Ths input validation use case can be written now like this:

```c++
int number {};

do {
    cout << "Enter an integer between 1 and 5: ";
    cin >> number;
} while (number <= 1 || number >= 5);

cout << "Thanks" << endl;
```

> If you declared the `number` variable in the loop body in the example above, you could not evaluate it in the loop condition check. You would receive a compiler error.

## `continue` and `break` statements

You can use `continue` and `break` statements in all C++ loop constructs to provide more explicit control over the loop behavior.

When `continue` is executed in the loop, no further statements in the body of the loop are exectued and control immediately goes to the beginning of the loop for the next iteration. You can think of it as skipping the current iteration and going on to the next iteration. In the case of `for` and `while` loops, the loop condition will be immediately tested again.

When the `break` statement is executed in the loop, no further statement in the body of the loop are executed and the loop is terminated. So control is transfered to the statement that follows the loop.

> Having lots of `continue`s and `break` in a loop makes it really hard to understand and debug. Don't overuse them.

## Infinite loop

In general, you should avoid creating infinite loops, but there are some use cases where infinite loops are appropriate:

1. Event loop in an event-driven program like those that are usually found on mobile devices or embedded systems (IoT). In these programs, the program loops forever listening for mouse clicks, mouse movements, touches and so forth and reacting to them.
2. Operating system: an operating system is constantly looping handling input/output, handling resources and so forth. It only shuts down when you shut down your computer.

In an infinite loop that is written intentionally, programmers usually use `break` statements as strategic points in the program to stop the loop.

# Characters and strings

Character values are basically integers that map to a character set like the ASCII character set. We have also seen that strings are sequences of characters define between double quotes `""`.

C++ supports 2 types of strings: C-style strings and C++ strings.

C++ strings are actually C++ objects and they are used using an OO style of programming.

> You should be using C++ strings in modern C++.

## `cctype` library

This is a very simple library but with very useful functions that work with characters. For instance, you can use them to see if a character is uppercase, lowercase, numeric, alphanumeric, punctuation and more. You can also convert characters between upper and lower case.

In order to use the `cctype` library you must include it in your program:

```c++
#include <cctype>
```

All of the functions in this library will expect one single character as argument. The testing functions will return boolean values. Conversion functions return converted characters. Here are some of the testing functions this library provides:

- `isalpha(c)`: True if `c` is a letter
- `isalnum(c)`: True if `c` is a letter or digit
- `isdigit(c)`: True if `c` is a digit
- `islower(c)`: True if `c` is lowercase letter
- `isupper(c)`: True if `c` is uppercase letter
- `isprint(c)`: True if `c` is a printable character
- `ispunct(c)`: True if `c` is a punctuation character
- `isspace(c)`: True if `c` is whitespace

Here are some of the converting functions provided by this library:

- `tolower(c)`: returns lowercase of `c`
- `toupper(c)`: returns uppercase of `c`

## C-style strings

C-style strings are a sequence of characters, stored contiguously in memory. They are implemented as an array of characters, so you can access individual characters using the array subscripting syntax. But how would you know where the string ends?

C-style strings use a sentinel value that marks the end of the string. The `null` value is used which is equivalent to the integer zero (zero or null-terminated strings).

```c++
"C++ is fun"

//in memory, c++ allocates one more space for the null character at the end
C++ is fun\0
```

You can use C++ strings just as you use them in string outputs using `cout`, but you will always need to declare string variables. To create a C-style string variable:

```c++
char my_name[] {"Frank"};

// in memory:
Frank\0
```

Remember that this is an array and its size is fixed. So if you try to add another character to the end of this string, you won't receive any errors or warnings from the compiler, but you will face problems.

```c++
my_name[5] = 'y'; //problem
```

This would cause a problem since this will replace the `\0` character and therefore the string will not be null-terminated anymore. C++ will have no clue where the end of this string will be in memory.

If you initialize a string variable as:

```c++
char my_name[8] {"Frank"};

// in memory:
Frank\0\0\0
```

> you can initialize a string variable using an empty `{}`, just like any other variable.

In this case, adding another character to the end of the string will cause no problem since the string will still be null-terminated.

In another example, if you create a string variable with a determined size but not initialize it:

```c++
char my_name[8];

// in memory:
????????
```

This will cause problems, especially when you want to use string functions, since they all expect to find a `\0` character at the end of the string. Without initializing the string variable, we won't really know what values are in the memory at that location. You might very well find garbage values there and therefore, unexpected behavior will occur.

You cannot initialize un-initialized string variables in the next line like:

```c++
char my_name[8];
my_name = "Frank"; //compiler error
```

Array names and literals evaluate to their **location in memory**, so we are actually assigning one location to another which is illegal. Instead, you can use the `strcpy` function:

```c++
strcpy(my_name, "Frank"); //fine by compiler, copies "Frank" to my_name array
```

### `cstring` library

This library brings functions that can work with C-style strings. All of these functions require the input string to be null-terminated. Otherwise, crashes and unexpected behavior will happen. When working with C-style strings you have to make sure your strings are null-terminated. People have solved this issue with **C++ strings**.

Remember to include the `cstring` library in your program when you want to work C-style strings:

```c++
#include <cstring>
```

Here are some examples of functions provided by `cstring` library:

```c++
char str[80];

strcpy(str, "Hello "); // copies "Hello" to 'str'
strcat(str, "there "); // concatenates 'str' and "there"
cout << strlen(str); // 11
strcmp(str, "Another"); // returns 0 if stirngs are equal
```

> The function `strlen` does not return an integer type. Its type is called `size_t`. It is an unsigned value (since string length cannot be negative), but it is not integer, it could be long or anything else based on your system. So you should be using `size_t`.

> The function `strcmp` returns less than 0 if the first string lexically comes before the second string. It returns higher than 0 if the first string lexically comes after the second string.

### Receiving strings in user input

When prompting the user for strings, you might run into cases where the user inputs a string that includes more some white spaces. This will cause `cin` stop once it sees the space. To go around this limit, you can use the `getline` function of `cin` which can also receive a number that determines the maximum length of the input string.

```c++
// instead of
cin >> full_name;

// use getline
cin.getline(full_name, 50);
```

> The `getline` function works with C-style strings.

### `cstlib` library

This library includes functions to convert C-style strings to integers, floats, long, etc. For instance, a string of `"12"` can be converted to `12`. Remember that these functions also need the input string to be null-terminated.

## C++ strings

Standard string (`std::string`) is a class in the C++ standard template library (STL). For now, let's learn about the most important elements of the C++ string class.

In order to use C++ stirngs, you must include `<string>` header file in your code:

```c++
#include <string>
```

Strings are in the standard namespace. So in order to use them without using namespace standard, you must prefix them with `std` and the scope resolution operator `::`. This is also true for the standard string methods that work with C++ strings.

C++ strings are also stored contiguously in memory. Unlike C-style strings, C++ strings are dynamic, and can grow and shrink during runtime.

C++ stirngs work with the stream insertion and extraction operators, just like most other types in C++. C++ string class provides a rich set of methods that allow us to manipulate strings easily. C++ strings also work well with many C++ operators.

### Working with C++ stirngs

To declare a C++ string you must include the `<string>` header file:

```c++
#include <string>
```

Then to declare C++ string variables you can do:

```c++
using namespace std;

string s1; // auto initialization to empty string
string s2 {"Frank"};
string s3 {s2};
string s4 {"Frank", 3}; // first 3 chars - Fra
string s5 {s3, 0, 2}; // starting index 0, length 2 - Fr
string s6 (3, 'X'); // XXX
```

#### Assigning

To assign value to C++ strings you can simply use the assignment operator:

```c++
string s1;
s1 = "C++ Rocks!";
```

You can also retrieve or assign characters using the subscripting notation or the `at` method.

```c++
string s1;
string s2 {"Frank"};

// retrieveing characters from c++ strings
cout << s2[0] << endl;
cout << s2.at(0) << endl; // at provides bounds checking

// assigning characters to c++ strings
s2[0] = 'f';
s2.at(0) = 'p';
```

#### Concatenating

To concatenate two or more C++ strings you can simply work with C++ operators:

```c++
string part1 {"C++"};
string part2 {"is a powerful"};

string sentence;

sentence = part1 + " " + part2 + " language";
```

However, this will not work:

```c++
sentence = "C++" + " is powerful"; // two c-style strings cannot be concatenated with C++ operators
```

#### Looping

You can use `range-based for` loops to iterate over a C++ string.

```c++
string s1 {"Frank"};

for(char c: s1)
    cout << c << endl;
// string characters will be printed one by one, including the final null character
```

> If you declare the loop variable as `int` C++ will print integer values that represent each character of the string;

#### Comparing

You can compare two strings character by character lexically using these operators: `==`, `!=`, `>`, `>=`, `<`, `<=`

> You cannot use these operator to compare two c-style strings.

> Capital letters come before lowercase letters in the ASCII table.

#### C++ string methods

- `substr()`: Extracts a substring from a `std::string`. This does not mutate the original variable or string.

```c++
// object.substr(start_index, length)

string s1 {"This is a test"};

cout << s1.substr(0, 4); //This
```

- `find()`: Returns the index of a substring in a `std::string`. The return type of this function is `size_t`.

```c++
// object.find(search_string, search_from)

string s1 {"This is a test"};

cout << s1.find("This"); // 0
cout << s1.find("is", 4); //5
cout << s1.find("XX"); //string::npos
```

Another example:

```c++
string s1 {};

s1 = "The secret word is Boo";

string word {};
cout << "Enter the word to find: ";
cin >> word;

size_t position = s1.find(word);
if(position != string::npos)
    cout << "Found " << word << " at position: " << position << end;
else
    cout << "Sorry, " << word << " not found" << endl;
```

> There is also a `rfind()` method that starts searching from the end of the string.

- `erase()` and `clear()`: Removes a substring of characters from a `std::string`.

```c++
// object.erase(start_index, length)

string s1 {"This is a test"};

cout << s1.erase(0, 5); // is a test
s1.clear(); // empties string s1
```

- `length()`: returns the length of the string

```c++
string s1 {"Frank"};

cout << s1.length() << endl; //5
```

#### Input and output streams

Remember when we learned about the `getline()` method of `cin` to enable us receiving s-style strings with whitespaces in between? We can use the `getline()` function and its 2 variants to receive C++ input strings as:

```c++
string s1;

getline(cin, s1); //reads entire line until \n

getline(cin , s1, 'x'); //read entire line until detecting 'x' delimiter char - 'x' will not be included in the string
```
