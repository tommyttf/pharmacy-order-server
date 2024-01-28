import { NotFoundException } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';

export abstract class AbstractOrderService<T, S> implements IOrderService<T> {
  protected orders: T[];
  protected name: S;
  protected idKey: string;

  protected constructor(orders: T[], name: S) {
    console.log(`creating new ${this.constructor.name}, name: ${name}`);
    this.orders = orders;
    this.name = name;
    this.idKey = `${name}Id`;
  }

  public createOrder(t: T) {
    t[this.idKey] = new Date().getTime() + '';
    this.orders.push(t);
    return t;
  }

  public getAllOrders() {
    return this.orders;
  }

  public getOrderById(orderId: string) {
    const order = this.orders.find((order) => order[this.idKey] === orderId);
    if (order === undefined) {
      throw new NotFoundException();
    }
    return order;
  }
}
