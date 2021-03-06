const MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const request = require('request')
const new_data = [
    {
        name: "marcasativas",
        data: require("./data_files/marcasativas.json")
    },
    {
        name: "modelosativos",
        data: require("./data_files/modelosativos.json")
    },
    {
        name: "versoesativas",
        data: require("./data_files/versoesativas.json")
    }
]

MongoClient.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}, function (err, client) {
    if (err) throw err
    //Clear old database
    let db = client.db('test')
    db.dropDatabase('test', function(err, res) {
        if (err) throw err;
        //Create each collection
        new_data.forEach(coll => {
            db.createCollection(coll.name, function(err, res) {
                if (err) throw err;
                console.log("Collection created!");
                
                //And insert the data
                db.collection(coll.name).insertMany(coll.data, function(err, res) {
                    if (err) throw err;
                    console.log("Data inserted");
                });
            });
        });
    });
})
