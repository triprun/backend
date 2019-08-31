import {ApiModelProperty} from '@nestjs/swagger';

export class PhotoGetFetchDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
