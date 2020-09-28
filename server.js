const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')
const MemberModel = require('./models/member')
const path = require('path')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/my_database");
app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));
const route = require('./routers')
//const {mutipleMongooseToObject} = require('./unti/mongoose')
const {a} = require('./unti/mongoose')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
const produce = require('./models/produce')
const rout = require('./routers/index')
app.set('view-engine','ejs')
app.set('view-engine','hbs')
// app.get('/', (req,res,next)=>{
//        produce.find({})
//        .then(produces =>{
//            produces = produces.map(produce => produce.toObject()) 
//             res.render('demo.ejs',{ produces})
//         })
       
        

//        .catch(next)
// //    res.render('home.ejs')

//     })

route(app)

app.get('/',(req,res,next)=>{
    produce.find({})
    
    .then(produces => {
        //produces  = produces.map(produce => produce.toObject() )
        res.render('home.hbs',{
       
            produces: a(produces)
        }) 
    })
    .catch(next)
})
// app.get('/:slug',(req,res,next)=>{
//     res.send('hello')
// })
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'home2.html'))
})
app.get('/muahang',(req,res)=>{
    res.render('muahang.hbs')
})



app.post('/login', function(req,res,next){
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username,
        password: password

    })
    .then(data=>{
        if(data){
            var token  = jwt.sign({
                _id: data._id
            }, 'mk' )
            return res.json({
                message: 'thanh cong',
                token: token
            })
        } else{
            return res.status(300).json('Dang nhap that bai')
        }
    })
    .catch(err=>{
        res.status(500).json('Co loi ben server')
    })
})




app.get('/register',(req,res,)=>{
    res.sendFile(path.join(__dirname,'register.html'))
})


app.post('/muahang', function(req,res,next){
    var name = req.body.name
    var age = req.body.age
    var address = req.body.address
    var  email= req.body.email
    //var  httt = req.body.httt
    MemberModel.findOne({
        name :name
    })
    .then(data=>{
        if(data){
            res.json('Thong tin nay da ton tai')
        }
        else{
            return MemberModel.create({
                name : name,
                age:age,
                address:address,
                email : email
                
                //httt: httt
        
    })
}
    })
    .then(data=>{
        res.json('Tao thong tin thanh cong')
    })
    .catch(err=>{
     res.send('Tao thong tin khong thanh cong')
    })
    
})

app.post('/register', function(req,res,next){
    var name = req.body.name
    var email = req.body.email
    var username = req.body.username
    var password = req.body.password
    AccountModel.findOne({
        username :username
    })
    .then(data=>{
        if(data){
            res.json('User nay da ton tai')
        }
        else{
            return AccountModel.create({
                name : name,
                email : email,
                username : username,
                password: password
            })
        }
    })
    .then(data=>{
        res.json('Tao tai khoan thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Tao tai khoan khong thanh cong')
    })
    
})

// Route init 

// route(app)
app.get('/private',(req,res,next)=>{
    try {

         var token = req.cookies.token
         var ketqua = jwt.verify(token,'mk')
        if(ketqua){
            next()
        }
    } catch (error) {
        return res.redirect('/login')
    }
}, (req,res,next)=>{
    res.json('welcome')
})


// app.get('/search',(req,res,)=>{
//     res.sendFile(path.join(__dirname,'search.html'))
// })
app.get('/search',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'search.html'))
})


var accountRouter = require('./routers/account')
app.use('/api/account/', accountRouter)

var MemberRouter = require('./routers/member')
app.use('/api/member/', MemberRouter)


app.listen(4000, ()=>{
    console.log('Start server on')
})