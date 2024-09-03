console.log("dans users router");
const express = require("express")
const router = express.Router()

// const {checkLogged} = require("../middlewares/others")
// const {checkRights,validateData,checkRightsRole} = require("../middlewares/users.middleware")
const {checkIfAuthenticated,checkLogged,checkRights}=require("../middlewares/authentication")
const usersController = require("../controllers/users.controller")


router.get("/",checkLogged,checkRights,usersController.getAll)  // que l'admin
router.get("/:id",checkLogged,checkRights,usersController.getOne)     // l'admin et le user en question
router.get("/emailExistCheck/:email",usersController.checkEmail)     // Tout le monde
router.post("/",usersController.new)   // tout le monde peut s'enregistrer
router.patch("/resetPasswordByToken",usersController.resetPasswordByToken)   // tout le monde
router.patch("/:id",checkLogged,checkRights,usersController.update)   // l'admin et le user en question
router.delete("/:id",checkLogged,checkRights,usersController.delete)  // l'admin et le user en question
router.post("/login",usersController.login)   // tout le monde
router.post("/sendEmail",usersController.sendEmail)   // tout le monde
router.patch("/resetPassword/:id",checkLogged,checkRights,usersController.resetPassword)   // l'admin et le user en question
router.post("/sendEmailForgetPassword",usersController.sendEmailForgetPassword)   // tout le monde
router.post("/checkRandomToken",usersController.checkRandomToken)   // tout le monde

module.exports = router