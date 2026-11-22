const joi = require("joi");

const listingschema = joi.object({ 
    listings : joi.object({
        title : joi.string().required(),
        description :  joi.string().required(),
        country :  joi.string().required(),
        location :  joi.string().required(),
        price :  joi.number().required().min(0),
        image  : joi.object({
            url:joi.string().allow("", null).required(),
            filename:joi.string(),
        }),
        category: joi.string().valid( "trending",
    "rooms",
    "mountains",
    "amazing pools",
    "amazing views",
    "beach",
    "beachfront",
    "cabins",
    "camping",
    "castles",
    "farms",
    "iconic cities",
    "lakefront",
    "mansions",
    "national parks",
    "treehouses").required(),

    }).required(),
});


const reviewschema = joi.object({
    review : joi.object({
        comment:joi.string(),
        rating : joi.number().min(1).max(5),
    }).required()
});
module.exports = {listingschema,reviewschema};