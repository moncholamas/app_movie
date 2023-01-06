import { createContext, useState } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({children}) => {
    const user = localStorage.getItem('user')

    const [authState, setAuthState] = useState({
        token: null,
        user: user ? JSON.parse(user) : ''
    })

    const isAuthenticated = () => {
        return authState.token? true : false;
    }

    return (
        <Provider value={{ authState, setAuthState, isAuthenticated }} >
            { children }
        </Provider>
    )
}

export { AuthContext, AuthProvider }