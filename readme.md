# Capacitor GeckoView Starter

> 一个基于 Capacitor 与 GeckoView 的快速启动模板，将默认的 WebView（Chrome）内核替换为 GeckoView（Firefox）内核。

## 项目简介

- 这是一个模板项目，开箱即用，方便快速上手。
- 对进行了修改的插件，提供了完整的兼容性演示。

## 快速开始

```bash
# 安装依赖
npm i

# 构建 Android 应用
npm run build:android
```

## 页面修改

- Capacitor 只读取 `capacitor.config.ts` 中 `webDir` 字段指向的文件夹，并在执行 `cap sync` 时将其同步到 Android 工程中。
- 如需切换到 `Vue`、`React`、`Solid`、`Svelte` 等其他前端框架：
  1. 移除不需要的文件；
  2. 将 `webDir` 设置为该框架构建后的输出目录即可。

## 与 Capacitor 有何不同

- 无法通过命令行初始化项目或修改包名。

  > 可以将 `docs/init.md` 的内容提供给大语言模型，让模型帮助你完成相关修改。

- 将默认的 WebView（Chrome）内核替换为 GeckoView（Firefox）内核，内置 GeckoView，避免浏览器内核碎片化问题。
- 整体与原生 Capacitor 基本相同，仅对 Android 默认模板及依赖进行了替换。
- 部分插件可能无法正常使用，原因包括：
  - 插件依赖了 WebView 相关的功能；
  - Gradle 版本不兼容（本项目使用 Gradle 9，原项目使用 Gradle 8，部分插件需要手动升级以适配）。

  > 可参考[迁移参考文档](https://github.com/wszgrcy/capacitor-geckoview-plugins/blob/main/docs/webview-to-geckoview-%E8%BF%81%E7%A7%BB%E6%8C%87%E5%8D%97.md)，也可将文档内容提供给模型，由模型协助完成迁移修改。

## 与 Capacitor 有何相同

- 打包命令等完全一致，使用方式与原生 Capacitor 无差异。
