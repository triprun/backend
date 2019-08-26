import {ApiModelProperty} from '@nestjs/swagger';

export class ImpressionGetFetchDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
