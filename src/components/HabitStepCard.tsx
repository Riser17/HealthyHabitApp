import {StyleSheet, View, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import HabitResourse from '../../HabitResourse';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import RingProgress from './RingProgress';

type RootStackParamList = {
  StepCounter: undefined;
};

export default function HabitStepCard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  type stepProps = {
    steps: string;
    distance: string;
    flights: string;
  };

  const StepsInfoContainer = (propsInfo: stepProps) => {
    return (
      <View style={styles.stepsInfoContainer}>
        <View style={styles.stepsInfo}>
          <Text style={styles.stepsLabel}>Steps</Text>
          <Text style={styles.stepsText}>{propsInfo.steps}</Text>
        </View>
        <View style={styles.stepsInfo}>
          <Text style={styles.stepsLabel}>Distance</Text>
          <Text style={styles.stepsText}>{propsInfo.distance}</Text>
        </View>
        <View style={styles.stepsInfo}>
          <Text style={styles.stepsLabel}>Flights Climbed</Text>
          <Text style={styles.stepsText}>{propsInfo.flights}</Text>
        </View>
      </View>
    );
  };

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
          <StepsInfoContainer steps="5,300" distance="4.2 km" flights="15" />
          <RingProgress radius={80} strokeWidth={30} progress={0.5} />
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
