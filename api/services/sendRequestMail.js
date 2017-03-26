module.exports.sendWelcomeMail = function(email) {

    console.log("Successfully reached");
    console.log(email);


    sails.hooks.email.send(
        "sendRequestEmail",
        {
            Email : email


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
                console.log(email);
            }
        }
    )
};

