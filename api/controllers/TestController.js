/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'send': function (req, res) {
		user={
			name: "harshit test",
			email: "harshit.kedia2015@vit.ac.in"
		};
		 Mailer.sendWelcomeMail(user);
		}
	}

