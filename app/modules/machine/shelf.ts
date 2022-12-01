import Product from "./product";

export default class Shelf {

    rows: number;
    products: Product[] = [];
    depth: number;

    constructor(rows: number, depth: number) {
        this.rows = rows;
        this.depth = depth; // how many products can be in a row
    }

    public addProduct(product: Product): { row: number } {
        // find rows with the same product

        const rows = this.products.filter((p) => p.id === product.id);

        if (rows.length === 0) {
            // add product to a new row if there are no rows with the same product
            // check if there is space for a new row
            if (this.products.length < this.rows) {
                this.products.push(product);
                return { row: this.products.length - 1 };
            }
        }

        // find the row that can fit the product with the least amount of slots to spare

        // sort rows by the amount of slots to spare

        rows.sort((a, b) => (a.qty + product.qty) - (b.qty + product.qty));

        // add product to the row with the least amount of slots to spare

        // check if there is space for the product in the row

        if (rows[0].qty + product.qty <= this.depth) {
            rows[0].qty += product.qty;

            return {
                row: this.products.indexOf(rows[0]),
            }
        }

        // if there is no space for the product in the row, add the product to a new row

        // check if there is space for a new row

        if (this.products.length < this.rows) {
            this.products.push(product);
            return { row: this.products.length - 1 };
        }


        // if there is no space for a new row, throw an error

        throw new Error('No space for product, shelf is full');


    }


    public removeProduct(slot: number): Product {
        // check if slot is valid

        if (slot >= this.products.length) {
            throw new Error('Invalid slot');
        }

        // remove product from slot

        const product = this.products[slot];

        this.products.splice(slot, 1);

        return product;
    }

    // simulate a product being sold
    public dropProduct(slot: number, qty: number): Product {
        // check if slot is valid

        if (slot >= this.products.length) {
            throw new Error('Invalid slot, slot does not exist');
        }

        // check if qty is valid

        if (qty > this.products[slot].qty) {
            throw new Error('Invalid qty, not enough products in slot');
        }

        // negative qty error

        if (qty < 0) {
            throw new Error('Invalid qty, qty cannot be negative');
        }

        // remove qty from product

        this.products[slot].qty -= qty;

        // check if product is empty

        if (this.products[slot].qty === 0) {
            // remove product from slot
            // this will make the slot available for other products
            this.products.splice(slot, 1);
        }

        // return product

        return this.products[slot];
    }


    get emptySlots(): number {
        return this.rows - this.products.length;
    }

    get mostCommonProduct(): Product | null {
        // sort products by qty

        this.products.sort((a, b) => b.qty - a.qty);

        // return the product with the most qty

        return this.products.length > 0 ? this.products[0] : null;
    }

    public shelfConfidence(product: Product): number {
        // find the least amount of slots to spare for the product

        const rows = this.products.filter((p) => p.id === product.id);

        if (rows.length === 0) {
            return 0; // no rows with the same product would need a new row for the product --> 0% confidence least preferred shelf
        }

        // sort rows by the amount of slots to spare

        rows.sort((a, b) => (a.qty + product.qty) - (b.qty + product.qty));

        // return the amount of slots to spare for the product

        // rows[0].qty + product.qty should be less than or equal to this.depth

        if (rows[0].qty + product.qty <= this.depth) {
            return ((rows[0].qty + product.qty) / this.depth) * 100; // 100% confidence most preferred shelf
        }

        // if there is no space for the product in the row, return 0% confidence least preferred shelf

        return 0;
    }


}