const db = require('../db.js');
const drive = require('../drive.js');
const bodyParser = require('body-parser');
const assert = require('assert');

exports.getAll = function(req, res) {
    res.json(drive.listFiles());
}

exports.downloadFile = function(req, res) {
    res.json(drive.downloadFiles);
}

exports.uploadFile = function(req, res) {
    res.json(drive.uploadFile(req));

}

exports.removeFile = function(req, res) {
    res.json(drive.removeFile(req));
}