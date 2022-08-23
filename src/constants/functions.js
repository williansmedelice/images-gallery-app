import * as Font from "expo-font";

import preloadFonts from "./preloadFonts";

// cache fonts
const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

// preload async
const loadAssetsAsync = async () => {
  // preload assets
  const fontAssets = cacheFonts(preloadFonts);
  return Promise.all([...fontAssets]);
};

export default {
  loadAssetsAsync,
};
