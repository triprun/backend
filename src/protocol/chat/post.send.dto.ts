import {ApiModelProperty} from '@nestjs/swagger';

export class ChatPostSendDto {

  @ApiModelProperty({example: '', description: 'loopback, user, conversation, marschroute'})
  refType: string;

  @ApiModelProperty({example: '', description: 'userId, conversationId, marschrouteId'})
  ref: string;

  @ApiModelProperty({example: '', description: ''})
  text: string;

  accessToken: string;

}
