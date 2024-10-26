import { createContext, useEffect, useState } from "react";
import { getFromCookie } from "../Utils/Cookie";
import { TOKEN } from "../Utils/Constant";

const AuthState = createContext();

const AuthContext = (props) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const AUTH_TOKEN = getFromCookie(TOKEN);
        if (AUTH_TOKEN) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return <AuthState.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {props.children}
    </AuthState.Provider>

};

export { AuthContext, AuthState };