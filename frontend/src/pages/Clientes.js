import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Clientes.css";

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        listarClientes();
    }, []);

    function autorizacao() {
        const token = localStorage.getItem("token");
        return { headers: { Authorization: `Bearer ${token}` } };
    }

    async function listarClientes() {
        const response = await api.get("/cliente", autorizacao());
        setClientes(response.data);
    }

    async function salvarCliente() {
        await api.post("/cliente", { nome, email, telefone }, autorizacao());
        setNome("");
        setEmail("");
        setTelefone("");
        listarClientes();
    }

    async function excluirCliente(codigo) {
        await api.delete(`/cliente/${codigo}`, autorizacao());
        listarClientes();
    }

    return (
        <div className="container">
            <div className="topo">
                <h1>Clientes</h1>
                <button onClick={() => navigate("/produtos")}>Produtos</button>
            </div>
            <div className="formulario">
                <input
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                <button onClick={salvarCliente}>Salvar</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.codigo}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>
                                <button onClick={() => excluirCliente(cliente.codigo)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Clientes;
