## Requirements

1. Node.js `v14+`
2. NPM `v7+`

## My approach

To create a vending machine, I decided to break down the machine into two independent structures

1. The Register
2. The Inventory

#### The Register

This part of the machine is responsible for keeping track of the money that is inserted into the machine. It also keeps track of the money that is returned to the user. The register is responsible for keeping track of the following:

1. The amount of money that is inserted into the machine
2. The amount of money that is returned to the user
3. The amount of money that is in the machine
4. The change that is returned to the user
5. Validating the amount of money that is inserted into the machine
6. Making sure there is enough money in the machine to return change

#### The Inventory

This part of the machine is responsible for keeping track of the items that are in the machine. It also keeps track of the items that are returned to the user. The inventory is responsible for keeping track of the following:

1. The items that are in the machine
2. Keeping track of the quantity of each item in the machine
3. Making sure there is enough of an item in the machine to return to the user
4. Updating the quantity of an item in the machine

#### The Vending Machine

This is an abstraction of the two structures above. It is responsible for keeping track encapsulating the two structures above and providing an interface for the user to interact with the machine.

#### The API

The API is very simple. It is an Express api that exposes a few endpoints to interact with the machine.
There are admin and user endpoints. The admin endpoints are used to interact with the machine and the user endpoints are used to interact with the machine as a user- they are the ones that are buying items from the machine.

## How to run the code

1. Clone the repo
2. Run `npm install`
3. Run `npm test` to run the tests
4. Run `npm run dev` to start the server
5. Go to `http://localhost:9090/api-docs` to see the swagger docs
6. You can run `npm run build` to build the project. The build files will be in the `dist` folder.
7. You can run `npm run test:with-coverage` to run the tests with coverage. The coverage report will be in the `coverage` folder.

## A few things to note

1. The machine is not persistent. It is just a simple in-memory implementation. If the server is restarted, the machine will be reset. When the server is started i inject an instance of the machine into the app controllers with some default items and money. This is just for testing purposes. In a real world scenario, the machine would be persisted in a database and the machine would be initialized with the data from the database.

2. The machine is not thread safe. If multiple users are interacting with the machine at the same time, there is a chance that the machine will be in an inconsistent state. In a real world scenario, the machine would be thread safe. I would use a database to persist the machine state and use transactions to ensure that the machine is in a consistent state.

3. The machine is not secure. There is no authentication or authorization. In a real world scenario, the machine would be secured with authentication and authorization.

## A few things I would do differently

1. I would use a shelf model to represent the items in the machine. The shelf model would have the following properties:

   1. The number of rows in the shelf
   2. The number of columns in the shelf
   3. The items in the shelf
   4. The quantity of each item in the shelf

### Shelves are harder to impliment without taking too much memory and that would simulate a real vending machine which would be far cooler.
