# Kotlin fundamentals

When creating a new project in Android Studio, your package name will be something like `com.example.firstKotlinProgram`. This would be also be the name of the folder in which you will place your source code files. By default, Android Studio will create a `MainActivity` file in that folder. When you want to create a new file in your source code, you will have to choose **Kotlin Class/File** item from the "New" menu on right click.

By convension, you name your files like `HelloWorld.kt` or `Hello_World.kt`.

> In order to perform an operation in Java programming language, normally you would need at least one class and one `main` function in the class. But you don't need a class in Kotlin. Instead, you need a `main` function in each file in order to run a program.

## Kotlin-specific things

### Printing to console

```java
// HelloWorld.kt
fun main(args: Array<String>) {
  print("Hello world!") // after printing the expression, stays at the same line
  println("Goodbye!") // after printing the expression, moves to the next line
}
```

You can now run this file, and `main` will be executed without having to call it explicitly.

### Generating random numbers

To generate a random number in Kotlin, you can use Kotlin's **Random** package:

```java
fun main(args: Array<String>) {
  val number = Random.nextInt(0, 100)
}
```

## Variables

By convension, you name your variables like you do it in JavaScript, so follow camelCase formatting. Variables in Kotlin can be either **mutable** or **immutable**.

Here is how you declare and initialize a variable in Kotlin:

```java
var speed = 100 // mutable - can be assigned multiple times
val speed = 100 // immutable
```

## Data types

Here is a list of data types in Kotlin:

- Boolean: `Boolean`
- Character: `Char`
- Numbers:
  - Integer: `Byte`, `Short`, `Int`, `Long`
  - Floating point: `Float`, `Double`
- String: `String`
- Array: `Array`
- List: `List`

Let's go over some details on each data type:

### Data type technical details

#### `Byte`

Default size: 1 byte (8 bit)
Range: [-128, 127]
Default value: 0

Useful for saving memory in large arrays.

#### `Short`

Default size: 2 bytes (16 bit)
Range: [-32.768, 32.767]
Default value: 0

Useful for saving memory

#### `Int`

Default size: 4 bytes (32 bit)
Range: [-2^31, 2^31-1]
Default value: 0

#### `Long`

Default size: 8 bytes (64 bit)
Range: [-2^63, 2^63-1]
Default value: 0L

#### `Float`

Default size: 4 bytes (32 bit)
Range: 32-bit floating point single-precision
Default value: 0.0f

Useful for saving memory when working with large arrays of floating point numbers

#### `Double`

Default size: 8 bytes (64 bit)
Range: 64-bit floating point double-precision
Default value: 0.0d

For decimal values, this is the default choice.

#### `Boolean`

Default size: 1 bit
Range: true or false
Default value: false

#### `Char`

Default size: 2 Bytes (16 bit)
Range: ['\u0000', '\uffff'] or [0, 65535]
Default value: '\u0000' (means 0 in ASCII)

### Declaration and initialization of variables

For now, everything seems very similar to TypeScript.

```java
var a : Boolean = true
var b : Char = "R"
var c : Byte = 12
var d : Short = -356
var e : Int = 43543
var f : Long = -432543234L // Notice L at the end
var g : Float = 5.68764324F // Notice F at the end
var h : Double = 7.34534276464 // Notice there is no D at the end - Double is default
```

### Type Conversions

You can convert data types in Kotlin using several methods:

- `toByte()`
- `toShort()`
- `toInt()`
- `toLong()`
- `toFloat()`
- `toDouble()`

> Converting a small value to a large one makes no trouble. But doing so the other way round, you will lose data.

```java
fun main(args: Array<String>) {
  var x : Byte = 127
  var y : Int = x.toInt()
  var z : Double = x.toDouble()

  println(x) // 127
  println(y) // 127
  println(z) // 127.0

  var a : Double = 132.32
  var b : Int = a.toInt()
  var c : Byte = b.toByte()

  println(a) // 132.32
  println(b) // 132
  println(c) // -124
}
```

### Details of `String` data type

Use `Char` data type when you only need to store one chatacter. Use `String` when you really need a string of characters. Strings are treated in kotlin in a very similar way to how JavaScript treats them.

#### Methods on `String`

There are several useful methods available on `String` data type:

- `length()`: returns the length of the string.
- `equals(Object another)`: compares the string with the specified string and if both matches, returns true, else false.
- `isEmpty()`: returns true if the given string has 0 length. If the length of string is non-zero, then returns false.
- `plus("...")`: concatenates the string "..." and other string.
- `lowercase()`: returns a string in lowercase.
- `uppercase()`: returns a string in uppercase.
- `trim()`: removes spaces at the beginning and end of the string.

```java
fun main(args: Array<String>) {
  var a : String = "Hello Kotlin"
  var b : String = "Language"
  var age : Int = 25

  println(a + b) // Hello KotlinLanguage
  println(a + " " + b) // Hello Kotlin Language
  println("Your age is = " + age) // age is converted from int to string

  var x : String = "Kotlin"

  var i : Int = x.length()
  println("Length of Kotlin = " + i) // Length of Kotlin = 6

  var b : Boolean = x.equals("Java")
  println(b) // false

  println(x.isEmpty()) // false
  println(x.plus(" language")) // Kotlin language

  println(x.lowercase())
  println(x.uppercase())

  var t : String = "   Android   "
  println(x + t) // Kotlin   Android
  println(s + t.trim()) // KotlinAndroid
}
```

### Details of `Array` data type

Arrays are objects that hold multiple data of different types together. Notice that `Array` is an immutable data type.

```java
fun main(args: Array<String>) {
  var ages = arrayOf(24, 14, 23, 45, 19, 10, 31); // immutable array
  println("First element of array: " + age[0]) // the first element of array lives at index 0
  println("Second element of array: " + age.get(1))

  var cars = arrayOf("Mercedes", "Audi", "BMW", "Opel")
  cars.set(3, "Ford") // mutates the original array - first param: index, second param: value
  println("Last element of array: " + age[3]) // Ford

  println("Size of cars array = " + cars.size) // 4

  cars.set(4, "Renault") // ArrayIndexOutOfBoundsException (immutable) - use ArrayList
}
```

#### `ArrayList`

When you need to add elements to an array, you should use the `ArrayList` instead of `Array`.

```java
fun main(args: Array<String>) {
  var age = arrayListOf<Int>(5, 10, 15) // can specify elements here or later
  age.add(3, 20) // first param: index, second param: value
  age.removeAt(1) // param: index


  var age2 = ArrayList<Int>() // can only add elements later
  age2.add(10) // when passed single param, 10 is considered as value, not index, and added to the end of array
  age2.add(1, 15)
  age2.add(20)

  println("First element of ArrayList = " + age2[0]) // 10
  println("Second element of ArrayList = " + age2.get(1)) // 15
  println("Third element of ArrayList = ${age2[2]}") // 20

  age2.remove(15) // param: value

  println(age.size) // 2
  println("First element of ArrayList = " + age2[0]) // 10
  println("Second element of ArrayList = " + age2.get(1)) // 20
}
```

