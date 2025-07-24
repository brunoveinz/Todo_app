import React from "react";
import { Button } from "../../types/button";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constant/colors";
import { Ionicons } from '@expo/vector-icons';

export default function CustomButton({title, backgroundColor, onPress, fontSize, icon}: Button){
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: backgroundColor || 'transparent' }]}>
            {icon && <Ionicons name={icon as any} size={20} color={COLORS.text.primary} style={{marginRight: 6}} />}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 12,    // ← Esto
        paddingHorizontal: 20,  // ← Y esto
        borderRadius: 24,           // ¿Bordes redondeados?
        alignItems: 'center',       // ¿Centrar el texto?
    },
    text: {
        color: COLORS.text.primary, // ¿Qué color de texto?
        fontSize: 16,               // ¿Qué tamaño?
        fontWeight: 'bold',         // ¿Negrita?
    }
})
