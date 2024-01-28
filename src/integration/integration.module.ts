import { Module, Scope } from '@nestjs/common';
import { IntegrationFactory } from './integration.factory';
import { HealthMartService } from './services/health-mart.service';
import { IntegrationController } from './integration.controller';
import { CarePlusService } from './services/care-plus.service';
import { QuickCareService } from './services/quick-care.service';

@Module({
  providers: [
    {
      provide: 'INTEGRATION',
      scope: Scope.REQUEST,
      useFactory: (integrationFactory: IntegrationFactory) => {
        return integrationFactory.create();
      },
      inject: [IntegrationFactory],
    },
    IntegrationFactory,
    HealthMartService,
    CarePlusService,
    QuickCareService,
  ],
  exports: ['INTEGRATION'],
  controllers: [IntegrationController],
})
export class IntegrationModule {}
