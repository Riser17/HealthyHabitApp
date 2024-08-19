import {StyleSheet, View, Text, Pressable} from 'react-native';

import NavigationBar from '../../components/NavigationBar';
import HabitStepCard from '../../components/HabitStepCard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <NavigationBar backButton={false} />
      <HabitStepCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
