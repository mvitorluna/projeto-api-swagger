import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function fazerLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", {
                usuario,
                senha
            });
            localStorage.setItem("token", response.data.token);
            navigate("/clientes");
        } catch {
            alert("Usuário ou senha inválidos");
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={fazerLogin}>
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
                <p className="login-dica">Usuário: admin | Senha: 123</p>
            </form>
        </div>
    );
}

export default Login;
