import Product from "./models/product";

export default class Inventory {

    private products: Product[] = [];

    public addProduct(product: Product) {
        // if product exists, update it
        let existingProduct = this.products.find(p => p.id === product.id);

        if (existingProduct) {
            this.updateProduct(this.products.indexOf(existingProduct), product);
        }

        // else add it
        else {
            this.products.push(product);
        }
    }

    public removeProduct(slot: number) {
        this.products.splice(slot, 1);
    }

    public updateProduct(slot: number, product: Product) {
        this.products[slot] = product;
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
        return this.products;
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