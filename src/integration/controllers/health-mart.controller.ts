import { AbstractController } from './abstract-controller';
import { HealthMartOrder } from '../interfaces/order.interface';
import { EPharmacyName } from '../enums/integration.enum';
import { Controller } from '@nestjs/common';
import { HealthMartService } from '../services/health-mart.service';

@Controller('healthmart/orders')
export class HealthMartController extends AbstractController<
  HealthMartOrder,
  EPharmacyName.healthmart
> {
  constructor(healthMartService: HealthMartService) {
    super(healthMartService);
  }
}
