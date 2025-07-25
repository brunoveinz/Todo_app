import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { COLORS } from "../constant/colors";
import CustomButton from "../components/buttons/Button";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import type { StackNavigationProp } from '@react-navigation/stack';
import { USER } from "../types/user";
import { useState, useEffect } from "react";
import { saveUserData, loadUserData } from "../services/userStorageService";
import { ImageStorageService } from "../services/imageStorageService";

export default function ProfileScreen () {
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    // objeto para manejar el cambio de datos.
    const [user, setUser] = useState<USER>({
        id: 1, 
        name: "Usuario demo",
        email: "usuario@demo.cl",
        age: 25,
        profileImage: undefined
    })
    
    // estado para manejar si esta editando o no
    const [isEditing, setIsEditing] = useState(false);
    // estado para manejar los datos del usuario temporal con objeto user de arriba
    const [tempUser, setTempUser] = useState<USER>(user);


    useEffect(() => {
        const loadProfile = async () => {
            const savedData = await loadUserData()
            if (savedData) {
                setUser(savedData)
                setTempUser(savedData)
            }
        };

        loadProfile();
    }, []) 

    const handleEdit = () => {
        setIsEditing(true);
        setTempUser(user);
    }

    const handleSave = async () => {
        const success = await saveUserData(tempUser);
        if (success) {
            setUser(tempUser)
            setIsEditing(false);
            Alert.alert("Exito", "Datos guardados correctamente");
        }
    }
    
    const handleCancel = () => {
        setTempUser(user);
        setIsEditing(false)
    }

    const handleImageSelected = async () => {

        if (!isEditing){
            Alert.alert('Modo edicion', 'Presiona editar datos primero para cambiar la imagen')
            return;
        }

        const selectedImageUri = await ImageStorageService.showImageOptions();

        if (selectedImageUri){
            console.log("Nueva imagen obtenida:", selectedImageUri)
            
            setTempUser({
                ...tempUser,
                profileImage: selectedImageUri
            })

            Alert.alert('Imagen actualizada', 'La imagen se ha seleccionado correctamente')
        }else{
            console.log('No se selecciono ninguna imagen')
        }
    };

    return(
       <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={styles.backButton}>
                    <CustomButton title='Volver' icon='arrow-back' onPress={()=> navigation.goBack()}/>
                </View>

                <TouchableOpacity style={styles.avatarContainer} onPress={handleImageSelected}>
                    <Image 
                        source={
                            (isEditing && tempUser.profileImage) 
                                ? {uri: tempUser.profileImage}
                                : user.profileImage 
                                ? {uri: user.profileImage} 
                                : {uri: 'https://via.placeholder.com/120'}
                        }
                        style={styles.avatar}
                    />
                    <Text style={styles.changePhotoText}>
                        {isEditing 
                            ? (tempUser.profileImage ? 'Cambiar Foto' : 'Agregar Foto')
                            : 'Toca "Editar" para cambiar'
                        }
                    </Text>
                </TouchableOpacity>

                <View style={styles.fieldsContainer}>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Nombre</Text>
                        { isEditing ? (
                            <TextInput
                                style = {styles.textInput}
                                value = {tempUser.name}
                                onChangeText ={(text) => setTempUser({...tempUser, name: text})}
                            />
                        ) : (
                            <Text style={ styles.fieldValue}>{user.name}</Text>
                        )}
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Email</Text>
                        { isEditing ? (
                            <TextInput
                                style = {styles.textInput}
                                value = {tempUser.email}
                                onChangeText ={(text) => setTempUser({...tempUser, email: text})}
                                keyboardType="email-address"
                            />
                        ) : (
                            <Text style={ styles.fieldValue}>{user.email}</Text>
                        )}
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Edad</Text>
                        { isEditing ? (
                            <TextInput
                                style = {styles.textInput}
                                value={tempUser.age ? tempUser.age.toString() : '0'}
                                onChangeText={(text) => {
                                    const ageValue = parseInt(text);
                                    setTempUser({
                                        ...tempUser, 
                                        age: isNaN(ageValue) ? 0 : ageValue
                                    })
                                }}
                                keyboardType="numeric"
                            />
                        ) : (
                            <Text style={ styles.fieldValue}>{user.age}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.actionButtons}>
                    {isEditing ? (
                        <>
                            <CustomButton title="Guardar" backgroundColor={COLORS.button.primary} onPress={handleSave}/>
                            <CustomButton title="Cancelar" backgroundColor={COLORS.button.secondary} onPress={handleCancel}/>
                        </>
                    ) : (
                        <CustomButton title="Editar Datos" backgroundColor={COLORS.button.primary}  onPress={handleEdit} />
                    ) }

                </View>            
            </ScrollView>
       </KeyboardAvoidingView> 
    )
}



const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.background.surface,
        marginBottom: 10,
    },
    changePhotoText: {
        color: COLORS.button.primary,
        fontSize: 14,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
    },
    scrollContent:{
        flexGrow: 1,
        padding: 20,
        paddingTop: 60,
    },
    backButton:{
        alignSelf: 'flex-start'
    },
    profileData:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title : {
        fontSize: 24,
        color: COLORS.text.primary
    },
    fieldsContainer:{
        width: '100%',
        marginBottom: 30,
    },
    field:{
        marginBottom: 30,
    },
    fieldLabel:{
        fontSize:14,
        color: COLORS.text.secondary,
        marginBottom: 8,

    },
    fieldValue: {
        fontSize: 16,
        color: COLORS.text.primary,
        padding:15,
        backgroundColor: COLORS.background.surface,
        borderRadius: 10
    },
    textInput:{
        fontSize: 16,
        color: COLORS.text.primary,
        padding: 15,
        backgroundColor: COLORS.background.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.button.primary
    },
    actionButtons:{
        width: '100%',
        gap: 10,
    }
})
