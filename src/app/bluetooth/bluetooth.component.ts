import { Component, OnInit, NgZone } from '@angular/core';
import { BluetoothService } from './bluetooth.service';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.css']
})
export class BluetoothComponent implements OnInit {

  device: any;
  value: any;
  error: any;

  constructor(public zone: NgZone,
              public bluetoothService: BluetoothService) {
  }

  ngOnInit() {
    this.getDeviceStatus();
    this.streamValues();
  }

  streamValues() {
    this.bluetoothService.streamValues().subscribe(
      this.showValue.bind(this),
      this.showError.bind(this)
    );
  }

  getDeviceStatus() {
    this.bluetoothService.getDevice()
      .subscribe((device) => {
          if (device) {
            this.device = device;
          } else {
            // device not connected or disconnected
            this.device = null;
          }
          this.error = null;
        }, error => {
          this.device = null;
          this.error = error;
        }
      );
  }

  getBatteryLevel() {
    return this.bluetoothService.getValue(
      BluetoothService.GATT_CHARACTERISTIC_BATTERY_LEVEL,
      BluetoothService.GATT_BATTERY_SERVICE
    ).subscribe(
      this.showValue.bind(this),
      this.showError.bind(this)
    );
  }

  getBloodPressure() {
    return this.bluetoothService.getValue(
      BluetoothService.GATT_CHARACTERISTIC_BLOOD_PRESSURE,
      BluetoothService.GATT_BLOOD_PRESSURE_SERVICE
    ).subscribe(
      this.showValue.bind(this),
      this.showError.bind(this)
    );
  }

  getGlucoseLevel() {
    return this.bluetoothService.getValue(
      BluetoothService.GATT_CHARACTERISTIC_GLUCOSE,
      BluetoothService.GATT_GLUCOSE_SERVICE
    ).subscribe(
      this.showValue.bind(this),
      this.showError.bind(this)
    );
  }

  getHeartRate() {
    return this.bluetoothService.getValue(
      BluetoothService.GATT_CHARACTERISTIC_HEART_RATE,
      BluetoothService.GATT_HEART_RATE_SERVICE
    ).subscribe(
      this.showValue.bind(this),
      this.showError.bind(this)
    );
  }

  getTemperature() {
    return this.bluetoothService.getValue(
      BluetoothService.GATT_CHARACTERISTIC_TEMPERATURE,
      BluetoothService.GATT_HEALTH_THERMOMETER_SERVICE
    ).subscribe(
      this.showValue.bind(this),
      this.showError.bind(this)
    );
  }

  getWeight() {
    return this.bluetoothService.getValue(
      BluetoothService.GATT_CHARACTERISTIC_WEIGHT,
      BluetoothService.GATT_HEALTH_WEIGHT_SCALE_SERVICE
    ).subscribe(
      this.showValue.bind(this),
      this.showError.bind(this)
    );
  }

  private showValue(value: any) {
    // force change detection
    this.zone.run(() => {
      this.value = value;
      this.error = null;
    });
  }

  private showError(error: any) {
    // force change detection
    this.zone.run(() => {
      this.value = null;
      this.error = error;
    });
  }
}
