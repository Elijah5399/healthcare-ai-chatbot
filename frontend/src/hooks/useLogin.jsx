import { useState } from "react";
import { useAuthenticationContext } from "./useAuthenticationContext";

/* Custom Login Hook */
export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthenticationContext();

  const login = async (name, password) => {
    setError(null);

    const response = await fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("globalState", JSON.stringify(json));
      localStorage.setItem("name", json.name);
      localStorage.setItem("token", json.token);

      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return login;
};
