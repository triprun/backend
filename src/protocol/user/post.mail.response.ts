import {UserGetProfileResponse} from './get.profile.response';

export interface UserPostMailResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireAt: number;
    refreshTokenExpireAt: number;
    profile: UserGetProfileResponse;
}
