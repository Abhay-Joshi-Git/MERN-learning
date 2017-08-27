const mongoose = require('mongoose');
const authCheck = require('../middlewares/routes_authentication');
const creditsCheck = require('../middlewares/credits_available');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

module.exports = (app) => {
  app.get('/api/surveys', async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients : false });
    res.send(surveys);
  });

  app.get('/api/surveys/thanks/*', (req, res) => {
    res.send('Thanks for taking up the survey!!');
  });

  app.post('/api/survey/webhooks', (req, res) => {
    const p = new Path('/api/surveys/thanks/:surveyId/:choice');
    _.chain(req.body)
      .map(event => {
        const pathName = new URL(event.url).pathname;
        const match = p.test(pathName);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('surveyId', 'email')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          }, {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true }
          }
        ).exec();
      })
      .value();
    console.log('webhook---', req.body);
    res.send({});
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
      _user: req.user.id,
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
    } catch (e) {
      console.log('error', e);
      res.status(500).send(e);
    }
  });
}