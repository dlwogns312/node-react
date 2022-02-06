const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config= require('./config/key');

const {auth} = require('./middleware/auth');
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const { response } = require('express');
mongoose.connect(config.mongoURI,
{
 
},
)
.then(()=>console.log('MongoDB Coonected...'))
.catch(err=>console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!~~')
})

app.post('/api/users/register',(req,res)=>{

    const user = new User(req.body)

    user.save((err,uerInfo)=>{
      if(err) return res.json({success: false,err})
      return res.status(200).json({
        success: true
      })
    }) //몽고 db
})

app.post('/api/users/login',(req,res)=>{
  //이메일을 데이터베이스에서 찾기
  User.findOne({email: req.body.email},(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //만약 있다면 비밀번호가 같은지 확인

    user.comparePassword(req.body.password, (err,isMatch)=>{
      if(!isMatch)
      return res.json({loginSuccess:false, message: "비밀번호가 틀렸습니다."})
      
      //비밀번호가 맞다면 token생성
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);

        //토큰을 저장 여러 곳에 저장가능
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      })

    })
    
  })
})

app.get('/api/users/auth',auth,(req,res)=>{

  //여기까지 middleware를 통과했다면 authentication이 true라는 뜻
  res.status(200).json({
    //유저 정보 전달
    _id : req.user._id,
    isAdmin: req.user.role === 0?false:true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname:req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id: req.user._id},{
    token: ""},
    (err,user)=>{
      if(err) return res.json({success:false,err});
      return res.status(200).send({
        success:true
      })
    })
})

app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})