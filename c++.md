# Input/Output

`<iostream>`
`<iomanip>`

> By default, the output stream shows false value as `0`, and true value as `1`. You can manipulate the output stream to show literals `false` and `true` instead of respective numbers using `boolalpha`. From the point where you appy it, all boolean values will be displayed with their respective literals.

```c++
cout << boolalpha;
cout << (p1 == p2) << endl; // false or true - not 0 or 1
```

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
using namespace std; //std::vector

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

Strings are in the standard namespace. So in order to use them without using namespace standard, you must prefix them with `std` and the scope resolution operator `::`, so it would be `std::string`. This is also true for the standard string methods that work with C++ strings.

C++ strings are also stored contiguously in memory. Unlike C-style strings, C++ strings are dynamic, and can grow and shrink during runtime.

C++ stirngs work with the stream insertion and extraction operators, just like most other types in C++. C++ string class provides a rich set of methods that allow us to manipulate strings easily. C++ strings also work well with many C++ operators.

### Working with C++ stirngs

To declare a C++ string you must include the `<string>` header file:

```c++
#include <string>
```

Then to declare C++ string variables you can do:

```c++
using namespace std; // std::string

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

# Functions

## Function definitions

Function definitions have 4 main parts:

1. Name
2. Parameter list (with their types)
3. Return type
4. Body

It is important for the compiler to know about the function before it is called in your program. For example:

```c++
int main() {
    say_hello(); // compiler error
    return 0;
}

void say_hello() {
    cout << "Hello" << endl;
}
```

This code will cause a compiler error because at the point where `say_hello` function is called, the compiler still doesn't know about the function. The compiler should know about the function beforehand, so that it can check to see if the number of parameters and their types are correct. You can fix this by either making sure that you define functions before they are used in your code, or by using **function prototypes**.

> When your program's `main` function runs, it _controls_ your program. When the `say_hello` function is called within your `main` function, _control_ is _transfered_ to the `say_hello` function. Notice how the word _control_ and _transfer_ is used. It reminds me of how Robert C. Martin talks about design patterns in his _Clean Code_ and _Clean Architecture_ books.

## Function prototypes

Function prototypes tell the compiler what it needs to know without a full function definition. Functions prototypes are also called _forward declarations_. They should be placed at the beginning of the program if the program is a small one. You can also put prototypes in your own header files (`.h` files) which is absolutely necessary in huge programs.

Let's look at an example:

```c++
int function_name(int a); // function prototype

int function_name(int a) {
    statements(s);
    return 0;
}
```

It is not necessary to provide parameter names in the prototype, but you have to provide their types. However, for documentation purposes, it is recommended to include parameter names in the prototype.

```c++
void function_name(int a, std::string b);
```

> If a function's return type is `void` you cannot insert its result into output stream `cout`. Compiler will yell at you.

## Function parameters and return statements

In C++ when you pass data into a function, that data is **passed by value**. This means that the value of the data is passed in **by copy**, so the compiler makes a copy of the data. It means that the function will not change the argument that was passed into it. Therefore, the data that we passed to the function will remain unchanged after the function returns. This can be both good and bad. Good, because this prevents you from manipulating the data by mistake. Bad, because sometimes making a copy of a data can be expensive. Also, sometimes you really do want to manipulate the data that was passed into the function.

### Formal vs. actual parameters

Formal paramteres are parameters defined in the function's definition. Actual paramters are parameters used in the function call, which are also called **arguments**. So in C++ actual paramters or arguments are passed by value or copied to the formal parameters. Let's go over an example:

```c++
void param_test(int formal) {
    cout << formal << endl; // 59
    formal = 100; // only changes the local copy
    cout << formal << endl; // 100
}

int main() {
    int actual {50};
    cout << actual << endl; // 50
    param_test(actual); // pass 50 to function as copy
    cout << actual << endl; // 50 - did not change
    return 0;
}
```

### Defaul argument values

You can add default arguments to the function prototype, or the function definition, but not both. It is best practice to do it in the prototype. To define a default value for a function parameter use this syntax:

```c++
double calc_cost(double base_cost, double tax_rate = 0.06);
```

### Return statments

It is possible to have more than one `return` statements in the function body, but it is best practice to only have one.

### Overloading functions

In C++ we can have functions that have **different parameter lists** that have the **same name**. This is called overloading functions. For instance, you may have many ways to display information to the screen, depending on what you want to display. So rather than having many functions with different names (such as `display_char`, `display_int`, etc.) you can have a single name `display` and then implement a version of the function for each type of parameter. You would then let the compiler figure out which function to use based on the function call arguments and the defined function parameters.

This is a great use of **abstraction** since you as a developer would only have to think of `display` and passing in the information you need. In software engineering, we have a principle called **polymorphism** which means many forms for the same concept. This was an example of polymorphism.

Let's now see what overloaded functions look like:

```c++
int add_numbers(int, int);
double add_numbers(double, double);

int add_numbers(int a, int b) {
    // implementation
}

double add_numbers(double a, double b) {
    // implementaion
}
```

C++ has a feature called **function templates** that allow you to just write one generic version of the `add_numbers` function and it will take care of providing the correct version when called. We will learn about this in the **Standard Template Library** section.

> There is one restriction to function overloading. The return type is not considered when the compiler tries to determin which function to call. So if you define two function prototypes with exact same paramters, but with different return types, you will receive a compiler error.

Overloading functions are used extensively in **Object Oriented** design.

### Passing arrays to functions

In order to declare a function that is able to receive an array as its paramtere, you can do:

```c++
void print_array(int numbers[])
```

There is an important difference here. We said before that arguments are passed by value into functions. However, with arrays, things are different. We learned before that the name of an array is actually a reference to the memory address of the first element of the array. So when you call a function and pass an array into it, the argument is not passed by value, but **by reference**. In other words, what is being passed into the function is **not a copy of the entire array**, but **only the address of the first element of the arrray**. Therefore, the function would have no idea how many elements are in the array. This means that whenever you pass arrays into functions, you alse need to pass the size of the array into the function, so you would know how many times to iterate.

So this cannot work:

```c++
void print_array(int numbers []);

