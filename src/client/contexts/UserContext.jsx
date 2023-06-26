import React, { useEffect, createContext, useState } from 'react'

export const UserContext = createContext({
    logged: null, setLogged: () => { },
})

export const UserProvider = ({ children }) => {
    const [logged, setLogged] = useState(null)

    return (
        <UserContext.Provider value={{
            logged, setLogged,
        }}>
            {children}
        </UserContext.Provider>
    )
}
