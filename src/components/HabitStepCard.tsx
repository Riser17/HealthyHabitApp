import {StyleSheet, View, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import HabitResourse from '../../HabitResourse';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import RingProgress from './RingProgress';
import useHealthData from '../hooks/useHealthData';
import StepInfoContainer from './StepInfoContainer';

type RootStackParamList = {
  StepCounter: undefined;
};

export default function HabitStepCard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {steps, distance, flights} = useHealthData(new Date());

  const STEP_GOAL = 1000;
  const isGoalReached = steps < STEP_GOAL;

  const stepCardPressed = () => {
    navigation.navigate('StepCounter');
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={stepCardPressed} style={{flexDirection: 'row'}}>
        <LinearGradient
          colors={HabitResourse.colors.backgroundGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.background}>
          <View style={styles.stepsInfoContainer}>
            <StepInfoContainer
              label="Steps"
              value={steps.toString()}
              styleLabel={styles.stepsLabel}
              styleValue={[
                styles.stepsText,
                {color: isGoalReached ? '#EE0F55' : '#AFB3BE'},
              ]}
            />
            <StepInfoContainer
              label="Distance"
              value={`${(distance / 1000).toFixed(2)} km`}
              styleLabel={styles.stepsLabel}
              styleValue={styles.stepsText}
            />
            <StepInfoContainer
              label="Flights Climbed"
              value={flights.toString()}
              styleLabel={styles.stepsLabel}
              styleValue={styles.stepsText}
            />
          </View>
          <RingProgress
            radius={80}
            strokeWidth={30}
            progress={steps / STEP_GOAL}
          />
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 10,
  },
  background: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    shadowColor: '#f07f0e',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  stepsInfoContainer: {
    gap: 6,
  },
  stepsInfo: {
    // alignItems: "center",
  },
  stepsText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#AFB3BE',
  },
  stepsLabel: {
    fontSize: 20,
    color: 'white',
  },
});
