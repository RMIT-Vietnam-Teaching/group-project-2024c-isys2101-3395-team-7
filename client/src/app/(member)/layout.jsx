import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Suspense } from "react";

const layout = ({ children }) => {
    return (
        <>
            <Suspense>
                <div>
                    <div className={'flex flex-col h-[100vh]'}>
                        <div className={'h-auto'}>
                            <Header />
                        </div>
                        <div className='flex flex-row w-[100%] ' style={{ minHeight: "calc(100vh - 50px)" }}>
                            <div className="relative md:w-16 h-full">
                                <NavBar />
                            </div>
                            <div className='flex-1 w-full md:overflow-y-auto'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default layout