# Numbers

There are 4 types of numbers in Python:

1. Integers: `int`
2. Floating point: `float` -> 0.0 is float
3. Complex
4. Long: `long`

> Integers take up less space in memory than floating point numbers

You can get the type of a number by calling the `type` method on it:

```py
type(9)
# <class 'int'>
type(9.0)
# <class 'float'>
```

Good to know that adding an integer and a float, will always result in a float:

```py
1 + 1.0
# 2.0
```

## Operators

Here are some special math operators that you may have come across in other programming languages:

1. `**`: Exponentiation -> `2**3 = 8`
2. `%`: Modulo (remainder of a division) -> `10 % 3 = 1`
3. `//`: Integer division -> `10 // 3 = 3`

# Variables and strings

Here are some Python data types:

1. `bool`: Either `True` or `False`
2. `int`
3. `str`: A sequence of Unicode characters
4. `list`: An ordered sequence of values of other data types
5. `dict`: A collection of `key: value` pairs

## The `None` value

Equivalent to `null` in JavaScript, `None` means just "nothing" or "no value" in Python. It is useful when you want to define a variable but the variable should have no value at the time.

> What do you think is the result of `type(None)`?

```py
type(None)
# <class "NoneType">
```

## Strings

### Formatting strings

String formatting is done using `f` strings in Python:

```py
num = 100
print(f"I've told you {num} times.")
```

### Indeicies

Strings have some features in common with lists. Each character in a string, is treated as an element in a list and therefore, has an index number assigned to it.

```py
name = "Chuck"
name[0]
# 'C'
```

> Using [-1] index on a string will always return the last element/character.

## Converting data types

You can explicitly convert variables by using the name of the built-in type as a function.

```py
decimal = 12.564857
integer = int(decimal)
# 12

my_list = [1, 2, 3]
my_list_as_string = str(my_list)
# "[1, 2, 3]"
```

# Boolean and conditional logic

## Getting user input

In Python, you can use the `input` function to get user input:

```py
name = input("Enter your name here: ")
```

## Conditionals

Here is the Python syntax for conditionals:

```py
if condition:
  do_something()
elif other_condition:
  do_something_else()
# can use multiple elif statements
else:
  do_another_thing()
```

What you can put as condition?

- `==`: truthy if `a == b`
- `!=`: truthy if `a != b`
- `>=`: truthy if `a >= b`
- `<=`: truthy if `a <= b`

### Truthiness / Falsyness

Values in python have an inherent truthiness or falseyness which is used by Python only if evaluated as a condition. For instance:

- Empty string `""` is falsey
- `None` is falsey
- `0` is falsey
- `1` is truthy

```py
animal = input("enter your favorite animal: ")
if animal:
  print("YAY!")
```

### Logical operators

- `and` also called logical conjunction: truthy if `a and b` condition is true
- `or` also called logical disjunction: truthy if `a or b` condition is true
- `not` also called logical negation: truthy if `not a` condition is true

> Equivalent of `not` in JavaScript is `!`.

### `is` vs. `==`

There is a differenc between:

```py
num = 12

num == 12
# True

num is 12
# True
```

Which becomes clear in this example:

```py
a = [1, 2, 3]
b = [1, 2, 3]
c = b

a == b
# True

a is b
# False

b is c
# True
```

Basically, `is` checks if the two compared operands refer to the same place in memory.
