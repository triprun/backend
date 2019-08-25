import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export class Users extends Model<Users> {

    @Column
    email: string;

    @Column
    userName: string;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    verified: number;

    @Column
    bdate: number;

    @Column
    sex: number;

    @Column
    bio: string;

    @Column
    avatar: string;

    @Column
    origin: string;

}
