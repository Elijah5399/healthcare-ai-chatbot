import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function Registration() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100%",
        display: "flex",
      }}
    >
      <Card
        style={{
          width: "50vw",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faUser}
          size="5x"
          style={{ marginTop: "30px" }}
        ></FontAwesomeIcon>
        <Card.Title as="h1" style={{ marginTop: "10px" }}>
          Register
        </Card.Title>
      </Card>
    </div>
  );
}
