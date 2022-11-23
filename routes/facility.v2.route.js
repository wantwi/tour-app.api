const express = require("express")
const router = express.Router()
const { upload } = require("../utils/utils")


const { create, getAll, getAllByFacilitytypesStats,searchFacility, getAllbyRegions, getFacilityById } = require("../controllers/facility.controller.v2")

router.route("facility/add/:facilityId").post(upload('landingPageImage', 'gallery'), create)
router.route("facility/").get(getAll)
router.route("facility/regions").get(getAllbyRegions)
router.route("facility/regions/:region").get(getAllbyRegions)
router.route("facility/:facilityId").get(getFacilityById)
router.route("facility/stats").get(getAllByFacilitytypesStats)
router.route("/search").get(searchFacility);

module.exports = router