import { Component, signal } from '@angular/core';
import { LocalNotifications } from '@capacitor-geckoview/local-notifications';

@Component({
  selector: 'app-local-notifications-demo',
  templateUrl: './local-notifications.html',
})
export class LocalNotificationsDemo {
  protected readonly result = signal('-');

  protected async requestPermission(): Promise<void> {
    try {
      const status = await LocalNotifications.requestPermissions();
      this.result.set('权限: ' + JSON.stringify(status));
    } catch (err) {
      this.result.set('requestPermissions 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async schedule(): Promise<void> {
    try {
      await LocalNotifications.createChannel({
        id: 'default',
        name: '默认通知',
        importance: 5,
      });
      const res = await LocalNotifications.schedule({
        notifications: [
          {
            title: '本地通知',
            body: '来自 @capacitor-geckoview/local-notifications',
            id: 1,
            schedule: { at: new Date(Date.now() + 5000) },
          },
        ],
      });
      this.result.set('已安排: ' + JSON.stringify(res));
    } catch (err) {
      this.result.set('schedule 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async getPending(): Promise<void> {
    try {
      const pending = await LocalNotifications.getPending();
      this.result.set(`待发通知数: ${pending.notifications.length}`);
    } catch (err) {
      this.result.set('getPending 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
