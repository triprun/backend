import {ApiModelProperty} from '@nestjs/swagger';

export class CustomPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
