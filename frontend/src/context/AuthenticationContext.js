import { createContext, useReducer, useContext, useState, useEffect } from "react";

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
                globalState: action.payload
            }
        case "LOGOUT":
            return {
                globalState: null
            }
        default:
            return prevState
    }
}

export const AuthenticationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {globalState: null})
    
    // when the application first loads, this effect fires to retrieve localStorage info to update globalState
    useEffect(() => {
        const globalState = JSON.parse(localStorage.getItem("globalState"))

        if (globalState) {
            dispatch({type: "LOGIN", payload: globalState})
        }
    },[])

    console.log("Authentication state:", state)

    return(
        <AuthenticationContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthenticationContext.Provider>
    )
}