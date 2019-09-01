import {ApiModelProperty} from '@nestjs/swagger';

export class HotelAnySwagger {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  @ApiModelProperty({example: '', description: ''})
  name: string;

  @ApiModelProperty({example: '', description: ''})
  description: string;

  @ApiModelProperty({example: '1', description: 'id страны/города'})
  ref: string;

  @ApiModelProperty({example: 'country', description: 'city/country'})
  refType: string;

  @ApiModelProperty({example: '', description: ''})
  open: number;

  @ApiModelProperty({example: '', description: ''})
  close: number;

  @ApiModelProperty({example: '', description: ''})
  photos: [string];

  @ApiModelProperty({example: '', description: ''})
  verified: boolean;

  @ApiModelProperty({example: '', description: ''})
  type: string;

  @ApiModelProperty({example: '', description: ''})
  stars: number;

  @ApiModelProperty({example: '', description: ''})
  avgprice: number;

  @ApiModelProperty({example: '', description: ''})
  distance: number;

  @ApiModelProperty({example: '', description: ''})
  desktime: string;

  @ApiModelProperty({example: '', description: ''})
  roomtype: [string];

  @ApiModelProperty({example: '', description: ''})
  hotelextras: [string];

  @ApiModelProperty({example: '', description: ''})
  roomextras: [string];

  @ApiModelProperty({example: '', description: ''})
  disabilityextras: [string];

  @ApiModelProperty({example: '', description: ''})
  isnetwork: boolean;

  @ApiModelProperty({example: '', description: ''})
  journeytypes: [string];

  @ApiModelProperty({example: '', description: ''})
  foodtypes: [string];

  @ApiModelProperty({example: '', description: ''})
  shoreline: number;

  @ApiModelProperty({example: '', description: ''})
  specialextras: [string];

}
