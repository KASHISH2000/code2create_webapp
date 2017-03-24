var bcrypt = require('bcryptjs');
var senderid;

// var bcrypt = require('bcrypt');
module.exports = {

  'welcome': function (req, res) {
    res.view();
    return;
  },

  'new': function (req, res) {
   if(req.session.authenticated)
   {
    redirect('/session/welcome');
    return;
  }
  res.view();
  },

  create: function (req, res, next) {
   if(req.session.authenticated)
   {
    redirect('/session/welcome');
    return;
  }
  console.log("Inside session create function");
  if (!req.param('email_username') || !req.param('password')) {
    req.session.flash = {
      err: 'You must enter both a username/email and password.'
    };
    res.redirect('/session/new');
    return;
  }

  console.log("Inside Email");
  User.findOne({
    or : [
    { username: req.param('email_username') },
    { email: req.param('email_username') }
    ]
  }).exec(function(err, user) {
    // console.log("The user found in db is:");
    // console.log(user);8
    if (err){
     req.session.flash = {
      err: 'Error in logging'
    };
    res.redirect('/session/new');
    return;
  }

          // If no user is found...
          if (!user) {
            var noAccountError = {
              name: 'noAccount',
              message: 'The email address ' + req.param('email') + ' not found.'
            };
            req.session.flash = {
              err: 'The email address ' + req.param('email') + ' not found.'
            };
            res.redirect('/session/new');
            return;
          }
          else{
            bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {

              console.log("Entered into bycrypt");

              if (err) return next(err);

            // If the password from the form doesn't match the password from the database...
            if (!valid) {
              var usernamePasswordMismatchError = [{
                name: 'usernamePasswordMismatch',
                message: 'Invalid username and password combination.'
              }]
              req.session.flash = {
                err: 'Invalid username and password combination.'
              }
              res.redirect('/session/new');
              return;
            }

            req.session.authenticated = true;
            req.session.User = user;

            return res.json({user: user});
            res.redirect('/session/welcome');
          });
          }

        });
},


destroy: function (req, res, next) {
  console.log('Entered into destroy');

  User.findOne(req.session.User.id, function foundUser(err, user) {

    var userId = req.session.User.id;

    if (user) {
        // The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
        User.update(userId, {
          online: false
        }, function (err) {
          if (err) return next(err);

          // Inform other sockets (e.g. connected sockets that are subscribed) that the session for this user has ended.
          User.publishUpdate(userId, {
            loggedIn: false,
            id: userId,
            name: user.name,
            action: ' has logged out.'
          });

          // Wipe out the session (log out)
          req.session.destroy();
          console.log('session destroyed, user was logged in');

          // Redirect the browser to the sign-in screen
          res.redirect('/session/new');
        });
      } else {

        // Wipe out the session (log out)
        req.session.destroy();
        console.log('session destroyed, user was not logged in.');

        // Redirect the browser to the sign-in screen
        res.redirect('/session/new');
      }
    });
}
};

