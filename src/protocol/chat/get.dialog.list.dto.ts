import {ApiModelProperty} from '@nestjs/swagger';

export class ChatGetDialogListDto {

  @ApiModelProperty({example: 'all', description: 'all, loopback, user, conversation, marschroute'})
  refType: string;

  @ApiModelProperty({example: '20', description: 'Количество диалогов в выборке', required: false})
  limit?: string;

  @ApiModelProperty({example: '0', description: 'Смещение выборки', required: false})
  skip?: string;

  accessToken: string;

}
