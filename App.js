import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./src/context/AppContext";
import Home from "./src/screens/Home";
import "./src/translations";

/**
 * App component - Entry point of the application.
 * It provides necessary contexts and wraps the application in a safe area provider.
 * The main screen (Home) is rendered within the AppProvider to access global state.
 */

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded, error] = useFonts({
    "Tajawal-Regular": require("./src/assets/fonts/Tajawal-Regular.ttf"),
    "Tajawal-Bold": require("./src/assets/fonts/Tajawal-Bold.ttf"),
    "Tajawal-Medium": require("./src/assets/fonts/Tajawal-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <Home />
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
