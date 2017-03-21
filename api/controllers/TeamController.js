
var array = [];
var passport = require('passport');
var i = 0;
var temp = [];
var showmembers = [];


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

  eligiblemembers : function(req, res, next) {

    var i=0;
    var length=0;
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
         i=i+1;


         if(teams.length === 0){
           showmembers.push(user.id);

             //dostuffWith(showmembers);

         }
         console.log("Value of i is "+ i);
         console.log("Value of length is "+ length);

         if(i===length){
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
    Team.findOne(req.param('id'), function foundTeam(err, team) {
      if (err) return next(err);
      if (!team) return next();

      if(team) {

        if(team.memberSend) {
          (team.memberSend).push(team.reciever);
        }
        else{
          temp.push(team.reciever);
          team.memberSend = temp;
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

          console.log("previous");
          console.log(team);
          console.log(team.memberSend);
          arr = team.memberSend;

          for(var i=0;i<4;i++) {
            if (team.memberSend[i] === user.uid) {
              console.log(i);
              (team.memberSend).splice(i,1);
              //AAAAA-----change this splice value from 1,1 to i,1.----AAAAA

              (team.memberAccepted).push(user.id);
              console.log(team.memberAccepted);
            }
          }
          team.save(
            function (err) {
              console.log('saving records for team');
            }
          );
          console.log(team.memberSend);



          res.status(200).json({
            team : team,
            user : user
          });
        })
        });
      },
  //here uid is id of that person, who is accepting that team request.


};




