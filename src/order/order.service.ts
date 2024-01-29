import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

import { IPharmacy } from './interfaces/pharmacy.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { EPharmacyName } from './enums/integration.enum';
import { OrderModel } from './models/order.model';

@Injectable()
export class OrderService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly orderModel: OrderModel,
  ) {}

  private _integrations: string[];
  get integrations() {
    return this._integrations;
  }

  set integrations(integrations: string[]) {
    this._integrations = integrations;
  }
  async create({ pharmacy, ...orderPayload }: CreateOrderDto) {
    this.checkIntegrationValid(pharmacy);
    const { data } = await firstValueFrom(
      this.httpService.post(`${pharmacy}/orders`, orderPayload).pipe(
        catchError((error: AxiosError) => {
          throw new BadGatewayException(
            `Cannot create order from integration ${pharmacy}, error message: ${error.message}`,
          );
        }),
      ),
    );

    return this.orderModel.create(
      new Order(data[`${EPharmacyName[pharmacy]}Id`], data, pharmacy),
    );
  }

  findAll() {
    return this.orderModel.findAll();
  }

  findOne(id: number) {
    const order = this.orderModel.findOne(id);
    if (order === undefined) {
      throw new NotFoundException(`Order not find for id ${id}`);
    }
    return order;
  }

  findByRefer(pharmacy: string) {
    this.checkIntegrationValid(pharmacy);
    return this.orderModel.findByRefer(pharmacy);
  }

  findByReferId(referId: string) {
    const order = this.orderModel.findByReferId(referId);
    if (order === undefined) {
      throw new NotFoundException(`Order not find for refer id ${referId}`);
    }
    return order;
  }

  async findDirectly(pharmacy: string, referId?: string) {
    this.checkIntegrationValid(pharmacy);

    return (
      await firstValueFrom(
        this.httpService
          .get(`${pharmacy}/orders${referId ? `/${referId}` : ''}`)
          .pipe(
            catchError((error: AxiosError) => {
              throw new BadGatewayException(
                `Cannot get order list from integration ${pharmacy}, error message: ${error.message}`,
              );
            }),
          ),
      )
    ).data;
  }

  // every time start the application, query to get the latest list of available integrations
  async onModuleInit() {
    const { data } = await firstValueFrom(
      this.httpService.get<IPharmacy[]>('/pharmacy').pipe(
        catchError((error: AxiosError) => {
          throw new ServiceUnavailableException(
            `Cannot get list of pharmacy, error message: ${error.message}`,
          );
        }),
      ),
    );
    // this.pharmacies = data;
    this.integrations = data.map(({ integrationName }) => integrationName);
    console.log(`available integrations : ${this.integrations}`);
  }

  checkIntegrationValid(pharmacy: string) {
    if (this.integrations.indexOf(pharmacy) === -1) {
      throw new NotFoundException(
        `Pharmacy integration not support : ${pharmacy}`,
      );
    }
    return true;
  }
}
