

module.exports.sendWelcomeMail = function(details) {

  length = details[2].length;
  //console.log(details[2][length-5]);

  if(details[2][length-5] == 'a') {
    if(details[2][length-4] == 'c') {


      sails.hooks.email.send(
        "passwordChange",
        {

          id: details[0],
          Name: details[1]

        },
        {
          to: details[2],
          subject: "Change Password ASAP"
        },

        function (err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("It worked!");
          }
        }
      )
    }
  }

};
