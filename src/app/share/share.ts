import { Component, signal } from '@angular/core';
import { Share } from '@capacitor-geckoview/share';

@Component({
  selector: 'app-share-demo',
  templateUrl: './share.html',
})
export class ShareDemo {
  protected readonly result = signal('-');

  protected async canShare(): Promise<void> {
    try {
      const { value } = await Share.canShare();
      this.result.set(`canShare: ${value}`);
    } catch (err) {
      this.result.set('canShare 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async share(): Promise<void> {
    try {
      const { activityType } = await Share.share({
        title: '测试分享',
        text: '来自 Capacitor GeckoView 的分享',
        url: 'https://example.com',
        dialogTitle: '选择分享目标',
      });
      this.result.set(`分享完成, activityType: ${activityType ?? '(空)'}`);
    } catch (err) {
      this.result.set('share 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
