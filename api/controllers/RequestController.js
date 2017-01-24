var senderid;

module.exports = {

  create : function(req, res, next) {

    // var params = req.params.all();
    //
    // Request.find({
    //   or : [
    //     { name:params.name },
    //     { email:params.email }
    //   ]
    // })
    //   .exec(function (err, requests){
    //     if (err) {
    //       return res.negotiate(err);
    //     }
    //     if (requests.length) {
    //       res.status(400);
    //       return res.json('Request already exists!');
    //     } else {
    //
    //       Request.create(req.params.all(), function requestCreated(err, request) {
    //
    //         if (err) {
    //           //console.log(err);
    //           req.session.flash = {
    //             err: err
    //           };
    //           console.log(err);
    //
    //           return res.redirect('/request/new');
    //         }
    //         res.redirect('/request/showrequest/' );
    //
    //       });
    //
    //
    //
    //     }
    //   });

    Request.create(req.params.all(), function requestCreated(err, request) {

      if (err) {
        //console.log(err);
        req.session.flash = {
          err: err
        };
        console.log(err);

        return res.redirect('/request/new');
      }
      res.redirect('/request/showrequest/' );

    });
  },

  send: function(req, res, next) {
    console.log(req.param('id'));

    Request.findOne(req.param('id'), function foundRequest(err, request) {
      if (err) return next(err);
      console.log(request);
      if (!request) return next();
      res.view({
        request: request,

      });
    });
  },

  showrequest : function(req, res, next){

    Request.find(function foundRequests(err, requests){
      if(err) return next(err);
      res.view({
        requests: requests
      });
    });
  },

  destroy_request: function(req, res, next) {
    Request.findOne(req.param('id'), function foundRequest(err, request) {

      if (err) return next(err);

      if(!request) return next('Request doesn\'t exist ');

      Request.destroy(req.param('id'), function requestDestroyed(err){
        if(err) return next(err);
      });

      res.redirect('/request/showrequest');


    });

  }

};


