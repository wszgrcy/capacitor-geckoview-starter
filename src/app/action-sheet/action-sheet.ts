import { Component, signal } from '@angular/core';
import {
  ActionSheet,
  ActionSheetButtonStyle,
  type ActionSheetButton,
} from '@capacitor-geckoview/action-sheet';

@Component({
  selector: 'app-action-sheet-demo',
  templateUrl: './action-sheet.html',
})
export class ActionSheetDemo {
  protected readonly result = signal('-');

  protected async showActions(): Promise<void> {
    try {
      const buttons: ActionSheetButton[] = [
        { title: '复制' },
        { title: '收藏' },
        { title: '删除', style: ActionSheetButtonStyle.Destructive },
        { title: '取消', style: ActionSheetButtonStyle.Cancel },
      ];
      this.result.set('正在弹出 Action Sheet...');
      const res = await ActionSheet.showActions({
        title: '示例操作',
        message: '请选择一个操作 (iOS 显示)',
        options: buttons,
        cancelable: true,
      });
      this.result.set(
        res.canceled
          ? '已取消'
          : `你选择了第 ${res.index} 项: ${buttons[res.index]?.title ?? '(未知)'}`,
      );
    } catch (err) {
      this.result.set('ActionSheet 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
