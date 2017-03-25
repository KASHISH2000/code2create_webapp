
var array = [];
var passport = require('passport');
var i = 0;

module.exports = {

  'new' : function (req, res) {
    res.view();

  },

  //this will creata a team.
  create : function(req, res, next) {

    user = req.session.User;
    console.log("Here is the loggedn user");
    console.log(user);


    if(user) {
      Team.create(req.params.all(), function teamCreated(err, team) {
        if (err) {
          //console.log(err);
          req.session.flash = {
            err: err
          };

          return res.redirect('/team/new');

          // res.status(404).json({
          //   message : 'Page not found'
          // });

        }
        console.log(user);
        team.admin = user.id;
        team.teamAdmin = user.username;



        (array).push(user.id);
        (team.memberAccepted) = (array);
        array = [];

        team.save(
          function (err) {
            console.log('saving records for team');
          }
          );
        console.log(team.admin);

        //return res.status(200).json(team);
        req.session.flash = {
          success: "You have successfully made a team!"
        };
        res.redirect('/user/showall');
        //
      });
    }
    else{
      req.session.flash = {
        err: "Please Login"
      };
      console.log("Please login");

      return res.redirect('/team/new');
    }
  },

  //this is for backend
  showallteams : function(req, res, next){

    Team.find(function foundTeams(err, teams){
      if(err) return next(err);
      res.status(200).json(teams);
      // res.view({
      //   teams: teams
      // });
    });
  },


  //this will display all the members to whom admin can send requests.
  showall : function (req, res, next) {


    var temp = 0;

    var iduser = 0;
    var count = 0;
    var final = 0;
    var memberarray = [];


    user = req.session.User;
    console.log(user);


    Team.find(function foundTeams(err, teams) {
      if (err) return next(err);


      teams.forEach(function (team) {
        if (user.id === team.admin) {
          console.log("USer id and admin id is :");
          console.log(user.id + team.admin);
          console.log(team.admin);
          temp = 1;
        }

      });
      if(temp === 1){

          //console.log("After team.find");
          User.find(function foundUsers(err, users) {
            //console.log("baap re");
            users.forEach(function (user) {
              teams.forEach(function (team) {
                // console.log("After teams");
                // console.log("Length of team.memberaccepted is :");
                // console.log(team.memberAccepted.length);
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
              // console.log("Final value is :");
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

            // res.view({
            //   users : users,
            //   memberarray : memberarray
            // });

            //res.status(200).json(memberarray);
            res.view({
              membersarray : memberarray,
              teams : teams,
              admin : true
            })
          })


        }
        else{
        // return res.status(200).json({
        //   admin : false
        // });
        res.view({
          teams : teams,
          admin : false
        })
      }
    })

  },


  //this will display the single team search by team name.
  show : function(req, res, next) {
    console.log("ENtered into show");

    Team.findOne({
      teamName : req.param('id')
    }).exec(function(err, team) {

      console.log(team);

      if (err) {
        req.session.flash = {
          err : "Sorry, Error in finding team"
        };
        return;
      }
      if (!team) {
        req.session.flash = {
          err : "Sorry, No team found"
        };
        return;
      }

      //return res.status(200).json(team);
      res.view({
        team : team
      });
      return;
    });

  },

  update : function(req,res,next){

    user = req.session.User;

    var team_arvr = req.param('arvr');
    var team_helc = req.param('helc');
    var team_fint = req.param('fint');
    var team_clen = req.param('clen');
    var team_description = req.param('description');



    var update_params_needed = {
      arvr : team_arvr,
      helc : team_helc,
      fint : team_fint,
      clen : team_clen,
      description : team_description,

    };


    Team.update({
      admin : user.id
    },update_params_needed, function teamUpdated(err){
      if(err){

        req.session.flash = {
          err : "Something went wrong while updating, please fill correct details."
        };
        return res.redirect('/team/myteam/');
      }
      req.session.flash = {
        success : "Successfully updated"
      };
      return res.redirect('/team/myteam/');
    });
  },


  //this will show team of admin(if admin), user's team (if not admin, and available in any team).
  myteam : function(req, res, next) {
    var userid = 0;
    var temp = 0;
    var count = 0;

    user = req.session.User;
    userid = user.id;

    Team.findOne({
      admin: user.id
    }).then(function (team) {
      console.log("Team is :");
      console.log(team);
      console.log("User id is :" + user.id);


      if (team.length > 0) {
        temp = 1;
        console.log("Inside team");

        // res.status(200).json({
        //   team: team,
        //   admin: true
        // });
        // return;

        res.view({
          team: team,
          admin: true
        });
        return;

      }


      else {

        console.log("Phele chal rha hai");

        Team.find(function foundTeams(err, teams) {
          console.log("After team.find");
          teams.forEach(function (team) {
            count = count + 1;
            for (var k = 0; k < team.memberAccepted.length; k++) {
                //         console.log("Accepted members is :");
                //         console.log(team.memberAccepted[k] +  req.param('id'));
                //         //console.log("user id is :");
                //         //console.log(userid);
                if (team.memberAccepted[k] === parseInt(userid)) {
                  if (team.admin != parseInt(userid)) {
                    console.log("Inside for loop");
                    temp = 3;
                    count = 100000000;


                    console.log("Team is :");
                    console.log(team);


                    // res.status(200).json({
                    //   team: team,
                    //   admin: false
                    // });
                    ;

                    res.view({
                      team: team,
                      admin: false
                    });
                    return
                    break;




                  }
                  //
                }

              }
            });

          if (count === teams.length) {
            console.log("After temp === 2");

              // res.status(200).json({
              //   message : "Sorry, you are not a part of any team yet.Create your own team now."
              // });
              // return;
              req.session.flash = {
                err: "Sorry, you are not a part of any team yet.Create your own team now"
              };


              //res.status(200).json("Sorry, you are not a part of any team yet.Create your own team now.");
              return res.redirect('back');

            }
          });
          //
        }
      });

  },


  leaveteam : function(req,res,next) {

    user = req.session.User;

    Team.findOne(req.param('id'), function foundTeam(err, team) {

        for (var i = 0; i < 3; i++) {
          if (team.memberAccepted[i] === parseInt(user.uid)) {
            if(parseInt(user.uid) != team.admin) {
              (team.memberAccepted).splice(i, 1);
            }
            else{

              req.session.flash = {
                err: "Bad Request"
              };
              //res.status(400).json("Bad Request");
              return res.redirect('team/showall');
            }
          }
        }
        team.save(
          function (err) {
            console.log('saving records for team');
          }
          );

      return res.redirect('team/myteam');
      return;
        //res.status(200).json(team);


    })

  },

  removemember : function(req,res,next) {

    user = req.session.User;

    Team.findOne({
      admin : user.id
    }, function foundTeam(err, team) {
      User.findOne(req.param('uid'), function foundUser(err, user) {

        if (team.admin === parseInt(user.uid)) {
          //if admin wants to delete itself

          if(team.memberAccepted.length < 2) {


            req.session.flash = {
              err: "You should first remove other members to destroy team"
            };

          // res.status(200).json({
          //   message: "You should first remove other members to destroy team"
          // });
          return res.redirect('/team/myteam');
        }
        else{
          (team.memberAccepted).splice(0, 1);
          res.redirect('/team/destroyyTeam/' + team.id);
          return;
        }
      }
      else {
          //if admin wants to delete another user.
        for (var i = 0; i < 3; i++) {
          if (team.memberAccepted[i] === parseInt(user.uid)) {
            (team.memberAccepted).splice(i, 1);
          }

        }
      }
      team.save(
        function (err) {
          console.log('saving records for team');
        }
        );

        req.session.flash = {
          success : "Successfully removed!"
        };

        return res.redirect('/team/myteam');
        //res.status(200).json(team);
      })
    })

  },

  //this will send the collection of all the teams and in frontend, it will check
  //names from memberSend array, and try to match ids with loggedin user.
  //If it matches, then it will display the team name.
  //
  // show: function(req, res, next) {
  //
  //   var temp = [];
  //   var l=0;
  //
  //   Team.findOne(req.param('id'), function foundTeam(err, team) {
  //     if (err) return next(err);
  //     if (!team) return next();
  //     console.log("Must come at lars t kasjr");
  //
  //     res.view({
  //       team : team
  //     });
  //
  //     //res.status(200).json(team);
  //   });
  // },

  //admin can send request to users.
  sendRequest : function(req, res, next) {

    var temp = [];
    var l=0;

    user = req.session.User;

    Team.update({
      admin : user.id

    },req.params.all(), function teamUpdated(err){
      if(err){
        req.session.flash = {
          err: "Bad request"
        };
        return res.redirect('/user/showall');
        //res.status(200).json(err);
      }




      Team.findOne({
        admin : user.id
      }, function foundTeam(err, team) {



        console.log(team.reciever);
        if (err) return next(err);
        if (!team) return next();

        if (team) {
          if (team.admin != team.reciever) {

            if (team.memberSend) {
              for (var i = 0; i < team.memberSend.length; i++) {
                if (team.reciever != team.memberSend[i]) {
                  l = l + 1;
                }
                  //this is used so that if some1 trigger this show function again and again,
                  //this will not create duplicity of same user in memberSend array.
                }
                if (l === team.memberSend.length) {
                  if (team.admin != team.reciever) {
                    (team.memberSend).push(team.reciever);
                  }
                  else {
                    req.session.flash = {
                      err: "Admin cannot send request to himself"
                    };
                    return res.redirect('/user/showall');

                    //res.status(200).json("Admin cannot send request to himself");
                  }
                }
                else {

                  req.session.flash = {
                    err: "Already sent request to this person"
                  };
                  return res.redirect('/user/showall');

                  //return res.status(200).json("Already sent request to this person");
                }
              }
              else {
                if (team.admin != team.reciever) {
                  temp.push(team.reciever);
                  team.memberSend = temp;
                }
                else {
                  req.session.flash = {
                    err: "Admin cannot send request to himself"
                  };
                  console.log("Cannot send request to himself");
                  return res.redirect('/user/showall');

                  //res.status(200).json("Admin cannot send request to himself");
                }
              }
              //undefined while entering the first entry
              team.save(
                function (err) {
                  console.log('saving records for team');
                }
                );
            }
            else{

              req.session.flash = {
                err: "Cannot send request to himself"
              };
              console.log("Cannot send request to himself");
              return res.redirect('/user/showall');

              //res.status(200).json("Cannot send request to himself");

            }
          }

      //return res.status(200).json(team);

      req.session.flash = {
        success: "successfully Send Request"
      };
      return res.redirect('/user/showall');

      //return res.redirect('/team/show/' + team.teamName );
    });
    });
  },

  //request come to logged in user.
  viewrequest : function (req, res, next) {

    var requestview = [];

    user = req.session.User;

    Team.find(function foundTeams(err, teams) {

      teams.forEach(function (team) {

        for(var i=0;i<team.memberSend.length ; i++) {
          if (team.memberSend[i] === user.uid) {
            requestview.push(team);
          }
        }

      });
      if(requestview.length > 0){
        //return res.status(200).json(requestview);
        res.view({
          requestview : requestview
        });
      }
      else{
        //return res.status(200).json("Sorry, you are not a part of any team");
        req.session.flash = {
          err: "You have received no request for joining team"
        };
        res.view({
          requestview : requestview
        });
      }


    });

  },

  acceptedRequest : function(req, res, next){

    var arr = [];

    var user = req.session.User;
    var temp = 0;
    var count = 0;

    Team.findOne(req.param('id'), function foundTeam(err, team) {
        // User.findOne(req.param('uid'), function foundUser(err, user) {
          //this is user id of user
          // console.log(user);
          // console.log(team);

          //console.log("previous");
          console.log(team);
          //console.log(team.memberSend);


          Team.find(function foundTeams(err, teams) {

            if(teams) {
            //sails.models.team.checkmembers(user.id)

            teams.forEach(function (tempteam) {
              count = count + 1;
              if(tempteam.memberAccepted) {
                for (var i = 0; i < tempteam.memberAccepted.length; i++) {
                  if (user.id === tempteam.memberAccepted[i]) {

                    console.log("Not in any team");
                    temp = 2;
                    count = 10000000000;

                      // res.status(200).json("Already in a team");
                      // return;

                      req.session.flash = {
                        err: "You are already in a team. For joining this team, levae your team first"
                      };
                      res.redirect('/team/viewrequest');
                      return;
                    }
                  }
                }

              });

          }

          if(count === teams.length) {

            console.log(team);
            arr = team.memberSend;


            for (var i = 0; i < team.memberSend.length; i++) {


              if (team.memberSend[i] === user.uid) {
                console.log(i);
                (team.memberSend).splice(i, 1);
                console.log("Length is ");
                console.log(team.memberAccepted.length);

                if (team.memberAccepted.length < 4) {
                  (team.memberAccepted).push(user.id);
                  //console.log(team.memberAccepted);
                }
                else {

                  req.session.flash = {
                    err: "Sorry, the team is full"
                  };
                  return res.redirect('/team/viewrequest');


                  // res.status(200).json({
                  //   message : "Sorry, the team is full"
                  // });
                }
              }
            }
            team.save(
              function (err) {
                //console.log('saving records for team');
              }
              );
            //console.log(team.memberSend);

            // res.status(200).json({
            //   team: team,
            //   user: user
            // });
            // return;
            req.session.flash = {
              success: "YOu Have Successfully Joined the team"
            };
            res.redirect('/team/viewrequest');
            return;

            // res.status(200).json({
            //   team : team,
            //   user : user
            // });
            //})
          }
        });
        });

  },
  //here uid is id of that person, who is accepting that team request.



  destroyyTeam: function(req, res, next) {
    user = req.session.User;

    Team.findOne({
      admin : user.id
    }, function foundTeam(err, team) {

      if (err) {
        req.session.flash = {
          err : "No team members for your team"
        };
        res.redirect('/team/myteam');
        return;
      }

      if(!team) {
        req.session.flash = {
          err : "Team doesn\'t exist "
        };
        res.redirect('/team/myteam');
        return;

      }

      Team.destroy(req.param('id'), function teamDestroyed(err){
        if(err) return next(err);
      });

      req.session.flash = {
        success : "Successfully destroyed team"
      };

      res.redirect('/team/showall');



    });

  }


};




