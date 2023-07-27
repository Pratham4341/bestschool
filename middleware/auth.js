 const AdminModel = require('../models/Admin')
const jwt = require('jsonwebtoken')


const checklogin = async(req,res,next) =>{
//   console.log("hello admin")

const {token}=req.cookies;
// console.log(token);
if(!token){
req.flash('error','Unauthorized user,Please Login!')
return res.redirect('/login')
}else{
    const verify_token = jwt.verify(token,'pnffnid1234563nwnevwvwvwv')
    // console.log(verify_token);
    const data = await AdminModel.findOne({_id:verify_token.Id})
    // console.log(data)
    req.data1 = data;
    

    next()
}
}
module.exports = checklogin