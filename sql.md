# Basics of SQL

## Creating a table

In order to create a table you can use this query:

```sql
CREATE TABLE cities (
    name VARCHAR(50),
    country VARCHAR(50),
    population INTEGER,
    area INTEGER
);
```

> You should be mindful of using the ',' and ';' characters in their right position.

## Inserting rows

In order to insert records (rows) into the table, you can use this query:

```sql
INSERT INTO cities (name, country, population, area)
VALUES ('Tokyo', 'Japan', 38505000, 8223);
```

To insert multiple records in one go you can use this query:

```sql
INSERT INTO cities (name, country, population, area)
VALUES
    ('Delhi', 'India', 28125000, 2240),
    ('Shanghai', 'China', 22125000, 4015),
    ('Sao Paulo', 'Brazil', 20935000, 3043);
```

## Retrieve data

Retrieving data from an SQL table can be very complicated, but let's stick to the basics now.

### With `SELECT`

You can retrieve raw data from the database, or you can make the database calculate some data before returning it to you.

#### Retrieve raw columns

To retrieve data using the `SELECT` statement you can use this query:

```sql
SELECT * FROM cities;
```

Where `*` means every column. But you can also specify which data columns your want to retrieve:

```sql
SELECT name, country FROM cities;
```

#### Retrieve calculated columns

To retrieve calculated columns based on the raw data that exists in the table, you can use this query:

```sql
SELECT name, population / area FROM cities;
```

You will see in the results that the caluclated column has a title of `?column?`. You can rename the calculated column using this query:

```sql
SELECT name, population / area AS population_density
FROM cities;
```

> You can also use other math **operators** like `+`, `-`, `\*`, `/`, `^`, `|/` (square root), `@` (absolute value), `%` (remainder).

To manipulate string columns before being returned, you can use string operators or functions. For instance:

```sql
SELECT name || ', ' || country FROM cities;
```

> Note that you can use string constants (`', '` in the example above ) when manipulating string columns using string operators.

> There are also string **operators** and **functions** that you can use to manipulate string columns. These are `||` (join two strings), `CONCAT()` (join two strings), `LOWER()` (gives a lowercase string), `LENGTH()` (gives number of characters in a string), `UPPER()` (gives an uppercase string).

To use the `CONCAT()` string function to receive the exact result of the example above, you can use this query:

```sql
SELECT CONCAT(name, ', ', country) AS location
FROM cities;
```

You can stack as many string functions as you need in your query. For instance:

```sql
SELECT
  CONCAT(UPPER(name), ', ', UPPER(country)) AS location
FROM
  cities;
```

As another example:

```sql
SELECT
  UPPER(CONCAT(name, ', ', country)) AS location
FROM
  cities;
```

### Filtering rows

#### With `WHERE`

To filter rows, you can use the `WHERE` statement after `FROM`, which is where you define which table you are retrieving data from.

```sql
SELECT name, area FROM cities WHERE area > 4000
```

You may need to understand how the three parts of this query is executed by SQL in order to fully get how it works. So it just does not start from the beginning and proceed to the end. It starts from the `FROM` statement, then goes to the `WHERE` statement, and finally to the `SELECT` statement. Understanding this will help you write more complicated queries.

> Note that the query syntax formatting of the example above can also be like this:

```sql
SELECT
  name,
  area
FROM
  cities
WHERE
  area > 4000
```

> To filter rows you can use many comparison math operators like `=`, `>`, `<`, `>=`, `<=`, `IN` (is the value present in a list?), `<>` (are the values not equal), `!=`, `BETWEEN` (is the value between two other values?), `NOT IN` (is the value not present in a list?).

Let's use the `BETWEEN` operator:

```sql
SELECT
  name,
  area
FROM
  cities
WHERE
  area BETWEEN 2000 AND 4000;
```

Let's use the `IN` and `NOT IN` operator:

```sql
SELECT
  name,
  area
FROM
  cities
WHERE
  name IN ('Delhi', 'Shanghai');
```

> Note that you are not limited to use strings with the `IN` and `NOT IN` operator.

```sql
SELECT
  name,
  area
FROM
  cities
WHERE
  area NOT IN (8223, 3043);
```

> You can use as many operators in one `WHERE` statement. This is called a _Compound check_ where you can use as many `AND` and `OR` statements. Here is an example:

```sql
SELECT
  name,
  area
FROM
  cities
WHERE
  area NOT IN (8223, 3043)
  OR name = 'Delhi'
  OR name = 'Tokyo';
```

In this query you want to find all the cities that does not have an area of `8223` or `3043`, `AND` also the city must have the name `Delhi`.

> You can perform calculations in the `WHERE` statement. You just need to keep in mind that the order of execution in the filtering statement is prioritised for mathematical calculations and then comparisons. In the example below, `population` will be divided by `aread` and then the result will be compared to `6000`.

```sql
SELECT
	name,
  population / area AS population_density
FROM
	cities
WHERE
	population / area > 6000
```

> Remember that you cannot refer to the renamed calculated columns with their provided name in the `WHERE` statement. You can only refer to them by doing the calculation again in the `WHERE` statement.

## Update rows

To update a row in a table, you should use the `UPDATE` statement with the table name, and then the `SET` statement with the updating property along with its new value. Finally you have to specify which row you want to update by filtering the rows using the `WHERE` statement. So as an example:

```sql
UPDATE
  cities
SET
  population = 39505000
WHERE
  name = 'Tokyo';
```

> Remember that if you are trying to update only one specific row, the `WHERE` statement you write should be specific enough to target only one record in the table. This can become a bit tricky sometimes. There is a nice solution for this problem. [later...]

## Delete rows

To delete a specific row from a table, you should use the `DELETE FROM` statement followed by the table name, and then the `WHERE` statement that defines the row that is going to be deleted.

```sql
DELETE FROM cities
WHERE name = 'Tokyo';
```

> Remember that if you are trying to update only one specific row, the `WHERE` statement you write should be specific enough to target only one record in the table. This can become a bit tricky sometimes. There is a nice solution for this problem. [later...]
