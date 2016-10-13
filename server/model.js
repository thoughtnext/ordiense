var connection = require('./server.db_connection.js');

function Data() {

  this.subscribeUser = function(user, res) {
    connection.execute(function(err, con) {
      var query = con.query('INSERT into subscribed_users SET ?', { 'email_id': user.email_id }, function(err, result) {
        if (err) {
          console.log("Query: " + query.sql)
          console.log('user.email_id: ' + user.email_id)
          
          res.send({ status: 1, message: err });
        } else {
          console.log("Query: " + query.sql)
          console.log('user.email_id: ' + user.email_id)
          res.send({ status: 'success', insertId: result.insertId, user: user, });
        }
        con.release();
      });
    });
  };

  this.getSubscribedUsers = function(res) {
    connection.execute(function(err, con) {
      con.query('select * from subscribed_users', function(err, result) {
        if (err) {
          res.send({ status: 1, message: err });
        } else
          res.send(result);
        con.release();
      });
    });
  };
}

module.exports = new Data();
