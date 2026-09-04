import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sw-status',
  templateUrl: './sw-status.html',
})
export class SwStatus {
  protected readonly status = signal('未注册');

  constructor() {
    if (!('serviceWorker' in navigator)) {
      this.status.set('不支持');
      return;
    }

    window.addEventListener('load', () => void this.register());
  }

  private async register(): Promise<void> {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      this.status.set('已注册');
      if (navigator.serviceWorker.controller) {
        this.status.set('已激活并接管');
      } else {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          this.status.set('已激活并接管');
          window.location.reload();
        });
      }
      void reg;
    } catch (err) {
      this.status.set('注册失败: ' + (err instanceof Error ? err.message : String(err)));
      console.error('SW 注册失败', err);
    }
  }
}
