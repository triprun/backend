import {ApiModelProperty} from '@nestjs/swagger';

export class EntertainmentPostCreateDto {

  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  open: number;

  @ApiModelProperty()
  close: number;

  @ApiModelProperty()
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

}
