
var array = [];
var passport = require('passport');
var i = 0;
var temp = [];


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

      team.save(
        function (err) {
          console.log('saving records for team');
        }
      );
      console.log(team.admin);

      res.status(200).json(team);
    });
  },



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

  showteam : function(req, res, next){

      Team.find(function foundTeams(err, teams){
        if(err) return next(err);
        res.status(200).json(teams);
      });
  }
  //this will send the collection of all the teams and in frontend, it will check
  //names from memberSend array, and try to match ids with loggedin user.
  //If it matches, then it will display the team name.


};




