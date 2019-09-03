import {ApiModelProperty} from '@nestjs/swagger';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

export class AuthPostRefreshDto {
  @ApiModelProperty({example: '', description: 'RefreshToken', required: true})
  readonly refreshToken: string;
}
