import { NextResponse } from "next/server";
import collectionData from "@/models/collectionData";
import mongoose from "mongoose";

export async function GET(request, context){
    const params = await context.params;
    const collectionId = params["collection-id"];
    if(!collectionId) return NextResponse.json(0);
    await mongoose.connect(process.env.MONGODB_URL);
    let collection_Data = await collectionData.findOne({"_id" : collectionId}).lean();
    return NextResponse.json(collection_Data);
}