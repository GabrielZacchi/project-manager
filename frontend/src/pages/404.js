import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

const NoMatch = () => (
    <React.Fragment>
        <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item>
                <h1>Pagina não encontrada 404</h1>
            </Grid>
            <Grid item>
                <Link to="/home" ><h1>Voltar</h1></Link>
            </Grid>
        </Grid>
    </React.Fragment>
)

export default NoMatch