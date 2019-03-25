const mysql = require("mysql");
const inquirer = require("inquirer");

// Create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",

    // Database you want to access
    database: "bamazon"
});

// Connect to the mysql server and sql database
connection.connect((err, res) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("\nYou are connected to the Bamazon database\n");

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        // Displaying the product info for user to pick from
        for (let i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id}\nProduct name: ${res[i].product_name}\nDepartment name: ${res[i].department_name}\nStock quantity: ${res[i].stock_quantity}\n`);
        };

        // Asking user which product they want to buy and at what quantity
        console.log("Make a purchase!");
        inquirer.prompt([
            {
                name: "itemID",
                type: "input",
                message: "Enter the ID for the item you want to buy:"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of the item do you want to buy?"
            }
        ]).then(function(res) {
            // Making the purchase request
            console.log(`\nThe ID for the item is: ${res.itemID}\nYou want to buy: ${res.quantity} unit(s)`);
            connection.end();
        });
    });
});
