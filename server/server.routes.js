var data = require('./model');

module.exports = {
  configure: function(app) {

    app.post('/users/subscribe', function(req, res) {
      data.subscribeUser(req.body, res);
    });
    app.get('/users/subscribed', function(req, res) {
      data.getSubscribedUsers(res);
    });
  }
};
