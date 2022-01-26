export const getUserById = jest.fn().mockResolvedValue({
  data: {
    name: "José",
    username: "JO",
    email: "jose@teste.com",
  },
});

export function useUsersService() {
  return { getUserById };
}