To declare and initialize an array of mixed types you use `Any` type:

```java
fun main(args: Array<String>) {
  var myMixArrayList = ArrayList<Any>()
  myMixArrayList.add("Ford")
  myMixArrayList.add(5)
  myMixArrayList.add(2.5)
  myMixArrayList.add(false)
  myMixArrayList.add("K")
}
```

### Details of `List`

You can create a list of type `List` using:

```java
// Immutable list
val shoppingList = listOf("Processor", "RAM", "Graphics card", "SSD") // List<String>
shoppingList.contains("Processor") // returns boolean

// Mutable list
var mutableShoppingList = mutableListOf("Processor", "RAM", "Graphics card", "SSD")
mutableShoppingList.add(4, "Cooling system") // first param: index, second param: value
mutableShoppingList.add("RGB lights")
mutableShoppingList.removeAt(0) // param: index
mutableShoppingList.remove("RAM") // param: value

mutableShoppingList[3] = 'Some other tooling' // modifying element at index 3
mutableShoppingList.set(0, 'Pre-processor') // modifying element at index 0
```

### Details of `Set`

Set is a special type of array (actually derived from `Collection`) where you can only have unique values. Notice that Sets are immutable collections. If you want to mutate the set later, use `mutableSetOf`.

```java
fun main(args: Array<String>) {
  var mySetArray2 = setOf<Any>("Kotlin", 2, 2.5, "K", true, "Kotlin")
  println(mySetArray2.size) // 5
  println(mySetArray2.last()) // true - last element "Kotlin" is ignored (not unique)
}
```

### Details of `Map`

Map is a special type of array (actually derived from `Collection`) where you can store key/value pairs. Notice that maps are immutable collections. If you want to mutate the map later, use `mutableMapOf`.

```java
fun main(args: Array<String>) {
  // immutable
  var age = mapOf<String, Int>("david" to 20, "ronaldo" to 25)
  println("Age of David: " + age["david"]) // 20
  println("Age of Ronaldo: " + age["ronaldo"]) // 25

  // mutable
  var mutableAge = mutableMapOf<String, Int>("david" to 20, "ronaldo" to 25)
  mutableAge.put("buffon", 30)

  println("Age of Buffon: ", mutableAge["buffon"]) // 30
  println("Age of David: ", mutableAge.get("david")) // 20
}
```

## Operators

### Arithmetic operators

Arithmetic operators used in Kotlin are exactly the same as in JavaScript. Type coercions that happen when using arithmetic operators in JavaScript, behave the same way in Kotlin also.

### Assignment operator

Similar to JavaScript we have:

- `=`
- `+=`
- `-=`
- `*=`
- `/=`
- `%=`

### Unary operators

This type of operators require only one operrand.

- `+`: used when converting a numeric negative value to a positive one
- `-`: used when converting a numeric value to a negative one
- `++`: increments a numeric value by one
- `--`: decrements a numeric value by one
- `!`: used to toggle a boolean value

```java
fun main(args: Array<String>) {
  var number : Double = 7.6
  var isCheck : Boolean = true

  println(+number) // 7.6
  println(-number) // -7.6
  println(++number) // 8.6
  println(--number) // 7.6
  println(!isCheck) // false

  var result: Double = 4.7

  println(result++) // 4.7 - incremented after `result` is evaluated
  println(result) // 5.7 - result of increment in the previous line
  println(++result) // 6.7
  println(result) // 6.7
}
```

### Equality and relational operators

These are used to determine if two values are greater than, less than, equal to, or not equal to each other.

- `==`
- `!=`
- `>`
- `>=`
- `<`
- `<=`

### Conditional operators

These are used to check multiple conditions together

- `&&`: And - checks the second condition only if the first one is true, returns true if both come true
- `||`: Or - checks both conditions anyway, returns true if any of them comes true

> Each condition expression can be wrapped in `()`

### Operator precedence

Here is a list of operator precedence in Kotlin, from the highest priority to the lowest:

- Unary (`++`, `--`, `+`, `-`, `!`)
- Multiplicative (`*`, `/`, `%`)
- Additive (`+`, `-`)
- Relational (`<`, `<=`, `>=`, `>`)
- Equality (`==`, `!=`)
- Conditional AND (`&&`)
- Conditional OR (`||`)
- Assignment (`=`, `+=`, `-=`, `*=`, `/=`, `%=`)

> You can alter this precedence anywhere by wrapping in `()` the expression that you want to be evaluated with a higher priority.

### Special operators (`rangeTo`, `in`)

Here is how you can use `rangeTo` operator:

```java
var myCharRange = 'a'.rangeTo('z')
var myCharRange = 'a'..'z'
```

Then to use `in` operator you can:

```java
var myChar = 'k' in myCharRange // true
```

Another example:

```java
fun main(args: Array<String>) {
  var myCharRange = 'a'.rangeTo('j') // single quotes can be used for single characters
  var myChar = 'k' in myCharRange
  println(myChar) // false
}
```

## Console input

To get data from the user through the console, you can use Kotlin `readLine()` or `readln()` method. When attempting to get some data from user, you would have to handle the nullable situation, since the user may not type anything and simply press Enter.

```java
var name : String? = readLine() // means we are not sure the user will input any data
var name : String = readLine()!! // means we are sure the user will input some data
```

> The data received from the user through the console is of type `String` by default.

```java
fun main(args: Array<String>) {
  print("What is your name? ") // cursor will wait at the end of this line

  var name : String? = readLine()

  print("How old are you? ")

  var age : Int = readLine()!!.toInt()

  println("Your name is $name, and you are $age years old.")
}
```

## Control flow statements

Control flow statements in Kotlin are:

- Decision making statements:
  - If: Runs some code based on a given condition
  - When: Similar to JavaScript's `switch` and `default` statement
- Looping statements
  - For
  - For-each
  - While
  - Do-while

### If statements

```java
// If
if(condition) {
  // code to execute if condition is true
}

// If-else
if(condition) {
  // code to execute if condition is true
} else {
  // code to exexute if condition is false
}


// If-else ladder
if(condition) {
  // code
} else if (condition) {
  // code
} else {
  // code
}

// Nested if
if(condition) {
  if(condition) {
    // code
  }

  // code
}
```

### When

```java
fun main(args: Array<String>) {
  print("Please enter a day number of the week: ")
  var dayNum : Int = readLine()!!.toInt()
  var day : String

  when(dayNum) {
    1 -> day = "Monday"
    2 -> day = "Tuesday"
    3 -> day = "Wednesday"
    4 -> day = "Thursday"
    5 -> day = "Friday"
    6 -> day = "Saturday"
    7 -> day = "Sunday"
    else -> day = "Invalid day choice" // equivalent to JavaScript's default branch
  }

  println("Day is $day")
}
```

## Loops

There are multiple loop statements in Kotlin.

### For loop

You can use ranges, lists or arrays to evaluate the for loop's iteration:

```java
for (i in 0..10) {
  // loop body
}
```

