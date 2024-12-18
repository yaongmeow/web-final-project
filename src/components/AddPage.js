import axios from "axios";
import {NoteIcon} from "@/components/Icon";
import React from "react";

export const AddPage = ({pages, setPages, setCurrentPage, userId}) => {
    const addPage = async () => {
        console.log("adding page", userId);
        const newNote = { title: `Untitled ${pages.length + 1}`, content: "", userId };
        try {
            const { data } = await axios.post("/api/notes", newNote);
            setPages([...pages, data]);
            setCurrentPage(pages.length); // 새 노트의 id로 이동
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    return (
        <div
            onClick={addPage}
            className="flex items-center justify-between w-full h-10 text-sm font-semibold text-[#5f5e5b] hover:bg-gray-200 rounded-md cursor-pointer">
            <div
                className={"flex items-center w-full h-10 text-sm font-semibold rounded-md cursor-pointer text-[#5f5e5b]"}
            >
                <NoteIcon/>
                AddPage
            </div>
        </div>
    )
}