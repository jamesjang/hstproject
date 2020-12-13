const express = require('express');
const router = express.Router();
const driveController = require('../controllers/DriveController.js');

router.get('/drive/all', driveController.getAll);

router.get('/drive/download', driveController.downloadFile);

router.post('/drive/upload', driveController.uploadFile);

router.delete('/drive/remove/:id', driveController.removeFile);

module.exports = router;