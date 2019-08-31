import {ApiModelProperty} from '@nestjs/swagger';

export class CountryAnySwagger {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  @ApiModelProperty({example: '', description: ''})
  name: string;

  @ApiModelProperty({example: '', description: ''})
  description: string;

  @ApiModelProperty({example: '', description: ''})
  photos: [string];

  @ApiModelProperty({example: '', description: ''})
  type: string;

  @ApiModelProperty({example: '', description: ''})
  rating: number;

}