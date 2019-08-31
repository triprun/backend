import {ApiModelProperty} from '@nestjs/swagger';
import {PlaceDto} from './place.dto';

export class MarschroutePostPlaceInsertDto {

  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty({isArray: true})
  places: PlaceDto;

  readonly accessToken: string;

}
