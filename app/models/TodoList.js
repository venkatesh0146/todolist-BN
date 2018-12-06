'use strict'
/**
 * Module Dependencies
 */

const mongoose = require('mongoose')


  

let todoSchema = new mongoose.Schema({
    todoListName : {
        type : String,
        default : ''
    },
  todoId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  tasks :{type: Object} ,
  createdOn :{
    type:Date,
    default:""
  },
  createdBy : {
      type : String
  }
})


mongoose.model('Todo', todoSchema);







