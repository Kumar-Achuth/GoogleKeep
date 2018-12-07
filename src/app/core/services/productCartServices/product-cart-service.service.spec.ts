import { TestBed } from '@angular/core/testing';

import { ProductCartServiceService } from './product-cart-service.service';

describe('ProductCartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCartServiceService = TestBed.get(ProductCartServiceService);
    expect(service).toBeTruthy();
  });
});
