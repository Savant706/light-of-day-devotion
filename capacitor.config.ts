import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4d01d3367b604701b562e3629b68650c',
  appName: 'light-of-day-devotion',
  webDir: 'dist',
  
  // Production-ready server configuration
  server: {
    // Remove dev URL for production builds - use local assets
    androidScheme: 'https',
    iosScheme: 'https',
    // Ensure HTTPS is enforced
    cleartext: false
  },
  
  // Android-specific production settings
  android: {
    // Use HTTPS scheme for WebView
    allowMixedContent: false,
    // Capture all navigation for security
    captureInput: true,
    // Enable hardware back button
    useLegacyBridge: false,
    // WebView settings for security
    webContentsDebuggingEnabled: false,
    // Minimum SDK for security patches
    minWebViewVersion: '60.0.0'
  },
  
  // iOS-specific production settings
  ios: {
    // Content mode for security
    contentInset: 'automatic',
    // Scroll behavior
    scrollEnabled: true
  },
  
  // Plugins configuration
  plugins: {
    // Splash screen config
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#1a1a2e',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    // Keyboard behavior
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    }
  }
};

export default config;
