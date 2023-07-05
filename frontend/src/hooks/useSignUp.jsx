import { useState } from "react";
import { useAuthenticationContext } from "../context/AuthenticationContext";

/* Custom SignUp Hook */
export const useSignUp = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthenticationContext()

    const signup = async (name, email, password) => {
        setError(null)

        const response = await fetch("/user/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            localStorage.setItem("globalState", JSON.stringify(json));
            localStorage.setItem("name", json.name);
            localStorage.setItem("token", json.token);

            dispatch({type: "LOGIN", payload: json})
        }
    }

    return signup
}