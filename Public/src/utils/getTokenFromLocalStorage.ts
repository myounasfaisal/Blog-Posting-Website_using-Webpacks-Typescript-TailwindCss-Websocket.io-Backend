export interface Token {
  AccessToken: string | null;
  RefreshToken: string | null;
}

export const getTokenFromLocalStorage = (): Token => {
  const AccessToken = localStorage.getItem("AccessToken");
  const RefreshToken = localStorage.getItem("RefreshToken");

  const Data: Token = { AccessToken, RefreshToken };
  return Data;
};
