import {ApiModelProperty} from '@nestjs/swagger';

export class HotelPostCreateDto {

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
  readonly type: string;

  @ApiModelProperty()
  readonly stars: number;

  @ApiModelProperty()
  readonly avgprice: number;

  @ApiModelProperty()
  readonly distance: number;

  @ApiModelProperty()
  readonly desktime: string;

  @ApiModelProperty()
  readonly roomtype: [string];

  @ApiModelProperty()
  readonly hotelextras: [string];

  @ApiModelProperty()
  readonly roomextras: [string];

  @ApiModelProperty()
  readonly disabilityextras: [string];

  @ApiModelProperty()
  readonly isnetwork: boolean;

  @ApiModelProperty()
  readonly journeytypes: [string];

  @ApiModelProperty()
  readonly foodtypes: [string];

  @ApiModelProperty()
  readonly shoreline: number;

  @ApiModelProperty()
  readonly specialextras: [string];

  readonly accessToken: string;

}
