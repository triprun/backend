import { Users } from '../models/users.model';
import { Consts } from '../consts';

export const UsersProvider = [
    {
        provide: Consts.users_rep,
        useValue: Users,
    },
];
