import {ApiModelProperty} from '@nestjs/swagger';

export class RestaurantPostCreateDto {

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
  readonly cuisine: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly type: string;

  @ApiModelProperty({example: '', description: ''})
  readonly limitations: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly bestToVisit: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly avgprice: number;

  @ApiModelProperty({example: '', description: ''})
  readonly suitableFor: [string];

  @ApiModelProperty({example: '', description: ''})
  readonly extras: [string];


  readonly accessToken: string;

}
