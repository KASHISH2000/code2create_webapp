var request = require('request');




module.exports = {

  'new' : function (req, res) {
    if(req.session.authenticated)
    {
      res.redirect('/session/welcome');
      return;
    }
    res.view();

  },

  create : function(req, res, next) {

    var recaptcha_secret = "6LcTthcUAAAAAGoJ2l5SeaBzleD7D_RaHk1key9V";
    var us_name = req.param('name');
    var us_regno = req.param('regno');
    var us_phoneno = req.param('phoneno');
    var us_email = req.param('email')
    var us_username = req.param('username');
    var us_internal_external = req.param('internal_external');
    var us_college_name = req.param('college_name');
    var us_college_city = req.param('college_city');
    var us_living = req.param('living');
    var us_block = req.param('block');
    var us_roomno = req.param('roomno');
    var us_description = req.param('description');
    var us_github = req.param('github');
    var us_linkedin = req.param('linkedin');
    var us_response = req.param('g-recaptcha-response');
    var us_ip = req.ip;
    var us_gender = req.param('gender');
    var us_password = req.param('password');
    var us_confirmation = req.param('confirmation');

    // if (!us_name || !us_regno || !us_email || !us_phoneno || !us_living || (us_living == 'hostler' && (!us_block || !us_roomno)) || !us_password || !us_confirmation) {
    //   req.session.flash = {
    //     err: "Error: Form Fields are Incorrect."
    //   };
    //   return res.redirect('/register');
    // }

    var params_needed = {
      name: us_name,
      regno: us_regno,
      phoneno: us_phoneno,
      email: us_email,
      gender : us_gender,
      username: us_username,
      internal_external: us_internal_external,
      college_name: us_college_name,
      college_city: us_college_city,
      living: us_living,
      block: us_block,
      roomno: us_roomno,
      description: us_description,
      github: us_github,
      linkedin: us_linkedin,
      password: us_password,
      confirmation: us_confirmation
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
        User.create(params_needed, function userCreated(err, user) {
          if (err) {
            req.session.flash = {
              err: "Error: Could not register"
            };
            console.log(err);
            return res.redirect('/register');
          }

          user.uid = user.id;
          user.token = sailsTokenAuth.issueToken(user.id);
          user.save(
            function (err) {
              console.log('saving records for user');
            }
            );
            //console.log(user);


            req.session.authenticated = true;
            req.session.User = user;


            req.session.flash = {
              success: "Successfully Registered!",
              ip: us_ip,
              response: us_response
            };
          Mailer.sendWelcomeMail(user);
          //return res.json({user: user, token: sailsTokenAuth.issueToken(user.id)});
          return res.redirect('/session/welcome');
        }
        );
      }
      else {
        req.session.flash = {
          err: "Error: Couldn't Verify ReCaptcha"
        };
        return res.redirect('/register');
      }
    })
  },


  // create : function (req, res, next) {

  //   User.create(req.params.all(), function userCreated(err, user) {
  //     if (err) {
  //       req.session.flash = {
  //         err: "Error: Couldn't register"
  //       };
  //       console.log(err);
  //       return res.redirect('/register');
  //     }

  //     user.uid = user.id;
  //     user.token = sailsTokenAuth.issueToken(user.id);
  //     user.save(
  //       function (err) {
  //         console.log('saving records for user');
  //       }
  //     );
  //     //console.log(user);


  //     req.session.authenticated = true;
  //     req.session.User = user;


  //     req.session.flash = {
  //       success: "Successfully Registered!",
  //       //ip: us_ip,
  //       //response: us_response
  //     };
  //     //Mailer.sendWelcomeMail(user);
  //     return res.json({user: user, token: sailsTokenAuth.issueToken(user.id)});
  //     //return res.redirect('/register');

  // });
  // },

  show: function(req, res, next) {

    //console.log(user);

    User.findOne({
      username : req.param('id')
    }).exec(function(err, user) {

      if (err) {
        req.session.flash = {
          err : "Sorry, Error in finding user"
        };
        return;
      }
      if (!user) {
        req.session.flash = {
          err : "Sorry, No user found"
        };
        res.view();
        return;
      }

     // return res.status(200).json(user);
     res.view({
      user : user
    });
     return;

   });
  },

  //this is for backend.
  showsingleuser: function(req, res, next) {

    //console.log(user);

    User.find(req.param('id')).exec(function(err, user) {

      if (err) return next(err);
      if (!user) return next();
      return res.status(200).json(user);
    });
  },

  //this is for backend testing
  showalluser : function (req, res, next) {
    User.find(function foundUsers(err, users){
      if(err) return next(err);
      return res.status(200).json(users);
    });
  },




  showall : function (req, res, next) {


    var iduser = 0;
    var count = 0;
    var final = 0;
    var memberarray = [];
    Team.find(function foundTeams(err, teams) {
      if (err) return next(err);
      //console.log("After team.find");
      User.find(function foundUsers(err, users) {
        console.log("baap re");
        users.forEach(function (user) {
          teams.forEach(function (team) {
             console.log("After teams");
             console.log("Length of team.memberaccepted is :");
             console.log(team.memberAccepted.length);
            for(var i=0 ; i<team.memberAccepted.length; i++){
              //console.log("For " + i + "th iteration");
              //

              if(team.memberAccepted[i] != user.id){
                count = count + 1;
              }
              //   }
              //console.log("Value of count vakue is : " + count);
              if(count === team.memberAccepted.length){
                final = final + 1;
              }
              //   count = 0;
            }
            count = 0;

          });


           console.log("Final value is :");
          // console.log(final);
          // //console.log(teams.length);
          //
          if(teams.length === final){
            console.log("User is :" );
            memberarray.push(user);
          }
          final = 0;
          // else{
          //   //console.log();
          // }


        });

       // return res.status(200).json(memberarray);
        res.view({
          users : users,
          memberarray : memberarray
        });

        //
      })

    });

  },


  // // //this function is used for returning all the users in form of array.
  // //
  edit : function(req, res, next){

    User.findOne({
      username : req.session.User.username
    }).exec(function(err, user) {

      if (err) {
        req.session.flash = {
          err : "Sorry, Error in finding user"
        };
        res.view();
        return;
      }
      if (!user) {
        req.session.flash = {
          err : "Sorry, No user found"
        };
         res.view();
        return;
      }

     // return res.status(200).json(user);
     res.view({
      user : user
    });
     return;

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

    user = req.session.User;

    var us_phone = req.param('phoneno');
    var us_description = req.param('description');
    var us_github = req.param('github');
    var us_linkedin = req.param('linkedin');

    var update_params_given = {
      phoneno: us_phone,
      description: us_description,
      github: us_github,
      linkedin: us_linkedin,

    };


    User.update({
      id : user.id
    },update_params_given, function userUpdated(err){
      if(err){

        req.session.flash = {
          err : "Something went wrong while updating, please fill correct details."
        };
        return res.redirect('/user/edit/'+ user.username);
      }
      req.session.flash = {
        success : "Successfully updated"
      };
      return res.redirect('/user/edit/'+ user.username);
    });
  }

  // forgetPasswordd : function (req, res, next) {
  //
  //   User.findOneByEmail(req.param('email'), function foundUser(err, user) {
  //     if (err) return next(err);
  //
  //     // If no user is found...
  //     if (!user) {
  //       var noAccountError = [{
  //         name: 'noAccount',
  //         message: 'The email address ' + req.param('email') + ' not found.'
  //       }];
  //       req.session.flash = {
  //         err2: noAccountError
  //       };
  //       res.redirect('/session/new');
  //       return;
  //     }
  //
  //     if(user){
  //       //Mailer.sendWelcomeMail(user);
  //       console.log(user);
  //       res.status(200).json({
  //         user:  user,
  //         message : "Check your email"
  //       });
  //     }
  //   });
  // },
  //
  // resetPasswordd : function (req, res, next) {
  //
  //   User.update(req.param('id'),req.params.all(), function userUpdated(err){
  //     if(err){
  //       return res.redirect('/user/edit/'+req.param('id'));
  //     }
  //     res.redirect('/user/show/'+req.param('id'));
  //   });
  //
  //
  //
  //
  // }
};





