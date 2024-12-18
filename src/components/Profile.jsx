import Edit from '../svg/Edit.svg'

export const Profile = ({username, handleModalOpen}) => {
    return (
        <div className="flex font-medium gap-4 p-4 justify-between h-8 mt-1 mb-1">
            <div className="box-border gap-2 flex items-center bg-opacity-100 text-[#5f5e5b]">
                <img
                    alt="Profile Pic"
                    loading="lazy"
                    decoding="async"
                    data-nimg="1"
                    className="w-8 h-8 text-transparent object-contain rounded-[.375rem]"
                    src="./image/profile.jpg"
                />
                <div className={"text-sm"}>{username}의 Notion</div>
                <Edit
                    className={"h-7 w-7 text-[#5f5e5b] fill-current group cursor-pointer"}
                    onClick={handleModalOpen}
                />
            </div>
        </div>
    )
}