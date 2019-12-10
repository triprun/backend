import {ApiModelProperty} from '@nestjs/swagger';

export class ChatGetDialogQueryDto {

  @ApiModelProperty({example: '20', description: 'Количество диалогов в выборке', required: false})
  limit?: string;

  @ApiModelProperty({example: '0', description: 'Смещение выборки', required: false})
  skip?: string;

  @ApiModelProperty({example: '0', description: 'Отметить диалог как прочитаным 0/1', required: false})
  read?: string;

  accessToken: string;

}
