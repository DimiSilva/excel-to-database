# excel-to-database

<p style="">Excel to database is a lib which transfers data from an worksheet to a database easily.</p>

## Installation

---

    npm install -g excel-to-database

---

## How to use

---

#### Example

    excelTransfer -d mongo -c mongodb://localhost/local -s C:sheet.xlsx

    -d is database, only mongo is available in the moment (default)
    -c is connection string
    -s is the path to the worksheet (supports only xlsx in the moment)

---

### The worksheet format examples

---

#### insert

![spreedsheet format example 1](https://i.ibb.co/QKzLXL7/transfer-to-database-example-1.png)

#### update

![spreedsheet format example 2](https://i.ibb.co/GkPjR0D/transfer-to-database-example-2.png)

---

## Versions

> 1.0.0
>
> > -   Base
>
> 1.0.1
>
> > -   Removed mongo warning
> > -   Readme updated
>
> 1.0.2
>
> > -   Fixed spelling errors
> > -   Fixed connection string to lower case
> > -   Mongo as default database
