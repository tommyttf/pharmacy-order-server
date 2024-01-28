import {
  CarePlusOrder,
  HealthMartOrder,
  QuickCareOrder,
} from '../interfaces/order.interface';
import { IPharmacy } from '../interfaces/pharmacy.interface';

export const pharmacies: IPharmacy[] = [
  {
    integrationName: 'healthmart',
    name: 'HealthMart Pharmacy',
    address: '123 Main St',
    city: 'Cityville',
    state: 'Stateville',
    zipcode: '12345',
    country: 'Countryland',
    fax: '123-456-7890',
    phone: '987-654-3210',
  },
  {
    integrationName: 'careplus',
    name: 'CarePlus Pharmacy',
    address: '456 Elm St',
    city: 'Townsville',
    state: 'Stateville',
    zipcode: '67890',
    country: 'Countryland',
    fax: '567-890-1234',
    phone: '876-543-2109',
  },
  {
    integrationName: 'quickcare',
    name: 'QuickCare Pharmacy',
    address: '789 Oak St',
    city: 'Villageville',
    state: 'Stateville',
    zipcode: '54321',
    country: 'Countryland',
    fax: '345-678-9012',
    phone: '765-432-1098',
  },
];
export const healthMartOrders: HealthMartOrder[] = [
  {
    healthMartId: '1706377885997',
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

export const carePlusOrders: CarePlusOrder[] = [
  {
    carePlusId: '1706377885997',
    carePlusProduct: 'Antibiotics',
    carePlusQuantity: 2,
    carePlusClientInfo: {
      carePlusClientName: 'Jane Smith',
      carePlusClientAddress: '456 Elm Street',
      carePlusClientCity: 'Townville',
      carePlusClientState: 'State',
      carePlusClientZipcode: '54321',
      carePlusClientCountry: 'Country',
    },
  },
];

export const quickCareOrders: QuickCareOrder[] = [
  {
    quickCareId: '1706377885997',
    quickCareProduct: 'Cold Medicine',
    quickCareQuantity: 1,
    quickCareUserData: {
      quickCareUserName: 'Alice Johnson',
      quickCareUserAddress: '789 Oak Avenue',
      quickCareUserCity: 'Villageville',
      quickCareUserState: 'State',
      quickCareUserZipcode: '98765',
      quickCareUserCountry: 'Country',
    },
  },
];
