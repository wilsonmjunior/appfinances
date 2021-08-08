package com.appgofinances;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import io.flutter.embedding.android.FlutterActivity;

public class FlutterActivityModule extends ReactContextBaseJavaModule {
    FlutterActivityModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FlutterActivityModule";
    }

    @ReactMethod
    void NavigateToHomeFlutter() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, FlutterActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }
}
