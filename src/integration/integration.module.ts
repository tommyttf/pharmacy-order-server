import { Module } from '@nestjs/common';
import { HealthMartService } from './services/health-mart.service';
import { CarePlusService } from './services/care-plus.service';
import { QuickCareService } from './services/quick-care.service';
import { CarePlusController } from './controllers/care-plus.controller';
import { HealthMartController } from './controllers/health-mart.controller';
import { QuickCareController } from './controllers/quick-care.controller';

@Module({
  providers: [HealthMartService, CarePlusService, QuickCareService],
  controllers: [HealthMartController, CarePlusController, QuickCareController],
})
export class IntegrationModule {}
