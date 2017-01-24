module.exports = {
  'new' : function (req, res) {
     res.view();

  },





  create : function(req, res, next) {

    User.create(req.params.all(), function userCreated(err, user) {
      if (err) {
        //console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/user/new');
      }

      req.session.authenticated = true;
      req.session.User = user;




      res.redirect('/user/showall');

    });
  },

  show: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },


  showall : function(req, res, next){

    User.find(function foundUsers(err, users){
      if(err) return next(err);
      res.view({
        users: users
      });
    });
  },

  send: function(req, res, next) {
    console.log(req.param('id'));

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },



  // // //this function is used for returning all the users in form of array.
  // //
  // edit : function(req, res, next){
  //   User.findOne(req.param('id'), function foundUser (err, user){
  //     //find the user by id
  //     if(err) return next(err);
  //     if(!user) return next();
  //
  //     res.view({
  //       user : user
  //     });
  //   });
  // },
  //
  // edit_password : function(req, res, next){
  //   User.findOne(req.param('id'), function foundUser (err, user){
  //     //find the user by id
  //     if(err) return next(err);
  //     if(!user) return next();
  //
  //     res.view({
  //       user : user
  //     });
  //   });
  // },
  //
  // update : function(req,res,next){
  //
  //
  //
  //   User.update(req.param('id'),req.params.all(), function userUpdated(err){
  //     if(err){
  //       return res.redirect('/user/edit/'+req.param('id'));
  //     }
  //     res.redirect('/user/show/'+req.param('id'));
  //   });
  // },
  //
  //
  // destroy: function(req, res, next) {
  //   User.findOne(req.session.User.id, function foundUser(err, user) {
  //
  //     if (err) return next(err);
  //
  //     if(!user) return next('User doesn\'t exist ');
  //
  //     User.destroy(req.param('id'), function userDestroyed(err){
  //       if(err) return next(err);
  //     });
  //
  //     res.redirect('/user/index');
  //
  //
  //   });
  //
  // }
};





