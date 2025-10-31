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