As the initial step in executing the loop, variable `i` is initialized then it is checked against the loop's condition, and so on.

```java
fun main(args: Array<String>) {
  var sum: Int = 0

  for(x in 0..5) {
    println(x)
    sum += x
  }

  println("Sum of numbers: $sum")
}

// 0
// ...
// Sum of numbers = 15
```

```java
fun main(args: Array<String>) {
  var myNumbersArray = arrayListOf<Int>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

  for(y in myNumbersArray) {
    println(y)
    if(y == 5) {
      break // breaks out of the whole loop if y == 5
    }
  }
}

// 1
// ...
```

> Notice that for loops can be used on lists (`List`) also.

You can get the indices of the iteration using `indeces` property of the array or list on which the for loop is iterating.

```java
fun main(args: Array<String>) {
  var myNumbersArray = arrayListOf<Int>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

  for(y in myNumbersArray.indices) { // every array has an `indices` property on it
    println("myNumbersArray[$y] = ${myNumbersArray[y]}")
  }
}

// myNumbersArray[0] = 1
// ...
```

### For-each loop

In for-each loops, Kotlin automatically defines a `it` variable which represents each element of the array on which the `forEach` method is used.

```java
fun main(args: Array<String>) {
  var myNumbersArray = arrayListOf<Int>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

  myNumbersArray.forEach {
    println(it)
  }
}
```

### While loop

In a while loop, the controlling variable (or condition) is defined before the loop definition itself. You must also update the variable in each iteration of the loop if you are not going for an infinite loop.

```java
fun main(args: Array<String>) {
  var i = 5

  while(i > 0) {
    println(i)
    i--
  }
}
```

You can implement while loops that continues for ever before meeting a given condition and hitting a `break` statement:

```java
fun main(args: Array<String>) {
  val number = Random.nextInt(0, 100)
  println("Please guess the number: ")

  while(true) {
    val userGuess : Int = readLine()!!.toInt()
    if(userGuess == number) {
      println("You gussed it!")
      break
    } else if(userGuess < number) {
      println("Go up")
    } else {
      println("Go down")
    }
  }
}
```

### Do-while loop

It is similar to while loop, with the difference that it executes the loop body first, then checks for the loop's condition. So the loop body executes at least once with this type of loop.

```java
fun main(args: Array<String>) {
  var number = 1

  do {
    println("$number ")
    number++
  } while(number < 15)
}
```

## Functions

Very similar to JavaScript, in Kotlin functions are defined with parameter types and return type. The function can use `return` statement to return a value.

```java
fun addNumber(x: Int, y: Int): Int {
  var sum = 0;
  sum = x + y;
  return sum;
}

var result = 0;
result = addNumber(2, 3)
println(result) // 5
```

### Types of functions

In Kotlin, there are 2 different types of functions:

1. Standard library functions: pre-defined library of classes and functions
2. User-defined functions

### Function return types

- Unit (void): returns nothing
- Primitive: returns `char`, `byte`, `short`, ...
- Non-primitive: returns reference data types, such as object of Class, `String`, etc.

```java
fun main(args: Array<String>) {
  print("Enter enter the first number: ")
  var num1 = Int = readLine()!!.toInt()

  print("Enter enter the second number: ")
  var num2 = Int = readLine()!!.toInt()

  show(num1, num2)

  var a = add(num1, num2)
  println("Sum of the numbers = $a")

  var min = findMinimumNumber(num1, num2)
  println("Minimum: $min")
}

fun show(num1: Int, num2: Int): Unit { // you can simply omit Unit
  println("You entered $num1 and $num2")
}

fun add(num: Int, num2: Int): Int {
  var sum: Int = 0
  sum = num1 + num2
  return sum // satisfies function's return type
}

fun findMinimumNumber(num: Int, num2: Int): Int {
  var minimum: Int

  if(num1 > num2) {
    minimum = num2
  } else {
    minimum = num1
  }

  return minimum
}
```

### Lambda function

Lambda expressions use `() -> {}` syntax. Take a loot at this example:

```java
val doubleNumber: (Int) -> Int = { it * 2 }
```

So this lambda expression should receive an integer as input, and it returns an integer as output. Notice the type definition of the lambda:

```java
(Int) -> Int
```

After the type definition, there is a `=` assignment operator and then there is the body of the lambda, where `it` refers to the input value of type `Int`. The body is the part that performs the actual calculation that results in the intended output.

```java
{ it * 2 }
```

Now the `doubleNumber` variable holds the lambda function and you can call it:

```java
doubleNumber(2) // returns 4
```

Lambda functions are used in many places in Kotlin:

#### `map`

Similar to JavaScript `map` method available on arrays, you can use the same method on lists in Kotlin, with the difference that you should pass a lambda function to them. So the lambda function is responsible for the calculation process being done in each iteration:

```java
var numbers = listOf(1, 2 ,3)
var doubled = numbers.map{ it * 2 } // [2, 4, 6]
```

#### `copy`

The `copy` function makes a copy of an object with altered properties received as parameters of the `copy` function.

```java
data class Vase(val color: String, val design: String)

val blueRoseVase = Vase(color = "Blue", design = "Rose")
val redRoseVase = blueRoseVase.copy(color = "Red")
```

#### `let` and nullable

The `let` function allows you to apply some transformation on some nullable value without affecting the original variable that holds the nullable value.

```java
val name: String? = "Ella"
var upperName = name?.let{ it.toUpperCase() }
```

### `try`, `catch` and `finally`

In order handle errors in Kotlin, you can use the `try`, `catch` and `finally` blocks, similar to JavaScript. Take this crashing code as example:

```java
fun main() {
  println("Please enter a number: ")
  val number = readln().toInt()
    // crashes here if user types something that cannot be converted to int
  println("User entered $number")
}
```

To prevent your app from crashing, you must catch the exception and handle the error with proper error display.

```java
fun main() {
  try {
    // Error-prone code
    println("Please enter a number: ")
    val number = readln().toInt()
    println("User entered $number")
  } catch (error: Exception) {
    // What should happen when error occurs
    println(error.message)
  } finally {
    // Code that will run regardless; error or no error
    println("This will be executed anyway.")
  }
}
```

## Kotlin OOP

### Access modifiers

Access modifiers are statements used before class property/method declarations that define how the property/method can be accessed.

- `private`: Most restricted access type; only accessible (visible) inside the class.
- `protected`: Similar to `private`, but is visible to sub-classes.
- `internal`: Visible to any client inside the current module, meaning that any client, within the same module, who can see the declared class, can also see its internal members. A module is a set of Kotlin files compiled together.
- `public`: Visible to any client that can see the declared class. This is the least restricted access level. `public` is the default access modifier, meaning that if you don't mention any modifier, Kotlin will consider the property/method to be public.

### Naming conventions

- Class name: Should start with uppercase letter and be a noun
- Function name: should start with lowercase letter, and follow camelCase formatting and be a verb.
- Variable name: should start with lowercase letter, and follow camelCase formatting

### Constructor

Constructor refers to the first function to be called when creating an object from any class. At least one constructor is required for each class. If you don't create any constructors, the compiler will create a default empty constructor.

