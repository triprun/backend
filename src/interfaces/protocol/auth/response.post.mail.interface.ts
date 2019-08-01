export interface AuthResponsePostMailInterface {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireAt: number;
    refreshTokenExpireAt: number;
    profile?: any;
}
