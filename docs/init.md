# 手动修改 Android 项目配置（初始化之后）

> 对应 CLI 源码：`cli/src/android/common.ts` 中的 `editProjectSettingsAndroid`。
>
> 当你运行 `npx cap add android` 时，CLI 会自动执行"复制模板 + 编辑设置"两步。本文只讲**初始化之后**的"编辑设置"部分——即把模板里的默认包名 `com.getcapacitor.myapp` 和应用名 `My App`，替换为你自己的 `appId` 与 `appName`。如果你希望跳过 CLI、手动维护这些配置，照着下面改即可。

## 背景：CLI 自动改了什么

读取 `capacitor.config.json` / `capacitor.config.ts` 中的：

- `appId`（如 `com.example.app`）
- `appName`（如 `我的应用`）

然后自动修改以下 3 类文件（相对 `android/` 平台目录）：

| 文件 | 改什么 |
|------|--------|
| `app/src/main/java/<包名路径>/MainActivity.java` | 文件的 `package` 声明（Java 包名） |
| `app/build.gradle` | `applicationId` 和 `namespace` |
| `app/src/main/res/values/strings.xml` | `app_name`、`title_activity_main`、`package_name`、`custom_url_scheme` |

下面逐一说明手动怎么改。

---

## 1. 修改包名 / MainActivity

CLI 会把模板的
`android/app/src/main/java/com/getcapacitor/myapp/MainActivity.java`
复制到以 appId 为路径的新目录，例如 `app/src/main/java/com/example/app/MainActivity.java`，并把 `package` 改成你的 appId。
- 注意,不止是MainActivity,而是目录级别的变更`android/app/src/main/java/com/getcapacitor/myapp`->`app/src/main/java/com/example/app`

### 手动操作

1. 新建目录：
   ```
   android/app/src/main/java/com/example/app/
   ```
   （即 `appId` 按 `.` 拆分成目录层级）

2. 把模板的 `MainActivity.java` 复制过去：
   ```
   android/app/src/main/java/com/getcapacitor/myapp/MainActivity.java
   → android/app/src/main/java/com/example/app/MainActivity.java
   ```

3. 修改文件第一行的 `package`：
   ```java
   // 改前
   package com.getcapacitor.myapp;

   // 改后
   package com.example.app;

   import com.getcapacitor.BridgeActivity;

   public class MainActivity extends BridgeActivity {}
   ```

4. 删除旧的模板目录：
   - 如果 appId 第 2 段不是 `getcapacitor`：删除 `java/com/getcapacitor/`
   - 如果 appId 第 1 段不是 `com`：删除整个 `java/com/`

> 注意：包名决定了 Android 的类路径，`MainActivity.java` 的目录层级必须和 `package` 一致，否则编译报错。

---

## 2. 修改 `android/app/build.gradle`

CLI 会替换 `applicationId` 和 `namespace` 两处。

### 手动操作

```gradle
android {
    // 改前
    namespace = "com.getcapacitor.myapp"

    defaultConfig {
        // 改前
        applicationId "com.getcapacitor.app"
        ...
    }
}
```

改成：

```gradle
android {
    // 改后
    namespace = "com.example.app"

    defaultConfig {
        // 改后
        applicationId "com.example.app"
        ...
    }
}
```

> 说明：
> - `applicationId`：发布到商店的应用 ID（包名）。
> - `namespace`：Gradle 用于生成 `R` 类和解析类名，必须与 Java 包名一致。
> - 模板里这两个值原本就不一样（`applicationId` 是 `com.getcapacitor.app`，`namespace` 是 `com.getcapacitor.myapp`），手动改的时候两个都改成你的 appId。

---

## 3. 修改 `android/app/src/main/res/values/strings.xml`

CLI 会把所有 `com.getcapacitor.myapp` 替换成 appId，并把 `My App` 替换成 appName。

模板原始内容：

```xml
<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">My App</string>
    <string name="title_activity_main">My App</string>
    <string name="package_name">com.getcapacitor.myapp</string>
    <string name="custom_url_scheme">com.getcapacitor.myapp</string>
</resources>
```

### 手动操作（假设 appId=`com.example.app`，appName=`我的应用`）

```xml
<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">我的应用</string>
    <string name="title_activity_main">我的应用</string>
    <string name="package_name">com.example.app</string>
    <string name="custom_url_scheme">com.example.app</string>
</resources>
```

> 说明：
> - `app_name` / `title_activity_main`：显示给用户的应用名。
> - `package_name` / `custom_url_scheme`：深链/URL Scheme，必须和 appId 一致，否则 `capacitor://` 等自定义协议无法解析。
> - 如果 appName 含特殊字符，需转义：`&`→`&amp;`、`<`→`&lt;`、`"`→`\"`、`'`→`\'`。

---

## 完整对照表

| 文件 | 配置项 | 模板默认值 | 示例改为 |
|------|--------|-----------|----------|
| `MainActivity.java` | `package` | `com.getcapacitor.myapp` | `com.example.app` |
| `app/build.gradle` | `applicationId` | `com.getcapacitor.app` | `com.example.app` |
| `app/build.gradle` | `namespace` | `com.getcapacitor.myapp` | `com.example.app` |
| `strings.xml` | `app_name` | `My App` | `我的应用` |
| `strings.xml` | `title_activity_main` | `My App` | `我的应用` |
| `strings.xml` | `package_name` | `com.getcapacitor.myapp` | `com.example.app` |
| `strings.xml` | `custom_url_scheme` | `com.getcapacitor.myapp` | `com.example.app` |

---

## 验证

改完后，重新构建以确认包名/命名空间一致：

```bash
cd android
./gradlew assembleDebug
```

如果遇到 `package` 目录不匹配、`R` 类找不到或 URL Scheme 失效，优先检查上述 3 个文件是否都改齐。
