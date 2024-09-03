console.log("dans cvs router");
const express = require("express")
const router = express.Router()

const {checkRights,checkRightsGetAll,checkRightsOne}=require("../middlewares/langues")
const languesController = require("../controllers/langues.controller")


router.get("/section/:id",checkRightsGetAll,languesController.getAll)  // admin et owner du CV
router.get("/:id",checkRightsOne,languesController.getOne)     // admin et owner du CV
router.post("/",checkRights,languesController.new)   // que l'admin et owner du CV
router.patch("/:id",checkRightsOne,languesController.update)   // que l'admin et owner du CV
 router.delete("/:id",checkRightsOne,languesController.delete)  // que l'admin et owner du CV

module.exports = router