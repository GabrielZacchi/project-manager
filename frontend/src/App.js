import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { currentUser, isLogin } from './api/Auth';
import './App.css';
import RoutesHandler from './routes';
import { ptBR } from '@mui/x-data-grid';
import { ptBR as pickersPtBR } from '@mui/x-date-pickers';
import { ptBR as corePtBR } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#E1530D',
        contrastText: '#ffffff',
      }
    },
  },
  ptBR,
  pickersPtBR,
  corePtBR,
);

export default function App() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (isLogin() && !user) {
      currentUser(setUser);
    }
  }, [user]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <RoutesHandler user={user} />
      </ThemeProvider>
    </React.Fragment>
  );
}
