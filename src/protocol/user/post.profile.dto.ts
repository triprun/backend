import {ApiModelProperty} from '@nestjs/swagger';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

export class UserPostProfileDto {

  @ApiModelProperty({
    description: 'Имя',
  })
  readonly firstName: string;

  @ApiModelProperty({
    description: 'Фамилия',
  })
  readonly lastName: string;

  @ApiModelProperty({
    description: 'Ник-нейм',
  })
  readonly userName: string;

  @ApiModelProperty({
    description: 'Дата рождения (unix)',
  })
  readonly bdate: number;

  @ApiModelProperty({
    description: 'Аватар',
  })
  readonly avatar: string;


}
