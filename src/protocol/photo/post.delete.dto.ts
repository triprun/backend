import {ApiModelProperty} from '@nestjs/swagger';

export class PhotoPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
