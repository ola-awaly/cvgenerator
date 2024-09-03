console.log("dans cvs router");
const express = require("express")
const router = express.Router()

const {checkRights}=require("../middlewares/templates")
const templatesController = require("../controllers/templates.controller")


router.get("/",templatesController.getAll)  // n'importe quel user logé
router.get("/:id",templatesController.getOne)     // n'importe quel user logé
router.post("/",checkRights,templatesController.new)   // que l'admin
router.patch("/:id",checkRights,templatesController.update)   // que l'admin
router.delete("/:id",checkRights,templatesController.delete)  // que l'admin

module.exports = router