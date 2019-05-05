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
        docClient.scan(params, function (err, data) {
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
    postHeroes: function (req, res) {
        console.log(req.body.id);
        var params = {
            TableName: tableName,
            Item: {
                "id": req.body.id,
                "name": req.body.name,
                "biography": req.body.biography,
                "powers": req.body.powers
            }
        };
        docClient.put(params, function (err, data) {
            if (err) { console.log(err); }
            else {
                console.log(data);
                res.send(data);
            }
        });
    },
    putHeroes: function (req, res) {
        console.log(req.params.id);
        var params = {
            TableName: tableName,
            Key: {
                "id": parseInt(req.params.id)
            },
            UpdateExpression: "set #n= :nm, biography=:bio, powers=:pow",
            ExpressionAttributeNames: {
                "#n": "name"
            },
            ExpressionAttributeValues: {
                ":nm": req.body.name,
                ":bio": req.body.biography,
                ":pow": req.body.powers
            },
            ReturnValues: "UPDATED_NEW"
        };

        console.log("Updating the item...");
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));

            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                res.send(data);
            }
        });  
    },
    deleteHero: function (req, res) {
        var params = {
            TableName: tableName,
            Key: {
                "id": parseInt(req.params.id)
            },
            ReturnValues: "ALL_OLD"
        };

        console.log("Attempting a conditional delete...");
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));

            }
            res.send(data);
        });
    },
    getHero: function (req, res) {
        console.log(req.params.id);
        var params = {
            TableName: tableName,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": parseInt(req.params.id)
            }
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
    }
}