const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const { response } = require('express');
mongoose.connect('mongodb+srv://dlwogns312:dlqhdtjq5@coje.egm6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
 
},
)
.then(()=>console.log('MongoDB Coonected...'))
.catch(err=>console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',(req,res)=>{

    const user = new User(req.body)

    user.save((err,uerInfo)=>{
      if(err) return res.json({success: false,err})
      return res.status(200).json({
        success: true
      })
    }) //몽고 db
})
app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})