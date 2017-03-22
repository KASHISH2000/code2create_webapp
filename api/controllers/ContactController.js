/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'create': function (req, res, next) {
    var name = req.param('name');
    var email = req.param('email');
    var subject = req.param('subject');
    var message = req.param('message');
    var params_needed = {
      name: name,
      email: email,
      subject: subject,
      message: message
    };
    Contact.create(params_needed, function contactCreated(err, contact) {
      if (err) {
        req.session.flash = {
          err: "Error: Couldn't send message"
        };
        return res.redirect('/');
      }
      req.session.flash = {
        success: "Successfully Send Message!"
      };
      console.log(contact);
      RecieveMailer.sendWelcomeMail(contact);
      return res.status(200).json(contact);
    });
  }
};

