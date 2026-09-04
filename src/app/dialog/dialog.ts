import { Component, signal } from '@angular/core';
import { Dialog } from '@capacitor-geckoview/dialog';

@Component({
  selector: 'app-dialog-demo',
  templateUrl: './dialog.html',
})
export class DialogDemo {
  protected readonly result = signal('-');

  protected async alert(): Promise<void> {
    try {
      await Dialog.alert({ title: '提示', message: '这是原生 Alert 对话框' });
      this.result.set('Alert 已显示');
    } catch (err) {
      this.result.set('alert 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async confirm(): Promise<void> {
    try {
      const { value } = await Dialog.confirm({ title: '确认', message: '你确定要执行吗？' });
      this.result.set(`confirm: ${value}`);
    } catch (err) {
      this.result.set('confirm 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async prompt(): Promise<void> {
    try {
      const { value, cancelled } = await Dialog.prompt({
        title: '输入',
        message: '请输入你的名字',
        inputPlaceholder: '名字',
      });
      this.result.set(cancelled ? '已取消' : `输入: ${value}`);
    } catch (err) {
      this.result.set('prompt 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
