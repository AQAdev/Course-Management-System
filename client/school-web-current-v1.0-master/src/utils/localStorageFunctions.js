export const setUser = (user) => {
  localStorage.setItem("User", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("User"));
};

export const deleteUser = () => {
  localStorage.removeItem("User");
};
