module.exports.sendWelcomeMail = function(teamobj, userobj) {

  console.log("Successfully reached");

  console.log(teamobj);
  console.log(userobj);

  sails.hooks.email.send(
    "leftTeamEmail",
    {
      Name : teamobj.name,
      User : userobj.name
    },
    {
      to: teamobj.email,
      subject: "Left your team in Code2Create"
    },

    function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("It worked!");
        // console.log(obj.email);
      }
    }
  )
};

