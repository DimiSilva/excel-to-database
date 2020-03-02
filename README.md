# excel-to-database

<p style="">Excel to database is a lib which transfers data from an worksheet to a database easily.</p>

## Installation

---

    npm install -g excel-to-database or yarn global add excel-to-database

---

## How to use

---

#### Example

    excelTransfer -d mongo -c mongodb://localhost/local -s C:sheet.xlsx

    -d is database, only mongo is available in the moment
    -c is connection string
    -s is the path to the worksheet (supports only xlsx in the moment)

---

### The worksheet format examples

---

![spreedsheet format example 1](https://i.ibb.co/SyWTKKy/worksheet-example-1.png) ![spreedsheet format example 2](https://i.ibb.co/mD7hbqH/worksheet-example-2.png)

---

### Obs

---

    Only tested in windows

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