There are 2 different typs of constructors in Kotlin:

- Primary constructor: A class in Kotlin can have 1 primary, or 1 or more secondary constructors.
- Secondary constructor: Similar to Java.

#### Primary constructor

The primary constructor cannot contain any code. Initialization code can be places in `init` blocks.

```java
class Car(name: String, model: Int) {
  init {
    println("My car is $name and its model is $model")
  }
}
```

Notice that `name` and `model` are now parameters to the constructor function. So `name` and `model` are not going to be a property of the object created from this class. If you want the `name` and `model` to be a property of the objects created from this class, you should mark them with `val`.

```java
class Dog(val name: String, val breed: Int, var age: Int = 0) {
  init {
    // code
  }
}
```

Now `name` and `model` will be a property of an object that would be instantiated from `Car` class. Also notice that properties declared with `var` can be overriden later after the object creation.

#### Secondary constructor

Secondary constructors allow initialization of variables, and also allow you to provide some logic to the class.

```java
class Car {
  var name: String? = null
  var model: Int? = null

  constructor() // empty constructor

  constructor(name: String, model: Int) { // full constructor
    this.name = name
    this.model = model
  }
}
```

### Doing OOP in Kotlin

To declare a class in a Kotlin program, you should open a Kotlin Class file and name it after the class name, for example, `Car`:

```java
// Car.kt
class Car {
  var name: String? = null
  var mode: Int? = null
}
```

Then in a `.kt` Kotlin file:

```java
// ObjectClassConstructor.kt
fun main() {
  var myCar = Car()
  myCar.name = "Ferrari"
  myCar.model = 2006

  println("My car's name is ${myCar.name} and its model is ${myCar.model}")
}
```

Notice that the `Car` class does not have a constructor. That is why we had to first create an object from the class, and then define the values for `name` and `model`. To be able to define those values right at the moment when the object is being created, you need to add a constructor to the class.

Let's first go with the **primary constructor**:

```java
// Car.kt
class Car constructor(var name: String, var model: Int) {
  init {
    println("My car's name is $name and its model is $model")
  }
}
```

Now when creating an object from this class, your IDE will require you to input values for the parameters:

```java
// ObjectClassConstructor.kt
var myNewCar = Car("Ferrari", 2021)
// console: My car's name is Ferrari and its model is 2021
```

Now let's try **secondary constructor**:

```java
// Plane.kt
class Plane {
  var name: Stirng? = null
  var model: Int? = null

  constructor(name: String, model: Int) {
    this.name = name
    this.model = model
  }
}
```

```java
var myPlane = Plane("Boeing", 2024)
```

> Notice that you can reassign the values assigned to the object after you created the object. This is done because Kotlin automatically created `set` and `get` methods on the objects you create. To alter this behavior, you need to declare these methods manually.

### Encapsulation

Encapsulation referes to the use of `set` and `get` methods in a class definition.

```java
// Plane.kt
class Plane {
  var name: Stirng? = null
  var model: Int? = null
    private set // preventing others from changing the model value
            get // allowing other to read the model value

  constructor(name: String, model: Int) {
    this.name = name
    this.model = model
  }
}
```

### Inheritance

Inheritance is used when `is a` relation exists between two or more classes. For instance, a `Car` **is a** `Vehicle`, and a `Motorcycle` **is a** `Vehicle`. So a `Car` can have the same behavior as `Vehicle`. In this case, `Vehicle` is a super class (parent), and `Car` and `Motorcycle` are sub-classes (child).

> `Car` and `Motorcycle` can also have some additional behavior

Kotlin classes are `final` by default. The `final` modifier marks methods and classes as not allowed to be overriden. Therefore, in order for a sub-class to inherit from a super class, the `open` statement must be written before the `Class` statement.

```java
// Vehicle.kt
open class Vehicle {
  var type: String? = null
  var model: Int? = null
  var maxSpeed: Int? = null

  fun show() {
    println("Type: $type")
    println("Model: $model")
    println("Max speed: $maxSpeed")
  }
}
```

```java
// Car.kt
class Car: Vehicle() {

}
```

```java
// Motorcycle.kt
class Motorcycle: Vehicle() {

}
```

```java
// InheritanceTest.kt
fun main(args: Array<String>) {
  // Create a car object
  var car = Car()
  car.type = "Car"
  car.model = "Ferrari"
  car.maxSpeed = 320
  car.show()
  // While `Car` class is empty, it inherits properties and methods from `Vehicle` class

  // Create a motorcycle object
  var motor = Motorcycle()
  motor.type = "Motorcycle"
  motor.model = "Yamaha"
  motor.maxSpeed = 180
  motor.show()
  // While `Motorcycle` class is empty, it inherits properties and methods from `Vehicle` class
}
```

### Function overriding

If you define a function in a sub-class with the same name, parameters and return type as a function defined in a super class, you are doing function overriding.

```java
open class Vehicle {
  open fun stop() { // Methods are `final` by defualt. They should be marked with `open` if they are going to be overriden
    println("Vehicle has stopped")
  }
}

class Car: Vehicle() {
  override fun stop() { // Methods that are overriding a method in a super class, must be marked with `override`
    println("Car has stopped")
  }
}
```

#### Using the `super` keyword

When defining a sub-class, you may need to call methods from the super class. To do this, you can use the `super` keyword with a dot `.` notation.

```java
class Car: Vehicle() {
  fun alteredStop() {
    super.stop()
  }
}
```

### Abstract classes

Abstract classes are a special type of a classes from which you cannot create an instance (object). These classes would act as a schema or blueprint for creating some concrete classes from them, and then instances would be created from those concrete classes.

```java
abstract class Vehicle {
  // Abstract function - no body code
  abstract fun vehicleName(name: String): String

  // Non-abstract function
  fun vehicleType(type: String): String {
    return type // contains body code
  }

  // Abstract property
  abstract var model: Int // not initialized

  // Non-abstract property
  var speed: Int? = null // initialized to null
}
```

```java
class Car(override var model: Int): Vehicle() {
  override fun vehicleName(name: String): String {
    return name
  }
}
```

> Notice that to override a method inherited from an `abstract` class, you should mark the method itself with `abstract` keyword. Compare it with when you want to override a method inherited from a normal class where you have to mark it with `open` if you want to override it in a sub-class.

```java
fun main(args: Array<String>) {
  var car = Car(2021)
  car.speed = 300
}
```

### Interfaces

Interfaces are custom types provided by Kotlin. Interfaces cannot be instantiated directly. So with an interface you can define and setup properties and methods that the concrete classes must follow and implement.

Interfaces are also abstract, so they have the characteristics of the abstract classes, so we don't use interfaces to create objects. The purpose of interfaces: In Kotlin a class can only inherit from one superior class, it cannot inherit from more than one superior class. So when a class needs to inherit from more than one paths, we should define those classes as interfaces.

> Notice that a class can inherit from one superior class and multiple interfaces at the same time.

