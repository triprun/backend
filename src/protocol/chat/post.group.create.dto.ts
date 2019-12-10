import {ApiModelProperty} from '@nestjs/swagger';

export class ChatPostGroupCreateDto {

  @ApiModelProperty({example: '', description: 'Участники'})
  members: [string];

  @ApiModelProperty({example: '', description: ''})
  name: string;

  accessToken: string;

}
