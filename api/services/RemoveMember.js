module.exports.sendWelcomeMail = function(teamuser, usernameDeleted, useremailDeleted) {

  console.log("Successfully reached");

  sails.hooks.email.send(
    "RemoveEmail",
    {
      Name : usernameDeleted,
      Teamuser : teamuser
    },
    {
      to: useremailDeleted,
      subject: "Admin removed you from team in Code2Create"
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

