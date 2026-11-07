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
  var ages = arrayOf(24, 14, 23, 45, 19, 10, 31);
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

To get data from the user through the console, you can use Kotlin `readLine()` method. When attempting to get some data from user, you would have to handle the nullable situation, since the user may not type anything and simply press Enter.

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

You can use ranges to evaluate the for loop's condition:

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
  }
}

// 1
// ...
```

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

#### Function return types

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
class Cars constructor(name: String, model: Int) {
  init {
    println("My car is $name and its model is $model")
  }
}
```

#### Secondary constructor

Secondary constructors allow initialization of variables, and also allow you to provide some logic to the class.

```java
class Cars {
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

```java
fun main(args: Array<String>) {
  var car = Car(2021)
  car.speed = 300
}
```

### Interfaces

Interfaces are custom types provided by Kotlin. Interfaces cannot be instantiated directly. Instead, these define a form of behavior that the types have to follow. So with an interface you can define and setup properties and methods that the concrete types must follow and implement.

Interfaces are also abstract, so they have the characteristics of the abstract classes, so we don't use interfaces to create objects. The purpose of interfaces: In Kotlin a class can only inherit from one class, it cannot inherit from more than one class. So when a class needs to inherit from more than one class, we should define those classes as interfaces.

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

```java
fun main(args: Array<String>) {
  var vehicle = Vehicle()
  println("Name: ${vehicle.name}")
  vehicle.go()
  vehicle.stop()
}
```
