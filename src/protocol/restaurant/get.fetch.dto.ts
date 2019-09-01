import {ApiModelProperty} from '@nestjs/swagger';

export class RestaurantGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
