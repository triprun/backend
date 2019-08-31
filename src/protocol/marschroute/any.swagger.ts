import {ApiModelProperty} from '@nestjs/swagger';
import {MarschrouteCompanionDto} from './companion.dto';
import {PlaceDto} from './place.dto';

export class MarschrouteAnySwagger {

  @ApiModelProperty({description: ''})
  id: string;

  @ApiModelProperty({description: ''})
  name: string;

  @ApiModelProperty({description: ''})
  description: string;

  @ApiModelProperty({description: '', isArray: true})
  companions: MarschrouteCompanionDto;

  @ApiModelProperty({description: '', isArray: true})
  potentialCompanions: MarschrouteCompanionDto;

  @ApiModelProperty({description: '', isArray: true})
  places: PlaceDto;

}
