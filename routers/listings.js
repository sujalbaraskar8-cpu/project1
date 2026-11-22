const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const {listingschema,reviewschema }= require("../schema.js");
const {isLoggedin,isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//listing validate
const validatelisting = (req,res,next) => {
     let {error} = listingschema.validate(req.body);
    if(error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400,error);
    };
    next();
}; 
router.route("/")
    .get( wrapAsync(listingController.index))
    .post(isLoggedin,validatelisting, upload.single("listings[image][url]") ,wrapAsync(listingController.createListing));
//new listing form 
router.get("/new", isLoggedin ,listingController.createListingForm);
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .delete(isLoggedin,isOwner, wrapAsync( listingController.destroyListing))
    .put(isLoggedin,isOwner,upload.single("listings[image][url]"),validatelisting , wrapAsync(listingController.editListing));

//edit form 
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.editListingForm));

module.exports = router;
