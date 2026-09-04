import { Component, signal } from '@angular/core';
import { TextZoom } from '@capacitor-geckoview/text-zoom';

@Component({
  selector: 'app-text-zoom-demo',
  templateUrl: './text-zoom.html',
})
export class TextZoomDemo {
  protected readonly result = signal('-');

  protected async get(): Promise<void> {
    try {
      const { value } = await TextZoom.get();
      this.result.set(`当前缩放: ${value}`);
    } catch (err) {
      this.result.set('get 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async getPreferred(): Promise<void> {
    try {
      const { value } = await TextZoom.getPreferred();
      this.result.set(`系统首选缩放: ${value}`);
    } catch (err) {
      this.result.set('getPreferred 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async set(): Promise<void> {
    try {
      await TextZoom.set({ value: 1.2 });
      this.result.set('缩放已设为 1.2 (120%)');
    } catch (err) {
      this.result.set('set 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
