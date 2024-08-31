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

const CreateNewHabit = () => {
  const [showHabitBottomSheet, setShowHabitBottomSheet] = useState(false);
  const [habits, setHabits] = useState([]);

  const handleSaveHabit = newHabit => {
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
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  highlightedText: {
    color: colors.screenTitleColor,
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
  ModalStyle: {
    backgroundColor: 'black',
    minHeight: moderateScale(height / 1.15),
    padding: moderateScale(15),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  crossStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  modalTitle: {
    color: colors.white,
    fontSize: 18,
  },
  modalDone: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  },
  input: {
    width: '95%',
    marginTop: moderateScale(12),
    padding: moderateScale(15),
    borderRadius: moderateScale(13),
    backgroundColor: '#34495e',
    color: '#ecf0f1',
  },
  colorSection: {
    marginVertical: moderateScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#fff',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    marginTop: moderateScale(10),
  },
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: '#7f8c8d',
    fontSize: 16,
  },
  activeTab: {
    backgroundColor: '#1abc9c',
  },
  activeTabText: {
    color: '#ecf0f1',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
  selectedDay: {
    backgroundColor: '#1abc9c',
  },
  dayText: {
    color: '#bdc3c7',
    fontSize: 16,
  },
  selectedDayText: {
    color: '#fff',
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
