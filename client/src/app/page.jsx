"use client"
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

const landingpage = () => {
    const router = useRouter()

    return (
        <>
            <div className="min-h-screen bg-black ">
                <header className="flex justify-between items-center px-8 py-4 border-b border-white">
                    {/* Logo */}
                    <div className="text-3xl font-bold italic">
                        {/* <img src="/client/public/vietgo_logo.svg" alt="logo" className={'h-18 w-18'} /> */}
                        <Logo width={30} height={30} />
                    </div>
                    {/* Navigation */}
                    <nav className="flex space-x-4">
                        <button
                            onClick={() => router.push('/register')}
                            className="text-sm font-medium hover:underline text-white"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => router.push('/login')}
                            className="bg-red px-4 py-2 rounded text-sm text-black font-medium bg-pink hover:bg-orange"
                        >
                            Log In
                        </button>
                    </nav>
                </header>
                <main
                    className="flex h-full flex-col lg:flex-row justify-center flex-grow items-center px-8 py-16 lg:py-24">
                    {/*className="flex min-h-[calc(100vh-4.5rem)] flex-col lg:flex-row justify-center flex-grow items-center px-8 py-16 lg:py-24">*/}

                    {/*<main className="flex flex-row min-h-screen justify-center items-center h-full px-8">*/}

                    {/* Left Section */}
                    <div
                        className="flex justify-center items-center flex-col flex-3/5 max-w-xl space-y-6 text-center lg:text-left">
                        <div>
                            <h1 className="text-white text-5xl font-bold flex flex-col lg:flex-row text-center justify-center items-center">
                                Welcome to <img src={'logo_full.svg'} alt={'Viego_full'}
                                    className={'h-48 w-48 px-1.5'} />
                                {/*<span className="text-rose-400 italic">Viego</span>*/}
                            </h1>
                        </div>
                        <div className={"text-white"}>
                            <p>
                                Your Gateway to Vietnamese Language Learning and Improvement
                            </p>
                        </div>
                        <div className={"text-[#797474]"}>
                            <p>
                                Master the Vietnamese language with Vietgo's innovative tools:
                            </p>
                            <ul className="space-y-2 list-disc pl-5">
                                <li>Handwriting Recognition: Practice writing Vietnamese characters.</li>
                                <li>Voice Recognition: Refine your pronunciation.</li>
                                <li>
                                    Comprehensive Language Learning: Personalized vocabulary and grammar quizzes.
                                </li>
                            </ul>
                            <p>
                                Whether you’re a beginner or an advanced learner, Viego has something for everyone.
                                Let’s embark on your Vietnamese language journey together!
                            </p>
                        </div>
                        <div className={"flex justify-start w-full"}>
                            <button
                                onClick={() => router.push('/register')}
                                className="bg-orange-400 px-6 py-3 rounded text-black bg-orange font-medium hover:text-bold hover:shadow-lg">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className={"flex justify-center items-center flex-2/5"}>
                        <img src={'viego-landing-page-illustration.png'} alt={'landing-page'}  className="object-contain"
                             style={{
                                 height: 'calc((100vh - 4.5rem) * 3/4)', // Dynamic height
                                 width: 'auto', // Proportional width
                             }}
                             />
                    </div>
                </main>
            </div>
        </>
    )
}

export default landingpage