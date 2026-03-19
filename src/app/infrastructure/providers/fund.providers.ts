import { Provider } from '@angular/core';
import { FUND_REPOSITORY_TOKEN } from '../../application/ports/fund-repository.token';
import { MockFundAdapter } from '../adapters/mock-fund.adapter';

export const provideFundRepository = (): Provider => {
  return {
    provide: FUND_REPOSITORY_TOKEN,
    useClass: MockFundAdapter,
  };
};
