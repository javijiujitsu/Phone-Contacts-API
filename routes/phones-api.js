var express = require('express');
var router = express.Router();

const Phone = require('../models/phone-model');

/* GET Phones listing. */
router.get('/phones', (req, res, next) => {
  Phone.find((err, phonesList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(phonesList);
  });
});

module.exports = router;
