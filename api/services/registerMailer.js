

module.exports.sendRegisterMail = function(obj) {
  sails.hooks.email.send(
    "registerEmail",
    {
    },
    {
      to: user.email,
      subject: "Complete your registration - Code2Create"

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
