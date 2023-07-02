import "../../styles/Booking.css";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    //e.preventDefault();
    const date = e.date;
    const time = e.time;
    setDate(date);
    setTime(time);

    const dateTimeString = `${date} ${time}`;
    const epochValue = new Date(dateTimeString).getTime();

    setSubmitted(true);

    /* submitting a POST request */
    /* Delay this till after payment is confirmed */

    const response = await fetch("/book/submit", {
      method: "POST",
      body: JSON.stringify({ epochValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const apptSchema = Yup.object().shape({
    date: Yup.date()
      .min(new Date() + 86400000, "Invalid date")
      .required("Date cannot be empty"),
    time: Yup.string().required("Time cannot be empty"),
  });
  /* UI for Booking Form */
  function Forms() {
    return (
      <>
        <Formik
          validationSchema={apptSchema}
          onSubmit={handleSubmit}
          initialValues={{
            date: "",
            time: "",
          }}
          className="formWrapper"
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form>
              <label className="forms">
                Date of Appointment :{" "}
                <Field
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  className={touched.date && errors.date ? "errorDate" : ""}
                />
                <br />
                {touched.date && errors.date ? (
                  <span style={{ color: "red" }}>{errors.date}</span>
                ) : null}
                <br />
                Time of Appointment :{" "}
                <Field
                  type="time"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  className={touched.time && errors.time ? "errorDate" : ""}
                />
                <br />
                {touched.time && errors.time ? (
                  <span style={{ color: "red" }}>{errors.time}</span>
                ) : null}
                <br />
                <button
                  type="submit"
                  disabled={
                    !touched.date || !touched.time || errors.date || errors.time
                  }
                >
                  Submit
                </button>
              </label>
            </Form>
          )}
        </Formik>
      </>
    );
  }
  /*
        <form action="/payment/create-checkout-session" method="POST">
        <button type="submit">Checkout</button>
      </form>
      */
  /* UI for acknowleding Submission */
  function Submit() {
    return (
      <div className="submitWrapper">
        <div className="submitText">
          <h2>Submitted!</h2>
          <h5>
            Your apppointment has been set on {date} at {time}
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div className="bookingpageWrapper">
      <div className="bookingpageText">
        <h1>Make a Booking!</h1>
      </div>

      <div className="bookingpageIntro">
        <h3>
          Welcome to SGH's Appointment Booking System. Simply select the desired
          date and time of your appointment and that's it!
        </h3>
      </div>

      <div className="bookingpageDisclaimer">
        This service is for all Specialist Outpatients Clinics (SOC)
        appointments, except for those below at SGH, which require closer
        monitoring:
        <ul>
          <li>
            Centre for Assisted Reproduction, Gestational Diabetes Clinic,
            Health Assesment Centre, Haemotology Centre, O&G Centre, Pain
            Management Centre, Peritoneal Dialysis Centre, Rehabilitation
            Centre, Renal Clinic, Sleep Disorders Clinic, Urology Centre
          </li>
          <li>
            Allied Health appointments (Physiotherapy, Occupational Therapy,
            Speech Therapy)
          </li>
          <li>Diagnostic Radiology services (X-ray)</li>
        </ul>
        <br />
        Terms and conditions for online appointments:
        <ul>
          <li>
            Strictly for non-emergency and non-urgent cases. For medical
            emergency, please call 995, or visit the nearest emergency
            department.
          </li>
          <li>Subject to availability of slots</li>
          <li>
            You have sufficient supply of medicine till your next appointment
            date.
          </li>
        </ul>
      </div>

      <div className="bookingpageForm">
        {submitted ? <Submit /> : <Forms />}
      </div>
    </div>
  );
}
