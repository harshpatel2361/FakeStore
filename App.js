import React from 'react';
import { SafeAreaView } from 'react-native';
import { toastConfig } from './src/constants/toastConfig';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { MainStackNavigation, } from './src';
import { store } from './src/redux';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <MainStackNavigation />
        <Toast toastConfig={toastConfig}/>
      </SafeAreaView>
    </Provider>
  );
}

