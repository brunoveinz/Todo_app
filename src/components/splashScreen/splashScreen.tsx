import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { COLORS } from '../../constant/colors'; // Importa tus colores

const MySplashScreen = () => {
    // Ref para controlar la animación de fade-in
    const fadeAnim = useRef(new Animated.Value(0)).current;
    // Ref para controlar la animación de escala del texto
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Iniciar animaciones cuando el componente se monta
        Animated.parallel([
            // Animación de aparición (fade-in)
            Animated.timing(fadeAnim, {
                toValue: 1,              // De 0 a 1 (transparente a opaco)
                duration: 800,           // Duración: 800ms
                useNativeDriver: true,   // Optimización de performance
            }),
            // Animación de escala del texto (como si creciera)
            Animated.spring(scaleAnim, {
                toValue: 1,              // De 0.8 a 1 (pequeño a tamaño normal)
                tension: 10,             // Tensión del resorte
                friction: 2,             // Fricción del resorte
                useNativeDriver: true,   // Optimización de performance
            })
        ]).start(); // Ejecutar ambas animaciones al mismo tiempo
    }, []); // Array vacío = ejecutar solo una vez

    return (
        <View style={styles.container}>
            {/* Contenedor principal con animación de fade */}
            <Animated.View 
                style={[
                    styles.content,
                    { 
                        opacity: fadeAnim,           // Opacidad controlada por animación
                        transform: [{ scale: scaleAnim }] // Escala controlada por animación
                    }
                ]}
            >
                {/* Título principal de la app */}
                <Text style={styles.title}>
                    Todo App
                </Text>
                
                {/* Subtítulo descriptivo */}
                <Text style={styles.subtitle}>
                    Organiza tu día
                </Text>
                
                {/* Spinner de carga premium */}
                <ActivityIndicator 
                    size="large"                    // Tamaño grande
                    color={COLORS.accent.cyber}     // Color cian cibernético de tu paleta
                    style={styles.spinner}         // Estilos adicionales
                />
                
                {/* Texto de estado de carga */}
                <Text style={styles.loadingText}>
                    Cargando...
                </Text>
            </Animated.View>

            {/* Decoración: círculos de fondo para efecto premium */}
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,                                    // Ocupa toda la pantalla
        backgroundColor: COLORS.background.primary, // Fondo azul muy oscuro de tu paleta
        justifyContent: 'center',                   // Centra verticalmente
        alignItems: 'center',                       // Centra horizontalmente
        position: 'relative',                       // Para posicionar círculos decorativos
    },
    
    content: {
        alignItems: 'center',                       // Centra elementos internos
        zIndex: 10,                                 // Asegura que esté encima de los círculos
    },
    
    title: {
        fontSize: 48,                               // Tamaño grande para impacto
        color: COLORS.text.primary,                 // Blanco hueso de tu paleta
        fontWeight: 'bold',                         // Texto en negrita
        marginBottom: 12,                           // Espacio inferior
        textAlign: 'center',                        // Centrado
        letterSpacing: 2,                           // Espaciado entre letras (premium)
    },
    
    subtitle: {
        fontSize: 18,                               // Tamaño mediano
        color: COLORS.text.secondary,               // Gris claro de tu paleta
        marginBottom: 40,                           // Espacio antes del spinner
        textAlign: 'center',                        // Centrado
        fontWeight: '300',                          // Peso ligero (elegante)
        letterSpacing: 1,                           // Espaciado sutil
    },
    
    spinner: {
        marginBottom: 20,                           // Espacio inferior
        transform: [{ scale: 1.2 }],                // Hacer el spinner un poco más grande
    },
    
    loadingText: {
        fontSize: 16,                               // Tamaño mediano
        color: COLORS.text.muted,                   // Gris medio de tu paleta
        fontWeight: '400',                          // Peso normal
        letterSpacing: 0.5,                         // Espaciado mínimo
    },
    
    // Círculos decorativos para efecto premium
    circle1: {
        position: 'absolute',                       // Posicionamiento absoluto
        top: 100,                                   // Posición desde arriba
        right: 50,                                  // Posición desde la derecha
        width: 120,                                 // Ancho del círculo
        height: 120,                                // Alto del círculo
        borderRadius: 60,                           // Radio para hacer círculo perfecto
        backgroundColor: COLORS.accent.neon,        // Púrpura neón con transparencia
        opacity: 0.1,                               // Muy transparente (sutil)
    },
    
    circle2: {
        position: 'absolute',                       // Posicionamiento absoluto
        bottom: 150,                                // Posición desde abajo
        left: 30,                                   // Posición desde la izquierda
        width: 80,                                  // Ancho menor
        height: 80,                                 // Alto menor
        borderRadius: 40,                           // Radio para círculo
        backgroundColor: COLORS.accent.cyber,       // Cian cibernético
        opacity: 0.15,                              // Poco transparente
    },
    
    circle3: {
        position: 'absolute',                       // Posicionamiento absoluto
        top: 200,                                   // Posición desde arriba
        left: 80,                                   // Posición desde izquierda
        width: 60,                                  // Ancho pequeño
        height: 60,                                 // Alto pequeño
        borderRadius: 30,                           // Radio para círculo
        backgroundColor: COLORS.accent.highlight,   // Amarillo tech
        opacity: 0.08,                              // Muy sutil
    },
});

export default MySplashScreen;