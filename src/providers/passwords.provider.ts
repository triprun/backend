import { Passwords } from '../models/passwords.model';
import { Consts } from '../consts';

export const PasswordsProvider = [
    {
        provide: Consts.passwords_rep,
        useValue: Passwords,
    },
];
