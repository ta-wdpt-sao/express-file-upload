const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/picture');
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  Picture.find((err, pictures) => {
    res.render('index', {pictures})
  })
});

// const upload = multer({ dest: './public/uploads/' });

// router.post('/upload', upload.single('photo'), (req, res) => {
router.post('/upload', uploadCloud.single('photo'), (req, res) => {

  const pic = new Picture({
    name: req.body.name,
    // path: `/uploads/${req.file.filename}`,
    path: req.file.url,
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.status(200).json({ status: true });
  });
});

module.exports = router;
