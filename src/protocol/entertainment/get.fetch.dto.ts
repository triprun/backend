import { ApiModelProperty } from '@nestjs/swagger';

export class EntertainmentGetFetchDto {

    @ApiModelProperty()
    readonly id: string;

    readonly accessToken: string;

}