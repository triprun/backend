import { ApiModelProperty } from '@nestjs/swagger';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

export class UserPostMailDto {
    @ApiModelProperty({
        description: 'E-mail',
        required: true,
    })
    readonly email: string;

    @ApiModelProperty({
        description: 'Пароль',
        required: true,
    })
    readonly password: string;

}
