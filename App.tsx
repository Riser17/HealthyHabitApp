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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabBar from './src/components/BottomTabBar';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
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
            name="UserOption"
            component={BottomTabBar}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
