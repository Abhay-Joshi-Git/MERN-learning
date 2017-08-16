const app_config = require('../config/app_config');
const stripe = require('stripe')(app_config.stripe.secret_key);
console.log(app_config.stripe);
const reqAuthMiddleware = require('../middlewares/routes_authentication');

module.exports = app => {
  app.post('/api/stripe', reqAuthMiddleware, async (req, res) => {
    console.log('in stripe api handler', req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'charge for survey credits',
      source: req.body.id
    });
    console.log('got charge successfully');

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
}