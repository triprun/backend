import {ApiModelProperty} from '@nestjs/swagger';

export class CityGetFetchDto {

  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  countyId: string;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  photos: [string];

  @ApiModelProperty()
  type: string;

  @ApiModelProperty()
  rating: number;

  readonly accessToken: string;

}
