import * as React from "react";
import { Home, Login, Ingrediente, ListaIngredientes, Receita, ListaReceitas, Perfil, RotaInvalida } from "./pages";
import { Container } from "./components";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <Container />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/ingrediente/:id",
                element: <Ingrediente />,
                loader: ({ params }) => {
                    return  params.id;
                },
            },
            {
                path: "/receita/:id",
                element: <Receita />,
                loader: ({ params }) => {
                    return  params.id;
                },
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
            {
                path: "/*",
                element: <RotaInvalida />,
            },
        ],
    },
]);
