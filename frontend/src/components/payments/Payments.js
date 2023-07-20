import "../../styles/Payment.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export function PaymentSuccess() {
  return (
    <div className="paymentWrapper">
      <h2 className="paymentHeader">
        Payment has been successfully made. Click the button below to view your
        appointments.
      </h2>
      <Button>
        <Link to="/cancel">Appointments</Link>
      </Button>
    </div>
  );
}

export function PaymentCancel() {
  return (
    <div className="paymentWrapper">
      <h2 className="paymentHeader">
        Payment has been cancelled. Click the button below to book an
        appointment.
      </h2>
      <Button>
        <Link to="/book">Book</Link>
      </Button>
    </div>
  );
}
