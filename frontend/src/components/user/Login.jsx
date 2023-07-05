import "../../styles/Login.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  //potential errors from server-side validation
  const [errors, setErrors] = useState("");
  const login = useLogin()

  //if user is already logged in, this redirects them to the homepage
  useEffect(() => {
    if (localStorage.name && localStorage.token) {
      //console.log("token is: " + localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      fetch("/user/verify", {
        method: "POST",
        body: JSON.stringify({ token: token }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          //if user is successfully validated, redirect to home page
          window.location.href = "/";
        } else {
          //console.log("res status not 200");
          //do nothing
          //console.log(res.message);
        }
      });
    }
  });

  const handleSubmit = async (e) => {
    const name = e.username;
    const password = e.password;
    const obj = { name, password };

    await login(name, password)

    /* All in a day's job, cleaning up elijah's messy code => see useLogin in hooks folder (replaced code below with custom hook above, got some diff but idea same) */
    // //submit a post request to the backend API endpoint
    // await fetch("/user/login", {
    //   method: "POST",
    //   body: JSON.stringify(obj),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.error) {
    //       //if we retrieve any errors we don't redirect, just display the error msg
    //       setErrors(data.error);
    //     } else {
    //       //retrieve name and token from data, and put in local storage
    //       localStorage.setItem("name", data.name);
    //       localStorage.setItem("token", data.token);

    //       // update authentication context
    //       // dispatch({type: "LOGIN", payload: json})

    //       //redirect user to home page
    //       window.location.href = "/";
    //     }
    //   }); // Note that both 200 and 400 statuses do not produce errors
  };

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("No username provided.")
      .min(5, "Username must be at least 5 characters long."),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password must be at least 8 characters long."),
  });

  return (
    <div className="loginWrapper">
      <Card className="loginCard">
        <FontAwesomeIcon
          icon={faUser}
          size="5x"
          style={{ marginTop: "30px" }}
        ></FontAwesomeIcon>
        <Card.Title as="h1" style={{ marginTop: "10px" }}>
          Sign in
        </Card.Title>
        <span style={{ color: "red" }}>{errors ? errors : ""}</span>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            username: "",
            password: "",
            confirm_password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                label="Username"
                className="mx-5 mb-1"
                style={{
                  width: "30vw",
                  border: "0.5px solid black",
                  borderRadius: "20px",
                }}
              >
                <Form.Control
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  as="input"
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && errors.username}
                  placeholder="Username"
                />
              </FloatingLabel>

              {touched.username && errors.username && (
                <label
                  style={{
                    marginLeft: "60px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.username}
                </label>
              )}

              <FloatingLabel
                label="Password"
                style={{
                  width: "30vw",
                  border: "0.5px solid black",
                  borderRadius: "20px",
                }}
                className="mx-5 mb-1"
              >
                <Form.Control
                  as="input"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && errors.password}
                  type="password"
                  placeholder="Password"
                />
              </FloatingLabel>

              {touched.password && errors.password && (
                <label
                  style={{
                    marginLeft: "60px",
                    color: "red",
                  }}
                >
                  {errors.password}
                </label>
              )}

              <div className="text-center my-3" size="lg">
                <Button
                  disabled={
                    !touched.username ||
                    !touched.password ||
                    errors.username ||
                    errors.password
                  }
                  type="submit"
                  style={{ width: "130px", height: "50px" }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <p>
          Don't have an account yet? <a href="/register">Sign up</a>
        </p>
      </Card>
    </div>
  );
}
