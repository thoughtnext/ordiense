var data = require('./model');

module.exports = {
  configure: function(app) {

    app.post('/users/subscribe', function(req, res) {
      data.subscribeUser(req.body, res);
      //data.sendmail(req.body,res);
    });
    app.post('/users/sendmail', function(req, res) {
      data.sendWelcomeMail(req.body, res);
      //data.sendmail(req.body,res);
    });
    app.get('/users/subscribed', function(req, res) {
      data.getSubscribedUsers(res);
    });
  }
};
