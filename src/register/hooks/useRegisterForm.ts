import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../services/registerUser";

export const useRegisterForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setName(event.target.value);
    };

    const handleSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSurname(event.target.value);
    };

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

        const res = await registerUser({ name, surname, email, password });

        if (res.success) {
            navigate("/profile");
        } else {
            setError(res.message || "Error al registrarse");
        }
    };

    return {
        name,
        surname,
        email,
        password,
        error,
        handleName,
        handleSurname,
        handleEmail,
        handlePassword,
        handleSubmit,
    };
};
