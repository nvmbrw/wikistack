const express = require('express');
const morgan = require('morgan');
const app = express();
const wiki = require('./routes/wiki.js');
const user = require('./routes/user.js');
const { db } = require('./models/index.js');

app.use(express.static('./public'));

app.use('/wiki', wiki);
app.use('/users', user);
app.use('/', (req, res, next) => {
  res.redirect('/wiki');
});
app.use(morgan('dev'));
db.authenticate().then(() => {
  console.log('connected to the database');
});
let init = async () => {
  await db.sync({ force: true });

  app.listen(3000, () => {
    console.log('App listening in port 3000');
  });
};
init();
// note: access Page or User tables with db.page & db.user

module.exports = app;
