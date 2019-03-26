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

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // Displaying the product info for user to pick from
        for (let i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id} | Product name: ${res[i].product_name} | Department name: ${res[i].department_name} | Price: $ ${res[i].price} | Stock quantity: ${res[i].stock_quantity}\n`);
        };
        askUser();
    });
});

function askUser() {
    inquirer.prompt([
        {
            name: "purchase",
            type: "list",
            choices: ["Make a purchase", "Exit"],
            message: "What do you want to do?"
        }
    ]).then(function (answer) {
        if (answer.purchase === "Make a purchase") {
            // Asking user which product they want to buy and at what quantity
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
            ]).then(function (item) {
                // Making the purchase request
                console.log(`\nThe ID for the item is: ${item.itemID}\nYou want to buy: ${item.quantity} unit(s)`);
                connection.query("SELECT * FROM products WHERE item_id = " + item.itemID, function (err, response) {
                    if (err) throw err;
                    // console.log(response);
                    // console.log(parseInt(item.quantity));
                    // console.log(res[0].stock_quantity);

                    // If there is not enough stock, stop purchase request and ask user to make another purchase
                    if (parseInt(item.quantity) > response[0].stock_quantity) {
                        console.log("\nSorry, not enough in stock!\n");
                        askUser();
                    } else {
                        // Updating the table in mysql to reflect new stock quantity after purchase
                        connection.query(`UPDATE products SET stock_quantity = ${response[0].stock_quantity - parseInt(item.quantity)} WHERE item_id = ${item.itemID}`, function (err, res) {
                            if (err) throw err;
                            // console.log(res);
                            console.log(`Transaction cost: $ ${response[0].price * parseInt(item.quantity)}`);
                            askUser();
                        });
                    };
                });
            });
        }
        else if (answer.purchase === "Exit") {
            console.log(`\nSee ya next time!\n`);
            connection.end();
        };
    });
};
