const express  = require('express')
const morgan = require('morgan')
const path = require('path')
const data = require('./data/data')

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views',path.join(__dirname,"views"))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
  return res.render('index',{
     title: "Mini Message",
     messages: data
  })
});

app.get('/new', async(req,res)=>{
    return res.render('form')
})

app.post('/new',(req,res)=>{
  const { messageText , messageUser } = req.body;
  if (! messageText || ! messageUser){
    return res.status(400).send("All fields are required")
  }
  const newMessage = {
    text: messageText,
    user: messageUser,
    added: new Date()
  }
  data.push(newMessage)
  res.render('form')
  return res.redirect('/')
});


app.listen(process.env.PORT||5000)

