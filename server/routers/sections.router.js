console.log("dans cvs router");
const express = require("express")
const router = express.Router()

const {checkRights,checkRightsGetAll,checkRightsGetOne}=require("../middlewares/sections")
const sectionsController = require("../controllers/sections.controller")


router.get("/cv/:id",checkRightsGetAll,sectionsController.getAll)  // admin et owner du CV
//router.get("/cv/:id/type/:type",checkRightsGetAll,sectionsController.getAllByType)  // admin et owner du CV
router.get("/:id",checkRightsGetOne,sectionsController.getOne)     // admin et owner du CV
router.post("/",checkRights,sectionsController.new)   // que l'admin et owner du CV
router.patch("/:id",checkRightsGetOne,sectionsController.update)   // que l'admin et owner du CV
router.delete("/:id",checkRightsGetOne,sectionsController.delete)  // que l'admin et owner du CV

module.exports = router