import "../styles/globals.css"
import { ToastContainer } from 'react-toastify';

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
                {children}
                <ToastContainer />
            </body>
        </html>
    )
}