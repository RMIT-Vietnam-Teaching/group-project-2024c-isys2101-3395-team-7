"use client"
import React, { useState, useEffect } from 'react';
import GoToTopIcon from "@/components/icons/GoToTopIcon";

const GoToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                console.log("scrolling")
                setIsVisible(true);
            } else {
                console.log("not scrolling")
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            <button
                className={`fixed bottom-10 right-10 bg-black text-white rounded-full p-4 shadow-md transform 
                ${isVisible ? 'translate-y-0 block' : 'hidden'} transition-transform duration-300 ease-in-out`}
                onClick={scrollToTop}
            >
                <GoToTopIcon width={30} height={30} />
            </button>
        </>
    );
};

export default GoToTopButton;