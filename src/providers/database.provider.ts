import { Sequelize } from 'sequelize-typescript';
import { Users } from '../models/users.model';
import { Passwords } from '../models/passwords.model';
import * as mongoose from 'mongoose';
import { Config } from '../config';
import { Consts } from '../consts';

export const databaseProvider = [
    {
        provide: Consts.dp_provide,
        useFactory: async () => {
            const se = new Sequelize({
               // dialect: Config.pdb_dialect,
                dialect: 'postgres',
                host: Config.pdb_host,
                port: Config.pdb_port,
                username: Config.pdb_username,
                password: Config.pdb_password,
                database: Config.pdb_name,
            });
            se.addModels([
                Users,
                Passwords,
            ]);
            await se.sync();
            return se;
        },
    },
    {
        provide: Consts.dm_provide,
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(Config.mdb_link, { useFindAndModify: false, useNewUrlParser: true }),
    },
]
