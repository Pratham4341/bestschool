const AboutModel = require('../../models/About')
const cloudinary =require('cloudinary').v2;

//cloudinary setup
cloudinary.config({ 
    cloud_name: 'dj6vcfw5u', 
    api_key: '739192957314489', 
    api_secret: '8eXVd_5OeDMeiDMfKXoKNRkfPBw' 
  });


class AboutController{

static addabout = async(req,res)=>{
    try{
        const data = await AboutModel.find()
        // console.log(data);
        res.render('admin/about/addabout',{ d: data,message:req.flash('success')})
    }
    catch(err){
        console.log(err)
    }
}

static insertabout = async(req,res)=>{
    try {
        //  console.log(req.files.image)
        //  const imagefile = req.files.image
        //  //image upload code
        //  const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
        //   folder:"aboutImage"
        //  })
        //  console.log(image_upload)

         const result =new AboutModel({
         name:req.body.name,
            
          })
          await result.save()
           res.redirect('/admin/addabout')

    } catch (error) {
        console.log(error)
    }
}

static viewsabout= async(req,res)=>{
    try{
        // console.log(req.params.id)
         const data = await AboutModel.findById(req.params.id)
         console.log(data);
        //  res.render('admin/about/addabout',{d:data})
    }
    catch(err){
        console.log(err)
    }
}

static editsabout= async(req,res)=>{
    try{
        // console.log(req.params.id)
         const data = await AboutModel.findById(req.params.id)
        //  console.log(data);
        res.render('admin/about/edit',{d:data})
    }
    catch(err){
        console.log(err)
    }
}

static upadateabout= async(req,res)=>{
    try{
        // console.log(req.params.id)
        const id =req.params.id
         const data = await AboutModel.findByIdAndUpdate(id,{
            name:req.body.name,
            
         })
         req.flash('success','Update Success')
         res.redirect('/admin/addabout')
    
    }
    catch(err){
        console.log(err)
    }

}

static deleteabout= async(req,res)=>{
    try{
        // console.log(req.params.id)
        const id =req.params.id
         const data = await AboutModel.findByIdAndDelete(req.params.id)
         res.redirect('/admin/addabout')
    }
    catch(err){
        console.log(err)
    }
}
}
module.exports = AboutController