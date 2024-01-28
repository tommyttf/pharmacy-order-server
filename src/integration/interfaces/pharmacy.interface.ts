import { EPharmacyNameKeys } from '../enums/integration.enum';

export interface IPharmacy {
  integrationName: EPharmacyNameKeys;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  fax: string;
  phone: string;
}
