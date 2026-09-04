import { Component } from '@angular/core';
import { SwStatus } from './sw-status/sw-status';
import { PrefsDemo } from './prefs/prefs';
import { CameraDemo } from './camera/camera';
import { ActionSheetDemo } from './action-sheet/action-sheet';
import { AppLauncherDemo } from './app-launcher/app-launcher';
import { BrowserDemo } from './browser/browser';
import { ClipboardDemo } from './clipboard/clipboard';
import { DeviceDemo } from './device/device';
import { DialogDemo } from './dialog/dialog';
import { LocalNotificationsDemo } from './local-notifications/local-notifications';
import { MotionDemo } from './motion/motion';
import { NetworkDemo } from './network/network';
// import { PushNotificationsDemo } from './push-notifications/push-notifications'; // 跳过
import { ScreenOrientationDemo } from './screen-orientation/screen-orientation';
import { ScreenReaderDemo } from './screen-reader/screen-reader';
import { ShareDemo } from './share/share';
import { SplashScreenDemo } from './splash-screen/splash-screen';
import { StatusBarDemo } from './status-bar/status-bar';
import { TextZoomDemo } from './text-zoom/text-zoom';
import { ToastDemo } from './toast/toast';

@Component({
  imports: [SwStatus, PrefsDemo, CameraDemo, ActionSheetDemo, AppLauncherDemo, BrowserDemo, ClipboardDemo, DeviceDemo, DialogDemo, LocalNotificationsDemo, MotionDemo, NetworkDemo /*, PushNotificationsDemo*/, ScreenOrientationDemo, ScreenReaderDemo, ShareDemo, SplashScreenDemo, StatusBarDemo, TextZoomDemo, ToastDemo],
  // imports 中 PushNotificationsDemo 已注释跳过
  // imports 中 PushNotificationsDemo 已注释跳过
  // imports 中 PushNotificationsDemo 已注释跳过
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
