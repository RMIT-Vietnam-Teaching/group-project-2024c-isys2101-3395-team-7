import Header from "@/components/Header";


export const metadata = {
    title: "Viego",
}

const RootLayout = ({ children }) => (
    <html lang='en'>
        <body>
            <main className=''>
                <Header />
                {children}
            </main>
        </body>
    </html>
);

export default RootLayout