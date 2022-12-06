import { IdGenerator } from "../../shared/id";
import Product from "./models/product";

export default class Inventory {

    private products: Product[] = [];

    public addProduct(product: Product) {

        // validate product
        if (!product.name) throw new Error('Product must have a name');
        if (!product.price) throw new Error('Product must have a price');
        if (!product.qty) throw new Error('Product must have a qty');

        product.id = IdGenerator.newId();

        // if product exists, throw error
        let existingProduct = this.products.find(p => p.name === product.name);

        if (existingProduct) {
            throw new Error('Product with that name already exists');
        }

        // else add it
        else {
            this.products.push(product);
        }
    }

    public removeProduct(slot: number) {
        this.products.splice(slot, 1);
    }

    public updateProduct(slot: number, product: Product): Product {
        this.products[slot] = product;
        return product;
    }

    buyProduct(slot: number, qty: number): Product {
        if (this.products[slot]) {
            const product = this.products[slot];

            if (product.qty - qty >= 0) {
                product.qty -= qty;
                return product;
            }

            throw new Error(`Not enough ${product.name} in stock`);
        } else {
            throw new Error(`No product found at slot ${slot}`);
        }
    }


    public getProducts() {
        return this.products.map(product => {
            return {
                ...product,
                price: product.price.toFixed(2),
                slot: this.products.indexOf(product)
            }
        })
    }

    public getProduct(slot: number) {
        let product = this.products[slot];

        if (product) return product;

        throw new Error(`No product found at slot ${slot}`);
    }


    addStock(slot: number, qty: number) {
        let product = this.products[slot];

        if (product) {
            product.qty += qty;
        } else {
            throw new Error(`No product found at slot ${slot}`);
        }
    }


    removeStock(slot: number, qty: number) {
        let product = this.products[slot];

        if (product) {
            if (product.qty - qty >= 0) {
                product.qty -= qty;
            } else {
                throw new Error(`Not enough ${product.name} in stock`);
            }
        } else {
            throw new Error(`No product found at slot ${slot}`);
        }
    }


    public getStock(slot: number) {
        let product = this.products[slot];

        if (product) {
            return product.qty;
        } else {
            throw new Error(`No product found at slot ${slot}`);
        }
    }


    get totalStock() {
        let total = 0;

        this.products.forEach(product => {
            total += product.qty;
        });

        return total;
    }


    get totalValue() {
        let total = 0;

        this.products.forEach(product => {
            total += product.qty * product.price;
        });

        return total;
    }


    public clear() {
        this.products = [];
    }


}