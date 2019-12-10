import {ApiModelProperty} from '@nestjs/swagger';

export class ChatDialogByIdDto {

  @ApiModelProperty({example: '', description: ''})
  refType: string;

  @ApiModelProperty({example: '', description: ''})
  ref: string;

  accessToken: string;

}
