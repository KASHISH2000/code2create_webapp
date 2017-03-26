module.exports.sendWelcomeMail = function(teamuser, user) {

  console.log("Successfully reached");

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
        console.log("Successfully reached to " + user.name );
        console.log("admin is " );
        console.log(teamuser.name);
        console.log("It worked!");
        // console.log(obj.email);
      }
    }
  )
};

