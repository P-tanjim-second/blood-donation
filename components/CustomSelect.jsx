'use client';
import { useState, useRef, useEffect } from "react";

export const CustomSelect = ({ options, value, placeholder, onChange, disable=false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full rounded-xl" ref={wrapperRef}>
            {/* Input / Trigger Area */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={disable}
                className={`w-full flex justify-between font-semibold text-[15px] items-center px-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 
          ${isOpen ? "border-blue-500 bg-white ring-2 ring-blue-100" : `border-transparent ${disable ? "bg-gray-100" : "hover:bg-gray-200"}`}`}
            >
                <span className={value ? disable ? "text-gray-500" :"text-charcoal" : "text-gray-500"}>
                    {value || placeholder}
                </span>
                {!disable &&<svg
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>}
            </button>

            {/* Dropdown Menu */}
            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute p-2 z-50 bottom-16 w-full mt-2 bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                    <ul className="max-h-60 overflow-y-auto">
                        {options.map((option, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className="px-4 py-3 cursor-pointer rounded-full hover:bg-gray-50 text-gray-700"
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};