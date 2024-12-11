"use client"

import Link from "next/link";
import { useRouter } from 'next/router'

export default function LandingPage() {
    const router = useRouter()

    return (
        <>
            <div className="min-h-screen bg-black text-white">
                <header className="flex justify-between items-center px-8 py-4 border-b border-white">
                    {/* Logo */}
                    <div className="text-3xl font-bold italic">
                        <img src={"viego_logo.svg"} alt="logo" />
                    </div>
                    {/* Navigation */}
                    <nav className="flex space-x-4">
                        <button
                            onClick={() => router.push('/register')}
                            className="text-sm font-medium hover:underline"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => router.push('/login')}
                            className="bg-red px-4 py-2 rounded text-sm text-black font-medium hover:bg-orange"
                        >
                            Log In
                        </button>
                    </nav>
                </header>

                <main className="flex flex-col lg:flex-row justify-between items-center px-8 py-16 lg:py-24">
                    {/* Left Section */}
                    <div className="max-w-xl space-y-6 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">
                            Welcome to <img src={'logo_full.svg'} alt={'Viego_full'} className={'h-24 w-24 px-1.5'}/>
                            {/*<span className="text-rose-400 italic">Viego</span>*/}
                        </h1>
                        <p className="text-gray-300">
                            Your Gateway to Vietnamese Language Learning and Improvement
                        </p>
                        <ul className="text-white space-y-2 list-disc pl-5">
                            <li>Handwriting Recognition: Practice writing Vietnamese characters.</li>
                            <li>Voice Recognition: Refine your pronunciation.</li>
                            <li>
                                Comprehensive Language Learning: Personalized vocabulary and grammar quizzes.
                            </li>
                        </ul>
                        <p className="text-gray-400">
                            Whether you’re a beginner or an advanced learner, Viego has something for everyone.
                            Let’s embark on your Vietnamese language journey together!
                        </p>
                        <button className="bg-orange-400 px-6 py-3 rounded text-black font-medium hover:bg-orange">
                            Get Started
                        </button>
                    </div>

                    {/* Right Section */}
                    <div>
                        <img src={'placeholder.png'} alt={'placeholder_image'} className={'h-96 w-full'} />
                        {/*// className="mt-10 lg:mt-0 lg:ml-16 w-full lg:w-1/2 h-96 bg-rose-500 rounded-lg flex justify-center items-center text-gray-200">*/}
                        {/*// <span>[Placeholder elements: UPDATE LATER]</span>*/}
                    </div>
                </main>
            </div>
        </>
    )
}