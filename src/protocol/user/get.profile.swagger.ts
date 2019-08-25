import { ApiModelProperty } from '@nestjs/swagger';

export class UserGetProfileSwagger {

    @ApiModelProperty({ example: '', description: '' })
    id: number;

    @ApiModelProperty({ example: '', description: '' })
    email: string;

    @ApiModelProperty({ example: '', description: '' })
    userName: string;

    @ApiModelProperty({ example: '', description: '' })
    firstName: string;

    @ApiModelProperty({ example: '', description: '' })
    lastName: string;

    @ApiModelProperty({ example: '', description: '' })
    verified: number;

    @ApiModelProperty({ example: '', description: '' })
    sex: number;

    @ApiModelProperty({ example: '', description: '' })
    bio: string | null;

    @ApiModelProperty({ example: '', description: '' })
    avatar: string | null;

    @ApiModelProperty({ example: '', description: '' })
    joined: string;

    @ApiModelProperty({ example: '', description: '' })
    origin: string | null;

}
