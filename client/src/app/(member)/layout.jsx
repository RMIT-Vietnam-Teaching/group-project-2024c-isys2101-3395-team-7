
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const layout = ({ children }) => {
    return (
        <>
            <div>
                <div>
                    <div>
                        <Header />
                    </div>
                    <div>
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