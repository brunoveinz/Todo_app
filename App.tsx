import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { Todo } from './src/types/todo';
import { useState } from 'react';

export default function App() {

  const [task, setTask ] = useState<Todo[]>([]) 

  const addTask = () => {
    const nuevaTarea: Todo = {
      id: Math.floor(Math.random() * 1000000),
      text: "Mi primera Tarea",
      state: "pending"
    }
    setTask([...task, nuevaTarea])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Todo App 
      </Text>
      <Text style={styles.taskCounter}>
        Tareas : {task.length}
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text>
          Agregar Tarea
        </Text>
      </TouchableOpacity>

      {task.map((todo) => (
        <View key={todo.id} style={styles.todoItem}>
          <Text>{todo.text}</Text>
          <Text>Estado: {todo.state}</Text>
        </View>
      ))}
            
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#044eaf',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,   
  },
  title: {
    color: '#ffff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#00ff88',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 20,
  },
  addButtonText: {
    color: '#044eaf',
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoItem: {
    backgroundColor: '#ffffff',
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
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
});
