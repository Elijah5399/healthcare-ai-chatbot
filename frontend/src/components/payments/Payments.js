import "../../styles/Payment.css";
import Button from "react-bootstrap/Button";

export function PaymentSuccess() {
  return (
    <div className="paymentWrapper">
      <h2 className="paymentHeader">
        Payment has been successfully made. Click the button below to view your
        appointments.
      </h2>
      <Button href="/cancel">Appointments</Button>
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
      <Button href="/book">Book</Button>
    </div>
  );
}
