
// module.exports = {

	// 'teaminfo':function(req,res,next){
	// 	var json_toret;
	// 	var teamname=req.param('id');
	// 	Team.findOne({
	// 		teamName : teamname
	// 	}).exec(function(err, team) {
	// 		if (err) {
	// 			req.session.flash = {
	// 				err : "Sorry, Error in finding team"
	// 			};
	// 			return res.redirect('/team/showall');;
	// 		}
	// 		if (!team) {
	// 			req.session.flash = {
	// 				err : "Sorry, No team found"
	// 			};
	// 			return res.redirect('/team/showall');
	// 		}
	// 		json_toret.teamname=teamname;
	// 		json_toret.teamname=teamname;
	// 		var memberAccepted = team.memberAccepted;
	// 		for(i=0;i<memberAccepted.length;i++){
	// 			var userid=memberAccepted[i];
	// 			User.findOne({
	// 				id : 
	// 			}).exec(function(err, team) {
	// 			}
	// 		}
	// 	}
	// }