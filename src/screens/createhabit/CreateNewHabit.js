import { Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import HabitResourse from '../../../HabitResourse';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AddmodalComp from '../../components/AddmodalComp';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../constants/colors';
import { height, moderateScale } from '../../constants/responsiveSize';


const CreateNewHabit = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [slectedColor, setSelectedColour] = useState("")
  const [slectedColors, setSelectedColours] = useState("")
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const [title, settitle] = useState("")
  const [day,setDay]=useState(days)
  const colours = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169E1", // Royal Blue
  ];
  
  const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const Weeks =["1st","2nd","3rd","4th"]
  const addHAbits = () => {
    setIsVisible(true)
  }
  console.log("day",day)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, color: 'white', fontWeight: '700' }}>
        Healthy
        <Text style={{ color: HabitResourse.colors.screenTitleColor }}>
          Habit
        </Text>
      </Text>
      <Text style={styles.txtStyle}>Your Habit Details</Text>
      <View>
        <TouchableOpacity style={styles.AddContainer} onPress={() => { addHAbits() }}>
          <Ionicons name='checkmark-done-circle' size={30} color={"white"} />

          <Text>Add Your Habits</Text>

          <FontAwesome name={"plus-circle"} size={30} color={"white"} />
        </TouchableOpacity>
      </View>
      <AddmodalComp style={{ justifyContent: "flex-end", margin: 0 ,backgroundColor:"black"}} isVisible={isVisible} setVisible={setIsVisible}>
        <View style={styles.ModalStyle}>
          <View style={{ flexDirection: "row", justifyContent: "space-between"  }}>
            <TouchableOpacity style={styles.crossStyle} onPress={() => { setIsVisible(false) }}><Ionicons name='arrow-back' size={30} color={colors.white} /></TouchableOpacity>
            <Text style={{color:colors.white}}>New Habit</Text>
            <Text onPress={() => { console.log("please done the work") }} style={{ fontSize: 18,color:colors.white, fontWeight: "bold" }}>Done</Text>
          </View>
          <View>
            <TextInput
              vaue={title}
              onChangeText={(text) => settitle(text)}
              style={{
                width: "95%",
                marginTop: moderateScale(12),
                padding: moderateScale(15),
                borderRadius: moderateScale(13),
                backgroundColor: '#E1EBEE'

              }}
              placeholder='Title'
            />
            <TextInput  style={{
                width: "95%",
                marginTop: moderateScale(12),
                padding: moderateScale(15),
                borderRadius: moderateScale(13),
                backgroundColor: '#E1EBEE'

              }} placeholder='Description'></TextInput>
            <View style={{ marginVerticle: moderateScale(10) }}>
              <Text style={{ fontSize: moderateScale(16), fontWeight: "500" }}>Choose Color</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(10),
                  marginTop: moderateScale(10)
                }}
              >
                {colours?.map((item, index) => (

                  <   TouchableOpacity
                    onPress={() => { setSelectedColour(item) }}
                    key={index}
                    activeOpacity={0.8}
                  >
                    {slectedColor === item ? (
                      <FontAwesome name="check-square-o" size={30} color={item} />

                    ) : (
                      <FontAwesome name="square" size={30} color={item} />
                    )}

                  </TouchableOpacity>
                ))}
              </View>

            </View>
            <Text style={{ fontSize: moderateScale(17), fontWeight: "500" }}>How Often You repeat</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "#AFDBF5",
                  padding: 10,
                  borderRadius: 6,
                  flex: 1,
                }}
                onPress={()=>{setDay(days)}}
              >
                <Text style={{ textAlign: "center" }}>Daily</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#AFDBF5",
                  padding: 10,
                  borderRadius: 6,
                  flex: 1,
                }}
                onPress={()=>{setDay(Weeks)}}
              >
                <Text style={{ textAlign: "center" }}>Weekly</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#AFDBF5",
                  padding: 10,
                  borderRadius: 6,
                  flex: 1,
                }}
                onPress={()=>{setDay(months)}}
              >
                <Text style={{ textAlign: "center" }}>Monthly</Text>
              </Pressable>
            </View>

            <Text style={{ fontSize: 18, fontWeight: "500" }}>On these days</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              {day?.map((item, index) => (
                <Pressable
                style={slectedColors==item?styles.selectedDate:styles.nonSelectedDate}
                  // style={{
                    
                  // }}
                  onPress={()=>{setSelectedColours(item)}}
                >
                  <Text>{item}</Text>
                </Pressable>
              ))}
            </View>
            <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "500" }}>Reminder</Text>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "#2774AE" }}>
          Yes
        </Text>
      </View>

      <Pressable
      //  onPress={addHabit}
        style={{
          marginTop: 25,
          backgroundColor: "#00428c",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          SAVE
        </Text>
      </Pressable>
          </View>



        </View>



      </AddmodalComp>
    </SafeAreaView>
  );
};

export default CreateNewHabit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  txtStyle: {
    color: "white",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "semibold"
  },
  AddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 22,
   
    alignItems: "center",
    paddingHorizontal: 12,
    height: 49,
    backgroundColor: "#4d524e",
    marginTop: 10
  },
  ModalStyle: {
    backgroundColor: "white",
    minHeight: moderateScale(height / 1.15),
    padding: moderateScale(15),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    backgroundColor:"black"
  },
  crossStyle: {
    justifyContent: "space-between",
    flexDirection: "row"

},selectedDate:{
  width: 40,
  height: 40,
  borderRadius: 5,
  
  backgroundColor: "red",
  justifyContent: "center",
  alignItems: "center",
},
nonSelectedDate:{
  width: 40,
  height: 40,
  borderRadius: 5,
  
  backgroundColor: "#E0E0E0",
  justifyContent: "center",
  alignItems: "center",
}

});
