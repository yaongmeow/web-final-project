import db from "@/db";
import bcrypt from "bcryptjs";
import {cookies} from "next/headers";

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, password } = body;

        const user = await db.user.findUnique({
            where: {username: username},
        });

        const isValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValid) {
            return new Response(JSON.stringify({ message: "Incorrect credentials." }), { status: 401 });
        }

        const cookieStore = cookies();
        cookieStore.set('username', username, { httpOnly: false, path: '/', maxAge: 3600 });
        cookieStore.set('userId', user.id, { httpOnly: false, path: '/', maxAge: 3600 });

        return new Response(JSON.stringify({ message: "Welcome!" }), { status: 200 });
    } catch (error) {
        console.error("Error while trying to login:", error);
        return new Response(JSON.stringify({ message: "Failed to Login" }), { status: 500 });
    }
}