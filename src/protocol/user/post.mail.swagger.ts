import { ApiModelProperty } from '@nestjs/swagger';
import { UserGetProfileSwagger } from './get.profile.swagger';

export class UserPostMailSwagger {

    @ApiModelProperty({ example: '', description: '' })
    accessToken: string;

    @ApiModelProperty({ example: '', description: '' })
    refreshToken: string;

    @ApiModelProperty({ example: '', description: '' })
    accessTokenExpireAt: number;

    @ApiModelProperty({ example: '', description: '' })
    refreshTokenExpireAt: number;

    @ApiModelProperty({ example: '', description: '' })
    profile: UserGetProfileSwagger;

}
