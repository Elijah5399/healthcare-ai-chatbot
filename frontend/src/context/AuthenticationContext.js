import { createContext, useReducer, useContext } from "react";

export const AuthenticationContext = createContext()

export const useAuthenticationContext = () => {
    const context = useContext(AuthenticationContext)

    if (!context) {
        throw Error("useAuthenticationContext must be used inside an AuthenticationContextProvider")
    }

    return context
}

export const authReducer = (prevState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default:
            return prevState
    }
}

export const AuthenticationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {user: null})

    console.log("Authentication state:" + state)

    return(
        <AuthenticationContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthenticationContext.Provider>
    )
}