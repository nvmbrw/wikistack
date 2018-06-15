const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const layout = require('../views/layout.js');
const addPage = require('../views/addPage.js');
const { Page } = require('../models/index.js');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

const slugGen = str => {
  let nonAlphaNumeric = new RegExp('^[A-Z]|^[a-z]|^[0-9]|^_');
  let newStr = str.replace(' ', '_');
  return newStr.replace(nonAlphaNumeric, '');
};

router.get('/', (req, res, next) => {
  res.send(layout(''));
});
router.post('/', urlencodedParser, async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: 'dummy string',
    status: req.body.status,
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});
router.get('/add', (req, res, next) => {
  res.send(addPage());
});
module.exports = router;
