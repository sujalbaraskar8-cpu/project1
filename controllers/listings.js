const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient  = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res) => {
    let {category} = req.query;
    let AllListings;
    if(category){
        AllListings =  await Listing.find({category});
    }else{
        AllListings =  await Listing.find({});
    }
    res.render("listings/index.ejs",{AllListings});
};

module.exports.editListingForm =  async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    
    if(!listing){
    req.flash("error","listing your searching for does not exist");
    return res.redirect("/listings");
    };
    let orignalImageUrl = listing.image.url;
    orignalImageUrl = orignalImageUrl.replace("/upload","/upload/h_200,w_250")
    console.log(orignalImageUrl);
    res.render("listings/edit.ejs",{listing,orignalImageUrl});
};

module.exports.editListing = async (req,res) => {
    let {id} = req.params;
    const  listing =  await Listing.findByIdAndUpdate(id,req.body.listings);

    if(typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    isting.save();
    }
    req.flash("success","successfully edited");
    res.redirect(`/listings/${id}` );
};

module.exports.createListing =  async (req,res) => {
    let response = await  geocodingClient.forwardGeocode({
    query: req.body.listings.location,
    limit: 2
    })
    .send()
    let listings = req.body.listings;
    let url = req.file.path;
    let filename = req.file.filename;
    let newlisting =  new Listing(listings);
    newlisting.owner = req.user._id;
    newlisting.image ={url,filename};
    newlisting.geometry = response.body.features[0].geometry;
    let savelisting = await newlisting.save();
    req.flash("success","successfully saved a new listing");
    res.redirect("/listings");
};

module.exports.createListingForm = (req,res) => {
    res.render("listings/new.ejs");
};
module.exports.showListing =  async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","listing your searching for does not exist");
        return res.redirect("/listings");
    };
    res.render("listings/show.ejs",{listing});
};
module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    console.log("req id ",id);
    const beforedelete = await Listing.findById(id);
    const deletelistings = await Listing.findByIdAndDelete(id);
    req.flash("success","successfully deleted");
   res.redirect("/listings");
};