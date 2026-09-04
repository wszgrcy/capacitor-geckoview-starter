import { Component, signal } from '@angular/core';
import { AppLauncher } from '@capacitor-geckoview/app-launcher';

@Component({
  selector: 'app-app-launcher-demo',
  templateUrl: './app-launcher.html',
})
export class AppLauncherDemo {
  protected readonly url = signal('https://google.com');
  protected readonly result = signal('-');

  protected async canOpen(): Promise<void> {
    try {
      const { value } = await AppLauncher.canOpenUrl({ url: this.url() });
      this.result.set(`canOpenUrl: ${value}`);
    } catch (err) {
      this.result.set('canOpenUrl 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async open(): Promise<void> {
    try {
      this.result.set('正在打开...');
      const { completed } = await AppLauncher.openUrl({ url: this.url() });
      this.result.set(`openUrl completed: ${completed}`);
    } catch (err) {
      this.result.set('openUrl 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
