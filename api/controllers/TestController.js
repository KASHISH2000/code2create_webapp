/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	mail : function (req, res) {
 		user={
 			name:"harshit kedia",
 			email: "harshit.kedia2015@vit.ac.in"
 		};
 		Mailer.sendWelcomeMail(user);
 		res.view();
 	}
 };

