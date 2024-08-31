import React, {useCallback, useMemo, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/colors';
import {moderateScale} from '../constants/responsiveSize';

// Define the types for props
interface CreateHabitBottomSheetProps {
  onSave: (habit: Habit) => void;
  onClose: () => void;
}

// Define the types for the habit object
interface Habit {
  title: string;
  description: string;
  color: string;
  frequency: string;
  days: string[];
}

const CreateHabitBottomSheet: React.FC<CreateHabitBottomSheetProps> = ({
  onSave,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const titleInputRef = useRef<any>(null);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('Daily');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);

  const slideAnim = new Animated.Value(0);

  const handleTabPress = (tab: string) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
      Animated.timing(slideAnim, {
        toValue: tab === 'Daily' ? 0 : 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  const handleDayPress = (day: string) => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day],
    );
  };

  const handleSaveHabit = () => {
    // Validation check
    // if (!title || !description || !selectedColor || selectedDays.length === 0) {
    //   Alert.alert('Please fill out all fields.');
    //   return;
    // }

    const newHabit: Habit = {
      title,
      description,
      color: selectedColor,
      frequency: selectedTab,
      days: selectedDays,
    };

    if (onSave) {
      onSave(newHabit);
    }
    console.log('Habit saved', newHabit);

    // Reset the form
    setTitle('');
    setDescription('');
    setSelectedColor('');
    setSelectedDays([]);
  };

  const colorsArray = [
    '#FF5733', // Red
    '#FFD700', // Gold
    '#5D76A9', // Medium Purple
    '#1877F2', // Blue
    '#32CD32', // Lime Green
    '#CCCCFF', // Light Violet
    '#4169E1', // Royal Blue
  ];

  const snapPoints = useMemo(() => ['90%'], []);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const renderFooter = (props: any) => (
    <BottomSheetFooter
      {...props}
      style={{
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -4},
        shadowOpacity: 0.1,
        shadowRadius: 18,
        elevation: 5,
        backgroundColor: '#F8F8F8',
      }}>
      <View style={styles.saveHabitContainer}>
        <Pressable style={styles.saveHabitButton} onPress={handleSaveHabit}>
          <Text style={styles.saveHabitText}>Save Habit</Text>
        </Pressable>
      </View>
    </BottomSheetFooter>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      handleIndicatorStyle={styles.handleIndicator}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      animateOnMount={true}
      footerComponent={renderFooter}
      onClose={onClose}>
      <BottomSheetView style={styles.modalContent}>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.createTitleText}>Create a New Habit</Text>

          <BottomSheetTextInput
            ref={titleInputRef}
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Habit Title"
            placeholderTextColor="#B0B0B0"
          />
          <BottomSheetTextInput
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholder="Description (Optional)"
            placeholderTextColor="#B0B0B0"
          />
          <BottomSheetView style={styles.colorSection}>
            <Text style={styles.sectionTitle}>Choose a Color</Text>
            <BottomSheetView style={styles.colorContainer}>
              {colorsArray.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedColor(item)}
                  key={index}
                  activeOpacity={0.8}>
                  {selectedColor === item ? (
                    <FontAwesome
                      name="check-circle"
                      size={30}
                      color={item}
                      style={styles.colorIcon}
                    />
                  ) : (
                    <FontAwesome
                      name="circle-thin"
                      size={30}
                      color={item}
                      style={styles.colorIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </BottomSheetView>
          </BottomSheetView>

          <Text style={styles.frequencyTitle}>
            How often do you want to do this?
          </Text>
          <BottomSheetView style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === 'Daily' && styles.activeTab,
              ]}
              onPress={() => handleTabPress('Daily')}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'Daily' && styles.activeTabText,
                ]}>
                DAILY
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === 'Weekly' && styles.activeTab,
              ]}
              onPress={() => handleTabPress('Weekly')}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'Weekly' && styles.activeTabText,
                ]}>
                WEEKLY
              </Text>
            </TouchableOpacity>
          </BottomSheetView>

          {selectedTab === 'Daily' ? (
            <BottomSheetView style={styles.daysContainer}>
              {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDays.includes(day) && styles.selectedDay,
                  ]}
                  onPress={() => handleDayPress(day)}>
                  <Text
                    style={[
                      styles.dayText,
                      selectedDays.includes(day) && styles.selectedDayText,
                    ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </BottomSheetView>
          ) : (
            <BottomSheetView style={styles.daysContainer}>
              {['1st', '2nd', '3rd', '4th'].map(week => (
                <TouchableOpacity
                  key={week}
                  style={[
                    styles.dayButton,
                    selectedDays.includes(week) && styles.selectedDay,
                  ]}
                  onPress={() => handleDayPress(week)}>
                  <Text
                    style={[
                      styles.dayText,
                      selectedDays.includes(week) && styles.selectedDayText,
                    ]}>
                    {week}
                  </Text>
                </TouchableOpacity>
              ))}
            </BottomSheetView>
          )}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: moderateScale(25),
  },
  createTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  input: {
    marginBottom: moderateScale(20),
    borderRadius: 12,
    fontSize: 18,
    lineHeight: 22,
    padding: moderateScale(16),
    backgroundColor: '#F0F0F0',
    color: '#34495E',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  colorSection: {
    marginVertical: moderateScale(25),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: moderateScale(10),
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: moderateScale(10),
  },
  colorIcon: {
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  frequencyTitle: {
    fontSize: 18,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: moderateScale(25),
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: moderateScale(25),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: '#7F8C8D',
    fontSize: 16,
  },
  activeTab: {
    backgroundColor: '#1ABC9C',
    elevation: 3,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(25),
  },
  dayButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    elevation: 3,
  },
  selectedDay: {
    backgroundColor: '#1ABC9C',
  },
  dayText: {
    color: '#7F8C8D',
    fontSize: 16,
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  saveHabitContainer: {
    paddingVertical: moderateScale(30),
    paddingHorizontal: moderateScale(25),
  },
  saveHabitButton: {
    backgroundColor: '#1ABC9C',
    borderRadius: 20,
    paddingVertical: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  saveHabitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  handleIndicator: {
    backgroundColor: '#D3D3D3',
    width: 60,
    height: 6,
    borderRadius: 3,
  },
});

export default CreateHabitBottomSheet;
