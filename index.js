const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/users');
require('./services/passport');
const passport = require('passport');

const cookieSession = require('cookie-session');
const config = require('./config/app_config');


mongoose.connect(config.mongoDBURL);

let app = express();
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 10000,
  keys: [config.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth-routes')(app);
require('./routes/billing-routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('server started at 8080');
});