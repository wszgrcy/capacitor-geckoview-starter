import { Component } from '@angular/core';
import { SwStatus } from './sw-status/sw-status';
import { PrefsDemo } from './prefs/prefs';
import { CameraDemo } from './camera/camera';

@Component({
  imports: [SwStatus, PrefsDemo, CameraDemo],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
