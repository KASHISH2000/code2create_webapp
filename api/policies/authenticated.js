module.exports = function(req, res, ok) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return ok();
  }

  else{
    var requireLoginError = [{name:'requireLogin',message:'You must be signed in'}];
    req.session.flash = {
      err: requireLoginError
    };
    res.redirect('/session/new');
    return;
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
};
