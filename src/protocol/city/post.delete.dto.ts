import {ApiModelProperty} from '@nestjs/swagger';

export class CityPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
