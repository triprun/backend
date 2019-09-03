import {ApiModelProperty} from '@nestjs/swagger';

export class ShoppingGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
