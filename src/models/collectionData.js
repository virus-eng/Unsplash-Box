import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    "name" : {type : String, required : true},
    "owner" : {type : String, required : true},
    "images" : {type : Object, required : true}
}, {minimize : false})

export default mongoose.models.collectionData || mongoose.model("collectionData", collectionSchema);