var chai= require('chai');
var chaiHttp = require('chai-http');
var request = require('request');

chai.use(chaiHttp);
chai.should();

describe("Heroes", () => {
    describe("GET /", () => {
        it("should get all the heroes record", (done) => {
            request('http://localhost:3000', function (error, response, body) {
                chai.expect(response.statusCode).to.equal(200);
                done();
            });
            
        });

    });
});