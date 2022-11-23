import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { IconButton, InputAdornment, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PasswordChecklist from "react-password-checklist"
import { useNavigate } from 'react-router-dom';
import { postUser } from '../api/User';

import Copyright from '../components/Copyright';

import logo from '../assets/logo.png';
import backgroud from '../assets/background.jpg';

export default function SignUpPage(props) {
    const { user } = props;
    const navigate = useNavigate();
    const [message, setMessage] = React.useState({});
    const [showPwd, setShowPwd] = React.useState(false);
    const [password, setPassword] = React.useState("")
    const [passwordAgain, setPasswordAgain] = React.useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        postUser(data, setMessage, navigate);
    };

    const handleClickShowPassword = () => {
        setShowPwd(!showPwd);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${backgroud})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 2,
                            mx: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img draggable="false" id='logo-fontes' src={logo} width="300" alt="logo-fontes" />
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Nome"
                                name="name"
                                autoFocus
                                error={'name' in message}
                                helperText={
                                    'name' in message ?
                                        <div>
                                            <Typography>{message['name']}</Typography>
                                        </div>
                                        : null
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Usuário"
                                name="username"
                                onChangeCapture={() => setMessage({})}
                                error={'username' in message}
                                helperText={
                                    'username' in message ?
                                        <div>
                                            <Typography>{message['username']}</Typography>
                                        </div>
                                        : null
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type={showPwd ? "text" : "password"}
                                id="password"
                                onChange={e => setPassword(e.target.value)}
                                error={'password' in message}
                                helperText={
                                    'password' in message ?
                                        <div>
                                            <Typography>{message['password']}</Typography>
                                        </div>
                                        : null
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="tornar senha visivel"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPwd ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="passwordAgain"
                                label="Senha"
                                type={showPwd ? "text" : "password"}
                                id="passwordAgain"
                                onChange={e => setPasswordAgain(e.target.value)}
                                error={!passwordAgain}
                                helperText={
                                    !passwordAgain ?
                                        <div>
                                            <Typography>{"O campo deve ser preenchido!"}</Typography>
                                        </div>
                                        : null
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="tornar senha visivel"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPwd ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <PasswordChecklist
                                rules={["minLength", "number", "capital", "match"]}
                                minLength={8}
                                value={password}
                                valueAgain={passwordAgain}
                                messages={{
                                    minLength: "A senha tem mais de 8 caracteres.",
                                    number: "A senha tem um número.",
                                    capital: "A senha tem letra maiúscula.",
                                    match: "As senhas correspondem.",
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrar
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        {"já tem uma conta? Entrar"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}