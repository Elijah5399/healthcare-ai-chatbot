import "../../styles/Login.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import validator from "validator";
import { useState } from "react";

export default function Registration() {
  //potential errors from server-side validation
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    const email = e.email;
    const name = e.username;
    const password = e.password;
    const obj = { email, name, password };

    await fetch("/user/signup", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //if we retrieve any errors we don't redirect, just display the error msg
          setErrors(data.error);
        } else {
          //TODO: pass on the username and token to other pages
          const name = data.name;
          const token = data.token;
          //if the login is successful, redirect user to main page
          window.location.href = "/";
        }
      });
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .test("is-valid", "Invalid email", (value) => validator.isEmail(value)),
    username: yup
      .string()
      .required("No username provided.")
      .min(5, "Username must be at least 5 characters long."),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password must have at least 8 characters")
      .test(
        "is-strong",
        "Password must contain at least one lowercase and one uppercase character.",
        (value) =>
          validator.isStrongPassword(value, { minNumbers: 0, minSymbols: 0 })
      ),
    confirm_password: yup
      .string()
      .required("Confirmed password cannot be empty")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    <div className="loginWrapper">
      <Card className="registerCard">
        <FontAwesomeIcon
          icon={faUser}
          size="5x"
          style={{ marginTop: "30px" }}
        ></FontAwesomeIcon>
        <Card.Title as="h1" style={{ marginTop: "10px" }}>
          Sign up
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
                label="Email"
                className="mx-5 mb-1"
                style={{
                  width: "30vw",
                  border: "0.5px solid black",
                  borderRadius: "20px",
                }}
              >
                <Form.Control
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  as="input"
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                  placeholder="Email"
                />
              </FloatingLabel>

              {touched.email && errors.email && (
                <label
                  style={{
                    marginLeft: "60px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.email}
                </label>
              )}
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

              <FloatingLabel
                label="Confirm Password"
                style={{
                  width: "30vw",
                  border: "0.5px solid black",
                  borderRadius: "20px",
                }}
                className="mx-5 mb-1"
              >
                <Form.Control
                  as="input"
                  name="confirm_password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.confirm_password && !errors.confirm_password}
                  isInvalid={
                    touched.confirm_password && errors.confirm_password
                  }
                  type="password"
                  placeholder="Confirm Password"
                />
              </FloatingLabel>

              {touched.confirm_password && errors.confirm_password && (
                <label
                  style={{
                    marginLeft: "60px",
                    color: "red",
                  }}
                >
                  {errors.confirm_password}
                </label>
              )}

              <div className="text-center my-3" size="lg">
                <Button
                  disabled={
                    !touched.email ||
                    !touched.username ||
                    !touched.password ||
                    !touched.confirm_password ||
                    errors.email ||
                    errors.username ||
                    errors.password ||
                    errors.confirm_password
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
      </Card>
    </div>
  );
}
