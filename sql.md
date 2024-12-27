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

To retrieve data using the `SELECT` command you can use this query:

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

> You can also use other math **operators** like '+', '-', '\*', '/', '^', '|/' (square root), '@' (absolute value), '%' (remainder).

To manipulate string columns before being returned, you can use string operators or functions. For instance:

```sql
SELECT name || ', ' || country FROM cities;
```

> Note that you can use string constants (`', '` in the example above ) when manipulating string columns using string operators.

> There are also string **operators** and **functions** that you can use to manipulate string columns. These are '||' (join two strings), 'CONCAT()' (join two strings), 'LOWER()' (gives a lowercase string), 'LENGTH()' (gives number of characters in a string), 'UPPER()' (gives an uppercase string).

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
