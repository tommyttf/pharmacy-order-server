import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';

import { OrderService } from './order.service';
import { OrderModel } from './models/order.model';
import {
  BadGatewayException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Order } from './entities/order.entity';

const inValidIntegration = 'inValidIntegration';
describe('OrderService', () => {
  let module: TestingModule;

  let orderService: OrderService;
  let httpService: HttpService;
  let orderModel: OrderModel;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OrderService, OrderModel],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    httpService = module.get<HttpService>(HttpService);
    orderModel = module.get<OrderModel>(OrderModel);

    // provide default sample value
    orderService.integrations = ['healthmart', 'careplus', 'quickcare'];
    orderModel.orders = [new Order('1', {}, 'healthmart', 123)];
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  it('can init properly with integration list', async () => {
    const httpSpy = jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: [
          { integrationName: 'healthmart' },
          { integrationName: 'careplus' },
        ],
        status: 200,
        statusText: '',
        headers: {},
        config: null,
      }),
    );
    await module.init();
    expect(httpSpy).toHaveBeenCalledTimes(1);

    expect(orderService.integrations).toEqual(
      expect.arrayContaining(['healthmart', 'careplus']),
    );
    expect(orderService.integrations).not.toEqual(
      expect.arrayContaining(['quickcare']),
    );
  });

  it('cannot init properly when api throw error', async () => {
    const httpSpy = jest.spyOn(httpService, 'get').mockReturnValue(
      throwError(() => {
        return {
          data: {},
          status: 400,
          statusText: '',
          headers: {},
          config: null,
        };
      }),
    );

    await expect(orderService.onModuleInit()).rejects.toThrow(
      ServiceUnavailableException,
    );
    expect(httpSpy).toHaveBeenCalledTimes(1);
  });

  test('checkIntegrationValid', () => {
    expect(() => {
      orderService.checkIntegrationValid(inValidIntegration);
    }).toThrow(NotFoundException);

    expect(orderService.checkIntegrationValid('healthmart')).toBeTruthy();
  });

  test('create order successfully', async () => {
    const pharmacy = 'healthmart';
    const orderPayload = {
      healthMartProduct: 'Painkiller',
      healthMartQuantity: 3,
      healthMartCustomerInfo: {
        healthMartCustName: 'John Doe',
        healthMartCustAddress: '123 Main Street',
        healthMartCustCity: 'Cityville',
        healthMartCustState: 'State',
        healthMartCustZipcode: '12345',
        healthMartCustCountry: 'Country',
      },
    };
    const referId = '1691622645898';

    const data = {
      ...orderPayload,
      healthMartId: referId,
    };
    const httpSpy = jest.spyOn(httpService, 'post').mockReturnValue(
      of({
        data,
        status: 200,
        statusText: '',
        headers: {},
        config: null,
      }),
    );

    const order = await orderService.create({
      ...orderPayload,
      pharmacy,
    });

    expect(httpSpy).toHaveBeenCalledTimes(1);

    expect(order.referId).toBe(referId);
    expect(order.id).toBeDefined();
    expect(order.id).toBeLessThanOrEqual(new Date().getTime());
    expect(order.integration).toBe(pharmacy);
    expect(order.referPayload).toMatchObject(data);
  });

  it('failed to create order', async () => {
    const pharmacy = 'healthmart';

    const httpSpy = jest.spyOn(httpService, 'post').mockReturnValue(
      throwError(() => {
        return {
          data: {},
          status: 400,
          statusText: '',
          headers: {},
          config: null,
        };
      }),
    );

    await expect(
      orderService.create({
        pharmacy,
      }),
    ).rejects.toThrow(BadGatewayException);
    expect(httpSpy).toHaveBeenCalledTimes(1);
  });

  const additionalOrder = new Order('2', {}, 'careplus');
  it('can find all orders from orderModel before and after order creation', () => {
    let orders = orderService.findAll();
    expect(orders.length).toBe(1);

    orderModel.orders = orderModel.orders.concat(additionalOrder);

    orders = orderService.findAll();
    expect(orders.length).toBe(2);
    expect(orders[0].referId).toBe('1');
    expect(orders[1].referId).toBe('2');
  });

  it('can find all orders from orderModel before and after order creation', () => {
    let order = orderService.findOne(123);
    expect(order.integration).toBe('healthmart');

    order = orderModel.create(additionalOrder);
    order = orderService.findOne(order.id);
    expect(order.integration).toBe('careplus');
    expect(order.referId).toBe('2');

    expect(() => orderService.findOne(567)).toThrow(NotFoundException);
  });

  it('can find all orders by integration name', () => {
    let orders = orderService.findByRefer('healthmart');
    expect(orders.length).toBe(1);
    expect(orders[0].integration).toBe('healthmart');

    orders = orderService.findByRefer('careplus');
    expect(orders.length).toBe(0);
  });

  it('can find an order by refer id', () => {
    const order = orderService.findByReferId('1');
    expect(order).toBeDefined();
    expect(order.referId).toBe('1');

    expect(() => orderService.findByReferId('2')).toThrow(NotFoundException);
  });

  it('can find orders directly from api call', async () => {
    const data = [
      {
        healthMartId: '1691622645898',
        healthMartProduct: 'Painkiller',
        healthMartQuantity: 3,
        healthMartCustomerInfo: {
          healthMartCustName: 'John Doe',
          healthMartCustAddress: '123 Main Street',
          healthMartCustCity: 'Cityville',
          healthMartCustState: 'State',
          healthMartCustZipcode: '12345',
          healthMartCustCountry: 'Country',
        },
      },
      {
        healthMartId: '1691684986269',
        healthMartProduct: 'Painkiller',
        healthMartQuantity: 3,
        healthMartCustomerInfo: {
          healthMartCustName: 'John Doe',
          healthMartCustAddress: '123 Main Street',
          healthMartCustCity: 'Cityville',
          healthMartCustState: 'State',
          healthMartCustZipcode: '12345',
          healthMartCustCountry: 'Country',
        },
      },
    ];
    let httpSpy = jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data,
        status: 200,
        statusText: '',
        headers: {},
        config: null,
      }),
    );

    const apiOrders = await orderService.findDirectly('healthmart');
    expect(httpSpy).toHaveBeenCalledTimes(1);

    expect(apiOrders.length).toBe(2);
    expect(apiOrders[0].healthMartId).toBe(data[0].healthMartId);
    expect(apiOrders[1].healthMartId).toBe(data[1].healthMartId);

    httpSpy = jest.spyOn(httpService, 'get').mockReturnValue(
      throwError(() => {
        return {
          data: {},
          status: 400,
          statusText: '',
          headers: {},
          config: null,
        };
      }),
    );

    await expect(orderService.findDirectly('healthmart')).rejects.toThrow(
      BadGatewayException,
    );
    expect(httpSpy).toHaveBeenCalledTimes(2);
  });

  it('can find an order directly with refer id from api call', async () => {
    const data = {
      healthMartId: '1691622645898',
      healthMartProduct: 'Painkiller',
      healthMartQuantity: 3,
      healthMartCustomerInfo: {
        healthMartCustName: 'John Doe',
        healthMartCustAddress: '123 Main Street',
        healthMartCustCity: 'Cityville',
        healthMartCustState: 'State',
        healthMartCustZipcode: '12345',
        healthMartCustCountry: 'Country',
      },
    };
    let httpSpy = jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data,
        status: 200,
        statusText: '',
        headers: {},
        config: null,
      }),
    );

    const apiOrder = await orderService.findDirectly(
      'healthmart',
      data.healthMartId,
    );
    expect(httpSpy).toHaveBeenCalledTimes(1);

    expect(apiOrder.healthMartId).toBe(data.healthMartId);

    httpSpy = jest.spyOn(httpService, 'get').mockReturnValue(
      throwError(() => {
        return {
          data: {},
          status: 400,
          statusText: '',
          headers: {},
          config: null,
        };
      }),
    );

    await expect(
      orderService.findDirectly('healthmart', data.healthMartId),
    ).rejects.toThrow(BadGatewayException);
    expect(httpSpy).toHaveBeenCalledTimes(2);
  });
});
