/**
 * Showrequest.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var err1;

module.exports = {

  attributes: {

    sender : {
      type : 'string'
    },

    reciever : {
      type : 'string'
    },

    name : {
      type : 'string',
      required : true
    },

    email : {
      type: 'string',
      email : true,
    },

    phone : {
      type : 'integer'
    },

  }


  // beforeCreate: function(values, next){
  //   console.log("Entered into beforeCreate funciton");
  //   Request.findOne({ where: { name: values.name}}).exec(function(err, found) {
  //     if(found == undefined){
  //       console.log("NOT FOUND"); //create the record
  //       next();
  //     }
  //     else{
  //       console.log("FOUND"); //don't create the record
  //       err1 = 1;
  //     }
  //
  //   });
  // }


};

