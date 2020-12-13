const express = require('express');
const router = express.Router();
const hsController = require('../controllers/hsController.js');

router.get('/', (req, res, next) => {
    res.send('succesfully connected to api');
})

router.get('/hscode/all', hsController.getAll);

router.get('/hscode/getid/:id', hsController.getID);

router.post('/hscode/new', hsController.createItem);

router.put('/hscode/update/:id', hsController.updateItem);

router.delete('/hscode/remove/:id', hsController.deleteItem);

router.delete('/hscode/reset/all', hsController.deleteAll);

module.exports = router;