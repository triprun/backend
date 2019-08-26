import { ApiModelProperty } from '@nestjs/swagger';

export class SightGetFetchDto {

    @ApiModelProperty()
    readonly id: string;

    readonly accessToken: string;

}
