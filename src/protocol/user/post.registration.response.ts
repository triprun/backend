import { UserGetProfileResponse } from './get.profile.response';

export interface UserPostRegistrationResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireAt: number;
    refreshTokenExpireAt: number;
    profile: UserGetProfileResponse;
}
