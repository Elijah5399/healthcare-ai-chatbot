import "../../styles/Cancelling.css";
import { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useAppointmentsContext } from "../../context/AppointmentsContext";

export default function Cancelling() {
    // const[appts, setAppt] = useState(null)
    const {appts, dispatch} = useAppointmentsContext()

    /* Function to Fetch User's Appointments */
    useEffect(() => {
        const fetchAppts = async () => {
            const response = await fetch("http://localhost:3000/cancel")
            const json = await response.json() // array of data

            if (response.ok) {
                // setAppt(json)
                dispatch({type: "GET_APPOINTMENT", payload: json})
            }

        }
    
        fetchAppts()
    }, [])

    function AppointmentDetails({ appt }) {
        const { dispatch } = useAppointmentsContext()

        /* Function to Handle Click */
        const handleClick = async () => {
            const response = await fetch("/cancel/" + appt._id, {
                method: "DELETE"
            })

            const json = await response.json()

            if (response.ok) {
                dispatch({type: "DEL_APPOINTMENT", payload: json})
            }
        }

        const date = new Date(appt.epochValue)

        const year = date.getFullYear()
        const month = date.getMonth() + 1 // months are zero indexed
        const day = date.getDate()

        const hour = date.getHours()
        const minutes = date.getMinutes().toString().padStart(2, '0'); // format minutes as two digits
        
        return(
            <div className="appt">
                <div className="dateTime">
                    <h4>Date: {`${day}-${month}-${year}`}</h4>
                    <h4>Time: {`${hour}:${minutes}`}</h4>
                </div>
                <div className="icon">
                    <BsFillTrashFill className="trash-icon" onClick={handleClick} />
                </div>
            </div>
        )
    }

    return (
        <div className="cancellingpageWrapper">
            <div className="cancellingpageText">
                <h1>Cancel an Appointment!</h1>
            </div>

            <div className="cancellingpageIntro">
                <h3>Simply click on the trash bin to the right of the appointment that you want to delete!</h3>
            </div>

            <div className="currAppointments">
                {appts && appts.map((appt) => (
                    <AppointmentDetails appt={appt} />
                ))}
            </div>
        </div>
    )
}