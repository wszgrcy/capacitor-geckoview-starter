import { Component, signal } from '@angular/core';
import { ScreenOrientation } from '@capacitor-geckoview/screen-orientation';

@Component({
  selector: 'app-screen-orientation-demo',
  templateUrl: './screen-orientation.html',
})
export class ScreenOrientationDemo {
  protected readonly result = signal('-');

  protected async current(): Promise<void> {
    try {
      const { type } = await ScreenOrientation.orientation();
      this.result.set(`当前方向: ${type}`);
    } catch (err) {
      this.result.set('orientation 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async lockPortrait(): Promise<void> {
    try {
      await ScreenOrientation.lock({ orientation: 'portrait' });
      this.result.set('已锁定为 portrait');
    } catch (err) {
      this.result.set('lock 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async lockLandscape(): Promise<void> {
    try {
      await ScreenOrientation.lock({ orientation: 'landscape' });
      this.result.set('已锁定为 landscape');
    } catch (err) {
      this.result.set('lock 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async unlock(): Promise<void> {
    try {
      await ScreenOrientation.unlock();
      this.result.set('已解锁');
    } catch (err) {
      this.result.set('unlock 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
