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

  @ApiModelProperty({
    description: 'О себе',
  })
  readonly about: string;

  @ApiModelProperty({
    description: 'Статус',
  })
  readonly status: string;

  readonly avatar: string;

}
