import {ApiModelProperty} from '@nestjs/swagger';

export class TemporaryGetSearchDto {

  @ApiModelProperty()
  readonly limit: number;

  @ApiModelProperty()
  readonly skip: number;

  @ApiModelProperty({required: false})
  readonly name: string;

  readonly accessToken: string;

}