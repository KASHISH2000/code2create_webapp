var request = require('request');

module.exports.verify = function (obj) {
  var toreturn=true;
  request.post({
    url: 'https://www.google.com/recaptcha/api/siteverify', form:{secret: obj.secret, response: obj.response, remoteip: obj.remoteip}

  }, function Callback(err, httpResponse, body) {
    if (err) {
      console.error('upload failed:', err);
      toreturn=false;
      return false;
    }
    console.log('Upload successful!  Server responded with:', body);
    var body_json=JSON.parse(body);
    console.log("The body.success is:",body_json.success);
    if(body_json.success) {
      console.log("Its Success!!!!!");
      toreturn=true;
      return true;
    }
    else
    {
      console.log("Its Failure!!!!!");
      toreturn=false;
      return false;
    }
  });
  console.log("Reached End!");
  return toreturn;
}
