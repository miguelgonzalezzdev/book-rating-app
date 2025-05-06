import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../services/loginUser";

export const useLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPassword(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const res = await loginUser({ email, password });

        if (res.success) {
            navigate("/");
        } else {
            setError(res.message || "Error al iniciar sesión");
        }
    };

    return {
        email,
        password,
        error,
        handleEmail,
        handlePassword,
        handleSubmit,
    };
};
