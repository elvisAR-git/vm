import { expect } from 'chai';
import { describe, it } from "mocha";
import Register from "../register";



const register = new Register({
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
});


describe('[ TEST ] Register', () => {

    afterEach(() => {
        register.setMode({
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
        });
    });
    describe('constructor', () => {
        it('should create a register', () => {
            expect(register).to.be.an.instanceOf(Register);
        });
    });

    describe('getMode', () => {
        it('should return the mode', () => {
            expect(register.getMode()).to.be.an('object');
        });
    });

    // mode should have bills and coins
    describe('getBills', () => {
        it('should return the bills', () => {
            expect(register.getBills()).to.be.an('array');
        });
    });

    describe('getCoins', () => {
        it('should return the coins', () => {
            expect(register.getCoins()).to.be.an('array');
        });
    });

    describe('total', () => {
        it('should return the total', () => {
            expect(register.total).to.be.a('number');
        });

        it('should return the total of all bills and coins', () => {
            expect(register.total).to.equal(1869.1);
        });
    });

    describe('addMoney', () => {
        it('should add money to the register', () => {
            register.addMoney({
                value: 0.01,
                count: 1
            }, 'coin');
            expect(register.total).to.equal(1869.11);
        });

        it('should throw an error if the money is not valid', () => {
            expect(() => register.addMoney({
                value: 0.01,
                count: 1
            }, 'bill')).to.throw('Invalid bill');
        });
    });

    describe('setMode', () => {
        it('should set the mode', () => {
            register.setMode({
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
            });
            expect(register.getMode()).to.be.an('object');
        });
    });

    describe('removeMoney', () => {
        it('should remove money from the register', () => {
            register.removeMoney({
                value: 0.01,
                count: 1,
            }, 'coin');
            expect(register.total).to.equal(1869.09);
        });
    });

    // checkout
    describe('Utility', () => {
        it('should clear the register', () => {
            register.clearRegister();
            expect(register.total).to.equal(0);
        });
    });

    // simulate a transaction
    describe('checkout', () => {
        it('should checkout exact', () => {
            const changeObject = register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 50);
            expect(changeObject).to.be.an('object');
            // should have cash array
            expect(changeObject.cash).to.be.an('array');
            // should have itemCost
            expect(changeObject.itemCost).to.be.a('number');
            expect(changeObject.itemCost).to.equal(50);
            // should have amountPaid
            expect(changeObject.amountPaid).to.be.a('number');
            expect(changeObject.amountPaid).to.equal(50);
            // should have changeDue
            expect(changeObject.changeDue).to.be.a('number');
            expect(changeObject.changeDue).to.equal(0);
            // cash array should be empty
            expect(changeObject.cash).to.be.empty;
        });

        it('should checkout with change (bills only)', () => {
            const changeObject = register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49);
            expect(changeObject).to.be.an('object');
            // should have cash array
            expect(changeObject.cash).to.be.an('array');
            // should have itemCost
            expect(changeObject.itemCost).to.be.a('number');
            expect(changeObject.itemCost).to.equal(49);
            // should have amountPaid
            expect(changeObject.amountPaid).to.be.a('number');
            expect(changeObject.amountPaid).to.equal(50);
            // should have changeDue
            expect(changeObject.changeDue).to.be.a('number');
            expect(changeObject.changeDue).to.equal(1);
            // cash array should not be empty
            expect(changeObject.cash).to.not.be.empty;
        });

        // should checkout with change
        it('should checkout with change (coins and bills)', () => {
            const changeObject = register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 48.99);
            expect(changeObject).to.be.an('object');
            // should have cash array
            expect(changeObject.cash).to.be.an('array');
            // should have itemCost
            expect(changeObject.itemCost).to.be.a('number');
            expect(changeObject.itemCost).to.equal(48.99);
            // should have amountPaid
            expect(changeObject.amountPaid).to.be.a('number');
            expect(changeObject.amountPaid).to.equal(50);
            // should have changeDue
            expect(changeObject.changeDue).to.be.a('number');
            expect(changeObject.changeDue).to.equal(1.01);
            // cash array should not be empty
            expect(changeObject.cash).to.not.be.empty;
            // cash array should have 1 dollar bill and 1 penny
            expect(changeObject.cash).to.deep.equal([
                {
                    value: 1,
                    count: 1,
                    description: 'One Dollar Bill'
                }, {
                    value: 0.01,
                    count: 1,
                    description: 'Penny'
                }
            ]);
        });

        // throw error if not enough money
        it('should throw an error if not enough money', () => {
            expect(() => register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 51)).to.throw('Not enough money');
        });


        // throw error if not enough change
        it('should throw an error if not enough change', () => {
            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09);

            expect(() => register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 49.09)).to.throw('Ran out of change, sorry :(');
        });

        // throw error if amount paid is less than item cost
        it('should throw an error if amount paid is less than item cost', () => {
            expect(() => register.checkout([
                {
                    value: 50,
                    count: 1
                }
            ], [], 50.01)).to.throw('Not enough money');
        });

    });


    // withdraw
    describe('withdraw', () => {
        it('should withdraw money from the register', () => {
            register.withdraw(50, false);
            expect(register.total).to.equal(1819.1);
        });

        it('should withdraw money from the register and return the cash', () => {
            const cash = register.withdraw(50, false);
            expect(register.total).to.equal(1819.1);
            expect(cash).to.deep.equal([
                {
                    value: 50,
                    count: 1,
                    description: 'Fifty Dollar Bill'
                }
            ]);
        });

        // drain=true should return all cash in register
        it('should withdraw all money from the register and return the cash', () => {
            // when drain is true, it should return all cash in register and ignore amount
            const cash = register.withdraw(0, true);
            expect(register.total).to.equal(0);
            expect(cash).to.deep.equal([
                { value: 100, count: 10, description: 'One Hundred Dollar Bill' },
                { value: 50, count: 10, description: 'Fifty Dollar Bill' },
                { value: 20, count: 10, description: 'Twenty Dollar Bill' },
                { value: 10, count: 10, description: 'Ten Dollar Bill' },
                { value: 5, count: 10, description: 'Five Dollar Bill' },
                { value: 1, count: 10, description: 'One Dollar Bill' },
                { value: 0.5, count: 10, description: 'Half Dollar Coin' },
                { value: 0.25, count: 10, description: 'Quarter' },
                { value: 0.1, count: 10, description: 'Dime' },
                { value: 0.05, count: 10, description: 'Nickel' },
                { value: 0.01, count: 10, description: 'Penny' }
            ]);
        });

        // throw error if not enough money

        it('should throw an error if not enough money', () => {
            expect(() => register.withdraw(2000)).to.throw('Not enough money');
        });
    });
});


// Path: app\modules\machine\register\__test__\__register__.spec.ts

