import {ApiModelProperty} from '@nestjs/swagger';

export class ChatPostGroupSendDto {

  @ApiModelProperty({example: '', description: 'ИД группового чата'})
  id: string;

  @ApiModelProperty({example: '', description: ''})
  text: string;

  accessToken: string;

}
