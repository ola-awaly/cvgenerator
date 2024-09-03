console.log("dans cvs router");
const express = require("express")
const router = express.Router()

const {checkRights,checkRightsGetAll,checkRightsOne}=require("../middlewares/formations")
const formationsController = require("../controllers/formations.controller")


router.get("/section/:id",checkRightsGetAll,formationsController.getAll)  // admin et owner du CV
router.get("/:id",checkRightsOne,formationsController.getOne)     // admin et owner du CV
router.post("/",checkRights,formationsController.new)   // que l'admin et owner du CV
router.patch("/:id",checkRightsOne,formationsController.update)   // que l'admin et owner du CV
 router.delete("/:id",checkRightsOne,formationsController.delete)  // que l'admin et owner du CV

module.exports = router