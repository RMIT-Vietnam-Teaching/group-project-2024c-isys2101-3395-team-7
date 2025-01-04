"use client"
import React, {useState, useEffect, useRef} from 'react';
import GoToTopIcon from "@/components/icons/GoToTopIcon";
import {useRouter} from "next/navigation";

const GoToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);


    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo(0, 0);
        //     {
        //     top: 0,
        //     behavior: 'smooth',
        // });
        console.log("clicked on scrolltotop")
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            className={`fixed bottom-10 right-10 bg-black text-white rounded-full p-4 shadow-md transform ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            } transition-transform duration-300 ease-in-out`}
            onClick={scrollToTop}
        >
            <GoToTopIcon width={30} height={30}/>
        </button>
    );
};

export default GoToTopButton;