var mysql = require('mysql');

/**
 * Represents Sql Pool and handles queries.
 * @function Connection 
 *    @start - It will start the SQL Pool 
 *    @execute - It wll handle the queries
 */

function Connection() {
  this.pool = null;

  this.start = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'restokitch.com',
      user: 'restokit_ordiense',
      password: 'ordiense@123',
      database: 'restokit_ordiense'
    });
  };

  this.execute = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();
