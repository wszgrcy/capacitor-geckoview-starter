import { Component, signal } from '@angular/core';
import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-camera-demo',
  templateUrl: './camera.html',
})
export class CameraDemo {
  protected readonly imageSrc = signal('');
  protected readonly result = signal('-');

  protected async takePhoto(): Promise<void> {
    try {
      this.result.set('正在打开相机...');
      const photo = await Camera.takePhoto({ quality: 90 });
      // 原生端用 uri，Web 端用 webPath
      const src = photo.webPath ?? photo.uri;
      if (src) {
        this.imageSrc.set(src);
        this.result.set(`拍照成功: ${photo.type} (${src})`);
      } else {
        this.result.set('未返回图片地址');
      }
    } catch (err) {
      this.result.set('拍照失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