int main() {
    int my_numbers[] {1, 2, 3, 4, 5};
    print_array(my_numbers);
    return 0
}

void print_array(int numbers []) {
    // You now only know about the location in memory where the array begins. You cannot know where it ends.
}
```

You should do this:

```c++
void print_array(int numbers [], size_t size);

int main() {
    int my_numbers[] {1, 2, 3, 4, 5};
    print_array(my_numbers, 5);
    return 0
}

void print_array(int numbers [], size_t size) {
    for(size_t i {0}; i < size, ++i)
        cout << numbers[i] << endl;
}
```

Another very important thing to keep in mind is that, since you are giving the memory address of the array, the function that the array is passed into can mutate the array elements. This can be both useful and dangerous. You can tell the compiler to prevent you from mutating the array using the `const` keyword in the function defintion:

```c++
void print_array(const int numbers [], size_t size) {
    // Any attempt to modify the array will cause a compiler error
}
```

### Passing by reference

What happens when passing arrays into functions, can be done for any other variable types, not just arrays, by using reference parameter. Reference paramteres create an alias. This way, the formal parameter in the function would be an alias to the actual parameter, no copy is made. Mutating the paramtere in the function, will mutate the original variable. This is called **pass by reference**. This is easily achieved by using the `&` symbol in the paramtere list.

```c++
void scale_number(int &num);

int main() {
    int number {1000};
    scale_number(number)
    cout << number << endl;
    return 0;
}

void scale_number(int &num) {
    if(num > 100)
        num = 100;
}
```

You can also pass vectors by reference. You can also make them constant. This is a good thing since you are not using more storage space to copy all the values of a vector, and yet you prevent the original vector from being mutated.

```c++
void print(const std::vector<int> &v);

int main() {
    std::vector<int> data {1, 2, 3, 4, 5};
    print(data);
    return 0;
}

void print(const std::vector<int> &v) {
    for (auto num : v)
        cout << num << endl;
}
```

## Scope rules

C++ uses scope rules to determine where an identifier can be used. It uses **static or lexical scoping**, meaning that the scope is determined the same way you read a program, and is easy to follow.

C++ has 2 main scopes: local or block scope, global scope

### Local or block scope

This refers to the visibility of an identifier that has been declared in a block. Function paramteres also have block scope. They are visible within the block in which they are declared.

When a function is called, you can think of the function as being activated, and the function paramteres are bound to storage. They become alive and their lifetime is while the function is executing. Once the function completes, the function is deactivated, and these variables and paramteres are no longer alive. It does not mean that they are somehow marked as unavailable, but the compiler will not know about them anymore, and the storage to which they were bound to will likely be reused. So the values of local-scoped variables are not preserved between function calls, unless they are `static`. The value of static variables is preserved between function calls. This is a **static local variable**:

```c++
void function_name() {
    static int variable {10};
    variable += 10;
}
```

It is a variable whose lifetime is the **lifetime of the program**. But it is only visible to the statements within the function body. These variables can come in very handy when you need to know a **previous value** in a function without having to pass it in all the time. In the example above, the first time you call the function, the `variable` is initialized to `10` and then mutated to `20`. If you call the function for the second time, the `variable` will not be initialized to `10` again, but it will preserve its previous value, which was `20`, so the `variable` value will now become `30`. So static local variables are **only initialized once**. If no initializer is provided, they are set to 0. To summerize in a golden statement you can think: **A static local variable behaves like a global variable, because it retains its value, but its scope is local.**

> Note that you can create a block in your code by simply opening a `{}`. It does not have to be the body of a function or the body of an `if` statement.

```c++
int main() {
    // some code

    {
        // some other code with its own block scope
    }
}
```

### Global scope

Identifiers with global scope are identifiers that are declared outside of any function or class. These identifiers are visible to all parts of the program following their declaration. Best practice with identifiers with global scope is that it is okay to use **global constants**, but **global variables** shold be avoided.

## Mechanics of function calls

Functions use an area in memory called the **function call stack** or the **program stack**. A stack is analogous to a stack of books or a stack of dishes. If you place a book on top of the stack, then you must remove that before removing any others. This is referred to as LIFO (Last In, First Out).

Stacks also use the term **push** when you put an item on top of the stack, and **pop** when you remove an item from the top of the stack. In the case of a C++ program, these items are called **stack frames** or **activation records**. It is a collection of information that represents an active function. This is where parameters are stored, local variables, the return address and more.

Each time a function is called, an activation record is created, and its pushed on to the call stack. When the function terminates, we pop its activation record off the call stack, and now the top of the stack is the function that just called the one we just popped off.

You cannot jump into or out of the middle of the stack, you must follow the LIFO rules. Also remember that the call stack is finite in size. If you activate too many functions in the call stack, then it is possible to run out of stack space. This results in a **stack overflow** error.

## Inline functions

Function calls have a certain amonut of overhead. You need to create an activation record, push it on the stack, deal with parameters, pop off the activation record when the function terminates, and deal with the return addresses and return values. Although these are done fast and efficiently, it is a lot. Sometimes we have a very simple function and the function call overhead might be greater than the time spent executing the function the way just described. In such cases, we can suggest to the compiler that it generate inline code.

Inline code is basically inline assembly code that avoids the function call overhead. Inline code is generally faster, but if you inline a function many times, then you are duplicating function code in many plcaes and it could lead to larger binaries. That said, compilers are so sophisticated now that they will likely inline code even without your suggestion. Let's see what an inline function looks like:

```c++
inline int add_numbers(int a , int b) {
    return a + b;
}

