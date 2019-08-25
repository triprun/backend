import { ApiModelProperty } from '@nestjs/swagger';

export class AuthPostRefreshSwagger {

    @ApiModelProperty({ example: '', description: '' })
    accessToken: string;

    @ApiModelProperty({ example: '', description: '' })
    refreshToken: string;

    @ApiModelProperty({ example: '', description: '' })
    accessTokenExpireAt: number;

    @ApiModelProperty({ example: '', description: '' })
    refreshTokenExpireAt: number;

}
