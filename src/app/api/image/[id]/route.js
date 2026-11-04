import { NextResponse } from "next/server";

export async function GET(request, context){
    const params = await context.params;
    if(!params.id) return NextResponse.json(0);
    const imageId = params.id;
    let imageData = await fetch(`https://api.unsplash.com/photos/${imageId}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    imageData = await imageData.json();
    return NextResponse.json({"display" : imageData.urls.raw, "uploaded_by" : {"username" : `${imageData.user.name}`, "pic" : imageData.user.profile_image.small}, "date" : imageData.created_at, "download" : imageData.links.download})
}