import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../constants/colors';

const AddmodalComp = ({
    isVisible = false,
    children,
    onBackdropPress = () => { },
    style = [],
    setVisible,
    ...props
}) => {
    return (
        <View style ={{marginTop:100,flex:1,backgroundColor:"black"}}>
            <Modal
                isVisible={isVisible} onBackdropPress={onBackdropPress} style={{ ...styles.style, ...style }}  {...props}   >

                {children}

            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    style: {



    },
    crossStyle:{
        position:"relative",
        marginTop:-200 
    }
})
export default AddmodalComp;
 