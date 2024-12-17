import {Profile} from "./Profile";
import {HomeIcon, NoteIcon, SearchIcon, TrashIcon} from "./Icon";
import {AddPage} from "./AddPage";
import React, {useState} from "react";

export const SideBar = ({pages, currentPage, handlePageChange, addPage}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex flex-col bg-[#f7f7f5] max-w-[15rem] p-1 min-h-screen box-border">
            <Profile/>
            <div>
                <SearchIcon/>
                <HomeIcon/>
            </div>
            <div style={{marginTop: "2rem"}}>
                <div className="font-semibold text-[.9rem] pl-2 pr-1 text-[#5f5e5b]">
                    Private
                </div>
                {pages.map((page, index) => (
                    <div
                        key={page.id}
                        onClick={() => handlePageChange(index)}
                        onMouseEnter={() => setIsHovered(true)}  // hover 시작
                        onMouseLeave={() => setIsHovered(false)}
                        className={`flex items-center justify-between w-full h-10 text-sm font-semibold rounded-md cursor-pointer text-[#5f5e5b] ${
                            currentPage === page.id
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
                        {/*<TrashIcon className="hidden group-hover:block" />*/}
                        {isHovered && <TrashIcon />}
                    </div>
                ))}
                <AddPage addPage={addPage}/>
            </div>
        </div>
    )
}