```java
interface CanGo {
  fun go() {
    println("vehicle can go") // you can provide a body to the function or ignore it completely
  }

  val name: String // variables in interfaces cannot be initialized, and also cannot be declared as var since they cannot be defined after they are instantiated
}

interface CanStop {
  fun stop()
}
```

```java
class Vehicle: CanGo, CanStop {
  override val name: String
    get() = "Ferrari"

    override fun stop() {
      println("Vehicle can stop")
    }
}
```

> Notice that in order to override a method that is inherited from an `interface`, you don't need to mark the method with `open` or `abstract`.

```java
fun main(args: Array<String>) {
  var vehicle = Vehicle()
  println("Name: ${vehicle.name}")
  vehicle.go()
  vehicle.stop()
}
```

### Data classes

Data classes in Kotlin are classes whose main purpose is to hold data. Data classes come automatically with additional member functions that allow you to print an instance to readable output, compare instances, copy instances, and more.

```java
data class User(val name: String, val age: Int)
```

> Notice that if the data class should include a property whose value would change during the app's activity, you should mark it as `var`, not `val`.

Here is a list of methods available by default on data classes:

- `equals()`
- `.hashCode()`
- `.toString()`
- `.componentN()`
- `.copy()`

## Asynchronous operations

Similar to JavaScript asynchronous operations, there is a feature in Kotlin which allows you to do the same thing for, for instance, fetching data, long-running tasks, etc.

### Fetching data

In order to implement data fetching from a remote API, you conventionally create a service called `ApiService.kt` file where you define an interface that describes the behavior of the API service:

```java
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;

// Initializing Retrofit
private val retrofit = Retrofit
    .Builder()
    .baseUrl("https://www.themealdb.com/api/json/v1/") // normally comes from env
    .addConverterFactory(GsonConverterFactory.create())
    .build()

// Defining the API service interface
interface ApiService {
    @GET("categories.php")
    suspend fun getCategories(): CategoriesResponse
}

// Creating the actual service based on the defined interface
val recipeService = retrofit.create(ApiService::class.java)
```

> Notice the top-level `private` variable declaration for `retrofit`. So this variable will not be accessible from outside this file.

The `suspend` keyword before the function declaration allows the function to run asynchronously without blocking the main thread of the application. It is a part of the **Coroutine API** that provides a structured way to manage concurrency. Coroutines is a powerful and lightweight concurrency framework in Kotlin, specifically designed for handling asynchronous operations.

The next step is to use this API service in a view model:

```java
data class RecipeState(
  val loading: Boolean = true,
  val list: List<Category> = emptyList(),
  val error: String? = null
)

class MainViewModel: ViewModel() {
  private val _categoriesState = mutableStateOf(RecipeState())
  val categoriesState: State<RecipeState> = _categoriesState

  init {
    fetchCategories()
  }

  private fun fetchCategories() {
    viewModelScope.launch {
      try {
        val response = recipeService.getCategories()
        _categoriesState.value = _categoriesState.value.copy(
          list = response.categories,
          loading = false,
          error = null
        )
      } catch(err: Exception) {
        _categoriesState.value = _categoriesState.value.copy(
          loading = false,
          error = "Error fetching categories ${err.message}"
        )
      }
    }
  }
}
```

This view model is then going to be used in a **View** where the output is displayed as UI to the user:

```java
@Composable
fun RecipeScreen(modifier: Modifier = Modifier) {
    val recipeViewModel: MainViewModel = viewModel()
    val viewState by recipeViewModel.categoriesState

    Box(modifier = Modifier.fillMaxSize()) {
        when {
            viewState.loading -> {
                CircularProgressIndicator(modifier.align(Alignment.Center))
            }

            viewState.error != null -> {
                Text("Error occurred!")
            }

            else -> {
                CategoryScreen(viewState.list)
            }
        }
    }
}

@Composable
fun CategoryScreen(categories: List<Category>) {
    LazyVerticalGrid(GridCells.Fixed(2), modifier = Modifier.fillMaxSize()) {
        items(categories) {
            category -> CategoryItem(category = category)
        }
    }
}

@Composable
fun CategoryItem(category: Category) {
    Column(
        modifier = Modifier.padding(8.dp).fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painter = rememberAsyncImagePainter(category.strCategoryThumb),
            contentDescription = null,
            modifier = Modifier.fillMaxSize().aspectRatio(1f)
        )

        Text(
            text = category.strCategory,
            color = Color.Black,
            style = TextStyle(fontWeight = FontWeight.Bold),
            modifier = Modifier.padding(top = 4.dp)
        )
    }
}
```

Right now if you try to run this application, it will stop right away. That is because you have not added the internet access permission to the app. This should be done in the `AndroidManifest.xml` file of the project:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- This signifies the internet access permission for the app -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MyRecipeApp">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="@string/app_name"
            android:theme="@style/Theme.MyRecipeApp"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

Now your app has access to internet and can actually fetch data.

# Jetpack compose

## State management

Generally, when you want to work with state and manage it in your UI, you need to work with 2 keywords and 1 function:

- `val`
- `remember`
- `mutableStateOf()`

```java
@Composable
fun CaptainGame() {
  val treasuresFound = remember { mutableStateOf(0) }

  Column {
    Text("Treasures found: ${treasuresFound.value}")

    Button(onClick = {
      treasuresFound.value += 1
    }) {
      // YOU CAN PUT KOTLIN CODE HERE ALSO (IN A COMPOSABLE BODY)
      Text("Collect treasure")
    }
  }
}
```

The value of `treasuresFound` itself is actually the remembered state and that does not change. What changes is the `value` of the remembered state (notice how we access `.value`). That is why we can use `val` to declare a remembered state variable.

There is another way of declaring a remembered state variable using `by` and `var` keywords. This way the state variable will hold the value itself, so you no longer need to access `.value` on it, and therefore you cannot use `val` on it anymore. You should use `var` instead.

```java
import State.getValue;

@Composable
fun CaptainGame() {
  var treasuresFound by remember { mutableStateOf(0) }

  Column {
    Text("Treasures found: ${treasuresFound}")

    Button(onClick = {
      treasuresFound += 1
    }) {
      Text("Collect treasure")
    }
  }
}
```

### Conditional composable rendering

You can render a composable based on a condition using this simple syntax:

```java
fun ShoppingList() {
  var showDialog by remember { mutableStateOf(false) }

  if(showDialog) {
    AlertDialog(onDismissRequest = { showDialog = false }) {
      // content here
    }
  }
}
```

## Lazy column

When you want to render a list of items in the screen, you would want to use Jetpack compose's `LazyColumn`. The lazy column composable renders only items that are within the viewport of the application. So items that are yet to come into the screen or items scrolled out of the screen will simply be ignored.

Notice that the each item in the lazy column content should be defined as a data class.

```java
var sItems by remember { mutableStateOf(listOf<ShoppingItem>()) }

LazyColumn(
  modifier = Modifier.fillMaxSize().padding(16.dp)
) {
  items(sItems) {

  }
}

data class ShoppingItem (val id: Int, var name: String, var quantity: Int, var isEditing: Boolean = false)
```

