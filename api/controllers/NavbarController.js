/**
 * NavbarController
 *
 * @description :: Server-side logic for managing Navbars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

  getinfo : function (req, res, next) {
    if(!req.session.authenticated){
      res.status(200).json({
        userid  : null,
        username : null,
        anotherTeam : null,
        admin : null
      });
      return;
    }
    var teamAdmin = 0;
    var anotherTeam = 0;
    var iduser = 0;
    var count = 0;
    var final = 0;


    user = req.session.User;

    Team.find(function foundTeams(err, teams) {
      if (err) return next(err);


      teams.forEach(function (team) {
        if (user.id === team.admin) {
          console.log("USer id and admin id is :");
          console.log(user.id + team.admin);
          console.log(team.admin);
          teamAdmin = 1;
          anotherTeam = 1;
        }

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
            anotherTeam = 0;
          }
          else{
            anotherTeam = 1;
          }
          final = 0;

          res.status(200).json({
            userid  : user.id,
            username : user.username,
            anotherTeam : anotherTeam,
            admin : teamAdmin
          })

        });
  }

};

