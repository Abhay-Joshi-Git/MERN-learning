const express = require('express');
const mongoose = require('mongoose');
require('./models/users');
require('./services/passport');
const passport = require('passport');

const cookieSession = require('cookie-session');
const config = require('./config/app_config');


mongoose.connect(config.mongoDBURL);

let app = express();

app.use(cookieSession({
  maxAge: 24 * 60 *60 * 10000,
  keys: [config.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth-routes')(app);

app.get('/', (req, res) => {
  res.send('logged in successfully');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('server started at 8080');
});