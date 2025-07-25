import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from '../types/user';

const USER_STORAGE_KEY = 'user_profile_data'

// guardar datos en local storage en formato json
export const saveUserData = async (userData: USER): Promise<boolean> => {
    try {
        const jsonValue = JSON.stringify(userData);
        await AsyncStorage.setItem(USER_STORAGE_KEY, jsonValue)
        console.log('Datos guardados correctamente:', userData.name)
        return true;
    } catch (error) {
        console.log('Error al guardar datos.')
        return false;
    }
}


// cargar datos si es que existen.
export const loadUserData = async (): Promise<USER|null>  => {
    try {
        const jsonValue = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (jsonValue != null){
            const userData: USER = JSON.parse(jsonValue);
            console.log('Datos cargados correctamente', userData.name);
            return userData;
        }else{
            console.log('No hay datos guardados')
            return null;
        }   

    } catch (error) {
        return null;
    }
}
