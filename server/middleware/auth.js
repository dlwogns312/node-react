const { User } = require("../models/User");

let auth = (req,res,next)=>{

    //인증처리 진행
    

    //클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;

    //토큰을 복호화하고 유저를 찾음
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false,error:true})

        req.token=token;
        req.user=user;
        next();

    })
    //유저가 없으면 인증 진행하지 않는다
}

module.exports={auth}