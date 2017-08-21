const mongoose = require('mongoose');
const authCheck = require('../middlewares/routes_authentication');
const creditsCheck = require('../middlewares/credits_available');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for taking up the survey!!');
  });

  app.post('/api/survey', authCheck, creditsCheck, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    console.log('in survey api', title, subject, body, recipients);
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',')
        .map((recipientEmail) => {
          return {
            email: recipientEmail.trim()
          };
        }),
      createdDate: Date.now()
    });

    console.log('survey obj', survey);

    const mailer = new Mailer(
      {
        subject,
        recipients
      },
      template(survey)
    );

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);  
    } catch(e) {
      console.log('error', e);
      res.status(500).send(e);
    }
  });
}