const passport = require('passport');

module.exports = app => {
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
      console.log('redirecting...', req.headers);
      if (req.headers.referer) {
        res.redirect(req.headers.referer);
      } else {
        res.redirect('/');
      }
      
    }
  );

}