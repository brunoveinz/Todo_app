import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, TextInput, Modal, Button, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';
import { Switch } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import { useTodos } from '../hooks/useTodos';
import { COLORS, CARD_COLORS } from '../constant/colors';
import CustomButton from '../components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import type { StackNavigationProp } from '@react-navigation/stack';

SplashScreen.preventAutoHideAsync();
export default function Tasks() {

  const {tasks, addTask, removeTask, toggleTask } = useTodos();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskText, setTaskText] = useState("")
  const [selectedColor, setSelectedColor] = useState(CARD_COLORS[0])
  const [selectedCategory, setSelectedCategory] = useState("general")


  const openModal = () => {
    setIsModalVisible(true);
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const handleCreateTask = () => {
    if (taskText.trim()) {
      addTask(taskText, selectedCategory, selectedColor);
      setTaskText("")
      setSelectedCategory("General");
      setSelectedColor(CARD_COLORS[0])
      closeModal();
    }
  }

  const handleDeleteTask = (id: number ) => {
    removeTask(id);
  }

  const handleToggleTask = (id: number) => {
    toggleTask(id);
  }

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      
      <View style={styles.backButton}>
        <CustomButton title='Volver' icon='arrow-back' onPress={()=> navigation.goBack()}/>
      </View>

      <Text style={styles.title}>
        Tareas Pendientes
      </Text>
      <View style={styles.headerRow}>
        <Text style={styles.taskCounter}>
          Tareas : {tasks.length}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.textButton}>
            + Agregar Tarea
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
      {tasks.length > 0 ? (
        <Text style={styles.subtitleLeft}>
          Tareas Pendientes ({tasks.length})
        </Text>
      ) : (
        <Text style={styles.subtitleLeft}>
          No hay tareas aún
        </Text>
      )}

        {tasks.map((todo) => (
            <View key={todo.id} style={[{ backgroundColor: todo.color}, styles.todoItem]}>
              {/* Header con título y botón eliminar */}
              <View style={styles.todoHeader}>
                <Text style={styles.todoText}>{todo.text}</Text>
                <TouchableOpacity style={styles.closeIconButton}  onPress={() => handleDeleteTask(todo.id)}>
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>
              
              {/* Contenido principal */}
              <Text style={styles.todoState}>Estado: {todo.state}</Text>
              <Text style={styles.todoMeta}>
                Categoría: {todo.category} | {todo.hour?.toLocaleDateString()}
              </Text>
              
              {/* Footer con switch */}
              <View style={styles.todoFooter}>
                <Text style={styles.completeLabel}>Completar</Text>
                <Switch
                  value={todo.state === "complete"} // Por ahora siempre false
                  onValueChange={() => handleToggleTask(todo.id)} // Por ahora vacío
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={todo.state === "complete" ? '#f4f3f4' : '#f4f3f4'}
                />
              </View>
            </View>
        ))}  
      </ScrollView>
      
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.modalContent}>

            <TouchableOpacity style={styles.closeIconButton} onPress={closeModal}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Nueva Tarea</Text>
            
            <TextInput
              style={styles.textInput}
              placeholder='Escribe tu tarea'
              value={taskText}
              onChangeText={setTaskText}
              placeholderTextColor={COLORS.text.muted}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Categoría (ej: Trabajo, Personal)'
              value={selectedCategory}
              onChangeText={setSelectedCategory}
              placeholderTextColor={COLORS.text.muted}
            />

            <Text style={styles.sectionTitle}>Elige un color:</Text>
            <View style={styles.colorPalette}>
              {CARD_COLORS.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
              <Text style={styles.createButtonText}>Crear Tarea</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </Modal>
      <StatusBar style="light" backgroundColor='transparent' translucent={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  closeIconButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeIcon: {
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  subtitleLeft: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    alignSelf: 'flex-start', // ← Alineación a la izquierda
    width: '100%',           // ← Toma todo el ancho
  },
  backButton:{
    alignSelf: 'flex-start'
  },
  createButton: {
    backgroundColor: COLORS.button.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  createButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: '#ffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 24,
  },
  textButton:{
    fontWeight: "bold"
  },
  addButton: {
    backgroundColor: '#00ff88',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    //marginVertical: 20,
  },
  todoMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  addButtonText: {
    color: '#044eaf',
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  todoState: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
    taskCounter: {          // ← Nuevo estilo para el contador
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    //marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20, // Espacio al final
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  todoHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#c80808dd",
    padding: 5,
    borderRadius: 10,
  },
  deleteTextButton:{
    color: "#ffffff",
    fontSize: 16
  },
  todoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  completeLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    backgroundColor: COLORS.background.surface,
    width: '90%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: COLORS.button.danger,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.text.muted,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: COLORS.text.primary,
    backgroundColor: COLORS.background.primary,
    marginBottom: 20,
  },
  sectionTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: COLORS.text.primary,
  marginBottom: 10,
  alignSelf: 'flex-start',
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: COLORS.text.primary,
    borderWidth: 3,
  },
});


