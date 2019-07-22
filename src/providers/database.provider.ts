import {Sequelize} from 'sequelize-typescript';
import { Users } from '../models/users.model';
import { Passwords } from '../models/passwords.model';
import { Config } from '../config';
import { Consts } from '../consts';

export const databaseProvider = [
    {
        provide: Consts.dp_provide,
        useFactory: async () => {
            const se = new Sequelize({
                dialect: Config.db_dialect,
                host: Config.db_host,
                port: Config.db_port,
                username: Config.db_username,
                password: Config.db_password,
                database: Config.db_name,
            });
            se.addModels([
                Users,
                Passwords,
            ]);
            await se.sync();
            return se;
        },
    },
]
