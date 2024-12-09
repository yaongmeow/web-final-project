import Note from '../svg/Note.svg'
import axios from "axios";

export const AddPage = ({pages, setPages, setCurrentPage}) => {
    const addPage = async () => {
        const newNote = { title: `Untitled ${pages.length + 1}`, content: "" };
        try {
            const { data } = await axios.post("/api/notes", newNote);
            setPages([...pages, data]);
            setCurrentPage(data.id); // 새 노트의 id로 이동
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    return (
        <div
            onClick={addPage}
            className="flex items-center w-full h-10 px-3 py-1 text-sm font-semibold text-[#5f5e5b] hover:bg-gray-200 rounded-md cursor-pointer" >
            <div className="mr-2 h-full">
                <Note className="h-full fill-current"/>
            </div>
            Add Page
        </div >
    )
}