import { useAuthenticationContext } from "./useAuthenticationContext";

/* Custom LogOut Hook */
export const useLogOut = () => {
    const { dispatch } = useAuthenticationContext()

    const logout = async () => {
        // removing user from localStorage
        localStorage.removeItem("globalState")
        localStorage.removeItem("name")
        localStorage.removeItem("token")

        // removing user from global state
        dispatch({type: "LOGOUT"})
    }

    return logout
}