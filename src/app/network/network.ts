import { Component, signal, type OnDestroy } from '@angular/core';
import { Network } from '@capacitor-geckoview/network';

@Component({
  selector: 'app-network-demo',
  templateUrl: './network.html',
})
export class NetworkDemo implements OnDestroy {
  protected readonly result = signal('-');

  protected async getStatus(): Promise<void> {
    try {
      const status = await Network.getStatus();
      this.result.set(`connected=${status.connected}, type=${status.connectionType}`);
    } catch (err) {
      this.result.set('getStatus 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async listen(): Promise<void> {
    try {
      await Network.addListener('networkStatusChange', (status) => {
        this.result.set(`[监听] connected=${status.connected}, type=${status.connectionType}`);
      });
      this.result.set('已开始监听网络变化');
    } catch (err) {
      this.result.set('listen 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async stop(): Promise<void> {
    try {
      await Network.removeAllListeners();
      this.result.set('已停止监听');
    } catch (err) {
      this.result.set('stop 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  async ngOnDestroy(): Promise<void> {
    await Network.removeAllListeners();
  }
}
