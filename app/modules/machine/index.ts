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

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        // register starts with 10 of each bill and 10 of each coin
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
        this.inventory = new Inventory();

        if (process.env.NODE_ENV != 'test') {

            console.log(process.env.NODE_ENV);
            this.inventory.addProduct({
                name: 'Coke',
                price: 1.25,
                qty: 20,
                type: 'drink',
            })
            this.inventory.addProduct({
                name: 'Pepsi',
                price: 3.99,
                qty: 20,
                type: 'drink',
            });
            this.inventory.addProduct({
                name: 'Sprite',
                price: 2.25,
                qty: 20,
                type: 'drink',
            });
            this.inventory.addProduct({
                name: 'Cheetos',
                price: 3.25,
                qty: 20,
                type: 'snack',
            });
        }
    }


    public addMoneyToRegister(cash: {
        bills: {
            value: number,
            count: number,
        }[],
        coins: {
            value: number,
            count: number,
        }[]
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

    public addProductsToInventory(products: Product[]) {

        if (!Array.isArray(products)) {
            throw new Error('products must be an array');
        }

        if (products.length === 0) {
            throw new Error('products must not be empty');
        }

        products.forEach(product => {
            this.inventory.addProduct(product);
        });
    }

    public removeProductsFromInventory(productSlots: number[]) {

        if (!Array.isArray(productSlots)) {
            throw new Error('productSlots must be an array');
        }

        if (productSlots.length === 0) {
            throw new Error('productSlots must not be empty');
        }

        productSlots.forEach(slot => {
            this.inventory.removeProduct(slot);
        });
    }


    public changeStock(itemSlot: number, qty: number, add = true) {

        if (add) {
            this.inventory.addStock(itemSlot, qty);
        } else {
            this.inventory.removeStock(itemSlot, qty);
        }
    }


    public buyProduct(itemSlot: number, qty: number, cash: {
        bills: {
            value: number,
            count: number,
        }[],
        coins: {
            value: number,
            count: number,
        }[]
    }): {
        product: Product,
        change: Change
    } {


        // validate cash

        // if missing bills or coins, throw error

        if (!cash.bills) {
            throw new Error('bills is missing');
        }

        if (!cash.coins) {
            throw new Error('coins is missing');
        }

        // itemSlot must be a number
        if (typeof itemSlot !== 'number') {
            throw new Error('itemSlot must be a number');
        }

        // qty must be a number

        if (typeof qty !== 'number') {
            throw new Error('qty must be a number');
        }

        // qty must be greater than 0

        if (qty <= 0) {
            throw new Error('qty must be greater than 0');
        }

        // itemSlot must be greater than -1

        if (itemSlot < 0) {
            throw new Error('itemSlot must be greater than -1');
        }



        if (!Array.isArray(cash.bills)) {
            throw new Error('bills must be an array');
        }

        if (!Array.isArray(cash.coins)) {
            throw new Error('coins must be an array');
        }

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

    public clearInventory() {
        this.inventory.clear();
    }

}