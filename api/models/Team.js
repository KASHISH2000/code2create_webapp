
module.exports = {

  attributes: {

    memberAccepted : {
      type : 'array',
      required : false
  },
    admin : {
      type : 'integer',
      required : false
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
      required : false
    },

    description : {
      type : 'text',
      required : false
    }

    //to whom i am sending request


  }

};

