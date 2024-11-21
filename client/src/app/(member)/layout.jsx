
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const layout = ({ children }) => {
    return (
        <>
            <div>
                <div className='flex flex-col bg-pink h-[100vh]'>
                    <div className='h-auto'>
                        <Header />
                    </div>
                    <div className='flex flex-row w-[100%] overflow-hidden' style={{minHeight: "calc(100vh - 50px)"}}>
                        <NavBar />
                        {children}
                        {/* <Footer /> */}
                    </div>

                </div>
            </div>
        </>
    )
}

export default layout