## Lazy vertical grid

Jetpack Compose's `LazyVerticalGrid` basically allows you to render a list of items in a grid. You can determin the number of columns for the grid:

```java
import androidx.compose.foundation.lazy.grid.GridCells;
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid;
import androidx.compose.foundation.lazy.grid.items;

@Composable
fun CategoryScreen(categories: List<Category>) {
    LazyVerticalGrid(GridCells.Fixed(2), modifier = Modifier.fillMaxSize()) {
        items(categories) {
            category -> CategoryItem(category = category)
        }
    }
}
```

## The `Modifier`

The `Modifier` object allows you to control a composable element's styling attributes with more detailed properties.

### `padding`

You can add padding to all or any direction of a composable element:

```java
@Composable
fun CategoryItem(category: Category) {
    Column(
        modifier = Modifier.padding(8.dp).fillMaxSize(), // 8dp applies to all directions of the column
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painter = rememberAsyncImagePainter(category.strCategoryThumb),
            contentDescription = null,
            modifier = Modifier.fillMaxSize().aspectRatio(1f)
        )

        Text(
            text = category.strCategory,
            color = Color.Black,
            style = TextStyle(fontWeight = FontWeight.Bold),
            modifier = Modifier.padding(top = 4.dp) // 4dp applies only to top of the text
        )
    }
}
```

### `horizontalAlignment`

### `verticalArrangement`

### `height`

### `verticalScroll`

This is used to implement vertical scrolling on a given composable. The `verticalScroll` method should receive the `rememberScrollState()` function call as argument.

```java
Text(
      text = category.strCategoryDescription,
      textAlign = TextAlign.Justify,
      modifier = Modifier.verticalScroll(rememberScrollState())
    )
```

## MVVM

To describe the MVVM architecture, let's go over an example. Imagine you want to build a simple counter application where you can increment/decrement a count number by pressing the corresponding buttons. Now to implement this simple app using MVVM architecture you should first build a `ViewModel`:

```java
import androidx.lifecycle.ViewModel;

class CounterViewModel : ViewModel() {
  // Making the actual state value inaccessible to outside
  private val _count = mutableIntStateOf(0)

  // Exposing the value of the state as an immutable value
  val count: MutableState<Int> = _count

  fun increment() {
    _count.intValue++
  }

  fun decrement() {
    _count.intValue--
  }
}
```

Now any `@Composable` function can accept a `viewModel` parameter and you can pass the view model created above to it. Where you display the output to the user in the form of UI, it is called `View`. So:

```java
@Composable
fun CounterApp(viewModel: CounterViewModel) {
  Column() {
    Text("Count : ${viewMode.count.value}")

    Button(onClick = { viewModel.increment() }) {
      Text("Increment")
    }

    Button(onClick = { viewModel.decrement() }) {
      Text("Decrement")
    }
  }
}
```

But, there is still one piece missing from the MVVM architecture, and that is the `Model`. So, this would complete the `MVVM` architecture. To implement a model for this simple example application, let's create a Kotlin class called `CounterModel`:

```java
data class CounterModel (
    var count: Int
)
```

So a model is actually a data class. For this example, the data class is too simple. Then, you need to setup a repository for this counter data model. A repository is a clean API for accessing the data of this model.

```java
data class CounterModel (
    var count: Int
)

class CounterRepository {
    private var counter = CounterModel(0)

    fun getCounter() = counter // short syntax for returning a value from a function (no {} body block)

    fun incrementCounter() {
        counter.count++
    }

    fun decrementCounter() {
        counter.count--
    }
}
```

Now according to this `CounterModel` and `CounterRepository` which act as the **model** together, you should apply some changes to the `ViewModel` to match it:

```java
class CounterViewModel() : ViewModel() {
    private val _repository: CounterRepository = CounterRepository()
    private val _count = mutableIntStateOf(_repository.getCounter().count)

    val count: MutableState<Int> = _count

    fun increment() {
        _repository.incrementCounter()
        _count.intValue = _repository.getCounter().count
    }

    fun decrement() {
        _repository.decrementCounter()
        _count.intValue = _repository.getCounter().count
    }
}
```

## Navigation

In order to provide the user with a multi-page application, you should be able to implement navigation in your app. Take these 2 files as the base for our navigation system:

```java
// FirstScree.kt
@Composable
fun FirstScreen() {
    val name = remember {
        mutableStateOf("")
    }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("This is the first screen", fontSize = 24.sp)
        Spacer(modifier = Modifier.height(16.dp))
        OutlinedTextField(
            value = name.value,
            onValueChange = {
                name.value = it
            }
        )
        Button(onClick = {

        }) {
            Text("Go to next screen")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun FirstPreview() {
    FirstScreen()
}
```

```java
// SecondScreen.kt
@Composable
fun SecondScreen() {
    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("This is the second screen", fontSize = 24.sp)
        Text("Welcome", fontSize = 24.sp)
        Button(onClick = {

        }) {
            Text("Go to first screen")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun SecondPreview() {
  SecondScreen()
}
```

You then need to use `NavHost` and `NavController` to implement the actual navigation. In order to be able to use these, you should first add some dependencies to your app-level `build.gradle.kts` file:

```java
dependencies {
    val nav_version = "2.7.4"
    implementation("androidx.navigation:navigation-compose:$nav_version")
}
```

Then in your `MainActivity.kt` file, create a `@Composable` for your whole app, in which you will then setup the navigation system using `rememberNavController`:

```java
// MainActivity.kt
@Composable
fun MyApp() {
    val navController = rememberNavController()
}
```

The `NavController` is the central API for the `Navigation` component. It is stateful, and keeps track of the back stack of composables that make up the screens in your app and the state of each screen.

> Back stack means that if you move from screen 1 to 2 and then to 3, going back from screen 3 will lead you to screen 2, and goind back from screen 2 will lead you to screen 1.

You now need to set up a `NavHost`. It requires a `NavController` which is already set up at this stage.

```java
// MainActivity.kt
@Composable
fun MyApp() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "firstScreen"
    ) {
        composable("firstscreen") {}
        composable("secondscreen") {}
    }
}
```

Let's now go back and define what should actually be done in the buttons of `firstScreen` and `secondScreen` composables. Basically, each composable screen that is able to initiate a navigation to another composable screen should receive a function as property (parameter) and that function should be called by the button that triggers the navigation:

```java
@Composable
fun FirstScreen(
    navigationToSecondScreen: () -> Unit
) {
    val name = remember {
        mutableStateOf("")
    }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("This is the first screen", fontSize = 24.sp)
        Spacer(modifier = Modifier.height(16.dp))
        OutlinedTextField(
            value = name.value,
            onValueChange = {
                name.value = it
            }
        )
        Button(onClick = {
            navigationToSecondScreen()
        }) {
            Text("Go to next screen")
        }
    }
}
```

A similar thing should be done for `SecondScreen` composable. Then go back to `MainActivity` where you are setting up the navigation:

