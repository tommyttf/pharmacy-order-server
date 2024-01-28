import { AbstractController } from './abstract-controller';
import { QuickCareOrder } from '../interfaces/order.interface';
import { EPharmacyName } from '../enums/integration.enum';
import { Controller } from '@nestjs/common';
import { QuickCareService } from '../services/quick-care.service';

@Controller('quickcare/orders')
export class QuickCareController extends AbstractController<
  QuickCareOrder,
  EPharmacyName.quickcare
> {
  constructor(quickCareService: QuickCareService) {
    super(quickCareService);
  }
}
