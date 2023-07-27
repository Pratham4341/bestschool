const ContactModel = require('../../models/Contact')
const cloudinary =require('cloudinary').v2;

//cloudinary setup
cloudinary.config({ 
    cloud_name: 'dj6vcfw5u', 
    api_key: '739192957314489', 
    api_secret: '8eXVd_5OeDMeiDMfKXoKNRkfPBw' 
  });



class ContactController{

    static addcontact = async(req,res)=>{
        try{
           // res.render('admin/category/addcategory')
            const data = await ContactModel.find()
             console.log(data);
            res.render('admin/contact/addcontact',{d:data})
        }catch (error) {
            console.log(error)
        }
    }

    static insertcontact = async(req,res)=>{
        try{       
            
           
          const result = new ContactModel({
            name:req.body.name,
            email:req.body.email,
               description:req.body.description
          })
          
        await result.save()
        res.redirect('/admin/addcontact')

        }catch (error) {
            console.log(error);
        }
    }
    static viewcontact =async(req,res)=>{
        try{
           const data = await ContactModel.findById(req.params.id)
           res.render('admin/contact/view',{d:data})
        }catch (error) {
            console.log(error);
        }
    }
    static editcontact= async(req,res)=>{
        try{
            // console.log(req.params.id)
             const data = await ContactModel.findById(req.params.id)
            //  console.log(data);
            res.render('admin/contact/edit',{d:data})
        }
        catch(err){
            console.log(err)
        }
    }

    static updatecontact =async(req,res)=>{
        try{
            const id =req.params.id
           const data = await ContactModel.findByIdAndUpdate(id,{
            name:req.body.name,
            address:req.body.address,
            description:req.body.description,
          
            category:req.body.category,
            
         })
            
           
           res.redirect('/admin/addcontact')
        
        }catch (error) {
            console.log(error);
        }
    } 

    static deletecontact= async(req,res)=>{
        try{
            // console.log(req.params.id)
            const id =req.params.id
             const data = await ContactModel.findByIdAndDelete(req.params.id)
             res.redirect('/admin/addcontact')
        }
        catch(err){
            console.log(err)
        }
    }
    

}
module.exports=ContactController