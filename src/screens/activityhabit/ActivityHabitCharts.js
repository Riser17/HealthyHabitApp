import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActivityHabitCharts = () => {
  const [theme, setTheme] = useState('dark');
  const [format, setFormat] = useState('grid'); // 'grid', 'calendar', 'list'
  const [color, setColor] = useState('#66ff66');
  const [showCompletionIndicator, setShowCompletionIndicator] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showStreak, setShowStreak] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const toggleAnimation = () => {
    scale.value = withTiming(scale.value === 1 ? 1.1 : 1, {duration: 500});
  };

  const habitData = [
    2, 2, 1, 2, 0, 1, 2, 2, 2, 1, 0, 2, 2, 1, 2, 2, 0, 1, 2, 2, 1, 0, 2, 2, 2,
    1, 2, 0, 1, 2, 2, 1, 2, 0, 2, 1, 2, 2, 0, 1, 2, 2, 1, 0, 2, 2, 2, 1, 0, 2,
    1, 2, 2, 0, 1, 2, 2, 1, 2, 0, 2, 1, 2, 2, 0, 1, 2, 2, 1, 0,
  ];

  const getSquareColor = status => {
    switch (status) {
      case 2:
        return color;
      case 1:
        return theme === 'dark' ? '#3498db' : '#2980b9';
      case 0:
        return theme === 'dark' ? '#e74c3c' : '#c0392b';
      default:
        return theme === 'dark' ? '#1e1e1e' : '#f0f0f0';
    }
  };

  const calculateStreak = () => {
    let streak = 0;
    for (let i = habitData.length - 1; i >= 0; i--) {
      if (habitData[i] === 2) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const renderGrid = () => {
    return habitData.map((status, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.gridSquare, {backgroundColor: getSquareColor(status)}]}
        onPress={() =>
          setSelectedDay({
            status,
            date: new Date(
              Date.now() - (habitData.length - 1 - index) * 24 * 60 * 60 * 1000,
            ),
          })
        }
      />
    ));
  };

  const renderCalendar = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
      <View style={styles.calendar}>
        {days.map((day, index) => (
          <View key={index} style={styles.calendarColumn}>
            <Text style={[styles.calendarDay, themeStyles.text]}>{day}</Text>
            {habitData.slice(-7).map((status, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.calendarSquare,
                  {backgroundColor: getSquareColor(status)},
                ]}
                onPress={() =>
                  setSelectedDay({
                    status,
                    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000),
                  })
                }
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  const renderList = () => {
    return (
      <View style={styles.list}>
        {habitData.slice(-7).map((status, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() =>
              setSelectedDay({
                status,
                date: new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000),
              })
            }>
            <Text style={[styles.listItemText, themeStyles.text]}>
              {new Date(
                Date.now() - (6 - index) * 24 * 60 * 60 * 1000,
              ).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
            <View
              style={[
                styles.listItemDot,
                {backgroundColor: getSquareColor(status)},
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const themeStyles = {
    container: {
      backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
    },
    card: {
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f0f0f0',
    },
    text: {
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    description: {
      color: theme === 'dark' ? '#999999' : '#666666',
    },
    settings: {
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
    },
    settingTitle: {
      color: theme === 'dark' ? '#666666' : '#999999',
    },
    themeToggle: {
      backgroundColor: theme === 'dark' ? '#333333' : '#cccccc',
    },
  };

  return (
    <ScrollView style={[styles.container, themeStyles.container]}>
      <Animated.View style={[styles.card, animatedStyle, themeStyles.card]}>
        <TouchableOpacity onPress={toggleAnimation} activeOpacity={0.7}>
          <View style={styles.cardHeader}>
            <Icon
              name="walk"
              size={24}
              color={theme === 'dark' ? '#ffffff' : '#000000'}
            />
            <Text style={[styles.title, themeStyles.text]}>
              Walk around the block
            </Text>
          </View>
          {showDescription && (
            <Text style={[styles.description, themeStyles.description]}>
              Go for a short walk to clear the mi...
            </Text>
          )}
          {format === 'grid' && <View style={styles.grid}>{renderGrid()}</View>}
          {format === 'calendar' && renderCalendar()}
          {format === 'list' && renderList()}
          {showCompletionIndicator && (
            <Text style={styles.completedText}>✓</Text>
          )}
          {showStreak && (
            <Text style={[styles.streakText, themeStyles.text]}>
              🔥 {calculateStreak()} day streak
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      <View style={[styles.settings, themeStyles.settings]}>
        <Text style={[styles.settingTitle, themeStyles.settingTitle]}>
          APPEARANCE
        </Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, themeStyles.text]}>Theme</Text>
          <View style={[styles.themeToggle, themeStyles.themeToggle]}>
            <TouchableOpacity
              onPress={() => setTheme('light')}
              style={[
                styles.themeOption,
                theme === 'light' && styles.activeTheme,
              ]}>
              <Text
                style={[
                  styles.themeOptionText,
                  theme === 'light' && styles.activeThemeText,
                ]}>
                Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTheme('dark')}
              style={[
                styles.themeOption,
                theme === 'dark' && styles.activeTheme,
              ]}>
              <Text
                style={[
                  styles.themeOptionText,
                  theme === 'dark' && styles.activeThemeText,
                ]}>
                Dark
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, themeStyles.text]}>Format</Text>
          <View style={[styles.formatToggle, themeStyles.themeToggle]}>
            {['Grid', 'Calendar', 'List'].map(formatOption => (
              <TouchableOpacity
                key={formatOption}
                onPress={() => setFormat(formatOption.toLowerCase())}
                style={[
                  styles.formatOption,
                  format === formatOption.toLowerCase() && styles.activeFormat,
                ]}>
                <Text
                  style={[
                    styles.formatOptionText,
                    format === formatOption.toLowerCase() &&
                      styles.activeFormatText,
                  ]}>
                  {formatOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text style={[styles.colorTitle, themeStyles.settingTitle]}>Color</Text>
        <View style={styles.colorOptions}>
          {[
            '#66ff66',
            '#ff6666',
            '#ffcc66',
            '#66ccff',
            '#cc66ff',
            '#ff66cc',
            '#ffffff',
            '#999999',
          ].map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.colorOption, {backgroundColor: item}]}
              onPress={() => setColor(item)}
            />
          ))}
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, themeStyles.text]}>
            Show Completion Indicator
          </Text>
          <Switch
            value={showCompletionIndicator}
            onValueChange={setShowCompletionIndicator}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, themeStyles.text]}>
            Show Description
          </Text>
          <Switch value={showDescription} onValueChange={setShowDescription} />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, themeStyles.text]}>
            Show Streak
          </Text>
          <Switch value={showStreak} onValueChange={setShowStreak} />
        </View>
      </View>

      <Modal
        visible={selectedDay !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedDay(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, themeStyles.card]}>
            <Text style={[styles.modalTitle, themeStyles.text]}>
              {selectedDay &&
                selectedDay.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </Text>
            <Text style={[styles.modalStatus, themeStyles.text]}>
              Status:{' '}
              {selectedDay &&
                ['Skipped', 'Pending', 'Completed'][selectedDay.status]}
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSelectedDay(null)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  description: {
    marginTop: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  gridSquare: {
    width: '10%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 2,
  },
  completedText: {
    marginTop: 10,
    fontSize: 24,
    color: '#66ff66',
    alignSelf: 'flex-end',
  },
  streakText: {
    fontSize: 16,
    marginTop: 10,
  },
  settings: {
    padding: 20,
    borderRadius: 15,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
  },
  themeOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  themeOptionText: {
    color: '#666666',
  },
  activeTheme: {
    backgroundColor: '#666666',
  },
  activeThemeText: {
    color: '#ffffff',
  },
  colorTitle: {
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colorOption: {
    width: '11%',
    aspectRatio: 1,
    borderRadius: 20,
    marginBottom: 10,
  },
  formatToggle: {
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
  },
  formatOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  formatOptionText: {
    color: '#666666',
  },
  activeFormat: {
    backgroundColor: '#666666',
  },
  activeFormatText: {
    color: '#ffffff',
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  calendarColumn: {
    alignItems: 'center',
  },
  calendarDay: {
    marginBottom: 5,
  },
  calendarSquare: {
    width: 20,
    height: 20,
    borderRadius: 2,
    marginBottom: 5,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  listItemDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
export default ActivityHabitCharts;
