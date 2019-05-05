var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('request');

chai.use(chaiHttp);
chai.should();
describe("Routes ", function () {
    describe("GET /", () => {
        it("should get all the heroes record", (done) => {
            request('http://localhost:5000/Heroes', function (error, response, body) {
                chai.expect(response.statusCode).to.equal(200);
                done();
            });

        });
        it("should get a hero record", (done) => {
            request('http://localhost:5000/Heroes/1', function (error, response, body) {
                chai.expect(response.statusCode).to.equal(200);
                done();
            });

        });
    });
   
})