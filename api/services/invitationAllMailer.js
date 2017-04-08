

module.exports.sendinviteMail = function(obj) {
console.log("sending begin");
  sails.hooks.email.send(
    "invitationAllEmail",
    {
    },
    {
      to: user.email,
      subject: "Invitation to Code2Create - A National level Hackathon"

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
