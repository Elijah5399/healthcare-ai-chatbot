import { createContext, useReducer, useContext } from "react";

/* Ensures Updated Appointments Are Shown When User Deletes */
export const AppointmentsContext = createContext()

export const useAppointmentsContext = () => {
    const context = useContext(AppointmentsContext)

    if (!context) {
        throw Error("useAppointmentsContext must be used inside an AppointmentsContextProvider")
    }

    return context
}

export const apptsReducer = (prevState, action) => {
    switch (action.type) {
        case "GET_APPOINTMENT":
            return {
                appts: action.payload
            }
        case "DEL_APPOINTMENT":
            return {
                appts: prevState.appts.filter((appt) => appt._id !== action.payload._id) // filtering through all the appts to delete the appt where appt._id === action.payload._id
            }
        default:
            return prevState
    }
}

export const AppointmentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(apptsReducer, {appts: null})

    return(
        <AppointmentsContext.Provider value={{...state, dispatch}}>
            { children }
        </AppointmentsContext.Provider>
    )
}