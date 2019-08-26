import {ApiModelProperty} from '@nestjs/swagger';

export class RestaurantPostCreateDto {

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty()
  readonly open: number;

  @ApiModelProperty()
  readonly close: number;

  @ApiModelProperty()
  readonly photos: [string];

  @ApiModelProperty()
  readonly verified: boolean;

  @ApiModelProperty()
  readonly cuisine: [string];

  @ApiModelProperty()
  readonly type: string;

  @ApiModelProperty()
  readonly limitations: [string];

  @ApiModelProperty()
  readonly bestToVisit: [string];

  @ApiModelProperty()
  readonly avgprice: number;

  @ApiModelProperty()
  readonly suitableFor: [string];

  @ApiModelProperty()
  readonly extras: [string];


  readonly accessToken: string;

}
