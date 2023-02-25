import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  try {
    await jwtVerify(
      jwt.value,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY)
    );
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/userProfile",
};
