const passport = require('passport');

module.exports = app => {
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('in dev - redirecting')
        res.redirect('http://localhost:3006/' + 'surveys');
      } else {
        res.redirect('/surveys');
      }
    }
  );

  app.get('/api/get-user', (req, res) => {
    console.log('in get user', req.user);
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    console.log('logging out...');
    res.send('logout successful');
  });

}