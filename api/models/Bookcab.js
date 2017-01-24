

module.exports = {

  attributes: {

    tra_from : {
      type : 'integer'
    },

    tra_to : {
      type : 'integer'
    },

    tra_date : {
      type : 'date'
    },

    tra_time : {
      type : 'text'
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

    car : {
      type : 'string'
    },

    ac : {
      type : 'boolean'
    },

    people : {
      type : 'integer'
    },

    pickup : {
      type : 'text'
    },

    extra : {
      type : 'text',
      required : false
    }

  }
};

