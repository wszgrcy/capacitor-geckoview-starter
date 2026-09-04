import { Component, signal } from '@angular/core';
import { Toast } from '@capacitor-geckoview/toast';

@Component({
  selector: 'app-toast-demo',
  templateUrl: './toast.html',
})
export class ToastDemo {
  protected readonly result = signal('-');
  protected readonly text = signal('你好，Capacitor Toast!');

  protected async show(duration: 'short' | 'long', position: 'top' | 'center' | 'bottom'): Promise<void> {
    try {
      await Toast.show({ text: this.text(), duration, position });
      this.result.set(`已显示 ${duration} toast (${position})`);
    } catch (err) {
      this.result.set('show 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
