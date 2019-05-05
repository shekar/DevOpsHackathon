const tableName = "SuperHeroesDb";
const AWS = require("aws-sdk");
AWS.config.update({
    region: "eu-east-1",
    endpoint: "http://localhost:8000"
});
const docClient = new AWS.DynamoDB.DocumentClient();
module.exports = {
    getHeroes: function (req, res) {
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
        docClient.scan(params, function(err, data) {
            console.log("On Scan function");
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
        });
    },
    putHeroes: function (req, res) {
        console.log(req.query.id);
        var params = {
            TableName: tableName,
            Item: {
                "id": req.query.id,
                "name": req.query.name,
                "biography": req.query.biography,
                "powers": req.query.powers
            }
        };
        docClient.put(params, function (err, data) {
            if (err) console.log(err);
            else console.log(data);
        });  
    }
}