int main() {
    int result {0};
    result = add_numbers(100, 200); //call
    return 0;
}
```

Inline functions are usually declared in header or `.h` files since the definition must be available to every source file that uses it. Compilers now are smart enough to make short functions like this inline anyway even if you don't provide the `inline` keyword.

## Recursive functions

Recursion is great for certail classes of problems. Here is the main guideline of recursive problem solving:

1. Base case
2. Divide the rest of the problem into sub-problems and do recursive call

For instance, to calculate the mathematic factorial we can say:

1. Base case: `factorial(0) = 1`
2. Recursive case: `factorial(n) = n * factorial(n-1)`

Let's implement this in C++:

```c++
unsigned long long factorial(unsigned long long n) {
    if(n == 0) // base case
        return 1;
    return n * factorial(n-1); // recursive case
}

int main() {
    cout << factorial(8) << endl;
    return 0;
}
```

Here are some important tips to remember about recursion:

- If recursion does not eventually stop, you will have **infinite recursion**
- Recursion can be **resource intensive**
- Remember the **base case(s)**. It terminates the recursion
- Only use recursive solutions when it makes sense
- Anything that can be done recursively can be done **iteratively**

# Pointers and references

A pointer is a variable. Variables have an address in memory where they are bound to. They also have a type. A pointer is a variable that stores the address of another variable or function.

So if you initialize an integer variable named `x` to `10`, then `x` is of type `int` and it is bound to some memory location, and contains the value `10`. This means that you can declare a pointer variable that stores the address of `x`.

Again, a pointer is a variable. This means that the pointer, too, has a memory location where it is bound to. It has a type, it has a value, and the value is an address. A pointer points to a variable or a function.

If you use a pointer, you must know the type of what it points to.

## Why use pointers?

If a pointer points to a variable or a function, can't we just use the variable or the function directly? Sure, and **if you can, you should**. But you can't always do that.

For example, if you have some complex data that is defined outside a function and you want to access that data from within the function, you can't, because the variable name is out of scope. So you can pass the data to the function by value and make a copy of it, or you can use a reference or a **pointer paramter** to access that data from within the function. Also, pointers are often used to **operate on arrays** very efficiently.

You can use pointers to **allocate memory** from the **heap** or the **free store** at runtime. That memory does not have a variable name associated with it. So the only way to use it is through a pointer.

Finally, if you are working with **embedded systems**, **device drivers** or other types of system software, sometimes you need to gain access to specific memory address or a range of memory addresses, and pointers is the best way to do that.

## Declaring pointers

We declare pointer variables in exactly the same way as declaring regular variables, except that we add the **asterisk** prior to the variable name.

```c++
// variable_type *pointer_name
int *int_pointer // asterisk next to variable name
char* char_pointer // asterisk next to variable type
```

> The compiler does not care where you put the asterisk. Let's just go by the first syntax.

Just like any other variable, if you don't initialize pointer variables, they will contain garbage values. It is very important in C++ that you initialize pointer variables before you use them. An uninitialized pointer can point anywhere.

```c++
// variable_type *pointer_name {nullptr}
int *int_pointer {}; // init to 0 - pointing nowhere
double *double_pointer {nullptr} // init to 0 - pointing nowhere
```

## Accessing pointer address

Let's learn how to access the address or location in memory of any variable. We will also learn how to initialize a pointer variable to point to another variable.

In C++ we can use the **address operator `&`** to the left side of an operand. When the address operator is used in an **expression**, it evaluates to the address ot its operand. Of course, the operand must have an `l-value`, so it cannot be a constant or an expression that evaluates to temprary values. Let's go over an example:

```c++
int num {10};
cout << "Value of num is: " << num << endl; // 10 - value
cout << "sizeof of num is: " << sizeof num << endl; // 4 - storage amount in bytes
cout << "Address of num is: " << &num << endl; // 0x61ff1c - memory address (base-16)
```

And now let's see another example:

```c++
int *p;
cout << "Value of p is: " << p << endl; // 0x61ff60 - garbage that points anywhere
cout << "Address of p is: " << &p << endl; // 0x61ff18
cout << "sizeof of p is: " << sizeof p << endl; // 4
p = nullptr;
cout << "Value of p is: " << p << endl; // 0
```

> It is important not to confuse the size of a pointer and the size of what it points to. All pointers in a program have the same size, but they may be pointing to very large or very small types.

## Storing address in pointer

The compiler will make sure that the address stored in a pointer variable is of the correct type:

```c++
int score {10};
double high_temp {100.7};

int *score_pointer {nullptr};

score_pointer = &score; // ok
score_pointer = &high_temp; // error - type conflict
```

> In C++ you can also have untyped void pointers. They are not much used in C++, they are used in C.

## Dereferencing a pointer

Let's now learn how to access the data that a pointer is pointing to. This is called dereferencing a pointer.

If `score_pointer` is a pointer and has a valid address, then you can access the data at the address contained in the `score_pointer` using the derefercing operator `*`.

```c++
int score {100};
int *score_pointer {&score};

cout << *score_pointer << endl; // 100

*score_pointer = 200;
cout << *score_pointer << endl; //200
cout << score << endl; // 200
```

> When we dereference a pointer on the left hand side of an assignment statement, this results in an `l-value` or the address of what score pointer is pointing to, which in this case is `score`.

If your pointer variable is pointing to a vector, you can use the `at` method on the dereferenced pointer to access a member of the vector. You can do anyting you could do with a regular vector, when you access a vector through a pointer.

```c++
vector<string> stooges {"Larry", "Moe", "Curly"};
vector<string> *vector_pointer {nullptr};

cout << "First stooge: " << (*vector_pointer).at(0) << endl;

