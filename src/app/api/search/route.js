import { NextResponse } from "next/server";

export async function GET(request){
    const {searchParams} = request.nextUrl;
    const term = searchParams.get('term'), page = searchParams.get('page');
    if(!term || !page || term.length < 1) return NextResponse.json(0);
    let searchResult = await fetch(`https://api.unsplash.com/search/photos?query=${term}&page=${page}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    searchResult = await searchResult.json();
    
    for(let i = 0; i < searchResult.results.length; i++) searchResult.results[i] = {"id" : searchResult.results[i].id, "display" : searchResult.results[i].urls.small};
    return NextResponse.json(searchResult.results);
}