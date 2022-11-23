import axios from "axios";
import { logout } from "./Auth";

export const getProjects = (setData) => {
    axios.get('http://127.0.0.1:5000/projects/',
        { headers: { "Authorization": localStorage.getItem('token') } }
    ).then(res => {
        setData(res.data);
    }).catch(err => {
        logout();
    });
}

export const getProjectById = async (id, setData, setLoading) => {
    setLoading(true);
    await axios.get(`http://127.0.0.1:5000/projects/${id}`,
        { headers: { "Authorization": localStorage.getItem('token') } }
    ).then(res => {
        setData(res.data);
        setLoading(false);
    }).catch(err => {
        if (err.response.status === 401) {
            logout();
        }
    });
}

export const postProject = (data, navigate, setResponseErro) => {
    axios.post(
        `http://127.0.0.1:5000/projects/`,
        {
            title: data.get('title'),
            cost: data.get('cost'),
            zip_code: data.get('zip_code'),
            deadline: data.get('deadline')
        },
        { headers: { "Authorization": localStorage.getItem('token') } }
    ).then(res => {
        navigate('/home');
    }).catch(err => {
        if (err.response.status === 401) {
            logout();
        } else {
            setResponseErro(err.response.data);
        }
    });
}

export const putProject = (id, data, navigate, setResponseErro) => {
    axios.put(
        `http://127.0.0.1:5000/projects/${id}`,
        {
            title: data.get('title'),
            cost: data.get('cost'),
            zip_code: data.get('zip_code'),
            deadline: data.get('deadline')
        },
        { headers: { "Authorization": localStorage.getItem('token') } }
    ).then(res => {
        navigate('/home');
    }).catch(err => {
        if (err.response.status === 401) {
            logout();
        } else {
            setResponseErro(err.response.data);
        }
    });
}

export const deleteProject = (id, handleCloseDialogConfirm) => {
    axios.delete(`http://127.0.0.1:5000/projects/${id}`,
        { headers: { "Authorization": localStorage.getItem('token') } }
    ).then(res => {
        handleCloseDialogConfirm();
    }).catch(err => {
        logout();
    });
}

export const doneProject = (id, handleCloseDialogConfirm) => {
    axios.patch(`http://127.0.0.1:5000/projects/${id}/done`, {},
        { headers: { "Authorization": localStorage.getItem('token') } }
    ).then(res => {
        handleCloseDialogConfirm();
    }).catch(err => {
        logout();
    });
}