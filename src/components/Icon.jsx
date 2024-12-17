import Search from '../svg/Search.svg'
import Home from '../svg/Home.svg'
import Note from '../svg/Note.svg'
import Trash from '../svg/Trash.svg'

export const SearchIcon = () => {
    return (
        <div className="text-sm leading-5 py-1 px-3 flex rounded-[.375rem] font-semibold items-center w-full h-8 text-[#5f5e5b] fill-current">
            <div style={{ height: 83.333333 + '%', marginRight: .5 + 'rem' }}>
                <Search className={"h-full"}/>
            </div>
            Search
        </div>
    )
}

export const HomeIcon = () => {
    return (
        <div className="text-sm leading-5 py-1 px-3 flex rounded-[.375rem] font-semibold items-center w-full h-8 text-[#5f5e5b] fill-current">
            <div style={{ height: 83.333333 + '%', marginRight: .5 + 'rem' }}>
                <Home className={"h-full"}/>
            </div>
            Home
        </div>
    )
}

export const NoteIcon = () => {
    return (
        <div className="h-full">
            <Note className={"h-full fill-current"}/>
        </div>
    )
}

export const TrashIcon = (props) => {
    return (
        <div
            {...props}
            className="mr-0 h-full group cursor-pointer">
            <Trash className={"opacity-0 group-hover:opacity-100 h-full fill-current cursor-pointer"}/>
        </div>
    )
}