for (auto stooge: *vector_pointer)
    cout << stooge << " ";
```

## Dynamic memory allocation

Dynamic memory allocation is one of the main use cases of pointers in C++. When we are developing a software, we often have no idea about how much storage we are going to need to model our data. For example, if I am going to model my students in my class, how many students do I allocate storage for? Yes you can use vectors, but it is important to know how to dynamically allocate memory for other types, including objects.

All memory allocated dynamically via a pointer comes from the **heap** or the **free store**. Let's now see how to allocate memory at runtime.

In C++ we use the `new` keyword to allocate storage at runtime.

```c++
int *int_pointer {nullptr};

int_pointer = new int; // allocate an integer on the heap - uninitialized
cout << int_pointer << endl; // 0x2747f28
cout << *int_pointer << endl; // 41188048 - garbage

*int_pointer = 100;
cout << *int_pointer << endl; // 100
```

A couple of things to remember here:

- When you allocate storage in this manner, the storage is on the heap, the allocated storage contains garbage data until you initialize it.
- The allocated storage does not have a name. The only way to get to that storage is via the pointer.
- If you lose the pointer (becaue it goes out of scope or you re-assign it), then you lost your only way to get to that storage, and you have a **memory leak**.
- When you are done using the storage, you must de-allocate the storage, so that it is again available to the rest of the program.

Let's now see how to de-allocate or free an allocated storage:

```c++
int *int_pointer {nullptr};
int_pointer = new int; // allocate an integer on the heap
// some code
delete int_pointer; // free the allocated storage
```

> When using `delete` to free the allocated storage, make sure the address in the pointer is an address of storage that was allocated using `new`.

Let's go over another example where we allocate storage for an entire array of integers on the heap.

```c++
int *array_pointer {nullptr};
size_t size {};

cout << "How big do you want the array? ";
cin >> size;

array_pointer = new int[size]; // allocate array on the heap - if the storage is successfully created, the address of the first integer is stored in the 'array_pointer' variable

// some code

delete [] array_pointer; // brackets must be empty
```

## Relationship between arrays and pointers

The value of an array name is the location or the address of the first element of the array. The value of a pointer is also an address. So if the pointer points to the same data type as the array elements, then the pointer and array name can be used interchangeably (almost). The only difference is that the array name is not a variable, so you can't change it. But otherwise, all the calculations done to accress array elements can be done with the array name or the pointer name.

```c++
int scores[] {100, 95, 89};

cout << scores << endl; // 0x61fec8
cout << *scores << endl; // 100

int *score_pointer {scores};

cout << score_pointer << endl; // 0x61fec8
cout << *score_pointer << endl; // 100

cout << score_pointer[0] << endl; //100
cout << score_pointer[1] << endl; //95
cout << score_pointer[2] << endl; //89
```

> C++ does not really have true arrays. They just don't exist. It is a concept. An array is nothing more than just the address of the first element in a chunk of memory. So you can add the subscripting offset to the pointer variable to point to any array element.

Let's summerize:

```c++
int array_name[] {1, 2, 3, 4, 5};
int *pointer_name {array_name};

// subscripting notation
array_name[index]
pointer_name[index]

// offset notation (using pointer aritmatic)
*(array_name + index)
*(pointer_name + index)
```

When you add `1` to the `pointer_name` variable which is pointing to an array, the arithmatic is done differently, compared to a regular addition. So C++ will not actually add one to the address in the `pointer_name` variable, but it will add **1 unit of size related to the type of the array element that the pointer is pointing to**. So if the pointer is pointing to an array of integers, adding 1 means adding 1 unit of size of an integer.

C++ automatically understand which mode of arithmatics it should perform. If you are adding 1 to another number, it will perform a regular addition. If you are adding 1 to a pointer variable, it tries to figure out what is the type of the variable that the pointer is pointing to. Based on that type, it will understand what 1 means in that type context.

Adding numbers to array names is just the same as described above. The name of an array is just a pointer to the first element of the array. So adding 1 to the array name will perform a pointer arithmatic.

## Pointer arithmetic

In C++ pointers can be used in:

- Assignment expressions
- Arithmetic expressions
- Comparison expressions

C++ allows a subset of the arithmetic operators to work with pointer variables.

> Pointer arithmetic only makes sense with raw arrays, but they are a very powerful way to manipulate them.

Here are some arithmetic operations you can use with pointers:

- `++`: Increments a pointer to point to the next array element.
- `--`: Decrements a pointer to point to the previous array element.

```c++
int_pointer++;
int_pointer--;
```

- `+`: Increments pointer by `n * sizeof(type)`
- `-`: Decrements pointer by `n * sizeof(type)`

```c++
int_pointer = int_pointer + n;
int_pointer = int_pointer - n;
```

> Subtracting two pointers will determine the number of elements between the pointers. Of couse, this is possible only if the two pointers point to the same data type.

```
int n = int_pointer2 - int_pointer1;
```

- `==` and `!=`: Comparing two pointers will determine if two pointers point to the same location or not. Remember that this does not compare the data where they point.

```c++
string s1 {"Frank"};
string s2 {"Frank"};

string *p1 {&s1};
string *p2 {&s2};
string *p3 {&s1};

cout << (p1 == p2) << endl; // false
cout << (p1 == p3) << endl; // true

cout << (*p1 == *p2) << endl; // true
cout << (*p1 == *p3) << endl; // true
```

Let's take a look at a rather special example:

```c++
int scores[] {100, 95, 89, 68, -1};
int *score_pointer {scores};

while (*score_pointer != -1)
    cout << *score_pointer++ << endl // this will deference the pointer, get its value, output it to screen, and then increment it
