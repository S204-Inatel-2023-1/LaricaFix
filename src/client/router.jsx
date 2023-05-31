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
                loader: async ({ request }) => {
                    const id = request.url.split("/").pop()
                    const requestUrl = new URL("../api/ingredientes/" + encodeURI(id), document.baseURI)
                    requestUrl.searchParams.append("apiKey", import.meta.env.VITE_SPOONACULAR_KEY || "")

                    const response = await fetch(requestUrl).then(res => res.json())
                    return response
                },
            },
            {
                path: "/receita/:id",
                element: <Receita />,
                loader: async ({ request }) => {
                    const id = request.url.split("/").pop()
                    const requestUrl = new URL("../api/receitas/" + encodeURI(id), document.baseURI)
                    requestUrl.searchParams.append("apiKey", import.meta.env.VITE_SPOONACULAR_KEY || "")

                    const response = await fetch(requestUrl).then(res => res.json())
                    return response
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
