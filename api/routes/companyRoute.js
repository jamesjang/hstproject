const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController.js');

router.get('/company/all', companyController.getAll);

router.get('/company/getid/:id', companyController.getID);

router.post('/company/new', companyController.createItem);

router.put('/company/update/:id', companyController.updateItem);

router.delete('/company/remove', companyController.deleteItem);

module.exports = router;