import { Injectable } from '@nestjs/common';

import { AbstractOrderService } from './abstract-order.service';
import { HealthMartOrder } from '../interfaces/order.interface';
import { EPharmacyName } from '../enums/integration.enum';
import { healthMartOrders } from '../data/pharmacy.data';

@Injectable()
export class HealthMartService extends AbstractOrderService<
  HealthMartOrder,
  EPharmacyName.healthmart
> {
  constructor() {
    super(healthMartOrders, EPharmacyName.healthmart);
  }
}
