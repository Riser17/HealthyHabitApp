import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HabitResourse from '../../../HabitResourse';
import CreateHabitBottomSheet from '../../components/CreateHabitBottomSheet';
import NavigationBar from '../../components/NavigationBar';
import colors from '../../constants/colors';
import {height, moderateScale} from '../../constants/responsiveSize';

// Define the types for the habit object
interface Habit {
  title: string;
  description: string;
  color: string;
  frequency: string;
  days: string[];
}

const CreateNewHabit: React.FC = () => {
  const [showHabitBottomSheet, setShowHabitBottomSheet] =
    useState<boolean>(false);
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleSaveHabit = (newHabit: Habit) => {
    setHabits([...habits, newHabit]);
    setShowHabitBottomSheet(false); // Close the bottom sheet after saving
  };

  return (
    <View style={styles.container}>
      <NavigationBar backButton={false} />
      <Text style={styles.txtStyle}>New Habit</Text>
      <View>
        <TouchableOpacity
          style={styles.AddContainer}
          onPress={() => setShowHabitBottomSheet(true)}>
          <View style={styles.addIcon}>
            <FontAwesome name={'plus'} size={22} color={'white'} />
          </View>
          <Text style={styles.addText}>Create custom Habits</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.habitList}>
        {habits.map((habit, index) => (
          <View
            key={index}
            style={[styles.habitItem, {borderLeftColor: habit.color}]}>
            <Text style={styles.habitTitle}>{habit.title}</Text>
            <Text style={styles.habitDescription}>{habit.description}</Text>
            <Text style={styles.habitFrequency}>
              Frequency: {habit.frequency}
            </Text>
            <Text style={styles.habitDays}>Days: {habit.days.join(', ')}</Text>
          </View>
        ))}
      </ScrollView>

      {showHabitBottomSheet && (
        <CreateHabitBottomSheet
          onSave={handleSaveHabit}
          onClose={() => setShowHabitBottomSheet(false)}
        />
      )}
    </View>
  );
};

export default CreateNewHabit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: moderateScale(16),
  },
  txtStyle: {
    color: 'white',
    marginVertical: moderateScale(20),
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  AddContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 70,
    backgroundColor: HabitResourse.colors.screenTitleColor,
    borderRadius: 22,
  },
  addIcon: {
    backgroundColor: '#8C92AC',
    padding: 14,
    borderRadius: 12,
  },
  addText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  habitList: {
    marginTop: moderateScale(20),
  },
  habitItem: {
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    borderLeftWidth: 5,
    backgroundColor: '#34495e',
    borderRadius: moderateScale(5),
  },
  habitTitle: {
    fontSize: 18,
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  habitDescription: {
    fontSize: 14,
    color: '#bdc3c7',
    marginTop: moderateScale(5),
  },
  habitFrequency: {
    fontSize: 14,
    color: '#bdc3c7',
    marginTop: moderateScale(5),
  },
  habitDays: {
    fontSize: 14,
    color: '#bdc3c7',
    marginTop: moderateScale(5),
  },
});
