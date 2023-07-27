const SchoolModel = require('../../models/School')
const cloudinary = require('cloudinary').v2;
const category = require('../../models/Category');
const CategoryModal = require('../../models/Category');

//cloudinary setup
cloudinary.config({
    cloud_name: 'dj6vcfw5u',
    api_key: '739192957314489',
    api_secret: '8eXVd_5OeDMeiDMfKXoKNRkfPBw'
});


class SchoolController {

    static addschool = async (req, res) => {
        try {
            const { name, image } = req.data1
            const data = await SchoolModel.find()
            const category = await CategoryModal.find()
            // console.log(data);
            res.render('admin/school/addschool', { d: data, message: req.flash('success'),n:name,img:image,c:category})
        }
        catch (err) {
            console.log(err)
        }
    }

    static insertschool = async (req, res) => {
        try {
            // console.log(req.files.image)
            const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: "schoolImage"
            })
            // console.log(image_upload)

            const result = new SchoolModel({
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                instructionMedium: req.body.instructionMedium,
                affiliatedBoards: req.body.affiliatedBoards,
                category: req.body.category,
                phone: req.body.phone,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url
                }
            })
            await result.save()
            res.redirect('/admin/addschool')

        } catch (error) {
            console.log(error)
        }
    }

  

    static viewschool = async (req, res) => {
        try {
            // console.log(req.params.id)
            const { name, image } = req.data1
            const data = await SchoolModel.findById(req.params.id)
            // console.log(data);
            res.render('admin/school/view', { d: data ,n:name,img:image})
        }
        catch (err) {
            console.log(err)
        }
    }

    static editschool = async (req, res) => {
        try {
            // console.log(req.params.id)
            const { name, image } = req.data1
            const data = await SchoolModel.findById(req.params.id)
            //  console.log(data);
            res.render('admin/school/edit', { d: data,n:name,img:image })
        }
        catch (err) {
            console.log(err)
        }
    }

    //  static upadateschool = async (req, res) => {
    //     try {
    //        // console.log(req.files.image)
    //         if (req.files) {
    //             const school = await SchoolModel.findById(req.params.id)
    //             const imageid = school.image.public_id


    //             //  console.log(imageid)
    //             // image delete code
    //             await cloudinary.uploader.destroy(imageid)
    //             const imagefile = req.files.image
    //             //image upload code
    //             const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
    //                 folder: "schoolImage"
    //             })

    //             var data = {
    //                 name: req.body.name,
    //                 address: req.body.address,
    //                 description: req.body.description,
    //                 instructionMedium: req.body.instructionMedium,
    //                 caffiliatedBoards: req.body.affiliatedBoards,
    //                 category: req.body.category,
    //                 phone: req.body.phone,
    //                 image: {
    //                     public_id: image_upload.public_id,
    //                     url: image_upload.secure_url
    //                 }
    //             }

    //         } else {
    //             var data = {
    //                 name: req.body.name,
    //                 address: req.body.address,
    //                 description: req.body.description,
    //                 instructionMedium: req.body.instructionMedium,
    //                 caffiliatedBoards: req.body.affiliatedBoards,
    //                 category: req.body.category,
    //                 phone: req.body.phone,
    //             }
    //             const id = req.params.id
    //             await SchoolModel.findByIdAndUpdate(id, data)
    //             req.flash('success','Update Success')
    //             res.redirect('/admin/addschool')
    //         }

    //     }
    //     catch (err) {
    //         console.log(err)
    //     }

    // }

    static updateschool = async (req, res) => {
        try {
            // console.log(req.files.image)
            if (req.files) {
                const school = await SchoolModel.findById(req.params.id)
                const imageid = school.image.public_id

                // console.log(imageid)

                await cloudinary.uploader.destroy(imageid)



                //second update,age

                const imagefile = req.files.image
                //image upload code
                const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                    folder: "schoolImage"
                })


                var data = {
                    name: req.body.name,

                    description: req.body.description,
                    affilatedboard: req.body.affilatedboard,
                    instructionMedium: req.body.instructionMedium,
                    category: req.body.category,
                    schoolAddress: req.body.schoolAddress,
                    phoneNumber: req.body.phoneNumber,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url
                    }

                }

            } else {
                var data = {
                    name: req.body.name,

                    description: req.body.description,
                    affilatedboard: req.body.affilatedboard,
                    instructionMedium: req.body.instructionMedium,
                    category: req.body.category,
                    schoolAddress: req.body.schoolAddress,
                    phoneNumber: req.body.phoneNumber,


                }
            }
            const id = req.params.id
            await SchoolModel.findByIdAndUpdate(id, data)
            req.flash('success', 'Update success')
            res.redirect('/admin/addschool')

        } catch (error) {
            console.log(error)
        }

    }

    static deleteschool= async(req,res)=>{
        try{
            // console.log(req.params.id)
            const id =req.params.id
             const data = await SchoolModel.findByIdAndDelete(req.params.id)
             res.redirect('/admin/addschool')
        }
        catch(err){
            console.log(err)
        }
    }
}
module.exports = SchoolController