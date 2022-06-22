import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box } from 'native-base';
import MyStack from './src/App';


export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MyStack />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

