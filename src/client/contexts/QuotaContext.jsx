import React, { useEffect, createContext, useState } from 'react'

export const QuotaContext = createContext({
    setUsedQuota: () => { },
})

export const QuotaProvider = ({ children }) => {
    const [usedQuota, setUsedQuota] = useState(0)
    const [maxQuota, setMaxQuota] = useState(150)

    useEffect(() => {
        console.log(`Cota utilizada: ${usedQuota}/${maxQuota}`)
        if (usedQuota > maxQuota)
            alert("Uso da cota da api excedido!")
    }, [usedQuota])

    return (
        <QuotaContext.Provider value={{
            setUsedQuota
        }}>
            {children}
        </QuotaContext.Provider>
    )
}
