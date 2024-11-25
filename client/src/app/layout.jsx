import "../styles/globals.css"

export const metadata = {
    title: "Viego",
    icons: {
        icon: '/vietgo_logo.svg', // /public path
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" >
            <body >{children}</body>
        </html>
    )
}