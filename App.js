

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';

import { MainStackNavigation, } from './src';
import { persistor, store } from './src/redux';
import { toastConfig } from './src/constants/toastConfig';


export default function App() {

  const [isLoaded] = useFonts({
    "mnstThin": require("./assets/fonts/Montserrat-Thin.ttf"),
    "mnstExtraLight": require("./assets/fonts/Montserrat-ExtraLight.ttf"),
    "mnstLight": require("./assets/fonts/Montserrat-Light.ttf"),
    "mnstRegular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "mnstBlack": require("./assets/fonts/Montserrat-Black.ttf"),
    "mnstMedium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "mnstSemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "mnstBold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "mnstExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  if(!isLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <SafeAreaView style={{ flex: 1 }}>
        <MainStackNavigation />
        <Toast toastConfig={toastConfig}/>
      </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

