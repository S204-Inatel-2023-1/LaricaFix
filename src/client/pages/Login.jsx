import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [estado, setEstado] = useState("login");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [erro, setErro] = useState("");
    const { retornarUser, cadastrarUser, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        setEmail("")
        setSenha("")
        setNome("")
        setErro("")
    }, [estado])

    const logar = async () => {
        if (!email.length || !senha.length)
            return setErro("Não pode haver campos vazios!")

        if (!/.+@.+\..+/.test(email))
            return setErro("Email inválido!")

        if (senha.length < 8)
            return setErro("Senha deve ter no mínimo 8 caracteres!")

        const retorno = await retornarUser(email, senha);
        if (retorno.message)
            return setErro(retorno.message.replaceAll(/\b\w/g, m => m.toUpperCase()))

        setUser(retorno)
    }

    const cadastrar = async () => {
        if (!nome.length || !email.length || !senha.length)
            return setErro("Não pode haver campos vazios!")

        if (!/.+@.+\..+/.test(email))
            return setErro("Email inválido!")

        if (senha.length < 8)
            return setErro("Senha deve ter no mínimo 8 caracteres!")

        const retorno = await cadastrarUser(nome, email, senha);
        setUser(retorno)
    }


    return (<Paper sx={{ width: { xs: "100%", sm: "500px" }, p: 3, m: "5em auto" }}>
        {estado === "login" &&
            <>
                <Typography variant="h4" component="h1" sx={{ my: 2 }}>
                    Login
                </Typography>
                <form>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="senha"
                        label="Senha"
                        type="password"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    {erro.length !== 0 &&
                        <Typography variant="body1" sx={{ color: "red" }}>
                            {erro}
                        </Typography>}
                    <Button variant="contained" sx={{ width: "100%", mb: 2 }} onClick={logar}>
                        Entrar
                    </Button>
                    <Button variant="contained" sx={{ width: "100%", mb: 2 }} onClick={() => setEstado("cadastro")}>
                        Criar nova Conta
                    </Button>
                </form>
            </>}
        {estado === "cadastro" &&
            <>
                <Typography variant="h4" component="h1" sx={{ my: 2 }}>
                    Cadastro
                </Typography>
                <form>
                    <TextField
                        id="nome"
                        label="Nome"
                        type="text"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="senha"
                        label="Senha"
                        type="password"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    {erro.length !== 0 &&
                        <Typography variant="body1" sx={{ color: "red" }}>
                            {erro}
                        </Typography>}
                    <Button variant="contained" sx={{ width: "100%", mb: 2 }} onClick={cadastrar}>
                        Cadastrar
                    </Button>
                    <Button variant="contained" sx={{ width: "100%", mb: 2 }} onClick={() => setEstado("login")}>
                        Entrar com Conta Já Existente
                    </Button>
                </form>
            </>}
        <Button variant="outlined" sx={{ width: "100%", border: "none", "&:hover": { border: "none" } }}
            onClick={() => {
                setUser(false);
                navigate("/receitas");
            }}>
            Continuar sem usuário
        </Button>
    </Paper>)
}