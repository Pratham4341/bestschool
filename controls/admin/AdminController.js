const AdminModel = require('../../models/Admin')
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//cloudinary setup
cloudinary.config({
    cloud_name: 'dj6vcfw5u',
    api_key: '739192957314489',
    api_secret: '8eXVd_5OeDMeiDMfKXoKNRkfPBw'
});
class AdminController {

    static dashboard = async (req, res) => {
        try {
            // console.log(req.body)
            const{name,image} =req.data1
            
            res.render('admin/dashboard',{n:name,img:image})
        }
        catch (err) {
            console.log(err)
        }
    }

    static register = async (req, res) => {
        try {
            res.render('admin/register', { message: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }

    
    
    static admininsert = async (req, res) => {
        try {

            // console.log(req.files.image)
            const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: "admin"
            })
            // console.log(image_upload)
            // console.log(req.body)
            const { name, email, password, cpassword,image } = req.body
            const admin = await AdminModel.findOne({ email: email })
            //console.log(admin);
            if (admin) {
                req.flash('error', "email already exists");
                res.redirect('/register')

            } else {
                if (name && email && password && cpassword) {
                    if (password == cpassword) {
                        try{
                            const hashpassword = await bcrypt.hash(password,10)
                            const result = new AdminModel({
                                    name:name,
                                    email:email,
                                    password:hashpassword,
                                    image: {
                                        public_id: image_upload.public_id,
                                        url: image_upload.secure_url
                                    }
                            })
                            await result.save()
                            req.flash('success',"registeration succesfull")
                            res.redirect('/login')


                        }catch(error){
                            console.log(error)
                        }

                    } else {
                        req.flash('error', "password & confirm password not found");
                        res.redirect('/register')
                    }

                } else {
                    req.flash('error', "All feilds are required");
                    res.redirect('/register')
                }
            }
            // const result = new AdminModel({
            //     name:req.body.name,
            //     email:req.body.email,
            //     password:req.body.password,
            //     image: {
            //         public_id: image_upload.public_id,
            //         url: image_upload.secure_url
            //     }

            // })
            // await result.save()
            // res.redirect('/login')

        } catch (error) {
            console.log(error)
        }
    }

   
    static verify_login = async (req, res) => {
        try {
        //    console.log(req.body)
        const {email,password} =req.body
        if (email && password){

        const admin = await AdminModel.findOne({email:email})
        // console.log(user)
        if (admin != null){
        const ismatch = await bcrypt.compare(password,admin.password)
        if (ismatch){
            var token = jwt.sign({ Id: admin._id }, 'pnffnid1234563nwnevwvwvwv');
            // console.log(token);
            res.cookie("token",token)
            res.redirect('/admin/dashboard')
        }else{
            req.flash('error', "email or password are not valid");
            res.redirect('/login')  
        }
        }else{
            req.flash('error', "you are not register user");
            res.redirect('/login')
        }
        }else{
            req.flash('error', "All feilds are required");
            res.redirect('/login')
        }

        } catch (error) {
            console.log(error)
        }
    }


 static logout = async (req, res) => {
        try {
            res.clearCookie("token")
            res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AdminController
























