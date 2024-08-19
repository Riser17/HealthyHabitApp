import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
} from 'react-native-health';

import NavigationBar from '../../components/NavigationBar';
import RingProgress from '../../components/RingProgress';
import useHealthData from '../../hooks/useHealthData';

type ValueProps = {
  label: string;
  value: string;
};

const STEP_GOAL = 1000;

export default function StepCounter() {
  const {steps, flights, distance} = useHealthData(new Date(2024, 7, 18));

  const Value = ({label, value}: ValueProps) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <NavigationBar backButton={true} />
      <View style={styles.container}>
        <RingProgress
          radius={100}
          strokeWidth={30}
          progress={steps / STEP_GOAL}
        />
        <View style={styles.values}>
          <Value label="Steps" value={steps.toString()} />
          <Value
            label="Distance"
            value={`${(distance / 1000).toFixed(2)} km`}
          />
          <Value label="Flights Climbed" value={flights.toString()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100,
  },
  label: {
    color: 'white',
    fontSize: 20,
  },
  value: {
    fontSize: 45,
    color: '#AFB3BE',
    fontWeight: '500',
  },
});
