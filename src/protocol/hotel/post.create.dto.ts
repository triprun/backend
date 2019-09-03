import {ApiModelProperty} from '@nestjs/swagger';

export class HotelPostCreateDto {

  @ApiModelProperty({example: '', description: ''})
  readonly name: string;

  @ApiModelProperty({example: '', description: ''})
  readonly description: string;

  @ApiModelProperty({example: '1', description: 'id страны/города'})
  ref: string;

  @ApiModelProperty({example: 'country', description: 'city/country'})
  refType: string;

  @ApiModelProperty({example: '', description: ''})
  readonly open: number;

  @ApiModelProperty({example: '', description: ''})
  readonly close: number;

  @ApiModelProperty({example: '', description: ''})
  readonly photos: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly verified: boolean;

  @ApiModelProperty({example: '', description: ''})
  readonly type: string;

  @ApiModelProperty({example: '', description: ''})
  readonly stars: number;

  @ApiModelProperty({example: '', description: ''})
  readonly avgprice: number;

  @ApiModelProperty({example: '', description: ''})
  readonly distance: number;

  @ApiModelProperty({example: '', description: ''})
  readonly desktime: string;

  @ApiModelProperty({example: '', description: ''})
  readonly roomtype: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly hotelextras: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly roomextras: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly disabilityextras: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly isnetwork: boolean;

  @ApiModelProperty({example: '', description: ''})
  readonly journeytypes: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly foodtypes: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly shoreline: number;

  @ApiModelProperty({example: '', description: ''})
  readonly specialextras: [string];

  readonly accessToken: string;

}
