import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar,
} from '@mui/material';
import * as React from 'react';
import { Icone, Logo } from '../assets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const navItems = [
    { titulo: "Receitas", rota: "/receitas", somenteLogado: false },
    { titulo: "Ingredientes", rota: "/ingredientes", somenteLogado: false },
    { titulo: "Favoritos", rota: "/favoritos", somenteLogado: true },
    { titulo: "Histórico", rota: "/historico", somenteLogado: true },
]

export const BarraNavegacao = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const user = { logado: true }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const getNavItems = () => {
        return navItems.map((item) => (
            (!item.somenteLogado || user.logado) &&
            <Button key={item.titulo} sx={{ color: '#fff' }} onClick={() => navigate(item.rota)}>
                {item.titulo}
            </Button>
        ))
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ backgroundColor: "primary.main" }}>
                <Logo width="150px" height="90px"/>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    !item.somenteLogado &&
                    <ListItem key={item.titulo} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate(item.rota)}>
                            <ListItemText primary={item.titulo} />
                        </ListItemButton>
                    </ListItem>
                ))}

                {user.logado &&
                    <>
                        <Divider></Divider>
                        <ListItem key={"Perfil"} disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("./perfil")}>
                                <ListItemText primary={"Perfil"} />
                            </ListItemButton>
                        </ListItem>
                    </>}
                {navItems.map((item) => (
                    (item.somenteLogado && user.logado) &&
                    <ListItem key={item.titulo} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate(item.rota)}>
                            <ListItemText primary={item.titulo} />
                        </ListItemButton>
                    </ListItem>
                ))}
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
                        <Icone width="75px" height="75px" />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: '5px' }}>
                        {getNavItems()}
                        <AccountCircleIcon sx={{ color: '#fff', fontSize: 60 }} />
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
            <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems:"center", width: '100%' }}>
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}