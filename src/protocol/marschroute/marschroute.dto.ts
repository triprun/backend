import {ApiModelProperty} from '@nestjs/swagger';

export class MarschrouteDto {

  @ApiModelProperty({example: '', description: 'Id места'})
  id: number;

  @ApiModelProperty({example: '', description: 'Тип места (hotel, concert, impression...)'})
  typePlace: string;

}
