import { ApiModelProperty } from '@nestjs/swagger';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

export class UserPostPasswordDto {

    @ApiModelProperty({
        description: 'Старый пароль',
        required: true,
    })
    readonly oldPassword: string;

    @ApiModelProperty({
        description: 'Новый пароль',
        required: true,
    })
    readonly newPassword: string;

}
