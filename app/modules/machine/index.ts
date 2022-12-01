import Inventory from "./inventory/inventory";
import Register from "./register/register";
import Mode from "./register/models/mode";
import Money from "./register/models/money";
import Product from "./inventory/models/product";
import Change from "./register/models/change";

export default class Machine {
    private register: Register;
    private inventory: Inventory;
    private mode: Mode;
    private id: number;
    private name: string;

    constructor(id: number, name: string, numberOfShelves: number, numberOfSlots: number) {
        this.id = id;
        this.name = name;
        this.mode = {
            name: 'default_US',
            bills: [
                {
                    value: 100,
                    count: 10,
                    description: 'One Hundred Dollar Bill'
                },
                {
                    value: 50,
                    count: 10,
                    description: 'Fifty Dollar Bill'
                },
                {
                    value: 20,
                    count: 10,
                    description: 'Twenty Dollar Bill'
                }, {
                    value: 10,
                    count: 10,
                    description: 'Ten Dollar Bill'
                },
                {
                    value: 5,
                    count: 10,
                    description: 'Five Dollar Bill'
                }, {
                    value: 1,
                    count: 10,
                    description: 'One Dollar Bill'
                }],
            coins: [
                {
                    value: 0.5,
                    count: 10,
                    description: 'Half Dollar Coin'
                },
                {
                    value: 0.25,
                    count: 10,
                    description: 'Quarter'
                }, {
                    value: 0.10,
                    count: 10,
                    description: 'Dime'
                }, {
                    value: 0.05,
                    count: 10,
                    description: 'Nickel'
                }, {
                    value: 0.01,
                    count: 10,
                    description: 'Penny'
                },
            ]
        }
        this.register = new Register(this.mode);
        this.inventory = new Inventory(
            numberOfShelves,
            numberOfSlots
        );
    }


    public addMoneyToRegister(cash: {
        bills: Money[],
        coins: Money[]
    }) {

        cash.bills.forEach(bill => {
            this.register.addMoney(bill, 'bill');
        });

        cash.coins.forEach(coin => {
            this.register.addMoney(coin, 'coin');
        });
    }

    public reMoveMoneyFromRegister(cash: {
        bills: Money[],
        coins: Money[]
    }) {
        cash.bills.forEach(bill => {
            this.register.removeMoney(bill, 'bill');
        });

        cash.coins.forEach(coin => {
            this.register.removeMoney(coin, 'coin');
        });
    }

    public addProductsToInventory(products: []) {
        products.forEach(product => {
            this.inventory.addProduct(product);
        });
    }

    public removeProductsFromInventory(products: {
        shelf: number,
        slot: number
    }[

    ]) {
        products.forEach(product => {
            this.inventory.removeProduct(product.shelf, product.slot);
        });
    }


    public buyProduct(itemSlot: number, qty: number, cash: {
        bills: Money[],
        coins: Money[]
    }): {
        product: Product,
        change: Change
    } {


        let product = this.inventory.buyProduct(itemSlot, qty);
        let price = product.price * qty;
        let change = this.register.checkout(
            cash.bills, cash.coins, price
        )

        return {
            product,
            change
        }

    }


    public getInventory() {
        return this.inventory;
    }

    public getRegister() {
        return this.register;
    }

    public getMode() {
        return this.mode;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

}