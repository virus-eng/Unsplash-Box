import { NextResponse } from "next/server";
import collectionData from '@/models/collectionData.js'
import mongoose from "mongoose";

export async function GET(request){
    await mongoose.connect(process.env.MONGODB_URL);
    const user_id = request.headers.get("user_id");
    let collectionList = await collectionData.find({"owner" : user_id}).lean();
    return NextResponse.json(collectionList);
}

export async function POST(request){
  const body = await request.json();
  if("name" in body == false || body.name.length < 1) return NextResponse.json(0);
  await mongoose.connect(process.env.MONGODB_URL);
  const collectionDataDocument = new collectionData({
    "name" : body.name,
    "owner" : request.headers.get("user_id"),
    "images" : {}
  });

  await collectionDataDocument.save();
  return NextResponse.json(1);
}