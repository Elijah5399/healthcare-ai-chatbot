import "../../styles/Booking.css";
import { useState } from "react";

export default function Booking() {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const appt = {date, time}

        const response = await fetch("", {
            method: "POST",
            body: JSON.stringify(appt),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json()

        setSubmitted(true)
    }

    /* UI for Booking Form */
    function Forms() {
        return (
        <form onSubmit={handleSubmit} className="formWrapper" action="/book/submit" method="POST">
            <label className="forms">
                Date of Appointment : {" "}
                <input type="date" name="date" value={date} required={true} onChange={(e) => setDate(e.target.value)}/>
                <br />
                <br />
                Time of Appointment : {" "}
                <input type="time" name="time" value = {time} required={true} onChange={(e) => setTime(e.target.value)}/>
                <br />
                <br />
                <button type="submit">Submit</button>
            </label>
        </form>
        )
    }

    /* UI for acknowleding Submission */
    function Submit() {
        return (
            <div className="submitWrapper">
                <div className="submitText">
                    <h2>Submitted!</h2>
                    <h5>Your apppointment has been set on {date} at {time}</h5>
                </div>
            </div>
        )
    }

    return (
        <div className="bookingpageWrapper">
            <div className="bookingpageText">
                <h1>Make a Booking!</h1>
            </div>

            <div className="bookingpageIntro">
                <h3>Welcome to SGH's Appointment Booking System. Simply select the desired date and time of your appointment and that's it!</h3>
            </div>

            <div className="bookingpageDisclaimer">
                This service is for all Specialist Outpatients Clinics (SOC) appointments, except for those below at SGH, which require closer monitoring:
                <ul>
                    <li>Centre for Assisted Reproduction, Gestational Diabetes Clinic, Health Assesment Centre, Haemotology Centre, O&G Centre, Pain Management Centre, Peritoneal Dialysis Centre, Rehabilitation Centre, Renal Clinic, Sleep Disorders Clinic, Urology Centre</li>
                    <li>Allied Health appointments (Physiotherapy, Occupational Therapy, Speech Therapy)</li>
                    <li>Diagnostic Radiology services (X-ray)</li>
                </ul>

                <br />

                Terms and conditions for online appointments:
                <ul>
                    <li>Strictly for non-emergency and non-urgent cases. For medical emergency, please call 995, or visit the nearest emergency department.</li>
                    <li>Subject to availability of slots</li>
                    <li>You have sufficient supply of medicine till your next appointment date.</li>
                </ul>

            </div>

            <div className="bookingpageForm">
                {submitted ? <Submit /> : <Forms />}
            </div>
        </div>
    )
}