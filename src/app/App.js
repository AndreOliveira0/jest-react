import { ThemeProvider } from '@material-ui/core';
import { AppRouter } from './AppRouter';
import "@fontsource/roboto";
import { theme } from './theme';
import './App.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
);

export { App };
