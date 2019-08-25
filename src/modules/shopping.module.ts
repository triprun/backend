import { Module } from '@nestjs/common';
import { ShoppingController } from '../controllers/shopping.controller';
import { shoppingProviders } from '../providers/shopping.provider';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from './auth.module';
import {CommonPlaceModule} from './common.place.module';

@Module({
  controllers: [ShoppingController],
  imports: [DatabaseModule, AuthModule, CommonPlaceModule],
  providers: [
    ...shoppingProviders,
  ],
})
export class ShoppingModule {}
