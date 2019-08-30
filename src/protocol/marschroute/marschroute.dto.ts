import {ApiModelProperty} from '@nestjs/swagger';

export class PlaceDto {

  @ApiModelProperty({example: '', description: 'Id места'})
  id: number;

  @ApiModelProperty({example: '', description: 'Тип места (hotel, concert, impression...)'})
  typePlace: string;

}
