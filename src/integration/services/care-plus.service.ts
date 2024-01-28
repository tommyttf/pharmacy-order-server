import { Injectable } from '@nestjs/common';

import { AbstractOrderService } from './abstract-order.service';
import { CarePlusOrder } from '../interfaces/order.interface';
import { EPharmacyName } from '../enums/integration.enum';
import { carePlusOrders } from '../data/pharmacy.data';

@Injectable()
export class CarePlusService extends AbstractOrderService<
  CarePlusOrder,
  EPharmacyName.careplus
> {
  constructor() {
    super(carePlusOrders, EPharmacyName.careplus);
  }
}
