import { ApiModelProperty } from '@nestjs/swagger';

export class HotelGetFetchDto {

    @ApiModelProperty()
    readonly id: string;

    readonly accessToken: string;

}
