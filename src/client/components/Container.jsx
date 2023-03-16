import { BarraNavegacao } from "./"
import { Outlet } from "react-router-dom"
export const Container = () => {
        return (<>
            <BarraNavegacao />
            <div>Container</div>
            <Outlet />
        </>)
    }
