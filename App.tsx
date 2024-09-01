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
  TouchableOpacity,
} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import FeatherIcon from 'react-native-vector-icons/Feather';

import BottomTabBar from './src/components/BottomTabBar';
import StepCounter from './src/screens/applehealthsdk/StepCounter';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ProfileSettingScreen from './src/screens/profilesetting/ProfileSettingScreen';

// Define the stack's parameter list
type RootStackParamList = {
  BottomTabBar: undefined;
  StepCounter: undefined;
  ProfileSettingScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

LogBox.ignoreAllLogs();

function App() {
  const navTheme = DefaultTheme;
  navTheme.colors.background = 'black';

  return (
    <GestureHandlerRootView>
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
          <Stack.Screen
            name="ProfileSettingScreen"
            component={ProfileSettingScreen}
            options={({
              navigation,
            }: NativeStackScreenProps<
              RootStackParamList,
              'ProfileSettingScreen'
            >) => ({
              presentation: 'modal',
              headerTitle: 'Settings',
              headerStyle: {backgroundColor: '#000'},
              headerTitleStyle: {
                color: '#ffffff',
                fontSize: 26,
                fontWeight: 'bold',
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FeatherIcon name="x" size={24} color="#ffffff" />
                  </TouchableOpacity>
                );
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
