
var passport = require('passport');
var i = 0;
var priorityarray = ["1","2","3","4"];

module.exports = {

  new : function (req, res) {
    var count = 0;

    user = req.session.User;

    Team.find(function foundTeams(err, teams) {
      teams.forEach(function (team) {
        count = count + 1;
        for(var i=0 ; i<team.memberAccepted.length; i++) {
          if (team.memberAccepted[i] === user.id) {

            count = 10000000;

          }
        }
      });
      if(count === teams.length){

        res.view({
         title: "Create a Team | Code2Create"
       });
        return;
      }
      else{
        req.session.flash = {
          err: "You are already a part of team."
        };
        return res.redirect('/team/myteam');
      }


    });



  },



  //this will creata a team.
  create : function(req, res, next) {

    user = req.session.User;
    var array = [];


    var temparvr = req.param('arvr');
    var temphelc = req.param('helc');
    var tempfint = req.param('fint');
    var tempclen = req.param('clen');



    if((!temparvr) || (!temphelc) || (!tempfint) || (!tempclen)){
      req.session.flash = {
        err: "Please select all the tracks according to your priority."
      };
      return res.redirect('/team/new');
    }

    if ((temparvr === temphelc) || (temparvr === tempfint) || (temparvr === tempclen) || (temphelc === tempfint) || (temphelc === tempclen) || (tempfint === tempclen)) {
      req.session.flash = {
        err: "Cannot select two same priorities."
      };
      return res.redirect('/team/new');
    }


    if(user) {
      Team.create(req.params.all(), function teamCreated(err, team) {
        if (err) {
          req.session.flash = {
            err: "Please fill all the details properly or try with different teamname."
          };

          return res.redirect('/team/new');

          // res.status(404).json({
          //   message : 'Page not found'
          // });

        }
        team.admin = user.id;
        team.teamAdmin = user.username;



        (array).push(user.id);
        team.memberAccepted = array;


        team.save(
          function (err) {
            if(err){
              req.session.flash = {
                err: "Error in creating team. Please fill details properly"
              };
              return res.redirect('/team/new');
            }
            req.session.flash = {
              success: "You have successfully made a team!"
            };

            res.redirect('/user/showall');
            return;
          }
          );

        //return res.status(200).json(team);


        //
      });
    }
    else{
      req.session.flash = {
        err: "Please Login"
      };

      return res.redirect('/team/new');
    }
  },

  //this is for backend
  // showallteams : function(req, res, next){
  //
  //   Team.find(function foundTeams(err, teams){
  //     if(err) return next(err);
  //     res.status(200).json(teams);
  //     // res.view({
  //     //   teams: teams
  //     // });
  //   });
  // },


  //this will display all the members to whom admin can send requests.
  showall : function (req, res, next) {


    var temp = 0;

    var iduser = 0;
    var count = 0;
    var final = 0;
    var memberarray = [];


    user = req.session.User;


    Team.find(function foundTeams(err, teams) {
      if (err) return next(err);


      teams.forEach(function (team) {
        if (user.id === team.admin) {
          temp = 1;
        }

      });
      if(temp === 1){

        User.find(function foundUsers(err, users) {
          users.forEach(function (user) {
            teams.forEach(function (team) {

              for(var i=0 ; i<team.memberAccepted.length; i++){

                if(team.memberAccepted[i] != user.id){
                  count = count + 1;
                }
                  //   }
                  if(count === team.memberAccepted.length){
                    final = final + 1;
                  }
                  //   count = 0;
                }
                count = 0;

              });

            if(teams.length === final){
              memberarray.push(user);
            }
            final = 0;
              // else{
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
              admin : true,
              title: "All Teams | Code2Create"
            })
          })


      }
      else{
        // return res.status(200).json({
        //   admin : false
        // });
        res.view({
          teams : teams,
          admin : false,
             title: "All Teams | Code2Create"
        })
      }
    })

  },


  //this will display the single team search by team name.
  show : function(req, res, next) {

    Team.findOne({
      teamName : req.param('id')
    }).exec(function(err, team) {



      if (err) {
        req.session.flash = {
          err : "Sorry, Error in finding team"
        };
        return res.redirect('/team/showall');;
      }
      if (!team) {
        req.session.flash = {
          err : "Sorry, No team found"
        };
        return res.redirect('/team/showall');
      }

      //return res.status(200).json(team);
      res.view({
        team : team,
           title: team.teamName + " | Code2Create"
      });
      return;
    });

  },

  update : function(req,res,next){

    user = req.session.User;


    var temparvr = req.param('arvr');
    var temphelc = req.param('helc');
    var tempfint = req.param('fint');
    var tempclen = req.param('clen');


    var update_params_needed = {
      arvr : temparvr,
      helc : temphelc,
      fint : tempfint,
      clen : tempclen,
    };


    if((!temparvr) || (!temphelc) || (!tempfint) || (!tempclen)){
      req.session.flash = {
        err: "Please select all the tracks according to your priority."
      };
      return res.redirect('/team/myteam');
    }

    if((temparvr === "0") || (temphelc === "0") || (tempfint === "0") || (tempclen === "0")){
      req.session.flash = {
        err: "Please select all the tracks according to your priority."
      };
      return res.redirect('/team/myteam');
    }


    if ((temparvr === temphelc) || (temparvr === tempfint) || (temparvr === tempclen) || (temphelc === tempfint) || (temphelc === tempclen) || (tempfint === tempclen)) {
      req.session.flash = {
        err: "Cannot select two same priorities."
      };
      return res.redirect('/team/myteam');
    }



    Team.update({
      admin : user.id
    },update_params_needed, function teamUpdated(err){
      if(err){

        req.session.flash = {
          err : "Something went wrong while updating, please fill details properly."
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


      if (team) {
        temp = 1;

        // res.status(200).json({
        //   team: team,
        //   admin: true
        // });
        // return;

        res.view({
          team: team,
          admin: true,
             title: "My Team | Code2Create"
        });
        return;

      }


      else {


        Team.find(function foundTeams(err, teams) {
          teams.forEach(function (team) {
            count = count + 1;
            for (var k = 0; k < team.memberAccepted.length; k++) {

              if (team.memberAccepted[k] === (userid)) {
                if (team.admin != (userid)) {
                  temp = 3;
                  count = 100000000;





                    // res.status(200).json({
                    //   team: team,
                    //   admin: false
                    // });
                    ;

                    res.view({
                      team: team,
                      admin: false,
                         title: "My Team | Code2Create"
                    });
                    return
                    break;




                  }
                  //
                }

              }
            });

          if (count === teams.length) {

            req.session.flash = {
              err: "You dont have any team."
            };
            return res.redirect('/user/showall');

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
        if (team.memberAccepted[i] === (user.uid)) {
          if((user.uid) != team.admin) {
            (team.memberAccepted).splice(i, 1);
          }
          else{

            req.session.flash = {
              err: "No team found"
            };
              //res.status(400).json("Bad Request");
              return res.redirect('team/showall');
            }
          }
        }
        team.save(
          function (err) {
            req.session.flash = {
              success: "Successfully left team"
            };
            User.findOne({
              id : team.admin
            }, function foundTeam(err, tempuser) {
              LeftTeam.sendWelcomeMail(tempuser, user);
            });
            return res.redirect('team/showall');
            return;
          }
          );

        //res.status(200).json(team);


      })

  },

  removemember : function(req,res,next) {

    sessionuser = req.session.User;


    Team.findOne({
      admin : sessionuser.id
    }, function foundTeam(err, team) {
      User.findOne(req.param('uid'), function foundUser(err, user) {


        if (team.admin === (user.uid)) {
          //if admin wants to delete itself

          if(team.memberAccepted.length > 1) {


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
            if (team.memberAccepted[i] === (user.uid)) {
              (team.memberAccepted).splice(i, 1);
            }

          }
        }
        team.save(
          function (err) {
            if(err){
              req.session.flash = {
                err : "Something went wrong.Please try again!"
              };
              return res.redirect('/team/myteam');
            }
            req.session.flash = {
              success : "Successfully removed!"
            };
            RemoveMember.sendWelcomeMail(sessionuser , user);

            return res.redirect('/team/myteam');
          }
          );


      })
    })

  },



  //admin can send request to users.
  sendRequest : function(req, res, next) {

    var temp = [];
    var l=0;
    var useremail = req.param('email');
    var sendername = req.session.User.name;
    var receivername = req.param('name');
    user = req.session.User;

    Team.update({
      admin : user.id

    },req.params.all(), function teamUpdated(err){
      if(err){
        req.session.flash = {
          err: "unable to update team"
        };
        return res.redirect('/user/showall');
        //res.status(200).json(err);
      }

      Team.findOne({
        admin : user.id
      }, function foundTeam(err, team) {

        if (err) {
          req.session.flash = {
            err: "Create your team first, to send Invites"
          };
          return res.redirect('/user/showall');
        }
        if (!team) {
          req.session.flash = {
            err: "Create your team first, to send Invites"
          };
          return res.redirect('/user/showall');
        }

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
                      err: "Admin cannot send Invitation to himself"
                    };
                    return res.redirect('/user/showall');

                    //res.status(200).json("Admin cannot send request to himself");
                  }
                }
                else {

                  req.session.flash = {
                    err: "Already send Invitation to this person"
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
                    err: "Admin cannot send Invitation to himself"
                  };
                  return res.redirect('/user/showall');

                  //res.status(200).json("Admin cannot send request to himself");
                }
              }
              //undefined while entering the first entry
              team.save(
                function (err) {
                  req.session.flash = {
                    success: "successfully Send Invitation"
                  };
                  sendRequestMail.sendWelcomeMail(sendername, receivername, useremail);

                  return res.redirect('/user/showall');
                }
                );
            }
            else{

              req.session.flash = {
                err: "Cannot send Invitation to himself"
              };
              return res.redirect('/user/showall');

              //res.status(200).json("Cannot send request to himself");

            }
          }

      //return res.status(200).json(team);

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
          requestview : requestview,
          err : false
        });
      }
      else{
        //return res.status(200).json("Sorry, you are not a part of any team");


        res.view({
          err : "You have received no invitations for joining team",
          requestview : requestview,
             title: "View Invites| Code2Create"
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


      Team.find(function foundTeams(err, teams) {

        if(teams) {
            //sails.models.team.checkmembers(user.id)

            teams.forEach(function (tempteam) {
              count = count + 1;
              if(tempteam.memberAccepted) {
                for (var i = 0; i < tempteam.memberAccepted.length; i++) {
                  if (user.id === tempteam.memberAccepted[i]) {

                    temp = 2;
                    count = 10000000000;

                      // res.status(200).json("Already in a team");
                      // return;

                      req.session.flash = {
                        err: "You are already in a team. For joining this team, leave your team first"
                      };
                      res.redirect('/team/viewrequest');
                      return;
                    }
                  }
                }

              });

          }

          if(count === teams.length) {

            arr = team.memberSend;


            for (var i = 0; i < team.memberSend.length; i++) {


              if (team.memberSend[i] === user.uid) {
                (team.memberSend).splice(i, 1);

                if (team.memberAccepted.length < 4) {
                  (team.memberAccepted).push(user.id);
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
                if(err){
                  req.session.flash = {
                    err : "Cannot remove.Please try again"
                  };
                  res.redirect('/team/viewrequest');
                  return;
                }
                req.session.flash = {
                  success: "You Have Successfully Joined the team"
                };
                res.redirect('/team/myteam');
                return;
              }
              );

            // res.status(200).json({
            //   team: team,
            //   user: user
            // });
            // return;


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
          err : "Unable to find team"
        };
        res.redirect('/team/showall');
        return;
      }

      if(!team) {
        req.session.flash = {
          err : "Team doesn\'t exist "
        };
        res.redirect('/team/showall');
        return;

      }

      Team.destroy(req.param('id'), function teamDestroyed(err){
        if(err) return next(err);
      });

      req.session.flash = {
        success : "Successfully deleted team"
      };

      res.redirect('/team/showall');



    });

  },

  noofteams : function (req, res, next) {
    var temparray = [];

    Team.find(function foundTeams(err, teams) {

      teams.forEach(function (team) {
        if(team.clen === "1"){
          temparray.push(team);
        }

      });
      console.log(temparray.length);


    });
  }



};




