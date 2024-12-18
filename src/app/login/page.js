"use client";
import React, { useState } from "react";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 상태 토글
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log("로그인 데이터:", formData);
            // 로그인 로직 추가
        } else {
            if (formData.password !== formData.confirmPassword) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }
            console.log("회원가입 데이터:", formData);
            // 회원가입 로직 추가
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    {isLogin ? "로그인" : "회원가입"}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* 이메일 입력 */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="email">
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="이메일을 입력하세요"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="password">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 비밀번호 확인 (회원가입 시에만 표시) */}
                    {!isLogin && (
                        <div className="mb-4">
                            <label
                                className="block text-gray-600 mb-2"
                                htmlFor="confirmPassword"
                            >
                                비밀번호 확인
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="비밀번호를 다시 입력하세요"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required={!isLogin}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        {isLogin ? "로그인" : "회원가입"}
                    </button>
                </form>

                {/* 로그인/회원가입 전환 버튼 */}
                <p className="text-sm text-gray-600 mt-4 text-center">
                    {isLogin
                        ? "계정이 없으신가요?"
                        : "이미 계정이 있으신가요?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? "회원가입" : "로그인"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;