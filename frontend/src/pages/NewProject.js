import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NavBar from '../components/NavBar';
import FormProject from '../components/project/FormProject';
import { postProject } from '../api/Project';
import { useNavigate } from 'react-router-dom';

export default function NewProjectPage(props) {
    const { user } = props;
    const [responseErro, setResponseErro] = React.useState({});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        postProject(data, navigate, setResponseErro);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar user={user} />
            <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                <Toolbar />
                <FormProject
                    handleSubmit={handleSubmit}
                    responseErro={responseErro}
                    navigate={navigate}
                />
            </Box>
        </Box>
    );
}