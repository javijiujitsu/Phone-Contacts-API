var express = require('express');
var mongoose = require('mongoose');
const Phone = require('../models/phone-model');
const upload = require('../configs/multer');
var router = express.Router();

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

router.post('/phones', upload.single('file'), function(req, res) {
  const phone = new Phone({
    name: req.body.name,
    brand: req.body.brand,
    image: `/uploads/${req.file.filename}`,
    specs: JSON.parse(req.body.specs) || []
  });

  phone.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New Phone created!',
      phone: phone
    });
  });
});
//Get Phone ID

router.get('/phones/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Phone.findById(req.params.id, (err, phone) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(phone);
    });
});

/* EDIT a Phone. */
router.put('/phones/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  };

  Phone.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Phone updated successfully'
    });
  });
})

/* DELETE a Phone. */
router.delete('/phones/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Phone.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Phone has been removed!'
    });
  })
});


module.exports = router;
