import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ProjectTable from '../components/home/ProjectTable';
import NavBar from '../components/NavBar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function HomePage(props) {
    const { user } = props;
    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar user={user} />
            <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                <Toolbar />
                <ProjectTable />
                <Fab
                    sx={{
                        position: 'absolute',
                        bottom: 60,
                        right: 40,
                    }}
                    aria-label='add-project'
                    color='primary'
                    variant="extended"
                    href='/project'
                >
                    <AddIcon sx={{ mr: 1 }}/>
                    Novo Projeto
                </Fab>
            </Box>
        </Box>
    );
}