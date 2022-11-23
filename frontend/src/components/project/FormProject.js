import * as React from 'react';
import Typography from '@mui/material/Typography';
import ConfirmDialog from '../ConfirmDialog';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { logout } from '../../api/Auth';

export default function FormProject(props) {
    const {
        handleSubmit,
        responseErro,
        navigate
    } = props;
    const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);

    const handleClickOpenDialogConfirm = () => {
        setOpenDialogConfirm(true);
    };

    const handleCloseDialogConfirm = () => {
        setOpenDialogConfirm(false);
    };

    return (
        <>
            <Container component="form" noValidate onSubmit={handleSubmit} maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" gutterBottom>
                        Novo Projeto
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="title"
                                name="title"
                                label="Título"
                                fullWidth
                                autoComplete="title"
                                variant="standard"
                                error={'title' in responseErro}
                                helperText={
                                    'title' in responseErro ?
                                        <div>
                                            <Typography>{responseErro['title']}</Typography>
                                        </div>
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="cost"
                                name="cost"
                                label="Preço"
                                fullWidth
                                autoComplete="cost"
                                variant="standard"
                                type='number'
                                error={'cost' in responseErro}
                                helperText={
                                    'cost' in responseErro ?
                                        <div>
                                            <Typography>{responseErro['cost']}</Typography>
                                        </div>
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="zip_code"
                                name="zip_code"
                                label="CEP"
                                fullWidth
                                autoComplete="zip_code"
                                variant="standard"
                                type='number'
                                error={'zip_code' in responseErro}
                                helperText={
                                    'zip_code' in responseErro ?
                                        <div>
                                            <Typography>{responseErro['zip_code']}</Typography>
                                        </div>
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="deadline"
                                name="deadline"
                                label="Data limite"
                                autoComplete="deadline"
                                fullWidth
                                variant="standard"
                                type='datetime-local'
                                error={'deadline' in responseErro}
                                InputLabelProps={{ shrink: true }}
                                helperText={
                                    'deadline' in responseErro ?
                                        <div>
                                            <Typography>{responseErro['deadline']}</Typography>
                                        </div>
                                        : null
                                }
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button color="primary" sx={{ mt: 3, ml: 1 }} onClick={() => navigate('/home')}>
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary" sx={{ mt: 3, ml: 1 }}>
                            Salvar
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <ConfirmDialog
                mensagem="Deseja sair?"
                open={openDialogConfirm}
                handleClose={handleCloseDialogConfirm}
                handleConfirm={logout}
            />
        </>
    );
}