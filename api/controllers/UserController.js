var request = require('request');




module.exports = {




  'new' : function (req, res) {
    if(req.session.authenticated)
    {
      res.redirect('/session/welcome');
      return;
    }
    res.view({
      title: "Register | Code2Create"
    });

  },

  create : function(req, res, next) {

    var recaptcha_secret = "6LcTthcUAAAAAGoJ2l5SeaBzleD7D_RaHk1key9V";
    var us_name = req.param('name');
    var us_regno = req.param('regno');
    var us_phoneno = req.param('phoneno');
    var us_email = req.param('email');
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
      if (body_json.success) {
        User.create(params_needed, function userCreated(err, user) {
          if (err) {
            req.session.flash = {
              err: "Please use different username or email."
            };
            return res.redirect('/register');
          }

          user.uid = user.id;
          user.token = sailsTokenAuth.issueToken(user.id);
          user.save(
            function (err) {
              console.log('saving records for user');
            }
            );


          req.session.authenticated = true;
          req.session.User = user;


          req.session.flash = {
            success: "Successfully Registered!",
            ip: us_ip,
            response: us_response
          };
          Mailer.sendWelcomeMail(user);
          //return res.json({user: user, token: sailsTokenAuth.issueToken(user.id)});
          return res.redirect('/welcome');
        }
        );
      }
      else {
        req.session.flash = {
          err: "Error: Could not Verify ReCaptcha"
        };
        return res.redirect('/register');
      }
    })
  },


  show: function(req, res, next) {


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
        res.redirect('/user/showall');
        return;
      }

     // return res.status(200).json(user);
     res.view({
      user : user,
      title: user.name + " | Code2Create"
    });
     return;

   })

  },

  //this is for backend.
  showsingleuser: function(req, res, next) {


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




  // showall : function (req, res, next) {
  //
  //
  //   var iduser = 0;
  //   var count = 0;
  //   var final = 0;
  //   var memberarray = [];
  //   Team.find(function foundTeams(err, teams) {
  //     if (err) {
  //       return next(err);
  //     }
  //     User.find(function foundUsers(err, users) {
  //       users.forEach(function (user) {
  //         teams.forEach(function (team) {
  //
  //
  //           for(var i=0 ; i<team.memberAccepted.length; i++){
  //
  //             if(team.memberAccepted[i] != user.id){
  //               count = count + 1;
  //             }
  //             //   }
  //             if(count === team.memberAccepted.length){
  //               final = final + 1;
  //             }
  //             //   count = 0;
  //           }
  //           count = 0;
  //
  //         });
  //
  //
  //
  //         if(teams.length === final){
  //           memberarray.push(user);
  //         }
  //         final = 0;
  //
  //
  //       });
  //
  //      // return res.status(200).json(memberarray);
  //       res.view({
  //         users : users,
  //         memberarray : memberarray
  //       });
  //       return;
  //
  //       //
  //     })
  //
  //   });
  //
  // },

  showall : function (req, res, next) {


    var iduser = 0;
    var count = 0;
    var final = 0;
    var memberarray = [];
    Team.find(function foundTeams(err, teams) {
      if (err) {
        req.session.flash = {
          err : "Sorry, Error in finding users"
        };
        return res.redirect('/user/showall');
      }
      User.find(function foundUsers(err, users) {
        users.forEach(function (user) {
          teams.forEach(function (team) {

            if(team.admin != user.id){
              final = final + 1;
            }
          });

          if(teams.length === final){
            memberarray.push(user);
          }
          final = 0;


        });

        // return res.status(200).json(memberarray);
        res.view({
          users : users,
          memberarray : memberarray,
          title: "All Members | Code2Create"
        });
        return;

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
        res.view({
          title: "Your Profile | Code2Create"
        });
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
      user : user,
      title: "Your Profile | Code2Create"
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
      linkedin: us_linkedin

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
  },



  'editpassword' : function (req, res) {
    res.view();
  },


  updatepassword :  function(req,res,next){

    User.findOne({
      username : req.param('username'),
      phoneno : parseInt(req.param('phoneno'))
    }).exec(function(err, user) {
      if(user){

        User.update(req.param('id'),req.params.all(), function userUpdated(err){
          if(err){
            req.session.flash = {
              err : "Sorry, cannot update password."
            };
            return res.redirect('/user/updatepassword/' + req.param('id'));
          }

          // return res.status(200).json({
          //   message : "Successfullly updated password"
          // });
          req.session.flash = {
            success : "Successfully updated password."
          };
          return res.redirect('/session/new');
        });

      }
      else{
        req.session.flash = {
          err : "Sorry,No user found.Please enter valid credentials"
        };
        // return res.status(200).json({
        //   message : "No user updated password"
        // });
        return res.redirect('/user/updatepassword/' + req.param('id'));

      }

      });
  },

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

  external : function (req, res, next) {

    var temparray = [];
    var namearray = [];
    var emailarray = [];

    console.log("Entered");
    User.find({
      internal_external : 'external'
    },function foundUsers(err, users){
      if(err) return next(err);
      users.forEach(function(user){
        temparray.push(user.phoneno);
        namearray.push(user.name);
        emailarray.push(user.email);
      });

      console.log(temparray);
      console.log(namearray);
      console.log(emailarray);


    });
  },

  singlemultiple : function (req, res, next) {

    var namearray = [];
    var singlemember = [];
    var multiplemember = [];


    console.log("Enteredddd");

    Team.find(function foundTeams(err, teams){
      User.find(function foundUsers(err, users){

        if(err) return next(err);

        teams.forEach(function(team){
          // console.log(team.memberAccepted[0]);

          for(var i=0; i < team.memberAccepted.length; i++){
            users.forEach(function(user) {
              if(team.memberAccepted[i] === user.id){
                namearray.push(user);
              }

            });

          }
          if(namearray.length === 1){
            singlemember.push(namearray);
          }
          else{
            multiplemember.push(namearray);
          }
          // console.log(temparray.length);

          namearray = [];

        });
        return res.status(200).json({
          singlemember : singlemember,
          multiplemember : multiplemember

        });

      });


    });




    //});
  },

  externalTeam : function (req, res, next) {

    var externalarray = [];
    var array = [];

    Team.find(function foundTeams(err, teams){
      User.find(function foundUsers(err, users){

        if(err) return next(err);

        teams.forEach(function(team){
          // console.log(team.memberAccepted[0]);

          for(var i=0; i < team.memberAccepted.length; i++){
            users.forEach(function(user) {
              if(team.memberAccepted[i] === user.id){
                if(user.internal_external === "external") {
                  array.push(user);
                }
              }
            });
          }

          array.push(team);
          externalarray.push(array);
          array = [];
        });
        return res.status(200).json({
          externalarray : externalarray
        });

      });


    });



  },
  tracks : function (req, res, next) {

    var arvrteam = [];
    var cleanteam = [];
    var helcteam = [];
    var fintteam = [];

    var tempclean = [];
    var tempfint = [];
    var temphelc = [];
    var temparvr = [];

    console.log("Enteredddd");

    Team.find(function foundTeams(err, teams){
      User.find(function foundUsers(err, users){

        if(err) return next(err);

        teams.forEach(function(team){

          if(team.clen === "1"){
            cleanteam.push(team);

            users.forEach(function(user) {
              if(team.admin === user.id){
                cleanteam.push(user);
              }
            });
            tempclean.push(cleanteam);
            // tempclean.push(userdetails);
            cleanteam = [];
          }

          if(team.fint === "1"){
            fintteam.push(team);

            users.forEach(function(user) {
              if(team.admin === user.id){
                fintteam.push(user);
              }
            });
            tempfint.push(fintteam);
            fintteam = [];

          }

          if(team.helc === "1"){
            helcteam.push(team);

            users.forEach(function(user) {
              if(team.admin === user.id){
                helcteam.push(user);
              }
            });
            temphelc.push(helcteam);
            helcteam = [];
          }

          if(team.arvr === "1"){
            arvrteam.push(team);

            users.forEach(function(user) {
              if(team.admin === user.id){
                arvrteam.push(user);
              }
            });
            temparvr.push(arvrteam);
            arvrteam = [];
          }

        });
        return res.status(200).json({
          tempclean : tempclean,
          tempfint : tempfint,
          temphelc : temphelc,
          temparvr : temparvr
        });

      });


    });

  },






};





