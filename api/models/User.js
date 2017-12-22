
module.exports = {
  schema : true,

  attributes: {

    uid: 'STRING',

    name : {
      type : 'string',
      required : true
    },

    regno : {
      type : 'string',
      required : true
    },

    phoneno : {
      type : 'integer',
      required : true
    },

    email : {
      type: 'string',
      email : true,
      required: true,
      unique : true

    },

    username : {
      type : 'string',
      required : true,
      unique : true
    },

    internal_external : {
      type : 'string',
      required : true
    },

    college_name : {
      type : 'string',
      required : false

    },

     college_city : {
      type : 'string',
      required : false

    },

    living : {
      type : 'string',
      required : false
    },

    block : {
      type : 'string',
      required : false
    },
    roomno : {
      type : 'string',
      required : false
    },

    description : {
      type : 'text',
      required : false

    },


    github : {
      type : 'string',
      url : true,
      required : false
    },

    linkedin : {
      type : 'string',
      url : true,
      required : false
    },

    token : {
      type : 'string'
    },

    gender : {
      type : 'string',
      required : true
    },

    encryptedPassword: {
      type: 'string'
    },

    admin : {
      type : "boolean",
      defaultsTo : true
    },



    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj._csrf;
      return obj;
    }
  },

  beforeCreate: function (values, next) {
    if (!values.password || values.password != values.confirmation) {
      return next({passworderror: ["Password doesn't match password confirmation."]});
    }

    require('bcryptjs').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  },

  beforeUpdate: function(values, next) {
    console.log(values.password);

    if(values.password) {
      require('bcryptjs').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
        if (err) return next(err);
        values.encryptedPassword = encryptedPassword;
        next();
      });
    } else {
      next();
    }
  },


};
