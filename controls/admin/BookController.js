const BookModel = require("../../models/BOOK.JS")

class BookController{

    static insertbook = async (req, res) => {
        try {
            console.log(req.body)
            

            const result = new BookModel({
                name: req.body.name,
                email: req.body.email,
                phone:req.body.phone,
                address:req.body.address

               
            })
            await result.save()
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    }


}
module.exports=BookController