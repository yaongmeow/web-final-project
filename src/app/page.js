"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";

import {SideBar} from "@/components/SideBar";
import {Editor} from "@/components/Editor";
import Cookies from "js-cookie";
import {Modal} from "@/components/Modal";


export default function App() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const nameCookie = Cookies.get("name");
    if (nameCookie) {
      setName(nameCookie);
    }
    const userIdCookie = Cookies.get("userId");
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
            username={name}
            handleModalOpen={handleModalOpen}
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
      <Modal isOpen={isModalOpen} onClose={handleModalClose} setName={setName} userId={userId} />
    </div>
  );
}
