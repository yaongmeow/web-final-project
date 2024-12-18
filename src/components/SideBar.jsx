import {Profile} from "./Profile";
import {HomeIcon, LogoutIcon, NoteIcon, TrashIcon} from "./Icon";
import {AddPage} from "./AddPage";
import axios from "axios";
import SearchInput from "@/components/SearchInput";
import {useRouter} from "next/navigation";


export const SideBar = ({pages, currentPage, handlePageChange, setPages, setCurrentPage, userId, username, handleModalOpen}) => {
    const router = useRouter();

    const deletePage = async (pageId) => {
        try {
            await axios.delete(`/api/notes/${pageId}`);
        } catch (error) {
            console.error("Error deleting content:", error);
        }
        try {
            const { data } = await axios.get("/api/notes");
            setPages(data);
            const maxId = data.length
                ? data.reduce((max, page) => (page.id > max ? page.id : max), data[0].id)
                : null;
            setCurrentPage(maxId);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }

    };

    const handleLogout = async () => {
        const result = await axios.delete(`/api/auth/logout`);
        if (result.status == 200){
            alert("로그아웃 되었습니다.");
            router.push("/login");
        }
    }

    return (
        <div className="flex flex-col bg-[#f7f7f5] max-w-[15rem] p-1 min-h-screen box-border">
            <Profile
                username={username}
                handleModalOpen={handleModalOpen}
            />
            <div className={"flex flex-col justify-items-center"}>
                <HomeIcon/>
                <LogoutIcon
                    onClick={handleLogout}
                    className={"cursor-pointer group"}
                />
                <SearchInput
                    userId={userId}
                    pages={pages}
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
                                ? "bg-gray-200"
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
                                console.log("sidebar", typeof setCurrentPage)
                                e.stopPropagation();
                                console.log("clicked")
                                deletePage(page.id);
                            }}
                            className={"group cursor-pointer"}
                        />
                    </div>
                ))}
                <AddPage pages= {pages} setPages={setPages} setCurrentPage={setCurrentPage} userId={userId} />
            </div>
        </div>
    )
}