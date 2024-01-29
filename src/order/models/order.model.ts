import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';

// this class is used to be a simulation of DB
@Injectable()
export class OrderModel {
  private _orders: Order[] = [];

  get orders(): Order[] {
    return this._orders;
  }

  set orders(value: Order[]) {
    this._orders = value;
  }

  create(order: Order) {
    order.id = new Date().getTime();
    this._orders.push(order);
    return order;
  }

  findAll() {
    return this._orders;
  }

  findOne(id: number) {
    return this._orders.find((order) => order.id === id);
  }

  findByRefer(pharmacy: string) {
    return this._orders.filter((order) => order.integration === pharmacy);
  }

  findByReferId(referId: string) {
    return this._orders.find((order) => order.referId === referId);
  }
}
