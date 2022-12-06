import { expect } from 'chai';
import { describe, it } from "mocha";
import Inventory from '../inventory';

const inventory = new Inventory()


describe('[ TEST ] Inventory', () => {
    afterEach(() => {
        inventory.clear();
    })
    it('should add a product', () => {
        inventory.addProduct({
            name: 'Coke',
            price: 1.25,
            qty: 10
        });

        expect(inventory.getProducts().length).to.equal(1);
    });

    it('should remove a product', () => {
        inventory.addProduct({
            name: 'Coke',
            price: 1.25,
            qty: 10
        });

        inventory.removeProduct(0);

        expect(inventory.getProducts().length).to.equal(0);
    });

    it('should update a product', () => {
        inventory.addProduct({
            name: 'Coke',
            price: 1.25,
            qty: 10
        });

        inventory.updateProduct(0, {
            name: 'Coke',
            price: 1.25,
            qty: 10
        });

        expect(inventory.getProducts().length).to.equal(1);
    });

    it('should buy a product', () => {
        inventory.addProduct({
            name: 'Coke',
            price: 1.25,
            qty: 10
        });

        inventory.buyProduct(0, 1);

        expect(inventory.getProducts()[0].qty).to.equal(9);
    });

    it('should add stock to a product', () => {
        inventory.addProduct({
            name: 'Coke',
            price: 1.25,
            qty: 10
        });

        inventory.addStock(0, 10);

        expect(inventory.getProducts()[0].qty).to.equal(20);
    });

    it('should throw an error if no product found at slot (fetching product)', () => {
        expect(() => inventory.getProduct(0)).to.throw('No product found at slot 0');
    });


    it('should throw an error if no product found at slot (buying)', () => {
        expect(() => inventory.buyProduct(0, 1)).to.throw('No product found at slot 0');
    });

    it('should throw an error if not enough product in stock (buying)', () => {
        inventory.addProduct({
            name: 'Coke',
            price: 1.25,
            qty: 10
        });

        expect(() => inventory.buyProduct(0, 11)).to.throw('Not enough Coke in stock');
    });

    it('should throw an error if no product found at slot (adding stock)', () => {
        expect(() => inventory.addStock(0, 1)).to.throw('No product found at slot 0');
    });
})