package com.appgofinances;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FlutterModule extends ReactContextBaseJavaModule  {
    private static ReactApplicationContext reactContext;
    FlutterModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void createCalendarEvent() {
        Toast.makeText(reactContext, "Flutter Module Test", Toast.LENGTH_LONG).show();
    }

    @Override
    public String getName() {
        return "FlutterModule";
    }
}
