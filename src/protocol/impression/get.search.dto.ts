import {ApiModelProperty} from '@nestjs/swagger';

export class ImpressionGetSearchDto {

  @ApiModelProperty()
  readonly limit: number;

  @ApiModelProperty()
  readonly skip: number;

  @ApiModelProperty({required: false})
  readonly name: string;

  readonly accessToken: string;

}