```

## `const` and pointers

Let's see how `const` qualifiers affects pointers. You have seen that the use of `const` with function reference paramteres essentially makes them read-only. In C++ we can qualify a pointer in several ways.

First, you don't have to use `const` at all. In this case, we have a pointer just as we have been using up to this point. We can change the data the pointer is pointing to, and we can change the pointer itself and make it point to somewhere else.

The `const` qualifier gives us more fine-grained control of what we allow to be changed. We can have:

1. Pointers to constants: The data pointed to by the pointers is constant and cannot be changed. The pointer itself can change and point to somewhere else.

```c++
int high_score {100};
int low_score {65};
const int *score_pointer {&high_score};

*score_pointer = 86; // error
score_pointer = &low_score; // ok
```

2. Constant pointers: The data pointed to by the pointers can be changed. The pointer itself cannot change and point somewhere else.

```c++
int high_score {100};
int low_score {65};
int *const score_pointer {&high_score};

*score_pointer = 86; //ok
score_pointer = &low_score; // error
```

3. Constant pointers to constants: The data pointed to by the pointer is constant and cannot be changed. The pointer itself cannot change and point to somewhere else.

```c++
int high_score {100};
int low_score {65};
const int *const score_pointer {&high_score};

*score_pointer = 86; // error
score_pointer = &low_score; // error
```

Using `const` and pointers is pretty useful when we want to pass pointers to functions.

## Passing pointers to functions

In C++ we can use pointers and the dereference operator to achieve pass-by-reference. In this case, the function paramtere is a pointer. The actual parameter can be a pointer variable or the address of a variable. Let's take a look at its syntax.

To define a function that can receive pointer paramter:

```c++
void double_data(int *int_pointer); // expecting a pointer to integer

void double_data(int *int_pointer) {
    *int_pointer *= 2; // doubles the contents of the data the pointer points to
}
```

Then to call the function:

```c++
int main() {
    int value {10};

    cout << value << endl; // 10

    double_data(&value);

    cout << value << endl; // 20
}
```

> > Notice that the return type of the `double_data` function is `void`. So you won't receive any value if you assign the result of calling it to a variable. But it can mutate the value of a variable.

When declaring a function that its job is to only display some data, we usually want to prevent it from being able to modify its input data. To do this you can declare the function as:

```c++
void display(const vector<string> *const v) {
    (*v).at(0) = "Funny"; // This will cause compiler error because of the first const
    for(auto str: *v)
        cout << str << " ";

    v = nullptr; // this will cause compiler error because of the second const
}

int main() {
    vector<string> stooges {"Larry", "Moe", "Curly"};
    display(&stooges);
}
```

> Notice that the first `const` in the `display` function declaration makes the data that is being pointed to a constant, and the second one makes the pointer a constant.

Let's go over another example. In this example, while you can, and probably should, declare the data that the pointer is pointing to as constant, you cannot declare the pointer itself to be a constant:

```c++
void display(int *array, int sentinel) {
    while (*array !== sentinel)
        cout << *array++ << " ";
}
```

This function is using the pointer to iterate over an array. So the pointer needs to be updated after each iteration. If you declare a constant pointer, you won't be able to perform `*array++`, since you would not be allowed to change the pointer.

## Returning pointer from functions

In C++ functions can return pointers, which is a super powerful feature.

```c++
type *function();
```

This means that the function will return an address of whatever type we specified in the function declaration or prototype. In this example, we are returning a pointer to an integer:

```c++
int *largest_int(int *int_pointer1, int *int_pointer2) {
    if(*int_pointer1 > *int_pointer2)
        return int_pointer1;
    else
        return int_pointer2;
}
```

To call this function:

```c++
int main() {
    int a {100};
    int b {200};

    int largest_pointer {nullptr};
    largest_pointer = largest_int(&a, &b);
    cout << *largest_pointer << endl; // 200
    return 0;

}
```

Let's now go over another example. In this example, we allocate memory dynamically inside a function and return the address of that memory. In a sense, I think it is actually necessary to return the address of the memory that was dynamically allocated inside a function, because after the function returns, you should be able to free that memory at some point somehow, otherwise you would have a memory leak. This actually is a very common use case for returning a pointer from a function. So when you allocate memory dynamically inside a function, you should return the pointer to that address from the function.

```c++
int *create_array(size_t size, int init_value = 0) {
    int *new_storage {nullptr};

    new_storage = new int[size];
    for(size_t i {0}; i < size; ++i)
        *(new_storage + i) = init_value;

    return new_storage;
}
```

To use this function you can do:

```c++
int main() {
    int *my_array; // will be allocated by the function

    my_array = create_array(100, 20);

    // some code that uses 'my_array'

    delete [] my_array; // make sure you free the storage after you are done with it

    return 0;
}
```

### Don't do this when returning pointers from functions

**Never ever** return a pointer that is pointing to a local variable.

```c++
int *dont_do_this () {
    int size {};
    // some code
    return &size;
}

