
module.exports = {

  attributes: {

    memberAccepted : {
      type : 'array',
      required : false
  },
    admin : {
      type : 'string',
      required : false,
      unique: true
    },

    teamName : {
      type : 'string',
      required : true,
      unique : true
    },

    memberSend : {
      type : 'array',
      required : false,
      defaultsTo : []
    },

    reciever : {
      type : 'string',
      required : false
    },

    arvr : {
      type : 'string',
      required : true
    },

    helc : {
      type : 'string',
      required : true
    },

    fint : {
      type : 'string',
      required : true
    },

    clen : {
      type : 'string',
      required : true
    },

    teamAdmin : {
      type : 'string',
      required : false,
       unique: true
    },

    description : {
      type : 'text',
      required : false
    },

    //to whom i am sending request

    checkmembers : function (userid) {




    }


  }

};

