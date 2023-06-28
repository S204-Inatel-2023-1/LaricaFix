import React, { useEffect, createContext, useState } from 'react'

export const UserContext = createContext({
    logged: null, setLogged: () => { },
    user: null, setUser: () => { },
    retornarUser: () => { },
    cadastrarUser: () => { },
})

export const UserProvider = ({ children }) => {
    const [logged, setLogged] = useState(null)
    const [user, setUser] = useState(null)

    const cadastrarUser = async (nome, email, senha) => {
        const response = await fetch("/api/usuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha })
        })
        const data = await response.json()
        if (data.error) {
            alert(data.error)
            return false
        }
        return data
    }

    const retornarUser = async (email, senha) => {
        const response = await fetch(`/api/usuario?email=${email}&senha=${senha}`)
        const data = await response.json()
        if (data.error) {
            alert(data.error)
            return null
        }
        return data
    }

    useEffect(() => {
        if(user === null) return
        setLogged(Boolean(user))
    }, [user])

    return (
        <UserContext.Provider value={{
            logged, setLogged,
            user, setUser,
            cadastrarUser, retornarUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
