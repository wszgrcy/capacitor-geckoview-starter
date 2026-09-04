import { Component, signal, type OnDestroy } from '@angular/core';
import { Motion } from '@capacitor-geckoview/motion';

@Component({
  selector: 'app-motion-demo',
  templateUrl: './motion.html',
})
export class MotionDemo implements OnDestroy {
  protected readonly accel = signal('-');
  protected readonly orientation = signal('-');

  protected async startAccel(): Promise<void> {
    try {
      await Motion.addListener('accel', (event) => {
        const a = event.acceleration;
        this.accel.set(`x=${a.x.toFixed(2)}, y=${a.y.toFixed(2)}, z=${a.z.toFixed(2)}`);
      });
    } catch (err) {
      this.accel.set('失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async startOrientation(): Promise<void> {
    try {
      await Motion.addListener('orientation', (event) => {
        this.orientation.set(
          `alpha=${event.alpha.toFixed(2)}, beta=${event.beta.toFixed(2)}, gamma=${event.gamma.toFixed(2)}`,
        );
      });
    } catch (err) {
      this.orientation.set('失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  protected async stop(): Promise<void> {
    try {
      await Motion.removeAllListeners();
      this.accel.set('已停止');
      this.orientation.set('已停止');
    } catch (err) {
      this.accel.set('stop 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  async ngOnDestroy(): Promise<void> {
    await Motion.removeAllListeners();
  }
}
