import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Viego",
}

const RootLayout = ({ children }) => (
    <html lang='en'>
        <body>
            <main className=''>
                <NavBar />
                {children}
                <Footer />
            </main>
        </body>
    </html>
);

export default RootLayout