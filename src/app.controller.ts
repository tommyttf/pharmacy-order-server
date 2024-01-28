import { Controller, Get } from '@nestjs/common';
import { pharmacies } from './integration/data/pharmacy.data';

@Controller('/pharmacy')
export class AppController {
  constructor() {
    console.log('create new AppController');
  }
  @Get()
  GetPharmacies() {
    return pharmacies;
  }
}
