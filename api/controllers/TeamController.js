
var array = [];
var passport = require('passport');
var i = 0;

module.exports = {

  create : function(req, res, next) {

    Team.create(req.params.all(), function teamCreated(err, team) {
      if (err) {
        //console.log(err);
        req.session.flash = {
          err: err
        };

        return res.redirect('back');

        // res.status(404).json({
        //   message : 'Page not found'
        // });

      }
      user = req.session.User;
      console.log(user);
      team.admin = user.id;
      (array).push(user.id);
      (team.memberAccepted) = (array);
      array = [];

      team.save(
        function (err) {
          console.log('saving records for team');
        }
      );
      console.log(team.admin);

      res.view({
        team : team
      });
      //res.status(200).json(team);
    });
  },

  showallteams : function (req, res, next) {
    Team.find(function foundTeams(err, teams) {
      if (err) return next(err);
      console.log("Inside team.find");

      res.view({
        teams : teams
      });
      //res.status(200).json(teams);
    })
  },

  showteam : function(req, res, next) {
    Team.findOne(req.param('id'), function foundTeam(err, team) {
      if (err) return next(err);
      if (!team) return next();

      res.view({
        team : team
      });
      //res.status(200).json(team);
    });
  },

  myteam : function(req, res, next) {
    var userid = 0;
    var temp = 0;

    Team.find({
      admin: req.param('id')
    }).then(function (team) {
      console.log(team);
      //console.log(req.param('id'));

      if (team.length > 0) {
        temp = 1;
        console.log("Inside team");

        res.view({
          team : team,
          admin : true
        });


        // res.status(200).json({
        //   team: team,
        //   admin: true
        // });
        return;
      }
    });


     if(temp === 0){
    //
       console.log("After temp === 0");
      userid = req.param('id');
      Team.find(function foundTeams(err, teams) {
        console.log("After team.find");
        teams.forEach(function (team) {

          for (var k=0; k<team.memberAccepted.length; k++) {
    //         console.log("Accepted members is :");
    //         console.log(team.memberAccepted[k] +  req.param('id'));
    //         //console.log("user id is :");
    //         //console.log(userid);
            if (team.memberAccepted[k] === parseInt(userid)) {
              if(team.admin != parseInt(userid)) {
                console.log("Inside for loop");
                temp = 3;


                console.log("Team is :");
                console.log(team);

                res.view({
                  team : team,
                  admin : false
                });


                // res.status(200).json({
                //   team: team,
                //   admin: false
                // });
                return;
                break;
              }
    //
            }
            console.log("Checking");
          }
         });
        console.log("Before team === 2 checking");

        if(temp === 0){
          console.log("After temp === 2");

          // res.view({
          //   message : "Sorry, you are not a part of any team yet.Create your own team now."
          // });

          req.session.flash = {
            err: "Sorry, you are not a part of any team yet.Create your own team now"
          };


          //res.status(200).json("Sorry, you are not a part of any team yet.Create your own team now.");
          return res.redirect('back');

        }
        });
    //
     }

  },


  leaveteam : function(req,res,next) {

    Team.findOne(req.param('id'), function foundTeam(err, team) {
      User.findOne(req.param('uid'), function foundUser(err, user) {

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
              return res.redirect('back');
            }
          }
          }
        team.save(
          function (err) {
            console.log('saving records for team');
          }
        );

        res.view({
          team: team
        });
        return;
        //res.status(200).json(team);




      })
    })

  },

  removemember : function(req,res,next) {

    Team.findOne(req.param('id'), function foundTeam(err, team) {
      User.findOne(req.param('uid'), function foundUser(err, user) {

        if (team.admin === parseInt(user.uid)) {

          if(team.memberAccepted.length != 1) {


            req.session.flash = {
              err: "You should first remove other members to destroy team"
            };

          // res.status(200).json({
          //   message: "You should first remove other members to destroy team"
          // });
          return res.redirect('back');
        }
        else{
            (team.memberAccepted).splice(0, 1);
            res.redirect('/team/destroyyTeam/' + team.id);
            return;
          }
      }
        else {
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

        res.view({
          team : team
        });
        //res.status(200).json(team);
      })
    })

  },

  //this will send the collection of all the teams and in frontend, it will check
  //names from memberSend array, and try to match ids with loggedin user.
  //If it matches, then it will display the team name.

  show: function(req, res, next) {

    var temp = [];
    var l=0;

    Team.findOne(req.param('id'), function foundTeam(err, team) {
      if (err) return next(err);
      if (!team) return next();

      if(team) {

        if(team.memberSend) {
          for(var i=0; i<team.memberSend.length; i++) {
            if (team.reciever != team.memberSend[i]) {
              l=l+1;
            }
            //this is used so that if some1 trigger this show function again and again,
            //this will not create duplicity of same user in memberSend array.
          }
          if(l === team.memberSend.length){
            if(team.admin != team.reciever) {
              (team.memberSend).push(team.reciever);
            }
            else{

              req.session.flash = {
                err: "Admin cannot send request to himself"
              };

              //res.status(200).json("Admin cannot send request to himself");
              return res.redirect('back');
            }
          }
        }
        else{
          if(team.admin != team.reciever) {
            temp.push(team.reciever);
            team.memberSend = temp;
          }
          else{

            req.session.flash = {
              err: "Admin cannot send request to himself"
            };
            return res.redirect('back');


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
      console.log("Must come at lars t kasjr");

      res.view({
        team : team
      });

      //res.status(200).json(team);
    });
  },

  sendRequest : function(req, res, next) {


    var temp = [];
    var l=0;



    Team.update(req.param('id'),req.params.all(), function teamUpdated(err){
      if(err){
        req.session.flash = {
          err: err
        };
        return res.redirect('back');
        //res.status(200).json(err);
      }



        Team.findOne(req.param('id'), function foundTeam(err, team) {
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
                    return res.redirect('back');

                    //res.status(200).json("Admin cannot send request to himself");
                    return;
                  }
                }
                else {

                  req.session.flash = {
                    err: "Already sent request to this person"
                  };
                  return res.redirect('back');

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
                  return res.redirect('back');

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
              return res.redirect('back');

              //res.status(200).json("Cannot send request to himself");

            }
          }


      // res.status(200).json(team);
      res.redirect('/team/show/'+req.param('id'));
        });
    });

  },

  acceptedRequest : function(req, res, next){
    Team.findOne(req.param('id'), function foundTeam(err, team) {
        User.findOne(req.param('uid'), function foundUser(err, user) {
          // console.log(user);
          // console.log(team);

          //console.log("previous");
          //console.log(team);
          //console.log(team.memberSend);
          arr = team.memberSend;

          for(var i=0;i<team.memberSend.length ; i++) {
            if (team.memberSend[i] === user.uid) {
              console.log(i);
              (team.memberSend).splice(i,1);
              console.log("Length is ");
              console.log(team.memberAccepted.length);

              if(team.memberAccepted.length < 4) {
                (team.memberAccepted).push(user.id);
                //console.log(team.memberAccepted);
              }
              else{

                req.session.flash = {
                  err: "Sorry, the team is full"
                };
                return res.redirect('back');


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

          res.view({
            team : team,
            user : user
          });

          // res.status(200).json({
          //   team : team,
          //   user : user
          // });
        })
        });
      },
  //here uid is id of that person, who is accepting that team request.

  eligiblemembers : function (req, res, next) {


    var iduser = 0;
    var count = 0;
    var final = 0;
    var memberarray = [];
    Team.find(function foundTeams(err, teams) {
      if (err) return next(err);
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

        res.view({
          users : users,
          memberarray : memberarray
        });

        //res.status(200).json(memberarray);
      })

    });

  },

  destroyyTeam: function(req, res, next) {
    Team.findOne(req.param('id'), function foundTeam(err, team) {

      if (err) return next(err);

      if(!team) return next('Team doesn\'t exist ');

      Team.destroy(req.param('id'), function teamDestroyed(err){
        if(err) return next(err);
      });

      res.redirect('/team/showallteams');


    });

  }


};




