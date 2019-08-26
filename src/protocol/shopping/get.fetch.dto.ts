import { ApiModelProperty } from '@nestjs/swagger';

export class ShoppingGetFetchDto {

    @ApiModelProperty()
    readonly id: string;

    readonly accessToken: string;

}
