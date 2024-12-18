import React, {useState, useEffect} from "react";
import Search from "@/svg/Search.svg";

export default function SearchInput(session, pages, setPages, handlePageChange) {
    const [query, setQuery] = useState(""); // 입력값 상태
    const [debouncedQuery, setDebouncedQuery] = useState(query); // 디바운스된 입력값
    const [results, setResults] = useState([]); // 검색 결과 상태

    // 입력값 변경 시 디바운싱 처리
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query); // 입력 후 300ms 동안 변화가 없으면 업데이트
        }, 300);

        return () => clearTimeout(timer); // 기존 타이머 제거
    }, [query]);

    // 디바운스된 입력값으로 API 호출
    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.trim() === "") {
                setResults([]); // 입력값이 없으면 결과를 초기화
                return;
            }

            try {
                const response = await fetch(`/api/notes?content=${debouncedQuery}&userId=${session.user.id}`, {});
                const data = await response.json();
                const tempList = [];
                for (const d of data) {
                    tempList.push({"id":d.id, "title" :d.title});
                }
                setResults(tempList || []);
            } catch (error) {
                console.error("API 호출 실패:", error);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    // 검색 결과 초기화
    const clearResults = () => {
        setQuery(""); // 입력창 초기화
        setResults([]); // 결과 리스트 초기화
    };

    const goToTargetPage = (id, pages) => {
        console.log("click", pages.length);
        for(let i = 0 ; i < pages.length ; i++){
            console.log("id: ", pages[i].id )
            if (pages[i].id == id){
                handlePageChange(i);
                break;
            }
        }
    }

    return (
        <div>

            <div
                className="relative text-sm leading-5 py-1 px-3 flex rounded-[.375rem] font-semibold items-center w-full h-8 text-[#5f5e5b] fill-current">
                <div style={{height: 83.333333 + '%', marginRight: .5 + 'rem'}}>
                    <Search className={"h-full"}/>
                </div>
                <input
                    className={"bg-transparent border-none outline-none"}
                    placeholder={"Search"}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <button
                        onClick={clearResults}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        &#x2715; {/* Unicode 'x' 문자 */}
                    </button>
                )}
            </div>

            {/* 검색 결과 */}
            <ul className="mt-4">
                {results.map((item, index) => (
                    <li
                        key={index}
                        className="p-2 text-sm border-b text-[#5f5e5b] cursor-pointer"
                        onClick={() => goToTargetPage(item.id, pages)}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}