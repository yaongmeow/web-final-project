import React from "react";

export const Editor = ({pages, currentPage, isEditingTitle, toggleEditingTitle, handleTitleChange, handleContentChange }) => {
    return (
        <div style={{
            paddingTop: 8 + 'rem',
            paddingBottom: 8 + 'rem',
            maxWidth: 1024 + 'px',
            width: 58.333333 + '%'
        }}>
            <div>
                {isEditingTitle ? (
                    <input
                        type="text"
                        value={pages[currentPage - 1]?.title || ""}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="text-5xl leading-[10rem] font-extrabold border-none focus:outline-none"
                    />
                ) : (
                    <div
                        onClick={toggleEditingTitle}
                        className="text-5xl leading-[10rem] font-extrabold border-none focus:outline-none"
                    >
                        {pages[currentPage - 1]?.title || "Untitled"}
                    </div>
                )}
            </div>
            <div>
        <textarea
            value={pages[currentPage - 1]?.content || ""}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full max-w-md h-32 resize-none pt-1 pb-1 text-xl leading-7 border-none focus:outline-none"
            placeholder="Page Content"
        />
            </div>
        </div>
    );
};