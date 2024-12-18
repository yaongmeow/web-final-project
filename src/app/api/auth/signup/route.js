import db from "@/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, username, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("before creating")
        console.log({ name, username, hashedPassword });
        const newUser = await db.user.create({ data: { name, username, password: hashedPassword } });
        console.log("end creating")
        return new Response(JSON.stringify({ message: `Welcome ${newUser.name}!` }), { status: 200 });
    } catch (error) {
        console.error("Error while trying to login:", error);
        return new Response(JSON.stringify({ message: "Failed to Signup" }), { status: 500 });
    }
}