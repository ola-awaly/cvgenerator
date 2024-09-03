console.log("dans cvs router");
const express = require("express")
const router = express.Router()

const {checkRights,checkRightsGetAll,checkRightsOne}=require("../middlewares/experiences")
const experiencesController = require("../controllers/experiences.controller")


router.get("/section/:id",checkRightsGetAll,experiencesController.getAll)  // admin et owner du CV
router.get("/:id",checkRightsOne,experiencesController.getOne)     // admin et owner du CV
router.post("/",checkRights,experiencesController.new)   // que l'admin et owner du CV
router.patch("/:id",checkRightsOne,experiencesController.update)   // que l'admin et owner du CV
 router.delete("/:id",checkRightsOne,experiencesController.delete)  // que l'admin et owner du CV

module.exports = router