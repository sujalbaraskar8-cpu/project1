const express = require("express");
const router = express.Router ({mergeParams : true});
const {listingschema,reviewschema }= require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedin,isReviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js");

//review validate
const validatereview = (req,res,next) => {
     let {error} = reviewschema.validate(req.body);
    if(error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400,error);
    };
    next();
}; 


//reviews
//post route
router.post("/",isLoggedin ,validatereview ,wrapAsync(reviewcontroller.createReview));

// REVIEW DELETE ROUTE
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync( reviewcontroller.destroyReview));

module.exports = router;