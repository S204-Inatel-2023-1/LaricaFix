import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Login = () => {
    const [estado, setEstado] = useState("login");

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
                    />
                    <TextField
                        id="senha"
                        label="Senha"
                        type="password"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                    />
                    <Button variant="contained" sx={{ width: "100%", mb: 2 }}>
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
                    />
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                    />
                    <TextField
                        id="senha"
                        label="Senha"
                        type="password"
                        variant="outlined"
                        sx={{ width: "100%", mb: 2 }}
                    />
                    <Button variant="contained" sx={{ width: "100%", mb: 2 }}>
                        Cadastrar
                    </Button>
                    <Button variant="contained" sx={{ width: "100%", mb: 2 }} onClick={() => setEstado("login")}>
                        Entrar com Conta Já Existente
                    </Button>
                </form>
            </>}
        <Button variant="outlined" sx={{width: "100%", border: "none", "&:hover": { border: "none" }}} onClick={() => setEstado("login")}>
            Continuar sem usuário
        </Button>
    </Paper>)
}