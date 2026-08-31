import type { CapacitorConfig } from '@capacitor/cli';
// 增强 @capacitor/cli 模块的类型定义
type CapacitorGeckoviewConfig = CapacitorConfig & {
  android?: CapacitorConfig['android'] & {
    appZygoteProcessEnabled?: boolean;
  };
};
const config: CapacitorGeckoviewConfig = {
  appId: 'local.geckoview-web.app',
  appName: 'geckoview-web',
  webDir: 'dist',
  android: { allowMixedContent: true, appZygoteProcessEnabled: true },
  server: { cleartext: true, androidScheme: 'https' },
  plugins: {},
};

export default config;
