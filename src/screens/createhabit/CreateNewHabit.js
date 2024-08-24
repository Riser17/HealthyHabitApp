import React, { useState } from 'react';
import { Animated, Easing, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddmodalComp from '../../components/AddmodalComp';
import colors from '../../constants/colors';
import { height, moderateScale } from '../../constants/responsiveSize';
import TextInputCom from '../../components/textInputComp';

const CreateNewHabit = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTab, setSelectedTab] = useState('Daily');
  const [selectedDays, setSelectedDays] = useState([]);
  const [habits, setHabits] = useState([]);

  const slideAnim = new Animated.Value(0);

  const handleTabPress = (tab) => {
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

  const handleDayPress = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleSaveHabit = () => {
    if (!title || !description || !selectedColor || selectedDays.length === 0) {
      alert("Please fill out all fields.");
      return;
    }

    const newHabit = {
      title,
      description,
      color: selectedColor,
      frequency: selectedTab,
      days: selectedDays,
    };

    setHabits([...habits, newHabit]);

    // Reset the form
    setTitle("");
    setDescription("");
    setSelectedColor("");
    setSelectedDays([]);
    setIsVisible(false);
  };

  const colorsArray = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9", // Medium Purple
    "#1877F2", // Blue
    "#32CD32", // Lime Green
    "#CCCCFF", // Light Violet
    "#4169E1", // Royal Blue
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        Healthy<Text style={styles.highlightedText}>Habit</Text>
      </Text>
      <Text style={styles.txtStyle}>Your Habit Details</Text>
      <View>
        <TouchableOpacity style={styles.AddContainer} onPress={() => setIsVisible(true)}>
          <Ionicons name='checkmark-done-circle' size={30} color={"white"} />
          <Text style={styles.addText}>Add Your Habits</Text>
          <FontAwesome name={"plus-circle"} size={30} color={"white"} />
        </TouchableOpacity>
      </View>
<TextInput placeholder='hello'/>


      <AddmodalComp style={{ justifyContent: "flex-end", margin: 0 }} isVisible={isVisible} setVisible={setIsVisible}>
        <View style={styles.ModalStyle}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.crossStyle} onPress={() => setIsVisible(false)}>
              <Ionicons name='arrow-back' size={30} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Habit</Text>
            <TouchableOpacity onPress={handleSaveHabit}>
              <Text style={styles.modalDone}>Save</Text>
            </TouchableOpacity>
          </View>

          <View  style={styles.modalBody}>

          <TextInput
              value={title}
              onChangeText={value=>setTitle(value)}
              style={styles.input}
              placeholder='Title'
              placeholderTextColor="#7f8c8d"
            />
         
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              placeholder='Description'
              placeholderTextColor="#7f8c8d"
            />
            <View style={styles.colorSection}>
              <Text style={styles.sectionTitle}>Choose Color</Text>
              <View style={styles.colorContainer}>
                {colorsArray.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => setSelectedColor(item)}
                    key={index}
                    activeOpacity={0.8}
                  >
                    {selectedColor === item ? (
                      <FontAwesome name="check-square-o" size={30} color={item} />
                    ) : (
                      <FontAwesome name="square" size={30} color={item} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Text style={styles.title}>How often do you want to complete this habit?</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'Daily' && styles.activeTab]}
                onPress={() => handleTabPress('Daily')}
              >
                <Text style={[styles.tabText, selectedTab === 'Daily' && styles.activeTabText]}>
                  DAILY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'Weekly' && styles.activeTab]}
                onPress={() => handleTabPress('Weekly')}
              >
                <Text style={[styles.tabText, selectedTab === 'Weekly' && styles.activeTabText]}>
                  WEEKLY
                </Text>
              </TouchableOpacity>
            </View>

            {selectedTab === 'Daily' ? (
              <View style={styles.daysContainer}>
                {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      selectedDays.includes(day) && styles.selectedDay,
                    ]}
                    onPress={() => handleDayPress(day)}
                  >
                    <Text style={[styles.dayText, selectedDays.includes(day) && styles.selectedDayText]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.daysContainer}>
                {["1st", "2nd", "3rd", "4th"].map((week) => (
                  <TouchableOpacity
                    key={week}
                    style={[
                      styles.dayButton,
                      selectedDays.includes(week) && styles.selectedDay,
                    ]}
                    onPress={() => handleDayPress(week)}
                  >
                    <Text style={[styles.dayText, selectedDays.includes(week) && styles.selectedDayText]}>
                      {week}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </AddmodalComp>

      <ScrollView style={styles.habitList}>
        {habits.map((habit, index) => (
          <View key={index} style={[styles.habitItem, { borderLeftColor: habit.color }]}>
            <Text style={styles.habitTitle}>{habit.title}</Text>
            <Text style={styles.habitDescription}>{habit.description}</Text>
            <Text style={styles.habitFrequency}>Frequency: {habit.frequency}</Text>
            <Text style={styles.habitDays}>Days: {habit.days.join(', ')}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateNewHabit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingHorizontal: moderateScale(15),
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
    color: "white",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "semibold",
  },
  AddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 49,
    backgroundColor: "#4d524e",
    borderRadius: 22,
    marginTop: 10,
  },
  addText: {
    color: 'white',
  },
  ModalStyle: {
    backgroundColor: "black",
    minHeight: moderateScale(height / 1.15),
    padding: moderateScale(15),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  crossStyle: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontWeight: "bold",
  },
  input: {
    width: "95%",
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
    fontWeight: "500",
    color: '#fff',
  },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
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
