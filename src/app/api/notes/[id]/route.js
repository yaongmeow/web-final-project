import db from "@/db";

export async function PUT(req, { params }) {
  const { id } = await params;

  try {
    const body = await req.json();
    const { title, content } = body;

    const updatedNote = await db.note.update({
      where: { id: parseInt(id, 10) },
      data: { title, content },
    });

    return new Response(JSON.stringify(updatedNote), { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update note" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  console.log(`id ${id} deleted`)
  const noteId = parseInt(id, 10);
  try {
    await db.note.delete({ where: { id: noteId } });
    return new Response( JSON.stringify({ message: `Note ${noteId} deleted` }), { status: 200 })
  } catch (error) {
    console.error("Error deleting note:", error);
    return new Response(
        JSON.stringify({ message: "Failed to delete note" }),
        { status: 500 }
    );
  }
}
