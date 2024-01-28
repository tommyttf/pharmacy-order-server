import { Body, Get, Param, Post } from '@nestjs/common';
import { AbstractOrderService } from '../services/abstract-order.service';

export class AbstractController<T, S> {
  constructor(private readonly orderService: AbstractOrderService<T, S>) {
    console.log(`creating new ${this.constructor.name}`);
  }

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
