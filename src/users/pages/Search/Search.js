import { useState } from 'react';
import { Alert } from '@material-ui/lab';
import {
  Box,
  Container,
  Input,
  Typography,
  Button,
} from '@material-ui/core';
import { useUsersService } from '../../services';

const Search = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const { getUserById } = useUsersService();

  const handleChange = ({ target: { value }}) => setSearch(value);

  const handleSubmit = () => {
    setResult(null);
    getUserById(search)
      .then((result) => {
        const { data } = result;
        setResult(data.name);
      })
      .catch(err => {
        console.error(err);
        setResult(null);
        setError(true);
      })
  }

  return (
    <main>
      <Container maxWidth="sm">
        <Box pt={4}>
          <Typography gutterBottom>
            Busca de usuário por ID:
          </Typography>
          <Input
            value={search}
            onChange={handleChange}
            name="search"
            placeholder="Digite aqui o ID do usuário"
            fullWidth
            variant="outlined"
            disabled={error}
            inputProps={{
              "data-testid": "search-field",
            }}
          />
          <Box py={2}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={handleSubmit}
            >
              Pesquisar
            </Button>
          </Box>
          {result && (
            <Alert
              severity="success"
              data-testid="success-message"
            >
              {`O usuário encontrado foi: ${result}`}
            </Alert>
          )}
          {error && (
            <Alert
              severity="error"
              data-testid="error-message"
            >
              Erro ao buscar informações, tente novamente mais tarde.
            </Alert>
          )}
        </Box>
      </Container>
    </main>
  );
}

export { Search };
