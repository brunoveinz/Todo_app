import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constant/colors";
import CustomButton from "../components/buttons/Button";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import type { StackNavigationProp } from '@react-navigation/stack';

export default function ProfileScreen () {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    return(
       <View style={styles.container}>
            <View style={styles.backButton}>
                <CustomButton title='Volver' icon='arrow-back' onPress={()=> navigation.goBack()}/>
            </View>
            <Text>
                User Interface
            </Text>
       </View> 
    )
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
        padding: 20,
        paddingTop: 14,
    },
    backButton:{
        alignSelf: 'flex-start'
    },

})
