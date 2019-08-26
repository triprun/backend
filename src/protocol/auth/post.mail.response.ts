import {UserGetProfileResponse} from '../user/get.profile.response';

export interface AuthPostMailResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireAt: number;
  refreshTokenExpireAt: number;
  profile: UserGetProfileResponse;
}
