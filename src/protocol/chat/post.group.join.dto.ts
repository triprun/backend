import {ApiModelProperty} from '@nestjs/swagger';

export class ChatPostGroupJoinDto {

  @ApiModelProperty({example: '', description: 'ИД группового чата'})
  id: string;

  @ApiModelProperty({example: '', description: 'Пользователи'})
  members: [string];

  accessToken: string;

}
