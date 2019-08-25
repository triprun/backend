import { UserGetProfileResponse } from './get.profile.response';

export interface UserPostPasswordResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireAt: number;
    refreshTokenExpireAt: number;
}
