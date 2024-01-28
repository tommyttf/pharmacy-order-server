import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { AbstractOrderService } from './services/abstract-order.service';

@Controller(':pharmacy/orders')
export class IntegrationController<T, S> {
  // TODO: since `orderService` is created per request, this controller is also created per request
  // will need to get service like directly

  constructor(
    @Inject('INTEGRATION')
    private readonly orderService: AbstractOrderService<T, S>,
  ) {}

  @Post()
  createOrder(@Body() t: T) {
    return this.orderService.createOrder(t);
  }

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':orderId')
  getOrderById(@Param('orderId') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }
}
