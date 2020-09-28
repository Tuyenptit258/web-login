const mongoose = require('mongoose');

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MemberSchema = new Schema({
    name: {type: String, maxlength: 255},
    age : {type:String, maxlength:255},
    address: {type:String, maxlength:255},
    email:{type:String , maxlength:255}
    //httt:{type:String, maxlength:255}
    // creatAt :{type:Date, default: Date.now},
    // updateAt: {type:Date, default:Date.now}
},{
    
        collation : 'members'
    })


const MemberModel = mongoose.model('members', MemberSchema)


module.exports = MemberModel