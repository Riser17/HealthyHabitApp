import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/home/HomeScreen';
import CreateNewHabit from '../screens/createhabit/CreateNewHabit';
import ActivityHabitCharts from '../screens/activityhabit/ActivityHabitCharts';
import {View} from 'react-native';

// Define the types for the tab navigator
type TabParamList = {
  Home: undefined;
  Create: undefined;
  ActivityHabitCharts: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Create') {
            iconName = 'plus';
          } else if (route.name === 'ActivityHabitCharts') {
            iconName = 'circle-o-notch';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f07f0e',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: 'transparent', // Ensures the background of the tab bar is transparent
          borderTopWidth: 0, // Removes border on iOS
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateNewHabit}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ActivityHabitCharts"
        component={ActivityHabitCharts}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
