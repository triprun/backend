import { ApiModelProperty } from '@nestjs/swagger';

export class RelaxGetFetchDto {

    @ApiModelProperty()
    readonly id: string;

    readonly accessToken: string;

}
