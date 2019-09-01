import {ApiModelProperty} from '@nestjs/swagger';

export class CountryPostDeleteDto {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  readonly accessToken: string;

}
