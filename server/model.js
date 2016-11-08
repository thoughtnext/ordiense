var connection = require('./server.db_connection.js');
var nodemailer = require('nodemailer');

function Data() {

  this.subscribeUser = function(user, res) {
    connection.execute(function(err, con) {
      var query = con.query('INSERT into subscribed_users SET ?', user , function(err, result) {
        if (err) {
          console.log("Query: " + query.sql)
          console.log('user.email_id: ' + user.email_id)
          res.send({ status: 1, message: err });
        } else {
          console.log("Query: " + query.sql)
          console.log('user.email_id: ' + user.email_id)
          //this.sendWelcomeMail(user.email_id);
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

  this.sendWelcomeMail=function(user, res){
    console.log('inside send mail');
    var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'amit-thoughtnext', // Your email id
        pass: 'tho8nex8' // Your password
      }
    });
    var text = 'Hello world from ordiense';
    var mailOptions = {
      from: '"Team Ordiense" <info@ordiense.com>', // sender address
      to: user.email_id, // list of receivers
      subject: 'Early access to Ordiense', // Subject line
      //text: text //, // plaintext body
      html:   '<table align="center" border="1" cellpadding="0" cellspacing="0" width="600">'+
              '<tr><td bgcolor="#004358">'+
              '<p style="margin: 0 auto;width: 40%;"><img style="display: block;width: 200px;" src="http://ordiense-comingsoon.herokuapp.com/assets/images/ordiense_logo.png" align="middle" alt=""></p>'+
              '</td></tr>'+
              '<tr><td bgcolor="#ffffff">'+
              '<section style="padding:18px;font-family: Lato, sans-serif;">'+
              '<p>Hey,</p><p>We really appreciate you signing up for early access to Ordiense! We’re sure you will love it when it is ready.</p>'+

             '<p> We’re building Ordiense to help people grow their business, improve their career, network for jobs, and meet like-minded people through their personal chatbots.</p>'+

              '<p>We are excited to have you as an early adopter and cannot wait to meet your personal chatbot.</p>'+

              '<p>Thanks for joining!</p>'+

              '<p>Amit and Will, Founders of Ordiense</p>'+
  
              '<p>P.S. We love meeting new people so feel free to reach out! You can get Amit or Will on Messenger anytime.'+
              '</section>' +
              '</td></tr>'+
               '<tr><td align="center" bgcolor="#ee4c50" style="padding: 10px 10px 10px 10px;">'+
            
                '<a href=" https://www.facebook.com/ordiense/"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" style="width:30px;height:30px;margin:0px 7px;"></a>'+
               '<a href=" https://www.linkedin.com/company/ordiense" ><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" style="width:30px;height:30px;"></a>'+
                  
         '</td></tr></table>'

              // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
         res.send({ status: 1, message: error });
    }else{
        console.log('Message sent: ' + info.response);
        res.send({ status: 'success', info: info.response });
      };
    });
  };

}

module.exports = new Data();
