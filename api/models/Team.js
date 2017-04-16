
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

    track : {
      type : "string"
    },

    description : {
      type : 'text',
      required : false
    },

    problemStatement : {
      type : "text",
      defaultsTo : "a"
    },

    uniqueness : {
      type : "float"
    },

    feasibility : {
      type : "float"
    },


    implementation : {
      type : "float"
    },


    solution : {
      type : "float"
    },


    presentation : {
      type : "float"
    },


    ui : {
      type : "float"
    },

    judge : {
      type : "array",
      defaultsTo : [],
    },

    Score : {
      type : 'array',
      required : false
    },

    bool : {
      type : "boolean",
      defaultsTo : false
    }


  }

};

