package com.example.demo;

import android.app.ActivityManager;
import android.app.Application;
import android.content.Context;
import android.os.Build;
import android.os.Process;

import com.getcapacitor.Bridge;
import com.getcapacitor.CapConfig;
import com.getcapacitor.SessionPreloader;

import java.util.List;

/**
 * Application entry point.
 *
 * <p>GeckoView startup cost mainly comes from GeckoRuntime initialization + spawning the
 * content child process. We initialize the process-wide GeckoRuntime in the <b>main</b>
 * process here, as early as possible, and call {@code warmUp()} to preload the content
 * subprocess, so the engine is already ready by the time the first page is shown.</p>
 *
 * <p>This is idempotent: {@link Bridge#initializeGeckoRuntime} only creates the runtime
 * once, so the {@link Bridge} created later in the Activity simply reuses it.</p>
 *
 * <p><b>Important:</b> GeckoView spawns child processes (content, GPU, …) which also run
 * {@code Application.onCreate}. We must <em>not</em> initialize Gecko in those child
 * processes, otherwise every child process would create another GeckoRuntime and trigger
 * a cascade of new subprocesses, eventually killing the app. Hence we only warm up in the
 * main process.</p>
 */
public class MainApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        if (!isMainProcess()) {
            // Child processes (GeckoView:tab/gpu/…) must not initialize Gecko again.
            return;
        }
        // Warm up Gecko as early as possible (parallel to Activity creation).
        // Settings must match those used by Bridge, so remote debugging is read from config.
        CapConfig capConfig = CapConfig.loadDefault(this);
        boolean remoteDebugging = capConfig.isWebContentsDebuggingEnabled();
        // Pass the Application context so the bundled geckoview-config.yaml asset is installed
        // and its prefs are applied at GeckoRuntime creation time.
        Bridge.initializeGeckoRuntime(
                this,
                Bridge.buildGeckoRuntimeSettings(
                        remoteDebugging,
                        capConfig.isZoomableWebView(),capConfig.isAppZygoteProcessEnabled(),
                        this));
        // Pre-create and open a GeckoSession so the Bridge can reuse it when the Activity
        // is created, moving session creation/open off the critical startup path. The actual
        // page load (loadUri) still happens in the Bridge after the request interceptor is
        // registered, so the Capacitor bridge JS is correctly injected.
        SessionPreloader.preload();
    }

    /**
     * @return true if the current process is the main (UI) process of the app, i.e. its
     * process name equals the application package name.
     */
    private boolean isMainProcess() {
        String processName = getProcessName(this);
        return processName == null || getPackageName().equals(processName);
    }

    /**
     * Resolves the current process name.
     */
    private static String getProcessName(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            return Application.getProcessName();
        }
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        if (am == null) {
            return null;
        }
        List<ActivityManager.RunningAppProcessInfo> running = am.getRunningAppProcesses();
        if (running == null) {
            return null;
        }
        for (ActivityManager.RunningAppProcessInfo proc : running) {
            if (proc.pid == Process.myPid()) {
                return proc.processName;
            }
        }
        return null;
    }
}
