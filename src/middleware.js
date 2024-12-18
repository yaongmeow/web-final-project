import {NextResponse} from "next/server";

export function middleware(req) {
    const cookies = req.cookies.get("name");
    if (!cookies) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/((?!auth|api/auth|_next/static|_next/image).*)"],
};