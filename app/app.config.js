export default {
  expo: {
    name: "Brick Tools for LEGO®",
    slug: "brickToolsForLego",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "brick-tools-for-lego",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.jeromedane.bricktoolsforlego"
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      BRICKSET_API_KEY: process.env.BRICKSET_API_KEY,
    },
  }
}
