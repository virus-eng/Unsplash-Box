import { NextResponse } from "next/server";
import collectionData from "@/models/collectionData";
import mongoose from "mongoose";

export async function DELETE(request, context){
    const params = await context.params;
    const imageId = params["image-id"], collectionId = params["collection-id"];
    if(!imageId || !collectionId) return NextResponse.json(0);
    await mongoose.connect(process.env.MONGODB_URL);
    await collectionData.updateOne({"_id" : collectionId, "owner" : request.headers.get("user_id")}, {$unset : {[`images.${imageId}`] : ""}});
    return NextResponse.json(1);
}


export async function PUT(request, context){
    const params = await context.params;
    const imageId = params["image-id"], collectionId = params["collection-id"];
    if(!imageId || !collectionId) return NextResponse.json(0);
    await mongoose.connect(process.env.MONGODB_URL);
    let imageData = await fetch(`https://api.unsplash.com/photos/${imageId}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    imageData = await imageData.json();
    await collectionData.updateOne({"_id" : collectionId, "owner" : request.headers.get("user_id")}, {$set : {[`images.${imageId}`] : imageData.urls.small}});
    return NextResponse.json(1);
}