import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Observable } from 'rxjs';

@Injectable()
export class BluetoothService {

  static GATT_BATTERY_SERVICE = 'battery_service';
  static GATT_BLOOD_PRESSURE_SERVICE = 'blood_pressure';
  static GATT_GLUCOSE_SERVICE = 'glucose';
  static GATT_HEART_RATE_SERVICE = 'heart_rate';
  static GATT_HEALTH_THERMOMETER_SERVICE = 'health_thermometer';
  static GATT_HEALTH_WEIGHT_SCALE_SERVICE = 'weight_scale';

  static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'battery_level';
  static GATT_CHARACTERISTIC_BLOOD_PRESSURE = 'blood_pressure_measurement';
  static GATT_CHARACTERISTIC_GLUCOSE = 'glucose_measurement';
  static GATT_CHARACTERISTIC_HEART_RATE = 'heart_rate_measurement';
  static GATT_CHARACTERISTIC_TEMPERATURE = 'temperature_measurement';
  static GATT_CHARACTERISTIC_WEIGHT = 'weight_measurement';

  constructor(public ble: BluetoothCore) {
  }

  getFakeValue() {
    this.ble.fakeNext();
  }

  getDevice() {
    // call this method to get the connected device
    return this.ble.getDevice$();
  }

  streamValues() {

    // call this method to get a stream of values emitted by the device
    return this.ble.streamValues$()
      .map(value => value.getUint8(0));
  }

  /**
   * Get Battery Level GATT Characteristic value.
   * This logic is specific to this service, this is why we can't abstract it elsewhere.
   * The developer is free to provide any service, and characteristics she wants.
   *
   * @return {Observable<number>} Emits the value of the requested service read from the device
   */
  getValue(characteristic: BluetoothCharacteristicUUID, service: BluetoothServiceUUID): Observable<number> {
    try {
      return this.ble

      // 1) call the discover method will trigger the discovery process (by the browser)
        .discover$({filters: [{services: [service]}], optionalServices: [service]})
        // 2) get that service
        .mergeMap(gatt => this.ble.getPrimaryService$(gatt, service))
        // 3) get a specific characteristic on that service
        .mergeMap(primaryService => this.ble.getCharacteristic$(primaryService, characteristic))
        // 4) ask for the value of that characteristic (will return a DataView)
        .mergeMap(returnedCharacteristic => this.ble.readValue$(returnedCharacteristic))
        // 5) on that DataView, get the right value
        .map(value => value.getUint8(0));
    } catch (e) {
      console.error('Oops! can not read value from %s');
    }


    // // 1) call this method to run the discovery process
    // return this.ble.discover$({
    //   filters: [],
    //   optionalServices: [service]
    // })
    // // 2) you'll get the GATT server
    //   .mergeMap((gatt: BluetoothRemoteGATTServer) => {
    //     // 3) get the primary service of that GATT server
    //     return this.ble.getPrimaryService$(
    //       gatt,
    //       service
    //     );
    //   })
    //   .mergeMap((primaryService: BluetoothRemoteGATTService) => {
    //     // 4) get a specific characteristic
    //     return this.ble.getCharacteristic$(
    //       primaryService,
    //       characteristic
    //     );
    //   })
    //   .mergeMap(
    //     (GATTCharacteristic: BluetoothRemoteGATTCharacteristic) => {
    //       // 5) read the provided value (as DataView)
    //       return this.ble.readValue$(GATTCharacteristic);
    //     }
    //   )
    //   // 6) get the right value from the DataView
    //   .map((value: DataView) => value.getUint8(0));
  }
}
