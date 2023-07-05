import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

export const useAuthenticationContext = () => {
    const context = useContext(AuthenticationContext)

    if (!context) {
        throw Error("useAuthenticationContext must be used inside an AuthenticationContextProvider")
    }

    return context
}