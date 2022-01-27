import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getUserById } from '../../services/useUsersService';
import { Search } from '.';

/*
const mockGetUserById = jest.fn().mockResolvedValue({
  data: {
    name: "José",
    username: "JO",
    email: "jose@teste.com",
  },
});

jest.mock('../../services/useUsersService', () => ({
  useUsersService: () => ({
    getUserById: mockGetUserById,
  }),
}));
*/

jest.mock('../../services/useUsersService');

describe('component <Search />', () => {
  const setup = () => {
    const utils = render(<Search />);
    const fieldSearch = screen.queryByTestId('search-field');
    const buttonFind = screen.queryByText('Pesquisar');

    return {
      ...utils,
      fieldSearch,
      buttonFind,
    }
  };

  test('given render: should match snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  test('given a completed search: should display the message with the result', async () => {
    const { fieldSearch, buttonFind } = setup();

    userEvent.type(fieldSearch, '1');
    userEvent.click(buttonFind);

    await waitFor(() => expect(getUserById).toHaveBeenCalled());
    expect(getUserById).toHaveBeenCalledWith('1');

    const successMessage = screen.queryByTestId('success-message');
    expect(successMessage).toBeInTheDocument();
    expect(successMessage.textContent).toBe(
      'O usuário encontrado foi: José',
    );
  });

  test('given an error in the search: should display an error message', async () => {
    console.error = jest.fn();
    const error = new Error('Falha ao buscar');
    getUserById.mockRejectedValueOnce(error);

    const { fieldSearch, buttonFind } = setup();

    userEvent.type(fieldSearch, '2');
    userEvent.click(buttonFind);

    await waitFor(() => expect(getUserById).toHaveBeenCalled());
    expect(getUserById).toHaveBeenCalledWith('2');

    const errorMessage = screen.queryByTestId('error-message');
    expect(errorMessage).toBeInTheDocument(); //toBeVisible();
    expect(errorMessage.textContent).toBe(
      'Erro ao buscar informações, tente novamente mais tarde.',
    );
    expect(console.error).toHaveBeenCalledWith(error);
    expect(fieldSearch).toBeDisabled();
  });
});
