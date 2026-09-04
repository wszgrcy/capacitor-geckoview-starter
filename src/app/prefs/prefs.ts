import { Component, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-prefs-demo',
  templateUrl: './prefs.html',
})
export class PrefsDemo {
  protected readonly key = signal('myKey');
  protected readonly value = signal('hello');
  protected readonly result = signal('-');

  protected async setPrefs(): Promise<void> {
    try {
      await Preferences.set({ key: this.key(), value: this.value() });
      this.result.set(`已写入 ${this.key()}=${this.value()}`);
    } catch (err) {
      this.result.set('set 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async getPrefs(): Promise<void> {
    try {
      const { value } = await Preferences.get({ key: this.key() });
      this.result.set(value !== null ? value : '(null)');
    } catch (err) {
      this.result.set('get 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
