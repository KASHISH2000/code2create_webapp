

module.exports.sendWelcomeMail = function(obj) {

  sails.hooks.email.send(
    "recieveEmail",
    {
      Name : obj.name,
      Email : obj.email,
      Subject : obj.subject,
      Message : obj.message

    },
    {
      to: "vituacm@gmail.com",
      subject: obj.subject

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
