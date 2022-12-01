import Product from "./models/product";
import Shelf from "./shelf";

export default class Inventory {

    shelves: Shelf[] = [];
    size: number;
    shelfSize: number;

    constructor(size: number, shelfSize: number) {
        this.size = size;
        this.shelfSize = shelfSize;
        this.initializeShelves();
    }


    private initializeShelves(): void {
        let start = 0;
        for (let i = 0; i < this.size; i++) {
            // creates a square shelf of size (shelfSize*shelfSize)
            this.shelves.push(new Shelf(this.shelfSize, this.shelfSize, start));
            start += this.shelfSize;
        }
    }

    public addProduct(product: Product): { shelf: number, row: number } {

        // find the shelf with the highest confidence score for the product
        // confidence score is calculated by the amount of products in the shelf with the same id as the product and the amount of slots to spare in the row if the product is added to the shelf, the less slots to spare the higher the confidence score
        // this reduces space wastage by using shelves with the least amount of space to spare for the product

        const scores = this.shelves.map((shelf) => {
            return {
                score: shelf.shelfConfidence(product),
                shelf: shelf,
            }
        });

        // sort shelves by confidence score
        scores.sort((a, b) => b.score - a.score);

        // add product to the shelf with the highest confidence score
        const { row } = scores[0].shelf.addProduct(product);


        return {
            shelf: this.shelves.indexOf(scores[0].shelf),
            row,
        }
    }


    public removeProduct(shelf: number, slot: number): void {

        if (this.shelves.length - 1 < shelf) {
            throw new Error('Shelf not found');
        }

        this.shelves[shelf].removeProduct(slot);
    }

    public buyProduct(productSlot: number, qty: number): Product {
        // find the shelf that contains the product eg productSlot = 5 in a 3 shelf inventory box with 3 rows each will be in shelf 1
        const shelf = this.shelves.find((s) => s.start <= productSlot && s.start + s.rows > productSlot);

        // find the product in the shelf

        if (!shelf) {
            throw new Error('Shelf not found');
        }

        const product = shelf.dropProduct(productSlot, qty); // drop product from shelf ?? throw error if no stock

        return product;
    }


    public getProducts(): Product[] {
        return this.shelves.reduce((acc: any[], shelf) => {
            return acc.concat(shelf.products);
        }, []);
    }


    public clear(): void {
        this.shelves.forEach((shelf) => shelf.clear());
    }




}