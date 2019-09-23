import {Module} from '@nestjs/common';
import {ChatController} from '../controllers/chat.controller';
import {dialogProviders} from '../providers/dialog.provider';
import {messageProviders} from '../providers/message.provider';
import {DatabaseModule} from '../modules/database.module';
import {AuthModule} from './auth.module';
import {ChatService} from '../services/chat.service';
import {UserModule} from './user.module';
import {EventModule} from './event.module';

@Module({
  controllers: [ChatController],
  imports: [DatabaseModule, AuthModule, UserModule, EventModule],
  providers: [
    ...dialogProviders,
    ...messageProviders,
    ChatService,
  ],
  exports: [ChatService],
})
export class ChatModule {
}
