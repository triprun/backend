export interface UserPostRefreshResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireAt: number;
    refreshTokenExpireAt: number;
}
