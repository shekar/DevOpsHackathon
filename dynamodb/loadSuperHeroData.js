var AWS = require("aws-sdk");
var fs = require('fs');
AWS.config.update({
    region: "eu-west-2",
    endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing SuperHeroes into DynamoDB. Please wait.");
var heroes = JSON.parse(fs.readFileSync('superHeroData.json', 'utf8'));
heroes.forEach(function(hero) {
    console.log(hero)
var params = {
        TableName: "SuperHeroesDb",
        Item: {
            "id": hero.id,
            "name": hero.name,
            "biography": hero.biography,
            "powers": hero.powers
        }
    };
docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add Hero", hero.name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", hero.name);
       }
    });
});