import "../styles/globals.css"

export const metadata = {
    title: "Viego",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" >
            <body >{children}</body>
        </html>
    )
}