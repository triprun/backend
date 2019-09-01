import {ApiModelProperty} from '@nestjs/swagger';

export class TransportGetSearchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly limit: number;

  @ApiModelProperty({example: '', description: ''})
  readonly skip: number;

  @ApiModelProperty({required: false})
  readonly name: string;

  readonly accessToken: string;

}
