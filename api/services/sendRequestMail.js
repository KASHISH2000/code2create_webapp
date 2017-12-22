module.exports.sendWelcomeMail = function(sendername, receivername, useremail) {

    sails.hooks.email.send(
        "sendRequestEmail",
        {
            sendername : sendername,
            receivername : receivername,
            useremail : useremail

        },
        {
            to: useremail,
            subject: "New Invitation for joining team in Code2Create"
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

