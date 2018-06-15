const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const layout = require('../views/layout.js');
const addPage = require('../views/addPage.js');
const wikipage = require('../views/wikipage.js');
const mainPage = require('../views/main.js');
const editPage = require('../views/editPage.js');
const { Page } = require('../models/index.js');
const { User } = require('../models/index.js');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', async (req, res, next) => {
  const allPages = await Page.findAll();
  res.send(mainPage(allPages));
});

router.post('/', urlencodedParser, async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;

  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: { name: name, email: email },
    });
    console.log('user is ... ', user);
    const page = await Page.create(req.body);
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
    //console.log(page);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const retrievedPage = await Page.findOne({
      where: { slug: req.params.slug },
    });
    const retrievedUser = await User.findOne({
      where: { id: retrievedPage.authorId },
    });
    res.send(editPage(retrievedPage, retrievedUser));
  } catch (error) {
    next(error);
  }
});

router.get('/:slug/delete', async (req, res, next) => {
  try {
    const pageToDelete = await Page.findOne({
      where: { slug: req.params.slug },
    });
    pageToDelete.destroy({ force: true });
    res.redirect('/wiki');
  } catch (error) {
    next(error);
  }
});

router.post('/:slug', urlencodedParser, async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  console.log('req.body is ... ', req.body);

  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: { name: name, email: email },
    });
    //console.log('user is ... ', user);
    const page = await Page.create(req.body);
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
    //console.log(page);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const retrievedPage = await Page.findOne({
      where: { slug: req.params.slug },
    });
    if (!retrievedPage) {
      res.status(404).send('error 404: page not found');
    }
    //console.log(retrievedPage);
    const retrievedUser = await User.findOne({
      where: { id: retrievedPage.authorId },
    });

    res.send(wikipage(retrievedPage, retrievedUser)); // retrievedUser is null here: why?
  } catch (error) {
    next(error);
  }
});

module.exports = router;
