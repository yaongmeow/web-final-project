import db from "@/db";

export async function GET() {
  try {
    const notes = await db.note.findMany({ orderBy: { id: "asc" } });
    if (notes.length === 0) {
      const newNote = await db.note.create({ data: { title: "", content: "" } });
      return new Response(JSON.stringify([newNote]), { status: 200 });
    }
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch notes" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, content } = body;

    const newNote = await db.note.create({
      data: { title, content },
    });
    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return new Response(JSON.stringify({ message: "Failed to create note" }), { status: 500 });
  }
}