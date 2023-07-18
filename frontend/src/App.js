import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/mynavbar/MyNavBar";
import Chatbot from "./components/chatbot/Chatbot";
import Homepage from "./components/homepage/Homepage";
import Booking from "./components/booking/Booking";
import Cancelling from "./components/cancelling/Cancelling";
import Contact from "./components/contact/Contact";
import Login from "./components/user/Login";
import Registration from "./components/user/Registration";
import { PaymentSuccess, PaymentCancel } from "./components/payments/Payments";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useAuthenticationContext } from "./hooks/useAuthenticationContext";

function App() {
  const { globalState } = useAuthenticationContext();

  return (
    <div className="app">
      <BrowserRouter>
        <div className="nav">
          <MyNavBar />
        </div>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="chatbot" element={<Chatbot />} />

            <Route path="/book" element={<Booking />} />

            <Route path="/cancel" element={<Cancelling />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Registration />} />

            <Route path="/payment/success" element={<PaymentSuccess />} />

            <Route path="/payment/cancel" element={<PaymentCancel />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
