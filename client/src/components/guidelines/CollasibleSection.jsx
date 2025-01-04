"use client"
import {useState} from "react";

export default function CollapsibleSection({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-t border-gray-300 pt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left text-lg font-semibold flex justify-between items-center focus:outline-none"
                type="button"
            >
                {title}
                <span className="text-2xl font-light">
                  {isOpen ? "\u25B4" : "\u25BE"}
                </span>
            </button>

            <div
                className={`mt-4 text-gray-600 leading-relaxed duration-500 transition-[max-height] overflow-hidden ease-in-out${
                    isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                {isOpen && children}
            </div>

            {/*{isOpen && <div className="mt-4 text-gray-600 leading-relaxed">{children}</div>}*/}
            {/*<div*/}
            {/*    className={`mt-4 text-gray-600 leading-relaxed transition-all duration-500 ${*/}
            {/*        isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'*/}
            {/*    }`}*/}
        </div>
    );
}