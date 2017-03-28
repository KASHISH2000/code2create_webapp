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
 			email: "pranaygupta08@gmail.com"
 		};
 		Mailer.sendWelcomeMail(user);
 		res.view();
 	}
 };

