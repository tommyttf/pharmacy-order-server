import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { EPharmacyName } from './enums/integration.enum';
import { HealthMartService } from './services/health-mart.service';
import { CarePlusService } from './services/care-plus.service';
import { QuickCareService } from './services/quick-care.service';

@Injectable({ scope: Scope.REQUEST })
export class IntegrationFactory {
  constructor(
    @Inject(REQUEST) private request: Request,
    private healthMartService: HealthMartService,
    private carePlusService: CarePlusService,
    private quickCareService: QuickCareService,
  ) {}
  create() {
    const integration = this.request?.params?.integration;
    if (!EPharmacyName[integration]) {
      throw new BadRequestException(
        `Invalid pharmacy integration: ${integration}`,
      );
    }
    switch (EPharmacyName[integration]) {
      case EPharmacyName.healthmart:
        return this.healthMartService;
      case EPharmacyName.careplus:
        return this.carePlusService;
      case EPharmacyName.quickcare:
        return this.quickCareService;
    }
  }
}
