import {ApiModelProperty} from '@nestjs/swagger';

export class ShoppingPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
