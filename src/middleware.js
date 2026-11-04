import { v4 as uuidv4 } from "uuid";
import { NextResponse } from 'next/server'
import { SignJWT, jwtVerify } from "jose";
import { headers } from "next/headers";

async function decodeToken(request){
    try{
        let decoded = await jwtVerify(request.cookies.get('auth').value, new TextEncoder().encode(process.env.JWT_SECRET));
        const cloneHeader = new Headers(request.headers);
        cloneHeader.set("user_id", decoded.payload.user_id);
        return NextResponse.next({request : {headers : cloneHeader}});
    }
    catch{
        const user_id = uuidv4();
        const token = await new SignJWT({"user_id" : user_id})
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('10y') 
            .sign(new TextEncoder().encode(process.env.JWT_SECRET))
        
        const cloneHeader = new Headers(request.headers);
        cloneHeader.set("user_id", user_id);
        const response = NextResponse.next({request : {headers : cloneHeader}});
    
        response.cookies.set('auth', token, {
            httpOnly: true,
            secure : true,
            sameSite : 'lax',
            path : '/',  
            maxAge: 315360000
        });

        return response;
    }
}


export async function middleware(request) {
    return await decodeToken(request);
}

export const config = {
  matcher: ['/api/collections/:path*'],
}