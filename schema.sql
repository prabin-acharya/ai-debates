-- DROP TABLE IF EXISTS Customers;
-- CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
-- INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');


CREATE TABLE Users (
    userId VARCHAR(20) PRIMARY KEY,
    createdDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255)
);


-- npx wrangler d1 execute ai-debates-d1-prod --remote --command="SELECT * FROM Customers"
-- npx wrangler d1 execute ai-debates-d1-prod --remote --file=./schema.sql