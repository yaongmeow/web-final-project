import { useState } from "react";
import axios from "axios";

export const Modal = ({ isOpen, onClose, setName, userId }) => {
    const [newName, setNewName] = useState(""); // 입력값을 관리할 상태 추가

    const handleInputChange = (e) => {
        setNewName(e.target.value); // 입력값 업데이트
    };

    const handleSave = async () => {
        try {
            const result = await axios.patch(`/api/users/${userId}`, {name: newName})
            if (result.status === 200) {
                setName(newName);
                alert("이름이 변경되었습니다.")
            }
        } catch (e) {
            alert("이름이 변경에 실패하였습니다.")
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">이름 변경</h2>
                <input
                    type="text"
                    value={newName} // 입력값 바인딩
                    onChange={handleInputChange} // 입력값 변경 시 상태 업데이트
                    className="w-full px-4 py-2 border rounded mb-4"
                    placeholder="새로운 이름을 입력하세요"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleSave}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};