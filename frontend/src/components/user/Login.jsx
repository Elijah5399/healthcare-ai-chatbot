import "../../styles/Login.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";

export default function Login() {
  const { Formik } = formik;

  const handleSubmit = async (e) => {
    const username = e.username;
    const password = e.password;

    const response = await fetch("/user/login", {
      method: "POST",
      body: { username, password },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Response ok");
    } else {
      alert("Respone not ok");
    }

    alert(username + password);
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
        <Formik validationSchema={schema} onSubmit={handleSubmit}>
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
