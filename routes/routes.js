const functions = require('./routes.functions')

var appRouter = function (app) {
   var tableName = "SuperHeroesDb";
   var AWS = require("aws-sdk");
    AWS.config.update({
        region: "eu-east-1",
        endpoint: "http://localhost:8000"
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    app.get("/Heroes", functions.getHeroes);

    app.post("/Heroes", functions.postHeroes);

    app.get("/Heroes/:id", functions.getHero);

    app.put("/Heroes/:id", functions.putHeroes);

    app.delete("/Heroes/:id", functions.deleteHero);
}

module.exports = appRouter;