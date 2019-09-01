import {ApiModelProperty} from '@nestjs/swagger';
import {MarschrouteCompanionDto} from './companion.dto';
import {PlaceDto} from './place.dto';

export class MarschrouteAnySwagger {

  @ApiModelProperty({example: '', description: ''})
  id: string;

  @ApiModelProperty({example: '', description: ''})
  name: string;

  @ApiModelProperty({example: '', description: ''})
  description: string;

  @ApiModelProperty({description: '', isArray: true})
  companions: MarschrouteCompanionDto;

  @ApiModelProperty({description: '', isArray: true})
  potentialCompanions: MarschrouteCompanionDto;

  @ApiModelProperty({description: '', isArray: true})
  places: PlaceDto;

}
