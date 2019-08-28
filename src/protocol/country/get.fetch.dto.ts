import {ApiModelProperty} from '@nestjs/swagger';

export class CountryGetFetchDto {

  @ApiModelProperty()
  readonly id: string;

  readonly accessToken: string;

}
