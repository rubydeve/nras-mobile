package com.nras

import android.os.Bundle
import com.facebook.react.ReactActivity
import org.devio.rn.splashscreen.SplashScreen  // ← import SplashScreen

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  // override fun createReactActivityDelegate(): ReactActivityDelegate =
  //     DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)


    //   override fun onCreate(savedInstanceState: Bundle?) {
    //     SplashScreen.show(this)  // ← show the splash screen here
    //     super.onCreate(savedInstanceState)
    // }

    override fun onCreate(savedInstanceState: Bundle?) {
      SplashScreen.show(this) // ← Show splash before super
      super.onCreate(savedInstanceState)
    }
    override fun getMainComponentName(): String = "nras"


    // override fun getMainComponentName(): String {
    //   return "nras"  // ← This must match your app name in index.js
    // }




}
