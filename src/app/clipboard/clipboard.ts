import { Component, signal } from '@angular/core';
import { Clipboard } from '@capacitor-geckoview/clipboard';

@Component({
  selector: 'app-clipboard-demo',
  templateUrl: './clipboard.html',
})
export class ClipboardDemo {
  protected readonly text = signal('hello capacitor');
  protected readonly result = signal('-');

  protected async write(): Promise<void> {
    try {
      await Clipboard.write({ string: this.text() });
      this.result.set(`已写入: ${this.text()}`);
    } catch (err) {
      this.result.set('write 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async read(): Promise<void> {
    try {
      const { value, type } = await Clipboard.read();
      this.result.set(`读取(${type}): ${value}`);
    } catch (err) {
      this.result.set('read 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
