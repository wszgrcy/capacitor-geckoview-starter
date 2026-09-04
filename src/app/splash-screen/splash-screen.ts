import { Component, signal } from '@angular/core';
import { SplashScreen } from '@capacitor-geckoview/splash-screen';

@Component({
  selector: 'app-splash-screen-demo',
  templateUrl: './splash-screen.html',
})
export class SplashScreenDemo {
  protected readonly result = signal('-');

  protected async show(): Promise<void> {
    try {
      await SplashScreen.show({ autoHide: false, fadeInDuration: 200 });
      this.result.set('Splash 已显示（3 秒后自动隐藏）');
      setTimeout(async () => {
        await SplashScreen.hide({ fadeOutDuration: 200 });
        this.result.set('Splash 已自动隐藏');
      }, 3000);
    } catch (err) {
      this.result.set('show 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async hide(): Promise<void> {
    try {
      await SplashScreen.hide({ fadeOutDuration: 200 });
      this.result.set('Splash 已隐藏');
    } catch (err) {
      this.result.set('hide 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
