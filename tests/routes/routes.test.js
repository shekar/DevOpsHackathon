const expect = require('chai').expect;

const { getHeroes } = require('../../routes/readTable');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function (arg) {
        this.sendCalledWith = arg;
    }
}
describe("Routes ", function () {
    it("should error out", function () {
        getHeroes(req, res);
        console.log('testing');
        console.log(res.sendCalledWith);
        expect(res.sendCalledWith).to.contain("Items");
    });
})