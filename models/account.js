const express = require('express')
const mongoose = require('mongoose')
const app = express()
const passportLocalMongoose = require('passport-local-mongoose')
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  app.use(require("express-session")({
  secret:"Any normal Word",//decode or encode session
      resave: false,          
      saveUninitialized:false 
}));

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    name     : String ,
    email    : String ,
    username : String,
    password : String
}, {
    collation : 'account'
})


const AccountModel = mongoose.model('account', AccountSchema)

module.exports  = AccountModel
