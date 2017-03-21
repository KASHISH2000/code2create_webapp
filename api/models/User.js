
module.exports = {
  schema : true,

  attributes: {

    uid: 'STRING',

    name : {
      type : 'string',
      required : true
    },

    email : {
      type: 'string',
      email : true,
      required: true,
      unique : true
    },

    phone : {
      type : 'integer'
    },


    encryptedPassword: {
      type: 'string'
    },



    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj._csrf;
      return obj;
    }
  },


};

