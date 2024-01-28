import { Injectable } from '@nestjs/common';

import { AbstractOrderService } from './abstract-order.service';
import { QuickCareOrder } from '../interfaces/order.interface';
import { EPharmacyName } from '../enums/integration.enum';
import { quickCareOrders } from '../data/pharmacy.data';

@Injectable()
export class QuickCareService extends AbstractOrderService<
  QuickCareOrder,
  EPharmacyName.quickcare
> {
  constructor() {
    super(quickCareOrders, EPharmacyName.quickcare);
  }
}
