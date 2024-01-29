import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrderModule } from './order/order.module';

@Module({
  imports: [
    // IntegrationModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
    }),
    OrderModule,
  ],
  providers: [],
})
export class AppModule {}
