import { EPharmacyName, EPharmacyNameValues } from '../enums/integration.enum';

export type HealthMartOrder = OrderType<
  EPharmacyName.healthmart,
  'Cust',
  'CustomerInfo'
>;
export type CarePlusOrder = OrderType<
  EPharmacyName.careplus,
  'Client',
  'ClientInfo'
>;
export type QuickCareOrder = OrderType<
  EPharmacyName.quickcare,
  'User',
  'UserData'
>;

export interface IOrderService<T> {
  createOrder: (t: T) => T;
  getAllOrders: () => T[];
  getOrderById: (orderId: string) => T;
}

export type OrderType<
  EPharmacy extends EPharmacyNameValues,
  TPrefix extends string,
  TDetailKey extends string,
> = {
  [K in keyof BaseOrderType<
    EPharmacy,
    TPrefix,
    TDetailKey
  > as `${EPharmacy}${K}`]: BaseOrderType<EPharmacy, TPrefix, TDetailKey>[K];
};

type BaseOrderType<
  EPharmacy extends EPharmacyNameValues,
  TPrefix extends string,
  TDetailKey extends string,
> = {
  [Key in `${TDetailKey}`]: {
    [K in keyof IBaseInfo as `${EPharmacy}${TPrefix}${K}`]: IBaseInfo[K];
  };
} & {
  Id: string | undefined;
  Product: string;
  Quantity: number;
};

interface IBaseInfo {
  Name: string;
  Address: string;
  City: string;
  State: string;
  Zipcode: string;
  Country: string;
}
