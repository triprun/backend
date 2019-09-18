import {ApiModelProperty} from '@nestjs/swagger';

export class UploadPostImageDto {

  @ApiModelProperty({example: '', description: ''})
  file: any;

  readonly accessToken: string;

}
