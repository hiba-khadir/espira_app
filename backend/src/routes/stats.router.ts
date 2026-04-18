const express = require('express');
const {
    getAllDevicessController,
    getDeviceByIdController,
    searchDeviceController,   //ask if they'll need this
} = require('../controllers/device.controller.js')

const router = express.Router();

router.get('/search',searchProductController);
router.get('/', getAllProductsController);
router.get('/latest/:max',getLatestProductsController);
router.get('/:id', getProductByIdController);

module.exports = router;