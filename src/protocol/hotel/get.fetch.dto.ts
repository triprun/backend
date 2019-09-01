import {ApiModelProperty} from '@nestjs/swagger';

export class HotelGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
