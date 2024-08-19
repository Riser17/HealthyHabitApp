/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  Platform,
  LogBox,
  View,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabBar from './src/components/BottomTabBar';
import StepCounter from './src/screens/applehealthsdk/StepCounter';

// Define the stack's parameter list
type RootStackParamList = {
  BottomTabBar: undefined;
  StepCounter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

LogBox.ignoreAllLogs();

function App() {
  const navTheme = DefaultTheme;
  navTheme.colors.background = 'black';
  return (
    // <SafeAreaView style={{flex: 1}}>
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
      // {...{
      //   initialRouteName: isLoggedIn
      //     ? userType === '1'
      //       ? 'BottomTabBar'
      //       : 'DoctorBottomTabBar'
      //     : 'UserOption',
      // }}
      >
        <Stack.Screen
          name="BottomTabBar"
          component={BottomTabBar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StepCounter"
          component={StepCounter}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
  );
}

export default App;
