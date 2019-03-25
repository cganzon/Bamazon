DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(200) NOT NULL,
	department_name VARCHAR(200) NOT NULL,
	price INT NOT NULL DEFAULT 0,
	stock_quantity INT NOT NULL DEFAULT 0,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES	("Milk", "Food", 3, 300), 
		("Bread", "Food", 1.50, 100), 
        ("Toothpaste", "Toiletries", 2, 100), 
		("Shirts", "Clothing", 10, 200), 
        ("Cereal", "Food", 5, 250), 
        ("Television", "Electronics", 500, 50), 
		("Taki's", "Food", 2.50, 330), 
        ("Gaming Console", "Electronics", 250, 80),
        ("Deodorant", "Toiletries", 4, 150),
        ("Pants", "Clothing", 30, 220);

SELECT * FROM products;

