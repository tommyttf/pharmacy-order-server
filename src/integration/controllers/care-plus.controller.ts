import { AbstractController } from './abstract-controller';
import { CarePlusService } from '../services/care-plus.service';
import { CarePlusOrder } from '../interfaces/order.interface';
import { EPharmacyName } from '../enums/integration.enum';
import { Controller } from '@nestjs/common';

@Controller('careplus/orders')
export class CarePlusController extends AbstractController<
  CarePlusOrder,
  EPharmacyName.careplus
> {
  constructor(carePlusService: CarePlusService) {
    super(carePlusService);
  }
}
