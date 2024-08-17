import {StyleSheet, View, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from '../../components/NavigationBar';
import HabitResourse from '../../../HabitResourse';

export default function HomeScreen() {
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

  const profileButton = () => {
    // props.navigation.navigate('EmedPatientProfile');
  };

  return (
    <View style={styles.container}>
      <NavigationBar />

      {/* {!profileUrl ? <NavigationBar profileButton={profileButton} /> : null} */}
      <Pressable onPress={() => {}}>
        <LinearGradient
          colors={HabitResourse.colors.backgroundGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.background}>
          <StepsInfoContainer steps="5,300" distance="4.2 km" flights="15" />
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    justifyContent: 'center',
  },
  stepsInfoContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    gap: 6,
  },
  stepsInfo: {
    // alignItems: "center",
  },
  stepsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E1E8ED',
  },
  stepsLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: '#E1E8ED',
  },
});
