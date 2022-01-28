const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://dlwogns312:dlqhdtjq5@coje.egm6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
 
},
)
.then(()=>console.log('MongoDB Coonected...'))
.catch(err=>console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})