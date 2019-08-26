export interface AuthPostRefreshResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireAt: number;
  refreshTokenExpireAt: number;
}
