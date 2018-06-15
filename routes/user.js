const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const layout = require('../views/layout.js');
const userList = require('../views/userList.js');
const userPages = require('../views/userPages.js');
const { Page } = require('../models/index.js');
const { User } = require('../models/index.js');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const pages = await Page.findAll({ where: { authorId: req.params.id } });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
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
