import {ApiModelProperty} from '@nestjs/swagger';

export class CityPostCreateDto {

  @ApiModelProperty({example: '', description: ''})
  name: string;

  @ApiModelProperty({example: '', description: ''})
  countryId: string;

  @ApiModelProperty({example: '', description: ''})
  description: string;

  @ApiModelProperty({example: '', description: ''})
  photos: [string];

  @ApiModelProperty({example: '', description: ''})
  type: string;

  @ApiModelProperty({example: '', description: ''})
  rating: number;

  readonly accessToken: string;

}
