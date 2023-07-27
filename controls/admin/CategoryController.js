const CategoryModel = require('../../models/Category')
const cloudinary =require('cloudinary').v2;

//cloudinary setup
cloudinary.config({ 
    cloud_name: 'dj6vcfw5u', 
    api_key: '739192957314489', 
    api_secret: '8eXVd_5OeDMeiDMfKXoKNRkfPBw' 
  });



class CategoryController{

    static addcategory = async(req,res)=>{
        try{
            const { name, image } = req.data1
           // res.render('admin/category/addcategory')
            const data = await CategoryModel.find()
            // console.log(data);
            res.render('admin/category/addcategory',{ d: data,message:req.flash('success'),n:name,img:image})
        }catch (error) {
            console.log(error)
        }
    }

    static insertcategory = async (req, res) => {
        try {
            // console.log(req.files.image)
            const imagefile = req.files.image

            //imageupload code*******
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: "categoryimage"
            })

            // console.log(image_upload)
            const result = new CategoryModel({
                name: req.body.name,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url
                }
            })

            await result.save()
            res.redirect('/admin/addcategory')

        } catch (error) {
            console.log(error);
        }
    }


    static viewcategory =async(req,res)=>{
        try{
            const { name, image } = req.data1
           const data = await CategoryModel.findById(req.params.id)
           res.render('admin/category/view',{d:data,n:name,img:image})
        }catch (error) {
            console.log(error);
        }
    }
    static editcategory= async(req,res)=>{
        try{
            const { name, image } = req.data1
            // console.log(req.params.id)
             const data = await CategoryModel.findById(req.params.id)
            //  console.log(data);
            res.render('admin/category/edit',{d:data,n:name,img:image})
        }
        catch(err){
            console.log(err)
        }
    }

    static updatecategory =async(req,res)=>{
        try{
            const id =req.params.id
           const data = await CategoryModel.findByIdAndUpdate(id,{
            name:req.body.name,
            address:req.body.address,
            description:req.body.description,
          
            category:req.body.category,
            
         })
            
         req.flash('success','Update Success')
           res.redirect('/admin/addcategory')
        
        }catch (error) {
            console.log(error);
        }
    } 

    static deletecategory= async(req,res)=>{
        try{
            // console.log(req.params.id)
            const id =req.params.id
             const data = await CategoryModel.findByIdAndDelete(req.params.id)
             res.redirect('/admin/addcategory')
        }
        catch(err){
            console.log(err)
        }
    }
    

}
module.exports=CategoryController