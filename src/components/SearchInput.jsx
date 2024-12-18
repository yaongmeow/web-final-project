import React, {useEffect, useState} from "react";
import Search from "@/svg/Search.svg";


export default function SearchInput({userId, pages, handlePageChange}) {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.trim() === "") {
                setResults([]);
                return;
            }
            try {
                const response = await fetch(`/api/notes?content=${debouncedQuery}&userId=${userId}`, {});
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

    const clearResults = () => {
        setQuery("");
        setResults([]);
    };

    const goToTargetPage = (id) => {
        for(let i = 0 ; i < pages.length ; i++){
            console.log("id: ", pages[i].id )
            if (pages[i].id == id){
                handlePageChange(i)
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
                        &#x2715;
                    </button>
                )}
            </div>

            <ul className="mt-4">
                {results.map((item, index) => (
                    <li
                        key={index}
                        className="p-2 text-sm border-b text-[#5f5e5b] cursor-pointer"
                        onClick={() => goToTargetPage(item.id)}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}