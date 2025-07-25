import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'


export class ImageStorageService {

    //permisos

    // solicitando permiso a la libreria de imagenes
    static async requestGalleryPermissions(): Promise<boolean>{
        try {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status != 'granted'){
                Alert.alert(
                    'Permisos necesarios',
                    'Necesitamos acceso a tu galeria para seleccionar imagenes',
                    [{ text: 'OK'}]
                )
                return false;
            }
            
            console.log('Permisos de galeria concedidos')
            return true;

        
        } catch (error) {
          
             console.error("Error solicitando permisos de galeria:", error);
             return false;
        }
    }

    //solicitando permisos a la camara
    static async requestCameraPermissions(): Promise<boolean> {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permisos necesarios',
                    'Necesitamos acceso a tu cámara para tomar fotos',
                    [{ text: 'OK' }]
                );
                return false;
            }
            
            console.log('✅ Permisos de cámara concedidos');
            return true;
        } catch (error) {
            console.error('Error solicitando permisos de cámara:', error);
            return false;
        }
    }


    // seleccionar de la galeria
    static async pickFromGallery() : Promise<string|null> { 
        try {

            const hasPermission = await this.requestGalleryPermissions();

            if (!hasPermission){
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.8
            })

            if (result.canceled){
                console.log("Galeria cancelada")
                return null
            }

            const imageUri = result.assets[0].uri
            console.log("Imagen seleccionada", imageUri)
            return imageUri

        } catch (error) {
            console.error("Error en la galeria", error)
            Alert.alert("error", 'No se pudo abrir la galeria')
            return null            
        }
    }

    static async takePhoto(): Promise<string|null>{

        try {    

            const hasPermission = await this.requestCameraPermissions();

            if (!hasPermission){
                return null
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.8
            })

            if (result.canceled){
                console.log("Camara Cancelada")
                return null
            }
        
            const imageUri = result.assets[0].uri;

            console.log("Foto tomada", imageUri)
            return imageUri;

        } catch (error) {
            
            console.error('💥 Error en cámara:', error);
            Alert.alert('Error', 'No se pudo abrir la cámara');
            return null 
        
        }
    } 

    static showImageOptions(): Promise<string|null>{
        return new Promise((resolve) => {
            Alert.alert("Seleccionar Imagen", '¿De donde quieres obtener la imagen?',
            [
                {
                  text: 'Galeria',
                  onPress: async () => {
                    const imageUri = await this.pickFromGallery();
                    resolve(imageUri);
                  } 
                },
                {
                  text: 'Cámara', 
                  onPress: async () => {
                    const imageUri = await this.takePhoto();
                    resolve(imageUri);
                  }
                },
                {
                  text: 'Cancelar',
                  style: 'cancel',
                  onPress: () => resolve(null)
                },
            ]);
        })
    }
}