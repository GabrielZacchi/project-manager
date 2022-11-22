import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logoBranco from '../assets/logo_branco.png';
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmDialog from './ConfirmDialog';
import { logout } from '../api/Auth';

export default function NavBar(props) {
    const { user } = props;
    const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);

    const handleClickOpenDialogConfirm = () => {
        setOpenDialogConfirm(true);
    };

    const handleCloseDialogConfirm = () => {
        setOpenDialogConfirm(false);
    };

    return (
        <>
            <AppBar component="nav">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <img draggable="false" id='logo-fontes' src={logoBranco} width="120" alt="logo-fontes" />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Typography variant="h6">
                            Olá, { user ? user.name : null} {
                                <IconButton
                                    onClick={handleClickOpenDialogConfirm}
                                    color="inherit"
                                >
                                    <LogoutIcon />
                                </IconButton>}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <ConfirmDialog
                mensagem="Deseja sair?"
                open={openDialogConfirm}
                handleClose={handleCloseDialogConfirm}
                handleConfirm={logout}
            />
        </>
    );
}