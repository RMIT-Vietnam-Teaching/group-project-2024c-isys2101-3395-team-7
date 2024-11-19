

export const metadata = {
    title: "Viego",
}

const RootLayout = ({ children }) => (
    <html lang='en'>
        <body>
            <main className=''>
                {children}
            </main>
        </body>
    </html>
);

export default RootLayout