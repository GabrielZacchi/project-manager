import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NavBar from '../components/NavBar';
import FormProject from '../components/project/FormProject';
import { getProjectById, putProject } from '../api/Project';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProjectPage(props) {
    const { user } = props;
    const [responseErro, setResponseErro] = React.useState({});
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        putProject(params.id, data, navigate, setResponseErro);
    };

    React.useEffect(() => {
        getProjectById(params.id, setData, setLoading);
    }, [params]);

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar user={user} />
            <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                <Toolbar />
                <FormProject
                    handleSubmit={handleSubmit}
                    data={data}
                    setData={setData}
                    responseErro={responseErro}
                    navigate={navigate}
                    loading={loading}
                />
            </Box>
        </Box>
    );
}