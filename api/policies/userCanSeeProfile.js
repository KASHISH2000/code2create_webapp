/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 */

module.exports = function(req, res, ok) {

  // var sessionUserMatchesId = req.session.User.id === req.param('id');
  // var isAdmin = req.session.User.admin;

  var sessionUserMatchesId = (req.session.User);
  // The requested id does not match the user's id,
  // and this is not an admin
  if (!(sessionUserMatchesId)) {
    var noRightsError = [{name: 'noRights', message: 'Please Login or Register'}];
    req.session.flash = {
      err: "Please Login or Register"
    };
    res.redirect('/session/new');
    return;
  }

  ok();

};
