const mongoose = require('mongoose');

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const produceSchema = new Schema({
    name: {type: String, maxlength: 255},
    decreption : {type:String, maxlength:255},
    image: {type:String, maxlength:255},
    video: {type:String, maxlength:255},
    rate: {type:String, maxlength:255},
    slug: {type:String, maxlength:255},
    creatAt :{type:Date, default: Date.now},
    updateAt: {type:Date, default:Date.now}
},{
    
        collation : 'produce'
    })


const produceModel = mongoose.model('produce', produceSchema)


module.exports = produceModel