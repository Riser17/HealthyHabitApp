import React from 'react';
import {View, StyleSheet, Image, Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';

import HabitResourse from '../../HabitResourse';

const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', gap: 22}}>
          <Icon name="settings-sharp" size={22} color={'#fff'} />
          <Text style={{fontSize: 18, color: 'white', fontWeight: '700'}}>
            Healthy
            <Text style={{color: HabitResourse.colors.screenTitleColor}}>
              Habit
            </Text>
          </Text>
        </View>
        <Icon name="prism-sharp" size={22} color={'#fff'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: DeviceInfo.hasNotch() ? 80 : 50,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileButton: {
    position: 'absolute',
    marginLeft: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  backButton: {
    position: 'absolute',
    marginLeft: 14,
    width: 30,
    height: 30,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default NavigationBar;
