import { Component, signal } from '@angular/core';
import { Device } from '@capacitor-geckoview/device';

@Component({
  selector: 'app-device-demo',
  templateUrl: './device.html',
})
export class DeviceDemo {
  protected readonly result = signal('-');

  protected async getInfo(): Promise<void> {
    try {
      const info = await Device.getInfo();
      this.result.set(
        `平台: ${info.platform}, 系统: ${info.operatingSystem} ${info.osVersion}, ` +
          `厂商: ${info.manufacturer}, 型号: ${info.model}, 虚拟: ${info.isVirtual}`,
      );
    } catch (err) {
      this.result.set('getInfo 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async getBattery(): Promise<void> {
    try {
      const { batteryLevel, isCharging } = await Device.getBatteryInfo();
      const level = batteryLevel != null ? Math.round(batteryLevel * 100) + '%' : '(未知)';
      this.result.set(`电量: ${level}, 充电中: ${isCharging ?? '(未知)'}`);
    } catch (err) {
      this.result.set('getBatteryInfo 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async getId(): Promise<void> {
    try {
      const { identifier } = await Device.getId();
      this.result.set(`设备 ID: ${identifier}`);
    } catch (err) {
      this.result.set('getId 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
