import {ApiModelProperty} from '@nestjs/swagger';

export class ChatPostGroupRemoveDto {

  @ApiModelProperty({example: '', description: 'ИД группового чата'})
  id: string;

  accessToken: string;

}
