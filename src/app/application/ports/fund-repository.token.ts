import { InjectionToken } from '@angular/core';
import { FundRepositoryPort } from './fund-repository.port';

export const FUND_REPOSITORY_TOKEN = new InjectionToken<FundRepositoryPort>(
  'FUND_REPOSITORY_TOKEN',
);
