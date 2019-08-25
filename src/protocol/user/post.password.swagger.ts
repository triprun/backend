import { ApiModelProperty } from '@nestjs/swagger';
import {UserGetProfileSwagger} from './get.profile.swagger';

export class UserPostPasswordSwagger {

    @ApiModelProperty({ example: '', description: '' })
    accessToken: string;

    @ApiModelProperty({ example: '', description: '' })
    refreshToken: string;

    @ApiModelProperty({ example: '', description: '' })
    accessTokenExpireAt: number;

    @ApiModelProperty({ example: '', description: '' })
    refreshTokenExpireAt: number;

}