```java
@Composable
fun MyApp() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "firstScreen"
    ) {
        composable("firstscreen") {
            FirstScreen {
                navController.navigate("secondscreen")
            }
        }
        composable("secondscreen") {
            SecondScreen {
                navController.navigate("firstscreen")
            }
        }
    }
}
```

Notice how the function is passed to the composables of `FirstScreen` and `SecondScreen`. This can be written as below and it would make no difference:

```java
@Composable
fun MyApp() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "firstScreen"
    ) {
        composable("firstscreen") {
            FirstScreen(
                navigationToSecondScreen = {
                    navController.navigate("secondscreen")
                }
            )
        }
        composable("secondscreen") {
            SecondScreen(
                navigateToFirstScreen = {
                    navController.navigate("firstscreen")
                }
            )
        }
    }
}
```

Also, there is this routing setup convention which helps to prevent mistakes from happening when implementing navigation. The convention basically involves implementing a `sealed class` that would hold different routes (screens) that would be available in the app, so when you need to implement some navigation, you would simply refer to the class properties instead of writing the route string. Here is the class implementation:

```java
sealed class Screen(val route: String) {
    object RecipeScreen: Screen("recipescreen")
    object DetailScreen: Screen("detailscreen")
}
```

And then when you want to implement routing and navigation in your app you can do:

```java
@Composable
fun RecipeApp(navController: NavHostController) {
    val recipeViewModel: MainViewModel = viewModel()
    val viewState by recipeViewModel.categoriesState

    NavHost(
        navController = navController,
        startDestination = Screen.RecipeScreen.route
    ) {
        composable(Screen.RecipeScreen.route) {
            Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                RecipeScreen(
                    navigateToDetail = {
                        navController.currentBackStackEntry?.savedStateHandle?.set("cat", it)
                        navController.navigate(Screen.DetailScreen.route)
                    },
                    viewState = viewState,
                    innerPadding = innerPadding
                )
            }
        }

        composable(route = Screen.DetailScreen.route) {
            Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                val category = navController
                    .previousBackStackEntry
                    ?.savedStateHandle
                    ?.get<Category>("cat") ?: Category("", "", "", "")

                CategoryDetailScreen(
                    category = category,
                    innerPadding = innerPadding
                )
            }
        }
    }
}
```

> Notice how we are using `Screen.RecipeScreen.route` instead of writing the route string.

Now use `MyApp` composable in your whole app setup and test it. You'll see that you can navigate between that two screens. But let's now go further and explore how to pass variables from one screen to another.

### Passing variables through navigation

Following the previous example, the first step to pass variables from one screen to another is to make the destination composable screen accept the variable:

```java
// SecondScreen.kt
@Composable
fun SecondScreen(
    name: String,
    navigateToFirstScreen: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("This is the second screen", fontSize = 24.sp)
        Text("Welcome $name", fontSize = 24.sp)
        Button(onClick = {
            navigateToFirstScreen()
        }) {
            Text("Go to first screen")
        }
    }
}
```

Now where you actually pass the variable, is where the navigation is being triggered, so that would be in the source composable screen:

```java
// FirstScreen.kt
@Composable
fun FirstScreen(
    navigationToSecondScreen: (String) -> Unit
) {
    val name = remember {
        mutableStateOf("")
    }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("This is the first screen", fontSize = 24.sp)
        Spacer(modifier = Modifier.height(16.dp))
        OutlinedTextField(
            value = name.value,
            onValueChange = {
                name.value = it
            }
        )
        Button(onClick = {
            navigationToSecondScreen(name.value)
        }) {
            Text("Go to next screen")
        }
    }
}
```

Notice that now the type definition for `navigationToSecondScreen` accepts a string parameter. Now another part is missing in `MainActivity`:

```java
// MainActivity.kt
@Composable
fun MyApp() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "firstScreen"
    ) {
        composable("firstscreen") {
            FirstScreen(
                navigationToSecondScreen = { name ->
                    navController.navigate("secondscreen/$name")
                }
            )
        }
        composable("secondscreen/{name}") {
            val name = it.arguments?.getString("name") ?: "No Name"

            SecondScreen(
                name = name,
                navigateToFirstScreen = {
                    navController.navigate("firstscreen")
                }
            )
        }
    }
}
```

Notice that since we are now passing the variable to `navigationToSecondScreen(name.value)` you now have access to it (`name ->`) in the function body that is being passed to the `FirstScreen` composable screen. You can use it to add a path to the second composable screen route. This additional path can then be tracked by the second composable sreen route as:

```java
val name = it.arguments?.getString("name") ?: "No Name"
```

...where `it` is of type `NavBackStackEntry`, and `name` is then passed to the `SecondScreen` composable screen.

But what if you needed to pass an entire object as a variable through navigation, and not just a single string value? You would have to use serialization.

### Serialization

Serialization allows you to pass objects as values through navigation. In order to make a specific data class serializable you need to mark it with:

```java
import kotlinx.parcelize.Parcelize;

@Parcelize
data class Category (
    val idCategory: String,
    val strCategory: String,
    val strCategoryThumb: String,
    val strCategoryDescription: String
)
```

Then when you pass it between screens while navigation, it would become properly serialized. By "pass it between screens while navigation", we specifically mean:

```java
navController.currentBackStackEntry?.savedStateHandle?.set("cat", it)
```

...where `it` is of type `Category`. This is where it gets serialized and then de-serialized to the original object so it can be used in the navigation destination.

## Location services

When you are going to build an application in which you need to acquire user's location, you need to add the corresponding premission to the application's `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<!-- This permission is used to acquire an approximation of user's location, useful for figuring out which country, state or city the user lives in. This service does not use GPS. -->

<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<!-- This permission is used to acquire precise user's location, useful for navigation services. This service consumes the phone's battery with a high rate since it activates and uses GPS on the phone. -->
```

### Asking for permission

When you want to implement location services in your app, it is useful to set up a helper class that helps you with checking if you have the corresponding permission.

```java
// LocationUtils.kt
import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import androidx.core.content.ContextCompat;

class LocationUtils(val context: Context) {
    fun hasLocationPermission(context: Context): Boolean {
        return ContextCompat.checkSelfPermission(
            context, Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
                &&
                ContextCompat.checkSelfPermission(
                    context, Manifest.permission.ACCESS_COARSE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED
    }
}
```

But what is the `Context`? Context is the context in which your application is running. Let's see how you would use this helper class while asking the user for location services permission.

