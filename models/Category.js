const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name:{
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
   

},{timestamps: true})
const CategoryModal = mongoose.model('Category',CategorySchema)

module.exports = CategoryModal