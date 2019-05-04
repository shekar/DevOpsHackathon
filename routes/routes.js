var appRouter = function (app) {
   var tableName = "SuperHeroesDb";
   var AWS = require("aws-sdk");
    AWS.config.update({
        region: "eu-east-1",
        endpoint: "http://localhost:8000"
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    app.get("/Heroes", function (req, res) {
        var params = {
            TableName: tableName,
            ProjectionExpression: "#id, #name,#biography,#powers",
            ExpressionAttributeNames: {
                "#id": "id",
                "#name": "name",
                "#biography": "biography",
                "#powers": "powers"
            }
        };

        console.log("Scanning Super Heroes table.");

        docClient.scan(params, onScan);

        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                res.send(data)
                console.log("Scan succeeded.");
                data.Items.forEach(function (hero) {
                    console.log(hero.id, hero.name)
                });
                if (typeof data.LastEvaluatedKey != "undefined") {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    docClient.scan(params, onScan);
                }
            }
        }
    });

    app.get("/Heroes/:name", function (req, res) {
        console.log(req.params.name);
        var params = {
            TableName: tableName,
            KeyConditionExpression: "#nm = :name",
            ExpressionAttributeNames: { "#nm": "name" },
            ExpressionAttributeValues: {
                ":name": req.params.name
            },
            ProjectionExpression: "#nm, biography, powers"
           
        };

        console.log("Scanning Super Heroes table.");

        docClient.query(params, onQuery);

        function onQuery(err, data) {
            if (err) {
                console.error("Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                res.send(data)
                console.log("Query succeeded.");
                data.Items.forEach(function (hero) {
                    console.log(hero.id, hero.name)
                });
               
            }
        }
    })
}

module.exports = appRouter;