import {ApiModelProperty} from '@nestjs/swagger';

export class PlaceDto {

  @ApiModelProperty({example: '1', description: 'Id места'})
  ref: string;

  @ApiModelProperty({example: 'hotel', description: 'Тип места'})
  refType: string;
}
