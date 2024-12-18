import {cookies} from "next/headers";

export async function DELETE() {
    try {
        const cookieStore = cookies();
        cookieStore.set("username", "", { maxAge: 0 });
        return new Response(JSON.stringify({ message: "GoodBye!" }), { status: 200 });
    } catch (error) {
        console.error("Error while trying to login:", error);
        return new Response(JSON.stringify({ message: "Failed to Login" }), { status: 500 });
    }
}