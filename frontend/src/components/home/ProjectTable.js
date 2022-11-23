import React from 'react';
import {
    DataGrid,
    GridToolbar,
    GridActionsCellItem
} from '@mui/x-data-grid';
import {
    getProjects,
    deleteProject,
    doneProject
} from '../../api/Project';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from '../ConfirmDialog';
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';

export default function ProjectTable() {
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = React.useState(false);
    const [openDialogConfirmDone, setOpenDialogConfirmDone] = React.useState(false);
    const [selectedProject, setSelectedProject] = React.useState();

    const handleClickOpenDialogConfirmDelete = () => {
        setOpenDialogConfirmDelete(true);
    };

    const handleCloseDialogConfirmDelete = () => {
        getProjects(setData)
        setOpenDialogConfirmDelete(false);
        setSelectedProject(null)
    };

    const handleClickOpenDialogConfirmDone = () => {
        setOpenDialogConfirmDone(true);
    };

    const handleCloseDialogConfirmDone = () => {
        getProjects(setData)
        setOpenDialogConfirmDone(false);
        setSelectedProject(null)
    };

    React.useEffect(() => {
        getProjects(setData)
    }, [])

    const deleteProjectAction = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setSelectedProject(id);
                handleClickOpenDialogConfirmDelete();
            });
        },
        [],
    );

    const doneProjectAction = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setSelectedProject(id);
                handleClickOpenDialogConfirmDone();
            });
        },
        [],
    );

    const editProjectAction = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                navigate(`/project/${id}`);
            });
        },
        [navigate],
    );

    const columns = React.useMemo(() => [
        {
            field: 'id', headerName: 'ID', identity: true
        },
        {
            field: 'title', headerName: 'Título', type: "string", headerAlign: 'left', align: 'left', flex: 1
        },
        {
            field: 'cost', headerName: 'Preço', type: "number", headerAlign: 'right', align: 'right', flex: 1
        },
        {
            field: 'created_at', headerName: 'Criado', type: "dateTime", headerAlign: 'left', align: 'left', flex: 1, valueGetter: ({ value }) => value && new Date(value)
        },
        {
            field: 'updated_at', headerName: 'Atualizado', type: "dateTime", headerAlign: 'left', align: 'left', flex: 1, valueGetter: ({ value }) => value && new Date(value)
        },
        {
            field: 'deadline', headerName: 'Limite', type: "dateTime", headerAlign: 'left', align: 'left', flex: 1, valueGetter: ({ value }) => value && new Date(value)
        },
        {
            field: 'done', headerName: 'Concluído', type: "boolean", flex: 1
        },
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            getActions: (params) => [
                <Tooltip title="Editar projeto">
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Editar"
                        onClick={editProjectAction(params.id)}
                    />
                </Tooltip>,
                <Tooltip title="Excluir projeto">
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Excluir"
                        onClick={deleteProjectAction(params.id)}
                    />
                </Tooltip>,
                <Tooltip title="Concluir projeto">
                    <GridActionsCellItem
                        icon={<DoneIcon />}
                        label="Concluir"
                        onClick={doneProjectAction(params.id)}
                    />
                </Tooltip>,
            ],
        },
    ],
        [deleteProjectAction, doneProjectAction, editProjectAction],
    );

    return (
        <>
            <div style={{ height: '65vh', width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            columns={columns}
                            rows={data}
                            components={{ Toolbar: GridToolbar }}
                        />
                    </div>
                </div>
            </div>
            <ConfirmDialog
                mensagem={`Deseja excluir o projeto ${selectedProject}?`}
                open={openDialogConfirmDelete}
                handleClose={handleCloseDialogConfirmDelete}
                handleConfirm={() => deleteProject(selectedProject, handleCloseDialogConfirmDelete)}
            />
            <ConfirmDialog
                mensagem={`Deseja concluir o projeto ${selectedProject}?`}
                open={openDialogConfirmDone}
                handleClose={handleCloseDialogConfirmDone}
                handleConfirm={() => doneProject(selectedProject, handleCloseDialogConfirmDone)}
            />
        </>
    );
}