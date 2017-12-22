module.exports.sendWelcomeMail = function(teamuser, user) {


  sails.hooks.email.send(
    "RemoveEmail",
    {
      Name : user.name,
      Teamuser : teamuser.name
    },
    {
      to: user.email,
      subject: "Admin removed you from team in Code2Create"
    },

    function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("It worked!");
      }
    }
  )
};

