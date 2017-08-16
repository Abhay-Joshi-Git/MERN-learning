const passport = require('passport');
const googlePassportStrategy = require('passport-google-oauth20').Strategy;
const googleAppKeyDetails = require('../config/app_config.js').google;

const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserialize', id);
  User.findById(id).then((user) => {
    console.log('deserialize user', user);
    done(null, user);
  });
});

passport.use(new googlePassportStrategy(
  {
    clientID: googleAppKeyDetails.client_id,
    clientSecret: googleAppKeyDetails.client_secret,
    callbackURL: '/auth/google/callback'
  }, (access_token, refesh_token, profile, done) => {
    User.findOne({ googleID: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleID: profile.id })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
  }
));

