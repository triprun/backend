import {ApiModelProperty} from '@nestjs/swagger';

export class CustomGetFetchDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
