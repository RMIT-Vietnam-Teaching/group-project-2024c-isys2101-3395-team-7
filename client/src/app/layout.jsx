import "../styles/globals.css"
import { ToastContainer } from 'react-toastify';
import Providers from "@/context/Providers";

export const metadata = {
    title: "Viego",
    icons: {
        icon: '/vietgo_logo.svg', // /public path
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" >
            <body >
                <Providers>
                    {children}
                    <ToastContainer />
                </Providers>
            </body>
        </html>
    )
}