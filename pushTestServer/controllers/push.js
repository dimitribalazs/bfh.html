'use strict';

const webpush = require('web-push');
const key = 'AAAAsJQ2X9U:APA91bEM0ZSAppBHxIzsgbKExxFaRcvtq-t9xhtd7PfEgCagFHQQeojX0yFwpZGEu4FVNVci4xRXOU7PGjG-kBuhBagsDRo1M3dMR3HzAP2YSNldbAVC7eV4uz5O0Ow_zeiD2UgqwbFH';

const subscriptions = [];

const register = (req, res) => {
  if (!subscriptions.find(subscription => subscription.endpoint === req.body.endpoint)) {
    subscriptions.push(req.body);
    console.log('New client registered for push', req.body.endpoint);
  }

  res.send(200);
};

const notifyAll = (req, res) => {
  const payload = {
    notification: {
      title: 'Sample Title',
      body: 'Sample Description'
    }
  };

  subscriptions.forEach(subscription => sendNotification(subscription, payload));

  res.send(200);
};

const sendNotification = (subscription, payload) => {
  webpush.sendNotification(subscription, JSON.stringify(payload))
    .then(
      () => console.log('Successfully notified', subscription.endpoint),
      () => {
        console.log('Removing', subscription.endpoint, 'due to error');

        const index = subscriptions.indexOf(subscription);
        subscriptions.splice(index, 1);
      }
    );
};

const setup = restify => {
  webpush.setGCMAPIKey(key);
  restify.post('/push/register', register);
  restify.post('/push/notifyAll', notifyAll);
};

module.exports = { setup };
