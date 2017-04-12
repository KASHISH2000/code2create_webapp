module.exports = function(req, res, next) {

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

  req.session.flash = {
    err: "Sorry, everything is closed!"
  };
  return res.redirect('/user/showall');
  //next();

};