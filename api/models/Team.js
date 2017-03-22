
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
      required : true
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
    //to whom i am sending request


  }

};

