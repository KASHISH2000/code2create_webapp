

module.exports.sendexternalMail = function(obj) {

  sails.hooks.email.send(
    "externalMail",
    {
    },
    {
      to: user.email,
      subject: "Invitation to Code2Create - A National level Hackathon"

    },

    function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("ACM MAil It worked!");
      }
    }
  )
};
