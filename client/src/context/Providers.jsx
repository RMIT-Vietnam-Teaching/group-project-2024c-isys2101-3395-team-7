import { AuthProvider } from "./AuthContext"
import { HeaderProvider } from "./HeaderContext"

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <HeaderProvider>
                {children}
            </HeaderProvider>
        </AuthProvider>
    )
}

export default Providers