import { expect } from 'chai';
import request from 'supertest';
import app from '../../../../..';
import environment from '../../../../config/environment';
process.env.NODE_ENV = 'test';
// Main application Routes
const PREFIX = `/api/${environment.apiVersion}`;



// mock a few products

const products = [
    {
        "name": "cola",
        "price": 10,
        "qty": 20,
        "type": "drink"
    },
    {
        "name": "chips",
        "price": 20,
        "qty": 20,
        "type": "snack"
    }, {
        "name": "candy",
        "price": 30,
        "qty": 20,
        "type": "snack"
    }
]


describe('[ TEST ] User routes', () => {
    before(` should add a product to the inventory`, async () => {
        const res = await request(app).post(`${PREFIX}/admin/products`).send(products);
        expect(res.status).to.equal(201);
    });

    it(`'GET ${PREFIX}/user/products`, (done) => {
        request(app)
            .get(`${PREFIX}/user/products`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data).to.have.lengthOf(3);
                done();
            });
    });


    it(`'GET ${PREFIX}/user/buy/0 (without details)`, (done) => {
        request(app)
            .post(`${PREFIX}/user/buy/0`)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('error_message');
                expect(res.body.data.error_message).to.be.a('string');
                expect(res.body.data.error_message).to.equal('bills is missing');
                done();
            });
    });


    it(`'GET ${PREFIX}/user/buy/0 (with details)`, (done) => {
        request(app)
            .post(`${PREFIX}/user/buy/0`)
            .send({
                bills: [{
                    value: 100,
                    count: 1
                }],
                coins: [],
                qty: 1
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('product');
                expect(res.body.data.product).to.be.an('object');
                expect(res.body.data.product).to.have.property('name');
                expect(res.body.data.product.name).to.be.a('string');
                expect(res.body.data.product.name).to.equal('cola');
                expect(res.body.data.product).to.have.property('price');
                expect(res.body.data.product.price).to.be.a('number');
                expect(res.body.data.product.price).to.equal(10);
                expect(res.body.data.product).to.have.property('qty');
                expect(res.body.data.product.qty).to.be.a('number');
                expect(res.body.data.product.qty).to.equal(19);
                expect(res.body.data.product).to.have.property('type');
                expect(res.body.data.product.type).to.be.a('string');
                expect(res.body.data.product.type).to.equal('drink');
                expect(res.body.data).to.have.property('change');
                expect(res.body.data.change).to.be.an('object');
                expect(res.body.data.change).to.have.property('cash');
                expect(res.body.data.change.cash).to.be.an('array');
                expect(res.body.data.change.cash).to.have.lengthOf(2);
                expect(res.body.data.change.cash[0]).to.have.property('value');
                expect(res.body.data.change.cash[0].value).to.be.a('number');
                expect(res.body.data.change.cash[0].value).to.equal(50);
                expect(res.body.data.change.cash[0]).to.have.property('count');
                expect(res.body.data.change.cash[0].count).to.be.a('number');
                expect(res.body.data.change.cash[0].count).to.equal(1);
                expect(res.body.data.change.cash[1]).to.have.property('value');
                expect(res.body.data.change.cash[1].value).to.be.a('number');
                expect(res.body.data.change.cash[1].value).to.equal(20);
                expect(res.body.data.change.cash[1]).to.have.property('count');
                expect(res.body.data.change.cash[1].count).to.be.a('number');
                expect(res.body.data.change.cash[1].count).to.equal(2);
                expect(res.body.data.change).to.have.property('itemCost');
                expect(res.body.data.change.itemCost).to.be.a('number');
                expect(res.body.data.change.itemCost).to.equal(10);
                expect(res.body.data.change).to.have.property('amountPaid');
                expect(res.body.data.change.amountPaid).to.be.a('number');
                expect(res.body.data.change.amountPaid).to.equal(100);
                expect(res.body.data.change).to.have.property('changeDue');
                expect(res.body.data.change.changeDue).to.be.a('number');
                expect(res.body.data.change.changeDue).to.equal(90);
                done();
            });
    });


});