int *or_this () {
    int size {};
    int *int_pointer {&size};
    // some code
    return int_pointer;
}
```

In the `dont_do_this` function you are declaring a local variable (which its storage is allocated from **stack**) and then returnin a pointer to that location in stack. As you know, when a function returns, the area in the stack that was used by the function is released and can be reused by other function calls. So after the `dont_do_this` function has returned, the local `size` variable will is past its lifetime, and the returned pointer will be pointing to something else, related to newer function calls. Then if you try to do something with that location in memory, you would actually be messing around with something totally different than what you would expect. Hopefully, you will get an error or see some strange behavior and you will fix it. But many times, you you're application will keep working and the strange behavior will happen some time later. This is one of the most difficult bugs to track down. So never ever return pointers that point to local variables.

## Potential pointer pitfalls

Here are the main things you should beware of:

- Uninitialized pointers
- Dangling pointers
- Not checking if `new` failed to allocate memory
- Leaking memory

### Uninitialized pointers

Take look at this piece of code:

```c++
int *int_pointer; // uninitialized - can point to anything garbage
*int_pointer = 100; // let's hope your app will crash
```

> In the old days of computing, it wasn't uncommon to corrupt data on storage devices by using uninitialized pointers.

### Dangling pointers

These are pointers that are pointing to memory that is no longer valid. If you try these pointers to access that data, you don't know what the result will be. The main reason for dangling pointers are:

1. Returning addresses of function local variables on the stack that are no longer valid since the function is terminated.
2. Allocate memory dynamically and assign it to a pointer variable, then you assign another pointer variable to point to that same storage. Now you have two pointers pointing to the same area on the heap. Everything is ok up to this point. We do this nearly always. The problem occurs when one of the pointers release the memory, but the other pointer is still referencing to it, and you use it; Unexpected results can happen.

### Not checking if `new` has failed

If `new` fails to allocate storage, an **exception** is thrown and your program terminates. We can use exception handling to get more fine-grained control over these exceptional situations. If you try to dereference a pointer which is pointing to `null`, your program would crash. This is good in testing, but not good in production.

### Leaking memory

Memory leaks are easy to understand. When you allocate storage dynamically on the heap, this storage has no name. It is simply an area of memory that is returned to you and you store the value in a pointer. The only way to get to this memory is through the pointer. What if you lose the pointer? Say you allocated the memory in a function, and the pointer was declared in the function and the function terminates. Now you just lost your pointer. There is no way you can reference that allocated memory on the heap, while this memory is still considered in use by C++. So this is called a _memory leak_.

If you leak enough memory, you could run out of storage on the heap for future allocations. Memory leaks was much more problematic when memory was limited, but there is still an error in a sign of bad code.

C++ has introduced **smart pointers**, that take care of many of these problems and are still very efficient.

## References

Although a reference may sound similar to a pointer, they are actually very different. A reference is an **alias** for a variable. So when you use the reference, you are actually using the variable it refers to. References myst always be initialized to a variable when you declare them, and they can never be `null`. Once you initialize a reference you can't change it so it becomes an alias for a different variable.

References are great to use as function paramteres. You might find it useful to think of a reference as a constant pointer that is automatically dereferenced when you use it.

In order clear thing up about references, let's go over some simple examples:

```c++
int main() {
    int num {100};
    int &ref {num};

    cout << num << endl; // 100
    cout << ref << endl; // 100

    num = 200;
    cout << num << endl; // 200
    cout << ref << endl; // 200

    ref = 300;
    cout << num << endl; // 300
    cout << ref << endl; // 300
}
```

Let's now see some more real-world uses of references. References are often used in `range-based for` loops to access collection elements inside each iteration. This is an example of this, not using references:

```c++
vector<string> stooges {"Larry", "Moe", "Curly"};

for (auto str : stooges)
    str = "Funny"; // changes the copy of stooges, since 'str' in this loop is a copy of each element of the vector

for (auto str : stooges)
    cout << str << endl; // Larry, Moe, Curly
```

Here is the same example, using references:

```c++
vector<string> stooges {"Larry", "Moe", "Curly"};

for (auto &str : stooges)
    str = "Funny"; // changes the actual element of vector, since 'str' in this loop is now a reference to the actual element

for (auto &str : stooges)
    cout << str << endl; // Funny, Funny, Funny
```

Note that by using a reference, we are not incurring the cost of copying each vector element in each loop iteration. This is good and efficient, but there is a problem now. In the second loop which is responsible for just displaying the vector elements, when you provide reference to the actual element, you are effectively enabling the risk of modifying the actual elements. You don't want that in a loop that its job is to display the data. However, we still want to use references to avoid making copies and use unnecessary storage. So let's now use `const` to make the reference a constant, so the compiler will prevent us from modifying the elements:

```c++
vector<string> stooges {"Larry", "Moe", "Curly"};

for (auto &str : stooges)
    str = "Funny";

for (auto const &str : stooges) {
    str =  "Funny"; // compiler error
    cout << str << endl;
}
```

> Unless you have a specific reason to copy elements in `range-based for` loops, you should use reference variables to make your code more efficient. And, if you are not going to modify the collection elements, make the reference `const`.

### Back to `l-value` and `r-value`

As you learn more advanced features of the languge, these 2 concepts become much more important than before.

An `l-value` is an object that occupies a location in memory and is addressable since we can use them on the left-hand side of an assignment statement. Take a look at the code below:

```c++
int x {100}; // x is an l-value
x = 1000;
x = 1000 + 20;

string name; // name is an l-value
name = "Frank";
```

`l-value`s are modifiable if they are not constants. What is not an `l-value`?

```c++
100 = x; // 100 is NOT an l-value, it is not addressable - compiler error
(1000 + 20) = x; // (1000 + 20) is NOT an l-value - compiler error

string name;
name = "Frank";
"Frank" = name; // "Frank" is NOT an l-value - compiler error
```

An `r-value` is anything that is not an `l-value`. Usually, `r-value`s are on the right-hand side of an assignment expression. `r-value`s can also be termporary values that C++ compiler creates. It can also be a literal.

```c++
int x {100}; // is an r-value
int y = x = 200; // (x + 200) is an r-value

string name;
name = "Frank"; // "Frank" is an r-value

int max_num = max(20, 30); // max(20, 30) is an r-value
```

`r-value`s can be assigned to `l-value`s explicitly. So `l-value`s can appear both on the left or right-hand side of the assignment statement.

```c++
int x {100};
int y {0};

y = 100; // r-value 100 assigned to l-value y
x = x + y; // r-value (x+y) assigned to l-value x
```

Let's now look at references from the perspective of `l-value`s and `r-value`s. The references we have used so far are `l-value` references, because we are referencing `l-value`s.

```c++
int x {100};

int &ref1 = x; // ref1 is reference to l-value
ref1 = 1000;

