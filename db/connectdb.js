const mongoose = require('mongoose')

const local_url="mongodb://127.0.0.1:27017/bestschool"
const live_url="mongodb+srv://prathamsharma4341:pratham9425@cluster0.upelc76.mongodb.net/bestschool?retryWrites=true&w=majoritys"

const connectDB = ()=>{
    return mongoose.connect(live_url)
    .then(()=>{
        console.log("Connected Succesfuly")
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports = connectDB