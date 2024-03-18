const TOKEN = "token";
const REFRESH_TOKEN = "refreshToken";
const TOKEN_EXPIRED_IN = "tokenExpiredIn";
const USER_ROLES = "userRoles";

// Original token
export const getTokenInLocal = () =>localStorage.getItem(TOKEN);


export const getUserRolesInLocal = () => {
  const userRoles = localStorage.getItem(USER_ROLES) || "[]";
  return JSON.parse(userRoles);
};
export const saveTokenInLocal = (userToken: string) =>
  localStorage.setItem(TOKEN, userToken);

export const saveUserRoleInLocal = (userToken: string) =>
  localStorage.setItem(USER_ROLES, userToken);

export const saveTokenExpiration = (expiresIn: number) => {
  localStorage.setItem(TOKEN_EXPIRED_IN, expiresIn.toString());
};

//remove all tokens
export const removeTokens = async () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER_ROLES);
};

