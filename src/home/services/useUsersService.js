import { api } from '../../app/clients';

function useUsersService() {

  const getUserById = id =>
    api.request({ url: `/users/${id}` })

  return { getUserById };
}

export { useUsersService };
