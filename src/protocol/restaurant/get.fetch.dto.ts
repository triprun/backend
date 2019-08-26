import { ApiModelProperty } from '@nestjs/swagger';

export class RestaurantGetFetchDto {

    @ApiModelProperty()
    readonly id: string;

    readonly accessToken: string;

}
