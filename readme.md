# start
- npm i
- npm run build:android

# 与capacitor有何不同
- 无法使用命令初始化,以及修改包名相关
> 可以使用用ai,将`docs/init.md`中的内容传进去,让他进行修改
- 基本上完全相同,只不过是把android的默认模板,依赖进行了替换
- 部分插件可能无法使用,因为有部分插件,可能使用webview相关功能;或者gradle版本问题(当前使用9版本,而原始的使用8版本,会导致一些问题,需要手动升级)

# 与capacitor有什么相同
- 打包命令等完全相同
-