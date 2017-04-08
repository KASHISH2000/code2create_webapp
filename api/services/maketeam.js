
module.exports.sendmaketeamMail = function(obj) {
  sails.hooks.email.send(
    "maketeam",
    {
    },
    {
      to: user.email,
      subject: "Make a team with a minimum 2 members - Code2Create"

    },

    function(err) {
      if(err) {
        console.log("some err - ",err);
      }
      else {
        console.log("ACM MAil It worked!");
      }
    }
  )
};
