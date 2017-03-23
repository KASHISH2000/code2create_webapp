var request = require('request');


module.exports = {

  'new' : function (req, res) {
     res.view();

  },

  create : function(req, res, next) {


    var recaptcha_secret = "6LcTthcUAAAAAGoJ2l5SeaBzleD7D_RaHk1key9V";
    var us_name = req.param('name');
    var us_regno = req.param('regno');
    var us_email = req.param('email');
    var us_phoneno = req.param('phoneno');
    var us_living = req.param('living');
    var us_block = req.param('block');
    var us_roomno = req.param('roomno');
    var us_response = req.param('g-recaptcha-response');
    var us_ip = req.ip;
    var us_password = req.password;
    var us_confirmation = req.confirm_password;

    // if (!us_name || !us_regno || !us_email || !us_phoneno || !us_living || (us_living == 'hostler' && (!us_block || !us_roomno)) || !us_password || !us_confirmation) {
    //   req.session.flash = {
    //     err: "Error: Form Fields are Incorrect."
    //   };
    //   return res.redirect('/register');
    // }

    var params_needed = {
      name: us_name,
      regno: us_regno,
      email: us_email,
      phoneno: us_phoneno,
      living: us_living,
      block: us_block,
      roomno: us_roomno
    };
    var recaptcha_obj = {
      secret: recaptcha_secret,
      response: us_response,
      remoteip: us_ip
    };
    request.post({
      url: 'https://www.google.com/recaptcha/api/siteverify',
      form: {secret: recaptcha_obj.secret, response: recaptcha_obj.response, remoteip: recaptcha_obj.remoteip}

    }, function Callback(err, httpResponse, body) {
      if (err) {
        req.session.flash = {
          err: "Error in Recaptcha"
        };
        return res.redirect('/register');
      }
      var body_json = JSON.parse(body);
      console.log("The body.success is:", body_json.success);
      if (body_json.success) {
        User.create(req.params.all(), function userCreated(err, user) {
            if (err) {
              req.session.flash = {
                err: "Error: Couldn't register"
              };
              console.log(err);
              return res.redirect('/register');
            }

            user.uid = user.id;
            user.save(
              function (err) {
                console.log('saving records for user');
              }
            );
            console.log(user);


            req.session.authenticated = true;
            req.session.User = user;


            req.session.flash = {
              success: "Successfully Registered!",
              ip: us_ip,
              response: us_response
            };
          //Mailer.sendWelcomeMail(user);
            return res.redirect('/register');
          }
        );
      }
      else {
        req.session.flash = {
          err: "Error: Couldn't Verify ReCaptcha"
        };
        return res.redirect('/register');
      }
    });
  },



  show: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.status(200).json(user);
    });
  },

  showall : function(req, res, next){

    User.find(function foundUsers(err, users){
      if(err) return next(err);
      res.status(200).json(users);
    });
  },

  send: function(req, res, next) {
    console.log(req.param('id'));

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },



  // // //this function is used for returning all the users in form of array.
  // //
  edit : function(req, res, next){
    User.findOne(req.param('id'), function foundUser (err, user){
      //find the user by id
      if(err) return next(err);
      if(!user) return next();

      res.status(200).json(user);
    });
  },
  //
  // edit_password : function(req, res, next){
  //   User.findOne(req.param('id'), function foundUser (err, user){
  //     //find the user by id
  //     if(err) return next(err);
  //     if(!user) return next();
  //
  //     res.view({
  //       user : user
  //     });
  //   });
  // },
  //
  update : function(req,res,next){

    User.update(req.param('id'),req.params.all(), function userUpdated(err){
      if(err){
        return res.redirect('/user/edit/'+req.param('id'));
      }
      res.redirect('/user/show/'+req.param('id'));
    });
  },

  forgetPasswordd : function (req, res, next) {

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

      if(user){
        //Mailer.sendWelcomeMail(user);
        console.log(user);
        res.status(200).json({
          user:  user,
          message : "Check your email"
        });
      }
    });
  },

  resetPasswordd : function (req, res, next) {

    User.update(req.param('id'),req.params.all(), function userUpdated(err){
      if(err){
        return res.redirect('/user/edit/'+req.param('id'));
      }
      res.redirect('/user/show/'+req.param('id'));
    });




  }
};





