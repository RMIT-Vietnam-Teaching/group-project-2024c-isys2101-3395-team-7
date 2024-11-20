
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function HomeLayout({ children }) {
    return <div className="relative h-full">
        <Header />
        <NavBar />
        <div className="ml-20">
            {children}
        </div>

        {/* <Footer /> */}
    </div>
}