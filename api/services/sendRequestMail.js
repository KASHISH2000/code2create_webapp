module.exports.sendWelcomeMail = function(email) {

    console.log("Successfully reached");


    sails.hooks.email.send(
        "sendRequestEmail",
        {
            Name : email


        },
        {
            to: email,
            subject: "Welcome to Code2Create"
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

