import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Produtos.css";

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [codigo, setCodigo] = useState(0);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        listarProdutos();
    }, []);

    function autorizacao() {
        const token = localStorage.getItem("token");
        return { headers: { Authorization: `Bearer ${token}` } };
    }

    function limparFormulario() {
        setCodigo(0);
        setNome("");
        setDescricao("");
        setPreco("");
    }

    async function listarProdutos() {
        const response = await api.get("/produto", autorizacao());
        setProdutos(response.data);
    }

    async function salvarProduto() {
        const dados = { nome, descricao, preco: parseFloat(preco) };
        if (codigo === 0) {
            await api.post("/produto", dados, autorizacao());
        } else {
            await api.put(`/produto/${codigo}`, dados, autorizacao());
        }
        limparFormulario();
        listarProdutos();
    }

    function editarProduto(produto) {
        setCodigo(produto.codigo);
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
    }

    async function excluirProduto(codigo) {
        await api.delete(`/produto/${codigo}`, autorizacao());
        listarProdutos();
    }

    return (
        <div className="container">
            <div className="topo">
                <h1>Produtos</h1>
                <button onClick={() => navigate("/clientes")}>Clientes</button>
            </div>
            <div className="formulario">
                <input
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                    placeholder="Preço"
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
                <button onClick={salvarProduto}>
                    {codigo === 0 ? "Salvar" : "Atualizar"}
                </button>
                {codigo !== 0 && (
                    <button onClick={limparFormulario}>Cancelar</button>
                )}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.codigo}>
                            <td>{produto.nome}</td>
                            <td>{produto.descricao}</td>
                            <td>{produto.preco}</td>
                            <td>
                                <button onClick={() => editarProduto(produto)}>
                                    Editar
                                </button>
                                <button onClick={() => excluirProduto(produto.codigo)}>
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

export default Produtos;
