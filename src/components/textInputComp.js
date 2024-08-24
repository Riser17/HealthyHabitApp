//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
// import {moderateScale, moderateScaleVertical, textScale} from '../styles/responsiveSize';

import { moderateScale, moderateScaleVertical, textScale } from '../constants/responsiveSize';
import colors from '../constants/colors';
import fontFamily from '../constants/fontFamily';



// create a component
const TextInputCom = ({
  inputStyle = {},
  textStyle = {},
  value = '',
  onChangeText,
  placeholder = '',
  secureText = false,
  onPressSecure =()=> {},

  ...props
}) => {
  
  return (
    <View style={{...styles.inputStyle, ...inputStyle,backgroundColor:colors.black}}>
      <TextInput 
      style={{...styles.textStyle, ...textStyle,
    textAlign: "left"
    }}
      {...props}
      value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureText={secureText}
        placeholderTextColor={"black"}
      />
      {!!secureText ?<Text style={{...styles.textStyle,flex:0}}onPress={onPressSecure}>{secureText}</Text>:<Text></Text>}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  inputStyle: {
    height: moderateScale(52),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
    
    marginBottom:moderateScaleVertical(16)
  },
  textStyle: {
    fontSize: textScale(14),
    
    fontFamily: fontFamily.regular,
  },
});

//make this component available to the app
export default TextInputCom;
