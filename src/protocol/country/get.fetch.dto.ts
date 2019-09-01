import {ApiModelProperty} from '@nestjs/swagger';

export class CountryGetFetchDto {

  @ApiModelProperty({example: '', description: ''})
  readonly id: string;

  readonly accessToken: string;

}
