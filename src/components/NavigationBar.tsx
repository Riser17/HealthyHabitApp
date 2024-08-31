import React from 'react';
import {View, StyleSheet, Image, Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';

import HabitResourse from '../../HabitResourse';
import {moderateScale} from '../constants/responsiveSize';

const NavigationBar = (props: {backButton: any}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', gap: 22}}>
          {props.backButton ? (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="chevron-back" size={22} color={'#f07f0e'} />
            </Pressable>
          ) : (
            <Icon name="settings-sharp" size={22} color={'#f07f0e'} />
          )}

          <Text style={{fontSize: 18, color: 'white', fontWeight: '700'}}>
            Healthy
            <Text style={{color: HabitResourse.colors.screenTitleColor}}>
              Habit
            </Text>
          </Text>
        </View>
        <Icon name="prism-sharp" size={22} color={'#f07f0e'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: DeviceInfo.hasNotch() ? 90 : 50,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
  },
});

export default NavigationBar;
