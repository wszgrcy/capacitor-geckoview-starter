import { Component, signal, type OnDestroy } from '@angular/core';
import { ScreenReader } from '@capacitor-geckoview/screen-reader';

@Component({
  selector: 'app-screen-reader-demo',
  templateUrl: './screen-reader.html',
})
export class ScreenReaderDemo implements OnDestroy {
  protected readonly result = signal('-');
  protected readonly text = signal('你好，欢迎使用屏幕阅读器测试');

  protected async isEnabled(): Promise<void> {
    try {
      const { value } = await ScreenReader.isEnabled();
      this.result.set(`屏幕阅读器启用: ${value}`);
    } catch (err) {
      this.result.set('isEnabled 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async speak(): Promise<void> {
    try {
      await ScreenReader.speak({ value: this.text() });
      this.result.set(`正在朗读: ${this.text()}`);
    } catch (err) {
      this.result.set('speak 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async listen(): Promise<void> {
    try {
      await ScreenReader.addListener('stateChange', (state) => {
        this.result.set(`[监听] 屏幕阅读器启用: ${state.value}`);
      });
      this.result.set('已开始监听屏幕阅读器状态变化');
    } catch (err) {
      this.result.set('listen 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async stop(): Promise<void> {
    try {
      await ScreenReader.removeAllListeners();
      this.result.set('已停止监听');
    } catch (err) {
      this.result.set('stop 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  async ngOnDestroy(): Promise<void> {
    await ScreenReader.removeAllListeners();
  }
}
