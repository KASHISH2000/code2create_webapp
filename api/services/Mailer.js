

module.exports.sendWelcomeMail = function(obj) {

  sails.hooks.email.send(
    "welcomeEmail",
    {
      Name : obj.name


    },
    {
      to: obj.email,
      subject: "Welcome to Code2Create"
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
