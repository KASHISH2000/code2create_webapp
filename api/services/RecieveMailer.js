

module.exports.sendWelcomeMail = function(obj) {

  console.log("Successfully reached");

  console.log(obj.email);

  sails.hooks.email.send(
    "recieveEmail",
    {
      Name : obj.name,
      Email : obj.email,
      Subject : obj.subject,
      Message : obj.message

    },
    {
      to: "hackathon.acmvit@gmail.com",
      subject: obj.subject

    },

    function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("It worked!");
        console.log(obj.email);
      }
    }
  )
};
