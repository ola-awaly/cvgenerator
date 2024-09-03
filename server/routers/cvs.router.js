console.log("dans cvs router");
const express = require("express")
const router = express.Router()

const {checkRights,checkRightsUser}=require("../middlewares/cvs")
const multer = require('multer')
const cvsController = require("../controllers/cvs.controller");
const multerConfig = require("../middlewares/multer-config");
const multerPdf=require("../middlewares/multer-pdf")
const {uploadPic,uploadPdf}=require("../middlewares/photo")

router.get("/",checkRights,cvsController.getAll)  // que l'admin
router.get("/:id",checkRights,cvsController.getOne)     // l'admin et le owner du cv
router.get("/full/:id",checkRights,cvsController.getFullOne)     // l'admin et le owner du cv
router.get("/duplicate/:id",checkRights,cvsController.duplicate)     // l'admin et le owner du cv
router.post("/",cvsController.new)   // n'importe qui de loggé
router.post("/photo/:id",checkRights,multerConfig,cvsController.setPhoto)
router.post("/photo64/:id",checkRights,uploadPic,cvsController.setPhoto64)
router.patch("/:id",checkRights,cvsController.update)   // l'admin et le owner du cv
router.delete("/:id",checkRights,cvsController.delete)  // l'admin et le owner du cv
router.get("/user/:id",checkRightsUser,cvsController.getByUserId)     // l'admin 
 router.post("/sendByMail/:id",cvsController.sendByMail)   // n'importe qui de logé
 router.post("/pdf/:id",multerPdf,cvsController.setPdf)

module.exports = router