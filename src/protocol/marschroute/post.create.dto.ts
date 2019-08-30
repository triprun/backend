import {ApiModelProperty} from '@nestjs/swagger';
import {MarschrouteCompanionDto} from './companion.dto';
import {MarschrouteDto} from './marschroute.dto';

export class MarschroutePostCreateDto {

  @ApiModelProperty({example: '', description: 'Название'})
  name: string;

  @ApiModelProperty({example: '', description: 'Описание'})
  description: string;

  @ApiModelProperty({example: '', description: 'Id пользователя, который создал путешествие'})
  author: number;

  @ApiModelProperty({example: '', description: 'Тип 0 - закрытое путешествие, 1 - открытое путешествие, 2 - открытое путешествие можно присоединиться.'})
  type: number;

  @ApiModelProperty({ description: 'Участники путешествия', isArray: true})
  companions: MarschrouteCompanionDto;

  @ApiModelProperty({ description: 'Запросы на участие в путешествии', isArray: true})
  potentialCompanions: MarschrouteCompanionDto;

  @ApiModelProperty({ description: 'Маршрут путешествия', isArray: true})
  marschroute: MarschrouteDto;

  readonly accessToken: string;

}
