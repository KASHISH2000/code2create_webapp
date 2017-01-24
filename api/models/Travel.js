
module.exports = {

  schema:true,

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

    visible_email : {
      type: 'boolean'
    },

    visible_phone : {
      type : 'boolean'
    },



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
      }





}
};

