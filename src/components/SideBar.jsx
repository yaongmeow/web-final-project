import {Profile} from "./Profile";
import {HomeIcon, NoteIcon, SearchIcon, TrashIcon} from "./Icon";
import {AddPage} from "./AddPage";
import axios from "axios";
import Search from "@/svg/Search.svg";
import SearchInput from "@/components/SearchInput";
import {useEffect, useState} from "react";

export const SideBar = ({session, pages, currentPage, handlePageChange, setPages, setCurrentPage}) => {
    const deletePage = async (pageId) => {
        try {
            await axios.delete(`/api/notes/${pageId}`);
        } catch (error) {
            console.error("Error deleting content:", error);
        }
        try {
            const { data } = await axios.get("/api/notes");
            setPages(data);

            // id 최대값을 찾기
            const maxId = data.length
                ? data.reduce((max, page) => (page.id > max ? page.id : max), data[0].id)
                : null;

            setCurrentPage(maxId); // 최대 id 값을 현재 페이지로 설정
        } catch (error) {
            console.error("Error fetching notes:", error);
        }

    };
    return (
        <div className="flex flex-col bg-[#f7f7f5] max-w-[15rem] p-1 min-h-screen box-border">
            <Profile/>
            <div className={"flex flex-col justify-items-center"}>
                <HomeIcon/>
                <SearchInput
                    session={session}
                    pages={pages}
                    setPages={setPages}
                    handlePageChange={handlePageChange}
                />
            </div>
            <div style={{marginTop: "2rem"}}>
                <div className="font-semibold text-[.9rem] pl-2 pr-1 text-[#5f5e5b]">
                    Private
                </div>
                {pages.map((page, index) => (
                    <div
                        key={page.id}
                        onClick={() => handlePageChange(index)}
                        className={`group flex items-center justify-between w-full h-10 text-sm font-semibold rounded-md cursor-pointer text-[#5f5e5b] ${
                            pages[currentPage].id === page.id
                                ? "bg-gray-200" // 현재 페이지는 어둡게 표시
                                : "hover:bg-gray-200"
                        }`}
                    >
                        <div
                            className={"flex items-center w-full h-10 text-sm font-semibold rounded-md cursor-pointer text-[#5f5e5b]"}
                        >
                            <NoteIcon/>
                            {page.title}
                        </div>
                        <TrashIcon
                            onClick={(e) => {
                                e.stopPropagation(); // 부모 클릭 이벤트 방지
                                console.log("clicked")
                                deletePage(page.id);
                            }}
                            className={"group cursor-pointer"}
                        />
                    </div>
                ))}
                <AddPage pages= {pages} setPages={setPages} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    )
}