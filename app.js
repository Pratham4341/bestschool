const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const fileUpload = require('express-fileupload')
let  session = require('express-session')
let flash = require('connect-flash')
const cookieParser = require('cookie-parser')


// cookie
app.use(cookieParser())

app.use(session({
    secret: 'secret',
    cookie: {maxAge:60000},
    resave: false,
    saveUninitialized:false
}));

app.use(flash());

//image uplaod code
app.use(fileUpload({
    useTempFiles : true,
    
}));



//database connection
const connectDB = require('./db/connectdb')
connectDB()

//parse application
app.use(express.urlencoded({ extended:true}))

//static files
app.use(express.static('public'))


//ejs html css
app.set('view engine', 'ejs')




//load route
app.use('/',web)



app.listen(port,()=>{
    console.log(`port start a ${port}`)
})















































































