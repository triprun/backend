import {ApiModelProperty} from '@nestjs/swagger';

export class ConcertPostEditDto {

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
  cuisine: [string];

  @ApiModelProperty({example: '', description: ''})
  type: string;

  @ApiModelProperty({example: '', description: ''})
  limitations: [string];

  @ApiModelProperty({example: '', description: ''})
  bestToVisit: [string];

  @ApiModelProperty({example: '', description: ''})
  avgprice: number;

  @ApiModelProperty({example: '', description: ''})
  suitableFor: [string];

  @ApiModelProperty({example: '', description: ''})
  extras: [string];

  accessToken: string;

}
