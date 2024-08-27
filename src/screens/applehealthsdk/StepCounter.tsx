import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';

import NavigationBar from '../../components/NavigationBar';
import RingProgress from '../../components/RingProgress';
import useHealthData from '../../hooks/useHealthData';
import HabitResourse from '../../../HabitResourse';
import StepInfoContainer from '../../components/StepInfoContainer';

export default function StepCounter() {
  const swiper = useRef<Swiper>(null);
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState(0);
  const {steps, flights, distance} = useHealthData(date);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');
    return [-1, 0, 1].map(adj => {
      return Array.from({length: 7}).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');
        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const STEP_GOAL = 1000;
  const isGoalReached = steps < STEP_GOAL;

  return (
    <View style={{flex: 1}}>
      <NavigationBar backButton={true} />
      <View style={styles.container}>
        {/* Month Name at the Top */}
        <Text style={styles.monthName}>
          {moment(date).format('DD MMMM YYYY')}
        </Text>

        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind !== 1) {
                setTimeout(() => {
                  const newIndex = ind - 1;
                  setWeek(week + newIndex);
                  swiper.current?.scrollTo(1, false);
                }, 100);
              }
            }}>
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    date.toDateString() === item.date.toDateString();

                  return (
                    <Pressable
                      key={dateIndex}
                      onPress={() => setDate(item.date)}
                      style={[
                        styles.item,
                        isActive && {
                          backgroundColor: '#fff',
                          borderColor: '#111',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.itemWeekday,
                          isActive && {color: '#000'},
                        ]}>
                        {item.weekday}
                      </Text>
                      <Text
                        style={[styles.itemDate, isActive && {color: '#000'}]}>
                        {item.date.getDate()}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
        <View style={{marginVertical: 50}}>
          <RingProgress
            radius={120}
            strokeWidth={40}
            progress={steps / STEP_GOAL}
          />
        </View>
        <View style={styles.values}>
          <StepInfoContainer
            label="Steps"
            value={steps.toString()}
            styleLabel={styles.label}
            styleValue={[
              styles.value,
              {color: isGoalReached ? '#EE0F55' : '#AFB3BE'},
            ]}
          />
          <StepInfoContainer
            label="Distance"
            value={`${(distance / 1000).toFixed(2)} km`}
            styleLabel={styles.label}
            styleValue={styles.value}
          />
          <StepInfoContainer
            label="Flights Climbed"
            value={flights.toString()}
            styleLabel={styles.label}
            styleValue={styles.value}
          />
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
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRow: {
    width: HabitResourse.constant.screenWidth,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: HabitResourse.colors.screenTitleColor,
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: HabitResourse.colors.screenTitleColor,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: HabitResourse.colors.screenTitleColor,
  },
  datePicker: {
    alignSelf: 'center',
    padding: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  date: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
  monthName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
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
