import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar,
} from '@mui/material';
import { useState, useContext } from 'react';
import { Icone, Logo } from '../assets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts';

const drawerWidth = 240;
const navItems = [
    { titulo: "Receitas", rota: "/receitas", somenteLogado: false },
    { titulo: "Ingredientes", rota: "/ingredientes", somenteLogado: false },
    { titulo: "Favoritos", rota: "/favoritos", somenteLogado: true },
    /* { titulo: "Histórico", rota: "/historico", somenteLogado: true }, */
]

export const BarraNavegacao = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const { logged, logout } = useContext(UserContext)

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const getNavItems = () => {
        if (logged === null)
            return (
                <Button sx={{ color: '#fff' }} onClick={() => navigate("/login")}>
                    Entrar
                </Button>
            )
        return navItems.map((item) => (
            (!item.somenteLogado || logged === true) &&
            <Button key={item.titulo} sx={{ color: '#fff' }} onClick={() => navigate(item.rota)}>
                {item.titulo}
            </Button>
        ))
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ backgroundColor: "primary.main" }}>
                <Logo width="150px" height="90px" />
            </Box>
            <Divider />
            <List>
                {
                    logged === null ?
                        <ListItemButton onClick={() => navigate("/login")}>
                            <ListItemText primary="Entrar" />
                        </ListItemButton> :
                        <>

                            {
                                navItems.map((item) => (
                                    !item.somenteLogado &&
                                    <ListItem key={item.titulo} disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate(item.rota)}>
                                            <ListItemText primary={item.titulo} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }

                            {logged === true &&
                                <>
                                    <Divider></Divider>
                                    <ListItem key={"Perfil"} disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("./perfil")}>
                                            <ListItemText primary={"Perfil"} />
                                        </ListItemButton>
                                    </ListItem>
                                </>}
                            {navItems.map((item) => (
                                (item.somenteLogado && logged === true) &&
                                <ListItem key={item.titulo} disablePadding>
                                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate(item.rota)}>
                                        <ListItemText primary={item.titulo} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            {logged === true &&
                                <>
                                    <Divider></Divider>
                                    <ListItem key={"Sair"} disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => { logout(); navigate("/"); location.reload() }}>
                                            <ListItemText primary={"Sair"} />
                                        </ListItemButton>
                                    </ListItem>
                                </>}

                        </>
                }
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <Icone width="75px" height="75px" sx={{ cursor: 'pointer' }} onClick={() => navigate("/")} />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: '5px' }}>
                        {getNavItems()}
                        {logged === true &&
                            <>
                                <IconButton onClick={() => navigate("/perfil")}>
                                    <AccountCircleIcon sx={{ color: '#fff', fontSize: 60 }} />
                                </IconButton>
                                <IconButton onClick={() => { logout(); navigate("/"); location.reload() }}>
                                    <LogoutIcon sx={{ color: '#fff', fontSize: 30 }} />
                                </IconButton>

                            </>}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: "center", width: '100%', height: `calc(100vh - 100px)`, paddingTop: "100px" }}>
                {props.children}
            </Box>
        </Box>
    );
}