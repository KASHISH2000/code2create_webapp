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
  },

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

         res.status(200).json({
           team: team,
           admin: true
         });
          return;

         // res.view({
         //   team: team,
         //   admin: true
         // });
         //return;

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


                   res.status(200).json({
                     team: team,
                     admin: false
                   });
                   return;

                   // res.view({
                   //   team: team,
                   //   admin: false
                   // });
                   // return
                   break;




                 }
                 //
               }

             }
           });

           if (count === teams.length) {
             console.log("After temp === 2");

             res.status(200).json({
               message : "Sorry, you are not a part of any team yet.Create your own team now."
             });
             return;

             // req.session.flash = {
             //   err: "Sorry, you are not a part of any team yet.Create your own team now"
             // };
             //return;
             //res.status(200).json("Sorry, you are not a part of any team yet.Create your own team now.");


           }
         });
         //
       }
     });

   },


   anyuserteam : function(req, res, next) {
     var userid = 0;
     var temp = 0;
     var count = 0;


     userid = req.param('id');

     Team.findOne({
       admin: userid
     }).then(function (team) {
       console.log("Team is :");
       console.log(team);
       console.log("User id is :" + userid);


       if (team.length > 0) {
         temp = 1;
         console.log("Inside team");

         res.status(200).json({
           team: team,
           admin: true
         });
         return;

         // res.view({
         //   team: team,
         //   admin: true
         // });
         //return;

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


                   res.status(200).json({
                     team: team,
                     admin: false
                   });
                   return;

                   // res.view({
                   //   team: team,
                   //   admin: false
                   // });
                   // return
                   break;




                 }
                 //
               }

             }
           });

           if (count === teams.length) {
             console.log("After temp === 2");

             res.status(200).json({
               message : "Sorry, you are not a part of any team yet.Create your own team now."
             });
             return;

             // req.session.flash = {
             //   err: "Sorry, you are not a part of any team yet.Create your own team now"
             // };
             //return;
             //res.status(200).json("Sorry, you are not a part of any team yet.Create your own team now.");


           }
         });
         //
       }
     });

   },
};

