

export const filterUsers = (users: any[], search: string) => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
};