import * as React from "react";
import { Login, Ingrediente, ListaIngredientes, Receita, ListaReceitas, Perfil } from "./pages";
import { Container } from "./components";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <Container />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/ingrediente",
                element: <Ingrediente />,
            },
            {
                path: "/receita",
                element: <Receita />,
            },
            {
                path: "/perfil",
                element: <Perfil />,
            },
            {
                path: "/receitas",
                element: <ListaReceitas />,
            },
            {
                path: "/ingredientes",
                element: <ListaIngredientes />,
            },
        ],
    },
]);
