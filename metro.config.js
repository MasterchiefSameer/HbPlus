const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const finalConfig = withNativewind(config);

const originalResolveRequest = finalConfig.resolver.resolveRequest;
finalConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  // Prevent react-native-css from hijacking react-native imports inside expo-asset
  if (
    moduleName === "react-native" &&
    context.originModulePath &&
    context.originModulePath.includes("expo-asset")
  ) {
    return context.resolveRequest(context, "react-native", platform);
  }
  return originalResolveRequest
    ? originalResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = finalConfig;
