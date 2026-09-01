import './style.css'
import heroImg from './assets/hero.png'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import { Camera } from '@capacitor/camera'
import { Preferences } from '@capacitor/preferences'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.ts</code> and save to test <code>HMR</code></p>
    <p>UA: <code id="ua">${navigator.userAgent}</code></p>
    <p>SW 状态: <code id="sw-status">未注册</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://www.typescriptlang.org" target="_blank">
          <img class="button-icon" src="${typescriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>

<section id="sw-demo">
  <h2>Service Worker 随机图片拦截验证</h2>
  <p>下面的图片来自 <code>https://picsum.photos</code>（随机图片网站）。</p>
  <p>若 SW 生效，它会被拦截并始终显示同一张固定图片。</p>
  <img id="random-img" src="https://picsum.photos/400/300?random" alt="random image" />
</section>

<section id="prefs-demo">
  <h2>@capacitor/preferences set/get</h2>
  <input id="prefs-key" type="text" value="myKey" placeholder="key" />
  <input id="prefs-value" type="text" value="hello" placeholder="value" />
  <button id="prefs-set" type="button">set</button>
  <button id="prefs-get" type="button">get</button>
  <p>读取结果: <code id="prefs-result">-</code></p>
</section>

<section id="camera-demo">
  <h2>@capacitor/camera 调用相机</h2>
  <button id="camera-take" type="button">拍照</button>
  <img id="camera-image" alt="camera result" />
  <p>相机结果: <code id="camera-result">-</code></p>
</section>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// @capacitor/camera 调用相机
const cameraImage = document.querySelector<HTMLImageElement>('#camera-image')!
const cameraResult = document.querySelector<HTMLElement>('#camera-result')!

document.querySelector<HTMLButtonElement>('#camera-take')!.addEventListener('click', async () => {
  try {
    cameraResult.textContent = '正在打开相机...'
    const result = await Camera.takePhoto({ quality: 90 })
    // 原生端用 uri，Web 端用 webPath
    const src = result.webPath ?? result.uri
    if (src) {
      cameraImage.src = src
      cameraResult.textContent = `拍照成功: ${result.type} (${src})`
    } else {
      cameraResult.textContent = '未返回图片地址'
    }
  } catch (err) {
    cameraResult.textContent = '拍照失败: ' + (err instanceof Error ? err.message : String(err))
  }
})

// @capacitor/preferences set/get 演示
const prefsKey = document.querySelector<HTMLInputElement>('#prefs-key')!
const prefsValue = document.querySelector<HTMLInputElement>('#prefs-value')!
const prefsResult = document.querySelector<HTMLElement>('#prefs-result')!

document.querySelector<HTMLButtonElement>('#prefs-set')!.addEventListener('click', async () => {
  try {
    await Preferences.set({ key: prefsKey.value, value: prefsValue.value })
    prefsResult.textContent = `已写入 ${prefsKey.value}=${prefsValue.value}`
  } catch (err) {
    prefsResult.textContent = 'set 失败: ' + (err instanceof Error ? err.message : String(err))
  }
})

document.querySelector<HTMLButtonElement>('#prefs-get')!.addEventListener('click', async () => {
  try {
    const { value } = await Preferences.get({ key: prefsKey.value })
    prefsResult.textContent = value !== null ? value : '(null)'
  } catch (err) {
    prefsResult.textContent = 'get 失败: ' + (err instanceof Error ? err.message : String(err))
  }
})

// 启动时自动注册 Service Worker
if ('serviceWorker' in navigator) {
  const statusEl = document.querySelector<HTMLElement>('#sw-status')!
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js')
      statusEl.textContent = '已注册'
      if (navigator.serviceWorker.controller) {
        statusEl.textContent = '已激活并接管'
      } else {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          statusEl.textContent = '已激活并接管'
          window.location.reload()
        })
      }
      void reg
    } catch (err) {
      statusEl.textContent = '注册失败: ' + (err instanceof Error ? err.message : String(err))
      console.error('SW 注册失败', err)
    }
  })
} else {
  document.querySelector<HTMLElement>('#sw-status')!.textContent = '不支持'
}
