/**
 * Quiz.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    question : {
      type : 'array'
    },

    questionResponse : {
      type : 'array'
    },

    questionName : {
      type : 'text',
    },

    options : {
      type : 'array'
    },

    op1 : {
      type : 'string'
    },

    op2 : {
      type : 'string'
    },

    op3 : {
      type : 'string'
    },

    op4 : {
      type : 'string'
    },

    userid : {
      type : 'string'
    },

    answer : {
      type : 'string'
    },

    responseTime : {
      type : 'string'
    }


  }


};

