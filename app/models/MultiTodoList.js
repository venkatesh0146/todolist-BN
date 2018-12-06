'use strict'
/**
 * Module Dependencies
 */

const mongoose = require('mongoose')


  

let multiTodoSchema = new mongoose.Schema({
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
  owners:{
    type : Array
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


mongoose.model('MultiTodo', multiTodoSchema);







