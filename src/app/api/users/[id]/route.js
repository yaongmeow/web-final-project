import db from "@/db";
import {cookies} from "next/headers";

export async function PATCH(req, { params }) {
    const { id } = await params;

    try {
        const body = await req.json();
        const { name } = body;

        const updatedUser = await db.user.update({
            where: { id: parseInt(id, 10) },
            data: { name },
        });

        const cookieStore = cookies();
        cookieStore.set('name', updatedUser.name, { httpOnly: false, path: '/', maxAge: 3600 });
        cookieStore.set('userId', updatedUser.id, { httpOnly: false, path: '/', maxAge: 3600 });

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        console.error("Error updating note:", error);
        return new Response(
            JSON.stringify({ message: "Failed to update note" }),
            { status: 500 }
        );
    }
}
