const db = require('../db.js');
const bodyParser = require('body-parser');
const assert = require('assert');

const collectionName = 'company';

exports.getAll = function(req, res) {
    const collection = db.getDB().collection(collectionName);

    collection.find().toArray((_error, _result) => { // callback of find
        if (_error) throw _error;

        res.json(_result);
     });
}

exports.getID = function(req, res) {
    const collection = db.getDB().collection(collectionName);
    const itemId = req.params.id;

    collection.findOne({ companyName: itemId }, (error, result) => {
        if (error) throw error;
        // return item
        res.json(result);
     });
}

exports.createItem = function(req, res){
    const collection = db.getDB().collection(collectionName);
    const item = req.body;

    collection.insertOne(item, (error, result) => { // callback of insertOne
        if (error) throw error;
        // return updated list
        collection.find().toArray((_error, _result) => { // callback of find
           if (_error) throw _error;
           res.json(_result);
        });
     });

} 

exports.updateItem = function(req, res) {
    const collection = db.getDB().collection(collectionName);
    const itemId = req.params.id;
    const item = req.body;

    console.log("Editing item: ", itemId, " to be ", item);

    collection.updateOne({ companyName: itemId }, { $set: item }, (error, result) => {
       if (error) throw error;
       // send back entire updated list, to make sure frontend data is up-to-date
       collection.find().toArray(function (_error, _result) {
          if (_error) throw _error;
          res.json(_result);
       });
    });
}

exports.deleteItem = function(req, res) {
    const collection = db.getDB().collection(collectionName);
    const itemId = req.body.companyName;

    console.log("Delete item with id: ", itemId);

    collection.deleteOne({companyName: itemId }, function (error, result) {
        if (error) throw error;
        // send back entire updated list after successful request
        collection.find().toArray(function (_error, _result) {
           if (_error) throw _error;
           res.json(_result);
        });
     });

}