int &ref2 = 100; // compiler error - 100 is an r-value
```

The same thing is true when we pass-by-reference to functions:

```c++
int square(int &n) { // avoiding making a copy of the integer parameter
    // but remember that you can manipulate the integer parameter.
    return n*n;
}

int num {10};

square(num); // ok
square(5) ; // compiler error - can't reference r-value 5
```

## Recap

Let's learn about when to use pointers vs. references parameters.

**Pass by value**: When the function does not modify the actual parameter, and the parameter is small and efficient to copy like simple types (`int`, `char`, `double`, etc.). Pass-by-value is what C++ does by default.

> Collection types, like strings and vectors and others have a certain amount of overhead involved when they are copied.

**Pass by reference using a pointer**: In the case of pass-by-reference with a regular pointer, we do want to modify the actual paramtere from within the function and that the parameter is expensive to copy. Then the last criteria is that it is okay for the pointer to contain a `null` value. This matters because a lot of data structures rely on pointers becoming `null` at the end of lists or the end of trees. In these cases, you really want to **pass pointers** and **not references**, becasue references cannot be `null`.

**Pass by reference using a pointer to `const`**: In this case, this is suitable when the function does not modify the actual paramtere, but the actual parameter is expensive to copy (like a display function). Also remember that pointers can contain `null` values, and this is very useful in data structures. In this case, the pointer is allowed to contain a `null` value.

**Pass by reference using a `const` pointer to `const`:** In this case it is very useful when the function does not modify the actual paramtere, and the parameter is expensive to copy, it is ok to have `null` pointer, and also the function never modifies the pointer itself. This is a good example where you would pass something in, and you are guaranteed that the pointer is not moving and the data it is pointing to is not going to change.

**Pass by reference using a reference:** This is used when the function does modify the actual paramtere and the parameter is expensive to copy. Of course, you can never have `null` values in the reference. So if you are working with data structures that depend on `null` values, you really should be using pointers and not references.

**Pass by reference using `const` reference:** This is useful when the function does not modify the actual parameter, but the paramtere is expensive to copy. Again, you cannot have `null` references. So if you need `null` values, go with the pointers.

# OOP

To understand OOP better, let's first review procedural programming and its limitations. Procedural programming is pretty much what we have been doing up to this point. The focus of procedural programming is the function. We modularize our programs by creating many functions that each specify a **process** or **action** in the program. So procedural programs are basically a collection of functions.

In procedural programming, we declare our data separate from the functions. Then, whenever we need the function to process or use our data, we pass in the data to the function. There is nothing wrong with procedural programming. After all, some languages don't support OOP features. Procedural programming is very easy to use since it is all about breaking a problem into smaller sub-problems. However, procedural programming has some limitations.

One problem of procedural programming is that functions need to know the structure of the data. If the structure of the data changes, many functions must be changed. Suppose we have a program with hundreds of functions, and many of them expect a specific data structure as an argument. If the structure or format of the data that is being passed around changes, then this would affect many functions. This could have a ripple effect in the program and the amount of effort needed to change and then test all of the updated functions could be substantial.

The real limitations of procedural programming really begin to show as programs become larget and more complex. As procedural programs get larger and larger, they become more difficult to understand since the number of connections in the program becomes very hard to trace by hand. Also, reusing functions and data structures that we wrote for one program in another program becomes much more difficult since after time, we end up with code whose behavior is not that easy to visualize. Finally, the code becomes more fragile and easier to break. This means when we add new functionality or fix a bug, the chances of introducing another bug is high.

Let's now talk about some principle features of OOP. **OO is all about modeling your software in terms of classes and objects**. These classes and objects model real-world entities in your problem domain. So if you are writing an application that allow users to store, edit, and manipulate images, then your classes might be `album`, `photo`, `slideshow`, `location` and so forth. If you are modeling a student enrollment system, you classes might be `student`, `course`, `professor` and so on. How will this make it different from procedural programming?

It is all about **abstraction**. As your program grows more complex, we need ways to deal with complexity. Classes and objects are one way to do just that. With OOP, rather than thinking in terms of `first_name`, `last_name`, `student_id` and so on, you can think in terms of `student` and all that detail comes along with it. Not only this, but operations like `register`, `drop_course`, `add_course` and so forth, also come along with it. So for example, if Frank is an object, and it was created from the `student` class, I can ask Frank if he has registered this term. This is very different from procedural programming, where I would have a function that would tell me if the student is registered and then I would have to pass a student to that function. This function would have to know how to determine whether a student is registered or not. If, some time later, the **business logic** changes, then you need to figure out everywhere in the program that knows this so we can update the code. In the OOP solution, only the class `student` know this, so a precise change is all that is necessary.

The fact that objects contain data and operations that work on that data is called **encapsulation**. And it is an extension of the abstract data type in computer science. So the data and the operations that should work on them are all in a class, not spread across many functions, each passing and receiving data.

We can take the idea of **encapsulation** even further with **information hiding**. OOP allows us to hide implementation-specific logic in a class so that it is available only within the class. This allows us to provide a public interface to the class and hide everything else. This way, we can make sure that the user of the calss cannot mess with the implementation specific code since they never knew about it in the first place. This makes the code easier to maintain, debug and extend.

OOP is also all about **reusability**. Reusability is defined in terms of using something from this program in another program. Since classes are pretty much encapsulated units of data and operations, reusing them in other applications is much easier. Since the class has already been tested, we get that benefit as well. This leads to faster development and better quality software.

Finally comes **inheritance**. Inheritance allows us to create a new class based on an existing class by only adding or modifying the elements that we need to be able to create our new class. Suppose we have an `account` class that models a basic bank account. So it has a `ballance` and the regular `withdraw` and `deposite` methods. Now suppose we have the need for a special `trust_account` class, and our business logic says that this type of account is limited to 3 withdrawals per year and each withdrawal can't exceed 10% of the current account ballance. We could add this logic to the `account` class that we already have, but what if we expect lots of variations to that `account` class, and each one of them has its own business logic, not only for withdrawal, but also for deposit. This could quickly make that simple `account` class a beast that no programmer wants to deal with. In this case, we can derive our new class from existing `account` class, and add the appropriate behavior in the new class without modifying the original class at all. This leads to reusability as well as **polymorphic** classes, since all the derived classes we created are, in fact, still `account`s.

While OOP can certainly help us develop large programs that are easier to maintain, test, debug, and reuse components from, it is not a penecea (e.g. a solution or remedy for all difficulties or diseases - definition by Oxford). OO won't make bad code better; it will likely make it worse. Also, OO is **not suitable for every application**, and **not everything decomposes into a class**. There are sometimes non-functional requirements that horizontally cross-cut a system, and these tend to add tangled code within existing classes. If you have a small program that won't be around for any significant amount of time, maybe it is an internal program that you are using to automate something, then OOP might be overkill. A simple procedural or scripting program may be perfectly appropriate. It usually takes more upfront design time in order to write an OO program. Large OO programs sometimes go through significant upfront design. Finally, OO programs tend to be larger in size than non-OO programs, and can sometimes be slower and more complex since there is so much more going on behind the scenes.

## Classes and objects

You can think of classes as blueprints form which obejcts are created. Classes are user-defined types. One of the goals in OOP is to make the user-defined types feel like they are part of the programming language.

Classes have **attributes** which are data. They also have **methods** which are functions. Classes can hide data and methods that are only used internally by the class. This is done using the `private` and `public` access modifiers. The goal of the class is to provide a well-defined **public interface** that the user of the class can easily use to solve their problems.

Here are some example classes:

1. `Account`
2. `Employee`
3. `Image`
4. `std::vector`
5. `std:string`

Objects are created from classes and represent a specific instance of the class they are created from. So if I have an `account` class, I can create a Frank's `account` object as well as hundreds of other classes for other users. Each object has its own identity, and each can use the methods defined in the class. Let\_'s see some examples:

```c++
int high_score; // primitive types - not class or object
int low_score;

