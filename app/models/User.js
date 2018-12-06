'use strict'
/**
 * Module Dependencies
 */

const mongoose = require('mongoose')
var passportLocalMongoose = require("passport-local-mongoose");

  

let userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  email: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  createdOn :{
    type:Date,
    default:""
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  friendsList :{
    type : Array,
    default:null
  },
  friendRequest: {
    type : Array,
    default:null
  }

})

userSchema.plugin(passportLocalMongoose)
mongoose.model('User', userSchema);