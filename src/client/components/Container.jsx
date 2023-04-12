import { BarraNavegacao } from "./"
import { Outlet } from "react-router-dom"
import { Container as MuiContainer } from "@mui/material"

export const Container = () => {
    return (<>
        <BarraNavegacao>
            <MuiContainer maxWidth="xl" sx={{mt: 3}}>
                <Outlet />
            </MuiContainer>
        </BarraNavegacao>
    </>)
}
