import { Component, signal } from '@angular/core';
import { Browser } from '@capacitor-geckoview/browser';

@Component({
  selector: 'app-browser-demo',
  templateUrl: './browser.html',
})
export class BrowserDemo {
  protected readonly url = signal('https://google.com');
  protected readonly result = signal('-');

  protected async open(): Promise<void> {
    try {
      await Browser.open({ url: this.url(), toolbarColor: '#3880ff' });
      this.result.set('浏览器已打开');
    } catch (err) {
      this.result.set('open 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async close(): Promise<void> {
    try {
      await Browser.close();
      this.result.set('浏览器已关闭');
    } catch (err) {
      this.result.set('close 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
