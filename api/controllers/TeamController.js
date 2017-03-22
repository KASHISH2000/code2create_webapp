
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
        res.status(404).json({
          message : 'Page not found'
        });
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

      res.status(200).json(team);
    });
  },

  showallteams : function (req, res, next) {
    Team.find(function foundTeams(err, teams) {
      if (err) return next(err);
      console.log("Inside team.find");

      res.status(200).json(teams);
    })
  },

  showteam : function(req, res, next) {
    Team.findOne(req.param('id'), function foundTeam(err, team) {
      if (err) return next(err);
      if (!team) return next();
      res.status(200).json(team);
    });
  },

  myteam : function(req, res, next) {
    var userid = 0;
    var temp = 0;

    Team.find({
      admin: req.param('id')
      //admin :   req.param('id')
    }).then(function (team) {
      console.log(team);
      //console.log(req.param('id'));

      if (team.length > 0) {
        temp = 1;
        console.log("Inside team");
        res.status(200).json({
          team: team,
          admin: true
        });
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
                res.status(200).json({
                  team: team,
                  admin: false
                });
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
          res.status(200).json("Sorry, you are not a part of any team yet.Create your own team now.");
          return;

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
              res.status(400).json("Bad Request");
              return;
            }
          }
          }
        team.save(
          function (err) {
            console.log('saving records for team');
          }
        );

        res.status(200).json(team);




      })
    })

  },




  removemember : function(req,res,next) {

    Team.findOne(req.param('id'), function foundTeam(err, team) {
      User.findOne(req.param('uid'), function foundUser(err, user) {

        if (team.admin === parseInt(user.uid)) {

          if(team.memberAccepted.length != 1) {
          res.status(200).json({
            message: "You should first remove other members to destroy team"
          });
          return;
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

        res.status(200).json(team);




      })
    })

  },

  eligiblememberss : function(req, res, next) {

    var j=0;
    var length=0;
    var showmembers = [];
   User.find(function foundUsers(err, users) {
      length = users.length;
     console.log(length);

     if (err) return next(err);
     //console.log("Inside teaM.find");
     users.forEach(function (user) {

       if (!user) {
         res.status(200).json('No team found')
       }

       Team.find({
         memberAccepted :   user.id
       }).then(function (teams) {
         j=j+1;


         if(teams.length === 0){
           showmembers.push(user.id);

             //dostuffWith(showmembers);

         }
         console.log("Value of i is "+ i);
         console.log("Value of length is "+ length);

         if(j===length){
           res.status(200).json({
             members : showmembers,
             users : users
             });

        }
       });

     });



   });

   var dostuffWith = function(ReceiverName){
     // all the code that you want to use ReceiverName should be in here.
     console.log("#####################################");
     console.log(ReceiverName);
     console.log("#####################################");
   }

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
              res.status(200).json("Admin cannot send request to himself");
              return;
            }
          }
        }
        else{
          if(team.admin != team.reciever) {
            temp.push(team.reciever);
            team.memberSend = temp;
          }
          else{
            res.status(200).json("Admin cannot send request to himself");
            return;
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

      res.status(200).json(team);
    });
  },

  sendRequest : function(req, res, next) {

    Team.update(req.param('id'),req.params.all(), function teamUpdated(err){
      if(err){
        res.status(200).json(err);
      }
      // res.status(200).json(team);
      res.redirect('/team/show/'+req.param('id'));
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
                res.status(200).json({
                  message : "Sorry, the team is full"
                });
                return;
              }
            }
          }
          team.save(
            function (err) {
              //console.log('saving records for team');
            }
          );
          //console.log(team.memberSend);

          res.status(200).json({
            team : team,
            user : user
          });
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
        res.status(200).json(memberarray);
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




