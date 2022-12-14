import Change from "./models/change";
import Mode from "./models/mode";
import Money from "./models/money";

export default class Register {
    private mode: Mode;
    constructor(mode: Mode) {
        this.mode = mode;
        this.mode.bills.sort((a, b) => b.value - a.value);
        this.mode.coins.sort((a, b) => b.value - a.value);
    }


    public getMode(): Mode {
        return this.mode;
    }

    public setMode(mode: Mode): void {
        this.mode = mode;
    }


    public getBills(): Money[] {
        return this.mode.bills;
    }

    public getCoins(): Money[] {
        return this.mode.coins;
    }

    get total(): number {
        let t = this.mode.bills.reduce((total, bill) => total + (bill.value * bill.count), 0) + this.mode.coins.reduce((total, coin) => total + (coin.value * coin.count), 0);
        // round to 2 decimal places
        return Math.round(t * 100) / 100;
    }


    public addMoney(money: {
        value: number,
        count: number,
    }, type: 'coin' | 'bill'): void {

        // check if money is valid

        if (type === 'coin') {
            const coin = this.mode.coins.find((coin) => coin.value === money.value);
            if (coin) {
                coin.count += money.count;
            } else {
                // not a valid coin
                throw new Error('Invalid coin');
            }
        }

        if (type === 'bill') {
            const bill = this.mode.bills.find((bill) => bill.value === money.value);
            if (bill) {
                bill.count += money.count;
            } else {
                // not a valid bill
                throw new Error('Invalid bill');
            }
        }
    }


    public removeMoney(money: {
        value: number,
        count: number,
    }, type: 'coin' | 'bill'): void {
        if (type === 'coin') {
            const coin = this.mode.coins.find((coin) => coin.value === money.value);
            if (coin) {
                coin.count -= money.count;
            } else {
                // not a valid coin
                throw new Error('Invalid coin');
            }
        }

        if (type === 'bill') {
            const bill = this.mode.bills.find((bill) => bill.value === money.value);
            if (bill) {
                bill.count -= money.count;
            } else {
                // not a valid bill
                throw new Error('Invalid bill');
            }
        }
    }


    public clearRegister(): void {
        this.mode.bills.forEach((bill) => bill.count = 0);
        this.mode.coins.forEach((coin) => coin.count = 0);
    }

    private convertToMoney(value: number) {
        const bills = this.mode.bills;
        const coins = this.mode.coins;
        const money: Money[] = [];

        bills.forEach((bill) => {
            while (value >= bill.value && bill.count > 0) {
                // push bill to money, if there is enough in the register
                // check if bill is already in money array and add to count if it is
                const billInMoney = money.find((money) => money.value === bill.value);
                if (billInMoney) {
                    billInMoney.count++;
                    value -= bill.value;
                    bill.count--;
                } else {
                    money.push({
                        value: bill.value,
                        count: 1,
                        description: bill.description
                    });
                    value -= bill.value;
                    bill.count--;
                }

            }
        });

        value = Math.round(value * 100) / 100;

        coins.forEach((coin) => {
            while (value >= coin.value && coin.count > 0) {

                // push coin to money, if there is enough in the register
                // check if coin is already in money array and add to count if it is
                const coinInMoney = money.find((money) => money.value === coin.value);
                if (coinInMoney) {
                    coinInMoney.count++;
                    value -= coin.value;
                    coin.count--;
                } else {
                    money.push({
                        value: coin.value,
                        count: 1,
                        description: coin.description
                    });
                    value -= coin.value;
                    coin.count--;

                }

                value = Math.round(value * 100) / 100; // round to 2 decimal places so that there are no floating point errors for example 0.1 + 0.2 = 0.30000000000000004 , this can compound and cause issues

            }
        });

        // round value to 2 decimal places
        value = Math.round(value * 100) / 100;

        // if there is still money left, throw error
        if (value > 0) {
            // if money left is less than the smallest coin, throw error
            if (value < coins[coins.length - 1].value) {
                throw new Error('Not enough change, too small of a coin');
            }

            // if money left is more than the largest bill, throw error

            if (value > bills[0].value) {
                throw new Error('Not enough change, please add more bills');
            }

            // if money left is more than the smallest coin and less than the largest bill, throw error

            if (value > coins[coins.length - 1].value && value < bills[0].value) {
                throw new Error('Ran out of change, sorry :(');
            }

        }

        // update bills and coins in register

        this.mode.bills = bills;
        this.mode.coins = coins;
        return money;
    }


    public checkout(bills: {
        value: number,
        count: number
    }[],
        coins: {
            value: number,
            count: number
        }[],
        itemCost: number
    ): Change {
        // make copy of bills and coins in register just in case we need to revert
        const billsCopy = this.mode.bills.map((bill) => ({ ...bill }));
        const coinsCopy = this.mode.coins.map((coin) => ({ ...coin }));

        // check if bills and coins are valid
        bills.forEach((bill) => {
            if (!this.mode.bills.find((modeBill) => modeBill.value === bill.value)) {
                throw new Error('Invalid bill');
            }
        });

        coins.forEach((coin) => {
            if (!this.mode.coins.find((modeCoin) => modeCoin.value === coin.value)) {
                throw new Error('Invalid coin');
            }
        });

        // add bills and coins to register

        bills.forEach((bill) => {
            const billInRegister = this.mode.bills.find((modeBill) => modeBill.value === bill.value);
            if (billInRegister) {
                billInRegister.count += bill.count;
            }
        });

        coins.forEach((coin) => {
            const coinInRegister = this.mode.coins.find((modeCoin) => modeCoin.value === coin.value);
            if (coinInRegister) {
                coinInRegister.count += coin.count;
            }
        });

        // calculate total amount of money added

        const total = bills.reduce((total, bill) => total + (bill.value * bill.count), 0) + coins.reduce((total, coin) => total + (coin.value * coin.count), 0);

        // check if total is enough to cover item cost

        if (total < itemCost) {
            throw new Error('Not enough money');
        }


        // calculate change

        const change = total - itemCost;

        // convert change to money

        let money: Money[] = [];

        try {
            money = this.convertToMoney(change);
        } catch (error) {
            // if there is an error, revert bills and coins in register
            this.mode.bills = billsCopy;
            this.mode.coins = coinsCopy;
            throw error;
        }


        return {
            cash: money,
            itemCost,
            amountPaid: total,
            changeDue: Math.round((change) * 100) / 100
        }
    }


    public withdraw(amount: number, drain = false): void | Money[] {

        // get copy of bills and coins in register
        const billsCopy = this.mode.bills.map((bill) => ({ ...bill }));
        const coinsCopy = this.mode.coins.map((coin) => ({ ...coin }));
        // if drain is true, remove all money from register
        if (drain) {
            // clear the register
            this.clearRegister();
            // return the money
            return [...billsCopy, ...coinsCopy];
        }

        // if drain is false, remove money from register
        // check if amount is valid

        if (amount > this.total) {
            throw new Error('Not enough money in register');
        }

        // convert amount to money

        let money: Money[] = [];

        try {
            money = this.convertToMoney(amount);
        } catch (error) {
            // if there is an error, revert bills and coins in register
            this.mode.bills = billsCopy;
            this.mode.coins = coinsCopy;
            throw error;
        }

        // return the money

        return money;
    }

}