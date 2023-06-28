import React, { useEffect, createContext, useState } from 'react'

export const CartContext = createContext({
    adicionarIngrediente: () => { },
    removerIngrediente: () => { },
    limparCarrinho: () => { },
    retornarIngredientes: () => { },
    ingredientes: [], setIngredientes: () => { },
    getIds: () => { },
    getNames: () => { },
})

export const CartProvider = ({ children }) => {
    const [ingredientes, setIngredientes] = useState([])

    const adicionarIngrediente = (ingrediente) => {
        const novoCarrinho = [...ingredientes, { nome: ingrediente.name, id: ingrediente.id }]
        return salvar(novoCarrinho)
    }

    const removerIngrediente = (ingrediente) => {
        const novoCarrinho = ingredientes.filter(i => i.id !== ingrediente.id)
        return salvar(novoCarrinho)
    }

    const limparCarrinho = () => {
        return salvar([])
    }

    const retornarIngredientes = () => {
        if (ingredientes.length) {
            return ingredientes
        }

        const carrinho = retornarDoLocalStorage()
        setIngredientes(carrinho)
        return carrinho
    }

    const retornarDoLocalStorage = () => {
        const carrinho = localStorage.getItem("carrinho")
        if (carrinho) {
            return JSON.parse(carrinho)
        }
        return []
    }

    const salvar = (carrinho) => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        setIngredientes(carrinho)
        return carrinho
    }
    const getIds = () => ingredientes.map(i => i.id)
    const getNames = () => ingredientes.map(i => i.nome)

    useEffect(() => {
        const salvo = retornarDoLocalStorage()
        setIngredientes(salvo)
    }, [])

    return (
        <CartContext.Provider value={{
            adicionarIngrediente,
            removerIngrediente,
            limparCarrinho,
            retornarIngredientes,
            ingredientes, setIngredientes,
            getIds, getNames
        }}>
            {children}
        </CartContext.Provider>
    )
}
