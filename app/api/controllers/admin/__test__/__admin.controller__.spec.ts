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


describe('[ TEST ] Admin routes', () => {
    before(`should add products to the inventory`, async () => {
        const res = await request(app).post(`${PREFIX}/admin/products`).send(products);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.lengthOf(3);
    });

    it(`'GET ${PREFIX}/admin/products`, (done) => {
        request(app)
            .get(`${PREFIX}/admin/products`)
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


    it(`'GET ${PREFIX}/admin/products/0`, (done) => {
        request(app)
            .get(`${PREFIX}/admin/products/0`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('name');
                expect(res.body.data).to.have.property('price');
                expect(res.body.data).to.have.property('qty');
                expect(res.body.data).to.have.property('type');
                expect(res.body.data.name).to.equal('cola');
                expect(res.body.data.price).to.equal(10);
                expect(res.body.data.qty).to.equal(20);
                expect(res.body.data.type).to.equal('drink');

                done();
            });
    });


    // delete a product

    it(`'DELETE ${PREFIX}/admin/products/0`, (done) => {
        request(app)
            .delete(`${PREFIX}/admin/products/0`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.a('string');
                expect(res.body.data).to.equal('0');
                done();
            });
    });

    // update a product

    it(`'PATCH ${PREFIX}/admin/products/0`, (done) => {
        request(app)
            .patch(`${PREFIX}/admin/products/0`)
            .send({
                "name": "cheetos",
                "price": 20,
                "qty": 20,
                "type": "snack"
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('name');
                expect(res.body.data).to.have.property('price');
                expect(res.body.data).to.have.property('qty');
                expect(res.body.data).to.have.property('type');
                expect(res.body.data.name).to.equal('cheetos');
                expect(res.body.data.price).to.equal(20);
                expect(res.body.data.qty).to.equal(20);
                expect(res.body.data.type).to.equal('snack');

                done();
            });
    });


    // get a product

    it(`'GET ${PREFIX}/admin/products/0`, (done) => {
        request(app)
            .get(`${PREFIX}/admin/products/0`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('name');
                expect(res.body.data).to.have.property('price');
                expect(res.body.data).to.have.property('qty');
                expect(res.body.data).to.have.property('type');
                expect(res.body.data.name).to.equal('cheetos');
                expect(res.body.data.price).to.equal(20);
                expect(res.body.data.qty).to.equal(20);
                expect(res.body.data.type).to.equal('snack');

                done();
            });
    });



    // register routes

    // get total cash in the machine
    it(`'GET ${PREFIX}/admin/register/total`, (done) => {
        request(app)
            .get(`${PREFIX}/admin/register/total`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('total');
                expect(res.body.data.total).to.equal(1869.1);
                done();
            });
    });


    // get cash in the machine
    it(`'GET ${PREFIX}/admin/register/cash`, (done) => {
        request(app)
            .get(`${PREFIX}/admin/register/cash`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('total');
                expect(res.body.data).to.have.property('coins');
                expect(res.body.data).to.have.property('bills');
                expect(res.body.data.total).to.equal(1869.1);
                expect(res.body.data.coins).to.be.an('array');
                expect(res.body.data.bills).to.be.an('array');
                expect(res.body.data.coins.length).to.equal(5);
                expect(res.body.data.bills.length).to.equal(6);
                done();
            });
    });



    // withdraw cash from the machine

    it(`'POST ${PREFIX}/admin/register/withdraw`, (done) => {
        request(app)
            .post(`${PREFIX}/admin/register/withdraw`)
            .send({
                "amount": 10
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data.length).to.equal(1);
                expect(res.body.data[0]).to.be.an('object');
                expect(res.body.data[0]).to.have.property('value');
                expect(res.body.data[0]).to.have.property('count');
                expect(res.body.data[0]).to.have.property('description');
                expect(res.body.data[0].value).to.equal(10);
                expect(res.body.data[0].count).to.equal(1);
                expect(res.body.data[0].description).to.equal('Ten Dollar Bill');

                // test the total

                request(app)
                    .get(`${PREFIX}/admin/register/total`)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('data');
                        expect(res.body.data).to.be.an('object');
                        expect(res.body.data).to.have.property('total');
                        expect(res.body.data.total).to.equal(1859.1);
                        done();
                    });
            });
    });


    // add cash to the machine

    it(`'POST ${PREFIX}/admin/register/addCash`, (done) => {
        request(app)
            .post(`${PREFIX}/admin/register/addCash`)
            .send({
                bills: [
                    {
                        "value": 10,
                        "count": 1
                    }
                ],
                coins: []
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('Object');
                expect(res.body.data).to.have.property('total');
                expect(res.body.data.total).to.equal(1869.1);

                done();
            });
    });


    // remove cash from the machine

    it(`'POST ${PREFIX}/admin/register/removeCash`, (done) => {
        const bill = {
            "value": 10,
            "count": 1
        }

        request(app)
            .post(`${PREFIX}/admin/register/removeCash`)
            .send({
                money: bill,
                type: 'bill'
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('Object');
                expect(res.body.data).to.have.property('total');
                expect(res.body.data.total).to.equal(1859.1);
                done();
            });
    });

    after(`should clear the inventory`, async () => {
        const res = await request(app).post(`${PREFIX}/admin/clearInventory`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
    });
});