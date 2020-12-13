const db = require('../db.js');
const bodyParser = require('body-parser');
const assert = require('assert');

const collectionName = 'hstcodes';

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

    collection.findOne({ 품목코드: itemId }, (error, result) => {
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

    collection.updateOne({ 품목코드: itemId }, { $set: item }, (error, result) => {
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
    const itemId = req.params.id;

    console.log("Delete item with id: ", itemId);

    collection.deleteOne({품목코드: itemId }, function (error, result) {
        if (error) throw error;
        // send back entire updated list after successful request
        collection.find().toArray(function (_error, _result) {
           if (_error) throw _error;
           res.json(_result);
        });
     });

}

exports.deleteAll = function(req, res) {
   console.log('deleting all');

   const collection = db.getDB().collection(collectionName);

   collection.deleteMany({}, function (error, result) {
      if (error) throw error;

      res.json(result);
   });
}
