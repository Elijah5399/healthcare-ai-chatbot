import { useAuthenticationContext } from "./useAuthenticationContext";
import { useAppointmentsContext } from "../context/AppointmentsContext";

/* Custom LogOut Hook */
export const useLogOut = () => {
    const { dispatch } = useAuthenticationContext()
    const { dispatch: appointsmentsDispatch } = useAppointmentsContext()

    const logout = async () => {
        // removing user from localStorage
        localStorage.removeItem("globalState")
        localStorage.removeItem("name")
        localStorage.removeItem("token")

        // removing user from global state
        dispatch({type: "LOGOUT"})
        appointsmentsDispatch({type: "GET_APPOINTMENT", payload: null})
    }

    return logout
}