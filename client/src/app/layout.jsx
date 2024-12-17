import "../styles/globals.css"
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "@/context/AuthContext";

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
                <AuthProvider>
                    {children}
                    <ToastContainer />
                </AuthProvider>
            </body>
        </html>
    )
}