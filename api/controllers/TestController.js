/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 pravega=pravega_subscribe.pravega();
 module.exports = {
 	welcomemail : function (req, res) {
 		user={
 			name:"harshit kedia",
 			email: "pranaygupta08@gmail.com"
 		};
 		Mailer.sendWelcomeMail(user);
 		res.view();
 	},
 	acmermail : function (req, res) {
 		user={
 			email: "pranaygupta08@gmail.com"
 		};
 		AcmerMailer.sendacmersMail(user);
 		res.view();
 	},
 	externalmail : function (req, res) {
 		user={
 			email: "abhinav.adtechs@gmail.com"
 		};
 		ExternalMailer.sendexternalMail(user);
 		res.view();
 	},
 	allmail : function (req, res) {
 		user={
 			email: "harshit.kedia2015@vit.ac.in"
 		};
 		invitationAllMailer.sendinviteMail(user);
 		res.view();
 	},
 	pravega:function(req,res){
 		
 	}
 };

