import {ApiModelProperty} from '@nestjs/swagger';

export class ChatPostGroupDropDto {

  @ApiModelProperty({example: '', description: 'ИД группового чата'})
  id: string;

  @ApiModelProperty({example: '', description: 'Пользователи'})
  members: [string];

  accessToken: string;

}
