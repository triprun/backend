import { ApiModelProperty } from '@nestjs/swagger';

export class ShoppingPostCreateDto {

    @ApiModelProperty({ example: '', description: '' })
    name: string;

    @ApiModelProperty({ example: '', description: '' })
    description: string;

    @ApiModelProperty({ example: '', description: '' })
    open: number;

    @ApiModelProperty({ example: '', description: '' })
    close: number;

    @ApiModelProperty({ example: '', description: '' })
    photos: [string];

    @ApiModelProperty({ example: '', description: '' })
    verified: boolean;

    @ApiModelProperty({ example: '', description: '' })
    type: string;

    @ApiModelProperty({ example: '', description: '' })
    bestToVisit: [string];

    @ApiModelProperty({ example: '', description: '' })
    suitableFor: [string];

    @ApiModelProperty({ example: '', description: '' })
    extras: [string];

    readonly accessToken: string;

}
