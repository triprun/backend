import {ApiModelProperty} from '@nestjs/swagger';

export class UploadPostImageDto {

  @ApiModelProperty({example: '', description: ''})
  name: string;

  @ApiModelProperty({example: '', description: ''})
  description: string;

  readonly accessToken: string;

}
