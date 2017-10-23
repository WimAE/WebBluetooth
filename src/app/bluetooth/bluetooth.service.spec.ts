import { TestBed, inject } from '@angular/core/testing';

import { BluetoothService } from './bluetooth.service';

describe('BluetoothService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BluetoothService]
    });
  });

  it('should be created', inject([BluetoothService], (service: BluetoothService) => {
    expect(service).toBeTruthy();
  }));
});
