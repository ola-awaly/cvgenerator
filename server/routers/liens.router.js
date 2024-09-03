console.log("dans cvs router");
const express = require("express")
const router = express.Router()

const {checkRights,checkRightsGetAll,checkRightsOne}=require("../middlewares/liens")
const liensController = require("../controllers/liens.controller")


router.get("/section/:id",checkRightsGetAll,liensController.getAll)  // admin et owner du CV
router.get("/:id",checkRightsOne,liensController.getOne)     // admin et owner du CV
router.post("/",checkRights,liensController.new)   // que l'admin et owner du CV
router.patch("/:id",checkRightsOne,liensController.update)   // que l'admin et owner du CV
 router.delete("/:id",checkRightsOne,liensController.delete)  // que l'admin et owner du CV

module.exports = router