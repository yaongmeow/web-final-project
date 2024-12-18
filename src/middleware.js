import {NextResponse} from "next/server";

export function middleware(req) {
    const cookies = req.cookies.get("username");

    // 특정 쿠키가 없으면 리다이렉트
    if (!cookies) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    // 요청을 그대로 통과시킴
    return NextResponse.next();
}

// 적용할 경로 설정
export const config = {
    matcher: ["/((?!auth|api/auth|_next/static|_next/image).*)"],
};