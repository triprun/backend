import {ApiModelProperty} from '@nestjs/swagger';

export class RestaurantPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
