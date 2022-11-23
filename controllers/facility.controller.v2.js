const Facility = require("../models/faciliy.model")
const FacilityType = require("../models/facility.type.model")
const ErrorReponse = require("../utils/errorResponse")
const asyncHandler =  require("../middlewares/async")


exports.create = asyncHandler(async (req,res,next) => {
    const {facilityId  } = req.params
    
    //get facility type
    const faclityType = await FacilityType.findById(facilityId)
    if(!faclityType){
        return next(new ErrorReponse(`Facility type not found`, 400))
    }

    req.body.gallery = req.files.gallery.map(x => x.filename)
    req.body.landingPageImage = req.files.landingPageImage.map(x => x.filename)[0]

    req.body.facilityType = faclityType?._id
    const facility =  await Facility.create({...req.body})
    res.status(201).json({
        success: true,
            data: facility
    })
})


exports.getAll = asyncHandler(async (req,res,next)=>{
    const facilities = await Facility.find({}).populate({
        path:"facilityType",
        select:"name -_id"
    })

    res.status(200).json({
        success: true,
        data: facilities
    })
})

exports.getAllByFacilitytypes = asyncHandler(async (req,res,next) => {
    const $facet = {}
    const ft = await FacilityType.find({})
      ft.map((ob) =>{
        $facet[`${ob?.name}`] = [{$match:{"facilityType":ob._id}}]
      })
     const facilities = await Facility.aggregate([{ $facet}])

      res.status(200).json({
        success:true,
        data: facilities
    })
})

exports.getAllByFacilitytypesStats = asyncHandler(async (req,res,next) => {
    const $facet = {}
    const ft = await FacilityType.find({})
      ft.map((ob) =>{
        $facet[`${ob?.name}`] = [{$match:{"facilityType":ob._id}}, {'$count': 'count'}]
      })
     const facilities = await Facility.aggregate([{ $facet}])

      res.status(200).json({
        success:true,
        data: facilities[0]
    })
})

exports.getFacilityById = asyncHandler(async (req,res,next)=>{
    const {facilityId} = req.params

    if(!facilityId) {
        next(new ErrorReponse("Facility Id is  required", 400))
        return
    }
    const facility =  await Facility.findById(facilityId).populate({
        path:"facilityType",
        select:"name -_id"
    })

    res.status(200).json({
        success: true,
        data:facility
    })
})

/**
 * Get all by regions
 */
 exports.getAllbyRegions = asyncHandler(async (req, res, next) => {
    const { params } = req
    const { region } = params
    let facilities = null;
    if (region) {
        facilities = await Facility.find({ region })
    }
    else {
        facilities = await Facility.aggregate([
            {
                $facet: {
                    northern: [

                        {
                            $match: {
                                "region": "Northern",

                            },

                        }

                    ],
                    upperEast: [
                        {
                            $match: {
                                "region": "Upper East"
                            }
                        }
                    ],
                    upperWest: [
                        {
                            $match: {
                                "region": "Upper West"
                            }
                        }
                    ],
                    savannah: [
                        {
                            $match: {
                                "region": "Savannah"
                            }
                        }
                    ],
                    bono: [
                        {
                            $match: {
                                "region": "Bono"
                            }
                        }
                    ],
                    bonoEast: [
                        {
                            $match: {
                                "region": "Bono East"
                            }
                        }
                    ],
                    ahafo: [
                        {
                            $match: {
                                "region": "Ahafo"
                            }
                        }
                    ],
                    western: [
                        {
                            $match: {
                                "region": "Western"
                            }
                        }
                    ],
                    westernNorth: [
                        {
                            $match: {
                                "region": "Western North"
                            }
                        }
                    ],
                    northEast: [
                        {
                            $match: {
                                "region": "North-East"
                            }
                        }
                    ],
                    oti: [
                        {
                            $match: {
                                "region": "Oti"
                            }
                        }
                    ],
                    volta: [
                        {
                            $match: {
                                "region": "Volta"
                            }
                        }
                    ],
                    eastern: [
                        {
                            $match: {
                                "region": "Western"
                            }
                        }
                    ],
                    central: [
                        {
                            $match: {
                                "region": "Central"
                            }
                        }
                    ],
                    ashanti: [
                        {
                            $match: {
                                "region": "Ashanti"
                            }
                        }
                    ],
                    greaterAccra: [
                        {
                            $match: {
                                "region": "Greater Accra"
                            }
                        }
                    ]
                },

            }
        ])

        if (facilities) {
            facilities = facilities[0]
        }
    }

    res.status(200).json({
        success: true,
        data: facilities,
    });
});

exports.searchFacility = asyncHandler(async (req, res, next) => {
    let facilities = null
    const { query } = req

    if (Object.keys(query).length > 0) {
        const { location = "", category = "all", type = "" } = query
        
        if (query?.location) {
            if (category.toLowerCase() === "all") {
                facilities = await Facility.find({ location: { $regex: location, $options: 'i' } })
            }
            else {
                facilities = await Facility.find({ $and: [{ location: { $regex: location, $options: 'i' } }, { facilityType: category }] })
            }
        }
        else if (location === "" && category.length > 0) {
            facilities = await Facility.find({ facilityType: category })
        }
    }

    else {
        console.log("here");
        facilities = await Facility.find({})
    }

    res.status(200).json({
        success: true,
        count: facilities.length,
        data: facilities,
    });

})
