import { Component, signal, type OnDestroy } from '@angular/core';
import { PushNotifications } from '@capacitor-geckoview/push-notifications';

@Component({
  selector: 'app-push-notifications-demo',
  templateUrl: './push-notifications.html',
})
export class PushNotificationsDemo implements OnDestroy {
  protected readonly result = signal('-');

  protected async register(): Promise<void> {
    try {
      const status = await PushNotifications.requestPermissions();
      this.result.set('权限: ' + JSON.stringify(status));
      await PushNotifications.register();
      this.result.set('已注册, 等待 token...');
    } catch (err) {
      this.result.set('register 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async listen(): Promise<void> {
    try {
      await PushNotifications.addListener('registration', (token) => {
        this.result.set('token: ' + token.value);
      });
      await PushNotifications.addListener('pushNotificationReceived', (notification) => {
        this.result.set('收到通知: ' + JSON.stringify(notification));
      });
      this.result.set('已开始监听');
    } catch (err) {
      this.result.set('listen 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async unregister(): Promise<void> {
    try {
      await PushNotifications.unregister();
      this.result.set('已注销');
    } catch (err) {
      this.result.set('unregister 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  async ngOnDestroy(): Promise<void> {
    await PushNotifications.removeAllListeners();
  }
}
