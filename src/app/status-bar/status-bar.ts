import { Component, signal } from '@angular/core';
import { StatusBar, Style } from '@capacitor-geckoview/status-bar';

@Component({
  selector: 'app-status-bar-demo',
  templateUrl: './status-bar.html',
})
export class StatusBarDemo {
  protected readonly result = signal('-');

  protected async getInfo(): Promise<void> {
    try {
      const info = await StatusBar.getInfo();
      this.result.set(
        `visible=${info.visible}, style=${info.style}, color=${info.color}, ` +
          `overlays=${info.overlays}, height=${info.height}`,
      );
    } catch (err) {
      this.result.set('getInfo 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async setDark(): Promise<void> {
    try {
      await StatusBar.setStyle({ style: Style.Dark });
      this.result.set('状态栏文字已设为 Dark（深色背景用浅色文字）');
    } catch (err) {
      this.result.set('setStyle 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async hide(): Promise<void> {
    try {
      await StatusBar.hide();
      this.result.set('状态栏已隐藏');
    } catch (err) {
      this.result.set('hide 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async show(): Promise<void> {
    try {
      await StatusBar.show();
      this.result.set('状态栏已显示');
    } catch (err) {
      this.result.set('show 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
