const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const layout = require('../views/layout.js');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res, next) => {
  res.send(layout(''));
});
router.get('/:id', (req, res, next) => {
  res.send(layout(''));
});
router.post('/', (req, res, next) => {
  res.json(req.body);
});
router.put('/:id', (req, res, next) => {
  res.send(layout(''));
});
router.delete('/:id', (req, res, next) => {
  res.send(layout(''));
});
module.exports = router;
