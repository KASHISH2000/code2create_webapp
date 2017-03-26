module.exports.sendWelcomeMail = function(reciever) {

    console.log("Successfully reached");


    sails.hooks.email.send(
        "welcomeEmail",
        {
            Name : reciever


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
                console.log(obj.email);
            }
        }
    )
};