Account frank_account; // instances of Account class
Account jim_account;

std::vector<int> scores; // instance of vector class
std::string name; // instance of string class
```

## Declaring classes

The syntax is very simple to declare classes:

```c++
class Class_Name { // best practice to capitalize class names
    // declarations of data and behavior
};
```

Let's go over a real-world example:

```c++
class Player {
    // attributes
    std::string name {"Frank"};
    int health {100};
    int xp;

    // methods
    void talk(std::string text_to_say);
    bool is_dead();
}
```

> Notice that you can initialize the attributes like in the example above, though it might seem a bit strange that you can do that, since it is just a class, not a real object here.

You can now create objects as instances of the class you defined:

```c++
Player frank;
Player hero;

Player *enemy = new Player(); // pointer to dynamically created object on the heap
delete enemy;
```

Let's go over another class declaration example:

```c++
class Acccount {
    // attributes
    std::string name;
    double balance;

    // methods
    bool withdraw(double amount);
    bool deposite(double amount);
}
```

> Notice that we have written function prototypes in class declarations in these examples.

Let's now create objects as instances of the `Account` class:

```c++
Account frank_account;
Account jim_account;

Account *mary_account = new Account();
delete mary_account;
```

Once you have objects, you can use them like any other variable in C++. For example, you can create an array of account objects.

```c++
Account frank_account;
Account jim_account;

Account accounts[] {frank_account, jim_account};

std::vector<Account> accounts1 {frank_account};
accounts1.push_back(jim_account);
```

> It is important to keep in mind that class declarations should usually be accessible from anywhere in your application. So don't declare them in your `main` function. Put them in your global scope.

## Accessing class members

There are 2 ways to access class members:

1. Dot operator

```c++
Account frank_account;

frank_account.balance;
frank_account.deposite(1000.00);
```

1. Member of pointer operator (arrow operator): If you have a pointer to an object, there are 2 ways to access class members. To emphasize again, remember that in these examples `frank_account` is not an object, but a pointer to an object, dynamically allocated on the heap.

- Dereference the pointer, then use the dot operator:

```c++
Account *frank_account = new Account();

(*frank_account).balance;
(*frank_account).deposite(1000.00);
```

- Or use the member of pointer operator (arrow operator):

```c++
Account *frank_account = new Account();

frank_account->balance;
frank_account->deposite(1000.00);
```

Now before being able to access class members, you should know that all class members are private and unaccessible by default. So you would have to put the `public` statement where you want to be public:

```c++
class Acccount {
public:
    // attributes
    std::string name;
    double balance;

    // methods
    bool withdraw(double amount);
    bool deposite(double amount);
}
```

## `public` and `private`

C++ has three basic class member access modifiers:

- `public`: accessible everywhere
- `private`: accessible only by members of _friends_ of the class
- `protected`: used with _inheritance_

To use the `public` access modifier:

```c++
class Class_Name {
    public:
    // declarations;
};
```

To use the `private` access modifier:

```c++
class Class_Name {
    private:
    // declarations;
};
```

> Note that by default, everything in the class will be private if no access modifier is specified.

To use the `protected` access modifier:

```c++
class Class_Name {
    protected:
    // declarations;
};
```

The difference between `protected` and `private` comes in when using **inheritance**.

In real-world class declarations we almost always use the 3 access modifiers at the same time. For instance:

```c++
class Player {
    private:
        std::string name;
        int health;
        int xp;
    public:
        void talk(std::string text_to_say);
        bool is_dead();
}
```

This is how C++ implements **information hiding**. If you try to access a `private` class member, you get a compiler error.
