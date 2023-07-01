export function PaymentMain() {
  return (
    <>
      <h1>
        You are paying SGD $1.00 to book an appointment. Click the button below
        to checkout.
      </h1>
      <form action="/payment/create-checkout-session" method="POST">
        <button type="submit">Checkout</button>
      </form>
    </>
  );
}

export function PaymentSuccess() {
  return <h1>Payment made successfully.</h1>;
}

export function PaymentCancel() {
  return <h1>Payment made successfully.</h1>;
}
