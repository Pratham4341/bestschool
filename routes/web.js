const express = require('express')
const AdminController = require('../controls/admin/AdminController')
const SchoolController = require('../controls/admin/SchoolController')
const FrontController = require('../controls/FrontController')
const CategoryController = require('../controls/admin/CategoryController')
const AboutController = require('../controls/admin/AboutController')
const ContactController = require('../controls/admin/ContactController')
const route = express.Router()
const checklogin =require('../middleware/auth')
const SliderController = require('../controls/admin/SliderController')
const BookController = require('../controls/admin/BookController')

//frontcontroller route
route.get('/',FrontController.home)
route.get('/contact',FrontController.contact)
route.get('/login',FrontController.login)
route.get('/schooldetail/:id',FrontController.schooldetail)
route.get('/school_list/:id',FrontController.schoollist)

//admin port
route.get('/admin/dashboard',checklogin,AdminController.dashboard)
route.get('/register',AdminController.register)
route.post('/admininsert',AdminController.admininsert)
route.post('/verify_login',AdminController.verify_login)
route.get('/logout',AdminController.logout)


//addschool controller
route.get('/admin/addschool',checklogin,SchoolController.addschool)
route.post('/admin/insertschool',checklogin,SchoolController.insertschool)
route.get('/admin/schoolView/:id',checklogin,SchoolController.viewschool)
route.get('/admin/schoolEdit/:id',checklogin,SchoolController.editschool)
route.post('/admin/schoolupdate/:id',checklogin,SchoolController.updateschool)
route.get('/admin/schoolDelete/:id',checklogin,SchoolController.deleteschool)

//admin/category controller
route.get('/admin/addcategory',checklogin,CategoryController.addcategory)
route.post('/admin/insertcategory',checklogin,CategoryController.insertcategory)
route.get('/admin/categoryView/:id',checklogin,CategoryController.viewcategory)
route.get('/admin/categoryEdit/:id',checklogin,CategoryController.editcategory)
route.post('/admin/categoryUpdate/:id',checklogin,CategoryController.updatecategory)
route.get('/admin/categoryDelete/:id',checklogin,CategoryController.deletecategory)


//admin/about controller
route.get('/admin/addabout',checklogin,AboutController.addabout)
route.post('/admin/insertabout',checklogin,AboutController.insertabout)
route.get('/admin/aboutView/:id',checklogin,AboutController.viewsabout)
route.get('/admin/aboutEdit/:id',checklogin,AboutController.editsabout)
route.get('/admin/aboutUpdate/:id',AboutController.upadateabout)
route.get('/admin/aboutDelete/:id',AboutController.deleteabout)

//admin/contact controller
route.get('/admin/addcontact',checklogin,ContactController.addcontact)
route.post('/admin/insertcontact',checklogin,ContactController.insertcontact)
route.get('/admin/contactView/:id',checklogin,ContactController.viewcontact)
route.get('/admin/contactEdit/:id',checklogin,ContactController.editcontact)
route.post('/admin/contactUpdate/:id',checklogin,ContactController.updatecontact)
route.get('/admin/contactDelete/:id',checklogin,ContactController.deletecontact)


//admin/slider controller
route.get('/admin/addslider',checklogin,SliderController.addslider)
route.post('/admin/insertslider',checklogin,SliderController.insertslider)
route.get('/admin/Sliderview/:id',checklogin,SliderController.viewslider)
route.get('/admin/SliderEdit/:id',checklogin,SliderController.editslider)
route.post('/admin/Sliderupdate/:id',checklogin,SliderController.updateslider)
route.get('/admin/Sliderdelete/:id',checklogin,SliderController.deleteslider)






module.exports = route