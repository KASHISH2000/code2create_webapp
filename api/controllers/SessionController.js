
var bcrypt = require('bcrypt');

module.exports = {

  'new': function (req, res) {
    res.view('session/new');
  },

  create: function (req, res, next) {
    if (!req.param('email') || !req.param('password')) {
      var usernamePasswordRequiredError = [{
        name: 'usernamePasswordRequired',
        message: 'You must enter both a username and password.'
      }];

      req.session.flash = {
        err1: usernamePasswordRequiredError
      };

      res.redirect('/session/new');
      return;
    }
    User.findOneByEmail(req.param('email'), function foundUser(err, user) {
      if (err) return next(err);

      // If no user is found...
      if (!user) {
        var noAccountError = [{
          name: 'noAccount',
          message: 'The email address ' + req.param('email') + ' not found.'
        }];
        req.session.flash = {
          err2: noAccountError
        };
        res.redirect('/session/new');
        return;
      }

      bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {

        if (err) return next(err);

        // If the password from the form doesn't match the password from the database...
        if (!valid) {
          var usernamePasswordMismatchError = [{
            name: 'usernamePasswordMismatch',
            message: 'Invalid username and password combination.'
          }]
          req.session.flash = {
            err3 : usernamePasswordMismatchError
          }
          res.redirect('/session/new');
          return;
        }

        req.session.authenticated = true;
        req.session.User = user;

        res.redirect('/user/show/' + user.id);
      });

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
          console.log('session destroyed');

          // Redirect the browser to the sign-in screen
          res.redirect('/session/new');
        });
      } else {

        // Wipe out the session (log out)
        req.session.destroy();
        console.log('session destroyed');

        // Redirect the browser to the sign-in screen
        res.redirect('/session/new');
      }
    });
  }
};

