import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export class Passwords extends Model<Passwords> {

    @Column
    userId: number;

    @Column
    password: string;

    @Column
    isActive: number;

}
