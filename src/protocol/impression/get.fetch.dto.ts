import {ApiModelProperty} from '@nestjs/swagger';

export class ImpressionGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
