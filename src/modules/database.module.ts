import {Module} from '@nestjs/common';
import {databaseProvider} from '../providers/database.provider';
import {UsersProvider} from '../providers/users.provider';
import {PasswordsProvider} from '../providers/passwords.provider';

const data = [
  ...databaseProvider,
  ...UsersProvider,
  ...PasswordsProvider,
];

@Module({
  providers: data,
  exports: data,
})
export class DatabaseModule {
}
