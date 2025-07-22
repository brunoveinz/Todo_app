import * as Notifications from 'expo-notifications';
// ☝️ Importa todas las funciones de notificaciones de Expo

import { Platform } from 'react-native';
// ☝️ Para detectar si es Android o iOS (cada uno funciona diferente)

Notifications.setNotificationHandler({
// ☝️ Configura cómo se comportan las notificaciones globalmente

  handleNotification: async () => ({
    shouldShowAlert: true,
    // ☝️ Muestra popup cuando llega notificación
    shouldPlaySound: true,
    // ☝️ Reproduce sonido
    shouldSetBadge: false,
    // ☝️ NO pone numerito rojo en el ícono de la app
    shouldShowBanner: true,
    // ☝️ Muestra banner deslizable arriba
    shouldShowList: true,
    // ☝️ Aparece en el centro de notificaciones del teléfono
  }),
});


export class NotificationService {
// ☝️ Clase para organizar todas las funciones de notificaciones

  static async requestPermissions(): Promise<boolean> {
  // ☝️ "static" = no necesitas crear instancia, llamas directo
  // "async" = función que toma tiempo, espera respuesta del usuario
  // "Promise<boolean>" = retorna true o false

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
      // ☝️ Android requiere "canales" para organizar notificaciones

        name: 'default',
        // ☝️ Nombre del canal (interno, usuario no lo ve)

        importance: Notifications.AndroidImportance.MAX,
        // ☝️ Prioridad máxima = aparece encima de otras apps

        vibrationPattern: [0, 250, 250, 250],
        // ☝️ Patrón de vibración: [pausa, vibra, pausa, vibra] en milisegundos

        lightColor: '#FF231F7C',
        // ☝️ Color del LED en teléfonos que lo tienen
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    // ☝️ Pregunta al sistema: "¿Ya tengo permisos de notificaciones?"

    let finalStatus = existingStatus;
    // ☝️ Guarda el estado actual

    if (existingStatus !== 'granted') {
    // ☝️ Si NO tengo permisos...

      const { status } = await Notifications.requestPermissionsAsync();
      // ☝️ Muestra popup al usuario pidiendo permisos

      finalStatus = status;
      // ☝️ Actualiza con lo que respondió el usuario
    }

    return finalStatus === 'granted';
    // ☝️ IMPORTANTE: Retorna true si tiene permisos, false si no
  }
   
  static async sendTaskCompletedNotification(taskName: string) {
  // ☝️ Método para enviar notificación cuando se completa tarea

    const hasPermission = await this.requestPermissions();
    // ☝️ Verifica permisos usando el método de arriba

    if (!hasPermission) {
      console.log('No hay permisos para notificaciones');
      return;
      // ☝️ Si no hay permisos, sale sin hacer nada
    }

    await Notifications.scheduleNotificationAsync({
    // ☝️ Envía la notificación

      content: {
        title: '🎉 ¡Tarea Completada!',
        // ☝️ Título de la notificación

        body: `Has completado: "${taskName}"`,
        // ☝️ Mensaje con el nombre de la tarea

        sound: true,
        // ☝️ Con sonido
      },
      trigger: null,
      // ☝️ null = inmediata, no programada
    });
  }

}