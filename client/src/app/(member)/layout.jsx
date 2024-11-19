
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const layout = ({ children }) => {
    return (
        <div>
            <Header />
            <NavBar />
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default layout