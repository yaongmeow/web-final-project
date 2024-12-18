"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";

import {SideBar} from "@/components/SideBar";
import {Editor} from "@/components/Editor";
import Cookies from "js-cookie";



export default function App() {
  const [pages, setPages] = useState([]); // DB에서 가져온 노트
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스
  const [isEditingTitle, setIsEditingTitle] = useState(false); // 제목 편집 상태
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    // js-cookie를 사용해 쿠키 읽기
    const usernameCookie = Cookies.get("username");
    if (usernameCookie) {
      setUsername(usernameCookie);
    }

    const userIdCookie = Cookies.get("userId");
    console.log("z쿠키:", userIdCookie)
    if (userIdCookie) {
      setUserId(userIdCookie);
    }

    const fetchNotes = async () => {
      try {
        const { data } = await axios.get(`/api/notes?userId=${userIdCookie}`);
        setPages(data);
        setCurrentPage(0);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();

  }, []);


  //
  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/notes?userId=${userId}`);
  //       setPages(data);
  //       setCurrentPage(0);
  //     } catch (error) {
  //       console.error("Error fetching notes:", error);
  //     }
  //   };
  //   fetchNotes();
  // }, []);

  useEffect(() => {
    console.log("Updated pages:", pages);
    console.log("페이지 길이:", pages.length);
    console.log("current page: ", currentPage)
  }, [pages]);

  useEffect(() => {
    console.log("현재 페이지 변경")
  }, [currentPage]);

  const addPage = async () => {
    const newNote = { title: `Untitled ${pages.length + 1}`, content: "" };

    try {
      const { data } = await axios.post("/api/notes", newNote);
      setPages([...pages, data]);
      setCurrentPage(pages.length - 1);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleTitleChange = async (newTitle) => {
    const updatedNote = { ...pages[currentPage], title: newTitle };
    setPages(
        pages.map((page) =>
            page.id === updatedNote.id ? updatedNote : page
        )
    );

    try {
      await axios.put(`/api/notes/${updatedNote.id}`, updatedNote);
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const handleContentChange = async (newContent) => {
    const updatedNote = { ...pages[currentPage], content: newContent };
    setPages(
        pages.map((page) =>
            page.id === updatedNote.id ? updatedNote : page
        )
    );

    try {
      await axios.put(`/api/notes/${updatedNote.id}`, updatedNote);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handlePageChange = (index) => {
    setCurrentPage(index);
    setIsEditingTitle(false);
  };

  const toggleEditingTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  };

  return (
    <div className="m-0 leading-inherit antialiased">
      <div className="flex">
        <SideBar
            pages={pages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            addPage={addPage}
            setPages={setPages}
            setCurrentPage={setCurrentPage}
            userId={userId}
            username={username}
        />
        <div className="flex-2 bg-white justify-center flex-grow flex">
          <Editor
              pages={pages}
              currentPage={currentPage}
              isEditingTitle={isEditingTitle}
              toggleEditingTitle={toggleEditingTitle}
              handleTitleChange={handleTitleChange}
              handleContentChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  );
}
