import {ApiModelProperty} from '@nestjs/swagger';

export class ChatPostCreateDto {

  @ApiModelProperty({example: '', description: 'private, group'})
  type: string;

  @ApiModelProperty({example: '', description: ''})
  name: string;

  @ApiModelProperty({example: '', description: ''})
  members: [string];

  accessToken: string;

}