```java
@Composable
fun LocationDisplay(
    locationUtils: LocationUtils,
    context: Context,
    innerPadding: PaddingValues
) {
    val requestPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions(),
        onResult = {
            permissions ->
            if(
                permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true
                &&
                permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
            ) {
                // have access to location
            } else {
                // ask for permission
                val rationaleRequired = ActivityCompat.shouldShowRequestPermissionRationale(
                    context as MainActivity,
                    Manifest.permission.ACCESS_FINE_LOCATION
                ) || ActivityCompat.shouldShowRequestPermissionRationale(
                    context,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                )

                if(rationaleRequired) {
                    Toast.makeText(
                        context,
                        "Location permission is required for this feature to work.",
                        Toast.LENGTH_LONG
                    ).show()
                } else {
                    Toast.makeText(
                        context,
                        "Location permission is required. Please enable it in your settings.",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
        }
    )

    Box(
        modifier = Modifier.padding(innerPadding)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("Location not available")

            Button(
                onClick = {
                    if(locationUtils.hasLocationPermission(context)) {
                        // update the location
                    } else {
                        // request location permission
                        requestPermissionLauncher.launch(
                            arrayOf(
                                Manifest.permission.ACCESS_FINE_LOCATION,
                                Manifest.permission.ACCESS_COARSE_LOCATION
                            )
                        )
                    }
                }
            ) {
                Text("Get location")
            }
        }

    }

}
```

You would then use this `LocationDisplay` composable in another wrapper composable which would actually be your app:

```java
@Composable
fun MyApp(
    innerPadding: PaddingValues
) {
    val context = LocalContext.current
    val locationUtils = LocationUtils(context)

    LocationDisplay(locationUtils, context, innerPadding)
}
```

Notice that the context is `LocalContext.current`.

### Getting the location

Now that you have asked for permission, you need to get the actual location data. To do this there are several things you should take care of:

1. Add another method to the `LocationUtils` class to get the actual location data; name it `requestLocationUpdates`.
2. Create a view model for the location service; name it `LocationViewModel`
3. Call the new method from `LocationUtils` to get the location data.

Let's first add the new method to the `LocationUtils` class. There are several things that should be implmeneted:

- Set up a location provider client (`getFusedLocationProviderClient()`) and store it in a private variable; name it `_fusedLocationClient`.
- Call `requestLocationUpdates()` on the `_fusedLocationClient` variable and pass it 3 parameters: location request, location callback, and the main looper.
- Define and build the location request using `Builder()` on `LocationRequest` and then calling the `build()` method on it.
- Define the location callback by creating an instance of `LocationCallback` and overriding the `onLocationResult()` method. In the function override, format the location data so it matches the format your view model needs, and then update the location in your view model.

These requirements come from several location-related imports:

```java
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.Priority;
import com.google.android.gms.maps.model.LatLng;
```

Now let's implement:

```java
class LocationUtils(val context: Context) {
    private val _fusedLocationClient: FusedLocationProviderClient =
        LocationServices.getFusedLocationProviderClient(context)

    @SuppressLint("MissingPermission")
    fun requestLocationUpdates(viewModel: LocationViewModel) {
        val locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                super.onLocationResult(locationResult)
                locationResult.lastLocation?.let {
                    val location = LocationData(latitude = it.latitude, longitude = it.longitude)
                    viewModel.updateLocation(location)
                }
            }
        }

        val locationRequest = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            1000
        ).build()

        _fusedLocationClient.requestLocationUpdates(
            locationRequest,
            locationCallback,
            Looper.getMainLooper()
        )
    }

    fun hasLocationPermission(context: Context): Boolean {
        return ContextCompat.checkSelfPermission(
            context, Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
                &&
                ContextCompat.checkSelfPermission(
                    context, Manifest.permission.ACCESS_COARSE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED
    }
}
```

Let's now create the `LocationViewModel`:

```java
class LocationViewModel: ViewModel() {
    private val _location = mutableStateOf<LocationData?>(null)
    val location : State<LocationData?> = _location

    fun updateLocation(newLocation: LocationData) {
        _location.value = newLocation
    }
}
```

Now let's update the `LocationDisplay` composable to make it work with the view model:

```java
@Composable
fun LocationDisplay(
    locationUtils: LocationUtils,
    viewModel: LocationViewModel,
    context: Context,
    innerPadding: PaddingValues
) {
    val location = viewModel.location.value

    val requestPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions(),
        onResult = {
            permissions ->
            if(
                permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true
                &&
                permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
            ) {
                // have access to location
                locationUtils.requestLocationUpdates(viewModel)
            } else {
                // ask for permission
                val rationaleRequired = ActivityCompat.shouldShowRequestPermissionRationale(
                    context as MainActivity,
                    Manifest.permission.ACCESS_FINE_LOCATION
                ) || ActivityCompat.shouldShowRequestPermissionRationale(
                    context,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                )

                if(rationaleRequired) {
                    Toast.makeText(
                        context,
                        "Location permission is required for this feature to work.",
                        Toast.LENGTH_LONG
                    ).show()
                } else {
                    Toast.makeText(
                        context,
                        "Location permission is required. Please enable it in your settings.",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
        }
    )

    Box(
        modifier = Modifier.padding(innerPadding)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            if(location != null) {
                Text("Address: ${location.latitude}, ${location.longitude}")
            } else {
                Text("Location not available")
            }


            Button(
                onClick = {
                    if(locationUtils.hasLocationPermission(context)) {
                        // update the location
                        locationUtils.requestLocationUpdates(viewModel)
                    } else {
                        // request location permission
                        requestPermissionLauncher.launch(
                            arrayOf(
                                Manifest.permission.ACCESS_FINE_LOCATION,
                                Manifest.permission.ACCESS_COARSE_LOCATION
                            )
                        )
                    }
                }
            ) {
                Text("Get location")
            }
        }

    }

}
```

And now update the `MyApp` composable to make it pass the view model to the `LocationDisplay`:

```java
@Composable
fun MyApp(
    innerPadding: PaddingValues,
    viewModel: LocationViewModel
) {
    val context = LocalContext.current
    val locationUtils = LocationUtils(context)


    LocationDisplay(locationUtils, viewModel, context, innerPadding)
}
```

And finally in the main activity:

```java
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val viewModel : LocationViewModel = viewModel()
            LocationBasicsTheme {
                Scaffold( modifier = Modifier.fillMaxSize() ) { innerPadding ->
                        MyApp(innerPadding, viewModel)
                }
            }
        }
    }
}
```

### Converting location to address

In order to convert a location (lat, lng) to a readable address you can use the `Geocoder` from `android.location.Geocoder`. Let's add another method to the `LocationUtils` class:

```java
fun reverseGeocodeLocation(location: LocationData): String {
        val geocoder = Geocoder(context, Locale.getDefault())
        val coordinate = LatLng(location.latitude, location.longitude)
        val addresses: MutableList<Address?>? =
            geocoder.getFromLocation(coordinate.latitude, coordinate.longitude, 1)
            // 3rd param is maxResults which is set to 1 here

        return if(addresses?.isNotEmpty() == true) {
            addresses[0]?.getAddressLine(0) ?: "Address not found"
        } else {
            "Address not found"
        }
    }
```

> Notice that `getFromLocation` method on `geocoder` is deprecated but it works for now. Refer to Android documents for updates.

### Displaying locations on map

In order to add a map to your application you need several dependencies to be added to your app-level `build.gradle.kts` file:

```java
dependencies {
    implementation("com.google.maps.android:maps-compose:2.15.0")
    implementation("com.google.android.gms:play-services-maps:18.1.0")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2")
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("androidx.navigation:navigation-compose:2.7.4")
}
```
