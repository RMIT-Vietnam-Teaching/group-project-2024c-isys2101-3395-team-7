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
                        <div className='flex flex-row w-[100%] overflow-hidden' style={{ minHeight: "calc(100vh - 50px)" }}>
                            <NavBar />
                            <div className='flex-1 overflow-auto'>
                                {children}
                            </div>
                            {/* <Footer /> */}
                        </div>

                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default layout