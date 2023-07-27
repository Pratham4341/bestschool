const mongoose = require('mongoose')

const  Schoolschema = new mongoose.Schema({

name:{
    type:String,
    require:true
},
address:{
    type:String,
    require:true
},
description:{
    type:String,
    require:true
},
instructionMedium:{
    type:String,
    require:true
},
affiliatedBoards:{
      type:String,
      require:true
},
category:{
    type:String,
    require:true
},
phone:{
    type:String,
    require:true
},
image:{
    public_id:{
        type: String,
    },
    url: {
        type: String
    }
},

},{timestamps:true})
const SchoolModel  = mongoose.model('school',Schoolschema)

module.exports = SchoolModel